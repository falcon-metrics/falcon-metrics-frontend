import { Box, IconButton, InputAdornment, styled } from "@material-ui/core";
import TodayIcon from '@material-ui/icons/Today';

export
    const datePickerStyle = {
        color: "#323130",
        fontFamily: "Open Sans, sans-serif",
        fontSize: 14
    };
export const datePickerAdornment = (
    <InputAdornment
        position="end"
        style={{
            color: "#848483",
            fontSize: 18
        }}>
        <TodayIcon fontSize="inherit" />
    </InputAdornment>
);

export const DatePickerContainer = styled(Box)({
    position: "absolute",
    right: 20,
    top: 79,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
    backgroundColor: "#fbfbfb",
    paddingLeft: 20
});

export const ResetButton = styled(IconButton)({
    marginTop: 20,
    marginLeft: 10,
    color: "primary"
})