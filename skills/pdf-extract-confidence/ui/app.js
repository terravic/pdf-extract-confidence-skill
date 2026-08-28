/**
 * PDF Word-Level Confidence Extraction - Modern UI Dashboard Application
 *
 * Provides dynamic threshold filtering, visual document coordinate overlays,
 * synchronized text selection, human-in-the-loop editing, and theme switching.
 */

(function () {
  "use strict";

  // Built-in synthetic datasets for immediate interactive preview
  const SAMPLE_DATASETS = {
    invoice: {
      metadata: {
        filename: "sample_digital_invoice.pdf",
        total_pages: 1,
        extraction_engine: "hybrid_extractor",
        timestamp_utc: new Date().toISOString(),
        total_words: 34,
        mean_confidence: 0.9412,
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
          word_count: 34,
          mean_confidence: 0.9412,
          text: "APEX LOGISTICS & CLOUD SERVICES\n100 Enterprise Boulevard, Suite 400 | Metro City, NY 10001\nInvoice Number: INV-2026-8841 Date: 2026-08-28\nItem 1: Cloud Storage Tier 2 $300.00\nItem 2: API Gateway Units $225.00\nTotal Balance Due: $1,244.88\nAuthorized Status: APPROVED",
          words: [
            { word: "APEX", confidence: 1.0, source: "digital", bbox: { x0: 60.0, top: 64.0, x1: 114.5, bottom: 84.0 } },
            { word: "LOGISTICS", confidence: 1.0, source: "digital", bbox: { x0: 120.0, top: 64.0, x1: 227.8, bottom: 84.0 } },
            { word: "&", confidence: 1.0, source: "digital", bbox: { x0: 233.4, top: 64.0, x1: 247.8, bottom: 84.0 } },
            { word: "CLOUD", confidence: 1.0, source: "digital", bbox: { x0: 253.4, top: 64.0, x1: 324.5, bottom: 84.0 } },
            { word: "SERVICES", confidence: 1.0, source: "digital", bbox: { x0: 330.0, top: 64.0, x1: 431.2, bottom: 84.0 } },
            { word: "100", confidence: 1.0, source: "digital", bbox: { x0: 60.0, top: 92.0, x1: 76.7, bottom: 102.0 } },
            { word: "Enterprise", confidence: 1.0, source: "digital", bbox: { x0: 79.5, top: 92.0, x1: 125.0, bottom: 102.0 } },
            { word: "Boulevard,", confidence: 0.74, source: "ocr", bbox: { x0: 127.8, top: 92.0, x1: 175.6, bottom: 102.0 } },
            { word: "Suite", confidence: 1.0, source: "digital", bbox: { x0: 178.4, top: 92.0, x1: 201.2, bottom: 102.0 } },
            { word: "400", confidence: 1.0, source: "digital", bbox: { x0: 204.0, top: 92.0, x1: 220.6, bottom: 102.0 } },
            { word: "|", confidence: 1.0, source: "digital", bbox: { x0: 223.4, top: 92.0, x1: 226.0, bottom: 102.0 } },
            { word: "Metro", confidence: 1.0, source: "digital", bbox: { x0: 228.8, top: 92.0, x1: 254.4, bottom: 102.0 } },
            { word: "City,", confidence: 1.0, source: "digital", bbox: { x0: 257.1, top: 92.0, x1: 277.1, bottom: 102.0 } },
            { word: "NY", confidence: 1.0, source: "digital", bbox: { x0: 279.9, top: 92.0, x1: 293.8, bottom: 102.0 } },
            { word: "10001", confidence: 1.0, source: "digital", bbox: { x0: 296.6, top: 92.0, x1: 324.4, bottom: 102.0 } },
            { word: "Invoice", confidence: 1.0, source: "digital", bbox: { x0: 60.0, top: 137.8, x1: 106.5, bottom: 146.8 } },
            { word: "Number:", confidence: 1.0, source: "digital", bbox: { x0: 109.0, top: 137.8, x1: 143.5, bottom: 146.8 } },
            { word: "INV-2026-8841", confidence: 0.71, source: "ocr", bbox: { x0: 150.0, top: 137.8, x1: 230.0, bottom: 146.8 } },
            { word: "Date:", confidence: 1.0, source: "digital", bbox: { x0: 330.0, top: 137.8, x1: 358.5, bottom: 146.8 } },
            { word: "2026-08-28", confidence: 1.0, source: "digital", bbox: { x0: 365.0, top: 137.8, x1: 425.0, bottom: 146.8 } },
            { word: "Item", confidence: 1.0, source: "digital", bbox: { x0: 60.0, top: 180.0, x1: 85.0, bottom: 190.0 } },
            { word: "1:", confidence: 1.0, source: "digital", bbox: { x0: 88.0, top: 180.0, x1: 98.0, bottom: 190.0 } },
            { word: "Cloud", confidence: 1.0, source: "digital", bbox: { x0: 105.0, top: 180.0, x1: 135.0, bottom: 190.0 } },
            { word: "Storage", confidence: 1.0, source: "digital", bbox: { x0: 140.0, top: 180.0, x1: 180.0, bottom: 190.0 } },
            { word: "Tier", confidence: 1.0, source: "digital", bbox: { x0: 185.0, top: 180.0, x1: 205.0, bottom: 190.0 } },
            { word: "2", confidence: 1.0, source: "digital", bbox: { x0: 210.0, top: 180.0, x1: 218.0, bottom: 190.0 } },
            { word: "$300.00", confidence: 1.0, source: "digital", bbox: { x0: 450.0, top: 180.0, x1: 495.0, bottom: 190.0 } },
            { word: "Item", confidence: 1.0, source: "digital", bbox: { x0: 60.0, top: 205.0, x1: 85.0, bottom: 215.0 } },
            { word: "2:", confidence: 1.0, source: "digital", bbox: { x0: 88.0, top: 205.0, x1: 98.0, bottom: 215.0 } },
            { word: "API", confidence: 1.0, source: "digital", bbox: { x0: 105.0, top: 205.0, x1: 125.0, bottom: 215.0 } },
            { word: "Gateway", confidence: 1.0, source: "digital", bbox: { x0: 130.0, top: 205.0, x1: 175.0, bottom: 215.0 } },
            { word: "Units", confidence: 1.0, source: "digital", bbox: { x0: 180.0, top: 205.0, x1: 205.0, bottom: 215.0 } },
            { word: "$225.00", confidence: 1.0, source: "digital", bbox: { x0: 450.0, top: 205.0, x1: 495.0, bottom: 215.0 } },
            { word: "$1,244.88", confidence: 0.68, source: "ocr", bbox: { x0: 450.0, top: 240.0, x1: 505.0, bottom: 250.0 } }
          ]
        }
      ],
      low_confidence_words: []
    }
  };

  const DEFAULT_DATA = SAMPLE_DATASETS.invoice;

  // Global State
  const state = {
    data: JSON.parse(JSON.stringify(DEFAULT_DATA)),
    currentPage: 1,
    threshold: 0.85,
    filterMode: "all", // "all", "low", "corrected"
    searchQuery: "",
    zoom: 1.0,
    selectedWordRef: null, // { pageNum, wordIndex }
    correctionCount: 0,
    theme: localStorage.getItem("pdf_extractor_theme") || "light"
  };

  // DOM Elements cache
  let dom = {};

  function queryElements() {
    dom = {
      themeToggleBtn: document.getElementById("themeToggleBtn"),
      themeStatusLabel: document.getElementById("themeStatusLabel"),
      thresholdSlider: document.getElementById("thresholdSlider"),
      thresholdBadge: document.getElementById("thresholdBadge"),
      presetChips: document.querySelectorAll(".preset-chip"),
      filterBtns: document.querySelectorAll(".filter-btn"),
      searchWordsInput: document.getElementById("searchWordsInput"),
      kpiFilename: document.getElementById("kpiFilename"),
      kpiTotalWords: document.getElementById("kpiTotalWords"),
      kpiMeanConf: document.getElementById("kpiMeanConf"),
      kpiLowConf: document.getElementById("kpiLowConf"),
      kpiCorrections: document.getElementById("kpiCorrections"),
      zoomInBtn: document.getElementById("zoomInBtn"),
      zoomOutBtn: document.getElementById("zoomOutBtn"),
      zoomResetBtn: document.getElementById("zoomResetBtn"),
      zoomLabel: document.getElementById("zoomLabel"),
      prevPageBtn: document.getElementById("prevPageBtn"),
      nextPageBtn: document.getElementById("nextPageBtn"),
      pageIndicator: document.getElementById("pageIndicator"),
      sheetWrapper: document.getElementById("sheetWrapper"),
      pdfCanvas: document.getElementById("pdfCanvas"),
      overlayContainer: document.getElementById("overlayContainer"),
      tabItems: document.querySelectorAll(".tab-item"),
      tabPanes: document.querySelectorAll(".tab-pane-content"),
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
      loadSampleBtn: document.getElementById("loadSampleBtn"),
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
    localStorage.setItem("pdf_extractor_theme", newTheme);

    if (dom.themeToggleBtn) {
      const isDark = newTheme === "dark";
      dom.themeToggleBtn.setAttribute("aria-label", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
      if (dom.themeStatusLabel) {
        dom.themeStatusLabel.textContent = isDark ? "Light Mode" : "Dark Mode";
      }
    }
  }

  function toggleTheme() {
    applyTheme(state.theme === "dark" ? "light" : "dark");
  }

  // Recalculate Metrics and Low Confidence Items
  function recalculateMetrics() {
    let lowConfCount = 0;
    let sumConfidence = 0;
    let wordCount = 0;
    const lowConfList = [];

    state.data.pages.forEach(page => {
      page.words.forEach((w, idx) => {
        wordCount++;
        sumConfidence += w.confidence;
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

    // Update KPI Card UI
    if (dom.kpiTotalWords) dom.kpiTotalWords.textContent = wordCount;
    if (dom.kpiMeanConf) dom.kpiMeanConf.textContent = (state.data.metadata.mean_confidence * 100).toFixed(1) + "%";
    if (dom.kpiLowConf) dom.kpiLowConf.textContent = lowConfCount;
    if (dom.kpiCorrections) dom.kpiCorrections.textContent = state.correctionCount;
    if (dom.kpiFilename) dom.kpiFilename.textContent = state.data.metadata.filename || "document.pdf";
  }

  // Render Visual Document Page & Overlays
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

    const ctx = dom.pdfCanvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Subtle Grid/Guide
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    // Render Vector Text
    ctx.fillStyle = "#1e293b";
    page.words.forEach(w => {
      const box = w.bbox;
      const fontSize = Math.max(9, (box.bottom - box.top) * 0.85);
      ctx.font = `${fontSize}px Helvetica, Arial, sans-serif`;
      ctx.fillText(w.word, box.x0, box.bottom - 2);
    });

    // Rebuild Bounding Box Overlays
    dom.overlayContainer.innerHTML = "";

    page.words.forEach((w, idx) => {
      // Filter matching
      if (state.filterMode === "low" && w.confidence >= state.threshold) return;
      if (state.filterMode === "corrected" && !w.human_corrected) return;
      if (state.searchQuery && !w.word.toLowerCase().includes(state.searchQuery.toLowerCase())) return;

      const box = w.bbox;
      const boxEl = document.createElement("div");
      boxEl.className = "bbox-box";

      const isLow = w.confidence < state.threshold;
      if (w.human_corrected) {
        boxEl.classList.add("corrected");
      } else if (isLow) {
        boxEl.classList.add("low");
      } else {
        boxEl.classList.add("high");
      }

      const isSelected = state.selectedWordRef && state.selectedWordRef.pageNum === state.currentPage && state.selectedWordRef.wordIndex === idx;
      if (isSelected) {
        boxEl.classList.add("selected");
      }

      boxEl.style.left = box.x0 + "px";
      boxEl.style.top = box.top + "px";
      boxEl.style.width = Math.max(8, box.x1 - box.x0) + "px";
      boxEl.style.height = Math.max(8, box.bottom - box.top) + "px";
      boxEl.title = `${w.word} (${(w.confidence * 100).toFixed(1)}%)`;

      boxEl.addEventListener("click", (e) => {
        e.stopPropagation();
        selectWord(state.currentPage, idx);
      });

      dom.overlayContainer.appendChild(boxEl);
    });

    // Update Pagination
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

    page.words.forEach((w, idx) => {
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

  // Select a Word Token
  function selectWord(pageNum, wordIndex) {
    state.selectedWordRef = { pageNum, wordIndex };
    const page = state.data.pages[pageNum - 1];
    if (!page || !page.words[wordIndex]) return;

    const item = page.words[wordIndex];

    if (dom.inspectorEmpty) dom.inspectorEmpty.style.display = "none";
    if (dom.inspectorCard) dom.inspectorCard.style.display = "block";

    if (dom.inspWordText) dom.inspWordText.textContent = item.word;
    const confScore = (item.confidence * 100).toFixed(1);
    if (dom.inspConfScore) dom.inspConfScore.textContent = `${confScore}%`;

    // Meter bar color and fill
    if (dom.inspMeterFill) {
      dom.inspMeterFill.style.width = `${Math.max(5, confScore)}%`;
      dom.inspMeterFill.style.backgroundColor = item.confidence >= state.threshold ? "var(--status-high-bar)" : "var(--status-low-bar)";
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
    state.correctionCount++;

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

    const item = page.words[wordIndex];
    item.confidence = 1.0;
    item.human_approved = true;

    recalculateMetrics();
    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
    selectWord(pageNum, wordIndex);
  }

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

  // Preset Click Handler
  function setThresholdPreset(val) {
    state.threshold = val;
    if (dom.thresholdSlider) dom.thresholdSlider.value = val;
    if (dom.thresholdBadge) dom.thresholdBadge.textContent = `${Math.round(val * 100)}%`;

    dom.presetChips.forEach(chip => {
      const chipVal = parseFloat(chip.getAttribute("data-val"));
      chip.classList.toggle("active", Math.abs(chipVal - val) < 0.005);
    });

    recalculateMetrics();
    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
  }

  // File Upload Handling
  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!parsed.pages || !parsed.metadata) {
          alert("Invalid extraction JSON format.");
          return;
        }
        state.data = parsed;
        state.currentPage = 1;
        state.selectedWordRef = null;
        state.correctionCount = 0;
        state.threshold = parsed.metadata.low_confidence_threshold || 0.85;

        if (dom.thresholdSlider) dom.thresholdSlider.value = state.threshold;
        if (dom.thresholdBadge) dom.thresholdBadge.textContent = `${Math.round(state.threshold * 100)}%`;

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
    // Theme Switcher
    if (dom.themeToggleBtn) {
      dom.themeToggleBtn.addEventListener("click", toggleTheme);
    }

    // Threshold Slider
    if (dom.thresholdSlider) {
      dom.thresholdSlider.addEventListener("input", (e) => {
        setThresholdPreset(parseFloat(e.target.value));
      });
    }

    // Preset Chips
    dom.presetChips.forEach(chip => {
      chip.addEventListener("click", () => {
        const val = parseFloat(chip.getAttribute("data-val"));
        setThresholdPreset(val);
      });
    });

    // Filter Buttons (All, Low, Corrected)
    dom.filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        dom.filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.filterMode = btn.getAttribute("data-filter");
        renderVisualPage();
      });
    });

    // Search Input
    if (dom.searchWordsInput) {
      dom.searchWordsInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value.trim();
        renderVisualPage();
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

    // File Actions
    if (dom.fileInput) dom.fileInput.addEventListener("change", handleFileSelect);
    if (dom.exportJsonBtn) dom.exportJsonBtn.addEventListener("click", exportJson);
    if (dom.viewJsonBtn) dom.viewJsonBtn.addEventListener("click", openJsonModal);
    if (dom.closeModalBtn) dom.closeModalBtn.addEventListener("click", closeJsonModal);
    if (dom.copyJsonBtn) dom.copyJsonBtn.addEventListener("click", copyJsonToClipboard);
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
    recalculateMetrics();
    renderVisualPage();
    renderTextFlow();
    renderAuditQueue();
  }

  // Guaranteed Execution regardless of readyState
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
