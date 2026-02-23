import React from "react";
import { Users, MessageCircle, TrendingUp, Target, ChevronRight, Bell, Search } from "lucide-react";

// ── Component Imports ───────────────────────────────────────
import StatCard          from "../dashboard/StatCard";
import ActivityFeed      from "../dashboard/ActivityFeed";
import CampaignQuickList from "../dashboard/CampaignQuickList";
import WelcomeBanner     from "../dashboard/WelcomeBanner";

// ── Mini Bar Chart (local to Dashboard) ────────────────────
function MiniBarChart() {
  const data = [40, 65, 48, 72, 55, 80, 63, 88, 70, 95, 78, 100];
  const days = ["M", "T", "W", "T", "F", "S", "S", "M", "T", "W", "T", "F"];
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((h, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <div
            className="w-full rounded-t-sm transition-all duration-500"
            style={{
              height: `${h}%`,
              background:
                i === data.length - 1
                  ? "linear-gradient(to top, #2563eb, #60a5fa)"
                  : i >= data.length - 3
                  ? "linear-gradient(to top, #3b82f6, #93c5fd)"
                  : "#e2e8f0",
            }}
          />
          <span className="text-[9px] text-slate-400">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

// ── Agent Card (local to Dashboard) ────────────────────────
function AgentCard({ emoji, name, stat, status }) {
  return (
    <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 hover:bg-slate-100 transition-colors">
      <div className="text-xl">{emoji}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-700 truncate">{name}</p>
        <p className="text-xs text-slate-400 truncate">{stat}</p>
      </div>
      <div
        className={`w-2 h-2 rounded-full shrink-0 ${
          status === "active" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
        }`}
      />
    </div>
  );
}

// ── Dashboard Page ──────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Top Nav ── */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center gap-3">
        <div className="flex-1 relative max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search leads, campaigns..."
            className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell size={18} className="text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
            AK
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto space-y-6">

        {/* ── Welcome Banner ── */}
        <WelcomeBanner />

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard icon={Users}         label="Total Leads"    value="12,840" change="18%"  positive={true}  color="text-blue-600"    bg="bg-blue-50"    />
          <StatCard icon={MessageCircle} label="Messages Sent"  value="142.8K" change="24%"  positive={true}  color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard icon={TrendingUp}    label="Reply Rate"     value="4.8%"   change="0.6%" positive={true}  color="text-violet-600"  bg="bg-violet-50"  />
          <StatCard icon={Target}        label="Demos Booked"   value="324"    change="3%"   positive={false} color="text-amber-600"   bg="bg-amber-50"   />
        </div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Lead Volume Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <div>
                <h2 className="text-sm font-bold text-slate-800">Lead Volume</h2>
                <p className="text-xs text-slate-400">Last 12 days</p>
              </div>
              <div className="flex gap-1">
                {["7D", "14D", "30D"].map((t, i) => (
                  <button
                    key={t}
                    className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
                      i === 0 ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-gray-100"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 mb-2">
              <MiniBarChart />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-50">
              {[
                { label: "Avg/Day",    value: "1,070", color: "text-blue-600"   },
                { label: "Best Day",   value: "1,420", color: "text-emerald-600" },
                { label: "Conversion", value: "0.34%", color: "text-violet-600"  },
              ].map((m) => (
                <div key={m.label} className="text-center">
                  <p className={`text-base font-bold ${m.color}`}>{m.value}</p>
                  <p className="text-xs text-slate-400">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-800">Conversion Funnel</h2>
              <ChevronRight size={16} className="text-slate-400" />
            </div>
            {[
              { label: "Contacted",   value: "142.8K", pct: 100, color: "#2563eb" },
              { label: "Opened",      value: "120K",   pct: 84,  color: "#3b82f6" },
              { label: "Replied",     value: "6,840",  pct: 48,  color: "#10b981" },
              { label: "Interested",  value: "1,200",  pct: 28,  color: "#f59e0b" },
              { label: "Demo Booked", value: "324",    pct: 12,  color: "#8b5cf6" },
              { label: "Converted",   value: "48",     pct: 6,   color: "#ef4444" },
            ].map((step) => (
              <div key={step.label} className="mb-2.5">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">{step.label}</span>
                  <span className="text-slate-500">{step.value}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${step.pct}%`, background: step.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Campaigns List — spans 2 cols */}
          <div className="lg:col-span-2">
            <CampaignQuickList />
          </div>

          {/* Activity Feed + AI Agents */}
          <div className="flex flex-col gap-4">
            <ActivityFeed />

            {/* AI Agents mini panel */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-slate-800">AI Agents</h2>
                <span className="text-xs bg-emerald-50 text-emerald-600 font-semibold px-2 py-0.5 rounded-full">
                  8 Running
                </span>
              </div>
              <div className="space-y-2">
                <AgentCard emoji="🔍" name="Scout Agent"        stat="8,420 scraped today"    status="active" />
                <AgentCard emoji="⭐" name="Qualifier Agent"    stat="7,200 scored · avg 67"  status="active" />
                <AgentCard emoji="💬" name="Conversation Agent" stat="35 active chats"         status="active" />
                <AgentCard emoji="✍️" name="Copywriter Agent"   stat="5,600 messages written"  status="idle"   />
              </div>
              <button className="mt-3 w-full text-xs text-slate-500 hover:text-blue-600 font-medium transition-colors flex items-center justify-center gap-1">
                View all agents <ChevronRight size={12} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}