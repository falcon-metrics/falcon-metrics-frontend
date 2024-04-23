import { Box, Typography } from "@material-ui/core";
import { PreviewComponentProps } from "components/RelationshipPreviewModal/RelationshipPreviewModal";
import { StrategicDriver } from "views/NorthStar/interfaces";
import { Skeleton } from "@material-ui/lab";
import StrategicDriverDetailCard from "views/NorthStar/views/components/StrategicDriverDetail/components/StrategicDriverDetailCard";
// import { useHistory } from "react-router-dom";
import { useNorthStar } from "views/NorthStar/hooks/useNorthStar";
import { useEffect, useState } from "react";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const StrategicDriverPreview = (props: PreviewComponentProps) => {
    const { data, isValidating } = useNorthStar();
    const [response, setResponse] = useState<StrategicDriver>();
    useEffect(() => {
        if (data && !response) {
            setResponse(data.strategicDrivers.find(i => i.uuid === props.entityId));
        }
    }, [data]);
    // const history = useHistory();
    const navigateToPage = () => {
        if (response && data) {
            // history.push(`/vmo/strategic-driver/${response.uuid}`);

            // Use window.open to open the page in a new tab
            const newTab = window.open('', '_blank');
            
            // Check if the newTab object is defined
            if (newTab) {
              newTab.location.href = `/vmo/strategic-driver/${response.uuid}`;
            } else {
              console.log('Pop-up blocked. Please allow pop-ups for this site.');
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
                        <>
                            <StrategicDriverDetailCard
                                colour={response?.colour}
                                openModal={() => { console.log("open modal clicked"); }}
                                iconName={response.icon_name}
                                title={response.name}
                                description={response.description}
                                oneLineSummary={response.oneLineSummary}
                                hideEdit={true}
                            />
                        </>
                        : <Typography>Data not found</Typography>}
            </Box>
        </>
    );
};

export default StrategicDriverPreview;