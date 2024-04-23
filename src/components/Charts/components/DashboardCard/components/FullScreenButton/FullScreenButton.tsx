import Button from '@material-ui/core/Button';
import useStyles from './FullScreenButton.styles';

interface Props {
  openModal: () => void;
}

const FullScreenButton = ({ openModal }: Props) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      onClick={openModal}
      onKeyPress={openModal}
    >
      <img
        src="img/icons/maximise.png"
        srcSet="img/icons/maximise@2x.png 2x,
        img/icons/maximise@3x.png 3x"
        alt="Maximization Icon"
        title="Maximize"
        aria-describedby={'Maximization Icon'}
      />
    </Button>
  );
};

export default FullScreenButton;
