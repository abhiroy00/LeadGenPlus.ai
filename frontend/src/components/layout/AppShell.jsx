import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Megaphone, MessageCircle, BarChart2, Bot } from "lucide-react";
import React from "react";

const navItems = [
  { to: "/", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { to: "/leads", icon: <Users size={18} />, label: "Leads" },
  { to: "/campaigns", icon: <Megaphone size={18} />, label: "Campaigns" },
  { to: "/inbox", icon: <MessageCircle size={18} />, label: "Inbox" },
  { to: "/analytics", icon: <BarChart2 size={18} />, label: "Analytics" },
  { to: "/agents", icon: <Bot size={18} />, label: "AI Agents" },
];

export default function AppShell() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-56 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="px-5 py-4 border-b border-slate-700">
          <span className="font-bold text-blue-400 text-lg">🤖 LeadGenPlus</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  isActive ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}