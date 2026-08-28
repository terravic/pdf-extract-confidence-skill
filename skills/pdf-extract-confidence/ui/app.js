/**
 * PDF Confidence Extractor - Interactive Dashboard Logic
 *
 * Implements threshold slider dynamic filtering, synchronized visual PDF
 * bounding box overlays, human-in-the-loop word editing, and JSON export.
 */

(function () {
  "use strict";

  // Default synthetic sample dataset for immediate live demonstration
  const DEFAULT_SAMPLE_DATA = {
    metadata: {
      filename: "sample_digital_invoice.pdf",
      total_pages: 1,
      extraction_engine: "hybrid_extractor",
      timestamp_utc: new Date().toISOString(),
      total_words: 32,
      mean_confidence: 0.942,
      min_confidence: 0.68,
      low_confidence_count: 3,
      low_confidence_threshold: 0.85
    },
    full_text: "APEX LOGISTICS & CLOUD SERVICES\n100 Enterprise Boulevard, Suite 400 | Metro City, NY 10001\nInvoice Number: INV-2026-8841 Date: 2026-08-28\nItem 1: Cloud Storage Tier 2 $300.00\nItem 2: API Gateway Units $225.00\nTotal Balance Due: $1,244.88\nAuthorized Status: APPROVED",
    pages: [
      {
        page_number: 1,
        page_type: "digital",
        width: 612.0,
        height: 792.0,
        word_count: 32,
        mean_confidence: 0.942,
        text: "APEX LOGISTICS & CLOUD SERVICES\n100 Enterprise Boulevard, Suite 400 | Metro City, NY 10001\nInvoice Number: INV-2026-8841 Date: 2026-08-28\nItem 1: Cloud Storage Tier 2 $300.00\nItem 2: API Gateway Units $225.00\nTotal Balance Due: $1,244.88\nAuthorized Status: APPROVED",
        words: [
          { word: "APEX", confidence: 1.0, source: "digital", bbox: { x0: 60.0, top: 64.0, x1: 114.5, bottom: 84.0 } },
          { word: "LOGISTICS", confidence: 1.0, source: "digital", bbox: { x0: 120.0, top: 64.0, x1: 227.8, bottom: 84.0 } },
          { word: "&", confidence: 1.0, source: "digital", bbox: { x0: 233.4, top: 64.0, x1: 247.8, bottom: 84.0 } },
          { word: "CLOUD", confidence: 1.0, source: "digital", bbox: { x0: 253.4, top: 64.0, x1: 324.5, bottom: 84.0 } },
          { word: "SERVICES", confidence: 1.0, source: "digital", bbox: { x0: 330.0, top: 64.0, x1: 431.2, bottom: 84.0 } },
          { word: "100", confidence: 1.0, source: "digital", bbox: { x0: 60.0, top: 92.0, x1: 76.7, bottom: 102.0 } },
          { word: "Enterprise", confidence: 1.0, source: "digital", bbox: { x0: 79.5, top: 92.0, x1: 125.0, bottom: 102.0 } },
          { word: "Boulevard,", confidence: 0.76, source: "ocr", bbox: { x0: 127.8, top: 92.0, x1: 175.6, bottom: 102.0 } },
          { word: "Suite", confidence: 1.0, source: "digital", bbox: { x0: 178.4, top: 92.0, x1: 201.2, bottom: 102.0 } },
          { word: "400", confidence: 1.0, source: "digital", bbox: { x0: 204.0, top: 92.0, x1: 220.6, bottom: 102.0 } },
          { word: "|", confidence: 1.0, source: "digital", bbox: { x0: 223.4, top: 92.0, x1: 226.0, bottom: 102.0 } },
          { word: "Metro", confidence: 1.0, source: "digital", bbox: { x0: 228.8, top: 92.0, x1: 254.4, bottom: 102.0 } },
          { word: "City,", confidence: 1.0, source: "digital", bbox: { x0: 257.1, top: 92.0, x1: 277.1, bottom: 102.0 } },
          { word: "NY", confidence: 1.0, source: "digital", bbox: { x0: 279.9, top: 92.0, x1: 293.8, bottom: 102.0 } },
          { word: "10001", confidence: 1.0, source: "digital", bbox: { x0: 296.6, top: 92.0, x1: 324.4, bottom: 102.0 } },
          { word: "Invoice", confidence: 1.0, source: "digital", bbox: { x0: 60.0, top: 137.8, x1: 106.5, bottom: 146.8 } },
          { word: "Number:", confidence: 1.0, source: "digital", bbox: { x0: 109.0, top: 137.8, x1: 143.5, bottom: 146.8 } },
          { word: "INV-2026-8841", confidence: 0.72, source: "ocr", bbox: { x0: 150.0, top: 137.8, x1: 220.0, bottom: 146.8 } },
          { word: "Date:", confidence: 1.0, source: "digital", bbox: { x0: 330.0, top: 137.8, x1: 358.5, bottom: 146.8 } },
          { word: "2026-08-28", confidence: 1.0, source: "digital", bbox: { x0: 365.0, top: 137.8, x1: 420.0, bottom: 146.8 } },
          { word: "Item", confidence: 1.0, source: "digital", bbox: { x0: 60.0, top: 180.0, x1: 85.0, bottom: 190.0 } },
          { word: "1:", confidence: 1.0, source: "digital", bbox: { x0: 88.0, top: 180.0, x1: 98.0, bottom: 190.0 } },
          { word: "Cloud", confidence: 1.0, source: "digital", bbox: { x0: 105.0, top: 180.0, x1: 135.0, bottom: 190.0 } },
          { word: "Storage", confidence: 1.0, source: "digital", bbox: { x0: 140.0, top: 180.0, x1: 180.0, bottom: 190.0 } },
          { word: "Tier", confidence: 1.0, source: "digital", bbox: { x0: 185.0, top: 180.0, x1: 205.0, bottom: 190.0 } },
          { word: "2", confidence: 1.0, source: "digital", bbox: { x0: 210.0, top: 180.0, x1: 218.0, bottom: 190.0 } },
          { word: "$300.00", confidence: 1.0, source: "digital", bbox: { x0: 450.0, top: 180.0, x1: 495.0, bottom: 190.0 } },
          { word: "Total", confidence: 1.0, source: "digital", bbox: { x0: 60.0, top: 240.0, x1: 90.0, bottom: 250.0 } },
          { word: "Balance", confidence: 1.0, source: "digital", bbox: { x0: 95.0, top: 240.0, x1: 135.0, bottom: 250.0 } },
          { word: "Due:", confidence: 1.0, source: "digital", bbox: { x0: 140.0, top: 240.0, x1: 165.0, bottom: 250.0 } },
          { word: "$1,244.88", confidence: 0.68, source: "ocr", bbox: { x0: 450.0, top: 240.0, x1: 505.0, bottom: 250.0 } },
          { word: "APPROVED", confidence: 1.0, source: "digital", bbox: { x0: 60.0, top: 290.0, x1: 125.0, bottom: 302.0 } }
        ]
      }
    ],
    low_confidence_words: []
  };

  // Application State
  const state = {
    data: JSON.parse(JSON.stringify(DEFAULT_SAMPLE_DATA)),
    currentPage: 1,
    threshold: 0.85,
    selectedWordRef: null, // { pageNum, wordIndex }
    correctionCount: 0,
    theme: localStorage.getItem("pdf_skill_theme") || "light",
    scale: 1.0
  };

  // DOM Elements
  const elements = {
    themeToggleBtn: document.getElementById("themeToggleBtn"),
    thresholdSlider: document.getElementById("thresholdSlider"),
    thresholdValBadge: document.getElementById("thresholdValBadge"),
    metricTotalWords: document.getElementById("metricTotalWords"),
    metricMeanConf: document.getElementById("metricMeanConf"),
    metricLowConf: document.getElementById("metricLowConf"),
    metricCorrections: document.getElementById("metricCorrections"),
    metricFilename: document.getElementById("metricFilename"),
    prevPageBtn: document.getElementById("prevPageBtn"),
    nextPageBtn: document.getElementById("nextPageBtn"),
    pageIndicator: document.getElementById("pageIndicator"),
    docWrapper: document.getElementById("docWrapper"),
    pageCanvas: document.getElementById("pageCanvas"),
    overlayLayer: document.getElementById("overlayLayer"),
    textStreamFlow: document.getElementById("textStreamFlow"),
    auditTableBody: document.getElementById("auditTableBody"),
    auditEmptyState: document.getElementById("auditEmptyState"),
    inspectorCard: document.getElementById("inspectorCard"),
    inspectorEmpty: document.getElementById("inspectorEmpty"),
    inspWord: document.getElementById("inspWord"),
    inspConf: document.getElementById("inspConf"),
    inspSource: document.getElementById("inspSource"),
    inspPage: document.getElementById("inspPage"),
    inspBBox: document.getElementById("inspBBox"),
    inspEditInput: document.getElementById("inspEditInput"),
    applyCorrectionBtn: document.getElementById("applyCorrectionBtn"),
    approveAsIsBtn: document.getElementById("approveAsIsBtn"),
    fileInput: document.getElementById("fileInput"),
    exportJsonBtn: document.getElementById("exportJsonBtn"),
    viewJsonBtn: document.getElementById("viewJsonBtn"),
    jsonModal: document.getElementById("jsonModal"),
    closeModalBtn: document.getElementById("closeModalBtn"),
    copyJsonBtn: document.getElementById("copyJsonBtn"),
    modalJsonCode: document.getElementById("modalJsonCode"),
    tabBtns: document.querySelectorAll(".tab-btn"),
    tabContents: document.querySelectorAll(".tab-content")
  };

  // Initialize Theme
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("pdf_skill_theme", theme);
    elements.themeToggleBtn.textContent = theme === "dark" ? "[Light Mode]" : "[Dark Mode]";
  }

  function toggleTheme() {
    applyTheme(state.theme === "dark" ? "light" : "dark");
  }

  // Recalculate Low Confidence Words based on threshold
  function recalculateMetrics() {
    let lowConfCount = 0;
    let totalConfidenceSum = 0;
    let totalWordCount = 0;
    const lowConfList = [];

    state.data.pages.forEach(page => {
      page.words.forEach((w, idx) => {
        totalWordCount++;
        totalConfidenceSum += w.confidence;
        if (w.confidence < state.threshold) {
          lowConfCount++;
          lowConfList.push({
            word: w.word,
            confidence: w.confidence,
            page: page.page_number,
            wordIndex: idx,
            source: w.source,
            bbox: w.bbox,
            reason: w.source === "ocr" ? "ocr_uncertainty" : "encoding_anomaly"
          });
        }
      });
    });

    state.data.low_confidence_words = lowConfList;
    state.data.metadata.low_confidence_count = lowConfCount;
    state.data.metadata.low_confidence_threshold = state.threshold;
    state.data.metadata.total_words = totalWordCount;
    state.data.metadata.mean_confidence = totalWordCount > 0 ? Number((totalConfidenceSum / totalWordCount).toFixed(4)) : 1.0;

    // Update Header Strip
    elements.metricTotalWords.textContent = totalWordCount;
    elements.metricMeanConf.textContent = (state.data.metadata.mean_confidence * 100).toFixed(1) + "%";
    elements.metricLowConf.textContent = lowConfCount;
    elements.metricCorrections.textContent = state.correctionCount;
    elements.metricFilename.textContent = state.data.metadata.filename || "document.pdf";
  }

  // Render Visual Page and Word Overlays
  function renderVisualPage() {
    const pageIndex = state.currentPage - 1;
    const page = state.data.pages[pageIndex];
    if (!page) return;

    const width = page.width || 612;
    const height = page.height || 792;

    // Set Element Dimensions
    elements.pageCanvas.width = width;
    elements.pageCanvas.height = height;
    elements.docWrapper.style.width = width + "px";
    elements.docWrapper.style.height = height + "px";

    const ctx = elements.pageCanvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Draw Subtle Document Header Line
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    // Draw Simulated Vector Text for Clean Appearance
    ctx.fillStyle = "#1e293b";
    ctx.font = "11px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

    page.words.forEach(w => {
      const box = w.bbox;
      const fontSize = Math.max(9, (box.bottom - box.top) * 0.85);
      ctx.font = `${fontSize}px Helvetica, Arial, sans-serif`;
      ctx.fillText(w.word, box.x0, box.bottom - 2);
    });

    // Clear and rebuild Bounding Box Overlays
    elements.overlayLayer.innerHTML = "";

    page.words.forEach((w, idx) => {
      const box = w.bbox;
      const boxEl = document.createElement("div");
      boxEl.className = "word-bbox-highlight";
      
      const isLow = w.confidence < state.threshold;
      boxEl.classList.add(isLow ? "low-confidence" : "high-confidence");

      if (state.selectedWordRef && state.selectedWordRef.pageNum === state.currentPage && state.selectedWordRef.wordIndex === idx) {
        boxEl.classList.add("selected");
      }

      boxEl.style.left = box.x0 + "px";
      boxEl.style.top = box.top + "px";
      boxEl.style.width = Math.max(6, box.x1 - box.x0) + "px";
      boxEl.style.height = Math.max(6, box.bottom - box.top) + "px";
      boxEl.title = `${w.word} (Confidence: ${(w.confidence * 100).toFixed(1)}%)`;

      boxEl.addEventListener("click", (e) => {
        e.stopPropagation();
        selectWord(state.currentPage, idx);
      });

      elements.overlayLayer.appendChild(boxEl);
    });

    // Update Pagination
    elements.pageIndicator.textContent = `Page ${state.currentPage} of ${state.data.pages.length}`;
    elements.prevPageBtn.disabled = state.currentPage <= 1;
    elements.nextPageBtn.disabled = state.currentPage >= state.data.pages.length;
  }

  // Render Sequential Text Flow in Right Pane
  function renderTextFlow() {
    const pageIndex = state.currentPage - 1;
    const page = state.data.pages[pageIndex];
    if (!page) return;

    elements.textStreamFlow.innerHTML = "";

    page.words.forEach((w, idx) => {
      const span = document.createElement("span");
      span.className = "token-span";
      span.textContent = w.word;

      const isLow = w.confidence < state.threshold;
      if (isLow) {
        span.classList.add("token-low-conf");
      }

      if (state.selectedWordRef && state.selectedWordRef.pageNum === state.currentPage && state.selectedWordRef.wordIndex === idx) {
        span.classList.add("token-selected");
      }

      span.title = `Confidence: ${(w.confidence * 100).toFixed(1)}% | Source: ${w.source}`;

      span.addEventListener("click", () => {
        selectWord(state.currentPage, idx);
      });

      elements.textStreamFlow.appendChild(span);
      // Append a whitespace node
      elements.textStreamFlow.appendChild(document.createTextNode(" "));
    });
  }

  // Render Audit Queue Table
  function renderAuditQueue() {
    elements.auditTableBody.innerHTML = "";
    const lowConfList = state.data.low_confidence_words || [];

    if (lowConfList.length === 0) {
      elements.auditEmptyState.style.display = "block";
      return;
    }

    elements.auditEmptyState.style.display = "none";

    lowConfList.forEach((item, listIdx) => {
      const tr = document.createElement("tr");
      tr.className = "audit-row";
      if (state.selectedWordRef && state.selectedWordRef.pageNum === item.page && state.selectedWordRef.wordIndex === item.wordIndex) {
        tr.classList.add("selected");
      }

      const confPercent = (item.confidence * 100).toFixed(1) + "%";

      tr.innerHTML = `
        <td><span class="audit-word">${escapeHtml(item.word)}</span></td>
        <td><span class="audit-conf metric-badge-low">${confPercent}</span></td>
        <td>P.${item.page}</td>
        <td><button class="btn btn-sm" data-action="jump">Inspect</button></td>
      `;

      tr.querySelector('[data-action="jump"]').addEventListener("click", (e) => {
        e.stopPropagation();
        if (state.currentPage !== item.page) {
          state.currentPage = item.page;
        }
        selectWord(item.page, item.wordIndex);
      });

      tr.addEventListener("click", () => {
        if (state.currentPage !== item.page) {
          state.currentPage = item.page;
        }
        selectWord(item.page, item.wordIndex);
      });

      elements.auditTableBody.appendChild(tr);
    });
  }

  // Select a Word Token and Populate Inspector
  function selectWord(pageNum, wordIndex) {
    state.selectedWordRef = { pageNum, wordIndex };
    const page = state.data.pages[pageNum - 1];
    if (!page || !page.words[wordIndex]) return;

    const wordItem = page.words[wordIndex];

    // Populate Inspector Card
    elements.inspectorEmpty.style.display = "none";
    elements.inspectorCard.style.display = "block";

    elements.inspWord.textContent = wordItem.word;
    elements.inspConf.textContent = (wordItem.confidence * 100).toFixed(1) + "%";
    elements.inspConf.className = "inspector-val " + (wordItem.confidence < state.threshold ? "metric-badge-low" : "metric-badge-high");
    elements.inspSource.textContent = wordItem.source;
    elements.inspPage.textContent = pageNum;
    elements.inspBBox.textContent = `[${wordItem.bbox.x0}, ${wordItem.bbox.top}, ${wordItem.bbox.x1}, ${wordItem.bbox.bottom}]`;
    elements.inspEditInput.value = wordItem.word;
    elements.inspEditInput.focus();

    // Re-render views to apply .selected classes
    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
  }

  // Apply Human-in-the-Loop Correction
  function applyCorrection() {
    if (!state.selectedWordRef) return;
    const { pageNum, wordIndex } = state.selectedWordRef;
    const page = state.data.pages[pageNum - 1];
    if (!page || !page.words[wordIndex]) return;

    const newText = elements.inspEditInput.value.trim();
    if (!newText) return;

    const wordItem = page.words[wordIndex];
    if (wordItem.word !== newText) {
      wordItem.word = newText;
      wordItem.confidence = 1.0; // Human corrected token certainty
      wordItem.source = "digital";
      wordItem.human_corrected = true;
      state.correctionCount++;
    } else {
      // Mark as approved even if unchanged
      wordItem.confidence = 1.0;
      wordItem.human_approved = true;
    }

    // Rebuild full text string
    rebuildFullText();
    recalculateMetrics();
    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
    selectWord(pageNum, wordIndex);
  }

  function approveAsIs() {
    if (!state.selectedWordRef) return;
    const { pageNum, wordIndex } = state.selectedWordRef;
    const page = state.data.pages[pageNum - 1];
    if (!page || !page.words[wordIndex]) return;

    const wordItem = page.words[wordIndex];
    wordItem.confidence = 1.0;
    wordItem.human_approved = true;

    recalculateMetrics();
    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
    selectWord(pageNum, wordIndex);
  }

  function rebuildFullText() {
    state.data.pages.forEach(page => {
      page.text = page.words.map(w => w.word).join(" ");
    });
    state.data.full_text = state.data.pages.map(p => p.text).join("\n\n");
  }

  // Handle Threshold Slider Changes
  function onThresholdChange(e) {
    state.threshold = parseFloat(e.target.value);
    elements.thresholdValBadge.textContent = (state.threshold * 100).toFixed(0) + "%";
    recalculateMetrics();
    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
  }

  // File Loader (Upload JSON)
  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!parsed.pages || !parsed.metadata) {
          alert("Invalid extraction JSON format. Missing required fields.");
          return;
        }
        state.data = parsed;
        state.currentPage = 1;
        state.selectedWordRef = null;
        state.correctionCount = 0;
        state.threshold = parsed.metadata.low_confidence_threshold || 0.85;
        elements.thresholdSlider.value = state.threshold;
        elements.thresholdValBadge.textContent = (state.threshold * 100).toFixed(0) + "%";

        recalculateMetrics();
        renderVisualPage();
        renderTextFlow();
        renderAuditQueue();
      } catch (err) {
        alert("Error parsing JSON file: " + err.message);
      }
    };
    reader.readAsText(file);
  }

  // Export JSON
  function exportJson() {
    recalculateMetrics();
    const jsonStr = JSON.stringify(state.data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const filename = (state.data.metadata.filename || "document").replace(/\.pdf$/i, "") + "_corrected.json";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // View JSON Modal
  function openJsonModal() {
    recalculateMetrics();
    elements.modalJsonCode.textContent = JSON.stringify(state.data, null, 2);
    elements.jsonModal.classList.add("open");
  }

  function closeJsonModal() {
    elements.jsonModal.classList.remove("open");
  }

  function copyJsonToClipboard() {
    const code = elements.modalJsonCode.textContent;
    navigator.clipboard.writeText(code).then(() => {
      elements.copyJsonBtn.textContent = "Copied!";
      setTimeout(() => {
        elements.copyJsonBtn.textContent = "Copy JSON";
      }, 1500);
    });
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Setup Event Listeners
  function initEvents() {
    elements.themeToggleBtn.addEventListener("click", toggleTheme);
    elements.thresholdSlider.addEventListener("input", onThresholdChange);
    elements.prevPageBtn.addEventListener("click", () => {
      if (state.currentPage > 1) {
        state.currentPage--;
        renderVisualPage();
        renderTextFlow();
      }
    });
    elements.nextPageBtn.addEventListener("click", () => {
      if (state.currentPage < state.data.pages.length) {
        state.currentPage++;
        renderVisualPage();
        renderTextFlow();
      }
    });

    elements.applyCorrectionBtn.addEventListener("click", applyCorrection);
    elements.approveAsIsBtn.addEventListener("click", approveAsIs);
    elements.inspEditInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        applyCorrection();
      }
    });

    elements.fileInput.addEventListener("change", handleFileSelect);
    elements.exportJsonBtn.addEventListener("click", exportJson);
    elements.viewJsonBtn.addEventListener("click", openJsonModal);
    elements.closeModalBtn.addEventListener("click", closeJsonModal);
    elements.copyJsonBtn.addEventListener("click", copyJsonToClipboard);

    // Tab Navigation
    elements.tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        elements.tabBtns.forEach(b => b.classList.remove("active"));
        elements.tabContents.forEach(c => c.classList.remove("active"));

        btn.classList.add("active");
        const tabId = btn.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");
      });
    });

    // Click outside modal to close
    elements.jsonModal.addEventListener("click", (e) => {
      if (e.target === elements.jsonModal) {
        closeJsonModal();
      }
    });
  }

  // Boot Application
  function init() {
    applyTheme(state.theme);
    initEvents();
    recalculateMetrics();
    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
