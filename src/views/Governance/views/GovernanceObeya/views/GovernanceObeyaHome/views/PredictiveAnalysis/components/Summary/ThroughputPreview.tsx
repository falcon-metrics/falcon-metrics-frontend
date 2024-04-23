import { TimeSeries } from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/interfaces/runChart";
import { parseTimeSeriesEntries } from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/utils/parsing/parseRunChartData";
import RunChart from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/RunChartSection/views/RunChart";
import FluentUIDatePicker from 'components/UI/FluentUI/BaseDatePicker';
import { ChangeEvent, useEffect, useState } from "react";
import { DateTime } from "luxon";
import _ from "lodash";
import { Box, Button, Checkbox, Typography } from "@material-ui/core";
import { ObeyaContext, SettingsData } from "../../types";
import { useForecastingSettings } from "views/Governance/views/GovernanceObeya/hooks/useForecastingSettings";
import { usePredctiveAnalysis } from "views/Governance/views/GovernanceObeya/hooks/usePredictiveAnalysis";
import fetch from 'core/api/fetch';
import { Skeleton } from "@material-ui/lab";
import { DEFAULT_DATE_FORMAT } from "utils/dateTime";

type ThroughputPreviewProps = {
    settingsData?: SettingsData;
    setAnalysisData?: any;
    setSettingsData?: any;
    roomId: string;
    setOpenPreviewModal?: any;
    contexts?: ObeyaContext[];
};
type ThroughputResponse = [string, number][];
const ThroughputPreview = (props: ThroughputPreviewProps) => {
    const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
    const [isStartDateDefault, setIsStartDateDefault] = useState<boolean>(false);
    const [isEndDateDefault, setIsEndDateDefault] = useState<boolean>(false);
    const [useRollingPeriod, setUseRollingPeriod] = useState<boolean>(true);
    const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [graphResponse, setGraphResponse] = useState<TimeSeries>();
    const [graphData, setGraphData] = useState<TimeSeries>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (props.settingsData) {
            if (props.settingsData.sampleStartDate) {
                setSelectedStartDate(DateTime.fromISO(props.settingsData.sampleStartDate).toJSDate());
            } else {
                setSelectedStartDate(DateTime.now().startOf('day').minus({ day: 91 }).toJSDate());
                setIsStartDateDefault(true);
            }
            if (props.settingsData.sampleEndDate) {
                setUseRollingPeriod(false);
                setSelectedEndDate(DateTime.fromISO(props.settingsData.sampleEndDate).toJSDate());
            } else {
                setIsEndDateDefault(true);
                setSelectedEndDate(DateTime.now().startOf('day').minus({ day: 1 }).toJSDate());
            }
            if (props.settingsData.sampleStartDate && !props.settingsData.sampleEndDate) {
                fetchAndSetGraphData(DateTime.fromISO(props.settingsData.sampleStartDate), DateTime.now().startOf('day').minus({ day: 1 }));
            } else if (props.settingsData.sampleStartDate && props.settingsData.sampleEndDate) {
                fetchAndSetGraphData(DateTime.fromISO(props.settingsData.sampleStartDate), DateTime.fromISO(props.settingsData.sampleEndDate));
            } else {
                fetchAndSetGraphData(DateTime.now().startOf('day').minus({ day: 91 }), DateTime.now().startOf('day').minus({ day: 1 }));
            }
        }
    }, [props.settingsData]);

    const fetchAndSetGraphData = async (startDate: DateTime, endDate: DateTime) => {
        if (graphResponse && DateTime.fromISO(startDate.toISODate()) >= graphResponse[0][0] && DateTime.fromISO(endDate.toISODate()) <= graphResponse[graphResponse.length - 1][0]) {
            const startIdx = graphResponse.findIndex(i => i[0].toISODate() === startDate.toISODate());
            const endIdx = graphResponse.findIndex(i => i[0].toISODate() === endDate.toISODate());
            const dataCopy = _.cloneDeep(graphResponse);
            setGraphData(dataCopy.slice(startIdx, endIdx + 1));
        } else {
            const contextIds = props.contexts?.map(context => context.contextId).join(',');
            setLoading(true);
            const response = await fetch.get(`/obeya/predictive-analysis/settings/throughput-preview?roomId=${props.roomId}&contextIds=${contextIds}&startDate=${encodeURIComponent(startDate.toISO())}&endDate=${encodeURIComponent(endDate.toISO())}`);
            setLoading(false);
            const data: ThroughputResponse = response.data;
            const parsedNewItemsData: TimeSeries = data
                ? _.sortBy(parseTimeSeriesEntries(data), (item) => item[0].toMillis())
                : [];
            setGraphResponse(parsedNewItemsData);
            setGraphData(parsedNewItemsData);
        }
    };
    const { postAndMutateSettings } = useForecastingSettings(props.roomId);
    const { getPredictiveAnalysis } = usePredctiveAnalysis(props.roomId);

    const onSave = async () => {
        setSubmitting(true);
        try {
            const newSettings = _.cloneDeep(props.settingsData);
            let newStartDate, newEndDate;
            if (!isEndDateDefault && !useRollingPeriod) {
                newStartDate = DateTime.fromJSDate(selectedStartDate).toISO();
                newEndDate = DateTime.fromJSDate(selectedEndDate).toISO();
            }
            if (!isStartDateDefault) {
                newStartDate = DateTime.fromJSDate(selectedStartDate).toISO();
            }
            if (newSettings) {
                newSettings.sampleStartDate = newStartDate;
                newSettings.sampleEndDate = newEndDate;
                const newSettingsData = await postAndMutateSettings(newSettings);
                props.setSettingsData(newSettingsData as SettingsData);
                const data = await getPredictiveAnalysis();
                props.setAnalysisData(data);
            }
            props.setOpenPreviewModal(false);
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
        }
    };

    const onChangeStartDate = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setSelectedStartDate(selectedDate);
            setIsStartDateDefault(false);
            const endDate = selectedEndDate ? DateTime.fromJSDate(selectedEndDate) : DateTime.now().startOf('day').minus({ days: 1 });
            fetchAndSetGraphData(DateTime.fromJSDate(selectedDate), endDate);
        }
    };

    const onChangeEndDate = (selectedDate: Date | undefined) => {
        if (selectedDate && selectedStartDate) {
            setSelectedEndDate(selectedDate);
            setIsEndDateDefault(false);
            fetchAndSetGraphData(DateTime.fromJSDate(selectedStartDate), DateTime.fromJSDate(selectedDate));
        }
    };

    const onChangeUseRollingPeriod = (event: ChangeEvent<HTMLInputElement>) => {
        setUseRollingPeriod(event.target.checked);
        setSelectedEndDate(DateTime.now().startOf('day').minus({ day: 1 }).toJSDate());
        setIsEndDateDefault(false);
        fetchAndSetGraphData(DateTime.fromJSDate(selectedStartDate), DateTime.now().startOf('day').minus({ day: 1 }));
    };

    return (
        <>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
                <FluentUIDatePicker
                    maxDate={DateTime.now().minus({ days: 2 }).startOf('day').toJSDate()}
                    placeholder="Select..."
                    label="Start date"
                    value={selectedStartDate}
                    onDateSelected={onChangeStartDate}
                />
                <Box style={{ marginLeft: 20 }}>
                    <FluentUIDatePicker
                        maxDate={DateTime.now().minus({ days: 1 }).startOf('day').toJSDate()}
                        placeholder="Select..."
                        label="End date"
                        value={selectedEndDate}
                        onDateSelected={onChangeEndDate}
                        disabled={useRollingPeriod || !selectedStartDate}
                    />
                </Box>
                <Box style={{ marginLeft: 20 }}>
                    <Checkbox
                        color="primary"
                        checked={useRollingPeriod}
                        onChange={onChangeUseRollingPeriod}
                    />
                    Rolling window
                </Box>
            </Box>
            <Box>
                <Box display="flex" flexDirection="row" alignItems="center" ml={5}>
                    <Typography style={{ fontSize: 12, fontFamily: "Open Sans" }}>
                        Dataset Size:&nbsp;
                    </Typography>
                    <Typography
                        style={{ fontSize: 12, fontFamily: "Open Sans", fontWeight: 600 }}
                    >
                        {graphData?.length}
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="row" ml={5}>
                    <Typography
                        style={{
                            fontSize: 12,
                            fontFamily: "Open Sans",
                            wordWrap: "break-word",
                        }}
                    >
                        No. of samples where throughput is greater than 0:
                    </Typography>
                    <Typography
                        style={{ fontSize: 12, fontFamily: "Open Sans", fontWeight: 600 }}
                    >
                        &nbsp;{graphData?.filter(item => item[1] > 0).length}
                    </Typography>
                </Box>
            </Box>
            {loading && <Skeleton height={300} variant="rect" />}
            {graphData && !loading &&
                <RunChart
                    runChartSeries={graphData || []}
                    chartType='bar'
                    customXAxisLabel='Day'
                    customDateFormat={DEFAULT_DATE_FORMAT}
                    customTooltipLabel={undefined}
                />
            }
            <Box style={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant="contained" color="primary" onClick={onSave} disabled={submitting}> {submitting ? 'Applying' : 'Apply'}</Button>
            </Box>
        </>
    );
};
export default ThroughputPreview;