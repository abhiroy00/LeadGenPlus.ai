import React from "react";
import { MessageCircle, Phone, MoveHorizontal as MoreHorizontal } from "lucide-react";
import LeadScorePill from "./LeadScorePill";

const STATUS_STYLES = {
  "New":          { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200"    },
  "Contacted":    { bg: "bg-violet-50",  text: "text-violet-700",  border: "border-violet-200"  },
  "Interested":   { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200"   },
  "Demo Booked":  { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Converted":    { bg: "bg-green-50",   text: "text-green-700",   border: "border-green-200"   },
  "Unqualified":  { bg: "bg-slate-100",  text: "text-slate-500",   border: "border-slate-200"   },
  "Hot Lead 🔥":  { bg: "bg-green-50",   text: "text-green-700",   border: "border-green-200"   },
  "Nurturing":    { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200"   },
  "Cold":         { bg: "bg-red-50",     text: "text-red-700",     border: "border-red-200"     },
};

const SOURCE_ICONS = {
  "Google Maps": "🗺️",
  "LinkedIn":    "💼",
  "Manual":      "✍️",
  "Import":      "📥",
  "Apollo":      "🚀",
  "CSV":         "📄",
};

export default function LeadRow({ lead, isSelected, onSelect, onClick }) {
  const status = STATUS_STYLES[lead.status] || STATUS_STYLES["New"];

  return (
    <tr
      onClick={onClick}
      className={`border-b border-w-border cursor-pointer transition-colors group ${
        isSelected ? "bg-blue-50/60" : "hover:bg-w-surface2"
      }`}
    >
      {/* Checkbox */}
      <td className="pl-4 py-3 w-8" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="w-3.5 h-3.5 rounded border-w-border2 text-w-accent cursor-pointer"
        />
      </td>

      {/* Name + Company */}
      <td className="py-3 pr-3 min-w-[180px]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
            {lead.name.charAt(0)}
          </div>
          <div>
            <p className="text-xs font-semibold text-w-text leading-tight">{lead.name}</p>
            <p className="text-[10px] text-w-text-dim truncate max-w-[140px]">{lead.company}</p>
          </div>
        </div>
      </td>

      {/* Contact */}
      <td className="py-3 pr-3 text-[10px]">
        <div>📱 {lead.phone}</div>
        <div className="text-w-text-mid">📧 {lead.name.toLowerCase().replace(' ', '')}@{lead.company.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '')}.in</div>
      </td>

      {/* Source */}
      <td className="py-3 pr-3">
        <span className={`text-[9px] font-semibold px-2 py-1 rounded-full border ${
          lead.source === "LinkedIn" ? "bg-blue-50 text-blue-700 border-blue-200" :
          lead.source === "Google Maps" ? "bg-orange-50 text-orange-700 border-orange-200" :
          lead.source === "Apollo" ? "bg-blue-50 text-blue-700 border-blue-200" :
          lead.source === "CSV" ? "bg-purple-50 text-purple-700 border-purple-200" :
          "bg-gray-50 text-gray-700 border-gray-200"
        }`}>
          {lead.source}
        </span>
      </td>

      {/* Score */}
      <td className="py-3 pr-3">
        <LeadScorePill score={lead.score} />
      </td>

      {/* Status */}
      <td className="py-3 pr-3">
        <span className={`text-[9px] font-semibold px-2 py-1 rounded-full border ${status.bg} ${status.text} ${status.border}`}>
          {lead.status}
        </span>
      </td>

      {/* Last Contact */}
      <td className="py-3 pr-3 text-[10px] text-w-text-mid">
        <div>{lead.lastContact}</div>
      </td>

      {/* Actions */}
      <td className="py-3 pr-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-1">
          <button className="w-[26px] h-[26px] rounded border border-w-border bg-w-surface2 hover:bg-emerald-50 text-w-text-dim hover:text-emerald-600 transition-colors flex items-center justify-center" title="WhatsApp">
            💬
          </button>
          <button className="w-[26px] h-[26px] rounded border border-w-border bg-w-surface2 hover:bg-blue-50 text-w-text-dim hover:text-blue-600 transition-colors flex items-center justify-center" title="Email">
            📧
          </button>
          <button className="w-[26px] h-[26px] rounded border border-w-border bg-w-surface2 hover:bg-gray-100 text-w-text-dim transition-colors flex items-center justify-center" title="View">
            👁️
          </button>
        </div>
      </td>
    </tr>
  );
}
