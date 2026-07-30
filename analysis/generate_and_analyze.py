"""
Glow Lab — synthetic dataset generation + analysis
====================================================
Generates a fictional 12-month (Jan-Dec 2025) dataset for an indie DTC beauty
brand ("Glow Lab"), then runs an RFM-style customer segmentation and
marketing-channel performance analysis (CAC, ROAS, repeat purchase rate).

Outputs (in ./glow-lab-data/):
  - customers.csv
  - orders.csv
  - campaigns.csv
  - customers_segmented.csv
  - results.json   (chart-ready aggregates + summary stats for the case study)
"""

import json
import os

import numpy as np
import pandas as pd

rng = np.random.default_rng(42)

OUT_DIR = "glow-lab-data"
os.makedirs(OUT_DIR, exist_ok=True)

ANALYSIS_DATE = pd.Timestamp("2026-01-15")
MONTHS = pd.date_range("2025-01-01", periods=12, freq="MS")
MONTH_LABELS = [m.strftime("%b %Y") for m in MONTHS]

CHANNELS = ["Influencer - Macro", "Influencer - Micro", "Paid Social", "Organic & Referral"]
PAID_CHANNELS = ["Influencer - Macro", "Influencer - Micro", "Paid Social"]

# New customers acquired per month (launch spike in Jan, Black Friday/Christmas bump Nov-Dec)
NEW_CUSTOMERS_PER_MONTH = [180, 110, 90, 85, 80, 75, 70, 70, 75, 85, 140, 110]

# Acquisition channel mix per month: [Influencer-Macro, Influencer-Micro, Paid Social, Organic&Referral]
CHANNEL_MIX_BY_MONTH = [
    [0.50, 0.20, 0.20, 0.10],  # Jan - launch driven by macro influencers
    [0.25, 0.20, 0.35, 0.20],  # Feb
    [0.15, 0.20, 0.45, 0.20],  # Mar
    [0.10, 0.20, 0.50, 0.20],  # Apr
    [0.10, 0.15, 0.55, 0.20],  # May
    [0.08, 0.15, 0.57, 0.20],  # Jun
    [0.08, 0.15, 0.57, 0.20],  # Jul
    [0.08, 0.15, 0.57, 0.20],  # Aug
    [0.08, 0.17, 0.55, 0.20],  # Sep
    [0.10, 0.18, 0.52, 0.20],  # Oct
    [0.15, 0.20, 0.45, 0.20],  # Nov - Black Friday, influencer push back up
    [0.12, 0.18, 0.50, 0.20],  # Dec - Christmas
]

# Probability a customer places a 2nd order, by acquisition channel.
# Each subsequent order has this probability multiplied by 0.7 (decay).
REPEAT_P2 = {
    "Influencer - Macro": 0.30,
    "Influencer - Micro": 0.42,
    "Paid Social": 0.18,
    "Organic & Referral": 0.45,
}

# Target CAC (£) per paid channel, by month — used to derive campaign spend.
TARGET_CAC_MACRO = np.clip(rng.normal(12, 1.5, 12), 9, 16)
TARGET_CAC_MICRO = np.clip(rng.normal(6, 1.0, 12), 4, 9)
TARGET_CAC_PAID_SOCIAL = np.clip(np.linspace(15, 35, 12) + rng.normal(0, 1.2, 12), 13, 38)

TARGET_CAC = {
    "Influencer - Macro": TARGET_CAC_MACRO,
    "Influencer - Micro": TARGET_CAC_MICRO,
    "Paid Social": TARGET_CAC_PAID_SOCIAL,
}

# ---------------------------------------------------------------------------
# 1. Generate customers + orders
# ---------------------------------------------------------------------------
customers = []
orders = []
cust_id = 1
order_id = 1

