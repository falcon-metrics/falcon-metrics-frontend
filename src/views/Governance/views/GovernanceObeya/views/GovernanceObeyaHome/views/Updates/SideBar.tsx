import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import ProgressBar from './ProgressBar';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import Outcomes from './Outcomes';
import { useStyles } from './UpdatesContent';
import { useMemo, useState } from 'react';
import SortRoundedIcon from '@material-ui/icons/SortRounded';
import RelationshipsExtendedDisplayVertical from 'components/RelationshipsExtendedDisplayVertical';
import { useObeyaRoom } from 'views/Governance/views/GovernanceObeya/hooks/useObeyaRoom';

const SideBar = () => {
    const classes = useStyles();

    const { data: obeyaData, activeRoom } = useObeyaRoom();
    const { progressBoards: boards, predictiveAnalysis } = obeyaData;

    const confidenceLevel = predictiveAnalysis?.deliveryDateAnalysis?.desiredDeliveryDateConfidenceLevelPercentage;

    const { completed, inProgress, proposed } = useMemo(() => {
        return (obeyaData?.progressBoards || []).reduce((acc, item) => {
            acc.completed = acc.completed + item.completed;
            acc.inProgress = acc.inProgress + item.inProgress;
            acc.proposed = acc.proposed + item.proposed;
            return acc;
        }, { completed: 0, inProgress: 0, proposed: 0 });
    },
        [obeyaData?.progressBoards]
    );

    const total = (completed + inProgress + proposed);
    const completedPercent = completed / total * 100;
    const completedValue = isNaN(completedPercent) ? 0 : completedPercent;

    const progress = {
        remaining: total - completed,
        total,
        monteCarlo: confidenceLevel,
        completed,
        inProgress,
        notStarted: proposed,
        overall: completedValue.toFixed(0)
    };
    const [sortByDesc, setSortByDesc] = useState(true);

    const sortedBoards = [...boards];

    sortedBoards.sort((boardA, boardB) => {
        if (sortByDesc) {
            return boardA.boardName.localeCompare(boardB.boardName);
        } else {
            return boardB.boardName.localeCompare(boardA.boardName);
        }
    });

    return (
        <div>
            {/* Progress */}
            <div className={classes.sidebarSection}>
                <ProgressBar progress={progress} size="large" />
                <Typography className={classes.progressText}>
                    <b>{progress.remaining}</b> out of <b>{progress.total}</b> flow items remaining
                </Typography>
                <Typography className={classes.progressText}>
                    Confidence level for on-time delivery: <b>{progress.monteCarlo}%</b>
                </Typography>
            </div>

            <div className={classes.divider} />

            {/* Boards */}
            <div className={classes.sidebarSection}>
                <Typography className={classes.sectionHeader}>
                    Boards
                    {boards.length > 0 && <IconButton
                        size="small"
                        onClick={() => setSortByDesc(!sortByDesc)}
                        style={{ cursor: 'pointer' }}
                    >
                        <SortRoundedIcon
                            style={{
                                color: sortByDesc ? '#0077C8' : '#D7D7D7',
                                transform: sortByDesc ? 'rotateY(180deg)' : 'rotateX(180deg) rotateY(180deg)'
                            }}
                        />
                    </IconButton>}
                </Typography>

                <div className={classes.scrollableSection}>
                    {boards.length > 0 ? sortedBoards.map((board) => {
                        const total = board.completed + board.inProgress + board.proposed;
                        const completedPercent = Math.ceil((board.completed !== 0 ? board.completed / total : 0) * 100);

                        const boardProgress = {
                            remaining: total - board.completed,
                            total,
                            completed: board.completed,
                            inProgress: board.inProgress,
                            notStarted: board.proposed,
                            overall: completedPercent.toFixed(0)
                        };

                        return (
                            <div key={board.contextId} className={classes.boardsProgress}>
                                <PeopleRoundedIcon fontSize="small" />
                                <Typography className={classes.boardsText}>{board.boardName}</Typography>
                                <ProgressBar progress={boardProgress} />
                            </div>
                        );
                    }) :
                        <Box style={{
                            fontFamily: 'Open Sans',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 25,
                            marginBottom: 25,
                            backgroundColor: '#F6F6F6',
                            padding: 10,
                            fontSize: 14,
                            color: '#AAAEB1'
                        }}> No boards to show</Box>}
                </div>
            </div>

            <div className={classes.divider} />

            {/* Outcomes */}
            <div className={classes.outcomesSection}>
                <Typography className={classes.sectionHeader}>Outcomes</Typography>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                        <Typography className={classes.chartHeader}>Objectives</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography className={classes.chartHeader}>Key Results</Typography>
                    </Grid>
                </Grid>

                <Outcomes />
            </div>

            <div className={classes.divider} />

            <div className={classes.sidebarSection}>
                <RelationshipsExtendedDisplayVertical
                    customLabel={<Typography className={classes.sectionHeader}>Links</Typography>}
                    customStyle={{ general: { width: '100%' } }}
                    elementId={activeRoom?.roomId || ''}
                    elementName={activeRoom?.roomName || ''}
                    elementType="obeyaRoom"
                />
            </div>
        </div>
    );
};

export default SideBar;
