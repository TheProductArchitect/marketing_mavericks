// ============================================================
// Marketing Mavericks – Product Detail Page
// ============================================================

let productChartInstance = null;
let activeChartType = "revenue";
let product = null;

// ---- Init ----
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    window.location.href = "index.html";
    return;
  }

  product = DB.getProduct(id);

  if (!product) {
    window.location.href = "index.html";
    return;
  }

  // Update page title
  document.title = `${product.name} – Marketing Mavericks`;

  // Render all sections
  renderHero();
  renderKeyMetrics();
  renderUndersoldSection();
  renderProductChart("revenue");
  renderTAM();
  renderProjectionTable();
  renderInsights();
  renderReviews();
  renderOpportunityScore();
  renderQuickStats();
  renderSocialStats();
  renderPricingBox();
  renderDataSources();
  bindChartTabs();

  showToast(`📊 ${product.name} — data loaded`, "info");
});

// ============================================================
// HERO
// ============================================================
function renderHero() {
  const rankChangeHtml =
    product.trendingRankChange > 0
      ? `<span class="trend-badge up" style="margin-left:8px;">▲ ${product.trendingRankChange} this week</span>`
      : product.trendingRankChange < 0
      ? `<span class="trend-badge down" style="margin-left:8px;">▼ ${Math.abs(product.trendingRankChange)} this week</span>`
      : "";

  const platformsHtml = product.sourcePlatforms
    .map(
      (pl) =>
        `<span class="platform-badge ${pl.toLowerCase().replace(" ", "-")}">${pl}</span>`
    )
    .join("");

  document.getElementById("productHeader").innerHTML = `
    <span class="product-detail-emoji">${product.emoji}</span>
    <div class="product-detail-info">
      <div class="product-detail-category">${product.category}</div>
      <h1 class="product-detail-name">${product.name}</h1>
      <p class="product-detail-tagline">${product.tagline}</p>
      <div class="product-detail-meta">
        <div class="detail-meta-item">
          <span>🏆</span>
          <span>Trending Rank <strong>#${product.trendingRank}</strong>${rankChangeHtml}</span>
        </div>
        <div class="detail-meta-item">
          <span>⭐</span>
          <span><strong>${product.rating}★</strong> / ${product.expectedRating}★ expected</span>
        </div>
        <div class="detail-meta-item">
          <span>💰</span>
          <span>$${product.price} retail · <strong>${product.margin}% margin</strong></span>
        </div>
        <div style="display:flex;gap:4px;flex-wrap:wrap;">${platformsHtml}</div>
      </div>
    </div>
    <div class="product-detail-actions">
      <button class="btn-primary" onclick="showToast('✅ Added to your watchlist!', 'success')">
        ⭐ Add to Watchlist
      </button>
      <button class="btn-secondary" onclick="showToast('📋 Report copied to clipboard!', 'success')">
        📋 Export Report
      </button>
    </div>
  `;
}

// ============================================================
// KEY METRICS
// ============================================================
function renderKeyMetrics() {
  document.getElementById("trendBadge").textContent =
    `+${product.tamGrowthRate}% TAM Growth`;

  const metrics = [
    {
      icon: "💰",
      value: DB.formatCurrency(product.tam),
      label: "Total Addressable Market",
      sub: `+${product.tamGrowthRate}% YoY`,
    },
    {
      icon: "📈",
      value: `#${product.trendingRank}`,
      label: "Trending Rank",
      sub: `Amazon #${product.amazonRank}`,
    },
    {
      icon: "⭐",
      value: `${product.undersoldScore}/100`,
      label: "Undersold Score",
      sub: "Higher = more opportunity",
    },
    {
      icon: "🔍",
      value: DB.formatNumber(product.searchVolume),
      label: "Monthly Searches",
      sub: "Google + Amazon combined",
    },
    {
      icon: "💵",
      value: DB.formatCurrency(product.monthlyRevenue),
      label: "Est. Monthly Revenue",
      sub: `${product.margin}% gross margin`,
    },
    {
      icon: "🌊",
      value: `${product.saturation}%`,
      label: "Market Saturation",
      sub: `${product.competition} competition`,
    },
  ];

  document.getElementById("keyMetricsGrid").innerHTML = metrics
    .map(
      (m) => `
    <div class="key-metric-card">
      <div class="key-metric-icon">${m.icon}</div>
      <div class="key-metric-value">${m.value}</div>
      <div class="key-metric-label">${m.label}</div>
      <div class="key-metric-sub">${m.sub}</div>
    </div>
  `
    )
    .join("");
}

