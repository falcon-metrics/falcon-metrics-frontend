import {
  Box,
  createStyles,
  makeStyles,
  styled,
  Typography,
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';
import round from 'lodash/round';
import CountUp from 'react-countup';

const useStyles = makeStyles(() =>
  createStyles({
    value: {
      fontSize: 50,
      fontWeight: 'bold',
    },
  }),
);

const Container = styled(Box)({
  backgroundColor: 'rgba(229, 226, 226, 0.4)',
  borderBottom: '4px #41b6e6 solid',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: 120,
  padding: '1rem',
  borderRadius: '4px 4px 0 0',
  '& > *': {
    fontFamily: 'Open Sans',
  },
});

const Unit = styled(Typography)({
  fontSize: 11,
});

const Label = styled(Typography)({
  fontSize: 16,
  marginTop: '1rem',
});

const formatForDisplay = (value?: number | string) => {
  if (typeof value === 'string') {
    return value;
  }
  return value === undefined ? '-' : round(value);
};

export type Props = {
  value: number | string | undefined;
  unit?: string;
  label: string;
  valueStyles?: CSSProperties;
  labelStyles?: CSSProperties;
  containerStyles?: CSSProperties;
};

function InfoTile({
  value,
  unit,
  label,
  valueStyles,
  labelStyles,
  containerStyles,
}: Props) {
  const classes = useStyles();
  const formatedValue = formatForDisplay(value);

  const valueNode =
    typeof formatedValue === 'string' ? (
      <Typography className={classes.value} style={valueStyles}>
        {formatedValue}
      </Typography>
    ) : (
      <CountUp
        className={classes.value}
        style={valueStyles}
        end={formatedValue}
        duration={1}
      />
    );

  return (
    <Container style={containerStyles}>
      {valueNode}
      {!!unit && <Unit>{unit}</Unit>}
      <Label style={labelStyles || {}}>{label}</Label>
    </Container>
  );
}

export default InfoTile;
