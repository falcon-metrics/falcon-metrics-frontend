/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid } from "@material-ui/core";
import EmptyStateCircularProgress from "./components/EmptyStateCircularProgress";
import { getRatingSeriesAndKeyResultsCount } from "./UpdatesContent";
import { useEffect, useMemo, useState } from "react";
import { HighlightsValueCard } from 'views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/Updates/components/Highlights/HighlightsValueCard';
import { useObeyaGoals } from "views/Governance/views/GovernanceObeya/hooks/useObeyaGoals";
import { useObeyaRoom } from "views/Governance/views/GovernanceObeya/hooks/useObeyaRoom";

const Outcomes = () => {
    const { isLoadingObeyaData: isLoading, activeObeyaRoomId } = useObeyaRoom();
    const { data: objectives } = useObeyaGoals(activeObeyaRoomId);
    const [isEmptyProgressCircle, setIsEmptyProgressCircle] = useState(false);
    const keyResults = useMemo(
        () => {
            return objectives?.reduce((acc: any[], objective) => {
                const keyResults: any = objective?.keyResults || [];
                if (keyResults.length) {
                    acc = [...acc, ...keyResults];
                }
                return acc;
            }, []);
        },
        [objectives],
    );

    const { ratingSeries, keyResultsCount } = useMemo(
        () => getRatingSeriesAndKeyResultsCount(objectives),
        [objectives],
    );

    const { ratingSeries: keyResultsRatingSeries, keyResultsCount: keyResultsCountValue } = useMemo(
        () => getRatingSeriesAndKeyResultsCount(keyResults),
        [objectives],
    );
    useEffect(() => {
        if (ratingSeries[1].values[0] === 0
            && ratingSeries[2].values[0] === 0
            && ratingSeries[3].values[0] === 0
            && ratingSeries[4].values[0] === 0) {
            setIsEmptyProgressCircle(true);
        }
    }, [
        ratingSeries[1],
        ratingSeries[2],
        ratingSeries[3],
        ratingSeries[4]
    ]);

    return (

        <div>
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
            >
                <Grid item xs={12} md={6}>
                    {!objectives?.length
                        ?
                        <EmptyStateCircularProgress title="Objectives" />
                        : <HighlightsValueCard
                            shouldHideAdd
                            isLoading={isLoading}
                            ratingSeries={ratingSeries}
                            objectivesCount={objectives?.length}
                            keyResultsCount={keyResultsCount}
                            titleChart="Objectives"
                            label="Objective"
                        />
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    {!keyResultsCount
                        ?
                        <EmptyStateCircularProgress title="Key Results" />
                        : <HighlightsValueCard
                            shouldHideAdd
                            ratingSeries={keyResultsRatingSeries}
                            objectivesCount={keyResults?.length}
                            keyResultsCount={keyResultsCountValue}
                            titleChart="Key Results"
                            label="Key Result"
                        />
                    }
                </Grid>
            </Box>
        </div>
    );
};

export default Outcomes;