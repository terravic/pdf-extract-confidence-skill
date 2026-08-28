# PDF Word-Level Confidence Extraction Skill

An agent skill and standalone Python tool designed for Gemini Enterprise App, Antigravity, and other standard agent harnesses. It extracts text from PDF documents (digital vector, scanned raster, or hybrid), computes normalized per-word confidence scores in the range [0.0, 1.0], outputs structured JSON, and provides an interactive UI Dashboard for visual verification and human-in-the-loop correction.

![PDF Word-Level Confidence Extraction Skill Architecture & Workflow](assets/skill_workflow_diagram.jpg)

---

## Table of Contents

1. Project Overview
2. System Architecture
3. Directory Structure
4. Installation and Setup
5. How to Use the Python Code
   - Command Line Interface (CLI)
   - Python Library API
6. Interactive UI Dashboard
   - Overview and Capabilities
   - Visual PDF Page and Bounding Box View
   - Confidence Cutoff Slider
   - Human-in-the-Loop Word Editor
   - Audit Queue Review
   - Light and Dark Theme Toggle
   - Generating Standalone Dashboard Bundles
7. Non-Technical User Guide: Using the Skill in an Agent Harness
   - Overview for Non-Technical Users
   - What the Skill Needs to Run
   - Step-by-Step Execution Workflow
   - Understanding Confidence Scores
   - Real-World Prompt Examples & Workflows
   - Sample Agent Conversation and Output
   - How to Use the Visual Dashboard for Corrections
8. Synthetic Test Data
9. JSON Output Schema Reference
10. Running the Test Suite
11. License and Contribution

---

## 1. Project Overview

Standard PDF extraction tools often return plain text without indicating how reliable each extracted token is. In real-world enterprise workflows (such as invoice processing, compliance audits, and record digitization), downstream systems need to distinguish between high-certainty text and potential OCR misrecognitions.

This project delivers:
- Extraction Modality Detection: Automatically distinguishes between digital vector pages and scanned image pages.
- Per-Word Confidence Scoring: Every extracted word is assigned a confidence score between 0.0 and 1.0.
- Dual-Purpose JSON Output: Contains both consolidated full text for immediate NLP/LLM ingestion and a structured word-by-word array with coordinates (`bbox`) for audit trails.
- Low-Confidence Flagging: Automatically isolates words scoring below a configurable cutoff threshold (default: 0.85) into a dedicated audit array.
- Interactive UI Dashboard: A responsive HTML/CSS/JavaScript interface featuring dynamic threshold sliders, visual PDF page bounding boxes, light/dark themes, and human-in-the-loop editing.
- Multi-Harness Compatibility: Packaged as a standard Skill (`skills/pdf-extract-confidence/SKILL.md`) that works seamlessly in Gemini Enterprise App, Antigravity, and standard Skill Plug-in environments.

---

## 2. System Architecture

The extractor implements a hybrid pipeline:

1. Modality Assessment:
   - Digital Vector Pages: Extracted directly via vector streams (`pdfplumber` / `pypdf`). Confidence is evaluated against character encoding integrity (valid Unicode mapping = 1.0, replacement characters or unmapped glyphs = degraded score).
   - Scanned Pages: Rendered to high-resolution bitmaps and processed via Optical Character Recognition (OCR). Word confidence is derived from character classifier softmax probabilities.
   - Hybrid Pages: Pages containing vector text alongside raster stamps or signatures are processed to extract all readable elements.
2. Coordinate Normalization: Bounding boxes are computed in standard PDF point dimensions (72 points per inch) with top-left origin.
3. Metric Computation: Global mean confidence, minimum confidence, total word count, and low-confidence counts are computed and recorded in the metadata block.
4. UI Dashboard Rendering: Interactive client-side application renders pages with SVG/DOM overlays, synchronized word selection, and real-time JSON export.
5. Schema Validation: All outputs conform to `skills/pdf-extract-confidence/resources/schema.json`.

---

## 3. Directory Structure

