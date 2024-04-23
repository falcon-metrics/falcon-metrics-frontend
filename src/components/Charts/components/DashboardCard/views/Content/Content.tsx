import { ReactNode } from "react";
import Box from "@material-ui/core/Box";
import useStyles from "./Content.styles";
import ErrorMessage, { ErrorMessageInfo } from "./components/ErrorMessage";
import { InfoKey } from "views/Dashboard/components/Charts/configuration/ChartInfoMessages";
import SpinnerFullSize from "components/SpinnerFullSize";
import Header from "./components/Header";
import { Chip } from "@material-ui/core";
import { BADGES, BadgeType } from "views/Dashboard/views/AnalyticsDashboard/components/BaseAccordion/BaseAccordion";

export type Props = {
  title: string;
  children: ReactNode;
  contentId?: InfoKey;
  waterMarkIsVisible?: boolean;
  errorMessagesInfo?: ErrorMessageInfo[];
  isLoading?: boolean;
  fixedContent?: ReactNode;
  hideDefaultLoadingAnimation?: boolean;
  hideHeader?: boolean;
  badgeType?: BadgeType;
};

const DashboardCardContent = (props: Props) => {
  const classes = useStyles();
  const {
    title,
    children,
    contentId,
    waterMarkIsVisible,
    errorMessagesInfo = [],
    isLoading = false,
    fixedContent,
    hideDefaultLoadingAnimation = false,
    hideHeader = false,
    badgeType,
  } = props;

  if (!hideDefaultLoadingAnimation) {
    errorMessagesInfo.push(
      new ErrorMessageInfo(<SpinnerFullSize />, isLoading)
    );
  }

  return (
    <Box className={classes.box}>
      <Box display="flex" alignItems="center">
        {!hideHeader && (
          <Header
            title={title}
            contentId={contentId}
            waterMarkText={waterMarkIsVisible ? "Sample Data" : ""}
          />
        )}
        {badgeType && <Chip size="small" label={badgeType} style={{ backgroundColor: BADGES[badgeType], color: "#fff" }} />}
      </Box>
      {fixedContent && <Box>{fixedContent}</Box>}
      <Box
        className={
          hideHeader
            ? classes.content + " " + classes.noTopPadding
            : classes.content
        }
      >
        <ErrorMessage
          errorMessagesInfo={errorMessagesInfo}
          conditionArgs={props}
        >
          {children}
        </ErrorMessage>
      </Box>
    </Box>
  );
};

export default DashboardCardContent;
