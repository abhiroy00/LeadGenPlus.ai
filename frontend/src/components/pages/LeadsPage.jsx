import React from 'react';
import { useState, useMemo } from "react";
import LeadsTable      from "../leads/LeadsTable";
import LeadFilterBar   from "../leads/LeadFilterBar";
import LeadDetailPanel from "../leads/LeadDetailPanel";
import LeadImportModal from "../leads/LeadImportModal";

// ── Mock Data ───────────────────────────────────────────────
const MOCK_LEADS = [
  { id:1,  name:"Rahul Sharma",    company:"Sharma Foods Pvt Ltd",   phone:"+91 98100 11234", source:"Google Maps", score:92, status:"Interested",  campaign:"Restaurant Delhi",   location:"Delhi, IN",    lastContact:"2h ago",   aiNote:"High intent — mentioned budget. Follow up with pricing." },
  { id:2,  name:"Priya Mehta",     company:"TechVision Solutions",   phone:"+91 87654 32100", source:"LinkedIn",    score:85, status:"Demo Booked",  campaign:"SaaS Founders Q1",   location:"Bangalore, IN",lastContact:"5h ago",   aiNote:"Asked about API integrations. Send tech docs before demo." },
  { id:3,  name:"Vikram Bajaj",    company:"Bajaj Retail Chain",     phone:"+91 99001 22334", source:"Google Maps", score:76, status:"Contacted",    campaign:"Restaurant Delhi",   location:"Mumbai, IN",   lastContact:"1d ago",   aiNote:"Third follow-up needed. Consider different message angle." },
  { id:4,  name:"Sneha Kapoor",    company:"Kapoor & Associates",    phone:"+91 70012 34567", source:"Import",      score:68, status:"New",          campaign:"SaaS Founders Q1",   location:"Pune, IN",     lastContact:"2d ago",   aiNote:null },
  { id:5,  name:"Arjun Singh",     company:"Singh Hospitality Group",phone:"+91 81234 56789", source:"Google Maps", score:88, status:"Interested",   campaign:"Restaurant Delhi",   location:"Jaipur, IN",   lastContact:"3h ago",   aiNote:"Runs 3 restaurants. High LTV potential." },
  { id:6,  name:"Deepa Nair",      company:"NairTech Pvt Ltd",       phone:"+91 90012 67890", source:"LinkedIn",    score:55, status:"Contacted",    campaign:"SaaS Founders Q1",   location:"Chennai, IN",  lastContact:"3d ago",   aiNote:null },
  { id:7,  name:"Rohan Gupta",     company:"Gupta Ecom Ventures",    phone:"+91 78901 23456", source:"Manual",      score:72, status:"New",          campaign:"E-Commerce Retarget",location:"Hyderabad, IN",lastContact:"1d ago",   aiNote:null },
  { id:8,  name:"Ananya Reddy",    company:"Reddy Real Estate",      phone:"+91 62345 78901", source:"Google Maps", score:81, status:"Demo Booked",  campaign:"Real Estate Mumbai", location:"Mumbai, IN",   lastContact:"4h ago",   aiNote:"Looking for CRM + WhatsApp combo. Strong lead." },
  { id:9,  name:"Karan Malhotra",  company:"Malhotra Clinics",       phone:"+91 95678 90123", source:"Import",      score:44, status:"Unqualified",  campaign:"Healthcare Outreach",location:"Delhi, IN",    lastContact:"5d ago",   aiNote:null },
  { id:10, name:"Meera Joshi",     company:"Joshi Media Works",      phone:"+91 88765 43210", source:"LinkedIn",    score:79, status:"New",          campaign:"SaaS Founders Q1",   location:"Mumbai, IN",   lastContact:"6h ago",   aiNote:null },
  { id:11, name:"Suresh Pillai",   company:"Pillai Textiles",        phone:"+91 73456 12345", source:"Google Maps", score:63, status:"Contacted",    campaign:"E-Commerce Retarget",location:"Kochi, IN",    lastContact:"2d ago",   aiNote:null },
  { id:12, name:"Pooja Verma",     company:"Verma Cloud Solutions",  phone:"+91 91234 56780", source:"LinkedIn",    score:90, status:"Converted",    campaign:"SaaS Founders Q1",   location:"Noida, IN",    lastContact:"1d ago",   aiNote:"Closed! Onboarding scheduled for next week." },
];

// ── Leads Page ──────────────────────────────────────────────
export default function LeadsPage() {
  const [search,      setSearch]      = useState("");
  const [status,      setStatus]      = useState("All");
  const [source,      setSource]      = useState("All Sources");
  const [selectedLead,setSelectedLead]= useState(null);
  const [showImport,  setShowImport]  = useState(false);

  // Filter logic
  const filtered = useMemo(() => {
    return MOCK_LEADS.filter((lead) => {
      const matchSearch = !search ||
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search) ||
        lead.company.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "All" || lead.status === status;
      const matchSource = source === "All Sources" || lead.source === source;

      return matchSearch && matchStatus && matchSource;
    });
  }, [search, status, source]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">

      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-lg font-bold text-slate-800">Leads CRM</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            <span className="text-emerald-500 font-semibold">● </span>
            {MOCK_LEADS.length} total leads · {MOCK_LEADS.filter(l => l.status === "Interested" || l.status === "Demo Booked").length} hot
          </p>
        </div>
        <button
          onClick={() => setShowImport(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          + Import Leads
        </button>
      </div>

      {/* ── Filter Bar ── */}
      <LeadFilterBar
        search={search}       onSearch={setSearch}
        status={status}       onStatus={setStatus}
        source={source}       onSource={setSource}
        onRefresh={() => {}}
        total={filtered.length}
      />

      {/* ── Main Content ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Table */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <LeadsTable
            leads={filtered}
            onLeadClick={setSelectedLead}
            selectedLead={selectedLead}
          />
        </div>

        {/* Detail Panel — slides in when lead is selected */}
        {selectedLead && (
          <LeadDetailPanel
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
          />
        )}
      </div>

      {/* ── Import Modal ── */}
      {showImport && <LeadImportModal onClose={() => setShowImport(false)} />}
    </div>
  );
}
