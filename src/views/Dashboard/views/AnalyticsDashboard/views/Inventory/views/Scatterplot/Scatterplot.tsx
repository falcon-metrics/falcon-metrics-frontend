import { useMemo } from 'react';
import { fromIsoToLocale } from 'utils/dateTime';
import sortBy from 'lodash/sortBy';
import { ScatterplotDatum } from 'core/api/ApiClient/InventoryClient';
import Scatterplot, {
  ScatterplotBaseProps,
} from 'views/Dashboard/components/Charts/components/Scatterplot';
import memo from 'utils/typescript/memo';

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
  return obj;
}

type Props = ScatterplotBaseProps<ScatterplotDatum>;

const InventoryScatterplot = ({ data, ...props }: Props) => {
  const _data = useMemo(() => sortBy(data, 'departureDate'), [data]);

  return (
    <Scatterplot
      chartId="inventory"
      {...props}
      data={_data}
      tooltipDataTransformer={tooltipDataTransformer}
      xScaleField="arrivalDate"
      yScaleField="inventoryAgeInWholeDays"
      xLabel="Arrival Date"
      yLabel="Inventory Age (Days)"
      fieldsToIncludeIfMultiple={['inventoryAge', 'arrivalDate']}
      tooltipTitleProperty="title"
    />
  );
};

export default memo(InventoryScatterplot);
