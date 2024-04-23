import { Box } from "@material-ui/core";
import { ChangedDataWrapper, DataWrapper, ValueWrapper, Title, FlexCenterBox, ChangedDataWrapperSmall, DataWrapperSmall, TitleSmall, ValueWrapperSmall } from "../UpdateCard.styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { getStatusStyles } from "../utils";

type StatusDisplayProps = {
    label: string;
    previousValue?: string;
    value: string;
    isSmall?: boolean;
};

const StatusDisplay = (props: StatusDisplayProps) => {
    const {
        label: afterLabel,
        background: afterBackground,
        color: afterColor,
    } = getStatusStyles(props.value);
    const {
        label: beforeLabel,
        background: beforeBackground,
        color: beforeColor,
    } = getStatusStyles(props.previousValue);
    const ChangedDataWrapperComponent = props.isSmall ? ChangedDataWrapperSmall : ChangedDataWrapper;
    const DataWrapperComponent = props.isSmall ? DataWrapperSmall : DataWrapper;
    const TitleComponent = props.isSmall ? TitleSmall : Title;
    const ValueWrapperComponent = props.isSmall ? ValueWrapperSmall : ValueWrapper;
    return (
        <ChangedDataWrapperComponent>
            <DataWrapperComponent>
                <TitleComponent>{props.label}</TitleComponent>
            </DataWrapperComponent>
            {props.previousValue && props.previousValue !== "4" ? (
                <FlexCenterBox>
                    <ValueWrapperComponent
                        style={{
                            background: beforeBackground,
                            color: beforeColor,
                        }}
                    >
                        {beforeLabel}
                    </ValueWrapperComponent>
                    <Box style={{ padding: 20 }}>
                        <ArrowForwardIcon />
                    </Box>
                </FlexCenterBox>
            ) : null}
            <ValueWrapperComponent
                style={{
                    background: afterBackground,
                    color: afterColor,
                }}
            >
                {afterLabel}
            </ValueWrapperComponent>
        </ChangedDataWrapperComponent>
    );
};

export default StatusDisplay;