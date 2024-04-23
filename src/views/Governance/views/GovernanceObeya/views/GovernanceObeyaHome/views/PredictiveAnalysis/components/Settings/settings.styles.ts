import { makeStyles } from "@material-ui/core/styles";

export const scrollbarStyle = {
  "&::-webkit-scrollbar": {
    borderRadius: "10px",
    height: "10px",
    width: "10px",
    backgroundColor: "#F7F7F7",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "20px",
    backgroundColor: "#D1D2D3",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    borderRadius: "20px",
  },
};

const useSettingsStyles = makeStyles({
  settingDataContainer: {
    display: "flex",
    width: "100%",
    marginBottom: "1.5em",
    flexDirection: "column",
  },
  settingPanelContainer: {
    width: "99%",
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
    justifyContent: "space-around",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "7%",
  },
  settingContainer: {
    paddingLeft: "2em",
    width: "100%",
  },
  settingSection: {
    display: "flex",
    width: "100%",
    marginBottom: "1.5em",
    flexDirection: "column",
  },
  teamFocusRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "95%",
    minHeight: 50,
    marginBottom: "0.5em",
    position: "relative",
  },
  teamFocusFirstRow: {
    marginTop: 20,
  },
  teamFocusRowDisplay: {
    // flexDirection: "column",
    // alignContent: "flex-start",
    paddingLeft: 18,
    width: "100%",
    overflowY: "auto",
    maxHeight: 210,
    minHeight: 210,
    ...scrollbarStyle,
  },
  teamFocusTextContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamFocusSliderContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    overflow: "none"
  },
  heading1: {
    fontSize: "14px!important ",
  },
  heading: {
    height: "20px",
    fontSize: "12px",
    marginBottom: "0.5em",
    fontFamily: "Open Sans",
    fontWeight: 600,
    marginTop: "0.5em",
  },
  helperText: {
    display: "flex",
    flexDirection: "row",
    fontSize: "10px",
    marginBottom: "0.5em",
    fontFamily: "Open Sans",
    textAlign: "right",
    marginRight: 48,
  },
  focusLevels: {
    width: "95%",
    display: "flex",
    marginLeft: "-10%",
    fontSize: "small",
  },
  focusLevel: {
    width: "17.7%",
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
  },
  formControl: {
    width: "100%",
    marginLeft: "-10%",
  },
});

export default useSettingsStyles;
