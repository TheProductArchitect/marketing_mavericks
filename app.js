// ============================================================
// Marketing Mavericks – Dashboard App
// ============================================================

// ---- State ----
let currentProducts = [...DB.products];
let overviewChartInstance = null;
let tamChartInstance = null;
let undersoldChartInstance = null;
let activeChartType = "revenue";

// ---- Init ----
document.addEventListener("DOMContentLoaded", () => {
  populateFilterOptions();
  updateOverviewStats();
  renderProducts(currentProducts);
  initOverviewChart("revenue");
  initTAMChart();
  initUndersoldChart();
  bindSearch();
  bindFilters();
  bindChartTabs();
  startLiveClock();
  showToast("📡 Live data loaded — " + DB.products.length + " products analysed", "info");
});

function populateFilterOptions() {
  const categorySelect = document.getElementById("categoryFilter");
  const platformSelect = document.getElementById("platformFilter");

  if (categorySelect && platformSelect) {
    const categories = [...new Set(DB.products.map(p => p.category))].sort();
    const platforms = [...new Set(DB.products.map(p => p.platform))].sort();

    categorySelect.innerHTML = '<option value="all">All Categories</option>' +
      categories.map(c => `<option value="${c}">${c}</option>`).join("");

    platformSelect.innerHTML = '<option value="all">All Platforms</option>' +
      platforms.map(p => `<option value="${p}">${p}</option>`).join("");
  }
}

// ============================================================
// OVERVIEW STATS
// ============================================================
function updateOverviewStats() {
  const products = DB.products;
  const avgUndersold = Math.round(
    products.reduce((s, p) => s + p.undersoldScore, 0) / products.length
  );
  const totalTAM = products.reduce((s, p) => s + p.tam, 0);
  const avgMargin = Math.round(
    products.reduce((s, p) => s + p.margin, 0) / products.length
  );

  document.getElementById("avgUndersold").textContent = avgUndersold;
  document.getElementById("totalProducts").textContent = DB.products.length; // Added
  document.getElementById("totalTAM").textContent = DB.formatCurrency(totalTAM);
  document.getElementById("avgMargin").textContent = avgMargin + "%";
}

