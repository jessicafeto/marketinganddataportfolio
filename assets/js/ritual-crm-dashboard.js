/* ============================================================
   Ritual concept project — CRM segmentation dashboard
   Illustrative / modelled dataset built for a self-directed
   concept case study. Not Ritual's real data.
   ============================================================ */

const ritualCrmData = {
  summary: {
    total_subscribers: 1170,
    total_orders: 1552,
    total_revenue: 51163.48,
    overall_renewal_rate: 25.9
  },

  segments: [
    {
      name: "Founding Subscribers",
      customers: 29,
      pct_customers: 2.5,
      revenue: 3274,
      pct_revenue: 6.4,
      avg_orders: 3.31,
      avg_ltv: 112.91
    },
    {
      name: "Building the Habit",
      customers: 102,
      pct_customers: 8.7,
      revenue: 6931,
      pct_revenue: 13.5,
      avg_orders: 2.0,
      avg_ltv: 67.95
    },
    {
      name: "Tried It Once",
      customers: 867,
      pct_customers: 74.1,
      revenue: 27709,
      pct_revenue: 54.2,
      avg_orders: 1.0,
      avg_ltv: 31.96
    },
    {
      name: "Paused & Lapsed",
      customers: 172,
      pct_customers: 14.7,
      revenue: 13249,
      pct_revenue: 25.9,
      avg_orders: 2.24,
      avg_ltv: 77.03
    }
  ],

  renewal_rate_by_channel: {
    "Creator Partnerships – Macro": 30.8,
    "Creator Partnerships – Micro": 37.6,
    "Organic & Referral": 37.5,
    "Paid Social": 14.2
  },

  acquisition_volume_by_channel: {
    "Creator Partnerships – Macro": 180,
    "Creator Partnerships – Micro": 310,
    "Paid Social": 460,
    "Organic & Referral": 220
  },

  cac_by_month: {
    months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    "Creator Partnerships – Macro": [32, 34, 35, 38, 40, 42, 45, 47, 50, 52, 54, 56],
    "Creator Partnerships – Micro": [16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22],
    "Paid Social": [22, 24, 26, 29, 32, 36, 40, 44, 48, 52, 56, 61]
  },

  roas_by_channel: {
    "Creator Partnerships – Macro": 2.65,
    "Creator Partnerships – Micro": 5.13,
    "Paid Social": 1.22
  },

  monthly_revenue: {
    months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    new: [5200, 4800, 4400, 4100, 3800, 3500, 3300, 3100, 2900, 2700, 2600, 2500],
    returning: [120, 180, 260, 350, 460, 580, 700, 830, 960, 1100, 1250, 1400]
  }
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

  // 1. CAC by month, by channel (line)
  const cacEl = document.getElementById("chart-rt-cac");
  if (cacEl) {
    new Chart(cacEl, {
      type: "line",
      data: {
        labels: ritualCrmData.cac_by_month.months,
        datasets: [
          {
            label: "Creator Partnerships – Macro",
            data: ritualCrmData.cac_by_month["Creator Partnerships – Macro"],
            borderColor: RT_COLORS.clay,
            backgroundColor: RT_COLORS.clay,
            tension: 0.35,
            borderWidth: 2,
            pointRadius: 2
          },
          {
            label: "Creator Partnerships – Micro",
            data: ritualCrmData.cac_by_month["Creator Partnerships – Micro"],
            borderColor: RT_COLORS.sage,
            backgroundColor: RT_COLORS.sage,
            tension: 0.35,
            borderWidth: 2,
            pointRadius: 2
          },
          {
            label: "Paid Social",
            data: ritualCrmData.cac_by_month["Paid Social"],
            borderColor: RT_COLORS.gold,
            backgroundColor: RT_COLORS.gold,
            tension: 0.35,
            borderWidth: 2,
            pointRadius: 2
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: "Modelled CAC by acquisition channel (£ / month)" }
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v) => "£" + v } }
        }
      }
    });
  }

  // 2. ROAS by channel (bar)
  const roasEl = document.getElementById("chart-rt-roas");
  if (roasEl) {
    new Chart(roasEl, {
      type: "bar",
      data: {
        labels: Object.keys(ritualCrmData.roas_by_channel),
        datasets: [
          {
            label: "ROAS",
            data: Object.values(ritualCrmData.roas_by_channel),
            backgroundColor: [RT_COLORS.clay, RT_COLORS.sage, RT_COLORS.gold],
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: "Modelled ROAS by acquisition channel" }
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v) => v + "x" } }
        }
      }
    });
  }

  // 3. Segment breakdown (doughnut)
  const segEl = document.getElementById("chart-rt-segments");
  if (segEl) {
    new Chart(segEl, {
      type: "doughnut",
      data: {
        labels: ritualCrmData.segments.map((s) => s.name),
        datasets: [
          {
            data: ritualCrmData.segments.map((s) => s.customers),
            backgroundColor: [RT_COLORS.gold, RT_COLORS.sage, RT_COLORS.mint, RT_COLORS.clay],
            borderColor: "#FFFFFF",
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: "Subscribers by segment (n = 1,170)" }
        }
      }
    });
  }

  // 4. Monthly revenue — new vs returning (stacked bar)
  const revEl = document.getElementById("chart-rt-revenue");
  if (revEl) {
    new Chart(revEl, {
      type: "bar",
      data: {
        labels: ritualCrmData.monthly_revenue.months,
        datasets: [
          {
            label: "New subscribers",
            data: ritualCrmData.monthly_revenue.new,
            backgroundColor: RT_COLORS.sage,
            borderRadius: 4
          },
          {
            label: "Returning subscribers",
            data: ritualCrmData.monthly_revenue.returning,
            backgroundColor: RT_COLORS.gold,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: "Modelled monthly revenue — new vs. returning subscribers" }
        },
        scales: {
          x: { stacked: true },
          y: { stacked: true, beginAtZero: true, ticks: { callback: (v) => "£" + v } }
        }
      }
    });
  }

  // 5. Renewal rate by channel (bar)
  const renewalEl = document.getElementById("chart-rt-renewal");
  if (renewalEl) {
    new Chart(renewalEl, {
      type: "bar",
      data: {
        labels: Object.keys(ritualCrmData.renewal_rate_by_channel),
        datasets: [
          {
            label: "Second-month renewal rate",
            data: Object.values(ritualCrmData.renewal_rate_by_channel),
            backgroundColor: [RT_COLORS.clay, RT_COLORS.sage, RT_COLORS.mint, RT_COLORS.gold],
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: "Modelled second-month renewal rate by channel" }
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v) => v + "%" } }
        }
      }
    });
  }

});
