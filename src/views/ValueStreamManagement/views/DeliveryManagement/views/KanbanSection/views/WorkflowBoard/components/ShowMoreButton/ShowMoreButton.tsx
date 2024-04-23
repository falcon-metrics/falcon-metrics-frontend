import { Box, Button, CircularProgress } from '@material-ui/core';

import { useStyles } from './ShowMoreButton.styles';

export interface Props {
  isLoadingMore: boolean;
  onLoadMore: () => void;
}

const ShowMoreButton = ({
  isLoadingMore,
  onLoadMore,
}: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.showMoreContainer}>
      <Button
        className={classes.showMoreButton}
        color="primary"
        variant="outlined"
        onClick={() => onLoadMore?.()}
        endIcon={isLoadingMore ? <CircularProgress size={18} /> : null}
      >
        Show more
      </Button>
    </Box>
  );
}

export default ShowMoreButton;
