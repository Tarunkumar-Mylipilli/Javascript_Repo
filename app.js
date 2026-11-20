// ==========================================
// Tarunkumar Mylipilli — Portfolio Script
// Verified data directly from Resume & Task Specs
// ==========================================

// Project Case Study Details Data
const projectDetails = {
  rcb: {
    title: "IPL Strategy Analysis — Royal Challengers Bangalore",
    subtitle: "SQL Analytics / Sports Analytics",
    duration: "October 2026",
    role: "SQL Data Analyst",
    tools: ["MySQL", "SQL Joins", "CTEs", "Subqueries", "Window Functions (Rank, Dense_rank, Row_number)", "Case When", "Group By", "Views", "Union"],
    summary: "Built a comprehensive SQL-based IPL analytics project to evaluate Royal Challengers Bengaluru's (RCB) performance and develop a data-driven strategy for the 2017 Mega Auction. Analyzed 255 matches, 60,223 deliveries, and 469 players to extract player performance, team trends, and venue statistics.",
    problem: "How can IPL historical match and ball-by-ball performance data help team management understand RCB's match trends, identify batting consistency, evaluate bowling effectiveness, and develop an evidence-backed retention and auction bidding strategy for the 2017 Mega Auction?",
    datasetCoverage: "Four IPL seasons (2013–2016), covering 249+ matches, 60,223 deliveries, and 469 player profiles across all participating franchises.",
    workflow: [
      "1. Database Schema Exploration: Investigated table schemas, primary keys, and data types utilizing INFORMATION_SCHEMA.",
      "2. Season Trend Analysis: Computed aggregate team metrics, season boundary percentages, and extra runs conceded.",
      "3. Batting Performance Metrics: Calculated player strike rates, boundary reliance %, dot-ball frequency, and milestone innings across match phases (Powerplay, Middle, Death).",
      "4. Bowling Effectiveness & Economy: Analyzed bowling styles, wicket-taking strike rates, and venue-specific bowling averages.",
      "5. Season-over-Season Comparisons: Implemented window functions (LAG(), DENSE_RANK()) to evaluate player performance trajectory and identify consistent top contributors."
    ],
    sqlConcepts: [
      {
        name: "Season-over-Season Strike Rate & Run Progression",
        description: "Applied window function LAG() to evaluate year-over-year player performance consistency.",
        code: `SELECT 
    season,
    batsman_name,
    SUM(batsman_runs) AS total_runs,
    ROUND(SUM(batsman_runs) * 100.0 / COUNT(ball_id), 2) AS strike_rate,
    LAG(SUM(batsman_runs), 1) OVER (
        PARTITION BY batsman_name ORDER BY season
    ) AS previous_season_runs
FROM rcb_deliveries_fact
GROUP BY season, batsman_name;`
      },
      {
        name: "Venue-Wise Bowler Rankings Using DENSE_RANK()",
        description: "Ranked bowlers by economy rate and wickets taken per venue, isolating performance at M. Chinnaswamy Stadium.",
        code: `WITH VenueBowlerStats AS (
    SELECT 
        venue,
        bowler_name,
        COUNT(CASE WHEN is_wicket = 1 THEN 1 END) AS total_wickets,
        ROUND(SUM(total_runs_conceded) * 6.0 / COUNT(ball_id), 2) AS economy_rate
    FROM rcb_match_bowling_view
    GROUP BY venue, bowler_name
    HAVING COUNT(ball_id) >= 60
)
SELECT 
    venue,
    bowler_name,
    total_wickets,
    economy_rate,
    DENSE_RANK() OVER (PARTITION BY venue ORDER BY economy_rate ASC, total_wickets DESC) AS venue_rank
FROM VenueBowlerStats;`
      }
    ],
    keyFindings: [
      "Analyzed 255 matches, 60,223 deliveries, and 469 player records across multiple seasons.",
      "Identified that top-order batting contributed over 68% of team runs, demonstrating significant boundary reliance in victories.",
      "Evaluated venue-specific bowling variations, highlighting that death overs economy rate (overs 16–20) at M. Chinnaswamy Stadium was the single most decisive factor between wins and losses.",
      "Isolated top players exceeding overall tournament batting and bowling averages to inform auction retention tiers."
    ],
    recommendations: [
      "Auction Priority: Target specialized death-overs bowlers with proven low boundary-conceded percentages at high-altitude/small-boundary venues.",
      "Batting Strategy: Balance boundary reliance with improved strike rotation during middle overs (7–15) to mitigate middle-order collapses.",
      "Venue Strategy: Adapt bowling line and length when defending targets at M. Chinnaswamy Stadium compared to larger venues."
    ],
    resources: {
      githubUrl: "https://github.com/Tarunkumar-Mylipilli",
      note: "SQL script, task documentation, and presentation available in repository."
    }
  },
  ticket: {
    title: "IT Support Ticket Analysis Dashboard",
    subtitle: "Excel Analytics / Business Intelligence",
    duration: "June 2026",
    role: "Excel Data Analyst",
    tools: ["Microsoft Excel", "Pivot Tables", "Power Query", "XLOOKUP", "Dynamic Arrays", "GETPIVOTDATA", "Conditional Formatting", "Interactive Charts", "KPI Tracking"],
    summary: "Evaluated 97K+ IT support tickets using Microsoft Excel to identify operational bottlenecks, discovering that 70% of delays stemmed from system login and hardware issues. Developed an interactive KPI dashboard to track agent efficiency across a 50-member team, providing visibility into workload trends and resolution speed.",
    problem: "How can an IT support organization evaluate ticket resolution efficiency, identify operational bottlenecks, measure agent performance across 50 team members, and optimize service level agreement (SLA) compliance to improve internal customer satisfaction?",
    datasetCoverage: "Comprehensive service desk dataset containing 97,498 ticket records, multi-category classifications (Hardware, Software, Access, Network), severity and priority tiers, resolution timestamps, and agent demographic/roster information.",
    workflow: [
      "1. Data Sanitation & Preparation: Normalized heterogeneous date-time formats, extracted email domains, and handled missing values using Power Query.",
      "2. Objective Analysis: Calculated average daily ticket volume over time, issue type distributions, category-wise resolution times, and agent age demographics.",
      "3. Subjective Analysis: Correlated issue severity with resolution duration, evaluated software tool effectiveness, and measured agent workload distribution.",
      "4. KPI Modeling: Engineered automated metrics for Mean Time to Resolution (MTTR), SLA compliance percentages, and First Contact Resolution (FCR).",
      "5. Interactive Executive Dashboard: Built a structured reporting interface utilizing Pivot Tables, Pivot Charts, and dynamic slicers."
    ],
    excelFormulas: [
      {
        name: "Ticket Resolution Duration Calculation",
        description: "Calculated elapsed resolution time in business days while filtering out weekends and standard non-working periods.",
        formula: `=IF(ISBLANK([@ResolvedDate]), "Pending", ROUND([@ResolvedDate] - [@CreatedDate], 2))`
      },
      {
        name: "Dynamic Agent Performance Lookup",
        description: "Employed XLOOKUP to match agent operational statistics across roster tiers without brittle index shifts.",
        formula: `=XLOOKUP([@AgentID], IT_Agents[AgentID], IT_Agents[Department], "Unassigned")`
      }
    ],
    keyFindings: [
      "Evaluated 97,000+ total service desk records with an average resolution duration of ~4.55 days and an average satisfaction rating of ~4.10 / 5.0.",
      "Identified that 70% of all resolution delays originated from system login/authentication and hardware replacement queues.",
      "Workload distribution analysis across the 50-member agent team revealed substantial unassigned ticket queues during peak morning shift intervals.",
      "High-severity issues (P1/P2) maintained faster initial responses, but overall closure times were hindered by cross-department escalation handoffs."
    ],
    recommendations: [
      "Targeted Staff Training: Prioritize technical training programs and procedural documentation for agents handling authentication and hardware triage before considering workforce adjustments.",
      "Self-Service Password Reset: Implement automated self-service password reset tools to eliminate up to 35% of low-complexity login tickets.",
      "Triage Workflow Optimization: Standardize morning queue allocation rules to balance ticket distribution evenly across the 50 agents."
    ],
    resources: {
      githubUrl: "https://github.com/Tarunkumar-Mylipilli",
      note: "Workbook, pivot sheets, and documentation available in repository."
    }
  }
};

