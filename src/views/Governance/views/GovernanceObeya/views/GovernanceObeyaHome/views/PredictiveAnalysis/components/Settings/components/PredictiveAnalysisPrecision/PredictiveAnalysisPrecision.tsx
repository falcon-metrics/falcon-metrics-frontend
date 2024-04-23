import {
    Box,
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select
} from "@material-ui/core";
import { SettingsData } from "../../../../types";
import useSettingsStyles from "../../settings.styles";
import { predictiveAnalysisPrecisionLevels } from "../../types";

export interface Props {
    settings: SettingsData;
    onSettingsChange: React.Dispatch<React.SetStateAction<SettingsData>>;
}

export default function PredictiveAnalysisPrecision({ settings, onSettingsChange }: Props) {
    const settingsClasses = useSettingsStyles();
    const useStyles = makeStyles({
        formControl: {
            width: "85%",
        },
    });
    const styleClasses = useStyles();
    const handleChange = (value) => {
        onSettingsChange((prevState) => {
            return {
                ...prevState,
                predictiveAnalysisPrecision: value,
            };
        });
    };
    return (
        <Box className={settingsClasses.settingSection}>
            <Box className={settingsClasses.heading} style={{ marginTop: "0.5em" }}>
                Predictive Analysis Precision
            </Box>
            <FormControl className={styleClasses.formControl}>
                <InputLabel id="demo-simple-select-helper-label">
                    Precision for Predictive Analysis
                </InputLabel>
                <Select
                    value={
                        settings.predictiveAnalysisPrecision ?? 'day'
                    }
                    onChange={(event) => {
                        if (typeof event.target.value === "string")
                            handleChange(event.target.value);
                    }}
                    style={{ fontSize: 12 }}
                >
                    {predictiveAnalysisPrecisionLevels.map((level, index) => (
                        <MenuItem key={index} value={level.value} style={{ fontSize: 12 }}>
                            {level.display}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box >
    );
}
