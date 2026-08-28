#!/usr/bin/env python3
"""
Synthetic PDF Sample Generator for PDF Word-Level Confidence Extraction Skill.

Generates realistic test PDF files containing 100% synthetic, non-PHI, non-PII data:
1. sample_digital_invoice.pdf - Clean digital vector PDF (invoice with tables).
2. sample_scanned_receipt.pdf - Rasterized scanned-style receipt with simulated scan noise.
3. sample_mixed_report.pdf - Multi-page hybrid report combining digital text and scanned stamps.
"""

from __future__ import annotations

import io
import os
from pathlib import Path
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont
import pypdfium2 as pdfium
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


def create_digital_invoice(output_path: Path) -> Path:
    """Generate a clean digital native PDF invoice."""
    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=letter,
        rightMargin=54,
        leftMargin=54,
        topMargin=54,
        bottomMargin=54,
    )
    styles = getSampleStyleSheet()
    story = []

    title_style = ParagraphStyle(
        "InvoiceTitle",
        parent=styles["Heading1"],
        fontSize=20,
        leading=24,
        textColor=colors.HexColor("#1A365D"),
    )
    normal_style = styles["Normal"]

    story.append(Paragraph("<b>APEX LOGISTICS & CLOUD SERVICES</b>", title_style))
    story.append(Paragraph("100 Enterprise Boulevard, Suite 400 | Metro City, NY 10001", normal_style))
    story.append(Paragraph("Billing Inquiries: billing@apexlogistics-synthetic.example.com", normal_style))
    story.append(Spacer(1, 0.25 * inch))

    meta_data = [
        ["Invoice Number:", "INV-2026-8841", "Invoice Date:", "2026-08-28"],
        ["Customer ID:", "CUST-9921-X", "Payment Due:", "2026-09-28"],
        ["Purchase Order:", "PO-771029", "Currency:", "USD ($)"],
    ]
    meta_table = Table(meta_data, colWidths=[1.5 * inch, 2.0 * inch, 1.3 * inch, 1.7 * inch])
    meta_table.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("TEXTCOLOR", (0, 0), (0, -1), colors.HexColor("#4A5568")),
        ("TEXTCOLOR", (2, 0), (2, -1), colors.HexColor("#4A5568")),
        ("FONTNAME", (1, 0), (1, -1), "Helvetica-Bold"),
        ("FONTNAME", (3, 0), (3, -1), "Helvetica-Bold"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 0.3 * inch))

    story.append(Paragraph("<b>Itemized Charges</b>", styles["Heading3"]))
    story.append(Spacer(1, 0.1 * inch))

    line_items = [
        ["Description", "Qty", "Unit Price ($)", "Total Amount ($)"],
        ["Cloud Storage Infrastructure - Tier 2 (TB/Month)", "25", "12.00", "300.00"],
        ["Enterprise API Gateway Throughput Units", "50", "4.50", "225.00"],
        ["Automated Security Compliance Auditing Module", "1", "450.00", "450.00"],
        ["Technical Support & SLA Maintenance (Silver)", "1", "175.00", "175.00"],
        ["", "", "Subtotal:", "1,150.00"],
        ["", "", "State Tax (8.25%):", "94.88"],
        ["", "", "Total Balance Due:", "1,244.88"],
    ]

    item_table = Table(line_items, colWidths=[3.2 * inch, 0.8 * inch, 1.2 * inch, 1.3 * inch])
    item_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2B6CB0")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 9),
        ("ALIGN", (1, 0), (-1, -1), "RIGHT"),
        ("GRID", (0, 0), (-1, 4), 0.5, colors.HexColor("#CBD5E0")),
        ("FONTNAME", (2, 5), (-1, -1), "Helvetica-Bold"),
        ("LINEABOVE", (2, 5), (-1, 5), 1, colors.HexColor("#2D3748")),
        ("LINEBELOW", (2, 7), (-1, 7), 1.5, colors.HexColor("#2D3748")),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(item_table)
    story.append(Spacer(1, 0.4 * inch))

    story.append(Paragraph("<b>Payment Instructions:</b>", styles["Heading4"]))
    story.append(Paragraph("Please remit payments via Automated Clearing House (ACH) or Wire Transfer to Apex Logistics Treasury Account within 30 days of the invoice date.", normal_style))

    doc.build(story)
    return output_path


