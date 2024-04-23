import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useStyles } from './EmptyStrategyWidget.styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import useAuthentication from 'hooks/useAuthentication';
import ButtonTooltip from 'views/Strategies/components/Tooltip/ButtonTooltip';

export const WrapperTitle = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 10,
  marginTop: 6
});

export const Title = styled(Box)({
  fontSize: 16,
  fontFamily: 'Open Sans',
  color: '#2B353B',
  fontWeight: 'bold',
  margingTop: 10,
});

export const OneLineSummary = styled(Box)({
  color: '#2B353B',
  fontSize: 18,
  fontWeight: 'bold',
  fontFamily: 'Open sans',
  display: 'flex',
  alignItems: 'center'
});

export const Description = styled(Box)({
  color: '#2B353B',
  fontSize: 14,
  fontFamily: 'Open sans',
  margin: 10,
  lineHeight: 1.5,
  whiteSpace: 'pre-wrap',
  marginTop: 20,
});

export const CardIcon = styled(Box)({
  color: '#009CDE',
  '& svg': {
    fontSize: 60,
  },
});

const PresentButton = styled(Button)({
  fontSize: 14,
  fontFamily: 'Open Sans',
  width: 188,
});

export const WrapperCard = styled(Box)({
  // width: 1084,
  backgroundColor: '#fefefe',
  fontSize: 14,
  fontFamily: 'Open Sans',
  padding: 10,
  boxShadow: '0px 2px 11px 0px #dcdcdc',
  position: 'relative',
  textAlign: 'justify',
  color: '#2B353B',
  paddingLeft: 20,
  paddingRight: 30,
  paddingTop: 20,
  paddingBottom: 30,
  borderRadius: 16,
});

type Props = {
  title?: any; 
  description?: string;
  iconName?: string;
  oneLineSummary?: string;
  openModal?: () => void;
  children?: any;
  color?: string;
  openStrategyModal: () => void;
};

export const DividerLine = styled(Divider)({
  width: 23,
  marginTop: 5,
  color: '#00bfb2',
  backgroundColor: '#00bfb2',
  height: 3,
  borderRadius: 4
});


const EmptyStrategyWidget = ({
  title, color, openStrategyModal
}: Props) => {
  const classes = useStyles();
  const { isAdminOrPowerUser } = useAuthentication();

  return (
    <Box style={{ position: 'relative' }}>
      <Box className={classes.wrapperTitle}>
        <WrapperTitle>
          <Title>
            {title}
          </Title>
          <DividerLine style={{ color: color || '#00bfb2', backgroundColor: color || '#00bfb2' }} />
        </WrapperTitle>
        <Description>
          You have not visualized your strategy for this strategic driver.
        </Description>
        <br />
        <ButtonTooltip text="add new Strategy">
          <PresentButton
            onClick={openStrategyModal}
            color="primary"
            variant="contained"
            size="medium"
            style={{
              backgroundColor: color || '#0077C8',
            }}
            disabled={!isAdminOrPowerUser}
          >
            Add Strategy
          </PresentButton>
        </ButtonTooltip>
      </Box>
    </Box>
  );
}

export default EmptyStrategyWidget;