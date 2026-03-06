import React from "react";

export default function StatCard({ icon: Icon, label, value, change, color }) {
  return (
    <div className="bg-w-surface border border-w-border rounded-lg p-4">
      <div className={`text-[22px] font-bold mb-1 ${color}`}>{value}</div>
      <div className="text-[10px] text-w-text-dim uppercase tracking-wide font-semibold mb-1">{label}</div>
      <div className="text-[10px] text-w-accent2 font-medium">{change}</div>
    </div>
  );
}