```text
pdf-extract-confidence-skill/
├── LICENSE                                # Apache License 2.0
├── README.md                              # Main documentation (no icons, no emojis)
├── requirements.txt                       # Python dependencies
├── pyproject.toml                         # Packaging specification
├── assets/
│   └── skill_workflow_diagram.jpg         # Skill architecture and workflow overview
├── skills/
│   └── pdf-extract-confidence/
│       ├── SKILL.md                       # Agent skill definition and runbook
│       ├── ui/
│       │   ├── index.html                 # Interactive UI Dashboard
│       │   ├── styles.css                 # Responsive stylesheet (Light & Dark themes)
│       │   └── app.js                     # Slider filtering, coordinate mapping, and HITL logic
│       ├── scripts/
│       │   ├── extract_pdf.py             # Core extraction engine, CLI, and HTML bundler
│       │   └── generate_samples.py        # Synthetic sample PDF generator
│       ├── resources/
│       │   ├── schema.json                # JSON Schema for extraction output
│       │   └── sample_output.json         # Reference JSON output structure
│       └── references/
│           ├── confidence_scoring.md      # Confidence scoring methodology
│           └── cloud_adapters.md          # Cloud Document AI and AWS Textract guide
├── samples/
│   ├── sample_digital_invoice.pdf         # Synthetic digital invoice (0% PHI)
│   ├── sample_digital_invoice_extracted.json
│   ├── sample_digital_invoice_dashboard.html
│   ├── sample_mixed_report.pdf            # Synthetic mixed report (0% PHI)
│   ├── sample_mixed_report_extracted.json
│   ├── sample_mixed_report_dashboard.html
│   ├── sample_scanned_receipt.pdf         # Synthetic raster scan (0% PHI)
│   ├── sample_scanned_receipt_extracted.json
│   └── sample_scanned_receipt_dashboard.html
└── tests/
    ├── __init__.py
    ├── test_extractor.py                  # Unit, CLI, and Dashboard integration tests
    └── test_schema.py                     # Schema validation tests
```

---

## 4. Installation and Setup

### Prerequisites
- Python 3.9 or higher.
- Optional: Tesseract OCR (if processing local scanned-image PDFs with local OCR engine).

### Install Dependencies

```bash
pip install -r requirements.txt
```

To install development and test dependencies:

```bash
pip install -e ".[dev]"
```

---

## 5. How to Use the Python Code

### Command Line Interface (CLI)

The extraction script can be executed directly from the terminal.

#### Basic Extraction
```bash
python3 skills/pdf-extract-confidence/scripts/extract_pdf.py \
  --input samples/sample_digital_invoice.pdf \
  --output output.json
```

#### Extract and Generate Standalone HTML Dashboard
Generate both the JSON output and a self-contained interactive dashboard bundle:
```bash
python3 skills/pdf-extract-confidence/scripts/extract_pdf.py \
  --input samples/sample_digital_invoice.pdf \
  --output output.json \
  --html-output dashboard.html
```

#### Extract with Custom Confidence Threshold
Set the cutoff threshold (between 0.0 and 1.0) below which words are flagged in the `low_confidence_words` audit list:
```bash
python3 skills/pdf-extract-confidence/scripts/extract_pdf.py \
  --input samples/sample_digital_invoice.pdf \
  --output output.json \
  --threshold 0.90
```

#### Enforce Extraction Mode
Choose between `auto` (default), `digital`, or `ocr`:
```bash
python3 skills/pdf-extract-confidence/scripts/extract_pdf.py \
  --input samples/sample_scanned_receipt.pdf \
  --output output.json \
  --mode ocr
```

#### Validate Against JSON Schema
Append `--validate` to verify that the generated output complies with `schema.json`:
```bash
python3 skills/pdf-extract-confidence/scripts/extract_pdf.py \
  --input samples/sample_mixed_report.pdf \
  --output output.json \
  --validate
```

#### CLI Options Reference

Option | Type | Default | Description
:--- | :--- | :--- | :---
`-i, --input` | String | (Required) | Path to the PDF file to process.
`-o, --output` | String | None | Path to save output JSON. If omitted, prints to stdout.
`--html-output` | String | None | Path to generate a standalone interactive HTML dashboard.
`-t, --threshold` | Float | `0.85` | Cutoff score in range [0.0, 1.0] for low-confidence audit list.
`-m, --mode` | String | `auto` | Extraction modality: `auto`, `digital`, or `ocr`.
`--validate` | Flag | `False` | Validates generated JSON against `resources/schema.json`.
`--compact` | Flag | `False` | Produces unformatted compact JSON instead of indented output.

---

### Python Library API