for m_idx, month_start in enumerate(MONTHS):
    n_new = NEW_CUSTOMERS_PER_MONTH[m_idx]
    mix = CHANNEL_MIX_BY_MONTH[m_idx]
    days_in_month = pd.Period(month_start, "M").days_in_month
    assigned_channels = rng.choice(CHANNELS, size=n_new, p=mix)

    for ch in assigned_channels:
        signup_date = month_start + pd.Timedelta(days=int(rng.integers(0, days_in_month)))
        first_order_date = signup_date + pd.Timedelta(days=int(rng.integers(0, 3)))

        customers.append({
            "customer_id": cust_id,
            "signup_date": signup_date.date().isoformat(),
            "acquisition_channel": ch,
            "acquisition_month": month_start.strftime("%Y-%m"),
        })

        # First order
        first_aov = round(max(12, rng.normal(32, 5)), 2)
        orders.append({
            "order_id": order_id,
            "customer_id": cust_id,
            "order_date": first_order_date.date().isoformat(),
            "order_value": first_aov,
            "is_first_order": True,
        })
        order_id += 1

        # Repeat orders (decaying probability, 40-95 day replenishment gaps)
        p_continue = REPEAT_P2[ch]
        current_date = first_order_date
        while True:
            if rng.random() < p_continue:
                gap_days = int(rng.integers(40, 95))
                current_date = current_date + pd.Timedelta(days=gap_days)
                if current_date > ANALYSIS_DATE:
                    break
                repeat_aov = round(max(15, rng.normal(36, 6)), 2)
                orders.append({
                    "order_id": order_id,
                    "customer_id": cust_id,
                    "order_date": current_date.date().isoformat(),
                    "order_value": repeat_aov,
                    "is_first_order": False,
                })
                order_id += 1
                p_continue *= 0.7
            else:
                break

        cust_id += 1

customers_df = pd.DataFrame(customers)
orders_df = pd.DataFrame(orders)
orders_df["order_date"] = pd.to_datetime(orders_df["order_date"])

# ---------------------------------------------------------------------------
# 2. Build campaigns.csv (monthly performance per paid channel)
# ---------------------------------------------------------------------------
first_orders = orders_df[orders_df["is_first_order"]].merge(
    customers_df[["customer_id", "acquisition_channel", "acquisition_month"]],
    on="customer_id",
)

campaigns = []
for m_idx, month_start in enumerate(MONTHS):
    month_key = month_start.strftime("%Y-%m")
    for ch in PAID_CHANNELS:
        subset = first_orders[
            (first_orders["acquisition_month"] == month_key)
            & (first_orders["acquisition_channel"] == ch)
        ]
        conversions = len(subset)
        revenue = round(subset["order_value"].sum(), 2)
        cac = float(TARGET_CAC[ch][m_idx])
        spend = round(conversions * cac, 2)
        # Rough funnel detail for flavour
        cvr = {"Influencer - Macro": 0.06, "Influencer - Micro": 0.08, "Paid Social": 0.025}[ch]
        clicks = int(conversions / cvr) if conversions else 0
        ctr = {"Influencer - Macro": 0.02, "Influencer - Micro": 0.03, "Paid Social": 0.012}[ch]
        impressions = int(clicks / ctr) if clicks else 0

        campaigns.append({
            "month": month_key,
            "channel": ch,
            "spend": spend,
            "impressions": impressions,
            "clicks": clicks,
            "conversions": conversions,
            "revenue": revenue,
            "cac": round(spend / conversions, 2) if conversions else None,
            "roas": round(revenue / spend, 2) if spend else None,
        })

campaigns_df = pd.DataFrame(campaigns)

# ---------------------------------------------------------------------------
# 3. RFM-style segmentation
# ---------------------------------------------------------------------------
agg = orders_df.groupby("customer_id").agg(
    frequency=("order_id", "count"),
    monetary=("order_value", "sum"),
    last_order_date=("order_date", "max"),
).reset_index()
agg["recency_days"] = (ANALYSIS_DATE - agg["last_order_date"]).dt.days

customers_seg = customers_df.merge(agg, on="customer_id")


def assign_segment(row):
    if row["frequency"] == 1:
        return "One-and-Done"
    if row["recency_days"] > 120:
        return "At Risk"
    if row["frequency"] >= 3:
        return "VIP Glow Girls"
    return "Repeat Regulars"


