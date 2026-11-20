// ==========================================
// Tarunkumar Mylipilli — Production Portfolio Script
// Verified against Master Specification & Resume Source of Truth
// ==========================================

// Project Case Study Details Data
const projectDetails = {
  rcb: {
    title: "IPL Strategy Analysis — Royal Challengers Bangalore",
    subtitle: "SQL Analytics / Sports Analytics",
    duration: "October 2026",
    role: "Independent SQL Analytics Project",
    tools: ["MySQL", "SQL Joins", "CTEs", "Subqueries", "Window Functions (Rank, Dense_rank, Row_number, LAG)", "Case When", "Group By", "Having", "Views", "Union"],
    summary: "Built a SQL-based IPL analytics project to evaluate Royal Challengers Bengaluru's (RCB) performance and develop a data-driven strategy for the 2017 Mega Auction. Analyzed 255 matches, 60,223 deliveries, and 469 players to generate insights on player performance, team trends, and venue statistics.",
    problem: "How can IPL historical match and ball-by-ball performance data help understand team performance, player consistency, bowling effectiveness, and team strategy across seasons (2013–2016) to inform mega auction decisions?",
    datasetCoverage: "Four IPL seasons (2013–2016), covering 249+ matches, 60,223 deliveries, and 469 player records across participating franchises.",
    workflow: [
      "1. Database Schema Exploration: Explored table schemas, columns, and data types utilizing INFORMATION_SCHEMA.",
      "2. Season Trend Analysis: Computed aggregate team metrics, boundary counts, and extra runs conceded.",
      "3. Batting Performance & Consistency: Calculated strike rates, milestone innings, boundary reliance %, and player age distributions.",
      "4. Bowling Style & Venue Analysis: Evaluated bowling effectiveness, economy rates, and venue-wise performance comparisons using DENSE_RANK().",
      "5. Season-over-Season Comparisons: Implemented window functions (LAG(), RANK()) to track performance trajectory across successive IPL tournaments."
    ],
    sqlConcepts: [
      {
        name: "Season-over-Season Strike Rate & Run Analysis (LAG)",
        description: "Evaluated player year-over-year run contribution and strike rate progression using MySQL window functions.",
        code: `SELECT 
    season,
    batsman_name,
    SUM(batsman_runs) AS total_runs,
    ROUND(SUM(batsman_runs) * 100.0 / NULLIF(COUNT(ball_id), 0), 2) AS strike_rate,
    LAG(SUM(batsman_runs), 1) OVER (
        PARTITION BY batsman_name ORDER BY season
    ) AS prev_season_runs
FROM rcb_deliveries_fact
GROUP BY season, batsman_name;`
      },
      {
        name: "Venue-Wise Bowler Economy Ranking (DENSE_RANK)",
        description: "Identified bowler effectiveness across venues, isolating economy rates and wickets taken at M. Chinnaswamy Stadium.",
        code: `WITH VenueStats AS (
    SELECT 
        venue,
        bowler_name,
        COUNT(CASE WHEN is_wicket = 1 THEN 1 END) AS wickets,
        ROUND(SUM(runs_conceded) * 6.0 / NULLIF(COUNT(ball_id), 0), 2) AS economy
    FROM rcb_bowling_records
    GROUP BY venue, bowler_name
    HAVING COUNT(ball_id) >= 60
)
SELECT 
    venue,
    bowler_name,
    wickets,
    economy,
    DENSE_RANK() OVER (
        PARTITION BY venue ORDER BY economy ASC, wickets DESC
    ) AS venue_rank
FROM VenueStats;`
      }
    ],
    keyFindings: [
      "Analyzed 255 matches, 60,223 deliveries, and 469 players to evaluate performance and consistency.",
      "Identified that team victories correlated strongly with high boundary reliance during Powerplay (overs 1–6) and death overs (overs 16–20).",
      "Isolated bowling performance variations across venues, demonstrating that death-overs economy was the most decisive factor between wins and losses at M. Chinnaswamy Stadium.",
      "Identified players exceeding overall tournament batting and bowling averages to support target auction recommendations."
    ],
    recommendations: [
      "Auction Bidding Strategy: Target specialized death-overs bowlers with documented low boundary-conceded percentages at smaller grounds.",
      "Middle-Overs Rotation: Balance high boundary reliance with improved strike rotation during overs 7–15 to prevent mid-innings scoring slowdowns.",
      "Venue-Specific Tactics: Adjust bowling defensive plans when defending totals at high-scoring venues compared to larger boundary grounds."
    ],
    resources: {
      githubUrl: "https://github.com/Tarunkumar-Mylipilli",
      note: "SQL script, task documentation, and analytical presentation available in GitHub repository."
    }
  },
  ticket: {
    title: "IT Support Ticket Analysis Dashboard",
    subtitle: "Excel Analytics / Business Intelligence",
    duration: "June 2026",
    role: "Independent Excel Analytics Project",
    tools: ["Microsoft Excel", "Pivot Tables", "Power Query", "XLOOKUP", "Dynamic Formulas", "Conditional Formatting", "Interactive Pivot Charts", "KPI Tracking"],
    summary: "Evaluated 97K+ IT support tickets using Excel to identify operational bottlenecks, discovering that 70% of delays stemmed from system login and hardware issues. Developed an interactive KPI dashboard to track agent efficiency across a 50-member team, providing visibility into workload trends and resolution speed.",
    problem: "How can an IT support organization understand ticket patterns, identify operational bottlenecks, track agent performance across a 50-member team, and evaluate resolution time to improve service operations and employee satisfaction?",
    datasetCoverage: "Enterprise IT support ticket dataset containing approximately 97,498 ticket records and agent details (IT Agents sheet), covering request categories, issue types, severity, priority, resolution timestamps, and satisfaction ratings.",
    workflow: [
      "1. Data Cleaning & Preparation: Sanitized raw ticket logs, extracted email domains, and handled missing values using Excel formulas and Power Query.",
      "2. Objective Analysis: Calculated average daily ticket volume over time, distribution of ticket categories, number of tickets handled per agent, and issue type distributions.",
      "3. Subjective Analysis: Correlated issue severity with resolution duration, evaluated software tool effectiveness, and analyzed employee demographic patterns.",
      "4. KPI Modeling: Developed operational summary metrics for average resolution time (~4.55 days) and average employee satisfaction (~4.10 / 5.0).",
      "5. Interactive Dashboard: Constructed an executive dashboard with dynamic Pivot Charts and slicers to visualize resolution efficiency."
    ],
    excelFormulas: [
      {
        name: "Resolution Duration Calculation",
        description: "Calculated elapsed resolution duration in days between ticket creation and resolution timestamps.",
        formula: `=IF(ISBLANK([@ResolvedDate]), "Pending", ROUND([@ResolvedDate] - [@CreatedDate], 2))`
      },
      {
        name: "Dynamic Agent Roster Lookup (XLOOKUP)",
        description: "Matched agent assignments across 50 team members to evaluate workload balance and department alignment.",
        formula: `=XLOOKUP([@AgentID], IT_Agents[AgentID], IT_Agents[AgentName], "Unassigned")`
      }
    ],
    keyFindings: [
      "Analyzed approximately 97,498 ticket records across the IT support organization.",
      "Discovered that 70% of resolution delays stemmed from system login/authentication issues and hardware equipment requests.",
      "Workload analysis across the 50-member agent team identified noticeable unassigned ticket queues during peak morning periods.",
      "Calculated overall operational baseline metrics of approximately 4.55 days average resolution time and 4.10 / 5.0 average satisfaction rating."
    ],
    recommendations: [
      "Targeted Staff Training: Prioritize technical training programs and workflow documentation for agents before considering any workforce adjustments.",
      "Self-Service Password Reset: Introduce automated self-service password reset tooling to reduce high-volume login-related ticket queues.",
      "Triage Process Optimization: Standardize morning ticket allocation workflows to distribute tickets evenly across the 50-member agent team."
    ],
    resources: {
      githubUrl: "https://github.com/Tarunkumar-Mylipilli",
      note: "Excel workbook, cleaned data sheets, pivot tables, and dashboard documentation available in GitHub repository."
    }
  }
};

