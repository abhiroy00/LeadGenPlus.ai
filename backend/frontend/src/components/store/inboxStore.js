import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversations: [
    { id: 1, name: 'Rahul Sharma', avatar: 'RS', company: 'TechStart Pvt Ltd', preview: 'Yes I\'m interested, can we...', time: '2m', unread: 3, status: 'hot', bg: 'bg-blue-500' },
    { id: 2, name: 'Priya Gupta', avatar: 'PG', company: 'FoodieHub', preview: '🤖 AI: Sure! Here\'s our pricing...', time: '15m', unread: 1, status: 'ai', bg: 'bg-purple-500' },
    { id: 3, name: 'Vikram Bajaj', avatar: 'VB', company: 'AutoDrive Motors', preview: 'When can we schedule a call?', time: '1h', unread: 2, status: 'hot', bg: 'bg-red-500' },
    { id: 4, name: 'Amir Malik', avatar: 'AM', company: 'RealProp Realty', preview: '🤖 AI: Thanks for reaching out...', time: '3h', unread: 0, status: 'ai', bg: 'bg-green-500' },
  ],
  activeConversation: null,
  messages: [
    { id: 1, type: 'ai-sent', text: 'Hi Rahul! 👋 I noticed you\'re leading TechStart...', time: '10:30 AM', status: '✓✓' },
    { id: 2, type: 'received', text: 'Interesting! We\'ve been struggling with outbound...', time: '10:45 AM' },
    { id: 3, type: 'ai-sent', text: 'Great question! Our AI agents automatically...', time: '10:45 AM', status: '✓✓' },
    { id: 4, type: 'received', text: 'Yes I\'m interested, can we do a call this week?', time: '11:02 AM' },
  ],
  loading: false,
  error: null,
};

const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    updateMessage: (state, action) => {
      const { id, updates } = action.payload;
      const messageIndex = state.messages.findIndex(msg => msg.id === id);
      if (messageIndex !== -1) {
        state.messages[messageIndex] = { ...state.messages[messageIndex], ...updates };
      }
    },
    markAsRead: (state, action) => {
      const conversationId = action.payload;
      const conversation = state.conversations.find(conv => conv.id === conversationId);
      if (conversation) {
        conversation.unread = 0;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setConversations,
  setActiveConversation,
  addMessage,
  updateMessage,
  markAsRead,
  setLoading,
  setError,
} = inboxSlice.actions;

export default inboxSlice.reducer;