import React from "react";

export default function LeadScorePill({ score }) {
  const getStyle = (score) => {
    if (score >= 80) return { bg: "bg-emerald-50", text: "text-emerald-700", bar: "bg-emerald-500", label: "Hot" };
    if (score >= 60) return { bg: "bg-blue-50",    text: "text-blue-700",    bar: "bg-blue-500",    label: "Warm" };
    if (score >= 40) return { bg: "bg-amber-50",   text: "text-amber-700",   bar: "bg-amber-500",   label: "Cool" };
    return             { bg: "bg-slate-100",  text: "text-slate-500",  bar: "bg-slate-400",   label: "Cold" };
  };

  const s = getStyle(score);

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${s.bg}`}>
      {/* mini progress bar */}
      <div className="w-12 h-1.5 bg-white/60 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${s.bar}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`text-xs font-bold ${s.text}`}>{score}</span>
      <span className={`text-[10px] font-medium ${s.text} opacity-70`}>{s.label}</span>
    </div>
  );
}
