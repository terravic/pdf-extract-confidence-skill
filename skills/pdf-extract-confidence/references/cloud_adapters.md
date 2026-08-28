# Cloud Engine Adapters Guide

This guide describes how to connect Google Cloud Document AI and Amazon Textract to the PDF Confidence Extractor for enterprise scale workloads.

## 1. Google Cloud Document AI

Google Cloud Document AI provides layout analysis, optical character recognition, and entity extraction with character and token-level confidence scores.

### Setup Requirements
1. Google Cloud Project with the Document AI API enabled.
2. An active Document OCR or General Form processor ID.
3. Google Cloud service account credentials configured via GOOGLE_APPLICATION_CREDENTIALS or gcloud auth.

### Conversion Logic
When invoking Document AI:
- The response returns a document object containing text, pages, tokens, and lines.
- Each page contains tokens with layout bounding boxes and confidence values (range 0.0 to 1.0).
- The adapter maps each token directly to the output schema:
  - word: token.layout.text_anchor substring or parsed text
  - confidence: token.layout.confidence (native 0.0 to 1.0)
  - bbox: normalized coordinates converted to points (x * page_width, y * page_height)
  - source: "cloud_docai"

## 2. Amazon Textract

Amazon Textract provides optical character recognition and document analysis with word-level confidence metrics.

### Setup Requirements
1. AWS account with Textract permissions.
2. AWS credentials configured in environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION) or AWS CLI config.

### Conversion Logic
When invoking DetectDocumentText or AnalyzeDocument:
- Amazon Textract returns Blocks of type WORD and LINE.
- Each WORD block contains:
  - Text: The recognized word string.
  - Confidence: Recognition confidence on a 0 to 100 scale.
  - Geometry.BoundingBox: Relative bounding box coordinates.
- The adapter maps Textract WORD blocks:
  - word: Block["Text"]
  - confidence: Block["Confidence"] / 100.0
  - bbox: Geometry converted to page point dimensions
  - source: "cloud_textract"

## 3. Extensibility Hook

The extractor class in extract_pdf.py defines the BaseCloudAdapter interface. To add a custom cloud backend, implement the extract_page_words(image_or_pdf_bytes, page_number) method and register the engine name in the extractor configuration.
