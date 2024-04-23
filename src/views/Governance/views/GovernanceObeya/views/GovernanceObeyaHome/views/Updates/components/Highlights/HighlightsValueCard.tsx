import {
  ReactComponent as EmptyProgressSVGCircle,
} from 'assets/images/EmptyProgressCircle.svg';
import AddIcon from '@material-ui/icons/Add';
import { CircularProgress } from './CircularProgress';
import { HighlightsProps } from './Highlights';
import { useStyles } from './styles';

type HighlightsValueCardProps = Pick<
  HighlightsProps,
  'objectivesCount' | 'keyResultsCount' | 'ratingSeries'
> & {
  shouldHideAdd?: boolean;
  titleChart?: string;
  label?: string;
  isLoading?: boolean;
};

export const HighlightsValueCard = ({
  objectivesCount,
  // titleChart,
  label,
  shouldHideAdd,
  ratingSeries,
  isLoading,
}: HighlightsValueCardProps) => {
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
    <div>
      {!isLoading ? (
        <CircularProgress
          series={[0]}
          seriesToCreate={ratingSeries ? Object.values(ratingSeries) : undefined}
          countItems={Number(objectivesCount)}
          label={label}
        >
          {!Number(objectivesCount) && !shouldHideAdd ? (
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
          ) : null}
        </CircularProgress>
      ) : 'Loading...'
      }
    </div>
  );
};
