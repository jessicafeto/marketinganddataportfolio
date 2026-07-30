/* ============================================================
   Ritual concept project — unified marketing dashboard
   Illustrative / modelled dataset combining the paid media
   (case study 05) and email lifecycle (case study 06) concept
   projects into one reporting view. Not Ritual's real data.
   ============================================================ */

const ritualDashboardData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

  blended_cac: [46, 42, 38, 34, 31, 29],

  revenue_by_channel: {
    "Paid Social": [4900, 5000, 5100, 5200, 5400, 5650],
    "Paid Search": [2700, 2700, 2750, 2750, 2800, 2850],
    "Organic / Direct": [3300, 3650, 4050, 4500, 5000, 5650],
    "Email (Owned)": [1100, 1650, 2300, 3050, 3750, 4450]
  },

  roas_by_channel: {
    "Paid Social": 2.4,
    "Paid Search": 3.6,
    "Email (Owned)": 9.2
  },

  email_revenue_share: [9.1, 12.8, 16.3, 19.6, 22.2, 23.9]
};

const RT_COLORS = {
  sage: "#7C9473",
  sageDark: "#4F6249",
  sageLight: "#E7EEE3",
  gold: "#C9A66B",
  goldLight: "#F3EAD8",
  mint: "#A9C2A0",
  clay: "#C97B5C",
  text: "#3A3A3A"
};

Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = RT_COLORS.text;
Chart.defaults.plugins.legend.labels.boxWidth = 14;
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.position = "bottom";

document.addEventListener("DOMContentLoaded", () => {

  // 1. Blended CAC over time (line)
  const cacEl = document.getElementById("chart-rt-cac");
  if (cacEl) {
    new Chart(cacEl, {
      type: "line",
      data: {
        labels: ritualDashboardData.months,
        datasets: [
          {
            label: "Blended CAC (£)",
            data: ritualDashboardData.blended_cac,
            borderColor: RT_COLORS.clay,
            backgroundColor: RT_COLORS.clay,
            tension: 0.35,
            borderWidth: 2,
            pointRadius: 3,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: "Modelled blended CAC — £46 → £29 over 6 months" }
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v) => "£" + v } }
        }
      }
    });
  }

  // 2. Revenue by channel (stacked bar, full width)
  const channelRevEl = document.getElementById("chart-rt-channel-revenue");
  if (channelRevEl) {
    new Chart(channelRevEl, {
      type: "bar",
      data: {
        labels: ritualDashboardData.months,
        datasets: [
          {
            label: "Paid Social",
            data: ritualDashboardData.revenue_by_channel["Paid Social"],
            backgroundColor: RT_COLORS.clay,
            borderRadius: 4
          },
          {
            label: "Paid Search",
            data: ritualDashboardData.revenue_by_channel["Paid Search"],
            backgroundColor: RT_COLORS.mint,
            borderRadius: 4
          },
          {
            label: "Organic / Direct",
            data: ritualDashboardData.revenue_by_channel["Organic / Direct"],
            backgroundColor: RT_COLORS.sage,
            borderRadius: 4
          },
          {
            label: "Email (Owned)",
            data: ritualDashboardData.revenue_by_channel["Email (Owned)"],
            backgroundColor: RT_COLORS.gold,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: "Modelled monthly revenue by channel" }
        },
        scales: {
          x: { stacked: true },
          y: { stacked: true, beginAtZero: true, ticks: { callback: (v) => "£" + v } }
        }
      }
    });
  }

  // 3. ROAS by channel (bar)
  const roasEl = document.getElementById("chart-rt-roas");
  if (roasEl) {
    new Chart(roasEl, {
      type: "bar",
      data: {
        labels: Object.keys(ritualDashboardData.roas_by_channel),
        datasets: [
          {
            label: "ROAS",
            data: Object.values(ritualDashboardData.roas_by_channel),
            backgroundColor: [RT_COLORS.clay, RT_COLORS.mint, RT_COLORS.gold],
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: "Modelled ROAS by channel" }
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v) => v + "x" } }
        }
      }
    });
  }

  // 4. Email revenue share over time (filled line)
  const emailShareEl = document.getElementById("chart-rt-email-share");
  if (emailShareEl) {
    new Chart(emailShareEl, {
      type: "line",
      data: {
        labels: ritualDashboardData.months,
        datasets: [
          {
            label: "Email share of revenue (%)",
            data: ritualDashboardData.email_revenue_share,
            borderColor: RT_COLORS.sageDark,
            backgroundColor: RT_COLORS.sageLight,
            tension: 0.35,
            borderWidth: 2,
            pointRadius: 3,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: "Modelled email share of revenue — 9% → 24%" }
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v) => v + "%" } }
        }
      }
    });
  }

});
