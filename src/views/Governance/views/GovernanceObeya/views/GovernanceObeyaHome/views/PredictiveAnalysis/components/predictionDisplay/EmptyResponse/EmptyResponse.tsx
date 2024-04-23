import { Box } from "@material-ui/core";
import useStyles from "../PredictionDisplay.styles";

interface Props {
    message?: string;
}

export const EmptyResponse = ({message}:Props)=>{
    const classes = useStyles();
    return <Box className={`${classes.container} ${classes.emptyMessage}`}>
        {message}
    </Box>
}