/**
 * PDF Word-Level Confidence Extraction - Modern UI Dashboard Application
 *
 * Provides dynamic threshold filtering, visual document coordinate overlays,
 * synchronized text selection, human-in-the-loop editing, and theme switching.
 */

(function () {
  "use strict";

  // Embedded extraction data payload (injected by extract_pdf.py for standalone bundles)
  const EMBEDDED_DATA = /* __DATA_PAYLOAD_START__ */ {
    "metadata": {
      "filename": "sample_digital_invoice.pdf",
      "total_pages": 1,
      "extraction_engine": "hybrid_extractor",
      "timestamp_utc": new Date().toISOString(),
      "total_words": 34,
      "mean_confidence": 0.9412,
      "min_confidence": 0.68,
      "low_confidence_count": 3,
      "low_confidence_threshold": 0.85
    },
    "full_text": "APEX LOGISTICS & CLOUD SERVICES\n100 Enterprise Boulevard, Suite 400 | Metro City, NY 10001\nInvoice Number: INV-2026-8841 Date: 2026-08-28\nItem 1: Cloud Storage Tier 2 $300.00\nItem 2: API Gateway Units $225.00\nTotal Balance Due: $1,244.88\nAuthorized Status: APPROVED",
    "pages": [
      {
        "page_number": 1,
        "page_type": "digital",
        "width": 612.0,
        "height": 792.0,
        "word_count": 34,
        "mean_confidence": 0.9412,
        "text": "APEX LOGISTICS & CLOUD SERVICES\n100 Enterprise Boulevard, Suite 400 | Metro City, NY 10001\nInvoice Number: INV-2026-8841 Date: 2026-08-28\nItem 1: Cloud Storage Tier 2 $300.00\nItem 2: API Gateway Units $225.00\nTotal Balance Due: $1,244.88\nAuthorized Status: APPROVED",
        "words": [
          { "word": "APEX", "confidence": 1.0, "source": "digital", "bbox": { "x0": 60.0, "top": 64.0, "x1": 114.5, "bottom": 84.0 } },
          { "word": "LOGISTICS", "confidence": 1.0, "source": "digital", "bbox": { "x0": 120.0, "top": 64.0, "x1": 227.8, "bottom": 84.0 } },
          { "word": "&", "confidence": 1.0, "source": "digital", "bbox": { "x0": 233.4, "top": 64.0, "x1": 247.8, "bottom": 84.0 } },
          { "word": "CLOUD", "confidence": 1.0, "source": "digital", "bbox": { "x0": 253.4, "top": 64.0, "x1": 324.5, "bottom": 84.0 } },
          { "word": "SERVICES", "confidence": 1.0, "source": "digital", "bbox": { "x0": 330.0, "top": 64.0, "x1": 431.2, "bottom": 84.0 } },
          { "word": "100", "confidence": 1.0, "source": "digital", "bbox": { "x0": 60.0, "top": 96.0, "x1": 85.0, "bottom": 108.0 } },
          { "word": "Enterprise", "confidence": 1.0, "source": "digital", "bbox": { "x0": 89.0, "top": 96.0, "x1": 150.0, "bottom": 108.0 } },
          { "word": "Boulevard,", "confidence": 0.74, "source": "ocr", "bbox": { "x0": 154.0, "top": 96.0, "x1": 215.0, "bottom": 108.0 } },
          { "word": "Suite", "confidence": 1.0, "source": "digital", "bbox": { "x0": 220.0, "top": 96.0, "x1": 250.0, "bottom": 108.0 } },
          { "word": "400", "confidence": 1.0, "source": "digital", "bbox": { "x0": 255.0, "top": 96.0, "x1": 278.0, "bottom": 108.0 } },
          { "word": "|", "confidence": 1.0, "source": "digital", "bbox": { "x0": 282.0, "top": 96.0, "x1": 288.0, "bottom": 108.0 } },
          { "word": "Metro", "confidence": 1.0, "source": "digital", "bbox": { "x0": 292.0, "top": 96.0, "x1": 330.0, "bottom": 108.0 } },
          { "word": "City,", "confidence": 1.0, "source": "digital", "bbox": { "x0": 334.0, "top": 96.0, "x1": 362.0, "bottom": 108.0 } },
          { "word": "NY", "confidence": 1.0, "source": "digital", "bbox": { "x0": 366.0, "top": 96.0, "x1": 385.0, "bottom": 108.0 } },
          { "word": "10001", "confidence": 1.0, "source": "digital", "bbox": { "x0": 390.0, "top": 96.0, "x1": 428.0, "bottom": 108.0 } },
          { "word": "Invoice", "confidence": 1.0, "source": "digital", "bbox": { "x0": 60.0, "top": 140.0, "x1": 110.0, "bottom": 154.0 } },
          { "word": "Number:", "confidence": 1.0, "source": "digital", "bbox": { "x0": 114.0, "top": 140.0, "x1": 168.0, "bottom": 154.0 } },
          { "word": "INV-2026-8841", "confidence": 0.71, "source": "ocr", "bbox": { "x0": 175.0, "top": 140.0, "x1": 270.0, "bottom": 154.0 } },
          { "word": "Date:", "confidence": 1.0, "source": "digital", "bbox": { "x0": 330.0, "top": 140.0, "x1": 365.0, "bottom": 154.0 } },
          { "word": "2026-08-28", "confidence": 1.0, "source": "digital", "bbox": { "x0": 372.0, "top": 140.0, "x1": 450.0, "bottom": 154.0 } },
          { "word": "Item", "confidence": 1.0, "source": "digital", "bbox": { "x0": 60.0, "top": 185.0, "x1": 90.0, "bottom": 198.0 } },
          { "word": "1:", "confidence": 1.0, "source": "digital", "bbox": { "x0": 94.0, "top": 185.0, "x1": 106.0, "bottom": 198.0 } },
          { "word": "Cloud", "confidence": 1.0, "source": "digital", "bbox": { "x0": 115.0, "top": 185.0, "x1": 155.0, "bottom": 198.0 } },
          { "word": "Storage", "confidence": 1.0, "source": "digital", "bbox": { "x0": 160.0, "top": 185.0, "x1": 210.0, "bottom": 198.0 } },
          { "word": "Tier", "confidence": 1.0, "source": "digital", "bbox": { "x0": 216.0, "top": 185.0, "x1": 242.0, "bottom": 198.0 } },
          { "word": "2", "confidence": 1.0, "source": "digital", "bbox": { "x0": 248.0, "top": 185.0, "x1": 258.0, "bottom": 198.0 } },
          { "word": "$300.00", "confidence": 1.0, "source": "digital", "bbox": { "x0": 440.0, "top": 185.0, "x1": 495.0, "bottom": 198.0 } },
          { "word": "Item", "confidence": 1.0, "source": "digital", "bbox": { "x0": 60.0, "top": 212.0, "x1": 90.0, "bottom": 225.0 } },
          { "word": "2:", "confidence": 1.0, "source": "digital", "bbox": { "x0": 94.0, "top": 212.0, "x1": 106.0, "bottom": 225.0 } },
          { "word": "API", "confidence": 1.0, "source": "digital", "bbox": { "x0": 115.0, "top": 212.0, "x1": 140.0, "bottom": 225.0 } },
          { "word": "Gateway", "confidence": 1.0, "source": "digital", "bbox": { "x0": 146.0, "top": 212.0, "x1": 200.0, "bottom": 225.0 } },
          { "word": "Units", "confidence": 1.0, "source": "digital", "bbox": { "x0": 206.0, "top": 212.0, "x1": 240.0, "bottom": 225.0 } },
          { "word": "$225.00", "confidence": 1.0, "source": "digital", "bbox": { "x0": 440.0, "top": 212.0, "x1": 495.0, "bottom": 225.0 } },
          { "word": "$1,244.88", "confidence": 0.68, "source": "ocr", "bbox": { "x0": 440.0, "top": 250.0, "x1": 505.0, "bottom": 265.0 } }
        ]
      }
    ],
    "low_confidence_words": []
  } /* __DATA_PAYLOAD_END__ */;

  // Safe LocalStorage Helper
  function getStoredTheme() {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem("pdf_extractor_theme") || "light";
      }
    } catch (e) {
      // Storage restricted (e.g. sandboxed iframe)
    }
    return "light";
  }

  function setStoredTheme(theme) {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("pdf_extractor_theme", theme);
      }
    } catch (e) {
      // Storage restricted (e.g. sandboxed iframe)
    }
  }

  // Application Global State
  const state = {
    data: JSON.parse(JSON.stringify(EMBEDDED_DATA)),
    currentPage: 1,
    threshold: 0.85,
    filterMode: "all", // "all", "low", "corrected"
    searchQuery: "",
    zoom: 1.0,
    selectedWordRef: null, // { pageNum, wordIndex }
    correctionCount: 0,
    theme: getStoredTheme()
  };

  // DOM Elements Cache
  let dom = {};

  function queryElements() {
    dom = {
      themeToggleBtn: document.getElementById("themeToggleBtn"),
      themeStatusLabel: document.getElementById("themeStatusLabel"),
      themeIconSun: document.getElementById("themeIconSun"),
      themeIconMoon: document.getElementById("themeIconMoon"),
      thresholdSlider: document.getElementById("thresholdSlider"),
      thresholdNumberInput: document.getElementById("thresholdNumberInput"),
      thresholdBadge: document.getElementById("thresholdBadge"),
      btnFilterAll: document.getElementById("btnFilterAll"),
      btnFilterLow: document.getElementById("btnFilterLow"),
      btnFilterCorrected: document.getElementById("btnFilterCorrected"),
      filterBtns: document.querySelectorAll(".filter-btn"),
      countAll: document.getElementById("countAll"),
      countLow: document.getElementById("countLow"),
      countCorrected: document.getElementById("countCorrected"),
      searchWordsInput: document.getElementById("searchWordsInput"),
      filterNotificationBanner: document.getElementById("filterNotificationBanner"),
      filterNotificationText: document.getElementById("filterNotificationText"),
      clearFilterBtn: document.getElementById("clearFilterBtn"),
      kpiFilename: document.getElementById("kpiFilename"),
      kpiTotalWords: document.getElementById("kpiTotalWords"),
      kpiMeanConf: document.getElementById("kpiMeanConf"),
      kpiMeanConfBadge: document.getElementById("kpiMeanConfBadge"),
      kpiLowConf: document.getElementById("kpiLowConf"),
      kpiCorrections: document.getElementById("kpiCorrections"),
      zoomInBtn: document.getElementById("zoomInBtn"),
      zoomOutBtn: document.getElementById("zoomOutBtn"),
      zoomResetBtn: document.getElementById("zoomResetBtn"),
      zoomLabel: document.getElementById("zoomLabel"),
      prevPageBtn: document.getElementById("prevPageBtn"),
      nextPageBtn: document.getElementById("nextPageBtn"),
      pageIndicator: document.getElementById("pageIndicator"),
      pageModalityBadge: document.getElementById("pageModalityBadge"),
      canvasViewport: document.getElementById("canvasViewport"),
      sheetWrapper: document.getElementById("sheetWrapper"),
      pdfCanvas: document.getElementById("pdfCanvas"),
      overlayContainer: document.getElementById("overlayContainer"),
      tabItems: document.querySelectorAll(".tab-item"),
      tabPanes: document.querySelectorAll(".tab-pane-content"),
      auditTabBadge: document.getElementById("auditTabBadge"),
      fullTextDisplay: document.getElementById("fullTextDisplay"),
      copyFullTextBtn: document.getElementById("copyFullTextBtn"),
      jsonTabCodeDisplay: document.getElementById("jsonTabCodeDisplay"),
      copyJsonTabBtn: document.getElementById("copyJsonTabBtn"),
      downloadJsonTabBtn: document.getElementById("downloadJsonTabBtn"),
      inspectorCard: document.getElementById("inspectorCard"),
      inspectorEmpty: document.getElementById("inspectorEmpty"),
      inspWordText: document.getElementById("inspWordText"),
      inspConfScore: document.getElementById("inspConfScore"),
      inspMeterFill: document.getElementById("inspMeterFill"),
      inspSource: document.getElementById("inspSource"),
      inspPage: document.getElementById("inspPage"),
      inspBbox: document.getElementById("inspBbox"),
      inspEditInput: document.getElementById("inspEditInput"),
      applyCorrectionBtn: document.getElementById("applyCorrectionBtn"),
      approveBtn: document.getElementById("approveBtn"),
      prevIssueBtn: document.getElementById("prevIssueBtn"),
      nextIssueBtn: document.getElementById("nextIssueBtn"),
      tokenFlowContainer: document.getElementById("tokenFlowContainer"),
      auditListContainer: document.getElementById("auditListContainer"),
      auditEmptyState: document.getElementById("auditEmptyState"),
      fileInput: document.getElementById("fileInput"),
      exportJsonBtn: document.getElementById("exportJsonBtn"),
      viewJsonBtn: document.getElementById("viewJsonBtn"),
      jsonModal: document.getElementById("jsonModal"),
      closeModalBtn: document.getElementById("closeModalBtn"),
      copyJsonBtn: document.getElementById("copyJsonBtn"),
      jsonModalCode: document.getElementById("jsonModalCode")
    };
  }

  // Apply Theme Function
  function applyTheme(newTheme) {
    state.theme = newTheme;
    document.documentElement.setAttribute("data-theme", newTheme);
    if (document.body) {
      document.body.setAttribute("data-theme", newTheme);
    }
    setStoredTheme(newTheme);

    const isDark = newTheme === "dark";
    if (dom.themeToggleBtn) {
      dom.themeToggleBtn.setAttribute("data-active-theme", newTheme);
      dom.themeToggleBtn.setAttribute("aria-label", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
      if (dom.themeStatusLabel) {
        dom.themeStatusLabel.textContent = isDark ? "Light Mode" : "Dark Mode";
      }
      if (dom.themeIconSun && dom.themeIconMoon) {
        dom.themeIconSun.style.display = isDark ? "block" : "none";
        dom.themeIconMoon.style.display = isDark ? "none" : "block";
      }
    }

    renderVisualPage();
  }

  function toggleTheme() {
    applyTheme(state.theme === "dark" ? "light" : "dark");
  }

  // Recalculate Metrics and Low Confidence Lists
  function recalculateMetrics() {
    let lowConfCount = 0;
    let correctedCount = 0;
    let sumConfidence = 0;
    let wordCount = 0;
    const lowConfList = [];

    state.data.pages.forEach(page => {
      page.words.forEach((w, idx) => {
        wordCount++;
        sumConfidence += w.confidence;
        if (w.human_corrected) {
          correctedCount++;
        }
        if (w.confidence < state.threshold) {
          lowConfCount++;
          lowConfList.push({
            word: w.word,
            confidence: w.confidence,
            page: page.page_number,
            wordIndex: idx,
            source: w.source,
            bbox: w.bbox
          });
        }
      });
    });

    state.data.low_confidence_words = lowConfList;
    state.data.metadata.low_confidence_count = lowConfCount;
    state.data.metadata.low_confidence_threshold = state.threshold;
    state.data.metadata.total_words = wordCount;
    state.data.metadata.mean_confidence = wordCount > 0 ? Number((sumConfidence / wordCount).toFixed(4)) : 1.0;
    state.correctionCount = correctedCount;

    // Update KPI Card Displays
    if (dom.kpiTotalWords) dom.kpiTotalWords.textContent = wordCount;
    if (dom.kpiMeanConf) {
      const meanPct = (state.data.metadata.mean_confidence * 100).toFixed(1);
      dom.kpiMeanConf.textContent = meanPct + "%";
      if (dom.kpiMeanConfBadge) {
        dom.kpiMeanConfBadge.textContent = state.data.metadata.mean_confidence >= 0.95 ? "Certain" : (state.data.metadata.mean_confidence >= 0.85 ? "Good" : "Audit");
        dom.kpiMeanConfBadge.className = `kpi-badge ${state.data.metadata.mean_confidence >= 0.85 ? "high" : "low"}`;
      }
    }
    if (dom.kpiLowConf) dom.kpiLowConf.textContent = lowConfCount;
    if (dom.kpiCorrections) dom.kpiCorrections.textContent = correctedCount;
    if (dom.kpiFilename) dom.kpiFilename.textContent = state.data.metadata.filename || "document.pdf";

    // Update Filter Button Count Badges & Audit Badge
    if (dom.countAll) dom.countAll.textContent = wordCount;
    if (dom.countLow) dom.countLow.textContent = lowConfCount;
    if (dom.countCorrected) dom.countCorrected.textContent = correctedCount;
    if (dom.auditTabBadge) dom.auditTabBadge.textContent = lowConfCount;

    renderFullTextTab();
    renderJsonTab();
  }

  // Render Full Text Tab
  function renderFullTextTab() {
    if (dom.fullTextDisplay) {
      dom.fullTextDisplay.value = state.data.full_text || "";
    }
  }

  // Render JSON Output Tab
  function renderJsonTab() {
    if (dom.jsonTabCodeDisplay) {
      dom.jsonTabCodeDisplay.textContent = JSON.stringify(state.data, null, 2);
    }
  }

  // Update Global Threshold Value
  function setGlobalThreshold(val) {
    const num = Math.max(0.00, Math.min(1.00, parseFloat(val) || 0.00));
    state.threshold = Number(num.toFixed(2));

    if (dom.thresholdSlider) dom.thresholdSlider.value = state.threshold;
    if (dom.thresholdNumberInput) dom.thresholdNumberInput.value = state.threshold.toFixed(2);
    if (dom.thresholdBadge) dom.thresholdBadge.textContent = `${Math.round(state.threshold * 100)}%`;

    recalculateMetrics();
    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();

    // Re-sync inspector if a word is selected
    if (state.selectedWordRef) {
      selectWord(state.selectedWordRef.pageNum, state.selectedWordRef.wordIndex);
    }
  }

  // Set View Filter Mode (All, Low, Corrected)
  function setFilterMode(mode) {
    state.filterMode = mode;

    dom.filterBtns.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-filter") === mode);
    });

    if (dom.filterNotificationBanner) {
      if (mode === "all") {
        dom.filterNotificationBanner.style.display = "none";
      } else if (mode === "low") {
        dom.filterNotificationBanner.style.display = "flex";
        dom.filterNotificationText.textContent = `Showing only words with confidence < ${Math.round(state.threshold * 100)}%`;
      } else if (mode === "corrected") {
        dom.filterNotificationBanner.style.display = "flex";
        dom.filterNotificationText.textContent = `Showing only words corrected by a human reviewer`;
      }
    }

    renderVisualPage();
    renderTextFlow();
  }

  // Render Visual Document Page & Interactive Overlays
  function renderVisualPage() {
    const pageIndex = state.currentPage - 1;
    const page = state.data.pages[pageIndex];
    if (!page || !dom.pdfCanvas) return;

    const width = page.width || 612;
    const height = page.height || 792;

    dom.pdfCanvas.width = width;
    dom.pdfCanvas.height = height;
    dom.sheetWrapper.style.width = width + "px";
    dom.sheetWrapper.style.height = height + "px";
    dom.sheetWrapper.style.transform = `scale(${state.zoom})`;

    // Update Modality Badge
    if (dom.pageModalityBadge) {
      if (page.page_type === "ocr" || width < 400) {
        dom.pageModalityBadge.textContent = "Scanned OCR Receipt";
        dom.pageModalityBadge.className = "kpi-badge low";
      } else if (state.data.pages.length > 1) {
        dom.pageModalityBadge.textContent = "Hybrid Multi-Page";
        dom.pageModalityBadge.className = "kpi-badge info";
      } else {
        dom.pageModalityBadge.textContent = "Digital Vector";
        dom.pageModalityBadge.className = "kpi-badge high";
      }
    }

    const ctx = dom.pdfCanvas.getContext("2d");
    
    // Page paper background (crisp white with clean border)
    ctx.fillStyle = (page.page_type === "ocr" || width < 400) ? "#fcfbfa" : "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Subtle page border
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, width, height);

    const isMonospace = page.page_type === "ocr" || width < 400;

    // Render Vector / OCR Text on Document Sheet
    page.words.forEach(w => {
      const box = w.bbox;
      const boxHeight = Math.max(10, box.bottom - box.top);
      const fontSize = Math.max(8.5, Math.min(boxHeight * 0.85, 16));
      ctx.font = isMonospace
        ? `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace`
        : `600 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

      // Determine text visibility based on filter mode
      let isDimmed = false;
      if (state.filterMode === "low" && w.confidence >= state.threshold) {
        isDimmed = true;
      } else if (state.filterMode === "corrected" && !w.human_corrected) {
        isDimmed = true;
      }

      if (isDimmed) {
        ctx.fillStyle = "rgba(15, 23, 42, 0.12)";
      } else if (w.confidence < state.threshold) {
        ctx.fillStyle = "#991b1b"; // Dark red for low confidence text
      } else if (w.human_corrected) {
        ctx.fillStyle = "#5b21b6"; // Purple for corrected text
      } else {
        ctx.fillStyle = "#0f172a"; // Standard dark slate
      }

      ctx.fillText(w.word, box.x0, box.bottom - 2);
    });

    // Rebuild Bounding Box Overlays
    dom.overlayContainer.innerHTML = "";

    page.words.forEach((w, idx) => {
      const box = w.bbox;
      const isLow = w.confidence < state.threshold;
      const isSelected = state.selectedWordRef && state.selectedWordRef.pageNum === state.currentPage && state.selectedWordRef.wordIndex === idx;

      // Filter matching
      let isDimmed = false;
      if (state.filterMode === "low" && !isLow) isDimmed = true;
      if (state.filterMode === "corrected" && !w.human_corrected) isDimmed = true;
      if (state.searchQuery && !w.word.toLowerCase().includes(state.searchQuery.toLowerCase())) isDimmed = true;

      const boxEl = document.createElement("div");
      boxEl.className = "bbox-box";

      if (w.human_corrected) {
        boxEl.classList.add("corrected");
      } else if (isLow) {
        boxEl.classList.add("low");
      } else {
        boxEl.classList.add("high");
      }

      if (isDimmed) {
        boxEl.classList.add("dimmed");
      }

      if (isSelected) {
        boxEl.classList.add("selected");
      }

      boxEl.style.left = box.x0 + "px";
      boxEl.style.top = box.top + "px";
      boxEl.style.width = Math.max(10, box.x1 - box.x0) + "px";
      boxEl.style.height = Math.max(10, box.bottom - box.top) + "px";
      boxEl.title = `${w.word} | Confidence: ${(w.confidence * 100).toFixed(1)}% | Source: ${w.source}`;

      boxEl.addEventListener("click", (e) => {
        e.stopPropagation();
        selectWord(state.currentPage, idx);
      });

      dom.overlayContainer.appendChild(boxEl);
    });

    // Update Pagination & Zoom labels
    if (dom.pageIndicator) dom.pageIndicator.textContent = `Page ${state.currentPage} of ${state.data.pages.length}`;
    if (dom.prevPageBtn) dom.prevPageBtn.disabled = state.currentPage <= 1;
    if (dom.nextPageBtn) dom.nextPageBtn.disabled = state.currentPage >= state.data.pages.length;
    if (dom.zoomLabel) dom.zoomLabel.textContent = `${Math.round(state.zoom * 100)}%`;
  }

  // Render Document Text Flow in Right Pane
  function renderTextFlow() {
    const pageIndex = state.currentPage - 1;
    const page = state.data.pages[pageIndex];
    if (!page || !dom.tokenFlowContainer) return;

    dom.tokenFlowContainer.innerHTML = "";

    const visibleWords = [];
    page.words.forEach((w, idx) => {
      const isLow = w.confidence < state.threshold;
      if (state.filterMode === "low" && !isLow) return;
      if (state.filterMode === "corrected" && !w.human_corrected) return;
      if (state.searchQuery && !w.word.toLowerCase().includes(state.searchQuery.toLowerCase())) return;
      visibleWords.push({ word: w, idx });
    });

    if (visibleWords.length === 0) {
      const emptyMsg = document.createElement("div");
      emptyMsg.style.color = "var(--text-muted)";
      emptyMsg.style.fontSize = "12px";
      emptyMsg.style.padding = "16px";
      emptyMsg.style.textAlign = "center";
      emptyMsg.textContent = state.filterMode === "low"
        ? "No low-confidence tokens found on this page."
        : (state.filterMode === "corrected" ? "No human-corrected tokens found on this page." : "No matching tokens.");
      dom.tokenFlowContainer.appendChild(emptyMsg);
      return;
    }

    visibleWords.forEach(({ word: w, idx }) => {
      const span = document.createElement("span");
      span.className = "token-word";
      span.textContent = w.word;

      const isLow = w.confidence < state.threshold;
      if (w.human_corrected) {
        span.classList.add("corrected");
      } else if (isLow) {
        span.classList.add("low");
      } else {
        span.classList.add("high");
      }

      const isSelected = state.selectedWordRef && state.selectedWordRef.pageNum === state.currentPage && state.selectedWordRef.wordIndex === idx;
      if (isSelected) {
        span.classList.add("selected");
      }

      span.title = `Confidence: ${(w.confidence * 100).toFixed(1)}% | Source: ${w.source}`;

      span.addEventListener("click", () => {
        selectWord(state.currentPage, idx);
      });

      dom.tokenFlowContainer.appendChild(span);
      dom.tokenFlowContainer.appendChild(document.createTextNode(" "));
    });
  }

  // Render Audit Queue List
  function renderAuditQueue() {
    if (!dom.auditListContainer) return;
    dom.auditListContainer.innerHTML = "";
    const list = state.data.low_confidence_words || [];

    if (list.length === 0) {
      if (dom.auditEmptyState) dom.auditEmptyState.style.display = "block";
      return;
    }

    if (dom.auditEmptyState) dom.auditEmptyState.style.display = "none";

    list.forEach((item) => {
      const itemEl = document.createElement("div");
      itemEl.className = "audit-item-row";
      const isSelected = state.selectedWordRef && state.selectedWordRef.pageNum === item.page && state.selectedWordRef.wordIndex === item.wordIndex;
      if (isSelected) {
        itemEl.classList.add("selected");
      }

      const confPercent = (item.confidence * 100).toFixed(1) + "%";

      itemEl.innerHTML = `
        <div>
          <div class="audit-word-title">${escapeHtml(item.word)}</div>
          <div class="audit-meta-info">Page ${item.page} | Source: ${item.source}</div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="kpi-badge low">${confPercent}</span>
          <button class="btn btn-sm" data-action="inspect">Inspect</button>
        </div>
      `;

      itemEl.querySelector('[data-action="inspect"]').addEventListener("click", (e) => {
        e.stopPropagation();
        if (state.currentPage !== item.page) {
          state.currentPage = item.page;
        }
        selectWord(item.page, item.wordIndex);
      });

      itemEl.addEventListener("click", () => {
        if (state.currentPage !== item.page) {
          state.currentPage = item.page;
        }
        selectWord(item.page, item.wordIndex);
      });

      dom.auditListContainer.appendChild(itemEl);
    });
  }

  // Select a Word Token & Open Inspector Card
  function selectWord(pageNum, wordIndex) {
    state.selectedWordRef = { pageNum, wordIndex };
    const page = state.data.pages[pageNum - 1];
    if (!page || !page.words[wordIndex]) return;

    const item = page.words[wordIndex];

    if (dom.inspectorEmpty) dom.inspectorEmpty.style.display = "none";
    if (dom.inspectorCard) dom.inspectorCard.style.display = "block";

    if (dom.inspWordText) dom.inspWordText.textContent = item.word;
    const confScore = (item.confidence * 100).toFixed(1);
    if (dom.inspConfScore) {
      dom.inspConfScore.textContent = `${confScore}%`;
      dom.inspConfScore.className = `kpi-badge ${item.human_corrected ? "corrected" : (item.confidence >= state.threshold ? "high" : "low")}`;
    }

    // Meter bar color and fill
    if (dom.inspMeterFill) {
      dom.inspMeterFill.style.width = `${Math.max(5, confScore)}%`;
      dom.inspMeterFill.style.backgroundColor = item.human_corrected ? "var(--status-corrected-bar)" : (item.confidence >= state.threshold ? "var(--status-high-bar)" : "var(--status-low-bar)");
    }

    if (dom.inspSource) dom.inspSource.textContent = item.human_corrected ? "Human Verified" : item.source;
    if (dom.inspPage) dom.inspPage.textContent = `Page ${pageNum}`;
    if (dom.inspBbox) dom.inspBbox.textContent = `[${item.bbox.x0}, ${item.bbox.top}, ${item.bbox.x1}, ${item.bbox.bottom}]`;
    if (dom.inspEditInput) {
      dom.inspEditInput.value = item.word;
      dom.inspEditInput.focus();
    }

    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
  }

  // Apply HITL Correction
  function applyCorrection() {
    if (!state.selectedWordRef) return;
    const { pageNum, wordIndex } = state.selectedWordRef;
    const page = state.data.pages[pageNum - 1];
    if (!page || !page.words[wordIndex]) return;

    const newText = dom.inspEditInput.value.trim();
    if (!newText) return;

    const item = page.words[wordIndex];
    item.word = newText;
    item.confidence = 1.0;
    item.human_corrected = true;

    rebuildFullText();
    recalculateMetrics();
    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
    selectWord(pageNum, wordIndex);
  }

  // Approve Word As-Is
  function approveAsIs() {
    if (!state.selectedWordRef) return;
    const { pageNum, wordIndex } = state.selectedWordRef;
    const page = state.data.pages[pageNum - 1];
    if (!page || !page.words[wordIndex]) return;

    const item = page.words[wordIndex];
    item.confidence = 1.0;
    item.human_corrected = true;

    recalculateMetrics();
    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
    selectWord(pageNum, wordIndex);
  }

  // Navigate Issue Items (Previous / Next Low Confidence Word)
  function navigateIssues(direction) {
    const list = state.data.low_confidence_words || [];
    if (list.length === 0) return;

    let currentIndex = -1;
    if (state.selectedWordRef) {
      currentIndex = list.findIndex(
        item => item.page === state.selectedWordRef.pageNum && item.wordIndex === state.selectedWordRef.wordIndex
      );
    }

    let nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= list.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = list.length - 1;

    const target = list[nextIndex];
    if (target) {
      state.currentPage = target.page;
      selectWord(target.page, target.wordIndex);
    }
  }

  function rebuildFullText() {
    state.data.pages.forEach(page => {
      page.text = page.words.map(w => w.word).join(" ");
    });
    state.data.full_text = state.data.pages.map(p => p.text).join("\n\n");
  }

  // File Upload Handling
  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.name.endsWith(".json")) {
      const reader = new FileReader();
      reader.onload = function (event) {
        try {
          const parsed = JSON.parse(event.target.result);
          if (!parsed.pages || !parsed.metadata) {
            alert("Invalid extraction JSON format: missing required 'metadata' or 'pages' sections.");
            return;
          }
          state.data = parsed;
          state.currentPage = 1;
          state.selectedWordRef = null;
          state.correctionCount = 0;
          const initialThreshold = parsed.metadata.low_confidence_threshold || 0.85;
          setGlobalThreshold(initialThreshold);
        } catch (err) {
          alert("Error parsing JSON file: " + err.message);
        }
      };
      reader.readAsText(file);
    } else if (file.name.endsWith(".pdf")) {
      state.data.metadata.filename = file.name;
      if (dom.kpiFilename) dom.kpiFilename.textContent = file.name;
      alert(`Loaded PDF reference: ${file.name}. To view full word bounding boxes and confidence scores, load the corresponding extraction JSON or generate a dashboard using the extraction script.`);
    }
  }

  // Export Corrected JSON File
  function exportJson() {
    recalculateMetrics();
    state.data.metadata.human_corrections_count = state.correctionCount;
    state.data.metadata.last_modified_utc = new Date().toISOString();

    const jsonStr = JSON.stringify(state.data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const baseName = (state.data.metadata.filename || "document").replace(/\.pdf$/i, "").replace(/\.json$/i, "");
    const filename = `${baseName}_corrected.json`;
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
    if (dom.jsonModalCode) dom.jsonModalCode.textContent = JSON.stringify(state.data, null, 2);
    if (dom.jsonModal) dom.jsonModal.classList.add("open");
  }

  function closeJsonModal() {
    if (dom.jsonModal) dom.jsonModal.classList.remove("open");
  }

  function copyJsonToClipboard() {
    const code = dom.jsonModalCode.textContent;
    navigator.clipboard.writeText(code).then(() => {
      dom.copyJsonBtn.textContent = "Copied!";
      setTimeout(() => {
        dom.copyJsonBtn.textContent = "Copy JSON";
      }, 1500);
    });
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Event Listeners Registration
  function registerEvents() {
    // Theme Switcher Button
    if (dom.themeToggleBtn) {
      dom.themeToggleBtn.addEventListener("click", toggleTheme);
    }

    // Threshold Slider & Number Input (Two-way linked)
    if (dom.thresholdSlider) {
      dom.thresholdSlider.addEventListener("input", (e) => {
        setGlobalThreshold(e.target.value);
      });
    }
    if (dom.thresholdNumberInput) {
      dom.thresholdNumberInput.addEventListener("change", (e) => {
        setGlobalThreshold(e.target.value);
      });
      dom.thresholdNumberInput.addEventListener("input", (e) => {
        setGlobalThreshold(e.target.value);
      });
    }

    // Filter Buttons (All Words, Low Confidence, Corrected)
    dom.filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        setFilterMode(btn.getAttribute("data-filter"));
      });
    });

    if (dom.clearFilterBtn) {
      dom.clearFilterBtn.addEventListener("click", () => {
        setFilterMode("all");
      });
    }

    // Search Input
    if (dom.searchWordsInput) {
      dom.searchWordsInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value.trim();
        renderVisualPage();
        renderTextFlow();
      });
    }

    // Zoom Controls
    if (dom.zoomInBtn) {
      dom.zoomInBtn.addEventListener("click", () => {
        state.zoom = Math.min(2.0, state.zoom + 0.15);
        renderVisualPage();
      });
    }
    if (dom.zoomOutBtn) {
      dom.zoomOutBtn.addEventListener("click", () => {
        state.zoom = Math.max(0.5, state.zoom - 0.15);
        renderVisualPage();
      });
    }
    if (dom.zoomResetBtn) {
      dom.zoomResetBtn.addEventListener("click", () => {
        state.zoom = 1.0;
        renderVisualPage();
      });
    }

    // Pagination
    if (dom.prevPageBtn) {
      dom.prevPageBtn.addEventListener("click", () => {
        if (state.currentPage > 1) {
          state.currentPage--;
          renderVisualPage();
          renderTextFlow();
        }
      });
    }
    if (dom.nextPageBtn) {
      dom.nextPageBtn.addEventListener("click", () => {
        if (state.currentPage < state.data.pages.length) {
          state.currentPage++;
          renderVisualPage();
          renderTextFlow();
        }
      });
    }

    // HITL Actions
    if (dom.applyCorrectionBtn) dom.applyCorrectionBtn.addEventListener("click", applyCorrection);
    if (dom.approveBtn) dom.approveBtn.addEventListener("click", approveAsIs);
    if (dom.inspEditInput) {
      dom.inspEditInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") applyCorrection();
      });
    }
    if (dom.prevIssueBtn) dom.prevIssueBtn.addEventListener("click", () => navigateIssues("prev"));
    if (dom.nextIssueBtn) dom.nextIssueBtn.addEventListener("click", () => navigateIssues("next"));

    // Tabs
    dom.tabItems.forEach(tab => {
      tab.addEventListener("click", () => {
        dom.tabItems.forEach(t => t.classList.remove("active"));
        dom.tabPanes.forEach(p => p.classList.remove("active"));
        tab.classList.add("active");
        const targetId = tab.getAttribute("data-tab");
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add("active");
      });
    });

    // File & Tab Actions
    if (dom.fileInput) dom.fileInput.addEventListener("change", handleFileSelect);
    if (dom.exportJsonBtn) dom.exportJsonBtn.addEventListener("click", exportJson);
    if (dom.downloadJsonTabBtn) dom.downloadJsonTabBtn.addEventListener("click", exportJson);
    if (dom.viewJsonBtn) dom.viewJsonBtn.addEventListener("click", openJsonModal);
    if (dom.closeModalBtn) dom.closeModalBtn.addEventListener("click", closeJsonModal);
    if (dom.copyJsonBtn) dom.copyJsonBtn.addEventListener("click", copyJsonToClipboard);
    if (dom.copyJsonTabBtn) {
      dom.copyJsonTabBtn.addEventListener("click", () => {
        if (dom.jsonTabCodeDisplay) {
          navigator.clipboard.writeText(dom.jsonTabCodeDisplay.textContent).then(() => {
            dom.copyJsonTabBtn.textContent = "Copied!";
            setTimeout(() => {
              dom.copyJsonTabBtn.textContent = "Copy JSON";
            }, 1500);
          });
        }
      });
    }
    if (dom.copyFullTextBtn) {
      dom.copyFullTextBtn.addEventListener("click", () => {
        if (dom.fullTextDisplay) {
          navigator.clipboard.writeText(dom.fullTextDisplay.value).then(() => {
            dom.copyFullTextBtn.textContent = "Copied!";
            setTimeout(() => {
              dom.copyFullTextBtn.textContent = "Copy Text";
            }, 1500);
          });
        }
      });
    }
    if (dom.jsonModal) {
      dom.jsonModal.addEventListener("click", (e) => {
        if (e.target === dom.jsonModal) closeJsonModal();
      });
    }
  }

  // Initializer
  function init() {
    queryElements();
    applyTheme(state.theme);
    registerEvents();
    setGlobalThreshold(state.data.metadata.low_confidence_threshold || 0.85);
  }

  // Guaranteed Execution regardless of readyState
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
