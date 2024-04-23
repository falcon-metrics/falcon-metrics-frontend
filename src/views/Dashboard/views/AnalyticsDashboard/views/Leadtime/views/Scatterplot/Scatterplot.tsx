import { useMemo } from 'react';
import { ScatterplotDatum } from 'core/api/ApiClient/LeadTimeClient';
import sortBy from 'lodash/sortBy';
import memo from 'utils/typescript/memo';
import { fromIsoToLocale } from 'utils/dateTime';
import Scatterplot from 'views/Dashboard/components/Charts/components/Scatterplot/Scatterplot';
import { ScatterplotBaseProps } from 'views/Dashboard/components/Charts/components/Scatterplot';

const tooltipDataTransformer = (d: ScatterplotDatum) => {
  const obj: any = {
    id: d.workItemId,
    title: d.title,
    type: d.workItemType,
  }
  if (typeof d['leadTimeInWholeDays'] === 'number') {
    obj.leadTime = d['leadTimeInWholeDays'] + ' days';
  }
  if (typeof d['wipAgeInWholeDays'] === 'number') {
    obj.wipAge = d['wipAgeInWholeDays'] + ' days';
  }
  if (typeof d['inventoryAgeInWholeDays'] === 'number') {
    obj.inventoryAge = d['inventoryAgeInWholeDays'] + ' days';
  }
  obj.arrivalDate = fromIsoToLocale(d.arrivalDate);
  obj.commitmentDate = fromIsoToLocale(d.commitmentDate);
  obj.departureDate = fromIsoToLocale(d.departureDate);
  return obj;
}

type Props = ScatterplotBaseProps<ScatterplotDatum>;

const LeadTimeScatterplot = ({ data, ...props }: Props) => {
  const _data = useMemo(() => sortBy(data, 'departureDate'), [data]);

  return (
    <Scatterplot
      chartId="leadtime"
      {...props}
      data={_data}
      tooltipDataTransformer={tooltipDataTransformer}
      xScaleField="departureDate"
      yScaleField="leadTimeInWholeDays"
      xLabel="Departure Date"
      yLabel="Leadtime (Days)"
      fieldsToIncludeIfMultiple={[
        'commitmentDate',
        'departureDate',
        'leadTime',
      ]}
      tooltipTitleProperty="title"
    />
  );
};

export default memo(LeadTimeScatterplot);
