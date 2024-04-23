import { TooltipHost } from '@fluentui/react';
import { CSSProperties } from 'react';
import {
  getMessage,
  InfoKey,
} from 'views/Dashboard/components/Charts/configuration/ChartInfoMessages';
import { TooltipIcon } from './InfoIconWithTooltip.styles';

interface Props {
  contentId?: InfoKey;
  customContent?: string;
  customStyles?: CSSProperties;
}

const calloutProps = { gapSpace: 0 };

const FluentUIToolTip = ({ contentId, customContent, customStyles }: Props) => {
  const tooltipId = 'tooltip-' + contentId;
  const contentInfo = customContent ?? getMessage(contentId);

  if (!contentInfo) {
    return null;
  }

  return (
    <TooltipIcon style={customStyles}>
      <TooltipHost
        content={contentInfo}
        id={tooltipId}
        calloutProps={calloutProps}
        closeDelay={1000}
      >
        <img
          src="img/icons/3005c/info_3005c.svg"
          alt={tooltipId}
          aria-describedby={tooltipId}
        />
      </TooltipHost>
    </TooltipIcon>
  );
};

export default FluentUIToolTip;
