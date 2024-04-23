import Link from '@material-ui/core/Link';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      color: '#1277C5',
    },
  }),
);

function ContactUsLink() {
  const classes = useStyles();
  return (
    <Link
      color="primary"
      className={classes.link}
      href=""
      target="_blank"
    >
      Contact us
    </Link>
  );
}

export default ContactUsLink;