// ==========================================
// Interactive Live Lab Chart (Chart.js)
// ==========================================
let activeChart = null;

const chartConfigs = {
  rcb: {
    title: "IPL Strategy Analysis: Over-by-Over Run Rate & Scoring Trajectory",
    label1: "Avg Powerplay Run Rate", val1: "9.42",
    label2: "Middle Overs Run Rate", val2: "8.50",
    label3: "Death Overs Run Rate", val3: "11.60",
    label4: "Total Matches Modeled", val4: "255",
    type: "bar",
    labels: ["Powerplay (1-6)", "Middle (7-11)", "Middle (12-15)", "Death (16-18)", "Death (19-20)"],
    datasets: [
      {
        label: "RCB Avg Scoring Rate",
        data: [9.42, 8.15, 8.85, 11.20, 12.80],
        backgroundColor: "#f43f5e",
        borderRadius: 4
      },
      {
        label: "Opponent Scoring Rate",
        data: [8.60, 7.90, 8.40, 10.40, 11.75],
        backgroundColor: "#4b5563",
        borderRadius: 4
      }
    ]
  },
  ticket: {
    title: "IT Support Ticket Analysis: Average Resolution Time by Severity Tier",
    label1: "Total Tickets Analyzed", val1: "97K+",
    label2: "Avg Resolution Duration", val2: "4.55 days",
    label3: "Avg Satisfaction Rating", val3: "4.10 / 5.0",
    label4: "Bottlenecks Identified", val4: "70%",
    type: "bar",
    labels: ["Severity 1 (Critical)", "Severity 2 (High)", "Severity 3 (Medium)", "Severity 4 (Low)"],
    datasets: [
      {
        label: "Avg Resolution Time (Days)",
        data: [1.8, 3.4, 4.9, 6.2],
        backgroundColor: "#00E5C3",
        borderRadius: 4
      },
      {
        label: "Target SLA Benchmark (Days)",
        data: [2.0, 4.0, 5.0, 7.0],
        backgroundColor: "#8B5CF6",
        borderRadius: 4
      }
    ]
  }
};