// ============================================================
// UNDERSOLD SECTION
// ============================================================
function renderUndersoldSection() {
  const gap = (product.expectedRating - product.rating).toFixed(1);
  const circumference = 339.3;
  const offset = circumference - (product.undersoldScore / 100) * circumference;

  // Gauge color based on score
  const gaugeColor =
    product.undersoldScore >= 85
      ? "#2563b0"
      : product.undersoldScore >= 60
      ? "#f5c518"
      : "#94a3b8";

  document.getElementById("ratingGapBadge").innerHTML =
    `⚠️ ${gap}★ Rating Gap`;

  // Animate gauge
  const gaugeFill = document.getElementById("gaugeFill");
  gaugeFill.style.stroke = gaugeColor;
  setTimeout(() => {
    gaugeFill.style.strokeDashoffset = offset;
    gaugeFill.style.transition = "stroke-dashoffset 1.5s ease";
  }, 200);

  // Animate counter
  const gaugeValueEl = document.getElementById("gaugeValue");
  animateCounter(gaugeValueEl, 0, product.undersoldScore, 1500);

  // Rating comparison
  document.getElementById("ratingComparison").innerHTML = `
    <div class="rating-box">
      <div class="rating-box-value actual">${product.rating}★</div>
      <div class="rating-box-label">Actual Rating</div>
    </div>
    <div class="rating-arrow">→</div>
    <div class="rating-box">
      <div class="rating-box-value expected">${product.expectedRating}★</div>
      <div class="rating-box-label">Expected Rating</div>
    </div>
    <div class="rating-box">
      <div class="rating-box-value" style="color:var(--orange-500);">-${gap}★</div>
      <div class="rating-box-label">Gap</div>
    </div>
  `;

  document.getElementById("undersoldInsight").innerHTML = `
    <strong>What this means for you:</strong> This product is rated <strong>${gap} stars below</strong> 
    what customers expect in this category. This gap signals that current sellers are underdelivering — 
    creating a clear opportunity for a dropshipper who sources a higher-quality version or improves 
    the customer experience. Products with gaps above 0.4★ typically see <strong>2–3× higher conversion rates</strong> 
    when positioned correctly.
  `;
}