// ============================================================
// PRODUCT CARDS
// ============================================================
function renderProducts(products) {
  const grid = document.getElementById("productsGrid");
  const empty = document.getElementById("emptyState");
  const count = document.getElementById("resultsCount");

  count.innerHTML = `Showing <strong>${products.length}</strong> product${products.length !== 1 ? "s" : ""}`;

  if (products.length === 0) {
    grid.innerHTML = "";
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";
  grid.innerHTML = products.map((p, i) => buildProductCard(p, i)).join("");

  // Animate bars after render
  requestAnimationFrame(() => {
    document.querySelectorAll(".progress-fill[data-width]").forEach((el) => {
      el.style.width = el.dataset.width + "%";
    });
  });
}

function buildProductCard(p, index) {
  const rankChangeHtml =
    p.trendingRankChange > 0
      ? `<span class="rank-change up">▲ ${p.trendingRankChange}</span>`
      : p.trendingRankChange < 0
        ? `<span class="rank-change down">▼ ${Math.abs(p.trendingRankChange)}</span>`
        : "";

  const undersoldClass =
    p.undersoldScore >= 85 ? "high" : p.undersoldScore >= 60 ? "medium" : "low";

  const tagsHtml = p.tags
    .map((t) => `<span class="tag ${t}">${formatTag(t)}</span>`)
    .join("");

  const platformsHtml = p.sourcePlatforms
    .map(
      (pl) =>
        `<span class="platform-badge ${pl.toLowerCase().replace(" ", "-")}">${pl}</span>`
    )
    .join("");

  const starsHtml = buildStars(p.rating);

  return `
    <div class="product-card animate-fade-in-up" style="animation-delay:${index * 0.08}s" onclick="goToProduct('${p.id}')">
      <div class="product-card-header">
        <span class="product-emoji">${p.emoji}</span>
        <div class="product-rank-badge">
          <span class="rank-number">#${p.trendingRank}</span>
          <span class="rank-label">Trending</span>
          ${rankChangeHtml}
        </div>
      </div>

      <div class="product-card-body">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-tagline">${p.tagline}</div>

        <div class="product-metrics">
          <div class="metric-item">
            <div class="metric-value">${DB.formatCurrency(p.tam)}</div>
            <div class="metric-label">TAM</div>
          </div>
          <div class="metric-item">
            <div class="metric-value">${p.margin}%</div>
            <div class="metric-label">Margin</div>
          </div>
          <div class="metric-item">
            <div class="metric-value">${DB.formatCurrency(p.monthlyRevenue)}</div>
            <div class="metric-label">Rev/Mo</div>
          </div>
        </div>

        <div class="undersold-section">
          <div class="undersold-header">
            <span class="undersold-label">⭐ Undersold Score</span>
            <span class="undersold-value">${p.undersoldScore}/100</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill ${undersoldClass}" data-width="${p.undersoldScore}" style="width:0%"></div>
          </div>
        </div>

        <div class="rating-display" style="margin-bottom:12px;">
          ${starsHtml}
          <span class="rating-number">${p.rating}★</span>
          <span class="rating-count">(${DB.formatNumber(p.reviewCount)} reviews)</span>
          <span class="trend-badge up" style="margin-left:auto;">+${p.tamGrowthRate}% TAM</span>
        </div>

        <div class="product-tags">${tagsHtml}</div>
      </div>

      <div class="future-trend-outlook" style="padding: 12px 16px; border-top: 1px solid var(--gray-100); background-color: var(--gray-50); font-size: 0.85rem; color: var(--gray-700);">
        <strong>Outlook:</strong> ${p.futureTrendOutlook || 'Moderate growth, stable demand'}
      </div>

      <div class="product-card-footer">
        <div class="platform-badges">${platformsHtml}</div>
        <span class="view-details-btn">View Details →</span>
      </div>
    </div >
        `;
}

function buildStars(rating) {
  let html = '<span class="stars">';
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) html += '<span class="star filled">★</span>';
    else if (rating >= i - 0.5) html += '<span class="star half">★</span>';
    else html += '<span class="star">★</span>';
  }
  html += "</span>";
  return html;
}

function formatTag(tag) {
  const map = {
    viral: "🔥 Viral",
    trending: "📈 Trending",
    "low-competition": "🟢 Low Competition",
    "high-margin": "💰 High Margin",
    aesthetic: "✨ Aesthetic",
    "repeat-purchase": "🔄 Repeat Purchase",
    fitness: "💪 Fitness",
    "eco-friendly": "🌿 Eco-Friendly",
    "loyal-customers": "❤️ Loyal Customers",
  };
  return map[tag] || tag;
}

function goToProduct(id) {
  window.location.href = `product.html ? id = ${id}`;
}

// ============================================================
// SEARCH & FILTERS
// ============================================================
function bindSearch() {
  const input = document.getElementById("searchInput");
  const clear = document.getElementById("searchClear");

  input.addEventListener("input", () => {
    const val = input.value.trim();
    clear.classList.toggle("visible", val.length > 0);
    applyFilters();
  });

  clear.addEventListener("click", () => {
    input.value = "";
    clear.classList.remove("visible");
    applyFilters();
  });
}

function bindFilters() {
  ["sortSelect", "categoryFilter", "platformFilter"].forEach((id) => {
    document.getElementById(id).addEventListener("change", applyFilters);
  });
}

function applyFilters() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const sortVal = document.getElementById("sortSelect").value;
  const category = document.getElementById("categoryFilter").value;
  const platform = document.getElementById("platformFilter").value;

  let filtered = [...DB.products];

  // Search
  if (query) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((t) => t.includes(query))
    );
  }

  // Category filter
  if (category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  // Platform filter
  if (platform !== "all") {
    filtered = filtered.filter((p) => p.platform === platform);
  }

  // Sort
  const [field, dir] = sortVal.split("-");
  filtered.sort((a, b) => {
    if (dir === "asc") return a[field] - b[field];
    return b[field] - a[field];
  });

  currentProducts = filtered;
  renderProducts(filtered);
  // Re-render chart with new filtered data (max 5 lines for readability)
  initOverviewChart(activeChartType);
  initTAMChart();
  initUndersoldChart();
}

