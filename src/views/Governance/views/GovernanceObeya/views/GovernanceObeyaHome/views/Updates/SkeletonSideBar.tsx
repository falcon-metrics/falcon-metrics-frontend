import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export const useStyles = makeStyles(theme => ({
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: "#fefefe",
    },
    progress: {
        borderRadius: 20,
        marginTop: 5,
        marginBottom: 12,
        width: "100%",
        height: 25
    },
    progressText: {
        height: 20,
        borderRadius: 6,
        marginTop: 5,
        marginBottom: 12,
        width: "70%"
    },
    sectionHeader: {
        height: 22,
        borderRadius: 6,
        marginTop: 5,
        marginBottom: 12,
        width: "60%"
    },
    boardsProgress: {
        display: "flex",
        flexDirection: 'row',
    },
    boardsText: {
        height: 20,
        borderRadius: 6,
        marginTop: 5,
        marginBottom: 12,
    },
    divider: {
        display: "flex",
        flexGrow: 1,
        border: "1px solid #e8e8e8",
        height: "1px",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },

    donutChartContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '10vw',
        height: '10vw',
        marginLeft: "30%",
        marginTop: 45
    },
}));

const SkeletonSideBar = () => {
    const classes = useStyles();

    return (
        <div>
            {/* Progress */}
            <div className={classes.sidebar}>
                <Skeleton className={classes.progress} variant="rect" />
                <Skeleton className={classes.progressText} variant="rect" />
                <Skeleton className={classes.progressText} variant="rect" />
            </div>

            <div className={classes.divider} />

            {/* Boards */}
            <div className={classes.sidebar}>
                <Skeleton className={classes.sectionHeader} variant="rect" />
                <div>
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className={classes.boardsProgress}>
                            <Skeleton width={"40%"} className={classes.boardsText} variant="rect" />
                            &nbsp;&nbsp;&nbsp;
                            <Skeleton width={"70%"} style={{ borderRadius: 15 }} className={classes.boardsText} variant="rect" />
                        </div>
                    ))}
                </div>
            </div>

            <div className={classes.divider} />

            {/* Outcomes */}
            <div className={classes.sidebar}>
                <Skeleton className={classes.sectionHeader} variant="rect" />
                <div className={classes.donutChartContainer}>
                    <Skeleton
                        variant="circle"
                        style={{ width: '100%', height: '100%', border: "17px solid silver", backgroundColor: "transparent" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SkeletonSideBar;
