import { maxBy, sortBy } from 'lodash';
import { useEffect, useMemo } from 'react';
import { ApiQueryParameters } from 'core/api/ApiClient/ApiClient';
import Scatterplot from 'views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/TimeDistributionSection/components/ItemTimeScatterplot/components/Scatterplot';

import { ScatterplotDatumWithDates } from '../../../../interfaces/timeDistribution';
import { getPerspectiveProfile } from '../../utils/perspective';
import EmptyScatterplot from './components/EmptyScatterplot';
import SkeletonBarChart from 'views/ValueStreamManagement/components/SkeletonBarChart';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import { DrillDownTelemetryAction } from 'core/api/telemetry/types';
import { formatStringDate } from 'utils/dateTime';

const tooltipDataTransformer = (perspective: string, d: ScatterplotDatumWithDates) => {
  const obj: any = {
    id: d.workItemId,
    title: d.title,
    type: d.workItemType,
  };
  if (perspective === 'past') {
    if (typeof d.leadTimeInWholeDays === 'number') {
      obj.leadTime = d.leadTimeInWholeDays + ' days';
    }
  }
  if (perspective === 'present') {
    if (typeof d.wipAgeInWholeDays === 'number') {
      obj.wipAge = d.wipAgeInWholeDays + ' days';
    }
  }
  if (perspective === 'future') {
    if (typeof d.inventoryAgeInWholeDays === 'number') {
      obj.inventoryAge = d.inventoryAgeInWholeDays + ' days';
    }
  }
  obj.arrivalDate = typeof d.arrivalDate === 'undefined' ? '' : formatStringDate(d.arrivalDate, "yyyy-MM-dd");
  obj.commitmentDate = typeof d.commitmentDate === 'undefined' ? '' : formatStringDate(d.commitmentDate, "yyyy-MM-dd");
  obj.departureDate = typeof d.departureDate === 'undefined' ? '' : formatStringDate(d.departureDate, "yyyy-MM-dd");

  return obj;
};

type Props = {
  scatterplot: ScatterplotDatumWithDates[];
  perspective: string;
  targetForPredictability?: number | null;
  percentile50th?: number | null;
  percentile85th?: number | null;
  percentile98th?: number | null;
  upperOutliers?: Array<number>;
  filters?: ApiQueryParameters;
  isValidatingTimeDistribution?: boolean;
  telemetryAction?: string;
  telemetrySource?: string;
};

const ItemTimeScatterplot = ({
  scatterplot,
  perspective,
  targetForPredictability,
  percentile50th,
  percentile85th,
  percentile98th,
  filters,
  upperOutliers,
  isValidatingTimeDistribution,
  telemetryAction,
  telemetrySource
}: Props) => {
  const {
    ageField,
    joinDateField,
    chartId,
    joinDateFieldLabel,
    ageFieldLabel
  } = getPerspectiveProfile(perspective);

  const sortedData = useMemo(() => sortBy(scatterplot, joinDateField), [scatterplot]);

  const maxAgeItem = maxBy(scatterplot, joinDateField);
  const maximum = maxAgeItem
    ? Number(maxAgeItem[joinDateField])
    : 0;

  /*
  * Telemetry Action
  */
  const sendTelemetry = useSendTelemetry();
  useEffect(() => {
    if (telemetryAction === DrillDownTelemetryAction.accessFitnessCriteriaDrillDown)
      sendTelemetry(DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
        `${telemetrySource} -> Lead Time Scatterplot tab`, { page: "Lead Time Scatterplot" });
  }, [sendTelemetry]);

  return (
    <>
      {isValidatingTimeDistribution || !scatterplot ?
        <SkeletonBarChart /> :
        <>
          {scatterplot.length === 0
            ? <EmptyScatterplot
              xLabel={joinDateFieldLabel}
              yLabel={`${ageFieldLabel} (Days)`}
            />
            : <Scatterplot
              chartId={chartId}
              targetForPredictability={targetForPredictability}
              maximum={maximum}
              percentile50th={percentile50th}
              percentile85th={percentile85th}
              percentile98th={percentile98th}
              lowerOutliers={[]}
              upperOutliers={upperOutliers}
              filters={filters}
              data={sortedData}
              tooltipDataTransformer={tooltipDataTransformer.bind(null, perspective)}
              xScaleField={joinDateField}
              yScaleField={ageField}
              xLabel={joinDateFieldLabel}
              yLabel={`${ageFieldLabel} (Days)`}
              fieldsToIncludeIfMultiple={[
                'commitmentDate',
                'departureDate',
                'leadTime',
              ] as any}
              tooltipTitleProperty="id"
            />
          }
        </>}
    </>
  );
};

export default ItemTimeScatterplot;
