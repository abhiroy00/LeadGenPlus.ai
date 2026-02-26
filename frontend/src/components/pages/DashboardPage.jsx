import React from "react";
import { Users, MessageCircle, TrendingUp, Target, ChevronRight } from "lucide-react";

// ── Component Imports ───────────────────────────────────────
import StatCard          from "../dashboard/StatCard";
import ActivityFeed      from "../dashboard/ActivityFeed";
import CampaignQuickList from "../dashboard/CampaignQuickList";
import WelcomeBanner     from "../dashboard/WelcomeBanner";

// ── Mini Bar Chart (local to Dashboard) ────────────────────
function MiniBarChart() {
  const data = [60, 80, 55, 90, 70, 85, 95, 75, 88, 60, 100, 82, 78, 91];
  return (
    <div className="flex items-end gap-1 h-[120px] p-2">
      {data.map((h, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <div
            className="w-full rounded-t transition-all duration-500"
            style={{
              height: `${h}%`,
              background:
                i < 4 ? "#2563eb" :
                i < 8 ? "#25d366" :
                i < 11 ? "#10b981" :
                "#f59e0b",
            }}
          />
        </div>
      ))}
    </div>
  );
}

// ── Agent Card (local to Dashboard) ────────────────────────
function AgentCard({ emoji, name, stat, status }) {
  return (
    <div className="flex items-center gap-3 bg-w-surface2 rounded-lg p-3 hover:bg-gray-100 transition-colors">
      <div className="text-xl">{emoji}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-w-text truncate">{name}</p>
        <p className="text-xs text-w-text-dim truncate">{stat}</p>
      </div>
      <div
        className={`w-2 h-2 rounded-full shrink-0 ${
          status === "active" ? "bg-w-accent2 animate-pulse" : "bg-w-accent3"
        }`}
      />
    </div>
  );
}

// ── Dashboard Page ──────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-w-bg font-sans">
      <div className="px-6 py-6 max-w-7xl mx-auto space-y-5">

        {/* ── Welcome Banner ── */}
        <WelcomeBanner />

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <StatCard icon={Users}         label="Leads Today"    value="8,420"  change="↑ +12% vs yesterday" color="text-w-accent"    />
          <StatCard icon={MessageCircle} label="WA Open Rate"   value="84%"    change="↑ Industry avg 35%" color="text-whatsapp"    />
          <StatCard icon={TrendingUp}    label="Replies Today"  value="342"    change="↑ +8% this week"     color="text-w-accent2"  />
          <StatCard icon={Target}        label="Hot Leads 🔥"   value="47"     change="↑ Needs follow-up"   color="text-w-accent3"  />
          <StatCard icon={Target}        label="Pipeline Value" value="₹2.4L"  change="↑ This month"        color="text-w-accent4"  />
        </div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

          {/* Lead Volume Chart */}
          <div className="lg:col-span-2 bg-w-surface rounded-lg p-4 border border-w-border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-w-text">Campaign Performance (7 Days)</h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-50 text-w-accent2 border border-green-200 mt-1">
                  Live
                </span>
              </div>
              <div className="flex gap-1">
                {["7D", "14D", "30D"].map((t, i) => (
                  <button
                    key={t}
                    className={`text-[10px] px-2 py-1 rounded font-medium transition-colors ${
                      i === 0 ? "bg-w-accent text-white" : "text-w-text-dim hover:bg-w-surface2"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-w-surface2 border border-w-border rounded-lg mb-3">
              <MiniBarChart />
            </div>
            <div className="flex gap-4 text-[10px] text-w-text-mid">
              <span><span className="inline-block w-2 h-2 bg-w-accent rounded-sm mr-1"></span>Email Sent</span>
              <span><span className="inline-block w-2 h-2 bg-whatsapp rounded-sm mr-1"></span>WA Sent</span>
              <span><span className="inline-block w-2 h-2 bg-w-accent2 rounded-sm mr-1"></span>Replies</span>
              <span><span className="inline-block w-2 h-2 bg-w-accent3 rounded-sm mr-1"></span>Converted</span>
            </div>
          </div>

          {/* Lead Sources Donut */}
          <div className="bg-w-surface rounded-lg p-4 border border-w-border">
            <h2 className="text-sm font-semibold text-w-text mb-3">Lead Sources</h2>
            <div className="w-[100px] h-[100px] rounded-full mx-auto mb-3" 
                 style={{
                   background: `conic-gradient(
                     #2563eb 0% 40%,
                     #10b981 40% 65%,
                     #f59e0b 65% 80%,
                     #e5e7eb 80% 100%
                   )`
                 }}>
              <div className="w-[60px] h-[60px] bg-w-surface rounded-full m-5 flex items-center justify-center">
                <span className="text-sm font-bold text-w-text">100%</span>
              </div>
            </div>
            <div className="space-y-1">
              {[
                { label: "LinkedIn (40%)", color: "#2563eb" },
                { label: "Google Maps (25%)", color: "#10b981" },
                { label: "CSV Import (15%)", color: "#f59e0b" },
                { label: "Other (20%)", color: "#e5e7eb" },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-1.5 text-[10px] text-w-text-mid">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }}></div>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

          {/* Campaigns List — spans 2 cols */}
          <div className="lg:col-span-2">
            <CampaignQuickList />
          </div>

          {/* Activity Feed + AI Agents */}
          <div className="flex flex-col gap-3">
            <ActivityFeed />

            {/* AI Agents mini panel */}
            <div className="bg-w-surface rounded-lg p-4 border border-w-border">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-w-text">AI Agents</h2>
                <span className="text-[10px] bg-green-50 text-w-accent2 font-semibold px-2 py-0.5 rounded-full border border-green-200">
                  8 Running
                </span>
              </div>
              <div className="space-y-2">
                <AgentCard emoji="🔍" name="Scout Agent"        stat="8,420 scraped today"    status="active" />
                <AgentCard emoji="⭐" name="Qualifier Agent"    stat="7,200 scored · avg 67"  status="active" />
                <AgentCard emoji="💬" name="Conversation Agent" stat="35 active chats"         status="active" />
                <AgentCard emoji="✍️" name="Copywriter Agent"   stat="5,600 messages written"  status="idle"   />
              </div>
              <button className="mt-3 w-full text-[10px] text-w-text-dim hover:text-w-accent font-medium transition-colors flex items-center justify-center gap-1">
                View all agents <ChevronRight size={12} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}