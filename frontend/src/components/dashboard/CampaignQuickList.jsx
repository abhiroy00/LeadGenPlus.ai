import { ChevronRight } from "lucide-react";
import React from "react";

// ── Status config ───────────────────────────────────────────
const statusConfig = {
  Active: { dot: "bg-emerald-400", text: "text-emerald-600", bg: "bg-emerald-50" },
  Paused: { dot: "bg-amber-400",   text: "text-amber-600",   bg: "bg-amber-50"   },
  Draft:  { dot: "bg-slate-300",   text: "text-slate-500",   bg: "bg-slate-50"   },
};

// ── Single Campaign Row ─────────────────────────────────────
function CampaignRow({ name, status, leads, replies, rate, color }) {
  const s = statusConfig[status] || statusConfig.Draft;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-xl px-2 transition-colors cursor-pointer">
      <div className={`w-2 h-2 rounded-full ${s.dot} shrink-0`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-700 truncate">{name}</p>
        <p className="text-xs text-slate-400">{leads} leads · {replies} replies</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-bold" style={{ color }}>{rate}</p>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

// ── Campaign data ───────────────────────────────────────────
const campaigns = [
  { name: "SaaS Founders Q1",    status: "Active", leads: "8,420", replies: "404", rate: "4.8%", color: "#10b981" },
  { name: "Restaurant Delhi",    status: "Active", leads: "3,200", replies: "128", rate: "4.0%", color: "#2563eb" },
  { name: "E-Commerce Retarget", status: "Paused", leads: "5,100", replies: "183", rate: "3.6%", color: "#f59e0b" },
  { name: "Real Estate Mumbai",  status: "Active", leads: "2,800", replies: "98",  rate: "3.5%", color: "#8b5cf6" },
  { name: "Healthcare Outreach", status: "Draft",  leads: "1,200", replies: "—",   rate: "—",    color: "#94a3b8" },
];

// ── Campaign Quick List ─────────────────────────────────────
export default function CampaignQuickList() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-slate-800">Active Campaigns</h2>
        <button className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
          View all <ChevronRight size={12} />
        </button>
      </div>

      {campaigns.map((c) => (
        <CampaignRow key={c.name} {...c} />
      ))}
    </div>
  );
}