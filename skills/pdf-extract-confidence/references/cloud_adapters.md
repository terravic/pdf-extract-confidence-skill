# Cloud Engine Adapters Guide
 
This guide describes how to connect cloud document intelligence services and external OCR engines to the PDF Confidence Extractor for enterprise scale workloads.

## 1. Cloud Document OCR Adapters

Cloud Document OCR APIs provide layout analysis, optical character recognition, and entity extraction with character and token-level confidence scores.

### Setup Requirements
1. Cloud project with document extraction API enabled.
2. An active document OCR processor or endpoint.
3. Service account credentials configured in standard environment variables.

### Conversion Logic
When invoking cloud document intelligence APIs:
- The response returns a document object containing text, pages, tokens, and lines.
- Each page contains tokens with layout bounding boxes and confidence values (range 0.0 to 1.0).
- The adapter maps each token directly to the output schema:
  - word: token layout text substring or parsed text
  - confidence: token layout confidence (native 0.0 to 1.0)
  - bbox: normalized coordinates converted to points (x * page_width, y * page_height)
  - source: "cloud_docai"

## 2. Cloud Text Recognition Adapters

Cloud text recognition services provide optical character recognition and document analysis with word-level confidence metrics.

### Setup Requirements
1. Cloud account with document text recognition permissions.
2. Credentials configured in standard environment variables or CLI config.

### Conversion Logic
When invoking document text recognition endpoints:
- The service returns blocks of type word and line.
- Each word block contains:
  - Text: The recognized word string.
  - Confidence: Recognition confidence on a 0 to 100 scale.
  - Geometry.BoundingBox: Relative bounding box coordinates.
- The adapter maps word blocks:
  - word: Block["Text"]
  - confidence: Block["Confidence"] / 100.0
  - bbox: Geometry converted to page point dimensions
  - source: "cloud_textract"

## 3. Extensibility Hook

The extractor class in extract_pdf.py defines the BaseCloudAdapter interface. To add a custom cloud backend, implement the extract_page_words(image_or_pdf_bytes, page_number) method and register the engine name in the extractor configuration.