You can import and use the extractor directly within your own Python applications.

```python
from pathlib import Path
from skills.pdf_extract_confidence.scripts.extract_pdf import (
    PDFConfidenceExtractor,
    generate_html_dashboard,
)

# Initialize extractor with default threshold
extractor = PDFConfidenceExtractor(default_threshold=0.85)

# Process PDF document
result = extractor.extract(
    pdf_path="samples/sample_digital_invoice.pdf",
    threshold=0.85,
    mode="auto"
)

# Access document metadata
print("Filename:", result.filename)
print("Total Words:", result.total_words)
print("Mean Confidence:", result.mean_confidence)
print("Low Confidence Words Count:", result.low_confidence_count)

# Access full extracted text
print("Document Text:\n", result.full_text)

# Access per-word confidence data on page 1
for word_item in result.pages[0].words[:5]:
    print(f"Word: {word_item.word:<15} | Confidence: {word_item.confidence:.2f} | Source: {word_item.source}")

# Export to JSON string or dictionary
json_data = result.to_json(indent=2)
output_dict = result.to_dict()

# Generate standalone HTML Dashboard
generate_html_dashboard(output_dict, "invoice_dashboard.html")
```

---

## 6. Interactive UI Dashboard

The UI Dashboard (`skills/pdf-extract-confidence/ui/index.html`) is a responsive, single-page application built with HTML, CSS, and JavaScript. It runs directly inside iframe containers in agent applications as well as in any modern desktop web browser.

### Features & Capabilities

1. **Visual Document Page & Bounding Box View (Left Pane)**:
   - Displays the rendered PDF page geometry with standard point coordinate scaling (72 points per inch).
   - Supports digital vector invoices, multi-page reports, and scanned thermal receipts with adapted typography and document modality badges (`Digital Vector`, `Hybrid Multi-Page`, `Scanned OCR Receipt`).
   - Overlays interactive bounding boxes for every extracted word token:
     - **Red/Amber outline**: Word confidence is strictly below the global cutoff threshold.
     - **Subtle Green outline**: Word confidence meets or exceeds the cutoff threshold.
     - **Purple outline**: Word has been manually edited and verified by a human reviewer.
     - **Solid Blue outline with glow**: Currently selected word token.
   - Clicking any bounding box on the page automatically selects the word, focuses it in the Inspector, and highlights its position in the token stream.
   - Includes zoom controls (`-`, `100%`, `+`, `Reset`) and multi-page stepper controls (`Previous Page`, `Next Page`).

2. **Global Cutoff Threshold Slider & Number Input**:
   - Continuous range slider linked two-way to an editable number input field (range: `0.00` to `1.00`).
   - Adjusting either the slider or the number field instantly updates:
     - The global threshold value and percentage badge.
     - Highlight colors on the visual document view.
     - Low-confidence badge counts and filter button counters.
     - The populated items in the Audit Review Queue.

3. **Active View Filter Buttons**:
   - **All Words**: Displays all extracted word tokens on both the document sheet and the text stream.
   - **Low Confidence Only**: Dims high-confidence text to a subtle background watermark while highlighting all sub-threshold tokens with bright red bounding boxes, and filters the text stream to show only low-confidence tokens.
   - **Corrected Only**: Dims uncorrected text while spotlighting human-corrected tokens in purple, and filters the text stream to show only verified tokens.

4. **Right-Pane Tabbed Workspace**:
   - **Tab 1: Document Text & Word Inspector**:
     - Word Inspector card showing word text, animated confidence meter bar, extraction source (`digital` vs `ocr`), page number, and bounding box coordinates (`x0`, `top`, `x1`, `bottom`).
     - Manual correction text field with **Apply** (Enter key) and **Approve** buttons.
     - Quick navigation buttons to cycle through issues across pages with **[< Prev Issue]** and **[Next Issue >]**.
     - Live interactive token flow stream with search filtering.
   - **Tab 2: Full Plain Text**:
     - Displays the continuous, consolidated plain text extracted from the entire PDF document across all pages.
     - Includes a one-click **[Copy Text]** button for easy copying into external applications.
   - **Tab 3: JSON Output**:
     - Live formatted view of the extraction JSON adhering strictly to `schema.json`.
     - Automatically updates in real time as corrections are made on the PDF document view.
     - Includes dedicated **[Copy JSON]** and **[Download JSON]** buttons.
   - **Tab 4: Audit Review Queue**:
     - Enumerates all tokens currently scoring below the active cutoff threshold.
     - Displays word text, confidence score badge, source, and page number with a one-click **[Inspect]** jump button.

