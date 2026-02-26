import React from "react";
import { Search, Download, RefreshCw } from "lucide-react";

const STATUSES = ["All", "New", "Contacted", "Interested", "Demo Booked", "Converted", "Unqualified"];
const SOURCES  = ["All Sources", "Google Maps", "LinkedIn", "Manual", "Import"];

export default function LeadFilterBar({ search, onSearch, status, onStatus, source, onSource, onRefresh, total }) {
  return (
    <div className="bg-w-surface border-b border-w-border px-5 py-4 space-y-3">

      {/* Row 1 — search + actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-w-text-dim" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="🔍  Search by name, company, phone..."
            className="w-full pl-8 pr-3 py-2 text-xs bg-w-surface2 border border-w-border rounded-lg focus:outline-none focus:ring-2 focus:ring-w-accent focus:border-transparent text-w-text placeholder-w-text-dim"
          />
        </div>

        {/* Source filter */}
        <select
          value={source}
          onChange={(e) => onSource(e.target.value)}
          className="text-xs border border-w-border rounded-lg px-3 py-2 bg-w-surface2 text-w-text-mid focus:outline-none focus:ring-2 focus:ring-w-accent cursor-pointer"
        >
          {SOURCES.map((s) => <option key={s}>{s}</option>)}
        </select>

        <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-w-border hover:bg-w-surface2 text-w-text-mid text-xs font-medium transition-colors">
          🏷️ Stage: All
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-w-border hover:bg-w-surface2 text-w-text-mid text-xs font-medium transition-colors">
          📊 Score: All
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-w-border hover:bg-w-surface2 text-w-text-mid text-xs font-medium transition-colors">
          📅 Date Added
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-w-border hover:bg-w-surface2 text-w-text-mid text-xs font-medium transition-colors">
          🌐 Source: All
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onRefresh}
            className="p-2 rounded-lg border border-w-border hover:bg-w-surface2 text-w-text-dim transition-colors"
            title="Refresh"
          >
            <RefreshCw size={15} />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-w-border hover:bg-w-surface2 text-w-text-mid text-xs font-medium transition-colors">
            <Download size={14} />
            Export
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-w-accent2 hover:bg-green-600 text-white text-xs font-semibold transition-colors">
            ⚡ Add to Campaign
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-w-accent hover:bg-blue-700 text-white text-xs font-semibold transition-colors">
            + Import Leads
          </button>
        </div>
      </div>

      {/* Row 2 — status tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => onStatus(s)}
            className={`shrink-0 text-[10px] font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              status === s
                ? "bg-w-accent text-white"
                : "text-w-text-dim hover:bg-w-surface2"
            }`}
          >
            {s}
          </button>
        ))}
        <span className="ml-auto text-[10px] text-w-text-dim shrink-0">{total} leads</span>
      </div>
    </div>
  );
}
