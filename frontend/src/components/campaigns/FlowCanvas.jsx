import React from "react";
import { useState, useRef, useCallback } from "react";
import { Plus, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import {
  TriggerNode, MessageNode, DelayNode, ConditionNode, GoalNode,
  NODE_TYPES
} from "./Nodes";

// ── Default flow for a new campaign ────────────────────────
const DEFAULT_NODES = [
  { id:"n1", type:"trigger",   x:320, y:40,  title:"New Lead Added",      subtitle:"When a lead enters campaign",  tags:["Google Maps","LinkedIn"] },
  { id:"n2", type:"message",   x:320, y:200, title:"Welcome Message",     message:"Hi {name}! We noticed you run {company}. We help businesses like yours get more customers via WhatsApp 🚀", hasMedia:false },
  { id:"n3", type:"delay",     x:320, y:380, title:"Wait before follow-up", value:"24", unit:"Hours", reason:"Optimal reply window" },
  { id:"n4", type:"condition", x:320, y:540, title:"Did they reply?",      condition:"Check if lead replied to message" },
  { id:"n5", type:"message",   x:160, y:700, title:"Follow-up Message",   message:"Hey {name}, just checking in! Would love to show you how we can help {company} grow 📈", hasMedia:false },
  { id:"n6", type:"goal",      x:500, y:700, title:"Mark Interested",     description:"Lead replied — tag as Interested", count:89 },
];

const DEFAULT_EDGES = [
  { id:"e1", from:"n1", to:"n2" },
  { id:"e2", from:"n2", to:"n3" },
  { id:"e3", from:"n3", to:"n4" },
  { id:"e4", from:"n4", to:"n5" },
  { id:"e5", from:"n4", to:"n6" },
];

const NODE_HEIGHT = 160;
const NODE_WIDTH  = 208;

// ── Render correct node by type ─────────────────────────────
function NodeRenderer({ node, selected, onClick }) {
  const props = { node, selected, onClick };
  switch (node.type) {
    case "trigger":   return <TriggerNode   {...props} />;
    case "message":   return <MessageNode   {...props} />;
    case "delay":     return <DelayNode     {...props} />;
    case "condition": return <ConditionNode {...props} />;
    case "goal":      return <GoalNode      {...props} />;
    default:          return null;
  }
}

// ── SVG edge between two nodes ──────────────────────────────
function Edge({ fromX, fromY, toX, toY }) {
  const midY = (fromY + toY) / 2;
  const d = `M ${fromX} ${fromY} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${toY}`;
  return (
    <g>
      <path d={d} stroke="#cbd5e1" strokeWidth="2" fill="none" strokeDasharray="6 3" />
      {/* arrowhead */}
      <polygon
        points={`${toX},${toY} ${toX-5},${toY-8} ${toX+5},${toY-8}`}
        fill="#94a3b8"
      />
    </g>
  );
}

// ── Node palette ────────────────────────────────────────────
function NodePalette({ onAdd }) {
  return (
    <div className="flex flex-col gap-1.5">
      {Object.entries(NODE_TYPES).map(([type, t]) => (
        <button
          key={type}
          onClick={() => onAdd(type)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-all hover:scale-105 ${t.bg} ${t.text} ${t.color}`}
        >
          <span>{t.icon}</span>
          <span>{t.label}</span>
          <Plus size={11} className="ml-auto" />
        </button>
      ))}
    </div>
  );
}

// ── Main FlowCanvas ─────────────────────────────────────────
export default function FlowCanvas({ campaign }) {
  const [nodes,    setNodes]    = useState(DEFAULT_NODES);
  const [edges]                  = useState(DEFAULT_EDGES);
  const [selected, setSelected] = useState(null);
  const [zoom,     setZoom]     = useState(1);
  const [pan,      setPan]      = useState({ x: 0, y: 0 });
  const canvasRef               = useRef(null);
  const dragging                = useRef(null);

  // ── Drag nodes ──
  const onMouseDown = useCallback((e, nodeId) => {
    e.stopPropagation();
    dragging.current = { nodeId, startX: e.clientX, startY: e.clientY };
    setSelected(nodeId);

    const onMove = (me) => {
      if (!dragging.current) return;
      const dx = (me.clientX - dragging.current.startX) / zoom;
      const dy = (me.clientY - dragging.current.startY) / zoom;
      dragging.current.startX = me.clientX;
      dragging.current.startY = me.clientY;
      setNodes(prev => prev.map(n =>
        n.id === nodeId ? { ...n, x: n.x + dx, y: n.y + dy } : n
      ));
    };
    const onUp = () => {
      dragging.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [zoom]);

  // ── Add node ──
  const addNode = (type) => {
    const id = `n${Date.now()}`;
    setNodes(prev => [...prev, {
      id, type, x: 100 + Math.random() * 200, y: 100 + Math.random() * 200,
      title: NODE_TYPES[type].label,
      subtitle: "Configure this node",
      message: "Enter your message here...",
      value: "1", unit: "Day", reason: "Wait period",
      condition: "Define condition",
      description: "Goal description",
      tags: [],
    }]);
  };

  // ── Compute edge positions ──
  const getEdgeCoords = (fromId, toId) => {
    const from = nodes.find(n => n.id === fromId);
    const to   = nodes.find(n => n.id === toId);
    if (!from || !to) return null;
    return {
      fromX: from.x + NODE_WIDTH / 2,
      fromY: from.y + NODE_HEIGHT - 10,
      toX:   to.x   + NODE_WIDTH / 2,
      toY:   to.y + 10,
    };
  };

  return (
    <div className="flex h-full">

      {/* ── Left Palette ── */}
      <div className="w-44 bg-white border-r border-gray-100 p-3 flex flex-col gap-3 shrink-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Add Node</p>
        <NodePalette onAdd={addNode} />
        <div className="mt-auto pt-3 border-t border-gray-100 space-y-1 text-xs text-slate-400">
          <p>🖱️ Drag to move nodes</p>
          <p>🔍 Scroll to zoom</p>
          <p>👆 Click to select</p>
        </div>
      </div>

      {/* ── Canvas ── */}
      <div className="flex-1 relative overflow-hidden bg-slate-50"
        style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      >
        {/* Zoom controls */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
          <button onClick={() => setZoom(z => Math.min(z + 0.1, 2))}   className="w-8 h-8 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-slate-600 hover:bg-gray-50 shadow-sm"><ZoomIn  size={14} /></button>
          <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.4))} className="w-8 h-8 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-slate-600 hover:bg-gray-50 shadow-sm"><ZoomOut size={14} /></button>
          <button onClick={() => { setZoom(1); setPan({x:0,y:0}); }}    className="w-8 h-8 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-slate-600 hover:bg-gray-50 shadow-sm"><Maximize2 size={12}/></button>
          <div className="text-[10px] text-center text-slate-400 mt-1 font-mono">{Math.round(zoom * 100)}%</div>
        </div>

        {/* Zoomable area */}
        <div
          ref={canvasRef}
          style={{ transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`, transformOrigin: "top left", width: "100%", height: "100%" }}
          onClick={() => setSelected(null)}
        >
          {/* SVG Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {edges.map(e => {
              const coords = getEdgeCoords(e.from, e.to);
              return coords ? <Edge key={e.id} {...coords} /> : null;
            })}
          </svg>

          {/* Nodes */}
          {nodes.map(node => (
            <div
              key={node.id}
              style={{ position: "absolute", left: node.x, top: node.y, zIndex: 2 }}
              onMouseDown={(e) => onMouseDown(e, node.id)}
            >
              <NodeRenderer
                node={node}
                selected={selected === node.id}
                onClick={(e) => { e?.stopPropagation?.(); setSelected(node.id); }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Node Inspector ── */}
      {selected && (() => {
        const node = nodes.find(n => n.id === selected);
        if (!node) return null;
        const t = NODE_TYPES[node.type];
        return (
          <div className="w-60 bg-white border-l border-gray-100 p-4 shrink-0 overflow-y-auto">
            <div className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-xl ${t.bg}`}>
              <span className="text-lg">{t.icon}</span>
              <div>
                <p className={`text-xs font-bold ${t.text}`}>{t.label}</p>
                <p className="text-[10px] text-slate-400">Node Inspector</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Title</label>
                <input
                  defaultValue={node.title}
                  className="mt-1 w-full text-xs border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setNodes(prev => prev.map(n => n.id === node.id ? { ...n, title: e.target.value } : n))}
                />
              </div>

              {node.type === "message" && (
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Message</label>
                  <textarea
                    defaultValue={node.message}
                    rows={5}
                    className="mt-1 w-full text-xs border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    onChange={(e) => setNodes(prev => prev.map(n => n.id === node.id ? { ...n, message: e.target.value } : n))}
                  />
                  <p className="text-[9px] text-slate-400 mt-1">Use {"{name}"}, {"{company}"} as variables</p>
                </div>
              )}

              {node.type === "delay" && (
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Value</label>
                    <input type="number" defaultValue={node.value} className="mt-1 w-full text-xs border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Unit</label>
                    <select defaultValue={node.unit} className="mt-1 w-full text-xs border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Minutes</option>
                      <option>Hours</option>
                      <option>Days</option>
                    </select>
                  </div>
                </div>
              )}

              {node.type === "condition" && (
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Condition</label>
                  <select className="mt-1 w-full text-xs border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Did they reply?</option>
                    <option>Lead score &gt; 70</option>
                    <option>Message opened?</option>
                    <option>Link clicked?</option>
                  </select>
                </div>
              )}

              <button
                onClick={() => setNodes(prev => prev.filter(n => n.id !== node.id))}
                className="w-full mt-2 text-xs text-rose-500 hover:bg-rose-50 py-2 rounded-xl transition-colors font-medium"
              >
                🗑 Delete Node
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
