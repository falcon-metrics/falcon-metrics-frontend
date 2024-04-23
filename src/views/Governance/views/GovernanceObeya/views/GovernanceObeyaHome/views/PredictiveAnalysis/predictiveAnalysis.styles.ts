import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    zeroStateContainer: {
      minHeight: 600,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    customClass: {
      width: 931,
      height: 761,
    },
    dependencyContainer: {
      minHeight: 400,
    },
    SelectionBar: {
      display: "flex",
      marginBottom: "3em",
      marginTop: "2em",
      borderBottom: "1px solid #E0E0E0",
      fontSize: "16px",
      marginLeft: "1em",
      fontFamily: "Open Sans",
    },
    AnalysisContainer: {
      display: "flex",
      alignItems: 'center',
    },
    HistogramContainer: {
      width: "45%",
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '1em'
    },
    dividerContainer: {
        width: '2%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    smallDivider: {
        height: 120,
        width: '2px'
    },
    tallDivider: {
        height: 300,
        width: '2px'
    },
    analysisDisplay: {
      width: '50%'
    },
    settingsContainer: {
      width: '100%',
      display: 'flex',
    },

  }));

  export default useStyles;