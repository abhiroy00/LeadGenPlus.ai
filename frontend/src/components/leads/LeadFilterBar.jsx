import React from "react";
import { Search, SlidersHorizontal, Download, RefreshCw } from "lucide-react";

const STATUSES = ["All", "New", "Contacted", "Interested", "Demo Booked", "Converted", "Unqualified"];
const SOURCES  = ["All Sources", "Google Maps", "LinkedIn", "Manual", "Import"];

export default function LeadFilterBar({ search, onSearch, status, onStatus, source, onSource, onRefresh, total }) {
  return (
    <div className="bg-white border-b border-gray-100 px-5 py-3 space-y-3">

      {/* Row 1 — search + actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search name, phone, company..."
            className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Source filter */}
        <select
          value={source}
          onChange={(e) => onSource(e.target.value)}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {SOURCES.map((s) => <option key={s}>{s}</option>)}
        </select>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onRefresh}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-slate-500 transition-colors"
            title="Refresh"
          >
            <RefreshCw size={15} />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-slate-600 text-sm font-medium transition-colors">
            <Download size={14} />
            Export
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors">
            <SlidersHorizontal size={14} />
            Import Leads
          </button>
        </div>
      </div>

      {/* Row 2 — status tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => onStatus(s)}
            className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              status === s
                ? "bg-blue-600 text-white"
                : "text-slate-500 hover:bg-gray-100"
            }`}
          >
            {s}
          </button>
        ))}
        <span className="ml-auto text-xs text-slate-400 shrink-0">{total} leads</span>
      </div>
    </div>
  );
}
