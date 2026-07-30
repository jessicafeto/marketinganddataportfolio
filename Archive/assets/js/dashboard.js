/* ============================================================
   Glow Lab — dashboard data + Chart.js setup
   Data generated from a synthetic 12-month dataset (see /data).
   ============================================================ */

const glowLabData = {
  "summary": {
    "analysis_date": "2026-01-15",
    "total_customers": 1170,
    "total_orders": 1552,
    "total_revenue": 51163.48,
    "overall_repeat_rate": 25.9
  },
  "segments": [
    { "name": "VIP Glow Girls", "customers": 29, "pct_customers": 2.5, "revenue": 3274.33, "pct_revenue": 6.4, "avg_orders": 3.31, "avg_ltv": 112.91 },
    { "name": "Repeat Regulars", "customers": 102, "pct_customers": 8.7, "revenue": 6931.26, "pct_revenue": 13.5, "avg_orders": 2.0, "avg_ltv": 67.95 },
    { "name": "One-and-Done", "customers": 867, "pct_customers": 74.1, "revenue": 27708.15, "pct_revenue": 54.2, "avg_orders": 1.0, "avg_ltv": 31.96 },
    { "name": "At Risk", "customers": 172, "pct_customers": 14.7, "revenue": 13249.74, "pct_revenue": 25.9, "avg_orders": 2.24, "avg_ltv": 77.03 }
  ],
  "repeat_rate_by_channel": {
    "Influencer - Macro": 30.8,
    "Influencer - Micro": 37.6,
    "Organic & Referral": 37.5,
    "Paid Social": 14.2
  },
  "acquisition_volume_by_channel": {
    "Paid Social": 522,
    "Influencer - Micro": 229,
    "Influencer - Macro": 211,
    "Organic & Referral": 208
  },
  "cac_by_month": {
    "months": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    "Influencer - Macro": [12.46, 10.44, 13.13, 13.41, 9.07, 10.05, 12.19, 11.53, 11.97, 10.72, 13.32, 13.17],
    "Influencer - Micro": [6.07, 7.13, 6.47, 5.14, 6.37, 5.04, 6.88, 5.95, 5.81, 5.32, 7.22, 5.85],
    "Paid Social": [14.49, 16.4, 19.28, 20.89, 22.77, 24.61, 28.48, 27.24, 28.93, 30.39, 33.92, 36.35]
  },
  "roas_by_channel": {
    "Influencer - Macro": 2.65,
    "Influencer - Micro": 5.13,
    "Paid Social": 1.22
  },
  "monthly_revenue": {
    "months": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    "new": [5524.13, 3823.8, 2679.28, 2883.14, 2523.83, 2411.04, 2329.95, 2128.54, 2500.14, 2705.61, 4142.59, 3751.17],
    "returning": [0.0, 192.71, 1266.34, 1637.68, 1061.93, 1670.01, 1341.22, 743.97, 1083.7, 1253.82, 1243.76, 1310.75]
  }
};

// Brand palette
const COLORS = {
  gold: "#C9A66B",
  sage: "#A8B5A0",
  sageDark: "#6F8170",
  rose: "#D4756B",
  blush: "#F4DCD6",
  taupe: "#D9C4B8",
  text: "#3A3A3A"
};

Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = COLORS.text;
Chart.defaults.plugins.legend.labels.boxWidth = 14;
Chart.defaults.plugins.legend.labels.usePointStyle = true;

document.addEventListener("DOMContentLoaded", () => {

  // 1. CAC by month (line chart)
  new Chart(document.getElementById("chart-cac"), {
    type: "line",
    data: {
      labels: glowLabData.cac_by_month.months,
      datasets: [
        {
          label: "Paid Social",
          data: glowLabData.cac_by_month["Paid Social"],
          borderColor: COLORS.rose,
          backgroundColor: COLORS.rose,
          tension: 0.3,
          borderWidth: 2.5
        },
        {
          label: "Influencer – Macro",
          data: glowLabData.cac_by_month["Influencer - Macro"],
          borderColor: COLORS.gold,
          backgroundColor: COLORS.gold,
          tension: 0.3,
          borderWidth: 2.5
        },
        {
          label: "Influencer – Micro",
          data: glowLabData.cac_by_month["Influencer - Micro"],
          borderColor: COLORS.sageDark,
          backgroundColor: COLORS.sageDark,
          tension: 0.3,
          borderWidth: 2.5
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: "Customer Acquisition Cost by channel (£), 2025" }
      },
      scales: {
        y: { title: { display: true, text: "CAC (£)" }, beginAtZero: true }
      }
    }
  });

  // 2. ROAS by channel (bar chart)
  new Chart(document.getElementById("chart-roas"), {
    type: "bar",
    data: {
      labels: ["Influencer – Micro", "Influencer – Macro", "Paid Social"],
      datasets: [{
        label: "ROAS (revenue ÷ spend)",
        data: [
          glowLabData.roas_by_channel["Influencer - Micro"],
          glowLabData.roas_by_channel["Influencer - Macro"],
          glowLabData.roas_by_channel["Paid Social"]
        ],
        backgroundColor: [COLORS.sageDark, COLORS.gold, COLORS.rose],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: "Full-year ROAS by acquisition channel" },
        legend: { display: false }
      },
      scales: {
        y: { title: { display: true, text: "ROAS (x)" }, beginAtZero: true }
      }
    }
  });

  // 3. Revenue by segment (doughnut)
  new Chart(document.getElementById("chart-segments"), {
    type: "doughnut",
    data: {
      labels: glowLabData.segments.map(s => `${s.name} (${s.pct_customers}% of customers)`),
      datasets: [{
        data: glowLabData.segments.map(s => s.revenue),
        backgroundColor: [COLORS.gold, COLORS.sageDark, COLORS.taupe, COLORS.rose],
        borderWidth: 2,
        borderColor: "#FFFFFF"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: "Revenue contribution by customer segment" },
        legend: { position: "bottom" }
      }
    }
  });

  // 4. Monthly revenue: new vs returning (stacked bar)
  new Chart(document.getElementById("chart-revenue"), {
    type: "bar",
    data: {
      labels: glowLabData.monthly_revenue.months,
      datasets: [
        {
          label: "New customer revenue",
          data: glowLabData.monthly_revenue.new,
          backgroundColor: COLORS.blush,
          stack: "rev"
        },
        {
          label: "Returning customer revenue",
          data: glowLabData.monthly_revenue.returning,
          backgroundColor: COLORS.sageDark,
          stack: "rev"
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: "Monthly revenue: new vs. returning customers (£)" }
      },
      scales: {
        x: { stacked: true },
        y: { stacked: true, title: { display: true, text: "Revenue (£)" } }
      }
    }
  });

  // 5. Repeat purchase rate by acquisition channel (bar)
  const repeatChannels = Object.keys(glowLabData.repeat_rate_by_channel);
  new Chart(document.getElementById("chart-repeat"), {
    type: "bar",
    data: {
      labels: repeatChannels,
      datasets: [{
        label: "Repeat purchase rate (%)",
        data: repeatChannels.map(c => glowLabData.repeat_rate_by_channel[c]),
        backgroundColor: [COLORS.gold, COLORS.sageDark, COLORS.taupe, COLORS.rose],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: "Repeat purchase rate by acquisition channel" },
        legend: { display: false }
      },
      scales: {
        y: { title: { display: true, text: "% of customers with 2+ orders" }, beginAtZero: true, max: 50 }
      }
    }
  });

});
