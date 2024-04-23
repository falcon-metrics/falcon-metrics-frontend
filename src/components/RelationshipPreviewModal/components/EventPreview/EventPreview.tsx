import { Box, Typography } from "@material-ui/core";
import { PreviewComponentProps } from "components/RelationshipPreviewModal/RelationshipPreviewModal";
import useSWR from 'swr';
import fetch from '../../../../core/api/fetch';
import { EventInfo } from "views/ValueStreamManagement/components/Events/hooks/useEvents";
import { Skeleton } from "@material-ui/lab";
import { Title, DividerLine } from '../../../../views/NorthStar/views/components/StrategicDriverDetail/components/StrategyTitle/StrategyTitle';
import { DateTime } from "luxon";
import { DEFAULT_DATE_FORMAT } from "utils/dateTime";

const fetchEvent = (url: string) => {
    return fetch.get(`${url}`).then(response => response.data.event as EventInfo);
};

const EventPreview = (props: PreviewComponentProps) => {
    const { data: response, isValidating } = useSWR(
        `/events/${props.entityId}`,
        fetchEvent,
        { revalidateOnFocus: false },
    );
    return (
        <Box style={{ paddingTop: 20 }}>
            {isValidating ?
                <Skeleton height={400} variant="rect" />
                : response ?
                    <>
                        <Box style={{ backgroundColor: '#FEFEFE', borderRadius: 16, padding: 30 }}>
                            <Title>
                                Event
                            </Title>
                            <DividerLine style={{ marginBottom: 20 }} />
                            <Typography style={{ color: '#555D62', fontSize: 10 }}>
                                {DateTime.fromISO(response.createdAt || '').setLocale('en-gb').toFormat(DEFAULT_DATE_FORMAT)}
                            </Typography>
                            <Box style={{ marginTop: 20 }}>
                                <Typography style={{ fontSize: 16, fontWeight: 'bold', color: '#2B353B' }}>
                                    {response.event_name}
                                </Typography>
                                <Typography style={{ fontSize: 14, color: '#2B353B' }}>
                                    {response.description}
                                </Typography>
                                <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Typography style={{ fontSize: 10, color: "#808689", float: "right" }}>
                                        by {response.username}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </>
                    : <Typography>Data not found</Typography>}
        </Box>
    );
};

export default EventPreview;