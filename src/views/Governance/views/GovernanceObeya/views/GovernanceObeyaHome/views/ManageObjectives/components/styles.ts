import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    grid: {
      height: '350px',
      overflow: 'hidden'
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      overflow: 'hidden'
    },
    checkboxAchieved: {
      marginTop: 0,
    },
    achievedObjectives: {
      paddingBottom: 4,
      marginTop: 4,
      position: 'relative',
    },
    achievedText: {
      position: 'absolute',
      top: 0,
      fontFamily: 'Open Sans',
      marginLeft: -2,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
      fontFamily: 'Open Sans',
    },
    typographySm: {
      color: 'rgba(0, 0, 0, 0.7)',
      fontSize: 14,
      fontFamily: 'Open Sans',
      fontWeight: 'bold',
    },
    typographyMd: {
      fontSize: 16,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      cursor: 'pointer',
      maxHeight: 350,
      overflow: 'auto',
    },
    buttons: {
      paddingTop: theme.spacing(2),
    },
    button: {
      padding: theme.spacing(1),
    },
    saveButton: {
      marginRight: 10,
      paddingLeft: 30,
      paddingRight: 30,
    },
    wrapper: {
      position: 'relative',
      overflow: 'hidden'
    },
    spacingRight: {
      paddingRight: 4,
    },
  }),
);

export default useStyles;


export const useParentWorkItemStyles = makeStyles((theme) => ({
  autoComplete: {
    position: "relative",
    width: "100%",
    paddingRight: 4,
    paddingBottom: "0px !important",
  },
  includeChildren: {
    display: "inline-flex",
    alignItems: "center",
    marginRight: 4,
    fontFamily: "Open Sans",
  },
  krTextLabel: {
    fontFamily: "Open Sans",
    marginLeft: 4,
  },
  checkboxIncludeChildren: {
    padding: 0,
    color: "#757575",
  },
  descriptionInput: {
    fontFamily: "Open Sans",
    marginTop: 2,
    paddingRight: 4,
  },
  autoCompleteTextField: {
    marginTop: 0,
    marginLeft: 2,
    paddingBottom: "0px !important",
  },
  ratings: {
    width: "100%",
    fontFamily: "Open Sans",
  },
  parentWorkItemLoad: {
    position: "absolute",
    top: 4,
    right: 26,
  },
  arrow: {
    position: "absolute",
    right: 2,
    width: 14,
    height: 14,
  },
  workItemText: {
    fontWeight: "bold",
    fontSize: 13,
    width: 90,
    fontFamily: "Open Sans",
  },
  paper: {
    width: "68vh",
    height: 240,
    overflowY: "hidden",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 6,
    padding: "40px 38px 60px 42px",
    outline: 0,
    "&:focus": {
      outline: 0,
    },
    overflow: "auto",
  },
  tooltip: {
    fontSize: 14,
  },
  parentWorkItemInput: {
    width: 311,
    marginLeft: 5,
    height: 29,
    border: 0,
    borderBottom: "1px solid #949494",
    fontFamily: "Open Sans",
    fontsize: 15,
    outline: "none",
    "&:focus": {
      outline: "none",
    },
  },
}));
