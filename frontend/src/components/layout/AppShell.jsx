import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Megaphone, MessageCircle, ChartBar as BarChart2, Bot, Search, Bell, CreditCard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Dropdown from "../ui/Dropdown";
import React from "react";

const navItems = [
  { to: "/", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { to: "/leads", icon: <Users size={18} />, label: "Leads" },
  { to: "/campaigns", icon: <Megaphone size={18} />, label: "Campaigns" },
  { to: "/inbox", icon: <MessageCircle size={18} />, label: "Inbox" },
  { to: "/analytics", icon: <BarChart2 size={18} />, label: "Analytics" },
  { to: "/agents", icon: <Bot size={18} />, label: "AI Agents" },
  { to: "/billing", icon: <CreditCard size={18} />, label: "Billing" },
];

export default function AppShell() {
  const { user, logout } = useAuth();

  const userMenuItems = [
    { label: 'Profile', href: '/profile' },
    { label: 'Settings', href: '/settings' },
    { label: 'Help', href: '/help' },
    { type: 'divider' },
    { label: 'Sign Out', onClick: logout },
  ];

  return (
    <div className="flex flex-col h-screen bg-w-bg font-sans">
      {/* Top Navigation */}
      <header className="h-[52px] bg-w-sidebar border-b border-slate-700 flex items-center px-5 gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-w-accent2 rounded-lg flex items-center justify-center text-white text-base">
            🤖
          </div>
          <span className="text-white font-bold text-sm">LeadGenAI</span>
        </div>
        
        <div className="flex-1" />
        
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `text-xs transition-colors ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="w-6" />
        
        <div className="flex items-center gap-2">
          <div className="relative max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search leads, campaigns..."
              className="w-full pl-8 pr-3 py-2 text-xs bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
            />
          </div>
          <button className="relative p-2 rounded-lg hover:bg-slate-700 transition-colors">
            <Bell size={16} className="text-slate-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <Dropdown items={userMenuItems} align="right">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:ring-2 hover:ring-white/20 transition-all">
              {user?.avatar || 'U'}
            </div>
          </Dropdown>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
        <aside className="w-[200px] bg-w-sidebar text-white flex flex-col shrink-0">
          <nav className="flex-1 py-4 space-y-0">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-5 py-2.5 text-xs transition-all ${
                  isActive 
                    ? "bg-white/8 text-white" 
                    : "text-slate-400 hover:bg-white/8 hover:text-white"
                }`
              }
            >
              {item.icon}
              {item.label}
              {item.label === "Leads" && (
                <span className="ml-auto bg-w-accent2 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  2.4K
                </span>
              )}
              {item.label === "Inbox" && (
                <span className="ml-auto bg-w-accent2 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  48
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
        <main className="flex-1 overflow-auto bg-w-bg">
        <Outlet />
      </main>
      </div>
    </div>
  );
}