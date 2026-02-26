import React from "react";

export default function LeadScorePill({ score }) {
  const getStyle = (score) => {
    if (score >= 80) return { bar: "bg-w-accent2" };
    if (score >= 60) return { bar: "bg-w-accent" };
    if (score >= 40) return { bar: "bg-w-accent3" };
    return             { bar: "bg-w-red" };
  };

  const s = getStyle(score);

  return (
    <div className="flex items-center gap-1.5">
      <div className="w-12 h-1 bg-w-surface2 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${s.bar}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-[10px] font-bold text-w-text">{score}</span>
    </div>
  );
}
