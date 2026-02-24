import React from "react";

export default function DelayNode() {
  return (
    <div className="bg-white border border-green-300 rounded-xl p-4 min-w-[240px] shadow-sm hover:shadow-md transition">
      <div className="mb-2">
        <span className="text-[9px] font-bold uppercase bg-green-100 text-green-700 px-2 py-1 rounded">
          ⏰ Delay
        </span>
      </div>

      <h3 className="text-sm font-semibold text-[#1a1a2e]">
        Wait 3 Days
      </h3>

      <p className="text-[10px] text-[#999990] mt-1">
        Pause until reply received OR 3 days elapsed
      </p>
    </div>
  );
}