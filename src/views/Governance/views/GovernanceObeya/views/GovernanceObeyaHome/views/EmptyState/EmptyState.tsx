import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ButtonTooltip from '../../components/Tooltip/ButtonTooltip';

import { useStyles } from './EmptyState.styles';

type Props = {
  className?: string;
  message: string;
  buttonText?: string;
  onClickButton?: () => void;
  disabled?: boolean;
};

export const EmptyState = ({
  className, message, buttonText,
  onClickButton, disabled,
}: Props) => {
  const classes = useStyles();

  return (
    <Box className={`${classes.wrapper} ${className}`}>
      <Typography className={classes.messageText}>{message}</Typography>
      {buttonText && (
        <ButtonTooltip text={buttonText.toLowerCase()}>
          <span>
            <Button
              color="primary"
              onClick={onClickButton}
              variant="contained"
              size="medium"
              className={classes.btn}
              disabled={disabled}
              startIcon={
                <AddIcon />
              }
            >
              {buttonText}
            </Button>
          </span>
        </ButtonTooltip>
      )}
    </Box>
  );
};
