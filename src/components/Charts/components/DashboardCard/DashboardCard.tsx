import "./DashboardCardSizes.css";

import { memo, useMemo, useState } from "react";

import { ChartSizes } from "components/Charts/components/DashboardCard/interfaces/ChartSizes";

import Box from "@material-ui/core/Box";

import Card from "./components/Card";
import FullScreenButton from "./components/FullScreenButton";
import useStyles from "./DashboardCard.styles";
import Content, { ContentProps } from "./views/Content";
import ExtendedTooltip from "views/ValueStreamManagement/components/ExtendedTooltip";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import BaseModal from "components/UI/BaseModal/BaseModal2";

type Props = {
  modalButtonDisabled?: boolean;
  size?: ChartSizes;
  widgetInfo?: WidgetInformation[];
  hideContentBehind?: boolean;
  matchHeight?: boolean;
  fullScreen?: boolean;
  useModalOpenProps?: boolean;
  isModalOpenProps?: boolean;
  setIsModalOpenProps?: Function;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
} & ContentProps;

const DashboardCard = ({
  modalButtonDisabled,
  size = ChartSizes.medium,
  hideContentBehind,
  matchHeight,
  fullScreen,
  useModalOpenProps,
  isModalOpenProps = false,
  isWidgetPreview = false,
  setIsModalOpenProps = () => {
    return "This function needs to be provided if useModalOpenProps is true";
  },
  isDashboardEdit = false,
  ...contentProps
}: Props) => {
  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const content = useMemo(() => <Content {...contentProps} />, [contentProps]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, ...rest } = contentProps;

  // Set title = "" because the modal already displays the title
  const contentWithoutTitle = useMemo(() => <Content title="" {...rest} />, [
    rest,
  ]);

  const widget = content?.props?.children ?? null;

  const widgetInfo = widget?.props !== undefined ? widget.props.widgetInfo : [];
  const isModalOpen = useModalOpenProps ? isModalOpenProps : modalIsOpen;
  const setIsModalOpen = useModalOpenProps
    ? setIsModalOpenProps
    : setModalIsOpen;

  return (
    <>
      <BaseModal
        title={contentProps.title}
        open={isModalOpen}
        setOpen={() => setIsModalOpen(false)}
        maxWidth="lg"
        fullScreen={fullScreen}
      >
        {contentWithoutTitle}
      </BaseModal>

      <Card size={size} matchHeight={matchHeight}>
        {!isDashboardEdit && !isWidgetPreview && !modalButtonDisabled && (
          <Box className={classes.relativeContainer}>
            <Box className={classes.buttonContainer}>
              <FullScreenButton openModal={() => setIsModalOpen(true)} />
            </Box>
          </Box>
        )}
        {hideContentBehind && isModalOpen ? "" : content}

        {!isDashboardEdit &&
        !content.props.isLoading &&
        widgetInfo?.length !== 0 &&
        widgetInfo !== undefined ? (
          <ExtendedTooltip maxWidth="lg" content={widgetInfo} />
        ) : (
          <></>
        )}
      </Card>
    </>
  );
};

export default memo(DashboardCard);
