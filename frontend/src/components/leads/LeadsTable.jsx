import React from "react";
import { useState } from "react";
import LeadRow from "./LeadRow";
import { ChevronUp, ChevronDown } from "lucide-react";

const COLUMNS = [
  { key: "checkbox",    label: "",             sortable: false },
  { key: "name",        label: "Name / Company", sortable: true  },
  { key: "contact",     label: "Contact",      sortable: false },
  { key: "phone",       label: "Phone",        sortable: false },
  { key: "source",      label: "Source",       sortable: true  },
  { key: "score",       label: "AI Score",     sortable: true  },
  { key: "status",      label: "Stage",        sortable: true  },
  { key: "lastContact", label: "Last Touch",   sortable: true  },
  { key: "actions",     label: "",             sortable: false },
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
    <div className="flex-1 overflow-auto bg-w-surface">
      {/* Bulk action bar */}
      {selected.length > 0 && (
        <div className="sticky top-0 z-10 bg-w-accent text-white px-5 py-2.5 flex items-center gap-3 text-xs">
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
        <thead className="bg-w-surface2 border-b border-w-border sticky top-0 z-10">
          <tr>
            <th className="pl-4 py-2.5 w-8">
              <input
                type="checkbox"
                checked={selected.length === leads.length && leads.length > 0}
                onChange={toggleAll}
                className="w-3.5 h-3.5 rounded border-w-border2 text-w-accent cursor-pointer"
              />
            </th>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable && toggleSort(col.key)}
                className={`py-2.5 pr-3 text-left text-[10px] font-semibold text-w-text-dim uppercase tracking-wide whitespace-nowrap
                  ${col.sortable ? "cursor-pointer hover:text-slate-800 select-none" : ""}
                `}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    sortDir === "asc"
                      ? <ChevronUp size={10} className="text-w-accent" />
                      : <ChevronDown size={10} className="text-w-accent" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-16 text-w-text-dim text-xs">
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
      <div className="sticky bottom-0 bg-w-surface border-t border-w-border px-5 py-3 flex items-center justify-between">
        <span className="text-xs text-w-text-dim">Showing {sorted.length} of {leads.length} leads</span>
        <div className="flex items-center gap-1">
          {[1,2,3,"...",12].map((p, i) => (
            <button
              key={i}
              className={`h-7 px-2.5 text-[10px] rounded font-medium transition-colors ${
                p === 1 ? "bg-w-accent text-white" : "text-w-text-dim hover:bg-w-surface2 border border-w-border"
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
