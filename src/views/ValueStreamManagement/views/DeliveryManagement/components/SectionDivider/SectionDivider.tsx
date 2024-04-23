import Divider from '@material-ui/core/Divider';
import ExtendedTooltip from 'views/ValueStreamManagement/components/ExtendedTooltip';
import { WidgetInformation } from 'views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common';

import { useStyles } from './SectionDivider.styles';

interface SectionDividerProps {
  title: string;
  widgetInfo?: WidgetInformation[];
  isValidating?: boolean;
}

export const SectionDivider = ({
  title,
  widgetInfo,
  isValidating
}: SectionDividerProps) => {
  const classes = useStyles();

  return (
    <div className={classes.dividerContainer} style={{ justifyContent: "space-between" }}>
      <Divider className={classes.dividerLeftUnit}/>
      <div className={classes.dividerText}>{title}</div>

      <span style={{ paddingTop: 15, paddingLeft: 15, paddingRight: 5 }}>
        { !isValidating && widgetInfo?.length !== 0 ? 
          <ExtendedTooltip content={widgetInfo} /> : <></> }
      </span>

      <Divider className={classes.dividerRightUnit}/>
    </div>
  );
};
