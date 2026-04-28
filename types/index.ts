export type KPICategory = 'CHS' | 'CES' | 'NPS' | 'EHS' | 'OX';

export type TrendDirection = 'up' | 'down' | 'stable';

export interface KPI {
  id: string;
  category: KPICategory;
  label: string;
  description: string;
  value: number;
  target: number;
  unit: string;
  trend: TrendDirection;
  trendValue: number; // percentage change vs. previous period
  period: string;     // e.g. "Q1 2026"
  history: number[];  // 8 data points oldest→newest, for sparkline
}

export interface KPISummary {
  category: KPICategory;
  title: string;
  color: string;      // Tailwind color token or hex, used for theming cards
  kpis: KPI[];
}

export interface Tenant {
  id: string;
  name: string;
  industry: string;
  kpiSummaries: KPISummary[];
}
