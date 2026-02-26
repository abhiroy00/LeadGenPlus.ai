import React, { useState } from "react";
import { Check, X, CreditCard, Crown, Zap, Users, Bot, MessageCircle, ChartBar as BarChart3, Settings, Headphones } from "lucide-react";

// Pricing plans data based on your documentation
const PRICING_PLANS = [
  {
    id: "free",
    name: "Free Trial",
    price: "₹0",
    period: "7 Days",
    description: "Perfect for testing our platform",
    popular: false,
    features: {
      leads: "500",
      campaigns: "1",
      aiAgents: "2 basic",
      whatsappInbox: true,
      flowBuilder: "Basic",
      analytics: "Basic",
      teamMembers: "1",
      apiAccess: false,
      customAgents: false,
      support: "Email"
    }
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹4,000",
    period: "/month",
    description: "Best for growing businesses",
    popular: true,
    features: {
      leads: "10,000",
      campaigns: "10",
      aiAgents: "All 8",
      whatsappInbox: true,
      flowBuilder: "Full",
      analytics: "Full",
      teamMembers: "3",
      apiAccess: true,
      customAgents: false,
      support: "Priority"
    }
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "₹7,000",
    period: "/month",
    description: "For large teams and custom needs",
    popular: false,
    features: {
      leads: "Unlimited",
      campaigns: "Unlimited",
      aiAgents: "All 8 + custom",
      whatsappInbox: true,
      flowBuilder: "Full",
      analytics: "Full + Export",
      teamMembers: "Unlimited",
      apiAccess: true,
      customAgents: true,
      support: "Dedicated CSM"
    }
  }
];

const FEATURE_DETAILS = [
  { key: "leads", label: "Leads", icon: <Users size={16} /> },
  { key: "campaigns", label: "Campaigns", icon: <Zap size={16} /> },
  { key: "aiAgents", label: "AI Agents", icon: <Bot size={16} /> },
  { key: "whatsappInbox", label: "WhatsApp Inbox", icon: <MessageCircle size={16} /> },
  { key: "flowBuilder", label: "Flow Builder", icon: <Settings size={16} /> },
  { key: "analytics", label: "Analytics", icon: <BarChart3 size={16} /> },
  { key: "teamMembers", label: "Team Members", icon: <Users size={16} /> },
  { key: "apiAccess", label: "API Access", icon: <Settings size={16} /> },
  { key: "customAgents", label: "Custom Agents", icon: <Bot size={16} /> },
  { key: "support", label: "Support", icon: <Headphones size={16} /> }
];

// Mock current user plan
const CURRENT_PLAN = {
  planId: "pro",
  planName: "Pro",
  nextBilling: "March 22, 2026",
  usage: {
    leads: { used: 2420, limit: 10000 },
    campaigns: { used: 4, limit: 10 },
    teamMembers: { used: 2, limit: 3 }
  }
};

