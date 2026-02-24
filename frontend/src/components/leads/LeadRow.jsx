import React from "react";
import { MessageCircle, Phone, MoreHorizontal, ChevronRight } from "lucide-react";
import LeadScorePill from "./LeadScorePill";

const STATUS_STYLES = {
  "New":          { bg: "bg-blue-50",    text: "text-blue-700"    },
  "Contacted":    { bg: "bg-violet-50",  text: "text-violet-700"  },
  "Interested":   { bg: "bg-amber-50",   text: "text-amber-700"   },
  "Demo Booked":  { bg: "bg-emerald-50", text: "text-emerald-700" },
  "Converted":    { bg: "bg-green-50",   text: "text-green-700"   },
  "Unqualified":  { bg: "bg-slate-100",  text: "text-slate-500"   },
};

const SOURCE_ICONS = {
  "Google Maps": "🗺️",
  "LinkedIn":    "💼",
  "Manual":      "✍️",
  "Import":      "📥",
};

export default function LeadRow({ lead, isSelected, onSelect, onClick }) {
  const status = STATUS_STYLES[lead.status] || STATUS_STYLES["New"];

  return (
    <tr
      onClick={onClick}
      className={`border-b border-gray-50 cursor-pointer transition-colors ${
        isSelected ? "bg-blue-50/60" : "hover:bg-gray-50"
      }`}
    >
      {/* Checkbox */}
      <td className="pl-5 py-3 w-8" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
        />
      </td>

      {/* Name + Company */}
      <td className="py-3 pr-4 min-w-[180px]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {lead.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 leading-tight">{lead.name}</p>
            <p className="text-xs text-slate-400 truncate max-w-[140px]">{lead.company}</p>
          </div>
        </div>
      </td>

      {/* Phone */}
      <td className="py-3 pr-4 hidden sm:table-cell">
        <span className="text-sm text-slate-600 font-mono">{lead.phone}</span>
      </td>

      {/* Source */}
      <td className="py-3 pr-4 hidden md:table-cell">
        <span className="text-sm text-slate-500">
          {SOURCE_ICONS[lead.source] || "📌"} {lead.source}
        </span>
      </td>

      {/* Score */}
      <td className="py-3 pr-4">
        <LeadScorePill score={lead.score} />
      </td>

      {/* Status */}
      <td className="py-3 pr-4 hidden lg:table-cell">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}>
          {lead.status}
        </span>
      </td>

      {/* Campaign */}
      <td className="py-3 pr-4 hidden xl:table-cell">
        <span className="text-xs text-slate-500 truncate max-w-[120px] block">{lead.campaign}</span>
      </td>

      {/* Last Contact */}
      <td className="py-3 pr-4 hidden lg:table-cell">
        <span className="text-xs text-slate-400">{lead.lastContact}</span>
      </td>

      {/* Actions */}
      <td className="py-3 pr-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors" title="WhatsApp">
            <MessageCircle size={14} />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors" title="Call">
            <Phone size={14} />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 transition-colors">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </td>

      {/* Arrow */}
      <td className="py-3 pr-4">
        <ChevronRight size={14} className="text-slate-300" />
      </td>
    </tr>
  );
}
