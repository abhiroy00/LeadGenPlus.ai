import ApiService from './api';

class InboxService {
  async getConversations(params = {}) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockConversations = [
        { id: 1, name: 'Rahul Sharma', avatar: 'RS', company: 'TechStart Pvt Ltd', preview: 'Yes I\'m interested, can we...', time: '2m', unread: 3, status: 'hot', bg: 'bg-blue-500' },
        { id: 2, name: 'Priya Gupta', avatar: 'PG', company: 'FoodieHub', preview: '🤖 AI: Sure! Here\'s our pricing...', time: '15m', unread: 1, status: 'ai', bg: 'bg-purple-500' },
        { id: 3, name: 'Vikram Bajaj', avatar: 'VB', company: 'AutoDrive Motors', preview: 'When can we schedule a call?', time: '1h', unread: 2, status: 'hot', bg: 'bg-red-500' },
        { id: 4, name: 'Amir Malik', avatar: 'AM', company: 'RealProp Realty', preview: '🤖 AI: Thanks for reaching out...', time: '3h', unread: 0, status: 'ai', bg: 'bg-green-500' },
        { id: 5, name: 'Neha Kulkarni', avatar: 'NK', company: 'Fashion Store', preview: 'Send me the brochure please', time: '4h', unread: 1, status: 'normal', bg: 'bg-yellow-500' },
      ];
      
      return {
        data: mockConversations,
        total: mockConversations.length,
      };
    } catch (error) {
      throw error;
    }
  }

  async getMessages(conversationId) {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const mockMessages = [
        { id: 1, type: 'ai-sent', text: 'Hi Rahul! 👋 I noticed you\'re leading TechStart and recently posted about scaling customer acquisition challenges — completely resonates! We help SaaS founders like you automate lead gen using AI on WhatsApp + Email. Worth a quick 10-min chat? 🚀', time: '10:30 AM', status: '✓✓' },
        { id: 2, type: 'received', text: 'Interesting! We\'ve been struggling with outbound. How does your system work exactly?', time: '10:45 AM' },
        { id: 3, type: 'ai-sent', text: 'Great question! Our AI agents automatically: 1) Find your ideal leads, 2) Write personalized messages for each, 3) Send on WhatsApp + Email, 4) Handle all replies 24/7 — so you only talk to hot leads! Clients see 85%+ open rates. Want to see a demo?', time: '10:45 AM', status: '✓✓' },
        { id: 4, type: 'received', text: 'Yes I\'m interested, can we do a call this week? Maybe Thursday?', time: '11:02 AM' },
        { id: 5, type: 'ai-draft', text: 'Absolutely! 🎉 Thursday works perfectly. Here\'s my calendar link to pick a slot: [calendly.com/leadgenai/demo] — Looking forward to it!', time: 'AI Draft — Review before sending', isDraft: true },
      ];
      
      return mockMessages;
    } catch (error) {
      throw error;
    }
  }

  async sendMessage(conversationId, message) {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newMessage = {
        id: Date.now(),
        type: 'sent',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: '✓',
      };
      
      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  async markAsRead(conversationId) {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async getUnreadCount() {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      return { count: 48 };
    } catch (error) {
      throw error;
    }
  }
}

export default new InboxService();