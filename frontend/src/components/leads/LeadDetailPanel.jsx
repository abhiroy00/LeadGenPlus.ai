import React from "react";
import { X, MessageCircle, Phone, Mail, MapPin, Building2, Calendar, Tag, ExternalLink } from "lucide-react";
import LeadScorePill from "./LeadScorePill";

const STATUS_STYLES = {
  "New":         { bg: "bg-blue-50",    text: "text-blue-700"    },
  "Contacted":   { bg: "bg-violet-50",  text: "text-violet-700"  },
  "Interested":  { bg: "bg-amber-50",   text: "text-amber-700"   },
  "Demo Booked": { bg: "bg-emerald-50", text: "text-emerald-700" },
  "Converted":   { bg: "bg-green-50",   text: "text-green-700"   },
  "Unqualified": { bg: "bg-slate-100",  text: "text-slate-500"   },
};

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
        <Icon size={13} className="text-slate-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-sm text-slate-700 font-medium mt-0.5 truncate">{value || "—"}</p>
      </div>
    </div>
  );
}

const TIMELINE = [
  { icon: "🔍", text: "Lead scraped from Google Maps",         time: "2 days ago",  color: "bg-blue-100"    },
  { icon: "⭐", text: "Scored 87/100 by Qualifier Agent",      time: "2 days ago",  color: "bg-amber-100"   },
  { icon: "✍️", text: "Personalized message generated",        time: "2 days ago",  color: "bg-violet-100"  },
  { icon: "📤", text: "WhatsApp message sent",                  time: "1 day ago",   color: "bg-slate-100"   },
  { icon: "✅", text: "Message opened & replied",               time: "6 hours ago", color: "bg-emerald-100" },
  { icon: "🎯", text: "Booking call intent detected",           time: "6 hours ago", color: "bg-green-100"   },
];

export default function LeadDetailPanel({ lead, onClose }) {
  if (!lead) return null;

  const status = STATUS_STYLES[lead.status] || STATUS_STYLES["New"];

  return (
    <div className="w-80 xl:w-96 bg-white border-l border-gray-100 flex flex-col h-full shrink-0 shadow-xl">

      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold">
            {lead.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">{lead.name}</p>
            <p className="text-xs text-slate-400">{lead.company}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-400 transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Score + Status */}
      <div className="px-5 py-3 flex items-center gap-3 border-b border-gray-100 bg-gray-50">
        <LeadScorePill score={lead.score} />
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}>
          {lead.status}
        </span>
        <span className="text-xs text-slate-400 ml-auto">{lead.source}</span>
      </div>

      {/* Quick Actions */}
      <div className="px-5 py-3 flex gap-2 border-b border-gray-100">
        <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold py-2 rounded-xl transition-colors">
          <MessageCircle size={13} /> WhatsApp
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-2 rounded-xl transition-colors">
          <Phone size={13} /> Call
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-slate-600 text-xs font-semibold py-2 rounded-xl transition-colors">
          <Mail size={13} /> Email
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">

        {/* Contact Info */}
        <div className="px-5 py-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Contact Info</p>
          <InfoRow icon={Phone}     label="Phone"    value={lead.phone}    />
          <InfoRow icon={Building2} label="Company"  value={lead.company}  />
          <InfoRow icon={MapPin}    label="Location" value={lead.location}  />
          <InfoRow icon={Tag}       label="Campaign" value={lead.campaign}  />
          <InfoRow icon={Calendar}  label="Added"    value={lead.lastContact} />
        </div>

        {/* AI Notes */}
        {lead.aiNote && (
          <div className="mx-5 mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wide mb-1">🤖 AI Insight</p>
            <p className="text-xs text-blue-800 leading-relaxed">{lead.aiNote}</p>
          </div>
        )}

        {/* Timeline */}
        <div className="px-5 pb-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Activity Timeline</p>
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gray-100" />
            <div className="space-y-3">
              {TIMELINE.map((t, i) => (
                <div key={i} className="flex items-start gap-3 relative">
                  <div className={`w-7 h-7 rounded-full ${t.color} flex items-center justify-center text-xs shrink-0 z-10`}>
                    {t.icon}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-xs text-slate-700 leading-snug">{t.text}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{t.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status changer */}
      <div className="px-5 py-3 border-t border-gray-100">
        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mb-2">Update Status</p>
        <div className="flex flex-wrap gap-1.5">
          {Object.keys(STATUS_STYLES).map((s) => (
            <button
              key={s}
              className={`text-[10px] font-semibold px-2 py-1 rounded-lg transition-colors ${
                lead.status === s
                  ? `${STATUS_STYLES[s].bg} ${STATUS_STYLES[s].text} ring-1 ring-current`
                  : "bg-gray-50 text-slate-500 hover:bg-gray-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
