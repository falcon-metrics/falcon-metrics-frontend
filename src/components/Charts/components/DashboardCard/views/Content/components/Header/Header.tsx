import FluentUIToolTip from 'components/UI/FluentUI/InfoIconWithTooltip';
import {
  InfoKey,
} from 'views/Dashboard/components/Charts/configuration/ChartInfoMessages';

import Box from '@material-ui/core/Box';

import Title from './components/Title';
import WaterMark from './components/WaterMark';
import useStyles from './Header.styles';

type Props = {
  title: string;
  contentId?: InfoKey;
  waterMarkText?: string;
};

const Header = ({ title, contentId, waterMarkText }: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Box className={classes.titleContainer}>
        <Title content={title} />
        {contentId && <FluentUIToolTip contentId={contentId} />}
      </Box>
      {
        waterMarkText && <WaterMark text={waterMarkText} /> // = 'Sample Data'
      }
    </Box>
  );
};

export default Header;
