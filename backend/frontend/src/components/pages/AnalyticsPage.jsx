import React from "react";

function StatCard({ label, value, change, color }) {
  return (
    <div className="bg-w-surface border border-w-border rounded-lg p-4">
      <div className={`text-[28px] font-bold mb-1 ${color}`}>{value}</div>
      <div className="text-[10px] text-w-text-dim uppercase tracking-wide font-semibold mb-1">{label}</div>
      <div className="text-[10px] text-w-accent2 font-medium">{change}</div>
    </div>
  );
}

function BarChart() {
  const data = [80, 60, 90, 75, 65, 85, 95, 75, 88, 60, 100, 82];
  
  return (
    <div className="bg-w-surface2 border border-w-border rounded-lg p-2 h-[160px] flex items-end gap-1">
      {data.map((height, i) => (
        <div key={i} className="flex-1 flex flex-col justify-end h-full">
          <div 
            className="w-full rounded-t transition-all"
            style={{
              height: `${height}%`,
              background: i < 4 ? "#bfdbfe" : i < 8 ? "#2563eb" : "#10b981"
            }}
          />
        </div>
      ))}
    </div>
  );
}

function FunnelChart() {
  const steps = [
    { label: "Contacted", value: "142,800", width: 100, color: "#2563eb" },
    { label: "Opened", value: "120,000", width: 84, color: "#3b82f6" },
    { label: "Replied", value: "6,840", width: 48, color: "#10b981" },
    { label: "Interested", value: "1,200", width: 28, color: "#f59e0b" },
    { label: "Demo Booked", value: "324", width: 12, color: "#8b5cf6" },
    { label: "Converted", value: "48", width: 6, color: "#ef4444" },
  ];

  return (
    <div className="space-y-1.5 p-2.5">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <div className="text-[10px] text-w-text-dim w-20 text-right">{step.label}</div>
          <div 
            className="h-7 rounded flex items-center px-2.5 text-[10px] font-semibold text-white"
            style={{ width: `${step.width}%`, backgroundColor: step.color }}
          >
            {step.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-w-bg">
      <div className="px-6 py-6 max-w-7xl mx-auto space-y-4">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-w-text">Analytics & Insights</h1>
            <p className="text-xs text-w-text-dim mt-0.5">
              Performance report · Feb 1–22, 2026
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-w-border hover:bg-w-surface2 text-w-text-mid text-xs font-medium transition-colors">
              📅 Feb 2026
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-w-border hover:bg-w-surface2 text-w-text-mid text-xs font-medium transition-colors">
              All Campaigns
            </button>
            <button className="flex items-center gap-2 bg-w-accent hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
              ⬇️ Export Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard 
            label="Total Messages Sent" 
            value="142,800" 
            change="↑ +23% vs Jan" 
            color="text-w-accent" 
          />
          <StatCard 
            label="WA Open Rate" 
            value="84.2%" 
            change="↑ Best ever month" 
            color="text-whatsapp" 
          />
          <StatCard 
            label="Total Replies" 
            value="6,840" 
            change="↑ 4.8% reply rate" 
            color="text-w-accent2" 
          />
          <StatCard 
            label="Demos Booked" 
            value="324" 
            change="↑ +18% this month" 
            color="text-w-accent3" 
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Bar Chart */}
          <div className="bg-w-surface rounded-lg p-4 border border-w-border">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-w-text">Leads vs Replies vs Conversions (Daily)</h2>
            </div>
            <BarChart />
            <div className="flex gap-4 mt-2 text-[10px] text-w-text-mid">
              <span><span className="inline-block w-2 h-2 bg-w-accent rounded-sm mr-1"></span>Leads Sent</span>
              <span><span className="inline-block w-2 h-2 bg-w-accent2 rounded-sm mr-1"></span>Replies</span>
              <span><span className="inline-block w-2 h-2 bg-w-accent3 rounded-sm mr-1"></span>Conversions</span>
            </div>
          </div>

          {/* Funnel Chart */}
          <div className="bg-w-surface rounded-lg p-4 border border-w-border">
            <h2 className="text-sm font-semibold text-w-text mb-3">Conversion Funnel</h2>
            <FunnelChart />
          </div>
        </div>
      </div>
    </div>
  );
}