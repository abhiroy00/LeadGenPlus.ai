export const AgentStatus = {
  ACTIVE: 'active',
  IDLE: 'idle',
  ERROR: 'error',
  OFFLINE: 'offline',
  PAUSED: 'paused',
};

export const AgentType = {
  SCOUT: 'scout',
  QUALIFIER: 'qualifier',
  COPYWRITER: 'copywriter',
  SCHEDULER: 'scheduler',
  CONVERSATION: 'conversation',
  ANALYTICS: 'analytics',
  COMPLIANCE: 'compliance',
  ORCHESTRATOR: 'orchestrator',
};

export const LogType = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warn',
  ERROR: 'error',
};

export const createAgent = (data) => ({
  id: data.id || Date.now(),
  name: data.name || '',
  emoji: data.emoji || '🤖',
  type: data.type || AgentType.SCOUT,
  status: data.status || AgentStatus.IDLE,
  stat1: data.stat1 || '',
  stat2: data.stat2 || '',
  progress: data.progress || 0,
  config: data.config || {},
  lastActive: data.lastActive || new Date().toISOString(),
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
});

export const createLog = (data) => ({
  id: data.id || Date.now(),
  time: data.time || new Date().toLocaleTimeString(),
  agent: data.agent || '[SYSTEM]',
  message: data.message || '',
  type: data.type || LogType.INFO,
  timestamp: data.timestamp || new Date().toISOString(),
});

export const validateAgentConfig = (config) => {
  const errors = {};

  if (config.dailyLimit && (config.dailyLimit < 0 || config.dailyLimit > 50000)) {
    errors.dailyLimit = 'Daily limit must be between 0 and 50,000';
  }

  if (config.qualityThreshold && (config.qualityThreshold < 0 || config.qualityThreshold > 100)) {
    errors.qualityThreshold = 'Quality threshold must be between 0 and 100';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};