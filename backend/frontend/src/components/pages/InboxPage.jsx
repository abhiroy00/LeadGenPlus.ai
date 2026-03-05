import React from "react";
import { useState } from "react";
import { Search, Bell } from "lucide-react";

// Mock chat data
const MOCK_CHATS = [
  { id: 1, name: "Rahul Sharma", avatar: "RS", company: "TechStart Pvt Ltd", preview: "Yes I'm interested, can we...", time: "2m", unread: 3, status: "hot", bg: "bg-blue-500" },
  { id: 2, name: "Priya Gupta", avatar: "PG", company: "FoodieHub", preview: "🤖 AI: Sure! Here's our pricing...", time: "15m", unread: 1, status: "ai", bg: "bg-purple-500" },
  { id: 3, name: "Vikram Bajaj", avatar: "VB", company: "AutoDrive Motors", preview: "When can we schedule a call?", time: "1h", unread: 2, status: "hot", bg: "bg-red-500" },
  { id: 4, name: "Amir Malik", avatar: "AM", company: "RealProp Realty", preview: "🤖 AI: Thanks for reaching out...", time: "3h", unread: 0, status: "ai", bg: "bg-green-500" },
  { id: 5, name: "Neha Kulkarni", avatar: "NK", company: "Fashion Store", preview: "Send me the brochure please", time: "4h", unread: 1, status: "normal", bg: "bg-yellow-500" },
  { id: 6, name: "Deepak Singh", avatar: "DS", company: "Tech Solutions", preview: "Not interested, please stop", time: "5h", unread: 0, status: "normal", bg: "bg-indigo-500" },
];

const MOCK_MESSAGES = [
  { id: 1, type: "ai-sent", text: "Hi Rahul! 👋 I noticed you're leading TechStart and recently posted about scaling customer acquisition challenges — completely resonates! We help SaaS founders like you automate lead gen using AI on WhatsApp + Email. Worth a quick 10-min chat? 🚀", time: "10:30 AM", status: "✓✓" },
  { id: 2, type: "received", text: "Interesting! We've been struggling with outbound. How does your system work exactly?", time: "10:45 AM" },
  { id: 3, type: "ai-sent", text: "Great question! Our AI agents automatically: 1) Find your ideal leads, 2) Write personalized messages for each, 3) Send on WhatsApp + Email, 4) Handle all replies 24/7 — so you only talk to hot leads! Clients see 85%+ open rates. Want to see a demo?", time: "10:45 AM", status: "✓✓" },
  { id: 4, type: "received", text: "Yes I'm interested, can we do a call this week? Maybe Thursday?", time: "11:02 AM" },
  { id: 5, type: "ai-draft", text: "Absolutely! 🎉 Thursday works perfectly. Here's my calendar link to pick a slot: [calendly.com/leadgenai/demo] — Looking forward to it!", time: "AI Draft — Review before sending", isDraft: true },
];