def create_scanned_receipt(output_path: Path) -> Path:
    """Generate a rasterized, scanned-style PDF receipt with simulated image noise and slight tilt."""
    # Step 1: Render vector PDF to memory
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=(300, 500),
        rightMargin=20,
        leftMargin=20,
        topMargin=20,
        bottomMargin=20,
    )
    styles = getSampleStyleSheet()
    story = [
        Paragraph("<b>QUICK-MART RETAIL #1042</b>", styles["Heading3"]),
        Paragraph("742 Evergreen Terrace, Springfield", styles["Normal"]),
        Paragraph("Terminal: T-09 | Cashier: #48", styles["Normal"]),
        Spacer(1, 10),
        Paragraph("----------------------------------------", styles["Normal"]),
        Paragraph("Item 1: Organic Granola Bar     $2.99", styles["Normal"]),
        Paragraph("Item 2: Spring Mineral Water    $1.89", styles["Normal"]),
        Paragraph("Item 3: Recycled Paper Towels   $3.49", styles["Normal"]),
        Paragraph("Item 4: Ballpoint Pen Pack (3ct) $4.25", styles["Normal"]),
        Paragraph("----------------------------------------", styles["Normal"]),
        Paragraph("SUBTOTAL:                      $12.62", styles["Normal"]),
        Paragraph("TAX (6.00%):                    $0.76", styles["Normal"]),
        Paragraph("TOTAL:                         $13.38", styles["Heading4"]),
        Spacer(1, 10),
        Paragraph("Card: VISA ending in 9021", styles["Normal"]),
        Paragraph("Auth Code: 049821 | Status: APPROVED", styles["Normal"]),
        Spacer(1, 10),
        Paragraph("Thank you for shopping synthetic!", styles["Normal"]),
    ]
    doc.build(story)
    buffer.seek(0)

    # Step 2: Render PDF to PIL Image using pypdfium2
    pdf_doc = pdfium.PdfDocument(buffer)
    rendered_image = pdf_doc[0].render(scale=2.0).to_pil().convert("L")  # Grayscale

    # Step 3: Add scan artifacts (slight rotation, noise, slight blur)
    rotated = rendered_image.rotate(0.6, resample=Image.Resampling.BICUBIC, expand=True, fillcolor=255)
    blurred = rotated.filter(ImageFilter.GaussianBlur(radius=0.4))

    # Step 4: Save image as raster-only PDF
    blurred.save(str(output_path), "PDF", resolution=150.0)
    return output_path


