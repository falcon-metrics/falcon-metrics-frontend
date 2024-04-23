import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "relative",
      borderRadius: "16px",
      padding: "20px",
      boxShadow: "0px 2px 11px 0px #dcdcdc",
      minHeight: 268,
      backgroundColor: "#FEFEFE"
    },
    cardTitle: {
      fontSize: 18,
      fontFamily: "Open Sans",
      color: "#32383E",
      // Adding width to break long titles to 2 lines
      width: '95%'
    },
  })
);
