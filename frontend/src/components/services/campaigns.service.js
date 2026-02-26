import ApiService from './api';

class CampaignsService {
  async getCampaigns(params = {}) {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockCampaigns = [
        {
          id: 1, name: "SaaS Founders Q1", description: "Target SaaS founders via LinkedIn outreach",
          status: "Active", channel: "💬 WhatsApp", leads: "8,420", nodes: 7,
          sent: "8,420", opened: "7,073", replied: "404", converted: "48",
          openRate: "84%", replyRate: "4.8%", startDate: "Jan 15, 2026",
        },
        {
          id: 2, name: "Restaurant Delhi NCR", description: "Local restaurant owners in Delhi via Google Maps",
          status: "Active", channel: "💬 WhatsApp", leads: "3,200", nodes: 5,
          sent: "3,200", opened: "2,560", replied: "128", converted: "18",
          openRate: "80%", replyRate: "4.0%", startDate: "Feb 1, 2026",
        },
        {
          id: 3, name: "E-Commerce Retarget", description: "Re-engage cold leads from previous campaigns",
          status: "Paused", channel: "💬 WhatsApp", leads: "5,100", nodes: 6,
          sent: "4,200", opened: "3,024", replied: "183", converted: "22",
          openRate: "72%", replyRate: "3.6%", startDate: "Jan 28, 2026",
        },
      ];
      
      return {
        data: mockCampaigns,
        total: mockCampaigns.length,
      };
    } catch (error) {
      throw error;
    }
  }

  async getCampaign(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const campaigns = await this.getCampaigns();
      const campaign = campaigns.data.find(c => c.id === parseInt(id));
      
      if (!campaign) {
        throw new Error('Campaign not found');
      }
      
      return campaign;
    } catch (error) {
      throw error;
    }
  }

  async createCampaign(campaignData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newCampaign = {
        id: Date.now(),
        ...campaignData,
        status: 'Draft',
        channel: '💬 WhatsApp',
        leads: '0',
        nodes: 1,
        sent: '—',
        opened: '—',
        replied: '—',
        converted: '—',
        openRate: '0%',
        replyRate: '0%',
        startDate: 'Just created',
      };
      
      return newCampaign;
    } catch (error) {
      throw error;
    }
  }

  async updateCampaign(id, updates) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, ...updates };
    } catch (error) {
      throw error;
    }
  }

  async deleteCampaign(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async toggleCampaignStatus(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const campaign = await this.getCampaign(id);
      const newStatus = campaign.status === 'Active' ? 'Paused' : 'Active';
      
      return await this.updateCampaign(id, { status: newStatus });
    } catch (error) {
      throw error;
    }
  }
}

export default new CampaignsService();