customers_seg["segment"] = customers_seg.apply(assign_segment, axis=1)
customers_seg["last_order_date"] = customers_seg["last_order_date"].dt.date.astype(str)

# ---------------------------------------------------------------------------
# 4. Aggregate results for the dashboard / case study
# ---------------------------------------------------------------------------
total_customers = len(customers_seg)
total_orders = len(orders_df)
total_revenue = round(orders_df["order_value"].sum(), 2)
overall_repeat_rate = round((customers_seg["frequency"] >= 2).mean() * 100, 1)

segment_order = ["VIP Glow Girls", "Repeat Regulars", "One-and-Done", "At Risk"]
segments = []
for seg in segment_order:
    sub = customers_seg[customers_seg["segment"] == seg]
    seg_revenue = sub["monetary"].sum()
    segments.append({
        "name": seg,
        "customers": int(len(sub)),
        "pct_customers": round(len(sub) / total_customers * 100, 1),
        "revenue": round(seg_revenue, 2),
        "pct_revenue": round(seg_revenue / total_revenue * 100, 1),
        "avg_orders": round(sub["frequency"].mean(), 2),
        "avg_ltv": round(sub["monetary"].mean(), 2),
    })

repeat_rate_by_channel = (
    customers_seg.groupby("acquisition_channel")["frequency"]
    .apply(lambda s: round((s >= 2).mean() * 100, 1))
    .to_dict()
)

acquisition_volume_by_channel = customers_seg["acquisition_channel"].value_counts().to_dict()

cac_by_month = {"months": MONTH_LABELS}
for ch in PAID_CHANNELS:
    series = campaigns_df[campaigns_df["channel"] == ch].sort_values("month")["cac"].tolist()
    cac_by_month[ch] = series

roas_by_channel = {}
spend_by_channel = {}
revenue_by_channel = {}
for ch in PAID_CHANNELS:
    sub = campaigns_df[campaigns_df["channel"] == ch]
    spend = sub["spend"].sum()
    revenue = sub["revenue"].sum()
    spend_by_channel[ch] = round(spend, 2)
    revenue_by_channel[ch] = round(revenue, 2)
    roas_by_channel[ch] = round(revenue / spend, 2) if spend else None

monthly = orders_df.copy()
monthly["month"] = monthly["order_date"].dt.strftime("%Y-%m")
pivot = monthly.groupby(["month", "is_first_order"])["order_value"].sum().unstack(fill_value=0)
pivot = pivot.reindex(columns=[True, False], fill_value=0)
monthly_index = [m.strftime("%Y-%m") for m in MONTHS]
monthly_revenue = {
    "months": MONTH_LABELS,
    "new": [round(pivot.loc[m, True], 2) if m in pivot.index else 0 for m in monthly_index],
    "returning": [round(pivot.loc[m, False], 2) if m in pivot.index else 0 for m in monthly_index],
}

results = {
    "summary": {
        "analysis_date": ANALYSIS_DATE.date().isoformat(),
        "total_customers": total_customers,
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "overall_repeat_rate": overall_repeat_rate,
    },
    "segments": segments,
    "repeat_rate_by_channel": repeat_rate_by_channel,
    "acquisition_volume_by_channel": acquisition_volume_by_channel,
    "cac_by_month": cac_by_month,
    "roas_by_channel": roas_by_channel,
    "spend_by_channel": spend_by_channel,
    "revenue_by_channel": revenue_by_channel,
    "monthly_revenue": monthly_revenue,
}

# ---------------------------------------------------------------------------
# 5. Save everything
# ---------------------------------------------------------------------------
customers_df.to_csv(os.path.join(OUT_DIR, "customers.csv"), index=False)
orders_df.to_csv(os.path.join(OUT_DIR, "orders.csv"), index=False)
campaigns_df.to_csv(os.path.join(OUT_DIR, "campaigns.csv"), index=False)
customers_seg.to_csv(os.path.join(OUT_DIR, "customers_segmented.csv"), index=False)
with open(os.path.join(OUT_DIR, "results.json"), "w") as f:
    json.dump(results, f, indent=2)

print(json.dumps(results, indent=2))
