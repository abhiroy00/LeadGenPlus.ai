import ApiService from './api';

class AgentsService {
  async getAgents() {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockAgents = [
        { id: 1, name: 'Scout Agent', emoji: '🔍', status: 'active', stat1: 'Scraped today: 8,420', stat2: 'Sources: LinkedIn, Maps', progress: 84 },
        { id: 2, name: 'Qualifier Agent', emoji: '⭐', status: 'active', stat1: 'Scored today: 7,200', stat2: 'Avg score: 67/100', progress: 72 },
        { id: 3, name: 'Copywriter Agent', emoji: '✍️', status: 'idle', stat1: 'Messages written: 5,600', stat2: 'A/B variants: 3 active', progress: 56 },
        { id: 4, name: 'Scheduler Agent', emoji: '⏰', status: 'active', stat1: 'Queued: 12,400', stat2: 'Next send: 2:30 PM', progress: 90 },
        { id: 5, name: 'Conversation Agent', emoji: '💬', status: 'active', stat1: 'Active chats: 35', stat2: 'Avg reply: 3.2s', progress: 35 },
        { id: 6, name: 'Analytics Agent', emoji: '📊', status: 'active', stat1: 'Reports run: 24', stat2: 'Optimizations: 8', progress: 60 },
        { id: 7, name: 'Compliance Agent', emoji: '🛡️', status: 'active', stat1: 'Opt-outs handled: 12', stat2: 'Violations: 0 ✅', progress: 100 },
        { id: 8, name: 'Orchestrator Agent', emoji: '🎯', status: 'active', stat1: 'Tasks coordinated: 142K', stat2: 'Uptime: 99.9%', progress: 99 },
      ];
      
      return mockAgents;
    } catch (error) {
      throw error;
    }
  }

  async getAgentLogs() {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const mockLogs = [
        { time: '14:32:01', agent: '[SCOUT]', message: '✓ Scraped 142 leads from Google Maps "restaurants Delhi"', type: 'success' },
        { time: '14:32:03', agent: '[QUALIFIER]', message: 'Processing 142 new leads → scoring via GPT-4o...', type: 'info' },
        { time: '14:32:08', agent: '[QUALIFIER]', message: '✓ 89 leads scored ≥50 → added to campaign queue', type: 'success' },
        { time: '14:32:09', agent: '[COPYWRITER]', message: 'Generating personalized WA messages for 89 leads...', type: 'info' },
        { time: '14:32:14', agent: '[COPYWRITER]', message: '✓ 89 unique messages generated (avg 3.2s/message)', type: 'success' },
        { time: '14:32:15', agent: '[SCHEDULER]', message: 'Optimizing send times for 89 leads (IST timezone)', type: 'info' },
        { time: '14:32:16', agent: '[SCHEDULER]', message: '✓ Scheduled: 34 now, 55 at 6:00 PM (peak time)', type: 'success' },
        { time: '14:32:17', agent: '[CONV_AGENT]', message: '✓ Rahul Sharma replied → booking call intent detected → alert sent', type: 'success' },
        { time: '14:32:19', agent: '[ORCHESTRATOR]', message: '⚠ Vikram Bajaj: 3rd follow-up — escalating to human review', type: 'warn' },
        { time: '14:32:21', agent: '[COMPLIANCE]', message: '✓ Opt-out processed for +91-XXXXX-12345 — removed from all lists', type: 'success' },
      ];
      
      return mockLogs;
    } catch (error) {
      throw error;
    }
  }

  async updateAgentStatus(id, status) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, status };
    } catch (error) {
      throw error;
    }
  }

  async getAgentConfig(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        id,
        name: 'Scout Agent',
        settings: {
          sources: ['LinkedIn', 'Google Maps'],
          dailyLimit: 10000,
          qualityThreshold: 50,
          autoStart: true,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async updateAgentConfig(id, config) {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { id, ...config };
    } catch (error) {
      throw error;
    }
  }
}

export default new AgentsService();