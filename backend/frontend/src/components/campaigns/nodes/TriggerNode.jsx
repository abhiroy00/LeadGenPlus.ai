import React from "react";

export default function TriggerNode() {
  return (
    <div className="bg-white border border-yellow-300 rounded-xl p-4 min-w-[240px] shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[9px] font-bold uppercase bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
          ⚡ Trigger
        </span>
      </div>

      <h3 className="text-sm font-semibold text-[#1a1a2e]">
        New Lead Added
      </h3>

      <p className="text-[10px] text-[#999990] mt-1 leading-relaxed">
        When lead score ≥ 50 and source = LinkedIn or Google Maps
      </p>
    </div>
  );
}