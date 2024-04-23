import { ReactNode, useState } from "react";
import { Box } from "@material-ui/core";

import { ChartSizes } from "components/Charts/components/DashboardCard/interfaces/ChartSizes";
import SpinnerFullSize from "components/SpinnerFullSize";

import ErrorMessage, {
  ErrorMessageInfo,
} from "../DashboardCard/views/Content/components/ErrorMessage";

import ExpandButton from "./components/ExpandButton";
import ExpandableCard from "./components/ExpandableCard";
import ExpandableCardHeader from "./views/ExpandableCardHeader";
import { useStyles } from "./ExpandableDashboardCard.styles";

interface Props {
  title: string;
  size?: ChartSizes;
  children: ReactNode;
  errorMessagesInfo?: ErrorMessageInfo[];
  isLoading?: boolean;
  disableExpand?: boolean;
}

const ExpandableDashboardCard = (props: Props) => {
  const {
    title,
    size = ChartSizes.medium,
    children,
    errorMessagesInfo = [],
    isLoading = false,
    disableExpand = false
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const classes = useStyles();
  const containerClass: string = isExpanded
    ? classes.unfoldedContainer
    : classes.foldedContainer;

  const errorMessagesWithLoading: ErrorMessageInfo[] = [
    new ErrorMessageInfo(<SpinnerFullSize />, isLoading),
    ...errorMessagesInfo,
  ];

  return (
    <Box className={containerClass}>
      <ExpandableCard size={size}>
        <Box className={classes.buttonRelativeContainer}>
          {!disableExpand && (
            <Box className={classes.buttonIconContainer}>
              <ExpandButton isExpanded={isExpanded} onExpand={toggleExpanded} />
            </Box>
          )}
        </Box>
        <ExpandableCardHeader title={title} />
        <Box className={classes.content}>
          <ErrorMessage
            errorMessagesInfo={errorMessagesWithLoading}
            conditionArgs={props}
          >
            {children}
          </ErrorMessage>
        </Box>
      </ExpandableCard>
    </Box>
  );
};

export default ExpandableDashboardCard;
