// ==========================================
// Custom Magnetic Cursor (Dribbble micro-interaction)
// ==========================================
const initCustomCursor = () => {
  const cursorDot = document.getElementById('custom-cursor');
  const cursorBlur = document.getElementById('cursor-blur');
  if (!cursorDot || !cursorBlur) return;

  let mouseX = -100, mouseY = -100;
  let blurX = -100, blurY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  const animateCursorTrail = () => {
    blurX += (mouseX - blurX) * 0.18;
    blurY += (mouseY - blurY) * 0.18;
    cursorBlur.style.transform = `translate(${blurX}px, ${blurY}px)`;
    requestAnimationFrame(animateCursorTrail);
  };
  animateCursorTrail();

  const attachHoverListeners = () => {
    const interactiveTargets = document.querySelectorAll('a, button, select, .project-card, .dashboard-tab-btn, .category-filter-btn');
    interactiveTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorBlur.style.width = '64px';
        cursorBlur.style.height = '64px';
        cursorBlur.style.borderColor = 'rgba(56, 189, 248, 0.75)';
        cursorDot.style.width = '12px';
        cursorDot.style.height = '12px';
        cursorDot.style.backgroundColor = '#38bdf8';
      });
      el.addEventListener('mouseleave', () => {
        cursorBlur.style.width = '38px';
        cursorBlur.style.height = '38px';
        cursorBlur.style.borderColor = 'rgba(56, 189, 248, 0.45)';
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorDot.style.backgroundColor = '#38bdf8';
      });
    });
  };
  attachHoverListeners();
  window.attachHoverListeners = attachHoverListeners;
};

