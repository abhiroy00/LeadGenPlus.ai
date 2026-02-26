import { useState } from "react";
import { Plus, Search, X, ArrowLeft, Save, Play } from "lucide-react";
import CampaignCard        from "../campaigns/CampaignCard";
import FlowCanvas          from "../campaigns/FlowCanvas";
import React from "react";

// ── Mock campaigns ──────────────────────────────────────────
const MOCK_CAMPAIGNS = [
  {
    id:1, name:"SaaS Founders Q1",     description:"Target SaaS founders via LinkedIn outreach",
    status:"Active",    channel:"💬 WhatsApp", leads:"8,420", nodes:7,
    sent:"8,420", opened:"7,073", replied:"404", converted:"48",
    openRate:"84%", replyRate:"4.8%", startDate:"Jan 15, 2026",
  },
  {
    id:2, name:"Restaurant Delhi NCR",  description:"Local restaurant owners in Delhi via Google Maps",
    status:"Active",    channel:"💬 WhatsApp", leads:"3,200", nodes:5,
    sent:"3,200", opened:"2,560", replied:"128", converted:"18",
    openRate:"80%", replyRate:"4.0%", startDate:"Feb 1, 2026",
  },
  {
    id:3, name:"E-Commerce Retarget",   description:"Re-engage cold leads from previous campaigns",
    status:"Paused",    channel:"💬 WhatsApp", leads:"5,100", nodes:6,
    sent:"4,200", opened:"3,024", replied:"183", converted:"22",
    openRate:"72%", replyRate:"3.6%", startDate:"Jan 28, 2026",
  },
  {
    id:4, name:"Real Estate Mumbai",    description:"Property consultants and brokers in Mumbai",
    status:"Active",    channel:"💬 WhatsApp", leads:"2,800", nodes:8,
    sent:"2,800", opened:"2,184", replied:"98",  converted:"14",
    openRate:"78%", replyRate:"3.5%", startDate:"Feb 10, 2026",
  },
  {
    id:5, name:"Healthcare Outreach",   description:"Clinics and diagnostic centres nationwide",
    status:"Draft",     channel:"💬 WhatsApp", leads:"0",     nodes:3,
    sent:"—", opened:"—", replied:"—", converted:"—",
    openRate:"0%", replyRate:"0%", startDate:"Not started",
  },
  {
    id:6, name:"EdTech Cold Outreach",  description:"Ed-tech founders and coaching institute owners",
    status:"Completed", channel:"💬 WhatsApp", leads:"6,000", nodes:9,
    sent:"6,000", opened:"4,980", replied:"312", converted:"54",
    openRate:"83%", replyRate:"5.2%", startDate:"Dec 2025",
  },
];

// ── Create Campaign Modal ───────────────────────────────────
function CreateCampaignModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-slate-800">Create New Campaign</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl text-slate-400">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Campaign Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. SaaS Founders Q2"
              className="mt-1.5 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Description</label>
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Who are you targeting and why?"
              rows={3}
              className="mt-1.5 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Channel</label>
            <select className="mt-1.5 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option>💬 WhatsApp</option>
              <option>📧 Email</option>
              <option>📱 SMS</option>
            </select>
          </div>

          {/* Templates */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Start from template</label>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {["Blank Flow","Follow-up Series","Lead Nurture","Demo Booking"].map(t => (
                <button key={t} className="text-xs border border-gray-200 rounded-xl px-3 py-2 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left font-medium text-slate-600">
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 text-sm font-medium text-slate-600 hover:bg-gray-100 rounded-xl transition-colors">
            Cancel
          </button>
          <button
            onClick={() => { if (name) { onCreate({ name, desc }); onClose(); } }}
            disabled={!name}
            className="flex-1 py-2.5 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Create & Open Builder
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Campaigns Page ──────────────────────────────────────────
export default function CampaignsPage() {
  const [campaigns, setCampaigns]     = useState(MOCK_CAMPAIGNS);
  const [search,    setSearch]        = useState("");
  const [filter,    setFilter]        = useState("All");
  const [builder,   setBuilder]       = useState(null);   // campaign being edited in builder
  const [showCreate,setShowCreate]    = useState(false);

  const FILTERS = ["All","Active","Paused","Draft","Completed"];

  const filtered = campaigns.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || c.status === filter;
    return matchSearch && matchFilter;
  });

  const toggleStatus = (id) => {
    setCampaigns(prev => prev.map(c =>
      c.id === id
        ? { ...c, status: c.status === "Active" ? "Paused" : c.status === "Paused" ? "Active" : c.status }
        : c
    ));
  };

  const createCampaign = ({ name, desc }) => {
    const newC = {
      id: Date.now(), name, description: desc,
      status:"Draft", channel:"💬 WhatsApp", leads:"0", nodes:1,
      sent:"—", opened:"—", replied:"—", converted:"—",
      openRate:"0%", replyRate:"0%", startDate:"Just created",
    };
    setCampaigns(prev => [newC, ...prev]);
    setBuilder(newC);
  };

  // ── Builder view ──
  if (builder) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Builder TopBar */}
        <div className="bg-white border-b border-gray-100 px-5 py-3 flex items-center gap-3 shrink-0">
          <button onClick={() => setBuilder(null)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
          <div className="w-px h-5 bg-gray-200" />
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-800">{builder.name}</p>
            <p className="text-xs text-slate-400">Campaign Flow Builder</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 text-slate-600 transition-colors">
              <Save size={14} /> Save Draft
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
              <Play size={14} /> Launch Campaign
            </button>
          </div>
        </div>

        {/* Flow Canvas */}
        <div className="flex-1 overflow-hidden">
          <FlowCanvas campaign={builder} />
        </div>
      </div>
    );
  }

  // ── List view ──
  return (
    <div className="min-h-screen bg-w-bg">

      {/* Header */}
      <div className="bg-w-bg  border-gray-100 px-5 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-bold text-slate-800">Campaigns</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {campaigns.filter(c => c.status === "Active").length} active ·{" "}
              {campaigns.length} total campaigns
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            <Plus size={16} /> New Campaign
          </button>
        </div>

        {/* Search + filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search campaigns..."
              className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-1">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  filter === f ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-gray-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Grid */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-3 text-center py-20 text-slate-400 text-sm">
            No campaigns found.
          </div>
        ) : (
          filtered.map(c => (
            <CampaignCard
              key={c.id}
              campaign={c}
              onOpen={setBuilder}
              onToggle={toggleStatus}
            />
          ))
        )}
      </div>

      {/* Create Modal */}
      {showCreate && (
        <CreateCampaignModal
          onClose={() => setShowCreate(false)}
          onCreate={createCampaign}
        />
      )}
    </div>
  );
}
