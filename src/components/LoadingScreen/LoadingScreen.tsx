import { styled } from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import useStyles from "./LoadingScreen.styles";

const Main = styled("main")({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const LoadingScreen = () => {
  const classes = useStyles();
  return (
    <Main>
      {/* Insert your logo here */}
      <LinearProgress className={classes.progress} />
    </Main>
  );
};

export default LoadingScreen;
