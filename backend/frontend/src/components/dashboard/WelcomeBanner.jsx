import React from "react";
import { useState } from "react";

export default function WelcomeBanner() {
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  });

  return (
    <div className="bg-w-surface border border-w-border rounded-lg p-5 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -right-8 -top-8 w-40 h-40 bg-w-accent/5 rounded-full pointer-events-none" />
      <div className="absolute -right-4 top-10 w-24 h-24 bg-w-accent/3 rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-w-text mb-1">{greeting}, Arjun 👋</h1>
          <p className="text-xs text-w-text-dim">
            Here's your campaign performance overview — Today, Feb 22
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button className="flex items-center gap-2 bg-w-accent text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            New Campaign
          </button>
          <button className="flex items-center gap-2 bg-w-surface2 text-w-text-mid text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors border border-w-border">
            View Report
          </button>
        </div>
      </div>
    </div>
  );
}