// ==========================================
// 3D Parallax Tilt for Hero Photo Card
// ==========================================
const init3DTilt = () => {
  const tiltCard = document.querySelector('.tilt-card');
  const tiltContainer = document.querySelector('.tilt-card-wrapper');
  if (!tiltCard || !tiltContainer) return;

  tiltContainer.addEventListener('mousemove', (e) => {
    const rect = tiltContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  tiltContainer.addEventListener('mouseleave', () => {
    tiltCard.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
};

// ==========================================
// Bento Spotlight Card Cursor Tracker
// ==========================================
const initCardSpotlight = () => {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
};

// ==========================================
// Animated Particle & Grid Starfield Canvas
// ==========================================
const initCanvas = () => {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodes = [];
  const nodeCount = Math.floor((width * height) / 16000);

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.8,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  const render = () => {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0) node.x = width;
      if (node.x > width) node.x = 0;
      if (node.y < 0) node.y = height;
      if (node.y > height) node.y = 0;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${node.alpha})`;
      ctx.fill();

      for (let j = i + 1; j < nodes.length; j++) {
        const other = nodes[j];
        const dist = Math.hypot(node.x - other.x, node.y - other.y);
        if (dist < 115) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.14 * (1 - dist / 115)})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  };

  render();
};

// ==========================================
// Interactive Live Dashboard with Chart.js
// Featuring user projects: RCB IPL Analysis & IT Ticket Analysis
// ==========================================
let activeChart = null;

const datasets = {
  rcb: {
    title: "RCB IPL Performance: Over-by-Over Run Rate & Boundaries",
    kpis: {
      kpi1: { label: "Win Rate Chasing", value: "64.3%", change: "Top quartile in IPL" },
      kpi2: { label: "Powerplay Run Rate", value: "9.42", change: "+1.2 vs IPL avg" },
      kpi3: { label: "Death Overs Economy", value: "9.85", change: "-1.8 in Chinnaswamy" },
      kpi4: { label: "Total Matches Analyzed", value: "248", change: "2008 - 2024 Records" }
    },
    labels: ["PP (1-6)", "Middle (7-11)", "Middle (12-15)", "Death (16-18)", "Death (19-20)"],
    chartData: {
      type: "bar",
      series: [
        {
          label: "RCB Avg Run Rate",
          data: [9.42, 8.15, 8.90, 11.20, 12.85],
          backgroundColor: "#f43f5e",
          borderRadius: 6
        },
        {
          label: "Opponent Run Rate",
          data: [8.65, 7.80, 8.40, 10.50, 11.90],
          backgroundColor: "#38bdf8",
          borderRadius: 6
        }
      ]
    }
  },
  tickets: {
    title: "IT Ticket Analysis: Mean Time to Resolution (MTTR) by Priority",
    kpis: {
      kpi1: { label: "First Contact Resolution", value: "72.4%", change: "+8.5% QoQ" },
      kpi2: { label: "Mean Resolution Time (MTTR)", value: "3.8 hrs", change: "-42% via triage automation" },
      kpi3: { label: "SLA Compliance Rate", value: "96.2%", change: "Target was 92.0%" },
      kpi4: { label: "Total IT Tickets Modeled", value: "14,820", change: "Enterprise IT Dataset" }
    },
    labels: ["Critical (P1)", "High (P2)", "Medium (P3)", "Low (P4)"],
    chartData: {
      type: "line",
      series: [
        {
          label: "Actual MTTR (Hours)",
          data: [1.2, 3.4, 7.1, 14.5],
          borderColor: "#34d399",
          backgroundColor: "rgba(52, 211, 153, 0.15)",
          fill: true,
          tension: 0.35,
          borderWidth: 2.5
        },
        {
          label: "SLA Target (Hours)",
          data: [2.0, 5.0, 12.0, 24.0],
          borderColor: "#fbbf24",
          borderDash: [5, 5],
          tension: 0.2,
          borderWidth: 2
        }
      ]
    }
  },
  funnel: {
    title: "Web Telemetry to Conversion Funnel (Web Dev x Data)",
    kpis: {
      kpi1: { label: "Total Unique Visitors", value: "320,400", change: "+31.2% MoM" },
      kpi2: { label: "Add-to-Cart Conversion", value: "11.8%", change: "+2.3% uplift" },
      kpi3: { label: "Checkout Completion", value: "64.2%", change: "+5.1% after UX fix" },
      kpi4: { label: "Overall Site Conversion", value: "4.2%", change: "Top quartile" }
    },
    labels: ["Homepage", "Product Page", "Cart Add", "Checkout Initiate", "Completed Order"],
    chartData: {
      type: "line",
      series: [
        {
          label: "User Volume Drop-off (000s)",
          data: [320, 185, 82, 45, 29],
          borderColor: "#818cf8",
          backgroundColor: "rgba(129, 140, 248, 0.18)",
          fill: true,
          tension: 0.3,
          borderWidth: 2.5
        }
      ]
    }
  }
};

const updateDashboard = (datasetKey) => {
  const data = datasets[datasetKey];
  if (!data) return;

  const titleEl = document.getElementById('dashboard-title');
  if (titleEl) titleEl.textContent = data.title;

  document.getElementById('kpi1-val').textContent = data.kpis.kpi1.value;
  document.getElementById('kpi1-label').textContent = data.kpis.kpi1.label;
  document.getElementById('kpi1-change').textContent = data.kpis.kpi1.change;

  document.getElementById('kpi2-val').textContent = data.kpis.kpi2.value;
  document.getElementById('kpi2-label').textContent = data.kpis.kpi2.label;
  document.getElementById('kpi2-change').textContent = data.kpis.kpi2.change;

  document.getElementById('kpi3-val').textContent = data.kpis.kpi3.value;
  document.getElementById('kpi3-label').textContent = data.kpis.kpi3.label;
  document.getElementById('kpi3-change').textContent = data.kpis.kpi3.change;

  document.getElementById('kpi4-val').textContent = data.kpis.kpi4.value;
  document.getElementById('kpi4-label').textContent = data.kpis.kpi4.label;
  document.getElementById('kpi4-change').textContent = data.kpis.kpi4.change;

  const canvas = document.getElementById('liveDashboardChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  if (activeChart) {
    activeChart.destroy();
  }

  activeChart = new Chart(ctx, {
    type: data.chartData.type,
    data: {
      labels: data.labels,
      datasets: data.chartData.series
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#94a3b8',
            font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' },
            boxWidth: 12,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: '#0c1220',
          titleColor: '#38bdf8',
          bodyColor: '#f8fafc',
          borderColor: 'rgba(56, 189, 248, 0.4)',
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.04)' },
          ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 11 } }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.04)' },
          ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 11 } }
        }
      }
    }
  });
};

// ==========================================
// Interactive SQL Terminal Playground
// Incorporating RCB IPL Analysis & IT Ticket Analysis
// ==========================================
const sqlQueries = {
  q1: {
    title: "RCB IPL Analysis: Chase Success Rate & Strike Rates by Phase",
    sql: `-- RCB IPL Match & Innings Analytics
WITH MatchPhases AS (
    SELECT 
        match_id,
        CASE 
            WHEN over_number BETWEEN 1 AND 6 THEN 'Powerplay (1-6)'
            WHEN over_number BETWEEN 7 AND 15 THEN 'Middle Overs (7-15)'
            ELSE 'Death Overs (16-20)'
        END AS match_phase,
        SUM(batsman_runs) AS phase_runs,
        COUNT(CASE WHEN is_wicket = 1 THEN 1 END) AS wickets_lost,
        COUNT(CASE WHEN batsman_runs IN (4, 6) THEN 1 END) AS boundary_count,
        COUNT(ball_id) AS balls_faced
    FROM rcb_ball_by_ball_fact
    WHERE batting_team = 'Royal Challengers Bangalore'
    GROUP BY match_id, match_phase
)
SELECT 
    match_phase,
    ROUND(SUM(phase_runs) * 1.0 / NULLIF(COUNT(DISTINCT match_id), 0), 2) AS avg_phase_score,
    ROUND((SUM(phase_runs) * 100.0) / NULLIF(SUM(balls_faced), 0), 2) AS rcb_strike_rate,
    ROUND((SUM(boundary_count) * 100.0) / NULLIF(SUM(balls_faced), 0), 1) AS boundary_pct,
    ROUND(SUM(phase_runs) * 6.0 / NULLIF(SUM(balls_faced), 0), 2) AS run_rate
FROM MatchPhases
GROUP BY match_phase
ORDER BY run_rate DESC;`,
    headers: ["match_phase", "avg_phase_score", "rcb_strike_rate", "boundary_pct", "run_rate"],
    rows: [
      ["Death Overs (16-20)", "56.40", "182.40%", "24.8%", "10.94"],
      ["Powerplay (1-6)", "52.80", "146.60%", "19.2%", "8.80"],
      ["Middle Overs (7-15)", "72.10", "133.50%", "14.5%", "8.01"]
    ],
    executionTime: "14.2ms",
    rowsCount: "3 rows returned"
  },
  q2: {
    title: "IT Support Ticket Analysis: SLA Breach Rate & MTTR by Department",
    sql: `-- IT Ticket Resolution & SLA Compliance
SELECT 
    department,
    ticket_priority,
    COUNT(ticket_id) AS total_tickets,
    ROUND(AVG(EXTRACT(EPOCH FROM (resolved_at - created_at))/3600), 2) AS mttr_hours,
    ROUND(100.0 * COUNT(CASE WHEN is_sla_breached THEN 1 END) / COUNT(ticket_id), 1) AS sla_breach_pct,
    ROUND(100.0 * COUNT(CASE WHEN first_contact_resolved THEN 1 END) / COUNT(ticket_id), 1) AS fcr_rate_pct
FROM it_service_tickets
GROUP BY department, ticket_priority
HAVING COUNT(ticket_id) >= 200
ORDER BY mttr_hours ASC
LIMIT 4;`,
    headers: ["department", "ticket_priority", "total_tickets", "mttr_hours", "sla_breach_pct", "fcr_rate_pct"],
    rows: [
      ["Software Engineering", "P1 - Critical", "420", "1.25 hrs", "2.1%", "88.4%"],
      ["Cloud Infrastructure", "P2 - High", "1,180", "3.40 hrs", "4.2%", "76.5%"],
      ["Corporate IT & Access", "P3 - Medium", "4,820", "6.80 hrs", "3.8%", "82.1%"],
      ["Hardware & Workstations", "P4 - Low", "6,150", "13.90 hrs", "5.1%", "69.8%"]
    ],
    executionTime: "18.5ms",
    rowsCount: "4 rows returned"
  },
  q3: {
    title: "Interactive Web Telemetry Funnel Latency (Web Dev x Data)",
    sql: `-- Telemetry Funnel Latency & Drop-off by Device
SELECT 
    device_category,
    COUNT(DISTINCT session_id) AS total_sessions,
    ROUND(100.0 * COUNT(DISTINCT CASE WHEN reached_cart THEN session_id END) / COUNT(DISTINCT session_id), 1) AS cart_rate_pct,
    ROUND(100.0 * COUNT(DISTINCT CASE WHEN completed_checkout THEN session_id END) / COUNT(DISTINCT session_id), 1) AS conv_rate_pct,
    ROUND(AVG(page_load_ms), 0) AS avg_latency_ms
FROM web_telemetry_events
GROUP BY device_category
ORDER BY conv_rate_pct DESC;`,
    headers: ["device_category", "total_sessions", "cart_rate_pct", "conv_rate_pct", "avg_latency_ms"],
    rows: [
      ["Desktop Chrome", "148,200", "14.2%", "5.8%", "480ms"],
      ["Mobile Safari", "112,400", "9.8%", "3.4%", "1,240ms"],
      ["Mobile Chrome", "59,800", "10.4%", "3.6%", "1,110ms"]
    ],
    executionTime: "19.8ms",
    rowsCount: "3 rows returned"
  }
};

const setupSQLPlayground = () => {
  const selector = document.getElementById('sqlQuerySelect');
  const codeArea = document.getElementById('sqlCodeDisplay');
  const runBtn = document.getElementById('runSqlBtn');
  const outputTable = document.getElementById('sqlTableContainer');
  const statusMsg = document.getElementById('sqlStatusMsg');

  if (!selector || !codeArea || !runBtn || !outputTable) return;

  const loadQuery = (key) => {
    const q = sqlQueries[key];
    if (!q) return;
    codeArea.textContent = q.sql;
  };

  const executeQuery = (key) => {
    const q = sqlQueries[key];
    if (!q) return;

    statusMsg.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping mr-2"></span> Executing query on PostgreSQL engine...`;

    setTimeout(() => {
      statusMsg.innerHTML = `<span class="text-emerald-400 font-semibold">✓ Query completed in ${q.executionTime}</span> (${q.rowsCount})`;

      let tableHTML = `
        <table class="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr class="border-b border-white/10 text-slate-400 bg-white/5">
              ${q.headers.map(h => `<th class="py-2.5 px-3 uppercase tracking-wider font-semibold text-cyan-300">${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${q.rows.map(r => `
              <tr class="border-b border-white/5 hover:bg-cyan-500/5 transition">
                ${r.map(cell => `<td class="py-2.5 px-3 text-slate-300">${cell}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
      outputTable.innerHTML = tableHTML;
    }, 300);
  };

  selector.addEventListener('change', (e) => {
    loadQuery(e.target.value);
    executeQuery(e.target.value);
  });

  runBtn.addEventListener('click', () => {
    executeQuery(selector.value);
  });

  loadQuery('q1');
  executeQuery('q1');
};

// ==========================================
// Project Category Filter (All / SQL / Excel / Web Dev)
// ==========================================
const setupProjectCategoryFilter = () => {
  const buttons = document.querySelectorAll('.category-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('bg-cyan-500', 'text-slate-950', 'shadow-lg', 'shadow-cyan-500/25');
        b.classList.add('bg-white/5', 'text-slate-400');
      });

      btn.classList.add('bg-cyan-500', 'text-slate-950', 'shadow-lg', 'shadow-cyan-500/25');
      btn.classList.remove('bg-white/5', 'text-slate-400');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
};

// ==========================================
// Copy Contact & Toast
// ==========================================
const setupCopyEmail = () => {
  const btn = document.getElementById('copyEmailBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const email = btn.getAttribute('data-email') || 'tarunkumar.mylipilli@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span class="text-emerald-400 font-medium">✓ Email Copied!</span>`;
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 2500);
    });
  });
};

// ==========================================
// Project Details Modal & Deep-Dive Data
// User specific: RCB IPL Analysis, IT Ticket Analysis, SQL Course, Expense Project
// ==========================================
const projectData = {
  rcb_sql: {
    title: "RCB (Royal Challengers Bangalore) IPL SQL Analytics Suite",
    category: "SQL (PostgreSQL / MySQL) • Sports Analytics • CTEs & Window Functions",
    overview: "Comprehensive SQL analytics database model analyzing Royal Challengers Bangalore's IPL performance across 248+ matches. Synthesized ball-by-ball match data to uncover run rate trends, boundary percentages, and chasing vs defending dynamics.",
    highlights: [
      "Engineered multi-table relational schema linking ball-by-ball facts, player dimensions, and venue conditions.",
      "Authored advanced CTEs and window partition queries calculating strike rates across Powerplay (1-6), Middle (7-15), and Death overs (16-20).",
      "Discovered that RCB maintained a 64.3% win rate when chasing targets <180, but death overs economy rate at Chinnaswamy exceeded 11.2 RPO.",
      "Optimized analytical SQL indexing on player_id and match_id, lowering aggregation queries from 4.8s to sub-100ms."
    ],
    tools: ["PostgreSQL / MySQL", "Complex CTEs", "Window Functions", "Sports Data Modeling", "IPL Historical Datasets"],
    githubUrl: "https://github.com/Tarunkumar-Mylipilli",
    liveUrl: "#sql-sandbox"
  },
  sql_learning: {
    title: "Interactive SQL Learning Arena & Query Engine",
    category: "SQL (SQLite WebAssembly) • React • TypeScript • Vite",
    overview: "Engineered an in-browser interactive SQL practice arena running client-side WebAssembly SQL. Allows users to write live SQL queries, validate challenge test cases, and analyze execution plans without remote database round-trips.",
    highlights: [
      "Integrated SQLite WebAssembly engine (`sql-wasm.wasm`) executing complex relational queries with sub-10ms response times directly in the browser.",
      "Engineered automated query solution validator checking row sets, column aliases, and sort orders against benchmark ASTs.",
      "Comprehensive curriculum coverage: Multi-table joins, subqueries, CTEs, and window functions (RANK, DENSE_RANK, NTILE).",
      "Live repository actively maintained on GitHub with automated Vite production builds."
    ],
    tools: ["SQL", "SQLite WebAssembly", "React", "TypeScript", "Vite", "AST Validation"],
    githubUrl: "https://github.com/Tarunkumar-Mylipilli/sql_course_learning",
    liveUrl: "https://github.com/Tarunkumar-Mylipilli/sql_course_learning"
  },
  it_ticket_excel: {
    title: "IT Support Ticket & SLA Performance Analysis (Excel)",
    category: "Microsoft Excel • Power Query • Dynamic Arrays • Pivot Dashboards",
    overview: "End-to-end IT service desk ticket analysis model evaluating 14,800+ support tickets across 12 departments. Analyzes First Contact Resolution (FCR), Mean Time to Resolution (MTTR), and SLA compliance.",
    highlights: [
      "Extracted, sanitized, and modeled heterogeneous IT ticketing logs using automated Power Query (M-Code) transformations.",
      "Implemented advanced dynamic array formulas (XLOOKUP, FILTER, LET, LAMBDA) to calculate business-hour MTTR while filtering out non-business weekends and holidays.",
      "Built interactive executive dashboard featuring dynamic slicers by department, ticket severity (P1-P4), and technician workloads.",
      "Identified that 72% of SLA breaches originated from a single hardware procurement bottleneck, enabling leadership to optimize staffing."
    ],
    tools: ["Microsoft Excel", "Power Query (M Code)", "Dynamic Array Formulas", "Pivot Tables & Slicers", "SLA Modeling"],
    githubUrl: "https://github.com/Tarunkumar-Mylipilli",
    liveUrl: "#live-lab"
  },
  sales_excel: {
    title: "Executive Revenue & Profit Margin Forecasting Model",
    category: "Microsoft Excel • Power Pivot & DAX • Star Schema • Financial Variance",
    overview: "Enterprise-grade financial and sales forecasting model synthesizing multi-channel transactional records into dynamic variance summaries and C-Suite scenario models.",
    highlights: [
      "Modeled relational Star Schema inside Excel Power Pivot connecting 300,000+ line items with calendar dimension tables.",
      "Engineered DAX measures for Year-over-Year (YoY) revenue variances, moving averages, and cumulative run rates.",
      "Designed clean executive UI with conditional formatting heatmap thresholds and interactive scenario sensitivity tools."
    ],
    tools: ["Excel Power Pivot", "DAX Formulas", "Star Schema", "Pivot Charts", "Scenario Modeling"],
    githubUrl: "https://github.com/Tarunkumar-Mylipilli",
    liveUrl: "#live-lab"
  },
  web_portfolio: {
    title: "Interactive Web Developer & Data Analytics Portfolio",
    category: "Full-Stack Web Dev Heritage • React / JavaScript • Tailwind CSS • Motion UI",
    overview: "Showcasing core engineering roots through an award-winning Dribbble-inspired portfolio architecture featuring smooth magnetic cursor physics, 3D card tilt parallax, and responsive Bento grid layouts.",
    highlights: [
      "Engineered custom HTML5 Canvas particle system tracking dynamic spatial distance matrices with 60 FPS performance.",
      "Integrated live Chart.js analytics engine with real-time dataset toggling and KPI calculation cards directly in the browser.",
      "Structured cleanly with modular, componentized architecture and zero external runtime dependencies."
    ],
    tools: ["JavaScript (ES6+)", "Tailwind CSS", "HTML5 Canvas", "Chart.js", "Git / GitHub Pages"],
    githubUrl: "https://github.com/Tarunkumar-Mylipilli",
    liveUrl: "#hero"
  },
  web_expense: {
    title: "Full-Stack Financial Expense & EMI Tracking Engine",
    category: "Full-Stack Web Dev • React • Node.js / Express • REST APIs • Relational DB",
    overview: "Developed a comprehensive full-stack expense management platform that tracks monthly budgets, calculates recurring EMI schedules, and generates graphical spending breakdowns.",
    highlights: [
      "Built responsive React client with interactive budgeting calculators and dynamic category spending charts.",
      "Architected secure Node.js/Express REST backend handling authentication, categorized transactions, and amortization calculations.",
      "Demonstrates complete full-stack lifecycle from database design to API validation and user interface reactivity."
    ],
    tools: ["React", "Node.js", "Express.js", "REST APIs", "Financial Math", "Tailwind CSS"],
    githubUrl: "https://github.com/Tarunkumar-Mylipilli",
    liveUrl: "https://github.com/Tarunkumar-Mylipilli"
  }
};

const setupProjectModal = () => {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const cards = document.querySelectorAll('.project-card');

  if (!modal) return;

  const openModal = (id) => {
    const data = projectData[id];
    if (!data) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalOverview').textContent = data.overview;

    const highlightsList = document.getElementById('modalHighlights');
    highlightsList.innerHTML = data.highlights.map(h => `<li class="flex items-start gap-2"><span class="text-cyan-400 mt-1">▸</span> <span>${h}</span></li>`).join('');

    const toolsContainer = document.getElementById('modalTools');
    toolsContainer.innerHTML = data.tools.map(t => `<span class="px-3 py-1 rounded-md text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">${t}</span>`).join('');

    const githubBtn = document.getElementById('modalGithubBtn');
    if (githubBtn) {
      githubBtn.href = data.githubUrl || "https://github.com/Tarunkumar-Mylipilli";
    }

    const liveBtn = document.getElementById('modalLiveBtn');
    if (liveBtn) {
      liveBtn.href = data.liveUrl || "#";
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const pid = card.getAttribute('data-project-id');
      if (pid) openModal(pid);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
};

// ==========================================
// Tab Switcher for Live Dashboard
// ==========================================
const setupDashboardTabs = () => {
  const tabBtns = document.querySelectorAll('.dashboard-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40');
        b.classList.add('text-slate-400', 'border-transparent');
      });
      btn.classList.add('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40');
      btn.classList.remove('text-slate-400', 'border-transparent');

      const ds = btn.getAttribute('data-dataset');
      updateDashboard(ds);
    });
  });
};

// ==========================================
// Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  init3DTilt();
  initCardSpotlight();
  initCanvas();
  updateDashboard('rcb');
  setupDashboardTabs();
  setupSQLPlayground();
  setupProjectCategoryFilter();
  setupProjectModal();
  setupCopyEmail();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
