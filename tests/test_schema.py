import sys
from pathlib import Path
import subprocess
import unittest

SCRIPTS_DIR = Path(__file__).resolve().parent.parent / "skills" / "pdf-extract-confidence" / "scripts"
if str(SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPTS_DIR))

from extract_pdf import (
    PDFConfidenceExtractor,
    validate_against_schema,
)

SAMPLES_DIR = Path(__file__).resolve().parent.parent / "samples"
SCHEMA_PATH = Path(__file__).resolve().parent.parent / "skills" / "pdf-extract-confidence" / "resources" / "schema.json"
GEN_SCRIPT = SCRIPTS_DIR / "generate_samples.py"


class TestSchemaValidation(unittest.TestCase):
    """Test suite validating JSON output compliance against schema.json."""

    @classmethod
    def setUpClass(cls):
        """Ensure sample test PDFs exist before test execution."""
        if not (SAMPLES_DIR / "sample_digital_invoice.pdf").exists():
            subprocess.run([sys.executable, str(GEN_SCRIPT)], check=True)

    def test_schema_file_exists(self):
        self.assertTrue(SCHEMA_PATH.exists())

    def test_valid_digital_output_passes_validation(self):
        extractor = PDFConfidenceExtractor()
        result = extractor.extract(SAMPLES_DIR / "sample_digital_invoice.pdf")
        output_dict = result.to_dict()

        is_valid, error = validate_against_schema(output_dict, SCHEMA_PATH)
        self.assertTrue(is_valid, f"Validation failed: {error}")

    def test_valid_mixed_output_passes_validation(self):
        extractor = PDFConfidenceExtractor()
        result = extractor.extract(SAMPLES_DIR / "sample_mixed_report.pdf")
        output_dict = result.to_dict()

        is_valid, error = validate_against_schema(output_dict, SCHEMA_PATH)
        self.assertTrue(is_valid, f"Validation failed: {error}")

    def test_valid_llm_corrected_output_passes_validation(self):
        valid_llm_dict = {
            "metadata": {
                "filename": "invoice_scan.pdf",
                "total_pages": 1,
                "extraction_engine": "hybrid_extractor",
                "timestamp_utc": "2026-08-28T12:00:00Z",
                "total_words": 2,
                "mean_confidence": 1.0,
                "min_confidence": 1.0,
                "low_confidence_count": 0,
                "low_confidence_threshold": 0.85,
                "human_corrections_count": 1,
                "llm_corrections_count": 1,
                "llm_approved_count": 0,
                "llm_model": "gemini-3.7-flash",
                "last_modified_utc": "2026-08-28T12:05:00Z",
            },
            "full_text": "INV-2026 APPROVED",
            "pages": [
                {
                    "page_number": 1,
                    "page_type": "ocr",
                    "width": 612.0,
                    "height": 792.0,
                    "word_count": 2,
                    "mean_confidence": 1.0,
                    "text": "INV-2026 APPROVED",
                    "words": [
                        {
                            "word": "INV-2026",
                            "confidence": 1.0,
                            "source": "ocr",
                            "bbox": {"x0": 10.0, "top": 20.0, "x1": 50.0, "bottom": 30.0},
                            "original_word": "INV-2O26",
                            "suggested_word": "INV-2026",
                            "llm_corrected": True,
                            "correction_source": "gemini-3.7-flash",
                            "correction_reason": "OCR letter O replaced with digit 0.",
                        },
                        {
                            "word": "APPROVED",
                            "confidence": 1.0,
                            "source": "ocr",
                            "bbox": {"x0": 55.0, "top": 20.0, "x1": 100.0, "bottom": 30.0},
                            "human_corrected": True,
                        }
                    ],
                }
            ],
            "low_confidence_words": [],
            "llm_suggestions": [
                {
                    "page": 1,
                    "word_index": 0,
                    "original_word": "INV-2O26",
                    "suggested_word": "INV-2026",
                    "action": "correct",
                    "reason": "OCR digit fix",
                    "confidence": 0.71,
                }
            ]
        }
        is_valid, error = validate_against_schema(valid_llm_dict, SCHEMA_PATH)
        self.assertTrue(is_valid, f"Validation failed: {error}")

    def test_invalid_structure_rejected(self):
        # Missing required metadata
        invalid_dict = {
            "metadata": {},
            "full_text": "Sample text",
            "pages": [],
            "low_confidence_words": [],
        }
        is_valid, error = validate_against_schema(invalid_dict, SCHEMA_PATH)
        self.assertFalse(is_valid)
        self.assertIsNotNone(error)

    def test_invalid_confidence_range_rejected(self):
        valid_dict = {
            "metadata": {
                "filename": "test.pdf",
                "total_pages": 1,
                "extraction_engine": "test",
                "timestamp_utc": "2026-08-28T12:00:00Z",
                "total_words": 1,
                "mean_confidence": 1.5,  # Out of range > 1.0
                "min_confidence": 1.5,
                "low_confidence_count": 0,
                "low_confidence_threshold": 0.85,
            },
            "full_text": "word",
            "pages": [
                {
                    "page_number": 1,
                    "page_type": "digital",
                    "width": 612.0,
                    "height": 792.0,
                    "word_count": 1,
                    "mean_confidence": 1.5,
                    "text": "word",
                    "words": [
                        {
                            "word": "word",
                            "confidence": 1.5,  # Out of range > 1.0
                            "source": "digital",
                            "bbox": {"x0": 0, "top": 0, "x1": 10, "bottom": 10},
                        }
                    ],
                }
            ],
            "low_confidence_words": [],
        }
        is_valid, error = validate_against_schema(valid_dict, SCHEMA_PATH)
        self.assertFalse(is_valid)


if __name__ == "__main__":
    unittest.main()

