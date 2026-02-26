// components/userJourney/journeyData.js
// Cleaned for Figma-consistent neutral UI system.

export const STEPS = [
  {
    id: 1,
    emoji: "🎯",
    title: "Import Your Leads",
    subtitle: "Bring your prospects in",
    color: "#2563eb", // Primary Blue

    description:
      "Upload a CSV, connect LinkedIn, or pull from Google Maps. LeadGenAI enriches every lead with company info, role, and contact details automatically.",

    actions: [
      { icon: "📁", label: "Upload CSV", desc: "Drag & drop or browse files" },
      { icon: "🔗", label: "Connect LinkedIn", desc: "Sync your Sales Navigator" },
      { icon: "🗺️", label: "Google Maps Scraper", desc: "Find local businesses instantly" },
      { icon: "🔌", label: "CRM Import", desc: "HubSpot, Salesforce & more" },
    ],

    tip: "Start with 100–500 leads for your first campaign to test messaging before scaling.",
  },

  {
    id: 2,
    emoji: "⚡",
    title: "Build Your Campaign",
    subtitle: "Design your outreach flow",
    color: "#8b5cf6", // AI Purple

    description:
      "Use the visual flow builder to create multi-step sequences. Mix WhatsApp messages, emails, AI-written follow-ups, and smart wait conditions.",

    actions: [
      { icon: "💬", label: "WhatsApp Message", desc: "Template or AI-generated" },
      { icon: "📧", label: "Email Sequence", desc: "HTML or plain text" },
      { icon: "🤖", label: "AI Write Message", desc: "GPT personalises each one" },
      { icon: "⏰", label: "Smart Delays", desc: "Send at the right moment" },
    ],

    tip: "Campaigns with 3–5 touchpoints see 3× higher reply rates than single messages.",
  },

  {
    id: 3,
    emoji: "🚀",
    title: "Launch & Let AI Run",
    subtitle: "Sit back, AI handles replies",
    color: "#10b981", // Success Green

    description:
      "Hit launch and our AI agents take over — sending personalised messages, handling replies 24/7, qualifying leads, and booking calls on your calendar.",

    actions: [
      { icon: "📊", label: "Live Dashboard", desc: "Real-time open & reply rates" },
      { icon: "🔥", label: "Hot Lead Alerts", desc: "Notified instantly when ready" },
      { icon: "📅", label: "Auto Book Calls", desc: "Calendly integration built-in" },
      { icon: "🛡️", label: "Spam Guard", desc: "Stays within daily limits" },
    ],

    tip: "Enable AI Mode to let the bot handle objections and FAQs automatically.",
  },

  {
    id: 4,
    emoji: "📈",
    title: "Analyse & Scale",
    subtitle: "Double down on what works",
    color: "#f59e0b", // Warning Amber

    description:
      "Deep analytics show exactly which messages, channels, and lead sources convert best. Duplicate winning campaigns and scale revenue predictably.",

    actions: [
      { icon: "📉", label: "Conversion Funnel", desc: "See every drop-off point" },
      { icon: "🧪", label: "A/B Testing", desc: "Test messages automatically" },
      { icon: "💰", label: "Revenue Attribution", desc: "Track pipeline value" },
      { icon: "♻️", label: "Clone Campaigns", desc: "Scale winners in one click" },
    ],

    tip: "Top users review analytics weekly and iterate messaging every 2 weeks.",
  },
];