function Metric({ label, value, color }) {
  return (
    <div className="text-center">
      <p className={`text-sm font-bold ${color}`}>{value}</p>
      <p className="text-[10px] text-slate-400 mt-0.5">{label}</p>
    </div>
  );
}

export default function CampaignMetricsBar({ sent, opened, replied, converted, openRate, replyRate }) {
  return (
    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
      <Metric label="Sent"      value={sent}      color="text-slate-700" />
      <div className="w-px h-6 bg-gray-100" />
      <Metric label="Opened"    value={opened}    color="text-blue-600"    />
      <div className="w-px h-6 bg-gray-100" />
      <Metric label="Replied"   value={replied}   color="text-emerald-600" />
      <div className="w-px h-6 bg-gray-100" />
      <Metric label="Converted" value={converted} color="text-violet-600"  />

      {/* Progress bars */}
      <div className="flex-1 ml-2 space-y-1.5">
        <div>
          <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
            <span>Open Rate</span><span>{openRate}</span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: openRate }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
            <span>Reply Rate</span><span>{replyRate}</span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: replyRate }} />
          </div>
        </div>
      </div>
    </div>
  );
}
