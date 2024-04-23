import { Box, Typography } from "@material-ui/core";
import { PreviewComponentProps } from "components/RelationshipPreviewModal/RelationshipPreviewModal";
import useSWR from 'swr';
import fetch from '../../../../core/api/fetch';
import { Strategy } from "views/Strategies/hooks/useStrategies";
import { Skeleton } from "@material-ui/lab";
import StrategyTitle, { Title, DividerLine } from '../../../../views/NorthStar/views/components/StrategicDriverDetail/components/StrategyTitle/StrategyTitle';
import { findContextAndParentDisplayNamesById, findContextAndParentIds } from "views/BusinessScorecard/utils/utils";
import useDashboardContexts from "views/Dashboard/views/AnalyticsDashboard/hooks/useDashboardContexts";
import { DateTime } from "luxon";
import { daysToIntervalString } from "utils/daysToIntervalString";
import { ValueGrid } from "views/Strategies/views/Objectives/ValueGrid";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { SelectedContextIdContext } from "components/UserStateProvider/UserStateProvider";
import { useContext } from "react";
// import { useHistory } from "react-router-dom";

const fetchStrategyObjective = (url: string) => {
    return fetch.get(`${url}`).then(response => response.data as Strategy);
};

const StrategyObjectivePreview = (props: PreviewComponentProps) => {
    const { data: response, isValidating } = useSWR(
        `/strategies/objective/${props.entityId}`,
        fetchStrategyObjective,
        { revalidateOnFocus: false },
    );
    // const history = useHistory();
    const { setContextId, setSelectedKeys } = useContext(SelectedContextIdContext);
    const { contexts } = useDashboardContexts();
    const endDate = DateTime.fromJSDate(new Date());
    const startDate = response && response.updatedAt
        ? DateTime.fromISO(response.updatedAt) : DateTime.fromJSDate(new Date());
    const { days } = endDate.diff(startDate, ['days']).toObject();
    const diff = daysToIntervalString(days || 0);
    const lastUserWhoDidEdit = response && response.lastUser ? `by ${response.lastUser}` : '';

    const navigateToPage = () => {
        if (response?.contextId && contexts) {
            const contextIds = findContextAndParentIds(response.contextId, contexts);
            if (contextIds) {
                setContextId(contextIds[0]);
                setSelectedKeys(contextIds.reverse());
                // history.push('/vmo/strategies');

                // Use window.open to open the page in a new tab
                const newTab = window.open('', '_blank');
                
                // Check if the newTab object is defined
                if (newTab) {
                    newTab.location.href = '/vmo/strategies';
                } else {
                    console.log('Pop-up blocked. Please allow pop-ups for this site.');
                }
            }
        }
    };

    return (
        <>
            <Box style={{ cursor: 'pointer', display: "flex", alignContent: "center"  }} onClick={navigateToPage}>
                Go to page
                <OpenInNewIcon fontSize="small" />
            </Box>
            <Box style={{ paddingTop: 20 }}>
                {isValidating ?
                    <Skeleton height={400} variant="rect" />
                    : response ?
                        <Box>
                            <Title>
                                {findContextAndParentDisplayNamesById(response.contextId, contexts || []).reverse().join(" | ")}
                            </Title>
                            <DividerLine style={{ marginBottom: 20 }} />
                            <Box style={{ backgroundColor: '#FEFEFE', padding: 30, borderRadius: 16 }}>
                                <StrategyTitle
                                    isLoading={isValidating}
                                    handleOpenModal={() => { console.log("here"); }}
                                    title={`Current Strategy`}
                                    description={response.strategyStatement || ''}
                                    lastEditStatement={response && response.updatedAt ? `Last edit was made ${diff} ago ${lastUserWhoDidEdit}` : ''}
                                    hideReadMore={true}
                                />
                            </Box>
                            <Box style={{ backgroundColor: '#FEFEFE', padding: 30, borderRadius: 16, marginTop: 20 }}>
                                <Title>
                                    Objective
                                </Title>
                                <DividerLine style={{ marginBottom: 20 }} />
                                <ValueGrid
                                    isLoadingOkrs={isValidating}
                                    obeyaRoomId={''}
                                    okrs={response.okrs || []}
                                    setObjective={() => { console.log("set objective called"); }}
                                    openModal={() => { console.log("open modal called"); }}
                                    onAddGoalRequest={() => { console.log("add goal called"); }}
                                    hideActions={true}
                                />
                            </Box>
                        </Box>
                        : <Typography>Data not found</Typography>}
            </Box>
        </>
    );
};

export default StrategyObjectivePreview;