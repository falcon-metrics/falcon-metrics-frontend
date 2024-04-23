import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(() => ({
    contentContainer: {
        height: 154,
        width: 240,
        overflow: 'hidden',
      },
      relativeContainer: {
        position: 'relative',
      },
      buttonContainer: {
        position: 'absolute',
        right: 0,
        top: 5,
        zIndex: 1,
      },
      modalBody: {
        padding: 10,
        width: "99%"
      }
    }));