// ============================================================
// OVERVIEW CHART
// ============================================================
function initOverviewChart(type) {
  const ctx = document.getElementById("overviewChart").getContext("2d");

  if (overviewChartInstance) {
    overviewChartInstance.destroy();
  }

  const labels = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  // Aggregate historical + projections
  const displayProducts = currentProducts.slice(0, 5); // Limit to top 5 for readability
  const colors = ["#2563b0", "#f5c518", "#22c55e", "#f97316", "#8b5cf6", "#ec4899", "#14b8a6"];

  const datasets = displayProducts.map((p, i) => {
    const color = colors[i % colors.length];
    const historical = p.historicalData[type === "revenue" ? "revenue" : type === "search" ? "searchVolume" : "revenue"];
    const projected = p.projections[type === "revenue" ? "revenue" : type === "search" ? "searchVolume" : "tamGrowth"];

    const allData = [...historical, ...projected];

    return {
      label: p.name,
      data: allData,
      borderColor: color,
      backgroundColor: color + "18",
      borderWidth: 2.5,
      pointRadius: 3,
      pointHoverRadius: 6,
      tension: 0.4,
      fill: false,
    };
  });

  // Add projection zone shading
  const projectionPlugin = {
    id: "projectionZone",
    beforeDraw(chart) {
      const { ctx, chartArea, scales } = chart;
      if (!chartArea) return;
      const xScale = scales.x;
      const splitIndex = 5; // After Feb (index 5)
      const x = xScale.getPixelForValue(splitIndex + 0.5);
      ctx.save();
      ctx.fillStyle = "rgba(37,99,176,0.04)";
      ctx.fillRect(x, chartArea.top, chartArea.right - x, chartArea.bottom - chartArea.top);
      ctx.strokeStyle = "rgba(37,99,176,0.2)";
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, chartArea.top);
      ctx.lineTo(x, chartArea.bottom);
      ctx.stroke();
      ctx.restore();

      // Label
      ctx.save();
      ctx.fillStyle = "rgba(37,99,176,0.5)";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText("← Historical  |  Projected →", x - 100, chartArea.top + 16);
      ctx.restore();
    },
  };

  overviewChartInstance = new Chart(ctx, {
    type: "line",
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: { family: "Inter", size: 12, weight: "600" },
            color: "#475569",
            usePointStyle: true,
            pointStyleWidth: 8,
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: "#0a1628",
          titleColor: "#93c5fd",
          bodyColor: "#e2e8f0",
          borderColor: "#1a3a6b",
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label(ctx) {
              const val = ctx.parsed.y;
              if (type === "tam") return ` ${ctx.dataset.label}: $${val.toFixed(1)}B`;
              if (type === "search") return ` ${ctx.dataset.label}: ${DB.formatNumber(val)}`;
              return ` ${ctx.dataset.label}: ${DB.formatCurrency(val)}`;
            },
          },
        },
      },
      scales: {
        x: {
          display: false,
          grid: { display: false },
        },
        y: {
          display: false,
          grid: { display: false },
          ticks: {
            font: { family: "Inter", size: 11 },
            color: "#94a3b8",
            callback(val) {
              if (type === "tam") return "$" + val.toFixed(1) + "B";
              if (type === "search") return DB.formatNumber(val);
              return DB.formatCurrency(val);
            },
          }
        },
      },
    },
    plugins: [projectionPlugin],
  });
}

function bindChartTabs() {
  document.querySelectorAll("#overviewChartTabs .chart-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll("#overviewChartTabs .chart-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      activeChartType = tab.dataset.chart;
      initOverviewChart(activeChartType);
    });
  });
}

