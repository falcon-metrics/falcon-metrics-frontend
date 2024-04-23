import { Box } from "@material-ui/core";
import fetch from '../../../../core/api/fetch';
import useSWR from 'swr';
import { PreviewComponentProps } from "components/RelationshipPreviewModal/RelationshipPreviewModal";
import StrategyTitle from "views/NorthStar/views/components/StrategicDriverDetail/components/StrategyTitle";
import { Title, DividerLine } from '../../../../views/NorthStar/views/components/StrategicDriverDetail/components/StrategyTitle/StrategyTitle';
import useDashboardContexts from "views/Dashboard/views/AnalyticsDashboard/hooks/useDashboardContexts";
import { findContextAndParentDisplayNamesById, findContextAndParentIds } from "views/BusinessScorecard/utils/utils";
import { DateTime } from "luxon";
import { daysToIntervalString } from "utils/daysToIntervalString";
import { useHorizons } from "views/Strategies/hooks/useHorizons";
import { Strategy } from "views/Strategies/hooks/useStrategies";
import { CircularProgress } from "./components/CircularProgress/CircularProgress";
import _ from "lodash";
import { Skeleton } from "@material-ui/lab";
import { SelectedContextIdContext } from "components/UserStateProvider/UserStateProvider";
import { useContext } from "react";
// import { useHistory } from "react-router-dom";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const fetchStrategy = (url: string) => {
    return fetch.get(`${url}`).then((result) => result.data && result.data[0] ? result.data[0] as Strategy : undefined);
};
const StrategyPreview = (props: PreviewComponentProps) => {
    // const history = useHistory();
    const { setContextId, setSelectedKeys } = useContext(SelectedContextIdContext);
    const { data: response, isValidating } = useSWR(
        `strategies/${props.entityId}`,
        fetchStrategy,
        { revalidateOnFocus: false },
    );
    const { data: horizons } = useHorizons();
    const { contexts } = useDashboardContexts();
    let diff = '';
    let lastUserWhoDidEdit = '';
    let horizonSeries: any[] = [];
    let horizonDaysLeft = 0;
    let completedObjectives = 0;
    let totalObjectives = 0;
    let objectivesSeries: any[] = [];
    let completedKeyResults = 0;
    let totalKeyResults = 0;
    let keyResultSeries: any[] = [];
    if (response) {
        const endDate = DateTime.fromJSDate(new Date());
        const startDate = response.updatedAt
            ? DateTime.fromISO(response.updatedAt) : DateTime.fromJSDate(new Date());
        const { days } = endDate.diff(startDate, ['days']).toObject();
        diff = daysToIntervalString(days || 0);
        lastUserWhoDidEdit = response.lastUser ? `by ${response.lastUser}` : '';
        if (horizons) {
            horizonDaysLeft = Math.ceil(DateTime.fromISO(horizons.find(i => i.id === response.horizonId)?.endDate.toString() || DateTime.now().toISO()).diff(DateTime.now(), 'days').days);
            horizonDaysLeft = horizonDaysLeft < 0 ? 0 : horizonDaysLeft;
            let totalDays = Math.ceil(DateTime.fromISO(horizons.find(i => i.id === response.horizonId)?.endDate.toString() || DateTime.now().toISO()).diff(
                DateTime.fromISO(horizons.find(i => i.id === response.horizonId)?.startDate.toString() || DateTime.now().toISO()), 'days').days);
            totalDays = totalDays < 0 ? 0 : totalDays;
            let donePercentage = Math.ceil(((totalDays - horizonDaysLeft) * 100) / totalDays);
            donePercentage = isNaN(donePercentage) ? 0 : donePercentage;
            const remainingPercentage = 100 - donePercentage;
            horizonSeries = [
                {
                    "values": [donePercentage],
                    "color": "#009CDE",
                    "backgroundColor": "#009CDE"
                },
                {
                    "values": [remainingPercentage],
                    "color": "#CCEBF8",
                    "backgroundColor": "#CCEBF8"
                }
            ];
        }
        completedObjectives = response.okrs.filter(i => i.achieved).length;
        totalObjectives = response.okrs.length;
        let objectiveDonePercentage = Math.ceil((completedObjectives * 100) / totalObjectives);
        objectiveDonePercentage = isNaN(objectiveDonePercentage) ? 0 : objectiveDonePercentage;
        objectivesSeries = [
            {
                "values": [objectiveDonePercentage],
                "color": "#009CDE",
                "backgroundColor": "#009CDE"
            },
            {
                "values": [100 - objectiveDonePercentage],
                "color": "#CCEBF8",
                "backgroundColor": "#CCEBF8"
            }
        ];

        totalKeyResults = _.flatten(response.okrs.map(i => i.keyResults)).length;
        completedKeyResults = _.flatten(response.okrs.map(i => i.keyResults)).filter(x => x?.completed).length;
        let keyResultDonePercentage = Math.ceil((completedKeyResults * 100) / totalKeyResults);
        keyResultDonePercentage = isNaN(keyResultDonePercentage) ? 0 : keyResultDonePercentage;
        keyResultSeries = [
            {
                "values": [keyResultDonePercentage],
                "color": "#009CDE",
                "backgroundColor": "#009CDE"
            },
            {
                "values": [100 - keyResultDonePercentage],
                "color": "#CCEBF8",
                "backgroundColor": "#CCEBF8"
            }
        ];
    }

    const navigateToPage = () => {
        if (response?.contextId && contexts) {
            const contextIds = findContextAndParentIds(response.contextId, contexts);
            if (contextIds) {
                setContextId(contextIds[0]);
                setSelectedKeys(contextIds.reverse());
                // history.push('/vmo/strategies', {
                //     horizonId: response.horizonId
                // });
      
                // Use window.open to open the page in a new tab
                const newTab = window.open('', '_blank');
                
                // Check if the newTab object is defined
                if (newTab) {
                    newTab.location.href = `/vmo/strategies?horizonId=${response.horizonId}&contextId=${response.contextId}`;
                } else {
                    console.log('Pop-up blocked. Please allow pop-ups for this site.');
                }
            }
        }
    };
    return (
        <>
            <Box style={{ cursor: 'pointer', display: "flex", alignContent: "center" }} onClick={navigateToPage}>
                Go to page
                <OpenInNewIcon fontSize="small" />
            </Box>
            <Box style={{ paddingTop: 20 }}>
                {isValidating ?
                    <Skeleton height={400} variant="rect" /> :
                    <>
                        <Title>
                            {response && findContextAndParentDisplayNamesById(response.contextId, contexts || [])?.reverse()?.join(" | ")}
                            {horizons && response && ' - ' + horizons.find(i => i.id === response.horizonId)?.title}
                        </Title>
                        <DividerLine style={{ marginBottom: 20 }} />
                        <Box style={{ backgroundColor: '#FEFEFE', padding: 30, borderRadius: 16, display: 'flex' }}>
                            {response &&
                                <StrategyTitle
                                    isLoading={isValidating}
                                    handleOpenModal={() => { console.log("here"); }}
                                    title={`Current Strategy`}
                                    description={response.strategyStatement || ''}
                                    lastEditStatement={response.updatedAt ? `Last edit was made ${diff} ago ${lastUserWhoDidEdit}` : ''}
                                    hideReadMore={true}
                                />
                            }
                        </Box>
                        {horizonSeries.length > 0 && objectivesSeries.length > 0 && keyResultSeries.length > 0 &&
                            <Box style={{ backgroundColor: 'transparent', display: 'flex', marginTop: 20, justifyContent: 'space-between' }}>
                                <CircularProgress
                                    series={horizonSeries}
                                    label={horizonDaysLeft > 1 ? 'Days left' : 'Day left'}
                                    countItems={horizonDaysLeft.toString()}
                                    graphLabel="Strategy Horizon"
                                />
                                <CircularProgress
                                    series={objectivesSeries}
                                    label={''}
                                    countItems={completedObjectives + '/' + totalObjectives}
                                    graphLabel="Objectives"
                                />
                                <CircularProgress
                                    series={keyResultSeries}
                                    label={''}
                                    countItems={completedKeyResults + '/' + totalKeyResults}
                                    graphLabel="Key Results"
                                />
                            </Box>
                        }
                    </>
                }
            </Box>
        </>
    );
};

export default StrategyPreview;