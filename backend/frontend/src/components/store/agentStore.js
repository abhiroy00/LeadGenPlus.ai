import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  agents: [
    { id: 1, name: 'Scout Agent', emoji: '🔍', status: 'active', stat1: 'Scraped today: 8,420', stat2: 'Sources: LinkedIn, Maps', progress: 84 },
    { id: 2, name: 'Qualifier Agent', emoji: '⭐', status: 'active', stat1: 'Scored today: 7,200', stat2: 'Avg score: 67/100', progress: 72 },
    { id: 3, name: 'Copywriter Agent', emoji: '✍️', status: 'idle', stat1: 'Messages written: 5,600', stat2: 'A/B variants: 3 active', progress: 56 },
    { id: 4, name: 'Scheduler Agent', emoji: '⏰', status: 'active', stat1: 'Queued: 12,400', stat2: 'Next send: 2:30 PM', progress: 90 },
    { id: 5, name: 'Conversation Agent', emoji: '💬', status: 'active', stat1: 'Active chats: 35', stat2: 'Avg reply: 3.2s', progress: 35 },
    { id: 6, name: 'Analytics Agent', emoji: '📊', status: 'active', stat1: 'Reports run: 24', stat2: 'Optimizations: 8', progress: 60 },
    { id: 7, name: 'Compliance Agent', emoji: '🛡️', status: 'active', stat1: 'Opt-outs handled: 12', stat2: 'Violations: 0 ✅', progress: 100 },
    { id: 8, name: 'Orchestrator Agent', emoji: '🎯', status: 'active', stat1: 'Tasks coordinated: 142K', stat2: 'Uptime: 99.9%', progress: 99 },
  ],
  logs: [
    { time: '14:32:01', agent: '[SCOUT]', message: '✓ Scraped 142 leads from Google Maps "restaurants Delhi"', type: 'success' },
    { time: '14:32:03', agent: '[QUALIFIER]', message: 'Processing 142 new leads → scoring via GPT-4o...', type: 'info' },
    { time: '14:32:08', agent: '[QUALIFIER]', message: '✓ 89 leads scored ≥50 → added to campaign queue', type: 'success' },
    { time: '14:32:09', agent: '[COPYWRITER]', message: 'Generating personalized WA messages for 89 leads...', type: 'info' },
    { time: '14:32:14', agent: '[COPYWRITER]', message: '✓ 89 unique messages generated (avg 3.2s/message)', type: 'success' },
  ],
  selectedAgent: null,
  loading: false,
  error: null,
};

const agentSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setAgents: (state, action) => {
      state.agents = action.payload;
    },
    updateAgent: (state, action) => {
      const { id, updates } = action.payload;
      const agentIndex = state.agents.findIndex(agent => agent.id === id);
      if (agentIndex !== -1) {
        state.agents[agentIndex] = { ...state.agents[agentIndex], ...updates };
      }
    },
    addLog: (state, action) => {
      state.logs.unshift(action.payload);
      if (state.logs.length > 50) {
        state.logs = state.logs.slice(0, 50);
      }
    },
    setSelectedAgent: (state, action) => {
      state.selectedAgent = action.payload;
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
  setAgents,
  updateAgent,
  addLog,
  setSelectedAgent,
  setLoading,
  setError,
} = agentSlice.actions;

export default agentSlice.reducer;