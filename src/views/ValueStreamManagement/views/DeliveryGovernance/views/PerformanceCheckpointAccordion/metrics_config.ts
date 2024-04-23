import { Unit, TrendComparison } from "./models";
import { DefaultMetrics } from "views/Settings/components/PerformanceCheckPoints/views/Metrics/interfaces";

export const METRICS_CONFIG: DefaultMetrics[] = [
    {
        columnName: "lead_time_portfolio_85",
        displayName: "Lead Time portfolio items (85th)",
        unit: Unit.DAYS,
        isBenchmarkingRecommended: false,
        trendComparison: TrendComparison.DOWN_IS_GOOD
    },
    {
        columnName: "lead_time_85",
        displayName: "Lead Time team level items (85th)",
        unit: Unit.DAYS,
        isBenchmarkingRecommended: false,
        trendComparison: TrendComparison.DOWN_IS_GOOD
    },
    {
        columnName: "lead_time_target_met",
        displayName: "Lead Time Target Met (%)",
        unit: Unit.PERCENTAGE,
        isBenchmarkingRecommended: true,
        trendComparison: TrendComparison.UP_IS_GOOD
    },
    {
        columnName: "total_throughput",
        displayName: "Throughput (count)",
        unit: Unit.FLOW_ITEMS,
        isBenchmarkingRecommended: false,
        trendComparison: TrendComparison.UP_IS_GOOD
    },
    {
        columnName: "flow_efficiency",
        displayName: "Flow Efficiency (%)",
        unit: Unit.PERCENTAGE,
        isBenchmarkingRecommended: true,
        trendComparison: TrendComparison.UP_IS_GOOD
    },
    {
        columnName: "flow_debt",
        displayName: "Productivity Debt (%)",
        unit: Unit.PERCENTAGE,
        isBenchmarkingRecommended: true,
        trendComparison: TrendComparison.DOWN_IS_GOOD
    },
    {
        columnName: "throughput_predictability",
        displayName: "Throughput Predictability",
        unit: Unit.BLANK,
        isBenchmarkingRecommended: false,
        trendComparison: TrendComparison.DOWN_IS_GOOD
    },
    {
        columnName: "lead_time_predictability",
        displayName: "Lead Time Predictability",
        unit: Unit.BLANK,
        isBenchmarkingRecommended: false,
        trendComparison: TrendComparison.DOWN_IS_GOOD
    },
    // Hide because it is same as Lead Time Target Met (%)
    // {
    //     columnName: "fitness_level",
    //     displayName: "% of work within SLE",
    //     unit: Unit.PERCENTAGE,
    //     isBenchmarkingRecommended: true,
    //     trendComparison: TrendComparison.UP_IS_GOOD
    // },
    {
        columnName: "stale_work",
        displayName: "Stale Work",
        unit: Unit.FLOW_ITEMS,
        isBenchmarkingRecommended: false,
        trendComparison: TrendComparison.DOWN_IS_GOOD
    },
    {
        columnName: "average_throughput",
        displayName: "Average Throughput",
        unit: Unit.FLOW_ITEMS,
        isBenchmarkingRecommended: false,
        trendComparison: TrendComparison.UP_IS_GOOD
    },
    {
        columnName: "lead_time_team_avg",
        displayName: "Average Lead Time - Team",
        unit: Unit.DAYS,
        isBenchmarkingRecommended: true,
        trendComparison: TrendComparison.DOWN_IS_GOOD
    },
    {
        columnName: "lead_time_portfolio_avg",
        displayName: "Average Lead Time - Portfolio",
        unit: Unit.DAYS,
        isBenchmarkingRecommended: false,
        trendComparison: TrendComparison.DOWN_IS_GOOD
    },
    {
        columnName: "demand_over_capacity_percent",
        displayName: "Demand to Capacity (ratio)",
        unit: Unit.PERCENTAGE,
        isBenchmarkingRecommended: false,
        trendComparison: TrendComparison.DOWN_IS_GOOD
    },
    {
        columnName: "inflow_outflow_percent",
        displayName: "Work Started to Work Completed (ratio)",
        unit: Unit.PERCENTAGE,
        isBenchmarkingRecommended: false,
        trendComparison: TrendComparison.DOWN_IS_GOOD
    }
    // WIP metrics arent correct
    // We have to fix the API to return correct data
    // Disabling WIP metrics till we fix it
    // {
    //     columnName: "wip_age_85",
    //     displayName: "WIP Age (85th)",
    //     unit: Unit.DAYS,
    //     isBenchmarkingRecommended: false,
    //     trendComparison: TrendComparison.DOWN_IS_GOOD
    // },
    // WIP metrics arent correct
    // We have to fix the API to return correct data
    // Disabling WIP metrics till we fix it
    // {
    //     columnName: "wip_count",
    //     displayName: "WIP Count",
    //     unit: Unit.FLOW_ITEMS,
    //     isBenchmarkingRecommended: false,
    //     trendComparison: TrendComparison.DOWN_IS_GOOD
    // },
    // WIP metrics arent correct
    // We have to fix the API to return correct data
    // Disabling WIP metrics till we fix it
    // {
    //     columnName: "wip_age_avg",
    //     displayName: "Average WIP Age",
    //     unit: Unit.DAYS,
    //     isBenchmarkingRecommended: false,
    //     trendComparison: TrendComparison.DOWN_IS_GOOD
    // },
];