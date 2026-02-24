import React from "react";
import { useState } from "react";
import LeadRow from "./LeadRow";
import { ChevronUp, ChevronDown } from "lucide-react";

const COLUMNS = [
  { key: "name",        label: "Name",         sortable: true  },
  { key: "phone",       label: "Phone",        sortable: false },
  { key: "source",      label: "Source",       sortable: true  },
  { key: "score",       label: "Score",        sortable: true  },
  { key: "status",      label: "Status",       sortable: true  },
  { key: "campaign",    label: "Campaign",     sortable: false },
  { key: "lastContact", label: "Last Contact", sortable: true  },
  { key: "actions",     label: "",             sortable: false },
  { key: "arrow",       label: "",             sortable: false },
];

export default function LeadsTable({ leads, onLeadClick, selectedLead }) {
  const [selected, setSelected]     = useState([]);
  const [sortKey, setSortKey]       = useState("score");
  const [sortDir, setSortDir]       = useState("desc");

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const toggleAll = () =>
    setSelected(selected.length === leads.length ? [] : leads.map(l => l.id));

  const toggleOne = (id) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const sorted = [...leads].sort((a, b) => {
    if (!sortKey) return 0;
    const va = a[sortKey], vb = b[sortKey];
    if (typeof va === "number") return sortDir === "asc" ? va - vb : vb - va;
    return sortDir === "asc"
      ? String(va).localeCompare(String(vb))
      : String(vb).localeCompare(String(va));
  });

  return (
    <div className="flex-1 overflow-auto">
      {/* Bulk action bar */}
      {selected.length > 0 && (
        <div className="sticky top-0 z-10 bg-blue-600 text-white px-5 py-2.5 flex items-center gap-3 text-sm">
          <span className="font-semibold">{selected.length} selected</span>
          <div className="w-px h-4 bg-white/30" />
          <button className="hover:underline">Start Campaign</button>
          <button className="hover:underline">Export</button>
          <button className="hover:underline">Delete</button>
          <button onClick={() => setSelected([])} className="ml-auto text-white/70 hover:text-white">✕ Clear</button>
        </div>
      )}

      <table className="w-full">
        {/* Header */}
        <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
          <tr>
            <th className="pl-5 py-3 w-8">
              <input
                type="checkbox"
                checked={selected.length === leads.length && leads.length > 0}
                onChange={toggleAll}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
              />
            </th>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable && toggleSort(col.key)}
                className={`py-3 pr-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap
                  ${col.key === "phone"    ? "hidden sm:table-cell" : ""}
                  ${col.key === "source"   ? "hidden md:table-cell" : ""}
                  ${col.key === "status"   ? "hidden lg:table-cell" : ""}
                  ${col.key === "campaign" ? "hidden xl:table-cell" : ""}
                  ${col.key === "lastContact" ? "hidden lg:table-cell" : ""}
                  ${col.sortable ? "cursor-pointer hover:text-slate-800 select-none" : ""}
                `}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    sortDir === "asc"
                      ? <ChevronUp size={12} className="text-blue-600" />
                      : <ChevronDown size={12} className="text-blue-600" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="group">
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={10} className="text-center py-16 text-slate-400 text-sm">
                No leads found. Try adjusting filters.
              </td>
            </tr>
          ) : (
            sorted.map((lead) => (
              <LeadRow
                key={lead.id}
                lead={lead}
                isSelected={selected.includes(lead.id)}
                onSelect={() => toggleOne(lead.id)}
                onClick={() => onLeadClick(lead)}
              />
            ))
          )}
        </tbody>
      </table>

      {/* Footer pagination */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-5 py-3 flex items-center justify-between">
        <span className="text-xs text-slate-400">Showing {sorted.length} of {leads.length} leads</span>
        <div className="flex items-center gap-1">
          {[1,2,3,"...",12].map((p, i) => (
            <button
              key={i}
              className={`w-7 h-7 text-xs rounded-lg font-medium transition-colors ${
                p === 1 ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