function ChatItem({ chat, isActive, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-2.5 p-3 border-b border-w-border cursor-pointer transition-colors ${
        isActive ? "bg-w-surface2 border-l-2 border-l-whatsapp" : "hover:bg-w-surface2"
      }`}
    >
      <div className={`w-10 h-10 rounded-full ${chat.bg} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
        {chat.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-w-text">{chat.name}</div>
        <div className="text-[10px] text-w-text-dim truncate">{chat.preview}</div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-[10px] text-w-text-dim">{chat.time}</div>
        {chat.unread > 0 && (
          <div className="w-4 h-4 bg-whatsapp rounded-full flex items-center justify-center text-white text-[9px] font-bold mt-1 ml-auto">
            {chat.unread}
          </div>
        )}
      </div>
    </div>
  );
}

function MessageBubble({ message }) {
  const isOutgoing = message.type === "ai-sent" || message.type === "ai-draft";
  const isAI = message.type.includes("ai");
  
  return (
    <div className={`flex flex-col ${isOutgoing ? "items-end" : "items-start"} mb-2.5`}>
      {isAI && (
        <div className="flex items-center gap-1 text-[9px] text-w-text-mid mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-w-accent3"></div>
          {message.type === "ai-sent" ? "AI sent · Day 0" : "AI drafting response..."}
        </div>
      )}
      <div className={`max-w-[70%] p-2.5 rounded-lg text-[11px] leading-relaxed ${
        isOutgoing 
          ? message.isDraft 
            ? "bg-yellow-100 text-w-text border border-yellow-300" 
            : "bg-green-100 text-w-text"
          : "bg-white text-w-text border border-w-border"
      } ${isOutgoing ? "rounded-br-sm" : "rounded-bl-sm"}`}>
        {message.text}
        <div className={`text-[9px] mt-1 text-right ${
          message.isDraft ? "text-green-600 font-medium" : "text-w-text-dim"
        }`}>
          {message.time} {message.status && <span className="ml-1">{message.status}</span>}
        </div>
      </div>
    </div>
  );
}

export default function InboxPage() {
  const [activeChat, setActiveChat] = useState(MOCK_CHATS[0]);
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex flex-col h-screen bg-w-bg">
      {/* Page Header */}
      <div className="bg-w-bg px-5 py-4 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-bold text-w-text">WhatsApp Inbox</h1>
          <p className="text-xs text-w-text-dim mt-0.5">
            48 unread · AI handling 35 chats automatically
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border  hover:bg-w-surface2 text-w-text-mid text-xs font-medium transition-colors">
            🤖 AI Mode: ON
          </button>
          <button className="flex items-center gap-2 bg-w-accent hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
            + New Broadcast
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden border border-w-border rounded-lg m-4 mt-0">
        {/* Chat List */}
        <div className="w-[300px] border-r border-w-border bg-w-surface flex flex-col shrink-0">
          {/* Search */}
          <div className="p-3 border-b border-w-border">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-w-text-dim" />
              <input
                placeholder="🔍  Search chats..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-w-surface2 border border-w-border rounded-full focus:outline-none focus:ring-2 focus:ring-w-accent text-w-text placeholder-w-text-dim"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-w-border">
            {["All (48)", "Hot 🔥 (12)", "AI (35)"].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center py-2 text-[11px] font-semibold transition-colors ${
                  i === 0 ? "text-whatsapp border-b-2 border-whatsapp" : "text-w-text-mid hover:text-w-text"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Chat Items */}
          <div className="flex-1 overflow-y-auto">
            {MOCK_CHATS.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                isActive={activeChat.id === chat.id}
                onClick={() => setActiveChat(chat)}
              />
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-gray-100" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}>
          {/* Chat Header */}
          <div className="h-[52px] bg-green-800 flex items-center px-3.5 gap-2.5 shrink-0">
            <div className={`w-9 h-9 rounded-full ${activeChat.bg} flex items-center justify-center text-white text-sm font-bold`}>
              {activeChat.avatar}
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-semibold">{activeChat.name} · {activeChat.company}</div>
              <div className="text-green-200 text-[10px]">🤖 AI Agent Active · Score: 92 🔥</div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-green-200 text-xs hover:text-white transition-colors">👤 Take Over</button>
              <button className="text-green-200 text-xs hover:text-white transition-colors">📅 Book Call</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3.5 overflow-y-auto">
            {MOCK_MESSAGES.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>

          {/* Hot Lead Alert */}
          <div className="px-3 py-1.5 bg-yellow-50 border-t border-yellow-200 text-[10px] text-yellow-800 flex items-center gap-1.5">
            🔥 <strong>Hot Lead Alert!</strong> Rahul wants to book a call. AI drafted reply — 
            <button className="underline font-semibold hover:no-underline">Review & Send</button> or 
            <button className="underline hover:no-underline">Edit</button>
          </div>

          {/* Input Area */}
          <div className="h-[52px] bg-w-surface flex items-center px-3 gap-2.5 border-t border-w-border">
            <button className="text-base">😊</button>
            <button className="text-base">📎</button>
            <div className="flex-1 h-9 bg-w-surface2 border border-w-border rounded-full px-3.5 flex items-center text-xs text-w-text-dim">
              Type a message or let AI handle it...
            </div>
            <button className="text-sm text-w-text-mid">🎤</button>
            <button className="w-9 h-9 bg-whatsapp rounded-full flex items-center justify-center text-white text-sm">
              ➤
            </button>
          </div>
        </div>

        {/* Lead Detail Panel */}
        <div className="w-[280px] border-l border-w-border bg-w-surface overflow-y-auto shrink-0">
          {/* Header */}
          <div className="p-5 text-center border-b border-w-border">
            <div className={`w-14 h-14 rounded-full ${activeChat.bg} flex items-center justify-center text-white text-xl font-bold mx-auto mb-2.5`}>
              {activeChat.avatar}
            </div>
            <div className="text-sm font-bold text-w-text">{activeChat.name}</div>
            <div className="text-[11px] text-w-text-dim">CEO · {activeChat.company}</div>
            
            {/* Score Circle */}
            <div className="w-15 h-15 rounded-full mx-auto my-3 relative" style={{
              background: `conic-gradient(#10b981 0% 92%, #e5e7eb 92% 100%)`
            }}>
              <div className="absolute top-2 left-2 right-2 bottom-2 bg-w-surface rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-w-text">92</span>
              </div>
            </div>
            <div className="text-[10px] font-semibold text-w-accent2">🔥 HOT LEAD</div>
          </div>

          {/* Info Grid */}
          <div className="p-3.5">
            {[
              { key: "📱 Phone", value: "+91-98765-XXXX" },
              { key: "📧 Email", value: "rahul@techstart.in" },
              { key: "🏢 Company", value: "TechStart Pvt Ltd" },
              { key: "👤 Role", value: "CEO / Founder" },
              { key: "📍 Location", value: "Bangalore, IN" },
              { key: "📊 Source", value: "LinkedIn" },
              { key: "📅 Added", value: "Feb 22, 2026" },
              { key: "💬 Stage", value: "Booking Call" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between py-1.5 border-b border-w-border text-[11px] last:border-0">
                <span className="text-w-text-dim">{item.key}</span>
                <span className={`text-w-text font-medium ${item.key.includes("Stage") ? "text-w-accent2" : ""}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="p-3.5">
            <div className="text-[10px] font-bold text-w-text-dim uppercase tracking-wide mb-2">Quick Actions</div>
            {[
              "📅 Book Demo Call",
              "📧 Send Email Follow-up", 
              "🏷️ Add to Campaign",
              "📝 Add Note",
              "🚫 Mark Unsubscribed"
            ].map((action, i) => (
              <button
                key={i}
                className={`w-full text-left flex items-center gap-2 p-2 border border-w-border rounded-lg text-[11px] mb-1.5 transition-colors bg-w-surface2 hover:bg-gray-100 ${
                  action.includes("Unsubscribed") ? "text-w-red hover:bg-red-50" : "text-w-text-mid"
                }`}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}