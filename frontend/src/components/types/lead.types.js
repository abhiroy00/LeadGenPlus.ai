export const LeadSource = {
  LINKEDIN: 'LinkedIn',
  GOOGLE_MAPS: 'Google Maps',
  MANUAL: 'Manual',
  IMPORT: 'Import',
  CSV: 'CSV',
  APOLLO: 'Apollo',
};

export const LeadStatus = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  INTERESTED: 'Interested',
  DEMO_BOOKED: 'Demo Booked',
  CONVERTED: 'Converted',
  UNQUALIFIED: 'Unqualified',
  HOT_LEAD: 'Hot Lead 🔥',
  NURTURING: 'Nurturing',
  COLD: 'Cold',
};

export const createLead = (data) => ({
  id: data.id || Date.now(),
  name: data.name || '',
  company: data.company || '',
  phone: data.phone || '',
  email: data.email || '',
  source: data.source || LeadSource.MANUAL,
  score: data.score || 0,
  status: data.status || LeadStatus.NEW,
  campaign: data.campaign || '',
  location: data.location || '',
  lastContact: data.lastContact || new Date().toISOString(),
  aiNote: data.aiNote || null,
  tags: data.tags || [],
  customFields: data.customFields || {},
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
});

export const validateLead = (lead) => {
  const errors = {};

  if (!lead.name || lead.name.trim().length === 0) {
    errors.name = 'Name is required';
  }

  if (!lead.phone || lead.phone.trim().length === 0) {
    errors.phone = 'Phone is required';
  }

  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    errors.email = 'Invalid email format';
  }

  if (lead.score < 0 || lead.score > 100) {
    errors.score = 'Score must be between 0 and 100';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};