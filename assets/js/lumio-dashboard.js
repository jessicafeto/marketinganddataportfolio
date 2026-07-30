/* ============================================================
   Lumio — marketing analytics dashboard data + Chart.js setup
   Illustrative figures consolidating the Lumio paid media
   (case study 05) and email lifecycle (case study 06) projects
   into a single blended reporting view.
   ============================================================ */

const lumioData = {
  "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  "blended_cac": [46, 42, 38, 34, 31, 29],
  "revenue_by_channel": {
    "Paid Social":   [9200, 9800, 10400, 11000, 11600, 12200],
    "Paid Search":   [4500, 4600, 4700, 4800, 4900, 5000],
    "Organic / Direct": [3300, 3350, 3400, 3450, 3500, 3550],
    "Email (Owned)": [1700, 2600, 3600, 4700, 5700, 6500]
  },
  "roas_by_channel": {
    "Paid Social": 2.4,
    "Paid Search": 3.6,
    "Email (Owned)": 9.2
  },
  "email_revenue_share": [9.1, 12.8, 16.3, 19.6, 22.2, 23.9]
};

// Brand palette
const LM_COLORS = {
  teal: "#2F5D55",
  tealLight: "#7FA39A",
  clay: "#C97B5C",
  clayLight: "#E8B9A3",
  sand: "#D9C9B8",
  text: "#3A3A3A"
};

Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = LM_COLORS.text;
Chart.defaults.plugins.legend.labels.boxWidth = 14;
Chart.defaults.plugins.legend.labels.usePointStyle = true;

document.addEventListener("DOMContentLoaded", () => {

  // 1. Blended CAC over time (line)
  new Chart(document.getElementById("chart-lm-cac"), {
    type: "line",
    data: {
      labels: lumioData.months,
      datasets: [{
        label: "Blended CAC (£)",
        data: lumioData.blended_cac,
        borderColor: LM_COLORS.teal,
        backgroundColor: LM_COLORS.teal,
        tension: 0.3,
        borderWidth: 2.5,
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: "Blended customer acquisition cost (£), H1" },
        legend: { display: false }
      },
      scales: {
        y: { title: { display: true, text: "CAC (£)" }, beginAtZero: true }
      }
    }
  });

  // 2. Revenue by channel (stacked bar)
  new Chart(document.getElementById("chart-lm-channel-revenue"), {
    type: "bar",
    data: {
      labels: lumioData.months,
      datasets: [
        {
          label: "Paid Social",
          data: lumioData.revenue_by_channel["Paid Social"],
          backgroundColor: LM_COLORS.teal,
          stack: "rev"
        },
        {
          label: "Paid Search",
          data: lumioData.revenue_by_channel["Paid Search"],
          backgroundColor: LM_COLORS.tealLight,
          stack: "rev"
        },
        {
          label: "Organic / Direct",
          data: lumioData.revenue_by_channel["Organic / Direct"],
          backgroundColor: LM_COLORS.sand,
          stack: "rev"
        },
        {
          label: "Email (Owned)",
          data: lumioData.revenue_by_channel["Email (Owned)"],
          backgroundColor: LM_COLORS.clay,
          stack: "rev"
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: "Revenue by channel (£), H1" }
      },
      scales: {
        x: { stacked: true },
        y: { stacked: true, title: { display: true, text: "Revenue (£)" } }
      }
    }
  });

  // 3. ROAS by channel (bar)
  const roasChannels = Object.keys(lumioData.roas_by_channel);
  new Chart(document.getElementById("chart-lm-roas"), {
    type: "bar",
    data: {
      labels: roasChannels,
      datasets: [{
        label: "ROAS (revenue ÷ spend)",
        data: roasChannels.map(c => lumioData.roas_by_channel[c]),
        backgroundColor: [LM_COLORS.teal, LM_COLORS.tealLight, LM_COLORS.clay],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: "ROAS by channel, June" },
        legend: { display: false }
      },
      scales: {
        y: { title: { display: true, text: "ROAS (x)" }, beginAtZero: true }
      }
    }
  });

  // 4. Email revenue share growth (line, filled)
  new Chart(document.getElementById("chart-lm-email-share"), {
    type: "line",
    data: {
      labels: lumioData.months,
      datasets: [{
        label: "Email share of total revenue (%)",
        data: lumioData.email_revenue_share,
        borderColor: LM_COLORS.clay,
        backgroundColor: LM_COLORS.clayLight,
        tension: 0.3,
        borderWidth: 2.5,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: "Email's share of total revenue (%), H1" },
        legend: { display: false }
      },
      scales: {
        y: { title: { display: true, text: "% of revenue" }, beginAtZero: true, max: 30 }
      }
    }
  });

});
