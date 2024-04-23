import { lazy, Suspense } from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useHistory } from 'react-router-dom';

import { useStyles } from './StrategicDriverCard.styles';

export const Title = styled(Box)({
  color: '#fff',
  marginTop: 18,
  fontSize: 26,
  fontWeight: 'bold',
  fontFamily: 'Open sans',
  height: 75,
  // https://stackoverflow.com/a/13924997
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  lineClamp: 2,
  WebkitBoxOrient: 'vertical'
});

export const Description = styled(Box)({
  height: 118,
  color: '#fff',
  fontSize: 16,
  fontFamily: 'Open sans',
  marginTop: 10,
  fontWeight: 'bold',
  // https://stackoverflow.com/a/13924997
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 5,
  lineClamp: 5,
  WebkitBoxOrient: 'vertical'
});

export const CardIcon = styled(Box)({
  color: '#fff',
  '& svg': {
    fontSize: 55,
  },
});

export const WrapperCardBase = styled(Box)({
  width: 400,
  height: 322,
  background: '#fcfcfc',
  fontSize: 14,
  fontFamily: 'Open Sans',
  borderRadius: 10,
  padding: 10,
  boxShadow: '0px 2px 11px 0px #dcdcdc',
  position: 'relative',
  color: '#fff',
});

export const BlueWrapperCard = styled(WrapperCardBase)({
  background: '#04548a',
});

type Props = {
  title?: string;
  colour?: string;
  iconName?: string;
  uuid?: string;
  visionId?: string | number;
  strategicDriverItem: any;
  vision?: any;
  oneLineSummary?: string;
};

export const StrategicDriverCard = ({
  title, colour, iconName,
  uuid,
  oneLineSummary,
}: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const Icon = iconName ? lazy(
    () => import(`@material-ui/icons/${iconName}Outlined`)
  ) : AssignmentIcon;

  const redirectToDetail = () => {
    history.push(`/vmo/strategic-driver/${uuid}`);
  };

  return (
    <Box onClick={redirectToDetail}>
      <WrapperCardBase style={{ background: colour ?? '#04548a', cursor: 'pointer' }}>
        <Box className={classes.wrapperContent} style={{ minHeight: 150 }}>
          <CardIcon>
            <Suspense fallback="-">
              <Icon />
            </Suspense>
          </CardIcon>
          <Title>
            {title}
          </Title>
          <Description>
            {oneLineSummary}
          </Description>
        </Box>
      </WrapperCardBase>
    </Box>
  );
};
