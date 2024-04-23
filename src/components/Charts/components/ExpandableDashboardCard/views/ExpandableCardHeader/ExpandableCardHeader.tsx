import FluentUIToolTip from 'components/UI/FluentUI/InfoIconWithTooltip';
import Box from '@material-ui/core/Box';
import useStyles from './ExpandableCardHeader.styles';
import WaterMark from './components/WaterMark';
import Title from './components/Title';
import { InfoKey } from 'views/Dashboard/components/Charts/configuration/ChartInfoMessages';

type Props = {
  title: string;
  contentId?: InfoKey;
  waterMarkText?: string;
};

const ExpandableCardHeader = ({
  title,
  contentId,
  waterMarkText
}: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Box className={classes.titleContainer}>
        <Title content={title} />
        <FluentUIToolTip contentId={contentId} />
      </Box>
      {
        waterMarkText && <WaterMark text={waterMarkText} /> // = 'Sample Data'
      }
    </Box>
  );
};

export default ExpandableCardHeader;
