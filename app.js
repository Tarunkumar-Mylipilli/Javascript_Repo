// ==========================================
// Minimalist Interactive Cursor (High-End Dribbble)
// ==========================================
const initCursor = () => {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  const animate = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animate);
  };
  animate();

  const clickables = document.querySelectorAll('a, button');
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '48px';
      ring.style.height = '48px';
      ring.style.borderColor = 'rgba(255, 255, 255, 0.6)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '32px';
      ring.style.height = '32px';
      ring.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    });
  });
};

// ==========================================
// Interactive Live Dashboard (Chart.js)
// Clean, Luxury Editorial Styling
// ==========================================
let activeChart = null;

const datasets = {
  rcb: {
    title: "RCB IPL: Over-by-Over Run Rate Across Match Phases",
    kpis: {
      kpi1: { label: "Win Rate Chasing", value: "64.3%", change: "Top quartile in IPL" },
      kpi2: { label: "Powerplay Run Rate", value: "9.42", change: "+1.2 vs IPL avg" },
      kpi3: { label: "Death Overs Economy", value: "9.85", change: "-1.8 in Chinnaswamy" },
      kpi4: { label: "Matches Analyzed", value: "248", change: "2008 - 2024 Records" }
    },
    labels: ["PP (Overs 1-6)", "Middle (Overs 7-11)", "Middle (Overs 12-15)", "Death (Overs 16-18)", "Death (Overs 19-20)"],
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
          backgroundColor: "#3f3f46",
          borderRadius: 6
        }
      ]
    }
  },
  tickets: {
    title: "IT Support Ticket Analysis: MTTR vs SLA Targets by Priority",
    kpis: {
      kpi1: { label: "First Contact Resolution", value: "72.4%", change: "+8.5% QoQ" },
      kpi2: { label: "Mean Time to Resolve", value: "3.8 hrs", change: "-42% via triage automation" },
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
          borderColor: "#fafafa",
          backgroundColor: "rgba(250, 250, 250, 0.08)",
          fill: true,
          tension: 0.35,
          borderWidth: 2
        },
        {
          label: "SLA Target (Hours)",
          data: [2.0, 5.0, 12.0, 24.0],
          borderColor: "#71717a",
          borderDash: [5, 5],
          tension: 0.2,
          borderWidth: 1.5
        }
      ]
    }
  }
};

const updateDashboard = (key) => {
  const data = datasets[key];
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
            color: '#a1a1aa',
            font: { family: 'Space Grotesk', size: 12, weight: '500' },
            boxWidth: 10,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: '#18181b',
          titleColor: '#ffffff',
          bodyColor: '#d4d4d8',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          padding: 12,
          usePointStyle: true
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.03)' },
          ticks: { color: '#71717a', font: { family: 'JetBrains Mono', size: 11 } }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.03)' },
          ticks: { color: '#71717a', font: { family: 'JetBrains Mono', size: 11 } }
        }
      }
    }
  });
};

const setupDashboardTabs = () => {
  const btns = document.querySelectorAll('.dashboard-tab-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => {
        b.classList.remove('bg-white', 'text-black');
        b.classList.add('text-zinc-400');
      });
      btn.classList.add('bg-white', 'text-black');
      btn.classList.remove('text-zinc-400');

      const ds = btn.getAttribute('data-dataset');
      updateDashboard(ds);
    });
  });
};

const setupCopyEmail = () => {
  const btn = document.getElementById('copyEmailBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const email = btn.getAttribute('data-email') || 'tarun.developer99@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const orig = btn.innerHTML;
      btn.innerHTML = `<span class="text-emerald-500 font-semibold">✓ Copied to clipboard!</span>`;
      setTimeout(() => {
        btn.innerHTML = orig;
      }, 2000);
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  updateDashboard('rcb');
  setupDashboardTabs();
  setupCopyEmail();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