// ============================================================
// PRODUCT CHART
// ============================================================
function renderProductChart(type) {
  const ctx = document.getElementById("productChart").getContext("2d");

  if (productChartInstance) {
    productChartInstance.destroy();
  }

  const labels = [
    ...product.historicalData.labels,
    ...product.projections.labels,
  ];

  let historicalData, projectedData, yLabel, formatFn;

  if (type === "revenue") {
    historicalData = product.historicalData.revenue;
    projectedData = product.projections.revenue;
    yLabel = "Revenue ($)";
    formatFn = (v) => DB.formatCurrency(v);
  } else if (type === "search") {
    historicalData = product.historicalData.searchVolume;
    projectedData = product.projections.searchVolume;
    yLabel = "Search Volume";
    formatFn = (v) => DB.formatNumber(v);
  } else {
    // TAM growth
    historicalData = product.historicalData.revenue.map(
      (_, i) =>
        product.tam / 1e9 -
        (product.projections.tamGrowth[0] - product.historicalData.revenue[i] / product.historicalData.revenue[5]) * 0.3
    );
    projectedData = product.projections.tamGrowth;
    yLabel = "TAM ($ Billions)";
    formatFn = (v) => "$" + v.toFixed(2) + "B";
  }

  const allData = [...historicalData, ...projectedData];
  const splitIndex = historicalData.length - 1;

  // Build two datasets: historical (solid) + projected (dashed)
  const historicalPoints = allData.map((v, i) => (i <= splitIndex ? v : null));
  const projectedPoints = allData.map((v, i) =>
    i >= splitIndex ? v : null
  );

  const projectionPlugin = {
    id: "projectionZone",
    beforeDraw(chart) {
      const { ctx, chartArea, scales } = chart;
      if (!chartArea) return;
      const xScale = scales.x;
      const x = xScale.getPixelForValue(splitIndex + 0.5);
      ctx.save();
      ctx.fillStyle = "rgba(37,99,176,0.04)";
      ctx.fillRect(x, chartArea.top, chartArea.right - x, chartArea.bottom - chartArea.top);
      ctx.strokeStyle = "rgba(37,99,176,0.25)";
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, chartArea.top);
      ctx.lineTo(x, chartArea.bottom);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.fillStyle = "rgba(37,99,176,0.45)";
      ctx.font = "bold 11px Inter, sans-serif";
      ctx.fillText("Historical", chartArea.left + 12, chartArea.top + 18);
      ctx.fillText("Projected →", x + 8, chartArea.top + 18);
      ctx.restore();
    },
  };

  productChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Historical",
          data: historicalPoints,
          borderColor: "#2563b0",
          backgroundColor: "rgba(37,99,176,0.08)",
          borderWidth: 3,
          pointRadius: 5,
          pointBackgroundColor: "#2563b0",
          pointHoverRadius: 8,
          tension: 0.4,
          fill: true,
          spanGaps: false,
        },
        {
          label: "Projected",
          data: projectedPoints,
          borderColor: "#f5c518",
          backgroundColor: "rgba(245,197,24,0.08)",
          borderWidth: 3,
          borderDash: [6, 4],
          segment: { borderDash: () => [6, 4] },
          pointRadius: 5,
          pointBackgroundColor: "#f5c518",
          pointHoverRadius: 8,
          tension: 0.4,
          fill: true,
          spanGaps: false,
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
              if (ctx.parsed.y === null) return null;
              return ` ${ctx.dataset.label}: ${formatFn(ctx.parsed.y)}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { color: "#f1f5f9" },
          ticks: { font: { family: "Inter", size: 11 }, color: "#94a3b8" },
        },
        y: {
          grid: { color: "#f1f5f9" },
          ticks: {
            font: { family: "Inter", size: 11 },
            color: "#94a3b8",
            callback: (v) => formatFn(v),
          },
          title: {
            display: true,
            text: yLabel,
            font: { family: "Inter", size: 11 },
            color: "#94a3b8",
          },
        },
      },
    },
    plugins: [projectionPlugin],
  });
}

function bindChartTabs() {
  document.querySelectorAll("#productChartTabs .chart-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll("#productChartTabs .chart-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      activeChartType = tab.dataset.chart;
      renderProductChart(activeChartType);
    });
  });
}

// ============================================================
// TAM
// ============================================================
function renderTAM() {
  const samValue = product.tam * 0.35;
  const somValue = product.tam * 0.08;

  document.getElementById("tamDisplay").innerHTML = `
    <div class="tam-main">
      <div class="tam-value">${DB.formatCurrency(product.tam)}</div>
      <div class="tam-label">Total Addressable Market (TAM) · ${product.category}</div>
    </div>
    <div class="tam-growth">
      <div class="tam-growth-value">+${product.tamGrowthRate}%</div>
      <div class="tam-growth-label">YoY Growth</div>
    </div>
  `;

  document.getElementById("tamBreakdown").innerHTML = `
    <div class="tam-segment">
      <div class="tam-segment-value">${DB.formatCurrency(product.tam)}</div>
      <div class="tam-segment-label">TAM — Total Market</div>
    </div>
    <div class="tam-segment">
      <div class="tam-segment-value">${DB.formatCurrency(samValue)}</div>
      <div class="tam-segment-label">SAM — Serviceable</div>
    </div>
    <div class="tam-segment">
      <div class="tam-segment-value">${DB.formatCurrency(somValue)}</div>
      <div class="tam-segment-label">SOM — Obtainable</div>
    </div>
  `;
}

// ============================================================
// PROJECTION TABLE
// ============================================================
function renderProjectionTable() {
  const labels = product.projections.labels;
  const revenues = product.projections.revenue;
  const searchVols = product.projections.searchVolume;
  const tamGrowths = product.projections.tamGrowth;

  const baseRevenue = product.historicalData.revenue[product.historicalData.revenue.length - 1];

  let rows = "";
  labels.forEach((month, i) => {
    const rev = revenues[i];
    const growth = (((rev - baseRevenue) / baseRevenue) * 100).toFixed(1);
    const profit = Math.round(rev * (product.margin / 100));

    rows += `
      <tr>
        <td><strong>${month} 2026</strong></td>
        <td>${DB.formatCurrency(rev)}</td>
        <td>${DB.formatCurrency(profit)}</td>
        <td>${DB.formatNumber(searchVols[i])}</td>
        <td>$${tamGrowths[i].toFixed(1)}B</td>
        <td><span class="proj-growth">+${growth}%</span></td>
      </tr>
    `;
  });

  document.getElementById("projectionTable").innerHTML = `
    <thead>
      <tr>
        <th>Month</th>
        <th>Est. Revenue</th>
        <th>Est. Profit</th>
        <th>Search Volume</th>
        <th>TAM Size</th>
        <th>Rev Growth</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  `;
}

// ============================================================
// INSIGHTS
// ============================================================
function renderInsights() {
  const icons = ["🔍", "📱", "🌊", "💡"];
  document.getElementById("insightsList").innerHTML = product.insights
    .map(
      (insight, i) => `
    <div class="insight-item">
      <span class="insight-icon">${icons[i % icons.length]}</span>
      <span class="insight-text">${insight}</span>
    </div>
  `
    )
    .join("");
}

// ============================================================
// REVIEWS
// ============================================================
function renderReviews() {
  document.getElementById("reviewsList").innerHTML = product.reviews
    .map(
      (r) => `
    <div class="review-item">
      <div class="review-header">
        <span class="review-author">${r.author}</span>
        <div class="review-meta">
          ${buildStars(r.rating)}
          <span class="review-date">${r.date}</span>
          <span class="platform-badge ${r.platform.toLowerCase()}">${r.platform}</span>
        </div>
      </div>
      <p class="review-text">"${r.text}"</p>
    </div>
  `
    )
    .join("");
}

// ============================================================
// OPPORTUNITY SCORE (sidebar)
// ============================================================
function renderOpportunityScore() {
  // Composite score: undersold + virality + (100 - saturation) + (100 - competitionScore)
  const raw =
    product.undersoldScore * 0.35 +
    product.viralityScore * 0.25 +
    (100 - product.saturation) * 0.2 +
    (100 - product.competitionScore) * 0.2;
  const score = Math.round(raw);

  const circumference = 2 * Math.PI * 32; // r=32
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 80 ? "#2563b0" : score >= 60 ? "#f5c518" : "#94a3b8";

  const label =
    score >= 85
      ? "Exceptional"
      : score >= 70
      ? "Strong"
      : score >= 55
      ? "Moderate"
      : "Developing";

  document.getElementById("opportunityRing").innerHTML = `
    <div class="ring-chart">
      <svg class="ring-svg" viewBox="0 0 80 80">
        <circle class="ring-bg" cx="40" cy="40" r="32" />
        <circle class="ring-fill" cx="40" cy="40" r="32"
          stroke="${color}"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${circumference}"
          id="opportunityRingFill" />
      </svg>
      <div class="ring-text">${score}</div>
    </div>
    <div class="ring-info">
      <div class="ring-title">${label} Opportunity</div>
      <div class="ring-sub">
        Composite score based on undersold rating, virality, market saturation, and competition level.
      </div>
    </div>
  `;

  // Animate ring
  setTimeout(() => {
    const fill = document.getElementById("opportunityRingFill");
    if (fill) {
      fill.style.strokeDashoffset = offset;
      fill.style.transition = "stroke-dashoffset 1.5s ease";
    }
  }, 300);
}

// ============================================================
// QUICK STATS (sidebar)
// ============================================================
function renderQuickStats() {
  const stats = [
    { label: "Sell Price", value: `$${product.price}` },
    { label: "Cost Price", value: `$${product.costPrice}` },
    { label: "Gross Margin", value: `${product.margin}%` },
    { label: "Amazon Rank", value: `#${product.amazonRank}` },
    { label: "Review Count", value: DB.formatNumber(product.reviewCount) },
    { label: "Market Saturation", value: `${product.saturation}%` },
  ];

  document.getElementById("quickStats").innerHTML = stats
    .map(
      (s) => `
    <div class="sidebar-metric">
      <span class="sidebar-metric-label">${s.label}</span>
      <span class="sidebar-metric-value">${s.value}</span>
    </div>
  `
    )
    .join("");

  // Competition meter
  const compClass = product.competition.toLowerCase();
  document.getElementById("competitionMeter").innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
      <span class="sidebar-metric-label">Competition Level</span>
      <span class="sidebar-metric-value" style="color:${
        compClass === "low"
          ? "var(--green-500)"
          : compClass === "medium"
          ? "var(--yellow-500)"
          : "var(--red-500)"
      }">${product.competition}</span>
    </div>
    <div class="competition-bar">
      <div class="competition-fill ${compClass}" style="width:${product.competitionScore}%;transition:width 1s ease;"></div>
    </div>
  `;

  // Virality score
  document.getElementById("viralityScore").innerHTML = `
    <div class="virality-number">${product.viralityScore}</div>
    <div class="virality-info">
      <div class="virality-label">Virality Score</div>
      <div class="virality-sub">Based on social mentions, TikTok views &amp; share velocity</div>
    </div>
  `;
}

// ============================================================
// SOCIAL STATS (sidebar)
// ============================================================
function renderSocialStats() {
  const stats = [
    { value: DB.formatNumber(product.tiktokViews), label: "TikTok Views" },
    { value: DB.formatNumber(product.socialMentions), label: "Social Mentions" },
    { value: DB.formatNumber(product.searchVolume), label: "Monthly Searches" },
    { value: `#${product.amazonRank}`, label: "Amazon BSR" },
  ];

  document.getElementById("socialStats").innerHTML = stats
    .map(
      (s) => `
    <div class="social-stat-item">
      <div class="social-stat-value">${s.value}</div>
      <div class="social-stat-label">${s.label}</div>
    </div>
  `
    )
    .join("");
}

