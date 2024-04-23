import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BugReportIcon from '@material-ui/icons/BugReport';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleIcon from '@material-ui/icons/People';

const colors = {
  feature: '#15d0ca',
  bug: '#ef5136',
  task: '#e7b25e',
  management: '#0075c9',
};

const font = 'Open Sans';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      width: 190,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      borderRadius: 4,
      cursor: 'pointer',
    },
    cardContainer: {
      width: 128,
      padding: 6,
      display: 'inline-flex',
      justifyContent: 'flex-start',
      jutifyContent: 'center',
    },
    cardTitle: {
      fontFamily: font,
      fontSize: 14,
      fontWeight: 'bold',
    },
    cardDescription: {
      fontFamily: font,
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 10,
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 4,
    },
    featureIcon: { backgroundColor: colors.feature },
    featureTheme: {
      color: colors.feature,
      border: `1px solid ${colors.feature}`,
    },
    bugIcon: { backgroundColor: colors.bug },
    bugTheme: {
      color: colors.bug,
      border: `1px solid ${colors.bug}`,
    },
    taskIcon: { backgroundColor: colors.task },
    taskTheme: {
      color: colors.task,
      border: `1px solid ${colors.task}`,
    },
    managementIcon: { backgroundColor: colors.management },
    managementTheme: {
      color: colors.management,
      border: `1px solid ${colors.management}`,
    },
    icon: {
      width: 38,
      height: 38,
      color: '#fff',
    },
  }),
);

interface Props {
  type?: string;
  title?: string;
  description?: string;
}

const icons = {
  feature: <AssignmentIcon />,
  bug: <BugReportIcon />,
  task: <ListAltIcon />,
  management: <PeopleIcon />,
};

// type = 'feature'
// type = 'bug'
// type = 'management',
// type = 'task'
const BacklogCard = ({ type = 'bug', title, description }: Props) => {
  const classes = useStyles();
  return (
    <Box className={`${classes.card} ${classes[`${type}Theme`]}`}>
      <Box
        display="inline-flex"
        flexDirection="column"
        className={classes.cardContainer}
      >
        <Typography className={classes.cardTitle} noWrap>
          {title}
        </Typography>
        <Typography className={classes.cardDescription} noWrap>
          {description}
        </Typography>
      </Box>
      <Box display="inline-flex" className={classes.iconContainer}>
        <Avatar className={`${classes.icon} ${classes[`${type}Icon`]}`}>
          {icons?.[type]}
        </Avatar>
      </Box>
    </Box>
  );
};

export default BacklogCard;
