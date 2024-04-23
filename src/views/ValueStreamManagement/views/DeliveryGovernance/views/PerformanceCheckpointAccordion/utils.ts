import { Checkpoint, PerformanceCheckpointMetric, TrendComparison, Unit } from "./models";
import { METRICS_CONFIG } from './metrics_config';
import { FilterWithId } from "views/Settings/components/PerformanceCheckPoints/views/Metrics/interfaces";


const getCheckpoint = (id: string, checkpoints: Checkpoint[]) => {
    return checkpoints.find(c => c.id === id);
};

/**
 * Build an array of metric objects from responses from the APIs
 */
export const getMetricsFromResponse = (
    // TODO: Add types
    checkpointsSnapshots: any[],
    checkpoints: Checkpoint[],
    customViewsToDisplay: FilterWithId[]
): PerformanceCheckpointMetric[] => {
    let metricsToProcess: string[] = [];
    for (const obj of checkpointsSnapshots) {
        metricsToProcess = Object.keys(obj)
            .filter(k => METRICS_CONFIG.find(mc => mc.columnName === k) !== undefined);

    }
    const metrics: PerformanceCheckpointMetric[] = [];
    for (const obj of checkpointsSnapshots) {
        const checkpoint = getCheckpoint(obj.checkpoints_view_id.toString(), checkpoints);
        for (const m of metricsToProcess) {
            if (checkpoint !== undefined) {
                const metricConfig = METRICS_CONFIG.find(mc => mc.columnName === m);
                if (metricConfig) {
                    metrics.push(new PerformanceCheckpointMetric({
                        checkpoint: checkpoint,
                        displayName: metricConfig.displayName,
                        trendComparison: metricConfig.trendComparison,
                        unit: metricConfig.unit,
                        name: m,
                        value: obj[m]
                    }));
                }
            }
        }
        for (const customViewToDisplay of customViewsToDisplay.filter(x => x.display_on_checkpoints)) {
            if (checkpoint !== undefined) {
                const profileOfWork = obj.profile_of_work;
                const value = customViewToDisplay.tag && customViewToDisplay.filter_displayName
                    && profileOfWork[customViewToDisplay.tag] && profileOfWork[customViewToDisplay.tag][customViewToDisplay.filter_displayName]
                    ? profileOfWork[customViewToDisplay.tag][customViewToDisplay.filter_displayName] : '-';
                metrics.push(
                    new PerformanceCheckpointMetric(
                        {
                            checkpoint,
                            displayName: customViewToDisplay.filter_displayName + '(' + customViewToDisplay.tag + ')',
                            trendComparison: TrendComparison.UP_IS_GOOD,
                            unit: Unit.PERCENTAGE,
                            name: customViewToDisplay.filter_id ?
                                (typeof customViewToDisplay.filter_id === 'string' ? customViewToDisplay.filter_id : customViewToDisplay.filter_id.toString())
                                : '',
                            value: value?.percentage || -999999,
                            // absoluteValue: value?.value || '-',
                        }
                    )
                );
            }
        }
    }
    return metrics;
};