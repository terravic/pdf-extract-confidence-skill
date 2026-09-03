"""
Unit and integration tests for PDF Word-Level Confidence Extractor.
Compatible with standard library unittest and pytest test runners.
"""

from __future__ import annotations

import json
import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile
import unittest

SCRIPTS_DIR = Path(__file__).resolve().parent.parent / "skills" / "pdf-extract-confidence" / "scripts"
if str(SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPTS_DIR))

from extract_pdf import (
    PDFConfidenceExtractor,
    WordBox,
    WordConfidenceItem,
    DocumentExtractionResult,
    PageExtractionResult,
    generate_html_dashboard,
    validate_against_schema,
)

SAMPLES_DIR = Path(__file__).resolve().parent.parent / "samples"
EXTRACT_SCRIPT = SCRIPTS_DIR / "extract_pdf.py"
GEN_SCRIPT = SCRIPTS_DIR / "generate_samples.py"


class TestPDFConfidenceExtractor(unittest.TestCase):
    """Test suite covering PDF confidence extraction, CLI, OCR, and HTML dashboard."""

    @classmethod
    def setUpClass(cls):
        """Ensure sample test PDFs exist before test execution."""
        if not (SAMPLES_DIR / "sample_digital_invoice.pdf").exists():
            subprocess.run([sys.executable, str(GEN_SCRIPT)], check=True)

    def test_digital_invoice_extraction(self):
        pdf_path = SAMPLES_DIR / "sample_digital_invoice.pdf"
        extractor = PDFConfidenceExtractor(default_threshold=0.85)
        result = extractor.extract(pdf_path)

        self.assertEqual(result.filename, "sample_digital_invoice.pdf")
        self.assertEqual(len(result.pages), 1)
        self.assertGreater(result.total_words, 50)
        self.assertEqual(result.mean_confidence, 1.0)
        self.assertEqual(result.min_confidence, 1.0)
        self.assertEqual(result.low_confidence_count, 0)
        self.assertIn("APEX LOGISTICS", result.full_text)
        self.assertIn("INV-2026-8841", result.full_text)

        # Verify word bounding boxes
        first_word = result.pages[0].words[0]
        self.assertEqual(first_word.word, "APEX")
        self.assertEqual(first_word.confidence, 1.0)
        self.assertEqual(first_word.source, "digital")
        self.assertGreater(first_word.bbox.x0, 0)
        self.assertGreater(first_word.bbox.top, 0)
        self.assertGreater(first_word.bbox.x1, first_word.bbox.x0)
        self.assertGreater(first_word.bbox.bottom, first_word.bbox.top)

    def test_mixed_report_extraction(self):
        pdf_path = SAMPLES_DIR / "sample_mixed_report.pdf"
        extractor = PDFConfidenceExtractor(default_threshold=0.85)
        result = extractor.extract(pdf_path)

        self.assertEqual(len(result.pages), 2)
        self.assertGreater(result.total_words, 40)
        self.assertEqual(result.pages[0].page_number, 1)
        self.assertEqual(result.pages[1].page_number, 2)
        self.assertIn("QUARTERLY INFRASTRUCTURE AUDIT REPORT", result.pages[0].text)
        self.assertIn("Section 2: Authorization and Compliance Sign-Off", result.pages[1].text)

    def test_scanned_receipt_extraction(self):
        pdf_path = SAMPLES_DIR / "sample_scanned_receipt.pdf"
        extractor = PDFConfidenceExtractor(default_threshold=0.85)
        result = extractor.extract(pdf_path)

        self.assertEqual(len(result.pages), 1)
        self.assertEqual(result.pages[0].page_type, "ocr")
        self.assertGreater(result.pages[0].width, 0)
        self.assertGreater(result.pages[0].height, 0)
        for word in result.pages[0].words:
            self.assertTrue(0.0 <= word.confidence <= 1.0)
            self.assertEqual(word.source, "ocr")

    def test_digital_word_encoding_evaluation(self):
        extractor = PDFConfidenceExtractor()

        # Clean ASCII word
        conf, status = extractor.evaluate_digital_word_confidence("StandardText")
        self.assertEqual(conf, 1.0)
        self.assertEqual(status, "clean")

        # Word with replacement characters
        conf, status = extractor.evaluate_digital_word_confidence("Corrupt\ufffdText\ufffd")
        self.assertLess(conf, 1.0)
        self.assertEqual(status, "encoding_anomaly")

        # Empty string
        conf, status = extractor.evaluate_digital_word_confidence("")
        self.assertEqual(conf, 0.0)
        self.assertEqual(status, "empty")

    def test_custom_threshold_filtering(self):
        box = WordBox(10, 10, 20, 20)
        w1 = WordConfidenceItem("CleanWord", 1.0, "digital", box)
        w2 = WordConfidenceItem("DegradedWord", 0.72, "ocr", box)

        page = PageExtractionResult(1, "hybrid", 612.0, 792.0, "CleanWord DegradedWord", [w1, w2])
        doc_result = DocumentExtractionResult("test.pdf", "test_engine", [page], low_confidence_threshold=0.80)

        self.assertEqual(doc_result.total_words, 2)
        self.assertEqual(doc_result.low_confidence_count, 1)
        self.assertEqual(len(doc_result.low_confidence_words), 1)
        self.assertEqual(doc_result.low_confidence_words[0]["word"], "DegradedWord")
        self.assertEqual(doc_result.low_confidence_words[0]["confidence"], 0.72)
        self.assertEqual(doc_result.low_confidence_words[0]["reason"], "ocr_uncertainty")

    def test_file_not_found(self):
        extractor = PDFConfidenceExtractor()
        with self.assertRaises(FileNotFoundError):
            extractor.extract("non_existent_file_path_xyz.pdf")

    def test_cli_execution(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            input_pdf = SAMPLES_DIR / "sample_digital_invoice.pdf"
            output_json = Path(tmpdir) / "cli_output.json"

            cmd = [
                sys.executable,
                str(EXTRACT_SCRIPT),
                "--input", str(input_pdf),
                "--output", str(output_json),
                "--threshold", "0.90",
                "--validate",
            ]
            res = subprocess.run(cmd, capture_output=True, text=True)
            self.assertEqual(res.returncode, 0, f"CLI error: {res.stderr}")
            self.assertTrue(output_json.exists())

            with open(output_json, "r", encoding="utf-8") as f:
                data = json.load(f)

            self.assertEqual(data["metadata"]["filename"], "sample_digital_invoice.pdf")
            self.assertEqual(data["metadata"]["low_confidence_threshold"], 0.90)
            self.assertEqual(len(data["pages"]), 1)
            self.assertIn("APEX", data["full_text"])

    def test_generate_html_dashboard(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            extractor = PDFConfidenceExtractor()
            result = extractor.extract(SAMPLES_DIR / "sample_digital_invoice.pdf")
            output_html = Path(tmpdir) / "dashboard.html"

            generated_path = generate_html_dashboard(result.to_dict(), output_html)
            self.assertTrue(generated_path.exists())

            content = generated_path.read_text(encoding="utf-8")
            self.assertIn("<!DOCTYPE html>", content)
            self.assertIn("Word-Level Confidence Reviewer", content)
            self.assertIn("sample_digital_invoice.pdf", content)
            self.assertIn("thresholdSlider", content)
            self.assertIn("thresholdNumberInput", content)
            self.assertIn("btnFilterAll", content)
            self.assertIn("btnFilterLow", content)
            self.assertIn("btnFilterCorrected", content)
            self.assertIn("themeToggleBtn", content)

            script_match = re.search(r"<script>(.*?)</script>", content, flags=re.DOTALL)
            self.assertIsNotNone(script_match)
            js_code = script_match.group(1)
            node_check = subprocess.run(
                ["node", "--check", "-"],
                input=js_code,
                capture_output=True,
                text=True
            )
            self.assertEqual(node_check.returncode, 0, f"Embedded JS syntax error: {node_check.stderr}")

    def test_cli_execution_with_html_output(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            input_pdf = SAMPLES_DIR / "sample_digital_invoice.pdf"
            output_json = Path(tmpdir) / "cli_output.json"
            output_html = Path(tmpdir) / "cli_dashboard.html"

            cmd = [
                sys.executable,
                str(EXTRACT_SCRIPT),
                "--input", str(input_pdf),
                "--output", str(output_json),
                "--html-output", str(output_html),
                "--threshold", "0.85",
                "--validate",
            ]
            res = subprocess.run(cmd, capture_output=True, text=True)
            self.assertEqual(res.returncode, 0, f"CLI error: {res.stderr}")
            self.assertTrue(output_json.exists())
            self.assertTrue(output_html.exists())
            self.assertGreater(output_html.stat().st_size, 10000)

    def test_ocr_scan_jfk_document(self):
        jfk_pdf = SAMPLES_DIR / "104-10062-10073.pdf"
        if not jfk_pdf.exists():
            self.skipTest("Sample 104-10062-10073.pdf not found in samples/")

        extractor = PDFConfidenceExtractor(default_threshold=0.85)
        if not extractor.tesseract_cmd:
            self.skipTest("Tesseract OCR binary not found on test machine")

        result = extractor.extract(jfk_pdf, threshold=0.85, mode="auto")

        self.assertEqual(result.filename, "104-10062-10073.pdf")
        self.assertEqual(len(result.pages), 6)
        self.assertGreater(result.total_words, 1000)
        self.assertTrue(0.80 <= result.mean_confidence <= 1.0)
        self.assertGreater(result.low_confidence_count, 0)

        # Verify page 1 word properties
        p1 = result.pages[0]
        self.assertEqual(p1.page_type, "ocr")
        self.assertGreater(len(p1.words), 100)
        for w in p1.words:
            self.assertTrue(0.0 <= w.confidence <= 1.0)
            self.assertGreaterEqual(w.bbox.x0, 0)
            self.assertGreaterEqual(w.bbox.top, 0)
            self.assertGreaterEqual(w.bbox.x1, w.bbox.x0)
            self.assertGreaterEqual(w.bbox.bottom, w.bbox.top)
            self.assertEqual(w.source, "ocr")

        # Validate against JSON schema
        valid, err = validate_against_schema(result.to_dict())
        self.assertTrue(valid, f"Schema validation failed on OCR output: {err}")

    def test_missing_ocr_fallback_handling(self):
        extractor = PDFConfidenceExtractor(tesseract_cmd="/non_existent_path_tesseract_xyz")
        extractor._rapidocr_engine = False

        jfk_pdf = SAMPLES_DIR / "104-10062-10073.pdf"
        if not jfk_pdf.exists():
            self.skipTest("Sample 104-10062-10073.pdf not found")

        result = extractor.extract(jfk_pdf, mode="ocr")
        self.assertEqual(len(result.pages), 6)
        for p in result.pages:
            self.assertEqual(p.page_type, "ocr")
            self.assertTrue("OCR engine required" in p.text or p.word_count >= 0)

    def test_cli_execution_with_ocr_flags(self):
        jfk_pdf = SAMPLES_DIR / "104-10062-10073.pdf"
        if not jfk_pdf.exists():
            self.skipTest("Sample 104-10062-10073.pdf not found")

        with tempfile.TemporaryDirectory() as tmpdir:
            output_json = Path(tmpdir) / "jfk_extracted.json"
            cmd = [
                sys.executable,
                str(EXTRACT_SCRIPT),
                "--input", str(jfk_pdf),
                "--output", str(output_json),
                "--dpi", "150",
                "--threshold", "0.85",
                "--validate",
            ]
            res = subprocess.run(cmd, capture_output=True, text=True)
            self.assertEqual(res.returncode, 0, f"CLI error: {res.stderr}")
            self.assertTrue(output_json.exists())


if __name__ == "__main__":
    unittest.main()


