import React from "react";
const STATUS = {
  Active:    { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-400", pulse: true  },
  Paused:    { bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-400",   pulse: false },
  Draft:     { bg: "bg-slate-100",  text: "text-slate-500",   dot: "bg-slate-300",   pulse: false },
  Completed: { bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-400",    pulse: false },
  Scheduled: { bg: "bg-violet-50",  text: "text-violet-700",  dot: "bg-violet-400",  pulse: false },
};

export default function CampaignStatusBadge({ status }) {
  const s = STATUS[status] || STATUS.Draft;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${s.pulse ? "animate-pulse" : ""}`} />
      {status}
    </span>
  );
}
