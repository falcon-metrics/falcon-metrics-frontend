import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles(() =>
    createStyles({
        gridBox: {
            paddingTop: '15px'
        },
        button: {
            width: '120px',
            height: '39px'
        },
        formBox: {
            // padding: '20px 20px 20px 20px'
            paddingBottom: '30px',
            paddingLeft: '40px',
            paddingRight: '40px',
        }
    }),
);