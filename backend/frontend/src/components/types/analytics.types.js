export const MetricType = {
  LEADS: 'leads',
  CAMPAIGNS: 'campaigns',
  MESSAGES: 'messages',
  CONVERSIONS: 'conversions',
  REVENUE: 'revenue',
};

export const ChartType = {
  LINE: 'line',
  BAR: 'bar',
  PIE: 'pie',
  DONUT: 'donut',
  AREA: 'area',
  FUNNEL: 'funnel',
};

export const DateRange = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  LAST_7_DAYS: '7d',
  LAST_30_DAYS: '30d',
  LAST_90_DAYS: '90d',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  THIS_YEAR: 'this_year',
  CUSTOM: 'custom',
};

export const createMetric = (data) => ({
  id: data.id || Date.now(),
  type: data.type || MetricType.LEADS,
  label: data.label || '',
  value: data.value || 0,
  change: data.change || null,
  changeType: data.changeType || 'neutral', // 'positive', 'negative', 'neutral'
  format: data.format || 'number', // 'number', 'percentage', 'currency'
  icon: data.icon || null,
  color: data.color || '#2563eb',
});

export const createChartData = (data) => ({
  id: data.id || Date.now(),
  type: data.type || ChartType.LINE,
  title: data.title || '',
  data: data.data || [],
  labels: data.labels || [],
  colors: data.colors || ['#2563eb', '#10b981', '#f59e0b', '#ef4444'],
  options: data.options || {},
});

export const createAnalyticsReport = (data) => ({
  id: data.id || Date.now(),
  title: data.title || '',
  dateRange: data.dateRange || DateRange.LAST_30_DAYS,
  startDate: data.startDate || null,
  endDate: data.endDate || null,
  metrics: data.metrics || [],
  charts: data.charts || [],
  insights: data.insights || [],
  generatedAt: data.generatedAt || new Date().toISOString(),
});

export const formatMetricValue = (value, format) => {
  switch (format) {
    case 'percentage':
      return `${value}%`;
    case 'currency':
      return `₹${value.toLocaleString()}`;
    case 'number':
    default:
      return value.toLocaleString();
  }
};

export const calculateChange = (current, previous) => {
  if (!previous || previous === 0) return null;
  
  const change = ((current - previous) / previous) * 100;
  return {
    value: Math.abs(change).toFixed(1),
    type: change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral',
    symbol: change > 0 ? '↑' : change < 0 ? '↓' : '→',
  };
};