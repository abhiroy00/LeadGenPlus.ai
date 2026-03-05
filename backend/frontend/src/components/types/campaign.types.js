export const CampaignStatus = {
  DRAFT: 'Draft',
  ACTIVE: 'Active',
  PAUSED: 'Paused',
  COMPLETED: 'Completed',
  SCHEDULED: 'Scheduled',
};

export const CampaignChannel = {
  WHATSAPP: '💬 WhatsApp',
  EMAIL: '📧 Email',
  SMS: '📱 SMS',
  LINKEDIN: '💼 LinkedIn',
};

export const NodeType = {
  TRIGGER: 'trigger',
  MESSAGE: 'message',
  DELAY: 'delay',
  CONDITION: 'condition',
  GOAL: 'goal',
  ACTION: 'action',
};

export const createCampaign = (data) => ({
  id: data.id || Date.now(),
  name: data.name || '',
  description: data.description || '',
  status: data.status || CampaignStatus.DRAFT,
  channel: data.channel || CampaignChannel.WHATSAPP,
  leads: data.leads || '0',
  nodes: data.nodes || 1,
  sent: data.sent || '0',
  opened: data.opened || '0',
  replied: data.replied || '0',
  converted: data.converted || '0',
  openRate: data.openRate || '0%',
  replyRate: data.replyRate || '0%',
  startDate: data.startDate || new Date().toISOString().split('T')[0],
  endDate: data.endDate || null,
  targetAudience: data.targetAudience || [],
  settings: data.settings || {},
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
});

export const createNode = (type, data = {}) => ({
  id: data.id || `node_${Date.now()}`,
  type,
  x: data.x || 0,
  y: data.y || 0,
  title: data.title || '',
  subtitle: data.subtitle || '',
  config: data.config || {},
  connections: data.connections || [],
});

export const validateCampaign = (campaign) => {
  const errors = {};

  if (!campaign.name || campaign.name.trim().length === 0) {
    errors.name = 'Campaign name is required';
  }

  if (!campaign.description || campaign.description.trim().length === 0) {
    errors.description = 'Campaign description is required';
  }

  if (!Object.values(CampaignChannel).includes(campaign.channel)) {
    errors.channel = 'Invalid campaign channel';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};