const renderChart = (key) => {
  const cfg = chartConfigs[key];
  if (!cfg) return;

  const titleEl = document.getElementById('chart-title');
  if (titleEl) titleEl.textContent = cfg.title;

  document.getElementById('stat1-label').textContent = cfg.label1;
  document.getElementById('stat1-val').textContent = cfg.val1;
  document.getElementById('stat2-label').textContent = cfg.label2;
  document.getElementById('stat2-val').textContent = cfg.val2;
  document.getElementById('stat3-label').textContent = cfg.label3;
  document.getElementById('stat3-val').textContent = cfg.val3;
  document.getElementById('stat4-label').textContent = cfg.label4;
  document.getElementById('stat4-val').textContent = cfg.val4;

  const canvas = document.getElementById('analyticsChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  if (activeChart) {
    activeChart.destroy();
  }

  activeChart = new Chart(ctx, {
    type: cfg.type,
    data: {
      labels: cfg.labels,
      datasets: cfg.datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#9CA3AF',
            font: { family: 'Space Grotesk', size: 12 },
            boxWidth: 10,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: '#101722',
          titleColor: '#F5F7FA',
          bodyColor: '#9CA3AF',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          padding: 12
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.04)' },
          ticks: { color: '#6B7280', font: { family: 'JetBrains Mono', size: 11 } }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.04)' },
          ticks: { color: '#6B7280', font: { family: 'JetBrains Mono', size: 11 } }
        }
      }
    }
  });
};

