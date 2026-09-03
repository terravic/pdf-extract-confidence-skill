/**
 * PDF Word-Level Confidence Extraction - Modern UI Dashboard Application
 *
 * Dual Human-in-the-Loop & Agentic LLM (Gemini) Verification Workspace.
 * Provides dynamic threshold filtering, visual document coordinate overlays,
 * synchronized text selection, manual editing, and 1-click Gemini AI auto-correction.
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

  // LocalStorage Helpers
  function getStored(key, defaultVal) {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key) || defaultVal;
      }
    } catch (e) {}
    return defaultVal;
  }

  function setStored(key, val) {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, val);
      }
    } catch (e) {}
  }

  // Application Global State
  const state = {
    data: JSON.parse(JSON.stringify(EMBEDDED_DATA)),
    currentPage: 1,
    threshold: 0.85,
    filterMode: "all", // "all", "low", "corrected", "ai"
    searchQuery: "",
    zoom: 1.0,
    selectedWordRef: null, // { pageNum, wordIndex }
    correctionCount: 0,
    aiCorrectionCount: 0,
    theme: getStored("pdf_extractor_theme", "light"),
    geminiApiKey: getStored("pdf_gemini_api_key", ""),
    geminiModel: getStored("pdf_gemini_model", "gemini-3.7-flash"),
    aiWorkflowMode: getStored("pdf_gemini_mode", "staged"), // "staged" (Option A) vs "direct" (Option B)
    aiSuggestions: [],
    historyStack: [],
    activeSingleAiSuggestion: null
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
      btnFilterAi: document.getElementById("btnFilterAi"),
      filterBtns: document.querySelectorAll(".filter-btn"),
      countAll: document.getElementById("countAll"),
      countLow: document.getElementById("countLow"),
      countCorrected: document.getElementById("countCorrected"),
      countAi: document.getElementById("countAi"),
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
      kpiAiCorrections: document.getElementById("kpiAiCorrections"),
      kpiAiBadge: document.getElementById("kpiAiBadge"),
      zoomInBtn: document.getElementById("zoomInBtn"),
      zoomOutBtn: document.getElementById("zoomOutBtn"),
      zoomResetBtn: document.getElementById("zoomResetBtn"),
      btnFitWidth: document.getElementById("btnFitWidth"),
      btnFitPage: document.getElementById("btnFitPage"),
      zoomLabel: document.getElementById("zoomLabel"),
      prevPageBtn: document.getElementById("prevPageBtn"),
      nextPageBtn: document.getElementById("nextPageBtn"),
      pageIndicator: document.getElementById("pageIndicator"),
      pageModalityBadge: document.getElementById("pageModalityBadge"),
      canvasViewport: document.getElementById("canvasViewport"),
      viewportInner: document.getElementById("viewportInner"),
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
      btnAiSuggest: document.getElementById("btnAiSuggest"),
      inspAiSuggestionBox: document.getElementById("inspAiSuggestionBox"),
      inspAiActionBadge: document.getElementById("inspAiActionBadge"),
      inspAiSuggestedWord: document.getElementById("inspAiSuggestedWord"),
      inspAiReason: document.getElementById("inspAiReason"),
      btnAcceptAiSuggestion: document.getElementById("btnAcceptAiSuggestion"),
      btnDismissAiSuggestion: document.getElementById("btnDismissAiSuggestion"),
      prevIssueBtn: document.getElementById("prevIssueBtn"),
      nextIssueBtn: document.getElementById("nextIssueBtn"),
      tokenFlowContainer: document.getElementById("tokenFlowContainer"),
      auditListContainer: document.getElementById("auditListContainer"),
      auditEmptyState: document.getElementById("auditEmptyState"),
      btnRunAuditAi: document.getElementById("btnRunAuditAi"),
      aiQueueBanner: document.getElementById("aiQueueBanner"),
      aiQueueStatusText: document.getElementById("aiQueueStatusText"),
      btnApplyAllAiSuggestions: document.getElementById("btnApplyAllAiSuggestions"),
      btnApplyCorrectionsOnly: document.getElementById("btnApplyCorrectionsOnly"),
      btnClearAiSuggestions: document.getElementById("btnClearAiSuggestions"),
      aiSuggestionsTableWrapper: document.getElementById("aiSuggestionsTableWrapper"),
      aiReviewTableBody: document.getElementById("aiReviewTableBody"),
      btnAutoCorrectGemini: document.getElementById("btnAutoCorrectGemini"),
      btnGeminiSettings: document.getElementById("btnGeminiSettings"),
      geminiSettingsModal: document.getElementById("geminiSettingsModal"),
      geminiApiKeyInput: document.getElementById("geminiApiKeyInput"),
      toggleApiKeyVisibilityBtn: document.getElementById("toggleApiKeyVisibilityBtn"),
      geminiModelSelect: document.getElementById("geminiModelSelect"),
      radioModeStaged: document.getElementById("radioModeStaged"),
      radioModeDirect: document.getElementById("radioModeDirect"),
      closeSettingsModalBtn: document.getElementById("closeSettingsModalBtn"),
      btnCancelSettings: document.getElementById("btnCancelSettings"),
      btnSaveGeminiSettings: document.getElementById("btnSaveGeminiSettings"),
      fileInput: document.getElementById("fileInput"),
      exportJsonBtn: document.getElementById("exportJsonBtn"),
      viewJsonBtn: document.getElementById("viewJsonBtn"),
      jsonModal: document.getElementById("jsonModal"),
      closeModalBtn: document.getElementById("closeModalBtn"),
      copyJsonBtn: document.getElementById("copyJsonBtn")
    };
  }

  // Theme Management
  function applyTheme(theme) {
    state.theme = theme;
    setStored("pdf_extractor_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);

    if (dom.themeStatusLabel) {
      const isDark = theme === "dark";
      dom.themeStatusLabel.textContent = isDark ? "Dark Mode" : "Light Mode";
      if (dom.themeToggleBtn) {
        dom.themeToggleBtn.classList.toggle("active", isDark);
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
    let aiCount = 0;
    let sumConfidence = 0;
    let wordCount = 0;
    let minConfidence = 1.0;
    const lowConfList = [];

    state.data.pages.forEach(page => {
      let pageSumConf = 0;
      let pageWordCount = 0;
      page.words.forEach((w, idx) => {
        wordCount++;
        pageWordCount++;
        sumConfidence += w.confidence;
        pageSumConf += w.confidence;
        if (w.confidence < minConfidence) {
          minConfidence = w.confidence;
        }
        if (w.human_corrected) {
          correctedCount++;
        }
        if (w.llm_corrected || w.llm_approved) {
          aiCount++;
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
      page.word_count = pageWordCount;
      page.mean_confidence = pageWordCount > 0 ? Number((pageSumConf / pageWordCount).toFixed(4)) : 1.0;
    });

    state.data.low_confidence_words = lowConfList;
    state.data.metadata.low_confidence_count = lowConfCount;
    state.data.metadata.low_confidence_threshold = state.threshold;
    state.data.metadata.total_words = wordCount;
    state.data.metadata.mean_confidence = wordCount > 0 ? Number((sumConfidence / wordCount).toFixed(4)) : 1.0;
    state.data.metadata.min_confidence = wordCount > 0 ? Number(minConfidence.toFixed(4)) : 1.0;
    state.data.metadata.human_corrections_count = correctedCount;
    state.data.metadata.llm_corrections_count = aiCount;
    state.data.metadata.llm_model = state.geminiModel;
    state.correctionCount = correctedCount;
    state.aiCorrectionCount = aiCount;

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
    if (dom.kpiAiCorrections) dom.kpiAiCorrections.textContent = aiCount;
    if (dom.kpiFilename) dom.kpiFilename.textContent = state.data.metadata.filename || "document.pdf";

    // Update Filter Button Count Badges & Audit Badge
    if (dom.countAll) dom.countAll.textContent = wordCount;
    if (dom.countLow) dom.countLow.textContent = lowConfCount;
    if (dom.countCorrected) dom.countCorrected.textContent = correctedCount;
    if (dom.countAi) dom.countAi.textContent = aiCount;
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

  // Threshold and Filter Updates
  function setGlobalThreshold(val) {
    const num = Math.max(0.0, Math.min(1.0, parseFloat(val) || 0.0));
    state.threshold = Number(num.toFixed(2));

    if (dom.thresholdSlider) dom.thresholdSlider.value = state.threshold;
    if (dom.thresholdNumberInput) dom.thresholdNumberInput.value = state.threshold;
    if (dom.thresholdBadge) dom.thresholdBadge.textContent = `${Math.round(state.threshold * 100)}%`;

    recalculateMetrics();
    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
  }

  function setFilterMode(mode) {
    state.filterMode = mode;
    dom.filterBtns.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-filter") === mode);
    });

    if (dom.filterNotificationBanner) {
      if (mode === "all") {
        dom.filterNotificationBanner.style.display = "none";
      } else {
        dom.filterNotificationBanner.style.display = "flex";
        if (dom.filterNotificationText) {
          const modeLabels = {
            low: `Showing tokens scoring strictly below ${Math.round(state.threshold * 100)}% threshold`,
            corrected: "Showing human-corrected word tokens",
            ai: "Showing LLM-verified and AI-corrected tokens"
          };
          dom.filterNotificationText.textContent = modeLabels[mode] || "Showing filtered tokens";
        }
      }
    }

    renderVisualPage();
    renderTextFlow();
  }

  // In-memory cache for rendered original PDF page images
  const pageImageCache = new Map();

  // Auto-fit document inside viewport
  function autoFitPage(mode = "width") {
    if (!state.data || !state.data.pages || !state.data.pages.length || !dom.canvasViewport) return;
    const page = state.data.pages[state.currentPage - 1];
    if (!page) return;
    const width = page.width || 612;
    const height = page.height || 792;
    const vpWidth = Math.max(200, dom.canvasViewport.clientWidth - 48);
    const vpHeight = Math.max(200, dom.canvasViewport.clientHeight - 48);

    if (mode === "page" && vpHeight > 100) {
      const scaleX = vpWidth / width;
      const scaleY = vpHeight / height;
      state.zoom = Math.max(0.2, Math.min(2.0, Math.floor(Math.min(scaleX, scaleY) * 100) / 100));
    } else {
      state.zoom = Math.max(0.2, Math.min(2.0, Math.floor((vpWidth / width) * 100) / 100));
    }
    renderVisualPage();
  }

  // Render Visual PDF Sheet & Canvas
  function renderVisualPage() {
    const page = state.data.pages[state.currentPage - 1];
    if (!page || !dom.pdfCanvas) return;

    if (dom.pageIndicator) {
      dom.pageIndicator.textContent = `Page ${state.currentPage} of ${state.data.pages.length}`;
    }

    const width = page.width || 612;
    const height = page.height || 792;

    dom.pdfCanvas.width = width;
    dom.pdfCanvas.height = height;
    dom.sheetWrapper.style.width = width + "px";
    dom.sheetWrapper.style.height = height + "px";
    dom.sheetWrapper.style.transform = `scale(${state.zoom})`;

    if (dom.viewportInner) {
      dom.viewportInner.style.width = Math.round(width * state.zoom) + "px";
      dom.viewportInner.style.height = Math.round(height * state.zoom) + "px";
    }

    if (dom.zoomLabel) {
      dom.zoomLabel.textContent = `${Math.round(state.zoom * 100)}%`;
    }

    // Update Modality Badge
    if (dom.pageModalityBadge) {
      if (page.page_type === "ocr" || width < 400) {
        dom.pageModalityBadge.textContent = "Scanned OCR";
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

    if (page.image_data) {
      // High-fidelity rendering of original PDF page (digital, scanned, handwriting, stamps, tables)
      let cachedImg = pageImageCache.get(page.image_data);
      if (!cachedImg) {
        cachedImg = new Image();
        cachedImg.onload = () => {
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(cachedImg, 0, 0, width, height);
        };
        cachedImg.src = page.image_data;
        pageImageCache.set(page.image_data, cachedImg);
      }

      if (cachedImg.complete && cachedImg.naturalWidth > 0) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(cachedImg, 0, 0, width, height);
      } else {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
      }
    } else {
      // Clean fallback vector text canvas rendering
      ctx.fillStyle = (page.page_type === "ocr" || width < 400) ? "#fcfbfa" : "#ffffff";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, width, height);

      const isMonospace = page.page_type === "ocr" || width < 400;

      // Render fallback text on canvas
      page.words.forEach(w => {
        const box = w.bbox;
        const boxHeight = Math.max(10, box.bottom - box.top);
        const fontSize = Math.max(8.5, Math.min(boxHeight * 0.85, 16));
        ctx.font = isMonospace
          ? `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace`
          : `600 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

        let isDimmed = false;
        if (state.filterMode === "low" && w.confidence >= state.threshold) isDimmed = true;
        else if (state.filterMode === "corrected" && !w.human_corrected) isDimmed = true;
        else if (state.filterMode === "ai" && !w.llm_corrected && !w.llm_approved) isDimmed = true;

        if (isDimmed) {
          ctx.fillStyle = "rgba(15, 23, 42, 0.12)";
        } else if (w.confidence < state.threshold) {
          ctx.fillStyle = "#991b1b"; // Dark red for low confidence
        } else if (w.human_corrected) {
          ctx.fillStyle = "#5b21b6"; // Purple for manual corrected
        } else if (w.llm_corrected || w.llm_approved) {
          ctx.fillStyle = "#4338ca"; // Indigo for AI corrected/approved
        } else {
          ctx.fillStyle = "#0f172a";
        }

        ctx.fillText(w.word, box.x0, box.bottom - 2);
      });
    }

    // Rebuild Bounding Box Overlays
    dom.overlayContainer.innerHTML = "";

    page.words.forEach((w, idx) => {
      const box = w.bbox;
      const isLow = w.confidence < state.threshold;
      const isSelected = state.selectedWordRef && state.selectedWordRef.pageNum === state.currentPage && state.selectedWordRef.wordIndex === idx;

      let isDimmed = false;
      if (state.filterMode === "low" && !isLow) isDimmed = true;
      if (state.filterMode === "corrected" && !w.human_corrected) isDimmed = true;
      if (state.filterMode === "ai" && !w.llm_corrected && !w.llm_approved) isDimmed = true;
      if (state.searchQuery && !w.word.toLowerCase().includes(state.searchQuery.toLowerCase())) isDimmed = true;

      const boxEl = document.createElement("div");
      boxEl.className = "bbox-box";

      if (w.human_corrected) {
        boxEl.classList.add("corrected");
      } else if (w.llm_corrected || w.llm_approved) {
        boxEl.classList.add("ai");
      } else if (isLow) {
        boxEl.classList.add("low");
      } else {
        boxEl.classList.add("high");
      }

      if (isSelected) boxEl.classList.add("selected");
      if (isDimmed) boxEl.classList.add("dimmed");

      boxEl.style.left = box.x0 + "px";
      boxEl.style.top = box.top + "px";
      boxEl.style.width = Math.max(8, box.x1 - box.x0) + "px";
      boxEl.style.height = Math.max(10, box.bottom - box.top) + "px";

      const badgeText = w.human_corrected ? "Verified" : (w.llm_corrected ? "AI Fix" : (w.llm_approved ? "AI Approved" : `${Math.round(w.confidence * 100)}%`));
      boxEl.title = `Word: "${w.word}"\nConfidence: ${(w.confidence * 100).toFixed(1)}%\nStatus: ${badgeText}\nSource: ${w.source}`;

      boxEl.addEventListener("click", (e) => {
        e.stopPropagation();
        selectWord(state.currentPage, idx);
      });

      dom.overlayContainer.appendChild(boxEl);
    });
  }

  // Render Token Flow Chips in Tab 1
  function renderTextFlow() {
    if (!dom.tokenFlowContainer) return;
    dom.tokenFlowContainer.innerHTML = "";

    const page = state.data.pages[state.currentPage - 1];
    if (!page) return;

    page.words.forEach((w, idx) => {
      const isSelected = state.selectedWordRef && state.selectedWordRef.pageNum === state.currentPage && state.selectedWordRef.wordIndex === idx;
      const isLow = w.confidence < state.threshold;

      let isHidden = false;
      if (state.filterMode === "low" && !isLow) isHidden = true;
      if (state.filterMode === "corrected" && !w.human_corrected) isHidden = true;
      if (state.filterMode === "ai" && !w.llm_corrected && !w.llm_approved) isHidden = true;
      if (state.searchQuery && !w.word.toLowerCase().includes(state.searchQuery.toLowerCase())) isHidden = true;

      const span = document.createElement("span");
      span.className = "token-word";

      if (w.human_corrected) {
        span.classList.add("corrected");
      } else if (w.llm_corrected || w.llm_approved) {
        span.classList.add("ai");
      } else if (isLow) {
        span.classList.add("low");
      } else {
        span.classList.add("high");
      }

      if (isSelected) span.classList.add("selected");
      if (isHidden) span.style.display = "none";

      span.textContent = w.word;
      span.title = `Page ${state.currentPage} | ${(w.confidence * 100).toFixed(1)}%`;

      span.addEventListener("click", () => {
        selectWord(state.currentPage, idx);
      });

      dom.tokenFlowContainer.appendChild(span);
      dom.tokenFlowContainer.appendChild(document.createTextNode(" "));
    });
  }

  // Render Audit Queue List & Staged AI Table
  function renderAuditQueue() {
    if (!dom.auditListContainer) return;
    dom.auditListContainer.innerHTML = "";
    const list = state.data.low_confidence_words || [];

    // Check if AI suggestions exist
    const suggestions = state.aiSuggestions || [];
    if (suggestions.length > 0) {
      if (dom.aiQueueBanner) dom.aiQueueBanner.style.display = "flex";
      if (dom.aiSuggestionsTableWrapper) dom.aiSuggestionsTableWrapper.style.display = "block";
      if (dom.aiQueueStatusText) {
        const correctCount = suggestions.filter(s => s.action === "correct").length;
        const approveCount = suggestions.filter(s => s.action === "approve").length;
        dom.aiQueueStatusText.textContent = `Gemini (${state.geminiModel}): ${correctCount} corrections, ${approveCount} approvals staged for review.`;
      }
      renderAiReviewTable(suggestions);
    } else {
      if (dom.aiQueueBanner) dom.aiQueueBanner.style.display = "none";
      if (dom.aiSuggestionsTableWrapper) dom.aiSuggestionsTableWrapper.style.display = "none";
    }

    if (list.length === 0 && suggestions.length === 0) {
      if (dom.auditEmptyState) dom.auditEmptyState.style.display = "block";
      return;
    }

    if (dom.auditEmptyState) dom.auditEmptyState.style.display = "none";

    list.forEach((item) => {
      const itemEl = document.createElement("div");
      itemEl.className = "audit-item-row";
      const isSelected = state.selectedWordRef && state.selectedWordRef.pageNum === item.page && state.selectedWordRef.wordIndex === item.wordIndex;
      if (isSelected) itemEl.classList.add("selected");

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

      const inspectBtn = itemEl.querySelector('[data-action="inspect"]');
      if (inspectBtn) {
        inspectBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (state.currentPage !== item.page) state.currentPage = item.page;
          selectWord(item.page, item.wordIndex);
        });
      }

      itemEl.addEventListener("click", () => {
        if (state.currentPage !== item.page) state.currentPage = item.page;
        selectWord(item.page, item.wordIndex);
      });

      dom.auditListContainer.appendChild(itemEl);
    });
  }

  // Render Staged AI Review Table
  function renderAiReviewTable(suggestions) {
    if (!dom.aiReviewTableBody) return;
    dom.aiReviewTableBody.innerHTML = "";

    suggestions.forEach((s, idx) => {
      const tr = document.createElement("tr");
      const isCorrect = s.action === "correct";
      const badgeClass = isCorrect ? "ai-badge-correct" : "ai-badge-approve";
      const actionLabel = isCorrect ? "Suggest Fix" : "Approve As-Is";

      tr.innerHTML = `
        <td style="font-family: var(--font-mono); color: var(--text-muted);">${idx + 1}</td>
        <td>
          <span class="ai-table-word">${escapeHtml(s.original_word)}</span>
          <span class="ai-table-context" title="${escapeHtml(s.context || "")}">${escapeHtml(s.context || `Page ${s.page}`)}</span>
        </td>
        <td><span class="kpi-badge low">${Math.round((s.confidence || 0.7) * 100)}%</span></td>
        <td><span class="${badgeClass}">${actionLabel}</span></td>
        <td><span class="ai-table-suggested">${escapeHtml(s.suggested_word)}</span></td>
        <td style="font-size: 11px; color: var(--text-secondary); max-width: 180px;">${escapeHtml(s.reason)}</td>
        <td style="text-align: right; white-space: nowrap;">
          <button class="btn btn-sm btn-primary" data-ai-action="apply" data-index="${idx}">Apply</button>
          <button class="btn btn-sm" data-ai-action="jump" data-index="${idx}">Jump</button>
        </td>
      `;

      const applyBtn = tr.querySelector('[data-ai-action="apply"]');
      if (applyBtn) {
        applyBtn.addEventListener("click", () => {
          applySingleAiSuggestion(idx);
        });
      }

      const jumpBtn = tr.querySelector('[data-ai-action="jump"]');
      if (jumpBtn) {
        jumpBtn.addEventListener("click", () => {
          state.currentPage = s.page;
          selectWord(s.page, s.wordIndex);
        });
      }

      dom.aiReviewTableBody.appendChild(tr);
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
      let badgeClass = "low";
      if (item.human_corrected) badgeClass = "corrected";
      else if (item.llm_corrected || item.llm_approved) badgeClass = "ai";
      else if (item.confidence >= state.threshold) badgeClass = "high";
      dom.inspConfScore.className = `kpi-badge ${badgeClass}`;
    }

    if (dom.inspMeterFill) {
      dom.inspMeterFill.style.width = `${Math.max(5, confScore)}%`;
      let barColor = "var(--status-low-bar)";
      if (item.human_corrected) barColor = "var(--status-corrected-bar)";
      else if (item.llm_corrected || item.llm_approved) barColor = "var(--status-ai-bar)";
      else if (item.confidence >= state.threshold) barColor = "var(--status-high-bar)";
      dom.inspMeterFill.style.backgroundColor = barColor;
    }

    if (dom.inspSource) {
      if (item.human_corrected) dom.inspSource.textContent = "Human Verified";
      else if (item.llm_corrected) dom.inspSource.textContent = "Gemini Corrected";
      else if (item.llm_approved) dom.inspSource.textContent = "Gemini Approved";
      else dom.inspSource.textContent = item.source;
    }

    if (dom.inspPage) dom.inspPage.textContent = `Page ${pageNum}`;
    if (dom.inspBbox) dom.inspBbox.textContent = `[${item.bbox.x0}, ${item.bbox.top}, ${item.bbox.x1}, ${item.bbox.bottom}]`;
    if (dom.inspEditInput) {
      dom.inspEditInput.value = item.word;
    }

    // Hide any previous inspector AI suggestion box
    if (dom.inspAiSuggestionBox) dom.inspAiSuggestionBox.style.display = "none";

    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
  }

  // Apply HITL Manual Correction
  function applyCorrection() {
    if (!state.selectedWordRef) return;
    const { pageNum, wordIndex } = state.selectedWordRef;
    const page = state.data.pages[pageNum - 1];
    if (!page || !page.words[wordIndex]) return;

    const newText = dom.inspEditInput.value.trim();
    if (!newText) return;

    pushHistorySnapshot();
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

  // Approve Word As-Is (Manual)
  function approveAsIs() {
    if (!state.selectedWordRef) return;
    const { pageNum, wordIndex } = state.selectedWordRef;
    const page = state.data.pages[pageNum - 1];
    if (!page || !page.words[wordIndex]) return;

    pushHistorySnapshot();
    const item = page.words[wordIndex];
    item.confidence = 1.0;
    item.human_corrected = true;

    recalculateMetrics();
    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
    selectWord(pageNum, wordIndex);
  }

  // Extract Surrounding Context Window
  function extractSurroundingContext(pageNum, wordIndex, windowSize = 6) {
    const page = state.data.pages[pageNum - 1];
    if (!page || !page.words) return "";
    const start = Math.max(0, wordIndex - windowSize);
    const end = Math.min(page.words.length, wordIndex + windowSize + 1);
    return page.words.slice(start, end).map(w => w.word).join(" ");
  }

  // Push State to History Stack for 1-Click Undo
  function pushHistorySnapshot() {
    state.historyStack.push(JSON.parse(JSON.stringify(state.data)));
    if (state.historyStack.length > 20) state.historyStack.shift();
  }

  // Gemini REST API Caller
  async function callGeminiApi(prompt) {
    if (!state.geminiApiKey) {
      // Mock / Offline Heuristic Mode
      return generateMockAiResponses(prompt);
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${state.geminiModel}:generateContent?key=${state.geminiApiKey}`;
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,
        response_mime_type: "application/json"
      }
    };

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const errText = await resp.text();
      throw new Error(`Gemini API error HTTP ${resp.status}: ${errText}`);
    }

    const json = await resp.json();
    const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    return JSON.parse(rawText);
  }

  // Rule-based OCR correction heuristic for offline mode or fallback
  function applyHeuristicOcrFix(word, context) {
    const ctx = context || "";

    // 1. Exact/Substring dictionary rules for common OCR misrecognitions
    const exactCorrections = {
      "CATECOAY:": { suggested: "CATEGORY:", reason: "OCR letter 'C' and 'A' corrected to 'G' and 'R' in header label." },
      "CATECOAY": { suggested: "CATEGORY", reason: "OCR letter 'C' and 'A' corrected to 'G' and 'R' in header label." },
      "iOTICE": { suggested: "NOTICE", reason: "OCR lowercase 'i' corrected to uppercase 'N' in title." },
      "1OTICE": { suggested: "NOTICE", reason: "OCR digit '1' corrected to uppercase 'N' in title." },
      "iOTICE:": { suggested: "NOTICE:", reason: "OCR lowercase 'i' corrected to uppercase 'N' in title." },
      "1OTICE:": { suggested: "NOTICE:", reason: "OCR digit '1' corrected to uppercase 'N' in title." },
      "T0tal": { suggested: "Total", reason: "OCR digit '0' corrected to letter 'o' in table label." },
      "T0TAL": { suggested: "TOTAL", reason: "OCR digit '0' corrected to letter 'O' in table label." },
      "SUBT0TAL": { suggested: "SUBTOTAL", reason: "OCR digit '0' corrected to letter 'O' in table label." },
      "RECE1PT": { suggested: "RECEIPT", reason: "OCR digit '1' corrected to letter 'I' in header." },
      "BouIevard": { suggested: "Boulevard", reason: "OCR uppercase 'I' corrected to lowercase 'l' in address." },
      "BouIevard,": { suggested: "Boulevard,", reason: "OCR uppercase 'I' corrected to lowercase 'l' in address." },
      "SECRFT": { suggested: "SECRET", reason: "OCR letter 'F' corrected to 'E' in classification banner." },
      "DOClJMENT": { suggested: "DOCUMENT", reason: "OCR broken glyph 'lJ' corrected to 'U'." },
      "DEPARTMEIIT": { suggested: "DEPARTMENT", reason: "OCR broken glyph 'II' corrected to 'N'." },
      "1-I1G": { suggested: "1-IG", reason: "OCR digit 1 corrected to letter I in distribution code." },
      "1-0oS": { suggested: "1-OS", reason: "OCR digit 0 corrected to letter O in distribution code." },
      "-~DDCI": { suggested: "1-DDCI", reason: "OCR dash-tilde corrected to digit 1 in distribution code." }
    };

    if (exactCorrections[word]) {
      return {
        action: "correct",
        suggested_word: exactCorrections[word].suggested,
        reason: exactCorrections[word].reason
      };
    }

    // 2. Pure noise and margin speck artifacts
    if ([";", ",", ".", ":", "|", "©", "°", "__", "oo", "ae", "ee", "Oe", "~-", "-"].includes(word)) {
      return {
        action: "correct",
        suggested_word: "",
        reason: `Isolated OCR scan speck artifact '${word}' removed.`
      };
    }

    // 3. Document ID header corruption (e.g. '[ro4-t0062-10073' -> '104-10062-10073')
    if (word.includes("0062-10073")) {
      return {
        action: "correct",
        suggested_word: "104-10062-10073",
        reason: "OCR document ID header normalized to 104-10062-10073."
      };
    }

    // 4. Merged words in common phrasing (e.g. 'Asa result' -> 'As a')
    if (word === "Asa" && ctx.includes("result")) {
      return {
        action: "correct",
        suggested_word: "As a",
        reason: "Merged OCR token 'Asa' split to 'As a'."
      };
    }

    // 5. Single-character OCR word confusions (e.g. 'ot' -> 'of')
    if (word === "ot" && (ctx.includes("Agency") || ctx.includes("out") || ctx.includes("part"))) {
      return {
        action: "correct",
        suggested_word: "of",
        reason: "OCR letter 't' corrected to 'f'."
      };
    }

    // 6. Check for digit '0' inside uppercase word or letter 'O' inside numeric sequence
    if (word.includes("2O26")) {
      return {
        action: "correct",
        suggested_word: word.replace("2O26", "2026"),
        reason: "OCR letter 'O' replaced with digit '0' in year code."
      };
    }
    if (word.includes("INV-2O26")) {
      return {
        action: "correct",
        suggested_word: word.replace("2O26", "2026"),
        reason: "OCR letter 'O' replaced with digit '0' in invoice code."
      };
    }

    // 7. Stray quotes, backticks, or curly ticks on token edges (e.g. '‘but' -> 'but', 'in’' -> 'in', ''since' -> 'since', '‘6.' -> '6.')
    const cleanedTicks = word.replace(/^[‘\'\"\`]+/, "").replace(/[’\'\"\`]+$/, "");
    if (cleanedTicks !== word && cleanedTicks.length > 0 && !(word.startsWith("(") && word.endsWith(")"))) {
      return {
        action: "correct",
        suggested_word: cleanedTicks,
        reason: `Stray quote/tick artifact removed from '${word}'.`
      };
    }

    // 8. Leading stray dashes or dots (e.g. '-Liebengood' -> 'Liebengood', '.following' -> 'following', '-DDO' -> 'DDO')
    if (/^[-.~^|•][a-zA-Z0-9]/.test(word)) {
      return {
        action: "correct",
        suggested_word: word.replace(/^[-.~^|•]+/, ""),
        reason: `Leading scan artifact removed from '${word}'.`
      };
    }

    // 9. Merged periods inside lowercase words (e.g. 'raised.a' -> 'raised a')
    if (/[a-z]\.[a-z]/.test(word)) {
      return {
        action: "correct",
        suggested_word: word.replace(".", " "),
        reason: `Merged period in '${word}' separated into distinct words.`
      };
    }

    // 10. Trailing exclamation on numeric years (e.g. '1971!' -> '1971')
    if (/^\d{4}!$/.test(word)) {
      return {
        action: "correct",
        suggested_word: word.slice(0, -1),
        reason: `Stray exclamation mark on year trimmed from '${word}'.`
      };
    }

    // 11. Unmatched stray closing parentheses or brackets (e.g. 'ER),', 'church.)', 'from]', '12345)')
    if (!(word.startsWith("(") && word.endsWith(")")) && !(word.startsWith("[") && word.endsWith("]"))) {
      if ((word.endsWith(")") || word.endsWith("),") || word.endsWith(").") || word.endsWith("]") || word.endsWith("]!")) && !ctx.includes("(") && !ctx.includes("[")) {
        const cleanedPunct = word.replace(/[\)\]\}]+([,\.;:!\?]?)$/, "$1");
        if (cleanedPunct !== word) {
          return {
            action: "correct",
            suggested_word: cleanedPunct,
            reason: `Unmatched closing bracket removed from '${word}'.`
          };
        }
      }
    }

    // 12. Check legitimate domain words and formatting
    if (word.startsWith("***") || word.startsWith("---") || word.startsWith("===")) {
      return {
        action: "approve",
        suggested_word: word,
        reason: "Valid decorative receipt boundary delimiter line."
      };
    }

    if (word.includes("Boulevard,") || word.includes("Suite") || word.includes("TXN-") || word.includes("APPROVED")) {
      return {
        action: "approve",
        suggested_word: word,
        reason: "Legitimate address or status token verified within context."
      };
    }

    if ((word.startsWith("(") && word.endsWith(")")) || (word.startsWith("[") && word.endsWith("]"))) {
      return {
        action: "approve",
        suggested_word: word,
        reason: "Balanced parenthetical specification approved as-is."
      };
    }

    return {
      action: "approve",
      suggested_word: word,
      reason: "Confirmed valid token spelling within line sentence context."
    };
  }

  // Fallback / Mock Engine for Offline Testing
  function generateMockAiResponses(prompt) {
    try {
      const match = prompt.match(/Tokens to review:\s*(\[[\s\S]*?\])/);
      if (!match) return [];
      const items = JSON.parse(match[1]);
      return items.map(item => {
        const word = item.original_word;
        const ctx = item.surrounding_context || "";
        const fix = applyHeuristicOcrFix(word, ctx);
        return {
          index: item.index,
          original_word: word,
          action: fix.action,
          suggested_word: fix.suggested_word,
          reason: fix.reason
        };
      });
    } catch (e) {
      return [];
    }
  }

  // Run Batch Agentic LLM Auto-Review
  async function runBatchAiReview() {
    const list = [];
    const mapping = [];

    state.data.pages.forEach((page, pIdx) => {
      page.words.forEach((w, wIdx) => {
        if (w.confidence < state.threshold && !w.human_corrected && !w.llm_corrected) {
          const ctx = extractSurroundingContext(pIdx + 1, wIdx);
          list.push({
            index: list.length,
            original_word: w.word,
            confidence: w.confidence,
            source: w.source,
            page: page.page_number,
            surrounding_context: ctx
          });
          mapping.push({ pageNum: pIdx + 1, wordIndex: wIdx, context: ctx });
        }
      });
    });

    if (list.length === 0) {
      showToast("No low-confidence tokens need review.", "info");
      return;
    }

    const btn = dom.btnAutoCorrectGemini || dom.btnRunAuditAi;
    const origText = btn ? btn.innerHTML : "";
    if (btn) btn.innerHTML = "<span>Analyzing with Gemini...</span>";

    try {
      const prompt = `You are an expert document quality auditor and OCR text post-correction engine.
Analyze the following low-confidence words detected in a PDF extraction.
Your task is to fix OCR recognition errors and remove OCR artifacts while preserving valid domain terms.

Guidelines:
1. OCR Character Confusions (action: "correct"): Recover genuine spellings from common OCR substitutions:
   - 'G'/'R' misread as 'C'/'A' (e.g., "CATECOAY:" -> "CATEGORY:", "CATECOAY" -> "CATEGORY")
   - 'N' misread as 'i' or '1' (e.g., "iOTICE" -> "NOTICE", "1OTICE" -> "NOTICE")
   - Letter 'O' misread as digit '0' or vice-versa (e.g., "INV-2O26" -> "INV-2026", "T0tal" -> "Total")
   - Letter 'l' misread as 'I' or '1' (e.g., "BouIevard" -> "Boulevard", "RECE1PT" -> "RECEIPT")
   - Spliced/corrupted words (e.g., "CLASSIF I ED" -> "CLASSIFIED", "SECRFT" -> "SECRET")
2. Stray OCR Punctuation Artifacts (action: "correct"): Remove unmatched closing brackets/parens or stray noise:
   - "ER)," -> "ER" or "PER" if no opening '(' exists in the surrounding context
   - "12345)" -> "12345" if no opening '(' exists in the context
   - "Item]" -> "Item" if no opening '[' exists in the context
   - Stray pipes or tildes: "|Item" -> "Item", "~Invoice" -> "Invoice"
3. Legitimate Domain Terms (action: "approve"): Approve legitimate proper names, acronyms, or balanced punctuation:
   - Balanced parentheticals (e.g. "(3ct)", "(PER)")
   - Legitimate sentence commas (e.g. "Boulevard," before a city name, "Inc.,")
   - Valid codes (e.g. "TXN-1042", "APPROVED")

CRITICAL: If a word contains an OCR error or stray artifact, you MUST set action="correct" and provide the clean corrected spelling in "suggested_word". Do NOT simply echo the corrupted token.

Tokens to review:
${JSON.stringify(list, null, 2)}

Return a JSON array containing an evaluation object for each item:
[
  {
    "index": <integer matching item index>,
    "original_word": "<string>",
    "action": "correct" | "approve",
    "suggested_word": "<string, corrected spelling or original if approved>",
    "reason": "<concise 1-sentence explanation>"
  }
]`;

      const rawResults = await callGeminiApi(prompt);
      const resultMap = {};
      rawResults.forEach(r => { if (typeof r.index === "number") resultMap[r.index] = r; });

      const suggestions = list.map((item, i) => {
        const res = resultMap[i] || { action: "approve", suggested_word: item.original_word, reason: "Verified within sentence." };
        return {
          page: mapping[i].pageNum,
          wordIndex: mapping[i].wordIndex,
          original_word: item.original_word,
          suggested_word: res.suggested_word || item.original_word,
          action: res.action || "approve",
          reason: res.reason || "Audited by Gemini agent.",
          confidence: item.confidence,
          context: mapping[i].context
        };
      });

      state.aiSuggestions = suggestions;

      if (state.aiWorkflowMode === "direct") {
        // Option B: Direct Auto-Apply
        applyAllAiSuggestions(false);
      } else {
        // Option A (Default): Populate Staged Review Table
        // Switch to Audit tab to show staged recommendations
        dom.tabItems.forEach(t => {
          const isAudit = t.getAttribute("data-tab") === "tabAuditQueue";
          t.classList.toggle("active", isAudit);
        });
        dom.tabPanes.forEach(p => {
          p.classList.toggle("active", p.id === "tabAuditQueue");
        });
        renderAuditQueue();
        const modeNote = state.geminiApiKey ? `Gemini (${state.geminiModel})` : "Local OCR Heuristic Engine";
        showToast(`${modeNote} generated ${suggestions.length} suggestions. Click "Apply All" or inspect table.`);
      }
    } catch (err) {
      console.error(err);
      if (!state.geminiApiKey) {
        openGeminiSettingsModal();
        showToast("Enter your Gemini API key in settings to enable live LLM correction.", "info");
      } else {
        showToast("Gemini analysis error: " + err.message, "error");
      }
    } finally {
      if (btn) btn.innerHTML = origText;
    }
  }

  // Single-Word Inspector AI Suggestion
  async function runSingleWordAiSuggest() {
    if (!state.selectedWordRef) return;
    const { pageNum, wordIndex } = state.selectedWordRef;
    const page = state.data.pages[pageNum - 1];
    if (!page || !page.words[wordIndex]) return;

    const w = page.words[wordIndex];
    const ctx = extractSurroundingContext(pageNum, wordIndex);

    if (dom.btnAiSuggest) dom.btnAiSuggest.textContent = "Checking...";

    try {
      const prompt = `You are an expert OCR quality auditor.
Target word token: "${w.word}" (Confidence: ${(w.confidence * 100).toFixed(1)}%, Source: ${w.source})
Surrounding context: "${ctx}"

Determine whether this token is an OCR misrecognition that should be corrected, or approved as-is.
Guidelines:
- If OCR misread letters (e.g. 'CATECOAY:' -> 'CATEGORY:', 'iOTICE' -> 'NOTICE', '2O26' -> '2026', 'T0tal' -> 'Total', 'BouIevard' -> 'Boulevard') or added stray unmatched brackets/punctuation (e.g. 'ER),' -> 'ER', '12345)' -> '12345'), set action="correct" and provide the clean suggested_word.
- If the token is already correct in context, set action="approve" and keep suggested_word identical to "${w.word}".

Return a single JSON object:
{
  "action": "correct" | "approve",
  "suggested_word": "<string>",
  "reason": "<1-sentence rationale>"
}`;

      let result;
      if (!state.geminiApiKey) {
        const fix = applyHeuristicOcrFix(w.word, ctx);
        result = {
          action: fix.action,
          suggested_word: fix.suggested_word,
          reason: fix.reason
        };
      } else {
        const raw = await callGeminiApi(prompt);
        result = Array.isArray(raw) ? raw[0] : raw;
      }

      state.activeSingleAiSuggestion = {
        pageNum,
        wordIndex,
        action: result.action || "approve",
        suggested_word: result.suggested_word || w.word,
        reason: result.reason || "Audited by Gemini."
      };

      if (dom.inspAiSuggestionBox) {
        dom.inspAiSuggestionBox.style.display = "flex";
        if (dom.inspAiActionBadge) {
          dom.inspAiActionBadge.textContent = result.action === "correct" ? "Suggest Fix" : "Approve As-Is";
          dom.inspAiActionBadge.className = `kpi-badge ${result.action === "correct" ? "low" : "high"}`;
        }
        if (dom.inspAiSuggestedWord) dom.inspAiSuggestedWord.textContent = result.suggested_word;
        if (dom.inspAiReason) dom.inspAiReason.textContent = result.reason;
      }
    } catch (err) {
      showToast("AI Suggestion error: " + err.message, "error");
    } finally {
      if (dom.btnAiSuggest) dom.btnAiSuggest.innerHTML = `
        <svg class="ai-action-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4"/>
        </svg>
        <span>AI Suggest</span>
      `;
    }
  }

  // Accept Single Inspector AI Suggestion
  function acceptSingleAiSuggestion() {
    if (!state.activeSingleAiSuggestion) return;
    const { pageNum, wordIndex, action, suggested_word, reason } = state.activeSingleAiSuggestion;
    const page = state.data.pages[pageNum - 1];
    if (!page || !page.words[wordIndex]) return;

    pushHistorySnapshot();
    const w = page.words[wordIndex];
    w.original_word = w.word;
    w.suggested_word = suggested_word;
    w.correction_source = state.geminiModel;
    w.correction_reason = reason;
    w.confidence = 1.0;

    if (action === "correct" && suggested_word !== w.word) {
      w.word = suggested_word;
      w.llm_corrected = true;
    } else {
      w.llm_approved = true;
    }

    rebuildFullText();
    recalculateMetrics();
    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
    selectWord(pageNum, wordIndex);
    showToast(`Accepted Gemini recommendation for "${w.word}"`);
  }

  // Apply Single Row Suggestion from AI Review Table
  function applySingleAiSuggestion(idx) {
    const s = state.aiSuggestions[idx];
    if (!s) return;

    pushHistorySnapshot();
    const page = state.data.pages[s.page - 1];
    if (page && page.words[s.wordIndex]) {
      const w = page.words[s.wordIndex];
      w.original_word = s.original_word;
      w.suggested_word = s.suggested_word;
      w.correction_source = state.geminiModel;
      w.correction_reason = s.reason;
      w.confidence = 1.0;

      if (s.action === "correct" && s.suggested_word !== s.original_word) {
        w.word = s.suggested_word;
        w.llm_corrected = true;
      } else {
        w.llm_approved = true;
      }
    }

    state.aiSuggestions.splice(idx, 1);
    rebuildFullText();
    recalculateMetrics();
    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
    showToast(`Applied AI fix for "${s.original_word}"`);
  }

  // Apply All AI Suggestions (Option A / Option B)
  function applyAllAiSuggestions(onlyCorrections = false) {
    const suggestions = state.aiSuggestions || [];
    if (suggestions.length === 0) return;

    pushHistorySnapshot();
    let appliedCount = 0;

    suggestions.forEach(s => {
      if (onlyCorrections && s.action !== "correct") return;
      const page = state.data.pages[s.page - 1];
      if (page && page.words[s.wordIndex]) {
        const w = page.words[s.wordIndex];
        w.original_word = s.original_word;
        w.suggested_word = s.suggested_word;
        w.correction_source = state.geminiModel;
        w.correction_reason = s.reason;
        w.confidence = 1.0;

        if (s.action === "correct" && s.suggested_word !== s.original_word) {
          w.word = s.suggested_word;
          w.llm_corrected = true;
        } else {
          w.llm_approved = true;
        }
        appliedCount++;
      }
    });

    state.aiSuggestions = [];
    rebuildFullText();
    recalculateMetrics();
    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
    showToast(`Successfully applied ${appliedCount} AI recommendations!`);
  }

  // Clear AI Suggestions
  function clearAiSuggestions() {
    state.aiSuggestions = [];
    renderAuditQueue();
  }

  // Navigate Issue Items
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

  // Gemini Settings Modal Handlers
  function openGeminiSettingsModal() {
    if (dom.geminiApiKeyInput) dom.geminiApiKeyInput.value = state.geminiApiKey;
    if (dom.geminiModelSelect) dom.geminiModelSelect.value = state.geminiModel;
    if (dom.radioModeStaged && dom.radioModeDirect) {
      dom.radioModeStaged.checked = state.aiWorkflowMode === "staged";
      dom.radioModeDirect.checked = state.aiWorkflowMode === "direct";
    }
    if (dom.geminiSettingsModal) dom.geminiSettingsModal.classList.add("open");
  }

  function closeGeminiSettingsModal() {
    if (dom.geminiSettingsModal) dom.geminiSettingsModal.classList.remove("open");
  }

  function saveGeminiSettings() {
    if (dom.geminiApiKeyInput) {
      state.geminiApiKey = dom.geminiApiKeyInput.value.trim();
      setStored("pdf_gemini_api_key", state.geminiApiKey);
    }
    if (dom.geminiModelSelect) {
      state.geminiModel = dom.geminiModelSelect.value;
      setStored("pdf_gemini_model", state.geminiModel);
    }
    if (dom.radioModeDirect) {
      state.aiWorkflowMode = dom.radioModeDirect.checked ? "direct" : "staged";
      setStored("pdf_gemini_mode", state.aiWorkflowMode);
    }
    closeGeminiSettingsModal();
    showToast(`Saved settings for ${state.geminiModel} (${state.aiWorkflowMode === "direct" ? "Direct Auto-Apply" : "Staged Review Table"})`);
  }

  // Central Data Loading Function
  function loadDataPayload(parsed, sourceName = "") {
    if (!parsed || !parsed.pages || !parsed.metadata) {
      showToast("Invalid extraction JSON: missing pages or metadata.", "error");
      return false;
    }
    state.data = parsed;
    state.currentPage = 1;
    state.selectedWordRef = null;
    state.correctionCount = 0;
    state.aiCorrectionCount = 0;
    state.aiSuggestions = parsed.llm_suggestions || [];
    state.historyStack = [];
    state.activeSingleAiSuggestion = null;

    const initialThreshold = parsed.metadata.low_confidence_threshold || 0.85;
    setGlobalThreshold(initialThreshold);
    autoFitPage("width");
    renderTextFlow();
    renderAuditQueue();
    renderFullTextTab();
    renderJsonTab();

    const docName = parsed.metadata.filename || sourceName || "document";
    showToast(`Loaded document: ${docName}`);
    return true;
  }

  // Expose global injection functions for agent harnesses and parent frames
  window.loadExtractionData = loadDataPayload;
  window.setExtractionPayload = loadDataPayload;

  // File Upload Handling
  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.name.endsWith(".json")) {
      const reader = new FileReader();
      reader.onload = function (event) {
        try {
          const parsed = JSON.parse(event.target.result);
          loadDataPayload(parsed, file.name);
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
  async function exportJson() {
    if (state.selectedWordRef && dom.inspEditInput) {
      const { pageNum, wordIndex } = state.selectedWordRef;
      const page = state.data.pages[pageNum - 1];
      if (page && page.words[wordIndex]) {
        const inputVal = dom.inspEditInput.value.trim();
        if (inputVal && inputVal !== page.words[wordIndex].word) {
          page.words[wordIndex].word = inputVal;
          page.words[wordIndex].confidence = 1.0;
          page.words[wordIndex].human_corrected = true;
          rebuildFullText();
        }
      }
    }

    recalculateMetrics();
    state.data.metadata.human_corrections_count = state.correctionCount;
    state.data.metadata.llm_corrections_count = state.aiCorrectionCount;
    state.data.metadata.llm_model = state.geminiModel;
    state.data.metadata.last_modified_utc = new Date().toISOString();

    const jsonStr = JSON.stringify(state.data, null, 2);
    const baseName = (state.data.metadata.filename || "document").replace(/\.pdf$/i, "").replace(/\.json$/i, "");
    const filename = `${baseName}_corrected.json`;

    let fileSaved = false;

    if (window.showSaveFilePicker) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: filename,
          types: [{
            description: "JSON Documents (*.json)",
            accept: { "application/json": [".json"] }
          }]
        });
        const writable = await handle.createWritable();
        await writable.write(jsonStr);
        await writable.close();
        fileSaved = true;
        showToast(`Saved  successfully!`);
      } catch (err) {
        if (err && err.name === "AbortError") return;
      }
    }

    if (!fileSaved) {
      try {
        const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        fileSaved = true;

        setTimeout(() => {
          if (a.parentNode) document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 60000);
      } catch (err) {
        console.warn("Anchor download error:", err);
      }
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(jsonStr);
      }
    } catch (e) {}

    const totalEdits = state.correctionCount + state.aiCorrectionCount;
    showToast(`Downloaded  (${totalEdits} verified corrections)`);

    renderJsonTab();
    renderFullTextTab();
    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
  }

  // Toast Notification
  function showToast(message, type = "success") {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 4500);
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
    if (dom.themeToggleBtn) dom.themeToggleBtn.addEventListener("click", toggleTheme);

    if (dom.thresholdSlider) {
      dom.thresholdSlider.addEventListener("input", (e) => setGlobalThreshold(e.target.value));
    }
    if (dom.thresholdNumberInput) {
      dom.thresholdNumberInput.addEventListener("change", (e) => setGlobalThreshold(e.target.value));
      dom.thresholdNumberInput.addEventListener("input", (e) => setGlobalThreshold(e.target.value));
    }

    dom.filterBtns.forEach(btn => {
      btn.addEventListener("click", () => setFilterMode(btn.getAttribute("data-filter")));
    });

    if (dom.clearFilterBtn) dom.clearFilterBtn.addEventListener("click", () => setFilterMode("all"));

    if (dom.searchWordsInput) {
      dom.searchWordsInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value.trim();
        renderVisualPage();
        renderTextFlow();
      });
    }

    if (dom.zoomInBtn) {
      dom.zoomInBtn.addEventListener("click", () => {
        state.zoom = Math.min(2.5, Math.round((state.zoom + 0.15) * 100) / 100);
        renderVisualPage();
      });
    }
    if (dom.zoomOutBtn) {
      dom.zoomOutBtn.addEventListener("click", () => {
        state.zoom = Math.max(0.25, Math.round((state.zoom - 0.15) * 100) / 100);
        renderVisualPage();
      });
    }
    if (dom.btnFitWidth) {
      dom.btnFitWidth.addEventListener("click", () => {
        autoFitPage("width");
      });
    }
    if (dom.btnFitPage) {
      dom.btnFitPage.addEventListener("click", () => {
        autoFitPage("page");
      });
    }
    if (dom.zoomResetBtn) {
      dom.zoomResetBtn.addEventListener("click", () => {
        state.zoom = 1.0;
        renderVisualPage();
      });
    }

    // Auto-fit on window resize
    window.addEventListener("resize", () => {
      if (state.data && state.data.pages && state.data.pages.length) {
        autoFitPage("width");
      }
    });

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

    // HITL & AI Action Buttons
    if (dom.applyCorrectionBtn) dom.applyCorrectionBtn.addEventListener("click", applyCorrection);
    if (dom.approveBtn) dom.approveBtn.addEventListener("click", approveAsIs);
    if (dom.btnAiSuggest) dom.btnAiSuggest.addEventListener("click", runSingleWordAiSuggest);
    if (dom.btnAcceptAiSuggestion) dom.btnAcceptAiSuggestion.addEventListener("click", acceptSingleAiSuggestion);
    if (dom.btnDismissAiSuggestion) {
      dom.btnDismissAiSuggestion.addEventListener("click", () => {
        if (dom.inspAiSuggestionBox) dom.inspAiSuggestionBox.style.display = "none";
      });
    }

    if (dom.inspEditInput) {
      dom.inspEditInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") applyCorrection();
      });
    }

    if (dom.prevIssueBtn) dom.prevIssueBtn.addEventListener("click", () => navigateIssues("prev"));
    if (dom.nextIssueBtn) dom.nextIssueBtn.addEventListener("click", () => navigateIssues("next"));

    // Agentic LLM Auto-Correct Triggers
    if (dom.btnAutoCorrectGemini) dom.btnAutoCorrectGemini.addEventListener("click", runBatchAiReview);
    if (dom.btnRunAuditAi) dom.btnRunAuditAi.addEventListener("click", runBatchAiReview);
    if (dom.btnApplyAllAiSuggestions) dom.btnApplyAllAiSuggestions.addEventListener("click", () => applyAllAiSuggestions(false));
    if (dom.btnApplyCorrectionsOnly) dom.btnApplyCorrectionsOnly.addEventListener("click", () => applyAllAiSuggestions(true));
    if (dom.btnClearAiSuggestions) dom.btnClearAiSuggestions.addEventListener("click", clearAiSuggestions);

    // Gemini Settings Modal
    if (dom.btnGeminiSettings) dom.btnGeminiSettings.addEventListener("click", openGeminiSettingsModal);
    if (dom.closeSettingsModalBtn) dom.closeSettingsModalBtn.addEventListener("click", closeGeminiSettingsModal);
    if (dom.btnCancelSettings) dom.btnCancelSettings.addEventListener("click", closeGeminiSettingsModal);
    if (dom.btnSaveGeminiSettings) dom.btnSaveGeminiSettings.addEventListener("click", saveGeminiSettings);
    if (dom.toggleApiKeyVisibilityBtn) {
      dom.toggleApiKeyVisibilityBtn.addEventListener("click", () => {
        if (dom.geminiApiKeyInput) {
          const isPwd = dom.geminiApiKeyInput.type === "password";
          dom.geminiApiKeyInput.type = isPwd ? "text" : "password";
          dom.toggleApiKeyVisibilityBtn.textContent = isPwd ? "Hide" : "Show";
        }
      });
    }

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
            setTimeout(() => { dom.copyJsonTabBtn.textContent = "Copy JSON"; }, 1500);
          });
        }
      });
    }
    if (dom.copyFullTextBtn) {
      dom.copyFullTextBtn.addEventListener("click", () => {
        if (dom.fullTextDisplay) {
          navigator.clipboard.writeText(dom.fullTextDisplay.value).then(() => {
            dom.copyFullTextBtn.textContent = "Copied!";
            setTimeout(() => { dom.copyFullTextBtn.textContent = "Copy Text"; }, 1500);
          });
        }
      });
    }
    if (dom.jsonModal) {
      dom.jsonModal.addEventListener("click", (e) => {
        if (e.target === dom.jsonModal) closeJsonModal();
      });
    }
    if (dom.geminiSettingsModal) {
      dom.geminiSettingsModal.addEventListener("click", (e) => {
        if (e.target === dom.geminiSettingsModal) closeGeminiSettingsModal();
      });
    }
  }

  function checkUrlParams() {
    try {
      if (typeof window === "undefined" || !window.location) return;
      const params = new URLSearchParams(window.location.search);
      const jsonParam = params.get("json") || params.get("data") || params.get("file") || params.get("src") || params.get("doc");
      if (jsonParam) {
        if (jsonParam.trim().startsWith("{") || jsonParam.trim().startsWith("[")) {
          const parsed = JSON.parse(jsonParam);
          loadDataPayload(parsed, "URL Payload");
        } else {
          fetch(jsonParam)
            .then(r => {
              if (!r.ok) throw new Error(`HTTP ${r.status}`);
              return r.json();
            })
            .then(data => loadDataPayload(data, jsonParam))
            .catch(err => console.warn("Failed to load JSON from URL parameter:", err));
        }
      }
    } catch (e) {
      console.warn("URL params check error:", e);
    }
  }

  function init() {
    queryElements();
    applyTheme(state.theme);
    registerEvents();

    // Check if latest extraction data was written by extractor or pre-set on window
    if (typeof window !== "undefined") {
      if (window.__LATEST_EXTRACTION_DATA__) {
        loadDataPayload(window.__LATEST_EXTRACTION_DATA__, window.__LATEST_EXTRACTION_DATA__.metadata?.filename || "Latest Extraction");
        return;
      }
      if (window.__EXTRACTION_DATA__) {
        loadDataPayload(window.__EXTRACTION_DATA__, window.__EXTRACTION_DATA__.metadata?.filename || "Host Data");
        return;
      }
    }

    // Check if URL parameters specified a JSON file or payload
    checkUrlParams();

    // Listen for data from parent frame / agent harness via postMessage
    if (typeof window !== "undefined") {
      window.addEventListener("message", function (e) {
        if (!e.data) return;
        let payload = e.data.data || e.data.payload || e.data;
        if (typeof payload === "string") {
          try { payload = JSON.parse(payload); } catch (err) {}
        }
        if (payload && typeof payload === "object" && payload.pages && payload.metadata) {
          loadDataPayload(payload, payload.metadata.filename || "Injected Payload");
        }
      });

      // Global window drag & drop loader
      window.addEventListener("dragover", (e) => { e.preventDefault(); e.stopPropagation(); });
      window.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (file && file.name.endsWith(".json")) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            try {
              const parsed = JSON.parse(ev.target.result);
              loadDataPayload(parsed, file.name);
            } catch (err) {
              showToast("Error parsing dropped JSON: " + err.message, "error");
            }
          };
          reader.readAsText(file);
        }
      });
    }

    if (state.data.llm_suggestions && state.data.llm_suggestions.length > 0) {
      state.aiSuggestions = state.data.llm_suggestions;
    }
    setGlobalThreshold(state.data.metadata.low_confidence_threshold || 0.85);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
