import React from "react";

export default function ConditionNode() {
  return (
    <div className="bg-white border border-purple-300 rounded-xl p-4 min-w-[260px] shadow-sm hover:shadow-md transition">
      <div className="mb-2">
        <span className="text-[9px] font-bold uppercase bg-purple-100 text-purple-700 px-2 py-1 rounded">
          🔀 Condition
        </span>
      </div>

      <h3 className="text-sm font-semibold text-[#1a1a2e]">
        Did Lead Reply?
      </h3>

      <p className="text-[10px] text-[#999990] mt-1 mb-3">
        Check WhatsApp reply status
      </p>

      {/* Branch Labels */}
      <div className="flex justify-between mt-2">
        <span className="text-[9px] font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">
          YES ✓
        </span>

        <span className="text-[9px] font-bold bg-red-100 text-red-600 px-3 py-1 rounded-full">
          NO ✕
        </span>
      </div>
    </div>
  );
}