5. **Light and Dark Theme Toggle**:
   - Theme toggle button in the header with Sun and Moon SVG icons (`[Dark Mode]` / `[Light Mode]`).
   - Uses tailored CSS color tokens and persists user preference safely across sessions.

6. **Import and Export**:
   - **Load JSON**: Open any existing extraction JSON file via the file picker to populate the entire dashboard.
   - **View JSON**: View formatted JSON in an interactive modal with single-click clipboard copy.
   - **Export Corrected JSON**: Download the updated JSON file containing all manual edits, updated word counts, and modified confidence metrics.

---

## 7. Non-Technical User Guide: Using the Skill in an Agent Harness

This section is written for non-technical users, analysts, compliance officers, and business operations specialists who want to use this skill through conversational AI agent assistants (such as Gemini Enterprise App, Antigravity, or other enterprise agent workspaces).

### Overview for Non-Technical Users

When you upload a PDF file (such as an invoice, receipt, legal contract, or medical report) to an AI assistant, you often want two things:
1. The text extracted accurately into readable format.
2. An assurance that no critical numbers or names were misread or guessed by optical character recognition (OCR).

This skill automatically evaluates every single word in your document and scores it on a scale from 0.0 to 1.0 (0% to 100% confidence). If any word is blurry, tilted, or ambiguous, the skill flags it immediately and gives you a visual dashboard where you can click on the word, see where it appears on the original page, and correct it with one click.

---

### What the Skill Needs to Run

To use this skill in an AI chat window, you only need to provide:
1. **Your PDF File**: Either upload the PDF file directly to the chat, or provide the filename/path if it is already in your workspace (for example, `samples/sample_digital_invoice.pdf`).
2. **Your Goal in Plain English**: Tell the AI what you want to do (for example, extract the text, check for low-confidence words, or generate a visual dashboard).
3. **(Optional) Quality Cutoff**: If you have a specific accuracy requirement (such as "flag anything below 90% confidence"), mention it in your prompt.

---

### Step-by-Step Execution Workflow

Follow these simple steps:

1. **Step 1: Open the Chat Interface**: Open your AI assistant chat window (Gemini Enterprise App, Antigravity, or web workspace).
2. **Step 2: Attach Your PDF Document**: Drag and drop your PDF into the chat box or type its name.
3. **Step 3: Ask the Agent**: Type your request using natural language (see the prompt examples below).
4. **Step 4: Review the AI Summary**: The AI processes the document and reports:
   - Total pages and total words extracted.
   - Overall document confidence score (for example, 98.5%).
   - How many words fell below your confidence cutoff.
   - A list of any suspicious or low-confidence words with their page numbers.
5. **Step 5: Open the Visual Dashboard (Optional)**: If you asked for a dashboard, the AI will provide a link to an interactive web page (`invoice_dashboard.html`). In this dashboard, you can visually inspect each word, adjust the threshold slider, and correct any words directly on the page.

---

### Understanding Confidence Scores

The confidence score indicates how certain the computer vision and extraction model is that a word was read correctly:

Score Range | Meaning | Typical Scenario | Recommended Action
:--- | :--- | :--- | :---
`1.00 (100%)` | Perfect Certainty | Clean digital native text generated directly from Word, Google Docs, or modern billing systems. | No review needed.
`0.85 - 0.99 (85% to 99%)` | High Certainty | Clean scans with clear fonts and standard resolution. | Generally accurate; minimal review.
`0.70 - 0.84 (70% to 84%)` | Moderate Certainty | Scanned text with slight blur, minor rotation, or small fonts. | Recommended for quick human review.
`< 0.70 (Below 70%)` | Low Certainty | Heavy noise, faint printing, smudges, complex stamps, or handwritten annotations. | Flagged in the Audit Queue for manual verification.

---

### Real-World Prompt Examples & Workflows

Here are sample prompts you can copy and paste directly into your AI chat window:

#### Example 1: Standard Text Extraction
> "Please extract all text and word confidence scores from `samples/sample_digital_invoice.pdf`. Save the structured output as `extracted_invoice.json`."