def create_mixed_report(output_path: Path) -> Path:
    """Generate a multi-page hybrid report combining digital text and scanned verification stamp."""
    # Create stamp image
    stamp_img = Image.new("RGBA", (220, 70), (255, 255, 255, 0))
    draw = ImageDraw.Draw(stamp_img)
    draw.rectangle([(2, 2), (216, 66)], outline=(180, 40, 40, 255), width=3)
    draw.text((15, 12), "COMPLIANCE VERIFIED", fill=(180, 40, 40, 255))
    draw.text((15, 34), "AUDIT ID: SYNTH-2026-9A", fill=(180, 40, 40, 255))
    stamp_img = stamp_img.rotate(3.5, resample=Image.Resampling.BICUBIC, expand=True)

    stamp_path = output_path.parent / "temp_stamp.png"
    stamp_img.save(stamp_path)

    try:
        from reportlab.platypus import Image as RLImage, PageBreak

        doc = SimpleDocTemplate(
            str(output_path),
            pagesize=letter,
            rightMargin=54,
            leftMargin=54,
            topMargin=54,
            bottomMargin=54,
        )
        styles = getSampleStyleSheet()
        story = []

        # Page 1: Digital Executive Report
        story.append(Paragraph("<b>QUARTERLY INFRASTRUCTURE AUDIT REPORT</b>", styles["Heading1"]))
        story.append(Paragraph("Document ID: REP-2026-Q3-009 | Security Classification: Synthetic Internal", styles["Normal"]))
        story.append(Spacer(1, 0.2 * inch))

        p1_text = (
            "This quarterly audit report evaluates the system reliability, latency benchmarks, and disaster recovery "
            "protocols implemented across synthetic region clusters. All synthetic services maintained an uptime of "
            "99.995% during the evaluated quarterly cycle. Backup replication tests were completed with zero packet loss "
            "and all database schema migrations executed within the scheduled maintenance windows."
        )
        story.append(Paragraph(p1_text, styles["Normal"]))
        story.append(Spacer(1, 0.2 * inch))

        story.append(Paragraph("<b>Key Performance Indicators</b>", styles["Heading3"]))
        kpi_data = [
            ["Metric Name", "Target SLA", "Observed Value", "Compliance Status"],
            ["API Response Latency (p99)", "< 45 ms", "28.4 ms", "PASSED"],
            ["Database Query Throughput", "> 10,000 QPS", "14,250 QPS", "PASSED"],
            ["Disaster Recovery RTO", "< 15 minutes", "4.2 minutes", "PASSED"],
            ["Security Vulnerability Count", "0 Critical", "0 Critical", "PASSED"],
        ]
        kpi_table = Table(kpi_data, colWidths=[2.5 * inch, 1.2 * inch, 1.3 * inch, 1.5 * inch])
        kpi_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1A365D")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E0")),
            ("ALIGN", (1, 0), (-1, -1), "CENTER"),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ("TOPPADDING", (0, 0), (-1, -1), 5),
        ]))
        story.append(kpi_table)

        # Page 2: Sign-off page with digital text and embedded approval stamp image
        story.append(PageBreak())
        story.append(Paragraph("<b>Section 2: Authorization and Compliance Sign-Off</b>", styles["Heading2"]))
        story.append(Spacer(1, 0.15 * inch))
        story.append(Paragraph(
            "The signatures and verification stamps below confirm that the infrastructure components described in this "
            "document have undergone rigorous testing in accordance with standard synthetic governance protocols.",
            styles["Normal"]
        ))
        story.append(Spacer(1, 0.3 * inch))

        # Add image stamp
        rl_stamp = RLImage(str(stamp_path), width=2.5 * inch, height=0.9 * inch)
        story.append(rl_stamp)
        story.append(Spacer(1, 0.2 * inch))

        story.append(Paragraph("Authorized Auditor: Dr. Morgan Synthetic, Lead Quality Engineer", styles["Normal"]))
        story.append(Paragraph("Verification Date: August 28, 2026", styles["Normal"]))

        doc.build(story)
    finally:
        if stamp_path.exists():
            stamp_path.unlink()

    return output_path


def main() -> int:
    output_dir = Path(__file__).resolve().parent.parent.parent.parent / "samples"
    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"Generating synthetic PDF samples in: {output_dir}")

    invoice_path = output_dir / "sample_digital_invoice.pdf"
    create_digital_invoice(invoice_path)
    print(f"Created: {invoice_path.name}")

    receipt_path = output_dir / "sample_scanned_receipt.pdf"
    create_scanned_receipt(receipt_path)
    print(f"Created: {receipt_path.name}")

    mixed_path = output_dir / "sample_mixed_report.pdf"
    create_mixed_report(mixed_path)
    print(f"Created: {mixed_path.name}")

    print("All synthetic sample PDFs generated successfully.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
