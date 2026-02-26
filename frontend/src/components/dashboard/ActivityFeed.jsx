import React from "react";
// ── Single Activity Item ────────────────────────────────────
function ActivityItem({ icon, color, bg, text, time, badge }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-w-border last:border-0">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
        <span className={`text-sm ${color}`}>{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-w-text leading-snug">{text}</p>
        <p className="text-[10px] text-w-text-dim mt-0.5">{time}</p>
      </div>
      {badge && (
        <span className="text-[10px] bg-blue-50 text-w-accent font-semibold px-2 py-0.5 rounded-full shrink-0 border border-blue-200">
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
    color: "text-w-accent",
    bg: "bg-blue-50",
    text: "Scout scraped 142 leads from Google Maps",
    time: "2 min ago",
    badge: "New",
  },
  {
    icon: "✅",
    color: "text-w-accent2",
    bg: "bg-emerald-50",
    text: "Rahul Sharma — booking call intent detected",
    time: "5 min ago",
    badge: "Hot",
  },
  {
    icon: "⚠️",
    color: "text-w-accent3",
    bg: "bg-amber-50",
    text: "Vikram Bajaj escalated to human review",
    time: "8 min ago",
    badge: null,
  },
  {
    icon: "📤",
    color: "text-w-accent4",
    bg: "bg-violet-50",
    text: "89 messages scheduled for 6:00 PM send",
    time: "12 min ago",
    badge: null,
  },
];

export default function ActivityFeed() {
  return (
    <div className="bg-w-surface rounded-lg p-4 border border-w-border">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-w-text">Live Activity</h2>
        <span className="flex items-center gap-1 text-[10px] text-w-accent2 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-w-accent2 animate-pulse" />
          Live
        </span>
      </div>

      {activities.map((item, i) => (
        <ActivityItem key={i} {...item} />
      ))}
    </div>
  );
}