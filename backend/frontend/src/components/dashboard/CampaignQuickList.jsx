import { ChevronRight } from "lucide-react";
import React from "react";

// ── Status config ───────────────────────────────────────────
const statusConfig = {
  Active: { dot: "bg-w-accent2", text: "text-w-accent2", bg: "bg-emerald-50" },
  Paused: { dot: "bg-w-accent3", text: "text-w-accent3", bg: "bg-amber-50"   },
  Draft:  { dot: "bg-gray-300",  text: "text-w-text-dim", bg: "bg-gray-50"   },
};

// ── Single Campaign Row ─────────────────────────────────────
function CampaignRow({ name, status, leads, replies, rate, color }) {
  const s = statusConfig[status] || statusConfig.Draft;

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-w-border last:border-0 hover:bg-w-surface2 rounded-lg px-2 transition-colors cursor-pointer">
      <div className={`w-2 h-2 rounded-full ${s.dot} shrink-0`} />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-w-text truncate">{name}</p>
        <p className="text-[10px] text-w-text-dim">{leads} leads · {replies} replies</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs font-bold" style={{ color }}>{rate}</p>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.text} border`} 
              style={{ borderColor: color + '40' }}>
          {status}
        </span>
      </div>
    </div>
  );
}

// ── Campaign data ───────────────────────────────────────────
const campaigns = [
  { name: "SaaS Founders Outreach Q1",    status: "Active", leads: "1,240", replies: "980", rate: "82%", color: "#10b981" },
  { name: "Restaurant Owners WA Blast",   status: "Active", leads: "3,800", replies: "3,100", rate: "91%", color: "#2563eb" },
  { name: "Real Estate Agents Email",     status: "Paused", leads: "620", replies: "620", rate: "34%", color: "#f59e0b" },
  { name: "E-commerce Owners Nurture",    status: "Active", leads: "2,100", replies: "1,850", rate: "76%", color: "#8b5cf6" },
];

// ── Campaign Quick List ─────────────────────────────────────
export default function CampaignQuickList() {
  return (
    <div className="bg-w-surface rounded-lg p-4 border border-w-border">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-w-text">Active Campaigns</h2>
        <button className="text-[10px] text-w-accent font-semibold hover:underline flex items-center gap-1">
          View all <ChevronRight size={12} />
        </button>
      </div>

      {campaigns.map((c) => (
        <CampaignRow key={c.name} {...c} />
      ))}
    </div>
  );
}