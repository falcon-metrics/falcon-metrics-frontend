import Typography from '@material-ui/core/Typography';
import useStyles from './Title.styles';

type Props = {
  content: string;
};

const Title = ({ content }: Props) => {
  const classes = useStyles();

  return <Typography className={classes.title}>{content}</Typography>;
};

export default Title;
