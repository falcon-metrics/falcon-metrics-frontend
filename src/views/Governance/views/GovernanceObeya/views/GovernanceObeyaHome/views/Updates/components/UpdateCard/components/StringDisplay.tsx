import { Box } from "@material-ui/core";
import { ChangedDataWrapper, ChangedDataWrapperSmall, DataWrapper, DataWrapperSmall, FlexCenterBox, Title, TitleSmall, ValueWrapper, ValueWrapperSmall } from "../UpdateCard.styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

type StringDisplayProps = {
    label: string;
    previousValue?: string;
    value: string;
    isSmall?: boolean;
};

const StringDisplay = (props: StringDisplayProps) => {
    const ChangedDataWrapperComponent = props.isSmall ? ChangedDataWrapperSmall : ChangedDataWrapper;
    const DataWrapperComponent = props.isSmall ? DataWrapperSmall : DataWrapper;
    const TitleComponent = props.isSmall ? TitleSmall : Title;
    const ValueWrapperComponent = props.isSmall ? ValueWrapperSmall : ValueWrapper;
    return (<ChangedDataWrapperComponent>
        <DataWrapperComponent>
            <TitleComponent>{props.label}</TitleComponent>
        </DataWrapperComponent>
        <DataWrapperComponent>
            {props.previousValue ? (
                <FlexCenterBox>
                    <ValueWrapperComponent>
                        {props.previousValue}
                    </ValueWrapperComponent>
                    <Box style={{ padding: 20 }}>
                        <ArrowForwardIcon />
                    </Box>
                </FlexCenterBox>)
                : null}
            <DataWrapperComponent>
                <ValueWrapperComponent>
                    {props.value}
                </ValueWrapperComponent>
            </DataWrapperComponent>
        </DataWrapperComponent>
    </ChangedDataWrapperComponent>);
};

export default StringDisplay;