#### Example 2: Financial Invoice Quality Audit
> "I uploaded an invoice `samples/sample_digital_invoice.pdf`. Extract the text, but flag any words that have a confidence score lower than 90%. List any low-confidence words in your response."

#### Example 3: Scanned Document Review with Visual Dashboard
> "Please process `samples/sample_scanned_receipt.pdf`. Since this is a scanned receipt, generate the interactive visual dashboard so I can review questionable words and make corrections."

#### Example 4: Compliance and Multi-Page Sign-Off Verification
> "Analyze `samples/sample_mixed_report.pdf` in auto mode. Tell me the average confidence score across all pages, check whether the compliance stamp on page 2 was read accurately, and save the result to `audit_report.json`."

---

### Sample Agent Conversation and Output

When you run a prompt in your agent harness, the AI executes the skill and provides a clear, formatted summary:

```text
User:
Please extract the text from samples/sample_digital_invoice.pdf and check if there are any words below 85% confidence. Also generate a visual review dashboard.

Agent:
Extraction Summary for sample_digital_invoice.pdf:
- Total Pages: 1
- Total Words Extracted: 116
- Extraction Mode: Digital Native
- Mean Confidence Score: 1.0 (100.0%)
- Minimum Confidence Score: 1.0 (100.0%)
- Low-Confidence Words (< 85%): 0

All text in this document was extracted with 100% certainty from digital vector streams.
The structured output file has been saved to: 'samples/sample_digital_invoice_extracted.json'
The interactive review dashboard has been generated at: 'samples/sample_digital_invoice_dashboard.html'
```

---

### How to Use the Visual Dashboard for Corrections

If your document contains scanned pages or words scoring below the cutoff threshold, the generated HTML dashboard (`dashboard.html`) gives you a full human-in-the-loop review environment:

1. **Adjusting the Cutoff Slider**:
   - At the top left, move the **Confidence Cutoff Threshold** slider (for example, from 85% to 90%).
   - The document view and word counters immediately re-highlight words that fall below the selected number.
2. **Inspecting Words on the PDF Page**:
   - On the left pane, the original PDF page is displayed.
   - Any word below your threshold is outlined in amber/red; words meeting the threshold have subtle green outlines.
   - Click on any word box on the PDF page: the system selects that word and loads its details in the right-hand panel.
3. **Making Manual Corrections**:
   - In the right-hand panel (**Document Text** tab), the **Word Inspection & Correction** card displays the current word, its exact confidence percentage, and its page coordinates.
   - Type the correct word into the text box and click **Apply** (or press Enter).
   - The word updates across the document immediately, its confidence score is updated to 100% (marked as human-corrected), and the low-confidence count decreases.
4. **Using the Audit Queue**:
   - Click the **Audit Queue** tab in the right pane to see a clean list of all flagged words.
   - Click **Inspect** next to any word to jump directly to its location on the page.
5. **Switching Light/Dark Modes**:
   - Click the **[Dark Mode]** / **[Light Mode]** button in the upper right header to switch themes according to your preference.
6. **Saving Your Work**:
   - Click **Export Corrected JSON** in the top header. This downloads an updated JSON file containing all your manual edits and full audit trails ready for downstream business applications.

---

## 8. Synthetic Test Data

All sample files in the `samples/` directory are generated programmatically and contain 100% synthetic, fictitious data. They contain no Protected Health Information (PHI) and no Personally Identifiable Information (PII).

To regenerate the sample files at any time, run:

```bash
python3 skills/pdf-extract-confidence/scripts/generate_samples.py
```

Generated Sample Files:
- `samples/sample_digital_invoice.pdf`: A clean vector PDF invoice containing header details, customer ID, itemized tables, and payment instructions.
- `samples/sample_scanned_receipt.pdf`: A rasterized simulated receipt with subtle rotation and blur artifacts to test OCR behavior.
- `samples/sample_mixed_report.pdf`: A two-page corporate infrastructure report containing digital text and an embedded approval stamp image.

---

## 9. JSON Output Schema Reference

The output JSON contains four top-level sections:

