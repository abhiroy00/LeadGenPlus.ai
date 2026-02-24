import React from "react";
import { useState } from "react";
import { X, Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";

const STEPS = ["Upload File", "Map Columns", "Review", "Import"];

export default function LeadImportModal({ onClose }) {
  const [step, setStep]         = useState(0);
  const [dragging, setDragging] = useState(false);
  const [file, setFile]         = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) { setFile(dropped); setStep(1); }
  };

  const handleFile = (e) => {
    const picked = e.target.files[0];
    if (picked) { setFile(picked); setStep(1); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-slate-800">Import Leads</h2>
            <p className="text-xs text-slate-400 mt-0.5">Upload CSV or Excel file</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-slate-400 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Step progress */}
        <div className="px-6 py-3 flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i < step  ? "bg-emerald-500 text-white" :
                i === step ? "bg-blue-600 text-white" :
                "bg-gray-100 text-slate-400"
              }`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-xs font-medium ${i === step ? "text-slate-800" : "text-slate-400"}`}>{s}</span>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-emerald-300" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="px-6 py-4">

          {/* Step 0 — Upload */}
          {step === 0 && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-10 text-center transition-colors ${
                dragging ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
              }`}
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload size={24} className="text-blue-500" />
              </div>
              <p className="text-sm font-semibold text-slate-700 mb-1">Drop your file here</p>
              <p className="text-xs text-slate-400 mb-4">Supports CSV, XLS, XLSX — max 10MB</p>
              <label className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer transition-colors">
                <FileText size={14} />
                Browse File
                <input type="file" accept=".csv,.xls,.xlsx" className="hidden" onChange={handleFile} />
              </label>
            </div>
          )}

          {/* Step 1 — Map Columns */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm text-slate-600 mb-3">
                File: <span className="font-semibold text-slate-800">{file?.name}</span>
              </p>
              {[
                { csv: "Name",    map: "name"    },
                { csv: "Mobile",  map: "phone"   },
                { csv: "Biz",     map: "company" },
                { csv: "City",    map: "location"},
              ].map((col) => (
                <div key={col.csv} className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-slate-600">
                    {col.csv}
                  </div>
                  <span className="text-slate-300 text-lg">→</span>
                  <select className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value={col.map}>{col.map}</option>
                    <option>name</option>
                    <option>phone</option>
                    <option>company</option>
                    <option>location</option>
                    <option>skip</option>
                  </select>
                </div>
              ))}
            </div>
          )}

          {/* Step 2 — Review */}
          {step === 2 && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Total Rows",   value: "1,240", icon: <FileText size={16} className="text-blue-500" />,    bg: "bg-blue-50"    },
                  { label: "Valid",         value: "1,198", icon: <CheckCircle2 size={16} className="text-emerald-500" />, bg: "bg-emerald-50" },
                  { label: "Duplicates",    value: "42",    icon: <AlertCircle size={16} className="text-amber-500" />,    bg: "bg-amber-50"   },
                ].map((s) => (
                  <div key={s.label} className={`${s.bg} rounded-xl p-3 text-center`}>
                    <div className="flex justify-center mb-1">{s.icon}</div>
                    <p className="text-lg font-bold text-slate-800">{s.value}</p>
                    <p className="text-xs text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-2">
                <AlertCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700">42 duplicate phone numbers will be skipped automatically.</p>
              </div>
            </div>
          )}

          {/* Step 3 — Done */}
          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-emerald-500" />
              </div>
              <p className="text-lg font-bold text-slate-800 mb-1">Import Complete!</p>
              <p className="text-sm text-slate-500">1,198 leads added successfully.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between">
          <button
            onClick={() => step > 0 ? setStep(s => s - 1) : onClose()}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            {step === 0 ? "Cancel" : "Back"}
          </button>
          {step < 3 && (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={step === 0 && !file}
              className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {step === 2 ? "Import 1,198 Leads" : "Continue"}
            </button>
          )}
          {step === 3 && (
            <button onClick={onClose} className="px-5 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors">
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