// ============================================================
// TAM CHART
// ============================================================
function initTAMChart() {
  const ctx = document.getElementById("tamChart").getContext("2d");

  if (tamChartInstance) {
    tamChartInstance.destroy();
  }

  const displayProducts = currentProducts.slice(0, 5);
  const labels = displayProducts.map((p) => p.name);
  const tamValues = displayProducts.map((p) => p.tam / 1e9);
  const growthRates = displayProducts.map((p) => p.tamGrowthRate);

  tamChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "TAM ($ Billions)",
          data: tamValues,
          backgroundColor: ["#2563b0cc", "#f5c518cc", "#22c55ecc", "#f97316cc", "#8b5cf6cc"],
          borderColor: ["#2563b0", "#f5c518", "#22c55e", "#f97316", "#8b5cf6"],
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
          yAxisID: "y",
        },
        {
          label: "YoY Growth Rate (%)",
          data: growthRates,
          type: "line",
          borderColor: "#1e4d8c",
          backgroundColor: "rgba(30,77,140,0.1)",
          borderWidth: 2.5,
          pointRadius: 6,
          pointBackgroundColor: "#1e4d8c",
          tension: 0.4,
          yAxisID: "y2",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: { family: "Inter", size: 12, weight: "600" },
            color: "#475569",
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: "#0a1628",
          titleColor: "#93c5fd",
          bodyColor: "#e2e8f0",
          borderColor: "#1a3a6b",
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label(ctx) {
              if (ctx.datasetIndex === 0)
                return ` TAM: $${ctx.parsed.y.toFixed(1)}B`;
              return ` Growth: ${ctx.parsed.y} % YoY`;
            },
          },
        },
      },
      scales: {
        x: {
          display: false,
          grid: { display: false },
        },
        y: {
          display: false,
          grid: { display: false },
          ticks: {
            font: { family: "Inter", size: 11 },
            color: "#94a3b8",
            callback: (v) => "$" + v.toFixed(1) + "B",
          },
          title: {
            display: true,
            text: "TAM ($ Billions)",
            font: { family: "Inter", size: 11 },
            color: "#94a3b8",
          },
        },
        y2: {
          display: false,
          grid: { display: false },
        },
      },
    },
  });
}

// ============================================================
// UNDERSOLD RATINGS CHART
// ============================================================
function initUndersoldChart() {
  const ctx = document.getElementById("undersoldChart").getContext("2d");

  if (undersoldChartInstance) {
    undersoldChartInstance.destroy();
  }

  const displayProducts = currentProducts.slice(0, 5);
  const labels = displayProducts.map((p) => p.name);
  const actual = displayProducts.map((p) => p.rating);
  const expected = displayProducts.map((p) => p.expectedRating);
  const scores = displayProducts.map((p) => p.undersoldScore);

  undersoldChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Actual Rating",
          data: actual,
          backgroundColor: "#2563b0cc",
          borderColor: "#2563b0",
          borderWidth: 2,
          borderRadius: 6,
          borderSkipped: false,
          yAxisID: "y",
        },
        {
          label: "Expected Rating",
          data: expected,
          backgroundColor: "#f5c518cc",
          borderColor: "#f5c518",
          borderWidth: 2,
          borderRadius: 6,
          borderSkipped: false,
          yAxisID: "y",
        },
        {
          label: "Undersold Score",
          data: scores,
          type: "line",
          borderColor: "#22c55e",
          backgroundColor: "rgba(34,197,94,0.1)",
          borderWidth: 2.5,
          pointRadius: 6,
          pointBackgroundColor: "#22c55e",
          tension: 0.4,
          yAxisID: "y2",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: { family: "Inter", size: 12, weight: "600" },
            color: "#475569",
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: "#0a1628",
          titleColor: "#93c5fd",
          bodyColor: "#e2e8f0",
          borderColor: "#1a3a6b",
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label(ctx) {
              if (ctx.datasetIndex === 0)
                return ` Actual: ${ctx.parsed.y}★`;
              if (ctx.datasetIndex === 1)
                return ` Expected: ${ctx.parsed.y}★`;
              return ` Undersold Score: ${ctx.parsed.y} / 100`;
            },
          },
        },
      },
      scales: {
        x: {
          display: false,
          grid: { display: false },
        },
        y: {
          display: false,
          grid: { display: false },
          ticks: {
            font: { family: "Inter", size: 11 },
            color: "#94a3b8",
            callback: (v) => v + "★",
          },
          title: {
            display: true,
            text: "Star Rating",
            font: { family: "Inter", size: 11 },
            color: "#94a3b8",
          },
        },
        y2: {
          display: false,
          grid: { display: false },
        },
      },
    },
  });
}

