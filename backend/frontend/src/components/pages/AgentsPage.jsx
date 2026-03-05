import React from "react";

const MOCK_AGENTS = [
  { emoji: "🔍", name: "Scout Agent", stat1: "Scraped today: 8,420", stat2: "Sources: LinkedIn, Maps", progress: 84, status: "active" },
  { emoji: "⭐", name: "Qualifier Agent", stat1: "Scored today: 7,200", stat2: "Avg score: 67/100", progress: 72, status: "active" },
  { emoji: "✍️", name: "Copywriter Agent", stat1: "Messages written: 5,600", stat2: "A/B variants: 3 active", progress: 56, status: "idle" },
  { emoji: "⏰", name: "Scheduler Agent", stat1: "Queued: 12,400", stat2: "Next send: 2:30 PM", progress: 90, status: "active" },
  { emoji: "💬", name: "Conversation Agent", stat1: "Active chats: 35", stat2: "Avg reply: 3.2s", progress: 35, status: "active" },
  { emoji: "📊", name: "Analytics Agent", stat1: "Reports run: 24", stat2: "Optimizations: 8", progress: 60, status: "active" },
  { emoji: "🛡️", name: "Compliance Agent", stat1: "Opt-outs handled: 12", stat2: "Violations: 0 ✅", progress: 100, status: "active" },
  { emoji: "🎯", name: "Orchestrator Agent", stat1: "Tasks coordinated: 142K", stat2: "Uptime: 99.9%", progress: 99, status: "active" },
];

const MOCK_LOGS = [
  { time: "14:32:01", agent: "[SCOUT]", message: "✓ Scraped 142 leads from Google Maps \"restaurants Delhi\"", type: "success" },
  { time: "14:32:03", agent: "[QUALIFIER]", message: "Processing 142 new leads → scoring via GPT-4o...", type: "info" },
  { time: "14:32:08", agent: "[QUALIFIER]", message: "✓ 89 leads scored ≥50 → added to campaign queue", type: "success" },
  { time: "14:32:09", agent: "[COPYWRITER]", message: "Generating personalized WA messages for 89 leads...", type: "info" },
  { time: "14:32:14", agent: "[COPYWRITER]", message: "✓ 89 unique messages generated (avg 3.2s/message)", type: "success" },
  { time: "14:32:15", agent: "[SCHEDULER]", message: "Optimizing send times for 89 leads (IST timezone)", type: "info" },
  { time: "14:32:16", agent: "[SCHEDULER]", message: "✓ Scheduled: 34 now, 55 at 6:00 PM (peak time)", type: "success" },
  { time: "14:32:17", agent: "[CONV_AGENT]", message: "✓ Rahul Sharma replied → booking call intent detected → alert sent", type: "success" },
  { time: "14:32:19", agent: "[ORCHESTRATOR]", message: "⚠ Vikram Bajaj: 3rd follow-up — escalating to human review", type: "warn" },
  { time: "14:32:21", agent: "[COMPLIANCE]", message: "✓ Opt-out processed for +91-XXXXX-12345 — removed from all lists", type: "success" },
  { time: "14:32:22", agent: "[ANALYTICS]", message: "Campaign \"SaaS Q1\" open rate dipped 3% → A/B testing new subject line", type: "info" },
];

function AgentCard({ agent }) {
  const statusDot = agent.status === "active" ? "bg-w-accent2" : "bg-w-accent3";
  const progressColor = agent.status === "active" ? "bg-w-accent2" : "bg-w-accent3";
  
  return (
    <div className="bg-w-surface border border-w-border rounded-lg p-4 relative">
      <div className={`absolute top-3.5 right-3.5 w-2 h-2 rounded-full ${statusDot}`}></div>
      <div className="text-2xl mb-2">{agent.emoji}</div>
      <div className="text-sm font-bold text-w-text mb-1">{agent.name}</div>
      <div className="text-[10px] text-w-text-dim mb-0.5">{agent.stat1}</div>
      <div className="text-[10px] text-w-text-dim mb-2">{agent.stat2}</div>
      <div className="h-1 bg-w-surface2 rounded-full overflow-hidden mt-2">
        <div 
          className={`h-full rounded-full ${progressColor}`}
          style={{ width: `${agent.progress}%` }}
        />
      </div>
    </div>
  );
}

function LiveLogPanel() {
  return (
    <div className="bg-slate-900 rounded-lg p-4 font-mono text-[10px] text-slate-400 h-40 overflow-y-auto space-y-1.5">
      {MOCK_LOGS.map((log, i) => (
        <div key={i} className="flex gap-2.5">
          <span className="text-slate-600 shrink-0">{log.time}</span>
          <span className="text-purple-400 shrink-0 w-[100px]">{log.agent}</span>
          <span className={`${
            log.type === "success" ? "text-w-accent2" :
            log.type === "warn" ? "text-w-accent3" :
            "text-slate-400"
          }`}>
            {log.message}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-w-bg">
      <div className="px-6 py-6 max-w-7xl mx-auto space-y-4">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-w-text">AI Agent Control Center</h1>
            <p className="text-xs text-w-text-dim mt-0.5">
              8 agents running · All systems operational · 99.9% uptime
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs font-medium">
            🟢 All Systems Go
          </div>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {MOCK_AGENTS.map((agent, i) => (
            <AgentCard key={i} agent={agent} />
          ))}
        </div>

        {/* Live Log */}
        <div className="bg-w-surface rounded-lg p-4 border border-w-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-w-text">Live Agent Logs</h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-50 text-w-accent2 border border-green-200">
              Real-time
            </span>
          </div>
          <LiveLogPanel />
        </div>
      </div>
    </div>
  );
}