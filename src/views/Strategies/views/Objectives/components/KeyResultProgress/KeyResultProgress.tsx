import { OKRKeyResult } from "views/Governance/views/GovernanceObeya/utils";
import Grid from '@material-ui/core/Grid';
import fetch from '../../../../../../core/api/fetch';
import useSWR from 'swr';
import { Skeleton } from "@material-ui/lab";
import HorizontalBar from "views/Strategies/components/HorizontalBar";
import { Box } from "@material-ui/core";
import { getTimezone } from "utils/utils";

type KeyResultProgressProps = {
    keyResult: OKRKeyResult;
};

type ProgressResponse = {
    numberOfItemsCompleted: number | undefined;
    numberOfItemsInProgress: number | undefined;
    numberOfItemsProposed: number | undefined;
};
const fetchProgress = (url: string) => {
    if (url !== '') {
        return fetch.get(`${url}`).then((response) => response.data as ProgressResponse);
    }
    return undefined;
};

const KeyResultProgress = ({
    keyResult,
}: KeyResultProgressProps) => {
    // const classes = useStyles();
    const { data: response, isValidating } = useSWR(
        keyResult.keyResultId ? `strategies/keyResult/${keyResult.keyResultId}/progress?timezone=${getTimezone()}` : '',
        fetchProgress,
        { revalidateOnFocus: false, revalidateIfStale: false, revalidateOnReconnect: false },
    );
    return (
        <Grid item xs={2}>
            {isValidating ?
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                    <Skeleton height={20} variant="rect" style={{ width: '100%' }} />
                </Box> :
                response && response.numberOfItemsCompleted !== undefined &&
                response.numberOfItemsInProgress !== undefined &&
                response.numberOfItemsProposed !== undefined &&
                <Box style={{ paddingLeft: 10, paddingRight: 10, height: '100%' }}>
                    <HorizontalBar
                        donePerc={response.numberOfItemsCompleted}
                        inProgressPerc={response.numberOfItemsInProgress}
                        toDoPerc={response.numberOfItemsProposed}
                    />
                </Box>
            }
        </Grid>
    );
};

export default KeyResultProgress;