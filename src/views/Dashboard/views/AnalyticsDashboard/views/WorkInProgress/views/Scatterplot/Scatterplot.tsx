import { useMemo } from 'react';
import { ScatterplotDatum } from 'core/api/ApiClient/WipClient';
import { fromIsoToLocale } from 'utils/dateTime';
import sortBy from 'lodash/sortBy';
import memo from 'utils/typescript/memo';
import Scatterplot, {
  ScatterplotBaseProps,
} from 'views/Dashboard/components/Charts/components/Scatterplot';

const tooltipDataTransformer = (d: ScatterplotDatum) => {
  const obj: any = {
    id: d.workItemId,
    title: d.title,
    type: d.workItemType,
    status: d.state,
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
  return obj;
}

type Props = ScatterplotBaseProps<ScatterplotDatum>;

const WipAgeScatterplot = ({ data, ...props }: Props) => {
  const _data = useMemo(() => sortBy(data, 'commitmentDate'), [data]);

  return (
    <Scatterplot
      chartId="wip"
      {...props}
      data={_data}
      tooltipDataTransformer={tooltipDataTransformer}
      xScaleField="commitmentDate"
      yScaleField="wipAgeInWholeDays"
      xLabel="Commitment Date"
      yLabel="WIP Age (Days)"
      fieldsToIncludeIfMultiple={['commitmentDate', 'wipAge']}
      tooltipTitleProperty="title"
    />
  );
};

export default memo(WipAgeScatterplot);
