export const MessageType = {
  SENT: 'sent',
  RECEIVED: 'received',
  AI_SENT: 'ai-sent',
  AI_DRAFT: 'ai-draft',
  SYSTEM: 'system',
};

export const MessageStatus = {
  PENDING: 'pending',
  SENT: '✓',
  DELIVERED: '✓✓',
  READ: '✓✓',
  FAILED: '✗',
};

export const ConversationStatus = {
  ACTIVE: 'active',
  HOT: 'hot',
  AI: 'ai',
  NORMAL: 'normal',
  CLOSED: 'closed',
};

export const createMessage = (data) => ({
  id: data.id || Date.now(),
  conversationId: data.conversationId || null,
  type: data.type || MessageType.SENT,
  text: data.text || '',
  time: data.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  status: data.status || MessageStatus.PENDING,
  isDraft: data.isDraft || false,
  attachments: data.attachments || [],
  metadata: data.metadata || {},
  createdAt: data.createdAt || new Date().toISOString(),
});

export const createConversation = (data) => ({
  id: data.id || Date.now(),
  name: data.name || '',
  avatar: data.avatar || '',
  company: data.company || '',
  preview: data.preview || '',
  time: data.time || 'now',
  unread: data.unread || 0,
  status: data.status || ConversationStatus.NORMAL,
  bg: data.bg || 'bg-gray-500',
  leadId: data.leadId || null,
  lastMessage: data.lastMessage || null,
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
});

export const validateMessage = (message) => {
  const errors = {};

  if (!message.text || message.text.trim().length === 0) {
    errors.text = 'Message text is required';
  }

  if (message.text && message.text.length > 4096) {
    errors.text = 'Message text is too long (max 4096 characters)';
  }

  if (!Object.values(MessageType).includes(message.type)) {
    errors.type = 'Invalid message type';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};