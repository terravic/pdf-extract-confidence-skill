# Confidence Scoring Methodology

This document outlines how confidence scores are determined and normalized across different PDF extraction pipelines.

## 1. Digital Vector PDF Extraction

In native digital PDFs, text is rendered via font glyph operators (such as Tj and TJ in PostScript/PDF specifications). Character mapping is resolved through font encoding tables (ToUnicode CMaps).

When font tables are intact:
- Every character maps directly to a valid Unicode code point.
- The baseline confidence score assigned to these tokens is 1.0 (100%).

Potential degradation factors in digital PDFs:
- Unmapped Glyphs / Replacement Characters: If a character maps to the Unicode replacement character (\ufffd) or falls into unassigned Private Use Areas (PUA) without font metrics, the word confidence is adjusted downwards (0.5 to 0.7) and marked as encoding_anomaly.
- Character Density and Kerning Anomalies: Extreme negative character spacing or overlapping bounding boxes may indicate watermarks, redacting artifacts, or pseudo-text, which are flagged accordingly.

## 2. Optical Character Recognition (OCR) Extraction

In scanned documents or rasterized image pages, text is recognized from pixel matrices using machine learning models or feature extractors.

OCR confidence computation:
- Word Confidence: Derived directly from the classification softmax probabilities across the individual character glyphs composing the word:
  confidence = (1 / N) * sum(character_confidence_i)
- Normalization: Raw OCR confidence values provided on a 0 to 100 integer scale are normalized to a 0.0 to 1.0 floating-point scale:
  confidence_norm = min(1.0, max(0.0, raw_confidence / 100.0))

Factors that influence OCR confidence:
- DPI and Resolution: Scans below 200 DPI exhibit higher noise and lower character certainty.
- Skew and Rotation: Unaligned text angles reduce classifier confidence.
- Image Artifacts: Salt-and-pepper noise, background bleed-through, and fax compression artifacts produce lower confidence scores.

## 3. Hybrid Routing & Multi-Page Decision Logic

For multi-page documents containing a mix of digital text and scanned pages:
1. Each page is independently analyzed for extractable vector text density.
2. If vector text density is above the threshold (e.g. at least 10 words per page with valid bounding boxes), digital extraction is performed.
3. If a page contains zero vector text or contains full-page image objects, OCR extraction is invoked for that page.
4. The output combines both sources seamlessly, tagging each word token with its source (digital vs ocr).

## 4. Threshold Auditing

Downstream consumers can specify a low_confidence_threshold (default 0.85). Any word with confidence < low_confidence_threshold is aggregated into the low_confidence_words section.

Common use cases for this section:
- Automated routing to human-in-the-loop (HITL) review queues.
- Automated re-OCR with specialized high-resolution preprocessing.
- Highlighting questionable values in user interfaces.
