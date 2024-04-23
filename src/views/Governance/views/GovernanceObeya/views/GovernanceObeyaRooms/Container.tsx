import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiContainer, { ContainerProps } from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      flexGrow: 1,
      height: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Open Sans',
    },
    section: {
      width: '100%',
      padding: theme.spacing(4),
    },
    grid: {
      height: '350px',
    },
    title: {
      fontFamily: 'Open Sans',
      fontSize: 36,
      fontWeight: 700,
    },
    subtitle: {
      fontFamily: 'Open Sans',
    },
    description: {
      fontSize: 20,
      fontFamily: 'Open Sans',
    },
    tinyIntroText: {
      fontSize: 14,
    },
  }),
);

type Props = ContainerProps & {
  title?: string;
  subtitle?: string;
  description?: string | React.ReactNode;
  secondDescription?: string;
  intro?: string;
  userGuide?: React.ReactNode;
  isCustomDescription?: boolean;
  shouldHideNavigation?: boolean;
};

const Container = ({ title, children, ...props }: Props) => {
  const classes = useStyles();
  return (
    <MuiContainer
      component="main"
      maxWidth="md"
      className={classes.main}
      {...props}
    >
      <Box mt={4}>
        {title && (
          <Typography
            paragraph
            variant="h1"
            align="center"
            className={classes.title}
          >
            {title}
          </Typography>
        )}
      </Box>
      <Paper component="section" className={classes.section}>
        {children}
      </Paper>
    </MuiContainer>
  );
};

export default Container;
