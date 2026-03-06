// Common types and interfaces used across the application

export const LeadStatus = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  INTERESTED: 'Interested',
  DEMO_BOOKED: 'Demo Booked',
  CONVERTED: 'Converted',
  UNQUALIFIED: 'Unqualified',
};

export const CampaignStatus = {
  DRAFT: 'Draft',
  ACTIVE: 'Active',
  PAUSED: 'Paused',
  COMPLETED: 'Completed',
  SCHEDULED: 'Scheduled',
};

export const AgentStatus = {
  ACTIVE: 'active',
  IDLE: 'idle',
  ERROR: 'error',
  OFFLINE: 'offline',
};

export const MessageType = {
  SENT: 'sent',
  RECEIVED: 'received',
  AI_SENT: 'ai-sent',
  AI_DRAFT: 'ai-draft',
};

export const NotificationType = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Validation schemas
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^\+?[\d\s\-\(\)]+$/;
  return re.test(phone) && phone.length >= 10;
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};