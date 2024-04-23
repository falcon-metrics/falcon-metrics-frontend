import DashboardCard
  from 'components/Charts/components/DashboardCard/DashboardCard';
import {
  ErrorMessageInfo,
} from 'components/Charts/components/DashboardCard/views/Content/components/ErrorMessage';
import { useState } from 'react';

import {
  ChartConfig,
  DataProps,
} from './interfaces/ChartConfig';
import { dataIsEmpty } from './utils/utils';

/**
 * @component used for displaying a complete card for dashboard with error messages, loading and expand icon.
 * @typedef Props
 * @prop {ComponentType} Component for the main content of the card.
 * @prop {any} data - Main info prop of the component, will be used to determine if "No Data" message should be displayed
 * @prop {boolean} [dataIsUnavailable] Function that receives the data prop and returns the condition for showing "No Data" message
 * @prop {ErrorMessage[]} [errorMessages] Additional error messages with specific messages
 * @prop {boolean} [isLoading] Controls wheter the spinner should be displayed
 * @prop {boolean} [demoDataIsSelected] Controls whether "Sample Data" watermark is displayed on the top right of the card.
 * @prop {ReactNode} [fixedContent] Content to be shown above the main content of the card, not overlayed by error messages/loading.
 * @prop {string} [title] Title of the card
 * @prop {string} [contentId] Key of the predefined tooltip messages, that selects the message to be shown on the info icon.
 * @prop {ChartSizes} [size=ChartSizes.medium] Size of the card, cards of a certain size occupy a certain number of columns within the dashboard grid based on screens' the aspect ratio.
 * @prop {boolean} [shouldBeHidden] Flag to not show the component
 * @param {Props} props
 */
function DefaultDashboardCard<Props extends DataProps<T>, T>({
  Component,
  data,
  dataIsUnavailable,
  errorMessages = [],
  isLoading,
  demoDataIsSelected,
  fixedContent,
  additionalProps,
  hideDefaultLoadingAnimation,
  modalButtonDisabled,
  fullScreen,
  ...rest
}: ChartConfig<Props, T>) {
  const props = {
    data,
    ...(additionalProps ?? {}),
  } as Props;

  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const isLoadedDataEmpty: boolean = isLoading
    ? false
    : !data || dataIsEmpty(data) || !!dataIsUnavailable?.(data);

  return (
    <DashboardCard
      key={rest.title + rest.contentId}
      {...rest}
      errorMessagesInfo={[
        new ErrorMessageInfo(
          'No data available for the selected criteria.',
          isLoadedDataEmpty,
        ),
        ...errorMessages,
      ]}
      waterMarkIsVisible={demoDataIsSelected}
      isLoading={isLoading}
      fixedContent={fixedContent}
      hideDefaultLoadingAnimation={hideDefaultLoadingAnimation}
      modalButtonDisabled={modalButtonDisabled}
      fullScreen={fullScreen}
      useModalOpenProps={true}
      isModalOpenProps={isFullScreen}
      setIsModalOpenProps={setIsFullScreen}
    >
      {data && <Component {...props} isFullScreen={isFullScreen} />}
    </DashboardCard>
  );
}

export default DefaultDashboardCard;