```json
{
  "metadata": {
    "filename": "sample_document.pdf",
    "total_pages": 2,
    "extraction_engine": "hybrid_extractor",
    "timestamp_utc": "2026-08-28T12:00:00.000000+00:00",
    "total_words": 142,
    "mean_confidence": 0.9850,
    "min_confidence": 0.7200,
    "low_confidence_count": 1,
    "low_confidence_threshold": 0.85
  },
  "full_text": "Complete consolidated text from the entire document...",
  "pages": [
    {
      "page_number": 1,
      "page_type": "digital",
      "width": 612.0,
      "height": 792.0,
      "word_count": 85,
      "mean_confidence": 1.0,
      "text": "Page 1 extracted plain text...",
      "words": [
        {
          "word": "Invoice",
          "confidence": 1.0,
          "source": "digital",
          "bbox": {
            "x0": 54.0,
            "top": 72.0,
            "x1": 104.2,
            "bottom": 88.0
          }
        }
      ]
    }
  ],
  "low_confidence_words": [
    {
      "word": "Il10O",
      "confidence": 0.7200,
      "page": 2,
      "source": "ocr",
      "bbox": {
        "x0": 120.0,
        "top": 200.0,
        "x1": 150.0,
        "bottom": 212.0
      },
      "reason": "ocr_uncertainty"
    }
  ]
}
```

### Schema Properties

Field | Type | Description
:--- | :--- | :---
`metadata.filename` | string | Name of the processed PDF.
`metadata.total_pages` | integer | Total number of pages.
`metadata.total_words` | integer | Total count of word tokens extracted.
`metadata.mean_confidence` | number | Overall average word confidence [0.0 to 1.0].
`metadata.min_confidence` | number | Minimum confidence recorded across all words.
`metadata.low_confidence_count` | integer | Number of words scoring below the cutoff threshold.
`full_text` | string | Consolidated plain text for direct NLP/LLM ingestion.
`pages[].words[].bbox` | object | Exact bounding box coordinates in PDF points (`x0`, `top`, `x1`, `bottom`).
`pages[].words[].source` | string | Origin of token: `digital`, `ocr`, `cloud_docai`, or `cloud_textract`.
`low_confidence_words` | array | Filtered list of words requiring audit or verification.

---

## 10. Running the Test Suite

The project includes an automated test suite verifying digital extraction, scanned/raster extraction, confidence scoring boundaries, threshold filtering, CLI execution, HTML dashboard generation, and JSON schema compliance.

Run all tests using `pytest`:

```bash
pytest -v tests/
```

Expected Output:
```text
tests/test_extractor.py::TestPDFConfidenceExtractor::test_digital_invoice_extraction PASSED
tests/test_extractor.py::TestPDFConfidenceExtractor::test_mixed_report_extraction PASSED
tests/test_extractor.py::TestPDFConfidenceExtractor::test_scanned_receipt_extraction PASSED
tests/test_extractor.py::TestPDFConfidenceExtractor::test_digital_word_encoding_evaluation PASSED
tests/test_extractor.py::TestPDFConfidenceExtractor::test_custom_threshold_filtering PASSED
tests/test_extractor.py::TestPDFConfidenceExtractor::test_file_not_found PASSED
tests/test_extractor.py::TestPDFConfidenceExtractor::test_cli_execution PASSED
tests/test_extractor.py::TestPDFConfidenceExtractor::test_generate_html_dashboard PASSED
tests/test_extractor.py::TestPDFConfidenceExtractor::test_cli_execution_with_html_output PASSED
tests/test_schema.py::TestSchemaValidation::test_schema_file_exists PASSED
tests/test_schema.py::TestSchemaValidation::test_valid_digital_output_passes_validation PASSED
tests/test_schema.py::TestSchemaValidation::test_valid_mixed_output_passes_validation PASSED
tests/test_schema.py::TestSchemaValidation::test_invalid_structure_rejected PASSED
tests/test_schema.py::TestSchemaValidation::test_invalid_confidence_range_rejected PASSED
```

---

## 11. License and Contribution

This project is licensed under the Apache License, Version 2.0 (the "License"). You may not use this project except in compliance with the License.

You may obtain a copy of the License in the [LICENSE](LICENSE) file located in the root of this repository, or online at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](LICENSE) file for the specific language governing permissions and limitations under the License.

Contributions and extensions (such as additional cloud engine connectors, specialized preprocessing pipelines, or customized UI dashboard themes) are welcome under the terms of the Apache 2.0 License.
