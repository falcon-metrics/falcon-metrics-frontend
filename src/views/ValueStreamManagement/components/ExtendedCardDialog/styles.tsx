import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: "flex",
      justifyContent: "space-between",
      padding: 0,
      margin: 0,
      width: "100%",
      backgroundColor: "#fbfbfb",
    },
    modalIcon: {
      color: "#707070",
      fontSize: 16,
      fontFamily: "Open Sans",
      paddingLeft: 3,
    },
    modalTitle: {
      display: "flex",
      alignItems: "center",
      fontSize: 18,
      fontFamily: "Open Sans",
    },
    modalContent: {
      padding: 0,
      margin: 0,
      overflowX: "hidden",
      overflowY: "auto",

      "&::-webkit-scrollbar": {
        width: "0.7em",
        backgroundColor: "#f0f0f0",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#d1d2d3",
        borderRadius: "10px",
      },
    },
    closeButton: {
      padding: 5,
      position: "absolute",
      top: 5,
      right: 5,
    },
    closeIcon: {
      color: theme.palette.grey[500],
      fontSize: 22,
      fontFamily: "Open Sans",
    },
    expandIcon: {
      padding: 1,
    },
    noValueIcon: {
      color: "#707070",
      fontSize: 18,
      fontFamily: "Open Sans",
    },
    card: {
      // height: "auto",
      padding: 20,
      margin: 10,
      boxShadow: "0px 2px 3px 0px #e2e2e2",
      borderRadius: 10,
      backgroundColor: "#f0f0f0",
    },
    cardTitle: {
      fontSize: 12,
      fontFamily: "Open Sans",
      textTransform: "uppercase",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: 600,
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      paddingTop: 15,
    },
    cardFields: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 12,
      fontFamily: "Open Sans",
      alignItems: "center",
      paddingBottom: 8,
    },
    tabContainer: {
      height: 220,
      overflowY: "auto",
      marginTop: 5,
      bottom: 0,
    },
    tabTitles: {
      paddingLeft: 0,
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: 12,
      fontFamily: "Open Sans",
      fontWeight: 600,
    },
    tabCells: {
      paddingLeft: 0,
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: 12,
      fontFamily: "Open Sans",
      borderColor: "#f0f0f0",
    },
    tabCellArrow: {
      paddingLeft: 0,
      paddingTop: 10,
      paddingBottom: 10,
      width: 40,
      borderColor: "#f0f0f0",
    },
    skeleton: {
      height: 15,
      borderRadius: 5,
    },
    skeletonTabs: {
      paddingLeft: 0,
      paddingTop: 10,
      paddingBottom: 10,
    },
  })
);
