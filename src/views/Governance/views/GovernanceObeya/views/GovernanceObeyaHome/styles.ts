import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() => ({
  navigation: {
    display: "flex",
    flexDirection: "column",
  },
  obeyaFabButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    height: 35,
    borderRadius: 8,
  },
  noObeyaRooms: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    rowGap: "3em",
  },
  obeyaRoomsBtnText: {
    fontFamily: "Open Sans",
    fontSize: 14,
    paddingLeft: 4,
    paddingRight: 4,
    textTransform: "capitalize",
  },
  obeyaRoomsIcon: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "bold",
  },
  footerToBottom: {
    bottom: 0,
    position: "absolute",
    width: "100%",
  },
  fitnessCriteriaContainer: {
    backgroundColor: "#fbfbfb",
    overflow: "auto",
    display: "flex",
  },
  backToLink: {
    display: "flex",
    alignItems: "center",
    color: "#585858",
    fontSize: 14,
    fontWeight: "lighter",
    fontFamily: "Open Sans",
    "&:visited": {
      textDecoration: "none",
    },
    "&:link": {
      textDecoration: "none",
    },
    "&:hover": {
      textDecoration: "underline",
    },
    margin: 30,
  },
  obeyaTitle: {
    marginLeft: 30,
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Open Sans",
    color: "#2B353B",
    marginBottom: 20
  },
}));
