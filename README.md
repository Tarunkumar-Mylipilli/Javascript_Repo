# Tarun's Data Analyst Portfolio (with Web Developer Heritage)

An interactive, high-performance personal web portfolio designed specifically for a **Data Analyst with a prior background as a Full-Stack Web Developer**.

Inspired by modern Dribbble animation aesthetics, featuring interactive live dashboards, 3D card tilt, custom magnetic cursor, and an in-browser SQL playground.

---

## 🌟 Highlights & Key Features

1. **Interactive Dribbble-Grade Animations & Micro-Interactions**:
   - **Magnetic Glowing Cursor**: Fluid trailing light ball that smoothly expands on hover.
   - **3D Parallax Tilt Photo Card**: Realistic 3D tilt effect on the portrait card reacting dynamically to mouse movement.
   - **Bento Cursor Spotlight**: Cards calculate cursor coordinates (`--mouse-x`, `--mouse-y`) to produce dynamic radial ambient highlights.
   - **Infinite Silky Marquee Ticker**: Continuous running badge bar featuring core tech stack.

2. **Live Analytics Command Center (Chart.js)**:
   - Live interactive dashboard built directly inside the website.
   - 3 real-world scenarios: **Sales & Margin Trends (YoY)**, **Customer Cohort Retention & Churn**, and **Web Telemetry Funnel**.
   - Dynamic KPI calculation cards with instant metric updates.

3. **Interactive SQL Execution Sandbox**:
   - Production PostgreSQL queries with Common Table Expressions (CTEs), Window Functions (`NTILE`, `LAG`, rolling averages), and aggregation filters.
   - Interactive "Run Query" button with sub-second execution simulation and responsive data table output.

4. **The "Synergy / Competitive Advantage" Section**:
   - Explains why a Data Analyst with a Web Development background provides 10x value (clean data telemetry at the source, technical bridge between engineers and executives, ability to build custom data apps & automated pipelines).

5. **Deep-Dive Case Studies with Interactive Modal**:
   - **Executive Revenue & Profit Optimization Dashboard** (Power BI, DAX, Advanced Excel)
   - **E-Commerce Cohort Retention & Churn Engine** (PostgreSQL, RFM Modeling, Tableau/PowerBI)
   - **Real-Time Web Telemetry to Warehouse Pipeline** (JavaScript, Python ETL, SQL Schemas)
   - **Automated Financial Reconciliation & Inventory Suite** (Power Query, VBA Automation, Excel)

6. **Full-Spectrum Technical Arsenal**:
   - **Microsoft Excel**: Power Query, M-Code, Advanced DAX, Scenario Modeling.
   - **SQL & Databases**: PostgreSQL, MySQL, CTEs, Window Functions, Schema Optimization.
   - **Power BI & BI Suites**: Star Schema, DAX, KPI storytelling, RLS.
   - **Web Development**: JavaScript, React, REST APIs, Git, DOM Telemetry.

---

## 🚀 How to Run Locally

You can open the project in any browser directly or start a quick local server:

### Option 1: Direct File Opening
Double-click `index.html` or right-click `index.html` -> **Open with Google Chrome / Edge / Brave**.

### Option 2: Using Node / npx (Recommended for Live Reload)
```bash
cd "d:\Projects\data-analyst-portfolio"
npx serve .
# or
npx live-server
```

### Option 3: Using Python
```bash
cd "d:\Projects\data-analyst-portfolio"
python -m http.server 3000
```
Then visit `http://localhost:3000`.

---

## 🔗 How to Update Your Profile Links
Open `index.html` and search for:
- `tarun.dataanalyst@gmail.com` -> Replace with your preferred email.
- `https://github.com` -> Add your GitHub username (e.g., `https://github.com/your-username`).
- `https://linkedin.com` -> Add your LinkedIn URL (e.g., `https://linkedin.com/in/your-profile`).
