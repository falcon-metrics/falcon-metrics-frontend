import Button from '@material-ui/core/Button';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import useMediaQuery from '@material-ui/core/useMediaQuery';

type Help = {
  onClick(): void;
  top?: number;
  right?: number;
  mediaQuery?: number;
  mediaTop?: number;
};

const HelpButton = ({ onClick, top, right, mediaQuery, mediaTop }: Help) => {
  const matches = useMediaQuery(`(max-width: ${mediaQuery || 1400}px)`);

  return (
    <Button
      variant="contained"
      color="primary"
      type="button"
      className="helpButton"
      style={{
        width: 20,
        paddingLeft: 2,
        paddingRight: 2,
        position: 'absolute',
        right: !matches ? right || -96 : -30,
        top: !matches ? top || -16 : mediaTop || -28,
      }}
      onClick={onClick}
      title="User Guide"
    >
      <HelpOutlineIcon />
    </Button>
  );
};

export default HelpButton;
