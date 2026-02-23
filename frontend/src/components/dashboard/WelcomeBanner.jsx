import { Play } from "lucide-react";
import { useState } from "react";
import React from "react";

export default function WelcomeBanner() {
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  });

  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full pointer-events-none" />
      <div className="absolute -right-4 top-10 w-24 h-24 bg-white/5 rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-blue-200 text-sm font-medium mb-1">{greeting}, Arjun 👋</p>
          <h1 className="text-xl sm:text-2xl font-bold mb-1">Your leads are humming today!</h1>
          <p className="text-blue-200 text-sm">
            <span className="text-white font-semibold">8 AI agents</span> active ·{" "}
            <span className="text-white font-semibold">142 new leads</span> scraped this morning
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button className="flex items-center gap-2 bg-white text-blue-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors">
            <Play size={14} />
            New Campaign
          </button>
          <button className="flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-white/30 transition-colors border border-white/20">
            View Report
          </button>
        </div>
      </div>
    </div>
  );
}