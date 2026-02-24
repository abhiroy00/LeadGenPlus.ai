import React from "react";

export default function MessageNode() {
  return (
    <div className="bg-white border border-blue-300 rounded-xl p-4 min-w-[240px] shadow-sm hover:shadow-md transition">
      <div className="mb-2">
        <span className="text-[9px] font-bold uppercase bg-blue-100 text-blue-700 px-2 py-1 rounded">
          💬 Action
        </span>
      </div>

      <h3 className="text-sm font-semibold text-[#1a1a2e]">
        Send WhatsApp Message
      </h3>

      <p className="text-[10px] text-[#999990] mt-1">
        AI-written intro message via Meta API
      </p>
    </div>
  );
}