import {
  ReactComponent as EmptyProgressSVGCircle,
} from 'assets/images/EmptyProgressCircle.svg';
import InfoTile from 'components/UI/InfoTile';

import {
  Box,
  Grid,
  styled,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { defaultRatingSeriesValues } from './';
import { CircularProgress } from './CircularProgress';
import { HighlightsProps } from './Highlights';
import { useStyles } from './styles';

const MilesTonesContainer = styled(Box)({
  margin: '0 auto',
  height: 80,
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
});

type HighlightsValueCardProps = Pick<
  HighlightsProps,
  'objectivesCount' | 'keyResultsCount' | 'ratingSeries'
>;

export const HighlightsValueCard = ({
  objectivesCount,
  keyResultsCount,
  ratingSeries,
}: HighlightsValueCardProps) => {
  const keyResultsLabel = `Key result${keyResultsCount === 1 ? '' : 's'}`;
  const classes = useStyles();

  const openObjectiveModal = () => {
    const el: HTMLElement | null = document.querySelector(
      '.objective-modal-button',
    );
    if (el) {
      el?.click();
    }
  };

  return (
    <Grid container direction="row" alignItems="center" justifyContent="center">
      <Grid item xs={7} style={{ overflow: 'hidden' }}>
        <Box display="flex" justifyContent="center">
          <CircularProgress
            series={
              ratingSeries
                ? Object.values(ratingSeries)
                : defaultRatingSeriesValues
            }
            countItems={Number(objectivesCount)}
          >
            {!Number(objectivesCount) && (
              <>
                <EmptyProgressSVGCircle
                  className={classes.emptyProgressSVGCircle}
                />
                <button
                  className={classes.addObjectiveBtn}
                  onClick={openObjectiveModal}
                >
                  <AddIcon /> Add Objective
                </button>
              </>
            )}
          </CircularProgress>
        </Box>
      </Grid>
      <Grid
        item
        xs={4}
        style={{
          height: '64%',
        }}
      >
        <MilesTonesContainer>
          <InfoTile
            key={keyResultsLabel}
            value={`${keyResultsCount}`}
            label={keyResultsLabel}
            containerStyles={{
              padding: '0.8rem 1rem',
              minWidth: 100,
            }}
            valueStyles={{
              color: '#787470',
              fontSize: 24,
              fontWeight: 'normal',
            }}
            labelStyles={{
              fontSize: 12,
              marginTop: '0.8rem',
              color: '#707070',
            }}
          />
        </MilesTonesContainer>
      </Grid>
    </Grid>
  );
};
