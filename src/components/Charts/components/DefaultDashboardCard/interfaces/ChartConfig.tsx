import { ComponentType, ReactNode } from 'react';
import { InfoKey } from 'components/Charts/configuration/ChartInfoMessages';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import ErrorMessageInfo from 'components/Charts/components/DashboardCard/views/Content/components/ErrorMessage/interfaces/ErrorMessageInfo';

export type DataProps<T> = {
  data?: T;
};

type HasPropsOtherThanData<Props extends DataProps<T>, T> = [
  keyof Omit<Props, keyof DataProps<T>>,
] extends [never]
  ? undefined
  : Omit<Props, 'data'>;

export type ChartConfigFlags = {
  isLoading?: boolean;
  demoDataIsSelected?: boolean;
};

export type ChartConfig<Props extends DataProps<T>, T> = {
  title: string;
  contentId?: InfoKey;
  Component: ComponentType<Props>;
  size?: ChartSizes;
  errorMessages?: ErrorMessageInfo[];
  shouldBeHidden?: boolean;
  dataIsUnavailable?: (data?: T) => boolean;
  fixedContent?: ReactNode;
  hideDefaultLoadingAnimation?: boolean;
  additionalProps?: HasPropsOtherThanData<Props, T>;
  modalButtonDisabled?: boolean;
  fullScreen?: boolean;
} & DataProps<T> &
  ChartConfigFlags;

export interface MultiChartProps {
  chartConfigs: ChartConfig<any, any>[];
  globalConfigs: Partial<
    Pick<
      ChartConfig<any, any>,
      | 'data'
      | 'dataIsUnavailable'
      | 'demoDataIsSelected'
      | 'shouldBeHidden'
      | 'isLoading'
      | 'errorMessages'
      | 'size'
      | 'additionalProps'
    >
  >;
}
