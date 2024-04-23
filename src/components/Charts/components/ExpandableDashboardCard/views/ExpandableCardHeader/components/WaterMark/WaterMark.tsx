import useStyles from './WaterMark.styles';

const WaterMark = ({ text }: { text: string }): JSX.Element => {
  const classes = useStyles();
  return (
    <span data-cy="watermark" className={classes.text}>
      {text}
    </span>
  );
};

export default WaterMark;
