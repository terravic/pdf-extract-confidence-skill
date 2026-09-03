"""
Unit and integration tests for Agentic LLM Word Correction Engine.
Tests GeminiWordCorrector prompt generation, context windowing, mock evaluation,
Option A staged suggestions, and Option B auto-apply modes.
"""

from __future__ import annotations

import json
import os
from pathlib import Path
import subprocess
import sys
import unittest

SCRIPTS_DIR = Path(__file__).resolve().parent.parent / "skills" / "pdf-extract-confidence" / "scripts"
if str(SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPTS_DIR))

from extract_pdf import PDFConfidenceExtractor, validate_against_schema
from llm_correction import GeminiWordCorrector

SAMPLES_DIR = Path(__file__).resolve().parent.parent / "samples"
SCHEMA_PATH = Path(__file__).resolve().parent.parent / "skills" / "pdf-extract-confidence" / "resources" / "schema.json"


class TestLLMCorrectionEngine(unittest.TestCase):
    """Test suite covering GeminiWordCorrector and CLI LLM workflows."""

    def setUp(self):
        self.sample_extraction = {
            "metadata": {
                "filename": "sample_invoice.pdf",
                "total_pages": 1,
                "extraction_engine": "hybrid_extractor",
                "timestamp_utc": "2026-08-28T12:00:00Z",
                "total_words": 5,
                "mean_confidence": 0.88,
                "min_confidence": 0.71,
                "low_confidence_count": 1,
                "low_confidence_threshold": 0.85,
            },
            "full_text": "Invoice Number: INV-2O26-8841 Date: 2026-08-28",
            "pages": [
                {
                    "page_number": 1,
                    "page_type": "ocr",
                    "width": 612.0,
                    "height": 792.0,
                    "word_count": 5,
                    "mean_confidence": 0.88,
                    "text": "Invoice Number: INV-2O26-8841 Date: 2026-08-28",
                    "words": [
                        {"word": "Invoice", "confidence": 1.0, "source": "digital", "bbox": {"x0": 10, "top": 10, "x1": 40, "bottom": 20}},
                        {"word": "Number:", "confidence": 1.0, "source": "digital", "bbox": {"x0": 45, "top": 10, "x1": 80, "bottom": 20}},
                        {"word": "INV-2O26-8841", "confidence": 0.71, "source": "ocr", "bbox": {"x0": 85, "top": 10, "x1": 150, "bottom": 20}},
                        {"word": "Date:", "confidence": 1.0, "source": "digital", "bbox": {"x0": 160, "top": 10, "x1": 190, "bottom": 20}},
                        {"word": "2026-08-28", "confidence": 1.0, "source": "digital", "bbox": {"x0": 195, "top": 10, "x1": 240, "bottom": 20}},
                    ],
                }
            ],
            "low_confidence_words": [
                {
                    "word": "INV-2O26-8841",
                    "confidence": 0.71,
                    "page": 1,
                    "source": "ocr",
                    "bbox": {"x0": 85, "top": 10, "x1": 150, "bottom": 20},
                    "reason": "ocr_uncertainty",
                }
            ],
        }

    def test_default_model_identifier(self):
        corrector = GeminiWordCorrector()
        self.assertEqual(corrector.model, "gemini-3.7-flash")

    def test_context_window_extraction(self):
        corrector = GeminiWordCorrector()
        words = self.sample_extraction["pages"][0]["words"]
        context = corrector.extract_line_context(words, target_index=2, window_size=2)
        self.assertIn("Invoice Number: INV-2O26-8841 Date: 2026-08-28", context)

    def test_prompt_generation_schema(self):
        corrector = GeminiWordCorrector()
        items = [
            {"index": 0, "original_word": "INV-2O26-8841", "confidence": 0.71, "page": 1, "surrounding_context": "Invoice Number: INV-2O26-8841"}
        ]
        prompt = corrector.generate_correction_prompt(items)
        self.assertIn("Tokens to review:", prompt)
        self.assertIn("INV-2O26-8841", prompt)
        self.assertIn("action", prompt)
        self.assertIn("suggested_word", prompt)

    def test_option_a_staged_suggestions_attachment(self):
        corrector = GeminiWordCorrector(mock_mode=True)
        suggestions = corrector.correct_low_confidence_tokens(self.sample_extraction)

        self.assertEqual(len(suggestions), 1)
        self.assertEqual(suggestions[0]["original_word"], "INV-2O26-8841")
        self.assertEqual(suggestions[0]["suggested_word"], "INV-2026-8841")
        self.assertEqual(suggestions[0]["action"], "correct")

        # Apply in Option A staged mode
        staged_dict = corrector.apply_suggestions(self.sample_extraction, suggestions, auto_apply_all=False)
        self.assertIn("llm_suggestions", staged_dict)
        self.assertEqual(len(staged_dict["llm_suggestions"]), 1)
        # Verify word was NOT modified in-place in staged mode
        self.assertEqual(staged_dict["pages"][0]["words"][2]["word"], "INV-2O26-8841")

        # Verify schema validity
        valid, error = validate_against_schema(staged_dict, SCHEMA_PATH)
        self.assertTrue(valid, f"Schema validation failed: {error}")

    def test_option_b_direct_auto_apply(self):
        corrector = GeminiWordCorrector(mock_mode=True)
        suggestions = corrector.correct_low_confidence_tokens(self.sample_extraction)

        # Apply in Option B auto-apply mode
        auto_dict = corrector.apply_suggestions(self.sample_extraction, suggestions, auto_apply_all=True)

        target_word = auto_dict["pages"][0]["words"][2]
        self.assertEqual(target_word["word"], "INV-2026-8841")
        self.assertEqual(target_word["confidence"], 1.0)
        self.assertTrue(target_word.get("llm_corrected"))
        self.assertEqual(target_word.get("original_word"), "INV-2O26-8841")
        self.assertIn("INV-2026-8841", auto_dict["full_text"])
        self.assertEqual(auto_dict["metadata"]["low_confidence_count"], 0)
        self.assertEqual(auto_dict["metadata"]["llm_corrections_count"], 1)

        # Verify schema validity
        valid, error = validate_against_schema(auto_dict, SCHEMA_PATH)
        self.assertTrue(valid, f"Schema validation failed: {error}")

    def test_cli_llm_flags_execution(self):
        script_path = SCRIPTS_DIR / "extract_pdf.py"
        pdf_path = SAMPLES_DIR / "sample_scanned_receipt.pdf"
        cmd = [
            sys.executable,
            str(script_path),
            "--input", str(pdf_path),
            "--llm-correct",
            "--mock-llm",
            "--llm-model", "gemini-3.7-flash",
            "--validate",
        ]
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        output_data = json.loads(result.stdout)

        self.assertIn("llm_suggestions", output_data)
        self.assertGreater(len(output_data["llm_suggestions"]), 0)


    def test_heuristic_ocr_fixes(self):
        corrector = GeminiWordCorrector(mock_mode=True)
        # Test punctuation/colon artifacts
        self.assertEqual(corrector._apply_heuristic_ocr_fix("Larry:", "")[1], "Larry")
        self.assertEqual(corrector._apply_heuristic_ocr_fix("12345)", "")[1], "12345")
        self.assertEqual(corrector._apply_heuristic_ocr_fix("Boulevard,", "")[1], "Boulevard")
        self.assertEqual(corrector._apply_heuristic_ocr_fix("ER),", "")[1], "ER")
        self.assertEqual(corrector._apply_heuristic_ocr_fix("CATECOAY:", "")[1], "CATEGORY")
        self.assertEqual(corrector._apply_heuristic_ocr_fix("iOTICE", "")[1], "NOTICE")
        self.assertEqual(corrector._apply_heuristic_ocr_fix("T0tal", "")[1], "Total")

    def test_multimodal_crop_helpers(self):
        corrector = GeminiWordCorrector(mock_mode=True)
        # Test with empty/invalid inputs
        self.assertIsNone(corrector.crop_word_image_b64(None, {"x0": 0, "top": 0, "x1": 10, "bottom": 10}, 100, 100))
        self.assertIsNone(corrector.crop_word_image_b64("data:image/png;base64,invalid", {}, 100, 100))


if __name__ == "__main__":
    unittest.main()


