import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  modal: {
    width: "80%",
    maxHeight: "80vh",
  },
  sidePanel: {
    backgroundColor: "#FCFCFC",
    overflowY: "auto",
    position: "fixed",
    width: 330
  },
  listItem: {
    fontFamily: "Open Sans",
    cursor: "pointer",
  },
  listItemText: {
    fontFamily: "Open Sans",
    color: "#323130",
  },
  contentPanel: {
    paddingLeft: theme.spacing(1),
    justifyContent: "center",
    overflowY: "auto",
    marginLeft: 335,
    width: "auto"
  },
  // previewPanel: {
  //   display: "grid",
  //   gap: theme.spacing(1),
  //   marginBottom: theme.spacing(5),
  //   marginTop: theme.spacing(1),
  // },
  // previewCard: {
  //   // display: "flex",
  //   marginBottom: theme.spacing(2),
  //   flexDirection: "row",
  //   alignItems: "center",
  //   alignContent: "center",
  // },
  previewPanel: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(3),
    marginBottom: theme.spacing(8),
    marginTop: theme.spacing(1),
  },
  previewCard: {
    cursor: "pointer",
    position: "relative",
    marginBottom: theme.spacing(1),
    minWidth: "240px",
    flex: "0 0 auto"
  },
  radioLabel: {
    marginTop: "auto",
    textAlign: "center",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 25,
    background: "#fcfcfc",
    paddingTop: 10,
    width: "96%"
  },
  radio: {
    marginLeft: 30,
  },
  previewTitle: {
    fontFamily: "Open Sans",
    fontSize: 18,
    fontWeight: 600,
    color: "#323130",
  },
  previewDescription: {
    fontFamily: "Open Sans",
  },
  selected: {
    fontFamily: "Open Sans",
  }
}));
