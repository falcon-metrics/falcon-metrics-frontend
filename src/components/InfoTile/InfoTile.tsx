import Typography from '@material-ui/core/Typography';
import CountUp from 'react-countup';
import { formatForDisplay } from './utils/formatForDisplay';
import {
  useStyles,
  Container,
  Unit,
  Label,
  TooltipContainer,
} from './InfoTile.styles';
import BaseTooltip from 'components/UI/FluentUI/InfoIconWithTooltip';
import { CSSProperties } from 'react';

export type Props = {
  value: number | string | undefined;
  unit?: string;
  label: string;
  valueStyles?: CSSProperties;
  color?: string;
  tooltip?: string;
};

function InfoTile({ value, unit, label, valueStyles, color, tooltip }: Props) {
  const classes = useStyles();
  const formatedValue = formatForDisplay(value);

  const valueNode =
    typeof formatedValue === 'string' ? (
      <Typography className={classes.text} style={valueStyles}>
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
    <Container>
      {!!tooltip && (
        <TooltipContainer>
          <BaseTooltip customContent={tooltip} />
        </TooltipContainer>
      )}
      <Typography style={{ color }}>{valueNode}</Typography>
      {!!unit && <Unit>{unit}</Unit>}
      <Label>{label}</Label>
    </Container>
  );
}

export default InfoTile;