// ============================================================
// LIVE CLOCK
// ============================================================
function startLiveClock() {
  const el = document.getElementById("statFreshness");
  let mins = 4;
  setInterval(() => {
    mins++;
    el.textContent = `Updated ${mins} min ago`;
  }, 60000);
}

// ============================================================
// TOAST
// ============================================================
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(20px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ============================================================
// PRODUCT COMPARISON SECTION
// ============================================================
function populateCompareOptions() {
  const selects = ['compareSelect1', 'compareSelect2', 'compareSelect3'];

  selects.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    // Keep first option
    const firstOp = el.options[0];
    el.innerHTML = '';
    el.appendChild(firstOp);

    // Sort alphabetically for ease of finding
    const sorted = [...DB.products].sort((a, b) => a.name.localeCompare(b.name));

    sorted.forEach(p => {
      const op = document.createElement('option');
      op.value = p.id;
      op.textContent = `${p.emoji} ${p.name}`;
      el.appendChild(op);
    });
  });
}

window.renderComparison = function () {
  const container = document.getElementById('comparisonContainer');
  if (!container) return;

  const id1 = document.getElementById('compareSelect1').value;
  const id2 = document.getElementById('compareSelect2').value;
  const id3 = document.getElementById('compareSelect3').value;

  const selectedIds = [id1, id2, id3].filter(id => id !== "");

  if (selectedIds.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--gray-400); grid-column: 1 / -1;">Select at least one product above to begin comparison</div>`;
    return;
  }

  const selectedProducts = selectedIds.map(id => DB.products.find(p => p.id === id));

  container.innerHTML = selectedProducts.map(p => `
    <div style="background: var(--white); border: 1px solid var(--gray-200); border-radius: var(--radius-md); padding: 20px;">
      <div style="display:flex; align-items:center; gap: 12px; margin-bottom: 16px;">
        <span style="font-size: 2rem;">${p.emoji}</span>
        <div>
          <h4 style="margin: 0; font-size: 1.1rem; color: var(--gray-800);">${p.name}</h4>
          <span style="font-size: 0.8rem; color: var(--gray-500);">${p.category}</span>
        </div>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display:flex; justify-content:space-between; border-bottom: 1px solid var(--gray-100); padding-bottom: 8px;">
          <span style="color: var(--gray-500); font-size: 0.85rem;">Sell Price</span>
          <span style="font-weight: 600; color: var(--gray-800);">${DB.formatCurrency(p.price)}</span>
        </div>
        <div style="display:flex; justify-content:space-between; border-bottom: 1px solid var(--gray-100); padding-bottom: 8px;">
          <span style="color: var(--gray-500); font-size: 0.85rem;">Gross Margin</span>
          <span style="font-weight: 600; color: var(--green-600);">${p.margin}%</span>
        </div>
        <div style="display:flex; justify-content:space-between; border-bottom: 1px solid var(--gray-100); padding-bottom: 8px;">
          <span style="color: var(--gray-500); font-size: 0.85rem;">TAM</span>
          <span style="font-weight: 600; color: var(--blue-600);">${DB.formatCurrency(p.tam)}</span>
        </div>
        <div style="display:flex; justify-content:space-between; border-bottom: 1px solid var(--gray-100); padding-bottom: 8px;">
          <span style="color: var(--gray-500); font-size: 0.85rem;">Opportunity Score</span>
          <span style="font-weight: 600; color: var(--orange-600);">${p.undersoldScore}/100</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding-bottom: 8px;">
          <span style="color: var(--gray-500); font-size: 0.85rem;">Competition</span>
          <span style="font-weight: 600; color: var(--gray-800);">${p.competition}</span>
        </div>
      </div>
      
      <button onclick="goToProduct('${p.id}')" class="cta-btn-secondary" style="width: 100%; margin-top: 20px; text-align: center;">View Full Details</button>
    </div>
  `).join('');
};