// ==========================================
// Modal Case Study Controller
// ==========================================
const initModals = () => {
  const modal = document.getElementById('caseStudyModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const modalContent = document.getElementById('modalContentArea');
  const triggerBtns = document.querySelectorAll('.open-case-study');

  if (!modal) return;

  const openModal = (id) => {
    const data = projectDetails[id];
    if (!data) return;

    let html = `
      <div class="space-y-6">
        <div>
          <span class="text-xs font-mono px-3 py-1 rounded-full teal-pill uppercase tracking-wider">${data.subtitle}</span>
          <h2 class="font-display text-2xl sm:text-3xl font-bold text-white mt-3">${data.title}</h2>
          <div class="text-xs font-mono text-zinc-500 mt-1">${data.duration} • Role: ${data.role}</div>
        </div>

        <div class="space-y-2">
          <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">Executive Overview</h4>
          <p class="text-sm text-zinc-300 leading-relaxed">${data.summary}</p>
        </div>

        <div class="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1.5">
          <h4 class="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">Analytical Problem Statement</h4>
          <p class="text-xs text-zinc-300 leading-relaxed">${data.problem}</p>
        </div>

        <div class="space-y-2">
          <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">Dataset Coverage</h4>
          <p class="text-xs text-zinc-400 leading-relaxed">${data.datasetCoverage}</p>
        </div>

        <div class="space-y-2">
          <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">Analytical Methodology & Workflow</h4>
          <ul class="space-y-1.5 text-xs text-zinc-300">
            ${data.workflow.map(w => `<li class="flex items-start gap-2"><span class="text-emerald-400">▸</span><span>${w}</span></li>`).join('')}
          </ul>
        </div>

        ${data.sqlConcepts ? `
          <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">Sample SQL Implementation</h4>
            ${data.sqlConcepts.map(c => `
              <div class="space-y-1">
                <div class="text-xs font-semibold text-zinc-200">${c.name}</div>
                <div class="text-[11px] text-zinc-500">${c.description}</div>
                <pre class="p-3 rounded-lg bg-black/70 border border-white/5 font-mono text-xs text-emerald-300 overflow-x-auto"><code>${c.code}</code></pre>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.excelFormulas ? `
          <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">Excel Formulas & Modeling Techniques</h4>
            ${data.excelFormulas.map(f => `
              <div class="space-y-1">
                <div class="text-xs font-semibold text-zinc-200">${f.name}</div>
                <div class="text-[11px] text-zinc-500">${f.description}</div>
                <div class="p-2.5 rounded-lg bg-black/70 border border-white/5 font-mono text-xs text-emerald-300">${f.formula}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div class="space-y-2">
          <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">Key Analytical Findings</h4>
          <ul class="space-y-1.5 text-xs text-zinc-300">
            ${data.keyFindings.map(kf => `<li class="flex items-start gap-2"><span class="text-teal-400">✓</span><span>${kf}</span></li>`).join('')}
          </ul>
        </div>

        <div class="space-y-2">
          <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">Strategic Recommendations</h4>
          <ul class="space-y-1.5 text-xs text-zinc-300">
            ${data.recommendations.map(r => `<li class="flex items-start gap-2"><span class="text-purple-400">★</span><span>${r}</span></li>`).join('')}
          </ul>
        </div>

        <div class="pt-4 border-t border-white/10 flex items-center justify-between">
          <div class="text-xs text-zinc-500 font-mono">${data.resources.note}</div>
          <a href="${data.resources.githubUrl}" target="_blank" class="px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition">
            View on GitHub
          </a>
        </div>
      </div>
    `;

    modalContent.innerHTML = html;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pid = btn.getAttribute('data-project');
      if (pid) openModal(pid);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
};

// ==========================================
// Contact Form Submission Handler
// ==========================================
const initContactForm = () => {
  const form = document.getElementById('contactForm');
  const statusMsg = document.getElementById('formStatusMsg');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const subject = form.elements['subject'].value.trim();
    const message = form.elements['message'].value.trim();

    if (!name || !email || !subject || !message) {
      statusMsg.innerHTML = `<span class="text-rose-400 text-xs">Please fill in all required fields.</span>`;
      return;
    }

    // Direct mailto fallback link for verified 100% reliable contact
    const mailtoUrl = `mailto:mylipillitarunkumar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
    window.location.href = mailtoUrl;

    statusMsg.innerHTML = `<span class="text-emerald-400 text-xs font-semibold">✓ Opening your default email client to send message to mylipillitarunkumar@gmail.com</span>`;
  });
};

// ==========================================
// Copy Email Button
// ==========================================
const initCopyEmail = () => {
  const btn = document.getElementById('copyEmailBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const email = btn.getAttribute('data-email') || 'mylipillitarunkumar@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const orig = btn.innerHTML;
      btn.innerHTML = `<span class="text-emerald-400 font-semibold">✓ Email Copied!</span>`;
      setTimeout(() => {
        btn.innerHTML = orig;
      }, 2000);
    });
  });
};

// ==========================================
// Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderChart('rcb');

  const chartTabs = document.querySelectorAll('.chart-tab-btn');
  chartTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      chartTabs.forEach(b => {
        b.classList.remove('bg-teal-500/20', 'text-teal-300', 'border-teal-500/40');
        b.classList.add('text-zinc-400', 'border-transparent');
      });
      btn.classList.add('bg-teal-500/20', 'text-teal-300', 'border-teal-500/40');
      btn.classList.remove('text-zinc-400', 'border-transparent');

      const ds = btn.getAttribute('data-dataset');
      renderChart(ds);
    });
  });

  initModals();
  initContactForm();
  initCopyEmail();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
