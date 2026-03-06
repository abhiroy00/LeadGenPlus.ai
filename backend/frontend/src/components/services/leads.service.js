import ApiService from './api';

class LeadsService {
  async getLeads(params = {}) {
    try {
      // Simulate API call with dummy data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockLeads = [
        { id: 1, name: "Rahul Sharma", company: "Sharma Foods Pvt Ltd", phone: "+91 98100 11234", source: "Google Maps", score: 92, status: "Interested", campaign: "Restaurant Delhi", location: "Delhi, IN", lastContact: "2h ago", aiNote: "High intent — mentioned budget. Follow up with pricing." },
        { id: 2, name: "Priya Mehta", company: "TechVision Solutions", phone: "+91 87654 32100", source: "LinkedIn", score: 85, status: "Demo Booked", campaign: "SaaS Founders Q1", location: "Bangalore, IN", lastContact: "5h ago", aiNote: "Asked about API integrations. Send tech docs before demo." },
        { id: 3, name: "Vikram Bajaj", company: "Bajaj Retail Chain", phone: "+91 99001 22334", source: "Google Maps", score: 76, status: "Contacted", campaign: "Restaurant Delhi", location: "Mumbai, IN", lastContact: "1d ago", aiNote: "Third follow-up needed. Consider different message angle." },
        { id: 4, name: "Sneha Kapoor", company: "Kapoor & Associates", phone: "+91 70012 34567", source: "Import", score: 68, status: "New", campaign: "SaaS Founders Q1", location: "Pune, IN", lastContact: "2d ago", aiNote: null },
        { id: 5, name: "Arjun Singh", company: "Singh Hospitality Group", phone: "+91 81234 56789", source: "Google Maps", score: 88, status: "Interested", campaign: "Restaurant Delhi", location: "Jaipur, IN", lastContact: "3h ago", aiNote: "Runs 3 restaurants. High LTV potential." },
      ];
      
      return {
        data: mockLeads,
        total: mockLeads.length,
        page: 1,
        limit: 50,
      };
    } catch (error) {
      throw error;
    }
  }

  async getLead(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const leads = await this.getLeads();
      const lead = leads.data.find(l => l.id === parseInt(id));
      
      if (!lead) {
        throw new Error('Lead not found');
      }
      
      return lead;
    } catch (error) {
      throw error;
    }
  }

  async createLead(leadData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newLead = {
        id: Date.now(),
        ...leadData,
        score: Math.floor(Math.random() * 100),
        status: 'New',
        lastContact: 'Just now',
        aiNote: null,
      };
      
      return newLead;
    } catch (error) {
      throw error;
    }
  }

  async updateLead(id, updates) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Simulate update
      return { id, ...updates };
    } catch (error) {
      throw error;
    }
  }

  async deleteLead(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async importLeads(file) {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate import process
      return {
        total: 1240,
        imported: 1198,
        duplicates: 42,
        errors: 0,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new LeadsService();