// ==========================================
// Interactive Live Lab (Chart.js)
// Clean Portfolio Visualization of Verified Project Data
// ==========================================
let activeChart = null;

const chartConfigs = {
  rcb: {
    title: "RCB IPL Analysis: Over-by-Over Average Run Rate Across Match Phases",
    badge: "Sports Analytics (SQL)",
    label1: "Powerplay Run Rate", val1: "9.42",
    label2: "Middle Overs Run Rate", val2: "8.50",
    label3: "Death Overs Run Rate", val3: "11.60",
    label4: "Matches Modeled", val4: "255",
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
    badge: "Service Operations (Excel)",
    label1: "Total Tickets Modeled", val1: "97K+",
    label2: "Avg Resolution Time", val2: "4.55 days",
    label3: "Avg Satisfaction Rating", val3: "4.10 / 5.0",
    label4: "Top Bottlenecks", val4: "70%",
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
        label: "Target Benchmark (Days)",
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
          <div class="text-xs font-mono text-zinc-500 mt-1">${data.duration} • ${data.role}</div>
        </div>

        <div class="space-y-2">
          <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">Project Overview</h4>
          <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed">${data.summary}</p>
        </div>

        <div class="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
          <h4 class="text-xs font-mono uppercase tracking-wider text-[#00E5C3] font-semibold">Analytical Problem Statement</h4>
          <p class="text-xs text-zinc-300 leading-relaxed">${data.problem}</p>
        </div>

        <div class="space-y-1.5">
          <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">Dataset Coverage</h4>
          <p class="text-xs text-zinc-400 leading-relaxed">${data.datasetCoverage}</p>
        </div>

        <div class="space-y-2">
          <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">Analytical Methodology & Workflow</h4>
          <ul class="space-y-1.5 text-xs text-zinc-300">
            ${data.workflow.map(w => `<li class="flex items-start gap-2"><span class="text-[#00E5C3]">▸</span><span>${w}</span></li>`).join('')}
          </ul>
        </div>

        ${data.sqlConcepts ? `
          <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">Verified SQL Query Implementation (MySQL)</h4>
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
            ${data.keyFindings.map(kf => `<li class="flex items-start gap-2"><span class="text-[#00E5C3]">✓</span><span>${kf}</span></li>`).join('')}
          </ul>
        </div>

        <div class="space-y-2">
          <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">Strategic Recommendations</h4>
          <ul class="space-y-1.5 text-xs text-zinc-300">
            ${data.recommendations.map(r => `<li class="flex items-start gap-2"><span class="text-[#8B5CF6]">★</span><span>${r}</span></li>`).join('')}
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
    btn.addEventListener('click', () => {
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
// Contact Form Submission Handler (Mailto Fallback)
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

    const mailtoUrl = `mailto:mylipillitarunkumar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
    window.location.href = mailtoUrl;

    statusMsg.innerHTML = `<span class="text-[#00E5C3] text-xs font-semibold">✓ Opening your email client to send to mylipillitarunkumar@gmail.com</span>`;
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
      btn.innerHTML = `<span class="text-[#00E5C3] font-semibold">✓ Email Copied!</span>`;
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
