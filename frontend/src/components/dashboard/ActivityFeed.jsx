import React from "react";
// ── Single Activity Item ────────────────────────────────────
function ActivityItem({ icon, color, bg, text, time, badge }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
        <span className={`text-sm ${color}`}>{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-700 leading-snug">{text}</p>
        <p className="text-xs text-slate-400 mt-0.5">{time}</p>
      </div>
      {badge && (
        <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full shrink-0">
          {badge}
        </span>
      )}
    </div>
  );
}

// ── Activity Feed ───────────────────────────────────────────
const activities = [
  {
    icon: "🔍",
    color: "text-blue-500",
    bg: "bg-blue-50",
    text: "Scout scraped 142 leads from Google Maps",
    time: "2 min ago",
    badge: "New",
  },
  {
    icon: "✅",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    text: "Rahul Sharma — booking call intent detected",
    time: "5 min ago",
    badge: "Hot",
  },
  {
    icon: "⚠️",
    color: "text-amber-500",
    bg: "bg-amber-50",
    text: "Vikram Bajaj escalated to human review",
    time: "8 min ago",
    badge: null,
  },
  {
    icon: "📤",
    color: "text-violet-500",
    bg: "bg-violet-50",
    text: "89 messages scheduled for 6:00 PM send",
    time: "12 min ago",
    badge: null,
  },
];

export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold text-slate-800">Live Activity</h2>
        <span className="flex items-center gap-1 text-xs text-emerald-500 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>

      {activities.map((item, i) => (
        <ActivityItem key={i} {...item} />
      ))}
    </div>
  );
}