function PlanCard({ plan, isCurrentPlan, onSelectPlan }) {
  return (
    <div className={`relative bg-w-surface border rounded-xl p-6 transition-all hover:shadow-lg ${
      plan.popular 
        ? "border-w-accent shadow-lg ring-2 ring-w-accent/20" 
        : "border-w-border hover:border-w-accent/50"
    } ${isCurrentPlan ? "ring-2 ring-w-accent2" : ""}`}>
      
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-w-accent text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Crown size={12} /> Most Popular
          </span>
        </div>
      )}

      {isCurrentPlan && (
        <div className="absolute -top-3 right-4">
          <span className="bg-w-accent2 text-white text-xs font-bold px-3 py-1 rounded-full">
            Current Plan
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-w-text mb-2">{plan.name}</h3>
        <div className="mb-2">
          <span className="text-3xl font-bold text-w-text">{plan.price}</span>
          <span className="text-w-text-dim ml-1">{plan.period}</span>
        </div>
        <p className="text-sm text-w-text-dim">{plan.description}</p>
      </div>

      <div className="space-y-3 mb-6">
        {FEATURE_DETAILS.map((feature) => {
          const value = plan.features[feature.key];
          const isBoolean = typeof value === "boolean";
          
          return (
            <div key={feature.key} className="flex items-center gap-3">
              <div className="text-w-text-mid">{feature.icon}</div>
              <div className="flex-1">
                <span className="text-sm text-w-text">{feature.label}</span>
              </div>
              <div className="text-right">
                {isBoolean ? (
                  value ? (
                    <Check size={16} className="text-w-accent2" />
                  ) : (
                    <X size={16} className="text-w-text-dim" />
                  )
                ) : (
                  <span className="text-sm font-semibold text-w-text">{value}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => onSelectPlan(plan)}
        disabled={isCurrentPlan}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-colors ${
          isCurrentPlan
            ? "bg-w-surface2 text-w-text-dim cursor-not-allowed"
            : plan.popular
            ? "bg-w-accent text-white hover:bg-blue-700"
            : "bg-w-surface2 text-w-text border border-w-border hover:bg-w-accent hover:text-white"
        }`}
      >
        {isCurrentPlan ? "Current Plan" : plan.id === "free" ? "Start Free Trial" : "Upgrade Now"}
      </button>
    </div>
  );
}

function UsageCard({ title, used, limit, icon }) {
  const percentage = limit === "Unlimited" ? 0 : (used / limit) * 100;
  const isUnlimited = limit === "Unlimited";
  
  return (
    <div className="bg-w-surface border border-w-border rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-w-accent">{icon}</div>
        <div>
          <h4 className="text-sm font-semibold text-w-text">{title}</h4>
          <p className="text-xs text-w-text-dim">
            {isUnlimited ? `${used.toLocaleString()} used` : `${used.toLocaleString()} / ${limit.toLocaleString()}`}
          </p>
        </div>
      </div>
      
      {!isUnlimited && (
        <div className="w-full bg-w-surface2 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${
              percentage > 80 ? "bg-w-red" : percentage > 60 ? "bg-w-accent3" : "bg-w-accent2"
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className="bg-w-surface border border-w-border rounded-xl overflow-hidden">
      <div className="p-6 border-b border-w-border">
        <h3 className="text-lg font-bold text-w-text">Feature Comparison</h3>
        <p className="text-sm text-w-text-dim mt-1">Compare all features across our plans</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-w-surface2">
            <tr>
              <th className="text-left p-4 font-semibold text-w-text">Features</th>
              {PRICING_PLANS.map((plan) => (
                <th key={plan.id} className="text-center p-4 font-semibold text-w-text min-w-[120px]">
                  {plan.name}
                  <div className="text-xs font-normal text-w-text-dim mt-1">
                    {plan.price}{plan.period}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FEATURE_DETAILS.map((feature, index) => (
              <tr key={feature.key} className={index % 2 === 0 ? "bg-w-bg" : "bg-w-surface"}>
                <td className="p-4 border-b border-w-border">
                  <div className="flex items-center gap-3">
                    <div className="text-w-text-mid">{feature.icon}</div>
                    <span className="text-sm font-medium text-w-text">{feature.label}</span>
                  </div>
                </td>
                {PRICING_PLANS.map((plan) => {
                  const value = plan.features[feature.key];
                  const isBoolean = typeof value === "boolean";
                  
                  return (
                    <td key={plan.id} className="p-4 text-center border-b border-w-border">
                      {isBoolean ? (
                        value ? (
                          <Check size={18} className="text-w-accent2 mx-auto" />
                        ) : (
                          <X size={18} className="text-w-text-dim mx-auto" />
                        )
                      ) : (
                        <span className="text-sm font-semibold text-w-text">{value}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    // Here you would typically integrate with your payment processor
    console.log("Selected plan:", plan);
  };

  const currentPlan = PRICING_PLANS.find(plan => plan.id === CURRENT_PLAN.planId);

  return (
    <div className="min-h-screen bg-w-bg">
      <div className="px-6 py-6 max-w-7xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-w-text">Billing & Subscription</h1>
            <p className="text-xs text-w-text-dim mt-0.5">
              Manage your subscription and view usage
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-w-border hover:bg-w-surface2 text-w-text-mid text-xs font-medium transition-colors">
              <CreditCard size={14} />
              Payment Methods
            </button>
            <button className="flex items-center gap-2 bg-w-accent hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
              📧 Contact Sales
            </button>
          </div>
        </div>

        {/* Current Plan & Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1">
            <div className="bg-w-surface border border-w-border rounded-lg p-4">
              <h3 className="text-sm font-semibold text-w-text mb-3">Current Plan</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Crown size={16} className="text-w-accent" />
                  <span className="font-semibold text-w-text">{CURRENT_PLAN.planName}</span>
                </div>
                <p className="text-xs text-w-text-dim">
                  Next billing: {CURRENT_PLAN.nextBilling}
                </p>
                <button className="w-full mt-3 py-2 px-3 text-xs font-medium text-w-accent border border-w-accent rounded-lg hover:bg-w-accent hover:text-white transition-colors">
                  Manage Subscription
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <UsageCard
              title="Leads"
              used={CURRENT_PLAN.usage.leads.used}
              limit={CURRENT_PLAN.usage.leads.limit}
              icon={<Users size={16} />}
            />
            <UsageCard
              title="Campaigns"
              used={CURRENT_PLAN.usage.campaigns.used}
              limit={CURRENT_PLAN.usage.campaigns.limit}
              icon={<Zap size={16} />}
            />
            <UsageCard
              title="Team Members"
              used={CURRENT_PLAN.usage.teamMembers.used}
              limit={CURRENT_PLAN.usage.teamMembers.limit}
              icon={<Users size={16} />}
            />
          </div>
        </div>

        {/* Pricing Plans */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-w-text mb-2">Choose Your Plan</h2>
            <p className="text-w-text-dim">Scale your lead generation with the right plan for your business</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {PRICING_PLANS.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isCurrentPlan={plan.id === CURRENT_PLAN.planId}
                onSelectPlan={handleSelectPlan}
              />
            ))}
          </div>
        </div>

        {/* Feature Comparison Table */}
        <ComparisonTable />

        {/* FAQ or Additional Info */}
        <div className="bg-w-surface border border-w-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-w-text mb-4">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-w-text mb-2">Can I change plans anytime?</h4>
              <p className="text-sm text-w-text-dim">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h4 className="font-semibold text-w-text mb-2">What happens to my data if I downgrade?</h4>
              <p className="text-sm text-w-text-dim">Your data is always safe. If you exceed limits, some features may be restricted until you upgrade.</p>
            </div>
            <div>
              <h4 className="font-semibold text-w-text mb-2">Do you offer refunds?</h4>
              <p className="text-sm text-w-text-dim">We offer a 30-day money-back guarantee for all paid plans. No questions asked.</p>
            </div>
            <div>
              <h4 className="font-semibold text-w-text mb-2">Is there a setup fee?</h4>
              <p className="text-sm text-w-text-dim">No setup fees. You only pay the monthly subscription fee for your chosen plan.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}