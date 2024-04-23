import { Box, Typography, styled } from "@material-ui/core";

export const FormRow = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
});

export const FormLabel = styled(Typography)({
    fontFamily: "Open Sans",
    fontSize: 16,
    marginRight: 15,
    marginTop: 3
});

export const FormHeader = styled(FormLabel)({
    fontWeight: 'bold',
    fontSize: 16,
});