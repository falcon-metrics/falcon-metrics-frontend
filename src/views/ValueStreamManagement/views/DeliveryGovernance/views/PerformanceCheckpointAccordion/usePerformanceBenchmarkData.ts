import { getFilterUrlSearchParams } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils";
import { CheckpointsListResponse } from "./interfaces";
import fetch, { useCustomSWR } from 'core/api/fetch';
import { Context } from "views/Dashboard/views/AnalyticsDashboard/interfaces/Context";
import { useMetrics } from "views/Settings/components/PerformanceCheckPoints/views/Metrics/hooks/useMetrics";
import { CheckpointItem } from "views/Settings/components/PerformanceCheckPoints/interfaces";
import { Checkpoint, Context as ContextClass, PerformanceBenchmarkCustomViewMetric, PerformanceBenchmarkMetric, PerformanceBenchmarkRow, TrendComparison, Unit } from "./models";
import _ from "lodash";
import { METRICS_CONFIG } from "./metrics_config";

const getCheckpoint = (id: string, checkpoints: Checkpoint[]) => {
    return checkpoints.find(c => c.id === id);
};

/**
 * Make multiple concurrent requests to fetch data from all the given urls
 */
export const checkpointsSnapshotsFetcher = async (urlsStr: string) => {
    const urls = JSON.parse(urlsStr);
    const results = await Promise.all(urls.map(url => fetch.get<{ checkpoints: CheckpointsListResponse; }>(url)));
    return results.map((r: any) => r.data);
};

/**
 * Hooks to fetch performance benchmark data for multiple context ids
 */
export const usePerformanceBenchmark = (contexts: Context[], checkpoints: CheckpointItem[]) => {
    const checkpointViewIds = checkpoints.map((c) => (c.id as any).toString());
    // console.log(contexts);
    const resource = '/checkpoints-snapshots';
    const checkpointViewIdsStr = checkpointViewIds.join(',');
    const urls = contexts.map(({ id: contextId }) => {
        const queryParamsString = getFilterUrlSearchParams({
            contextId,
            checkpointsSnapshots: checkpointViewIdsStr
        });
        return `${resource}?${queryParamsString}`;
    });
    const rows: PerformanceBenchmarkRow[] = [];

    const { data, isValidating: isValidatingMetrics } = useMetrics();

    const { data: response, error, isValidating } = useCustomSWR<any>(
        checkpointViewIds ? JSON.stringify(urls) : null,
        checkpointsSnapshotsFetcher,
    );
    const checkpointsNoUndefined = checkpoints.map(c => ({
        name: c.name as string,
        id: (c.id as number).toString(),
        start_date: c.start_date as string,
        end_date: c.end_date as string,
    }));
    const checkpointsObjects = checkpointsNoUndefined.map(c => new Checkpoint({
        name: c.name as string,
        id: c.id,
        startDate: c.start_date,
        endDate: c.end_date
    }));

    let allMetrics: PerformanceBenchmarkMetric[] = [];
    response?.forEach((r, i) => {
        const context = new ContextClass({
            id: contexts[i].id,
            name: contexts[i].displayName,
        });
        const snapshots = r.checkpoints;
        // Reuse this function 
        const selectedMetrics = data.savedMetrics.metrics || [];
        const selectedCustomViews = data.savedMetrics.customViews || [];
        const performanceBenchmarkMetrics: PerformanceBenchmarkMetric[] = [];
        for (const obj of snapshots) {
            const checkpoint = getCheckpoint(obj.checkpoints_view_id.toString(), checkpointsObjects);
            for (const metric of selectedMetrics) {
                const metricConfig = METRICS_CONFIG.find(x => x.columnName === metric.columnName);

                if (checkpoint !== undefined) {
                    performanceBenchmarkMetrics.push(
                        new PerformanceBenchmarkMetric(
                            {
                                name: metric.columnName,
                                checkpoint,
                                context,
                                displayName: metric.displayName || '',
                                unit: metricConfig?.unit || Unit.BLANK,
                                value: obj[metric.columnName],
                                trendComparision: metricConfig?.trendComparison || TrendComparison.UP_IS_GOOD
                            }
                        )
                    );
                }
            }
            for (const customView of selectedCustomViews.filter(x => x.display_on_benchmarking)) {
                if (checkpoint !== undefined) {
                    const profileOfWork = obj.profile_of_work;
                    const value = customView.tag && customView.filter_displayName
                        && profileOfWork[customView.tag] && profileOfWork[customView.tag][customView.filter_displayName]
                        ? profileOfWork[customView.tag][customView.filter_displayName] : '-';
                    performanceBenchmarkMetrics.push(
                        new PerformanceBenchmarkCustomViewMetric(
                            {
                                name: customView.filter_id ?
                                    (typeof customView.filter_id === 'string' ? customView.filter_id : customView.filter_id.toString())
                                    : '',
                                checkpoint,
                                context,
                                displayName: customView.filter_displayName + '(' + customView.tag + ')',
                                unit: Unit.PERCENTAGE,
                                value: value?.percentage || '-',
                                trendComparision: TrendComparison.UP_IS_GOOD,
                                absoluteValue: value?.value || '-'
                            }
                        )
                    );
                }
            }
        }
        allMetrics = allMetrics.concat(performanceBenchmarkMetrics);
    });
    // console.log(allMetrics);
    const groups = _.groupBy(allMetrics, m => m.name);
    Object.keys(groups).forEach(metricName => {
        const row = new PerformanceBenchmarkRow(groups[metricName]);
        rows.push(row);
    });
    return {
        rows,
        error,
        isLoading: isValidating || isValidatingMetrics,
    };
};