// ============================================================
// PRICING BOX (sidebar)
// ============================================================
function renderPricingBox() {
  const monthlyProfit = Math.round(
    product.monthlyRevenue * (product.margin / 100)
  );

  document.getElementById("pricingBox").innerHTML = `
    <div class="highlight-box-title">💰 Profit Potential</div>
    <div class="highlight-box-value">${DB.formatCurrency(monthlyProfit)}</div>
    <div class="highlight-box-sub">Estimated monthly profit at ${product.margin}% margin</div>
    <div style="margin-top:16px;display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <div>
        <div style="font-size:1.1rem;font-weight:800;color:var(--white);">$${product.price}</div>
        <div style="font-size:0.7rem;color:var(--blue-200);margin-top:2px;">Sell Price</div>
      </div>
      <div>
        <div style="font-size:1.1rem;font-weight:800;color:var(--yellow-400);">$${product.costPrice}</div>
        <div style="font-size:0.7rem;color:var(--blue-200);margin-top:2px;">Cost Price</div>
      </div>
    </div>
  `;
}

// ============================================================
// DATA SOURCES (sidebar)
// ============================================================
function renderDataSources() {
  const sourceIcons = {
    Amazon: "📦",
    TikTok: "🎵",
    Instagram: "📸",
    YouTube: "▶️",
    Reddit: "🔴",
    "Google Trends": "🔍",
  };

  document.getElementById("dataSources").innerHTML = product.sourcePlatforms
    .map(
      (pl) => `
    <div class="sidebar-metric">
      <span class="sidebar-metric-label">${sourceIcons[pl] || "🌐"} ${pl}</span>
      <span class="platform-badge ${pl.toLowerCase().replace(" ", "-")}">Active</span>
    </div>
  `
    )
    .join("");
}

// ============================================================
// HELPERS
// ============================================================
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

function animateCounter(el, from, to, duration) {
  const start = performance.now();
  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (to - from) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

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
