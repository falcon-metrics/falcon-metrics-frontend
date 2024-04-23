import { Box, Chip, Typography, styled } from "@material-ui/core";
import { Link } from "react-router-dom";

export const StickyContainer = styled(Box)({
    backgroundColor: '#f0f0f0',
    left: 'auto',
    right: 0,
    position: 'sticky',
    zIndex: 800,
    top: 0,
    flexDirection: "column"
});

export const Container = styled(Box)({
    display: "flex"
})

export const LinkContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
});

export const BackToLink = styled(Link)({
    display: "flex",
    alignItems: "center",
    color: "#585858",
    fontSize: 14,
    fontWeight: "lighter",
    fontFamily: "Open Sans",
    "&:visited": {
        textDecoration: "none",
    },
    "&:link": {
        textDecoration: "none",
    },
    "&:hover": {
        textDecoration: "underline",
    },
    margin: "30px 0 30px 25px",
});

export const Title = styled(Typography)({
    marginLeft: 30,
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Open Sans",
    color: "#2B353B",
    marginBottom: 20
});

export const Badge = styled(Chip)({
    marginRight: 32,
    marginBottom: 18,
    marginLeft: 12,
    fontWeight: 600,
    fontSize: 12,
    fontFamily: "Open Sans"
});