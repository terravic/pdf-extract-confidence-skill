---
name: pdf-extract-confidence
description: >-
  Extract text from PDF documents (digital vector, scanned, or hybrid) with
  normalized per-word confidence scores (0.0 to 1.0) and output dual-purpose
  JSON containing complete document text and word-level audit metadata. Use
  this skill whenever the user asks to extract text from a PDF, inspect or
  verify word recognition confidence scores, extract PDFs into JSON, or check
  for low-confidence or potentially misrecognized words in PDF files.
---

# PDF Word-Level Confidence Extraction Skill

This skill provides an automated workflow to process PDF files, extract character and word tokens, compute normalized confidence scores (0.0 to 1.0) for every word, and generate a standardized JSON document.

## Procedure for the Agent

Follow these sequential steps when a user requests PDF text extraction with confidence scoring.

### Step 1: Identify Input PDF and Parameters

1. Locate the relative path to the target PDF file requested by the user.
2. Determine if the user specified a custom confidence threshold (default is 0.85).
3. Determine if the user specified an extraction mode:
   - `auto` (default): Automatically detects digital text vs image/scanned pages.
   - `digital`: Fast vector text extraction only.
   - `ocr`: Optical character recognition on rendered page images.
4. Determine the target output JSON file path. If the user did not specify an output file, generate an output file named `<basename>_extracted.json` in the same directory or current workspace.

### Step 2: Execute the Extraction Script

Run the extraction script using the Python CLI tool:

```bash
python3 skills/pdf-extract-confidence/scripts/extract_pdf.py \
  --input "samples/sample_digital_invoice.pdf" \
  --output "output.json" \
  --html-output "dashboard.html" \
  --threshold 0.85 \
  --mode auto \
  --validate
```

Key CLI flags:
- `-i, --input PATH`: Target input PDF file (required).
- `-o, --output PATH`: Output JSON file path.
- `--html-output PATH`: Generates a standalone interactive HTML dashboard embedding the extraction data.
- `-t, --threshold FLOAT`: Cutoff for low confidence flagging (default: 0.85).
- `-m, --mode [auto|digital|ocr]`: Extraction pipeline modality.
- `--validate`: Validates output against the resource schema.
- `--compact`: Generates compact unformatted JSON instead of indented formatting.

### Step 3: Verify Output Integrity

1. Check that the script completed with exit code 0.
2. Read the output JSON file and verify the top-level sections:
   - `metadata`: Contains total_pages, total_words, mean_confidence, min_confidence, low_confidence_count.
   - `full_text`: Consolidated plain text for direct consumption.
   - `pages`: Array of per-page objects containing text and word arrays.
   - `low_confidence_words`: Array containing any words with confidence < threshold.

### Step 4: Visual UI Dashboard Presentation

When the user asks to visually review, verify, or correct words using a dashboard:
1. Generate the standalone dashboard file by passing `--html-output <filename>_dashboard.html` or open the pre-packaged dashboard in `skills/pdf-extract-confidence/ui/index.html`.
2. The interactive UI dashboard provides:
   - Dynamic Confidence Threshold Slider: Sliding between 0.50 and 1.00 instantly updates word highlights across both the visual document and text views.
   - Visual Page View with Bounding Boxes: Overlays bounding boxes on the rendered PDF page, color-coded by confidence (green for high confidence, amber/red for below threshold).
   - Human-in-the-Loop Inspector: Click any word to inspect its confidence score, source, and coordinates, type a manual correction, and click "Apply" to update the word.
   - Audit Queue Table: Lists all words below the active threshold with one-click jump-to-page inspection.
   - Light and Dark Theme Toggle: Persists user preference via localStorage.
   - Export Corrected JSON: Allows downloading the updated JSON matching `schema.json` with all manual corrections preserved.

### Step 5: Present Findings to the User

Provide a clean, structured summary containing:
1. Document metadata (file name, total pages, total words extracted).
2. Overall confidence metrics (mean confidence, minimum confidence).
3. Audit summary: Number of low-confidence words detected.
4. If low-confidence words exist, list the top flagged words with page number, confidence score, and bounding box.
5. Location of the generated JSON output file and interactive HTML dashboard.

## Downstream Consumption Patterns

The generated JSON file accommodates two distinct downstream consumer types:

1. **Full-Text Consumers**: Direct NLP or LLM ingestion can access the `full_text` field or `pages[i].text` without traversing word arrays.
2. **Verification & Audit Consumers**: Human-in-the-loop review systems can inspect `low_confidence_words` or iterate over `pages[i].words` to render bounding boxes (`bbox`) over page images for interactive review.

## References and Resources

- Extraction Script: [extract_pdf.py](skills/pdf-extract-confidence/scripts/extract_pdf.py)
- UI Dashboard Template: [index.html](skills/pdf-extract-confidence/ui/index.html)
- UI Stylesheet: [styles.css](skills/pdf-extract-confidence/ui/styles.css)
- UI Application Logic: [app.js](skills/pdf-extract-confidence/ui/app.js)
- Synthetic Sample Generator: [generate_samples.py](skills/pdf-extract-confidence/scripts/generate_samples.py)
- JSON Schema Definition: [schema.json](skills/pdf-extract-confidence/resources/schema.json)
- Sample Output Example: [sample_output.json](skills/pdf-extract-confidence/resources/sample_output.json)
- Confidence Methodology: [confidence_scoring.md](skills/pdf-extract-confidence/references/confidence_scoring.md)
- Cloud Engine Adapters: [cloud_adapters.md](skills/pdf-extract-confidence/references/cloud_adapters.md)
