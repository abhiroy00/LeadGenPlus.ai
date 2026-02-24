import React from "react";
import { Play, Pause, Settings, MoreHorizontal, Users, Calendar } from "lucide-react";
import CampaignStatusBadge from "./CampaignStatusBadge";
import CampaignMetricsBar  from "./CampaignMetricsBar";

export default function CampaignCard({ campaign, onOpen, onToggle }) {
  const isActive = campaign.status === "Active";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5">

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0 pr-3">
          <div className="flex items-center gap-2 mb-1">
            <CampaignStatusBadge status={campaign.status} />
            <span className="text-[10px] text-slate-400 font-medium">{campaign.channel}</span>
          </div>
          <h3 className="text-sm font-bold text-slate-800 truncate">{campaign.name}</h3>
          <p className="text-xs text-slate-400 mt-0.5 truncate">{campaign.description}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(campaign.id); }}
            className={`p-2 rounded-xl transition-colors ${
              isActive
                ? "bg-amber-50 hover:bg-amber-100 text-amber-600"
                : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600"
            }`}
            title={isActive ? "Pause" : "Resume"}
          >
            {isActive ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={() => onOpen(campaign)}
            className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
            title="Open Builder"
          >
            <Settings size={14} />
          </button>
          <button className="p-2 rounded-xl hover:bg-gray-100 text-slate-400 transition-colors">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Info row */}
      <div className="flex items-center gap-3 text-xs text-slate-500 mb-1">
        <span className="flex items-center gap-1">
          <Users size={11} /> {campaign.leads} leads
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={11} /> {campaign.startDate}
        </span>
        <span className="ml-auto text-[10px] bg-slate-50 px-2 py-0.5 rounded-full font-medium text-slate-500">
          {campaign.nodes} nodes
        </span>
      </div>

      {/* Metrics */}
      <CampaignMetricsBar
        sent={campaign.sent}
        opened={campaign.opened}
        replied={campaign.replied}
        converted={campaign.converted}
        openRate={campaign.openRate}
        replyRate={campaign.replyRate}
      />
    </div>
  );
}
