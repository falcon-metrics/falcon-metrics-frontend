import { lazy, Suspense } from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { IconButtonWrapper, EditIconWrapper } from '../ModalStrategicDriverDetail/ModalStrategicDriverDetail.styles';
import { useStyles } from './StrategicDriverDetailCard.styles';
import useAuthentication from 'hooks/useAuthentication';

export const WrapperTitle = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 16,
});

export const Title = styled(Box)({
  color: '#2B353B',
  fontSize: 30,
  fontWeight: 'bold',
  fontFamily: 'Open sans',
  marginLeft: 0,
  marginRight: 50,
  display: 'flex',
  alignItems: 'center',
});

export const OneLineSummary = styled(Box)({
  color: '#2B353B',
  fontSize: 18,
  fontWeight: 'bold',
  fontFamily: 'Open sans',
  display: 'flex',
  alignItems: 'center',
  marginRight: 50,
});

export const Description = styled(Box)({
  color: '#2B353B',
  fontSize: 14,
  fontFamily: 'Open sans',
  margin: 10,
  lineHeight: 1.5,
  whiteSpace: 'pre-wrap'
});

export const CardIcon = styled(Box)({
  color: '#009CDE',
  '& svg': {
    fontSize: 60,
  },
});

export const WrapperCard = styled(Box)({
  // width: 1084,
  // minHeight: 241,
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
  title?: string;
  description?: string;
  iconName?: string;
  oneLineSummary?: string;
  openModal?: () => void;
  children?: any;
  shouldHideIcon?: boolean;
  colour?: string;
  customStyles?: any;
  hideEdit?: boolean;
};

const StrategicDriverDetailCard = ({
  title, description, iconName,
  oneLineSummary, openModal, children,
  shouldHideIcon, colour, customStyles, hideEdit
}: Props) => {
  const classes = useStyles();
  const { isAdminOrPowerUser } = useAuthentication();
  
  const Icon = iconName ? lazy(
    () => import(`@material-ui/icons/${iconName}Outlined`)
  ) : AssignmentIcon;

  return (
    <Box style={{ position: 'relative' }}>
      {!hideEdit && isAdminOrPowerUser &&
        <IconButtonWrapper aria-label="create" onClick={openModal} style={{ backgroundColor: colour || '#0077C8' }}>
          <EditIconWrapper />
        </IconButtonWrapper>
      }
      <WrapperCard style={{ ...(customStyles || {}) }}>
        {children ? children : (
          <>
            <Box className={classes.wrapperTitle}>
              {!shouldHideIcon ? (
                <CardIcon>
                  <Suspense fallback="-">
                    <Icon style={{ color: colour || '#0077C8' }} />
                  </Suspense>
                </CardIcon>
              ) : null}
              <WrapperTitle>
                <Title>
                  {title}
                </Title>
                <OneLineSummary>
                  {oneLineSummary}
                </OneLineSummary>
              </WrapperTitle>
            </Box>
            <Description>
              <Box>
                {description}
              </Box>
            </Description>
          </>
        )}
      </WrapperCard>
    </Box>
  );
};

export default StrategicDriverDetailCard;