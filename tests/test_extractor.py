"""
Unit and integration tests for PDF Word-Level Confidence Extractor.
"""

import sys
from pathlib import Path
import json
import subprocess
import pytest

SCRIPTS_DIR = Path(__file__).resolve().parent.parent / "skills" / "pdf-extract-confidence" / "scripts"
if str(SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPTS_DIR))

from extract_pdf import (
    PDFConfidenceExtractor,
    WordBox,
    WordConfidenceItem,
    validate_against_schema,
)

SAMPLES_DIR = Path(__file__).resolve().parent.parent / "samples"
EXTRACT_SCRIPT = Path(__file__).resolve().parent.parent / "skills" / "pdf-extract-confidence" / "scripts" / "extract_pdf.py"


@pytest.fixture(scope="session", autouse=True)
def ensure_samples_exist():
    """Ensure synthetic test sample PDFs exist before running tests."""
    gen_script = Path(__file__).resolve().parent.parent / "skills" / "pdf-extract-confidence" / "scripts" / "generate_samples.py"
    if not (SAMPLES_DIR / "sample_digital_invoice.pdf").exists():
        subprocess.run([sys.executable, str(gen_script)], check=True)


class TestPDFConfidenceExtractor:

    def test_digital_invoice_extraction(self):
        pdf_path = SAMPLES_DIR / "sample_digital_invoice.pdf"
        extractor = PDFConfidenceExtractor(default_threshold=0.85)
        result = extractor.extract(pdf_path)

        assert result.filename == "sample_digital_invoice.pdf"
        assert len(result.pages) == 1
        assert result.total_words > 50
        assert result.mean_confidence == 1.0
        assert result.min_confidence == 1.0
        assert result.low_confidence_count == 0
        assert "APEX LOGISTICS" in result.full_text
        assert "INV-2026-8841" in result.full_text

        # Verify word bounding boxes
        first_word = result.pages[0].words[0]
        assert first_word.word == "APEX"
        assert first_word.confidence == 1.0
        assert first_word.source == "digital"
        assert first_word.bbox.x0 > 0
        assert first_word.bbox.top > 0
        assert first_word.bbox.x1 > first_word.bbox.x0
        assert first_word.bbox.bottom > first_word.bbox.top

    def test_mixed_report_extraction(self):
        pdf_path = SAMPLES_DIR / "sample_mixed_report.pdf"
        extractor = PDFConfidenceExtractor(default_threshold=0.85)
        result = extractor.extract(pdf_path)

        assert len(result.pages) == 2
        assert result.total_words > 40
        assert result.pages[0].page_number == 1
        assert result.pages[1].page_number == 2
        assert "QUARTERLY INFRASTRUCTURE AUDIT REPORT" in result.pages[0].text
        assert "Section 2: Authorization and Compliance Sign-Off" in result.pages[1].text

    def test_scanned_receipt_extraction(self):
        pdf_path = SAMPLES_DIR / "sample_scanned_receipt.pdf"
        extractor = PDFConfidenceExtractor(default_threshold=0.85)
        result = extractor.extract(pdf_path)

        assert len(result.pages) == 1
        assert result.pages[0].page_type == "ocr"
        assert result.pages[0].width > 0
        assert result.pages[0].height > 0
        for word in result.pages[0].words:
            assert 0.0 <= word.confidence <= 1.0
            assert word.source == "ocr"

    def test_digital_word_encoding_evaluation(self):
        extractor = PDFConfidenceExtractor()

        # Clean ASCII word
        conf, status = extractor.evaluate_digital_word_confidence("StandardText")
        assert conf == 1.0
        assert status == "clean"

        # Word with replacement characters
        conf, status = extractor.evaluate_digital_word_confidence("Corrupt\ufffdText\ufffd")
        assert conf < 1.0
        assert status == "encoding_anomaly"

        # Empty string
        conf, status = extractor.evaluate_digital_word_confidence("")
        assert conf == 0.0
        assert status == "empty"

    def test_custom_threshold_filtering(self):
        # Create items with artificial low confidence
        box = WordBox(10, 10, 20, 20)
        w1 = WordConfidenceItem("CleanWord", 1.0, "digital", box)
        w2 = WordConfidenceItem("DegradedWord", 0.72, "ocr", box)

        from extract_pdf import (
            DocumentExtractionResult,
            PageExtractionResult,
        )

        page = PageExtractionResult(1, "hybrid", 612.0, 792.0, "CleanWord DegradedWord", [w1, w2])
        doc_result = DocumentExtractionResult("test.pdf", "test_engine", [page], low_confidence_threshold=0.80)

        assert doc_result.total_words == 2
        assert doc_result.low_confidence_count == 1
        assert len(doc_result.low_confidence_words) == 1
        assert doc_result.low_confidence_words[0]["word"] == "DegradedWord"
        assert doc_result.low_confidence_words[0]["confidence"] == 0.72
        assert doc_result.low_confidence_words[0]["reason"] == "ocr_uncertainty"

    def test_file_not_found(self):
        extractor = PDFConfidenceExtractor()
        with pytest.raises(FileNotFoundError):
            extractor.extract("non_existent_file_path_xyz.pdf")

    def test_cli_execution(self, tmp_path):
        input_pdf = SAMPLES_DIR / "sample_digital_invoice.pdf"
        output_json = tmp_path / "cli_output.json"

        cmd = [
            sys.executable,
            str(EXTRACT_SCRIPT),
            "--input", str(input_pdf),
            "--output", str(output_json),
            "--threshold", "0.90",
            "--validate",
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        assert res.returncode == 0
        assert output_json.exists()

        with open(output_json, "r", encoding="utf-8") as f:
            data = json.load(f)

        assert data["metadata"]["filename"] == "sample_digital_invoice.pdf"
        assert data["metadata"]["low_confidence_threshold"] == 0.90
        assert len(data["pages"]) == 1
        assert "APEX" in data["full_text"]

    def test_generate_html_dashboard(self, tmp_path):
        from extract_pdf import generate_html_dashboard

        extractor = PDFConfidenceExtractor()
        result = extractor.extract(SAMPLES_DIR / "sample_digital_invoice.pdf")
        output_html = tmp_path / "dashboard.html"

        generated_path = generate_html_dashboard(result.to_dict(), output_html)
        assert generated_path.exists()

        content = generated_path.read_text(encoding="utf-8")
        assert "<!DOCTYPE html>" in content
        assert "PDF Extraction & Confidence Reviewer" in content
        assert "sample_digital_invoice.pdf" in content
        assert "thresholdSlider" in content
        assert "themeToggleBtn" in content

    def test_cli_execution_with_html_output(self, tmp_path):
        input_pdf = SAMPLES_DIR / "sample_digital_invoice.pdf"
        output_json = tmp_path / "cli_output.json"
        output_html = tmp_path / "cli_dashboard.html"

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
        assert res.returncode == 0
        assert output_json.exists()
        assert output_html.exists()
        assert output_html.stat().st_size > 10000
