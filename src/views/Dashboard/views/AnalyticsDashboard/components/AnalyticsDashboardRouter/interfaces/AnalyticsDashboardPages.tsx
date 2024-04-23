import { ComponentType } from 'react';
import { AnalyticsDashboardPageIndexes } from '../../../interfaces/PageIndexes';
import { PageProps } from '../../../interfaces/PageProps';
import SummaryPage from '../../../views/Summary';
import LeadTimePage from '../../../views/Leadtime/LeadTime';
import ThroughputPage from '../../../views/Throughput/Throughput';
import WipPage from '../../../views/WorkInProgress/WorkInProgress';
import FlowEfficiencyPage from '../../../views/FlowEfficiency';
import InventoryPage from '../../../views/Inventory/Inventory';

export const defaultIndex = AnalyticsDashboardPageIndexes.summary;

export const AnalyticsDashboardPages: Array<
  [string, AnalyticsDashboardPageIndexes, ComponentType<PageProps>]
> = [
  ['Summary', AnalyticsDashboardPageIndexes.summary, SummaryPage],
  ['Lead time', AnalyticsDashboardPageIndexes.leadTime, LeadTimePage],
  ['Throughput', AnalyticsDashboardPageIndexes.throughput, ThroughputPage],
  ['WIP', AnalyticsDashboardPageIndexes.WIP, WipPage],
  [
    'Flow of work',
    AnalyticsDashboardPageIndexes.flowOfWork,
    FlowEfficiencyPage,
  ],
  ['Inventory', AnalyticsDashboardPageIndexes.inventory, InventoryPage],
];
