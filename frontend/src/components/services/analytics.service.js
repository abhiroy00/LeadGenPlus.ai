import ApiService from './api';

class AnalyticsService {
  async getDashboardStats() {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        leadsToday: { value: '8,420', change: '↑ +12% vs yesterday' },
        openRate: { value: '84%', change: '↑ Industry avg 35%' },
        repliesToday: { value: '342', change: '↑ +8% this week' },
        hotLeads: { value: '47', change: '↑ Needs follow-up' },
        pipelineValue: { value: '₹2.4L', change: '↑ This month' },
      };
    } catch (error) {
      throw error;
    }
  }

  async getCampaignPerformance(dateRange = '7d') {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const mockData = [
        { date: '2026-02-15', sent: 1200, opened: 1008, replied: 48, converted: 6 },
        { date: '2026-02-16', sent: 1400, opened: 1176, replied: 56, converted: 8 },
        { date: '2026-02-17', sent: 1100, opened: 924, replied: 44, converted: 5 },
        { date: '2026-02-18', sent: 1600, opened: 1344, replied: 64, converted: 9 },
        { date: '2026-02-19', sent: 1300, opened: 1092, replied: 52, converted: 7 },
        { date: '2026-02-20', sent: 1500, opened: 1260, replied: 60, converted: 8 },
        { date: '2026-02-21', sent: 1800, opened: 1512, replied: 72, converted: 10 },
      ];
      
      return mockData;
    } catch (error) {
      throw error;
    }
  }

  async getLeadSources() {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      return [
        { source: 'LinkedIn', count: 4800, percentage: 40 },
        { source: 'Google Maps', count: 3000, percentage: 25 },
        { source: 'CSV Import', count: 1800, percentage: 15 },
        { source: 'Manual', count: 1200, percentage: 10 },
        { source: 'Other', count: 1200, percentage: 10 },
      ];
    } catch (error) {
      throw error;
    }
  }

  async getConversionFunnel() {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      return [
        { stage: 'Contacted', count: 142800, percentage: 100 },
        { stage: 'Opened', count: 120000, percentage: 84 },
        { stage: 'Replied', count: 6840, percentage: 4.8 },
        { stage: 'Interested', count: 1200, percentage: 0.84 },
        { stage: 'Demo Booked', count: 324, percentage: 0.23 },
        { stage: 'Converted', count: 48, percentage: 0.03 },
      ];
    } catch (error) {
      throw error;
    }
  }

  async getTopCampaigns() {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      return [
        { name: 'SaaS Founders Q1', openRate: 84, replyRate: 4.8, conversions: 48 },
        { name: 'Restaurant Delhi', openRate: 80, replyRate: 4.0, conversions: 18 },
        { name: 'E-Commerce Retarget', openRate: 72, replyRate: 3.6, conversions: 22 },
        { name: 'Real Estate Mumbai', openRate: 78, replyRate: 3.5, conversions: 14 },
      ];
    } catch (error) {
      throw error;
    }
  }

  async exportReport(type = 'pdf', dateRange = '30d') {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate file download
      const blob = new Blob(['Mock report data'], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-report-${dateRange}.${type}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}

export default new AnalyticsService();