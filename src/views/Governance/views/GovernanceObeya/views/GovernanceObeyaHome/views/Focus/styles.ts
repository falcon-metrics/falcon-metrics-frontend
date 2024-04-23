import { createStyles, makeStyles } from "@material-ui/core";

export const scrollbarStyle = {
    "&::-webkit-scrollbar": {
        borderRadius: "10px",
        height: "10px",
        width: "10px",
        backgroundColor: "#F7F7F7"
    },
    "&::-webkit-scrollbar-thumb": {
        borderRadius: "20px",
        backgroundColor: "#D1D2D3",
    },
    "&::-webkit-scrollbar-thumb:hover": {
        borderRadius: "20px",
    },
};

export const useStyles = makeStyles((theme) =>
    createStyles({
        boardName: {
            color: '#707070',
            fontFamily: "Open Sans",
            fontSize: 14,
            padding: theme.spacing(3),
            paddingBottom: 0,
            paddingTop: 0
        },
        boardContainer: {
            overflow: 'auto',
            maxHeight: 380,
            margin: theme.spacing(2),
            ...scrollbarStyle
        },
        completedText: {
            color: '#00bfb2',
            fontFamily: 'Open Sans',
        },
        completedTextContainer: {
            fontSize: 14,
            fontFamily: 'Open Sans',
            fontWeight: 'bold',
            color: '#949191',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            marginTop: theme.spacing(2),
        },
        progressBarContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
        },
        wrapperIndicators: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 14,
            fontFamily: 'Open Sans',
        },
        wrapperSearch: {
            marginRight: 14,
            marginTop: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 35,
        },
    }),
);
