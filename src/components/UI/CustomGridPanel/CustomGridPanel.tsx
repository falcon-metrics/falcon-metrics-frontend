import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { GridApiContext } from "@mui/x-data-grid-pro";

// This helper method will be exported by @material-ui/data-grid in the next version
export const isEscapeKey = (key) => key === "Escape";

const useStyles = makeStyles(
    (theme) => ({
        root: {
            zIndex: theme.zIndex.modal,
            "& input, & select": {
                boxSizing: "content-box"
            }
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            minWidth: 300,
            minHeight: 64,
            maxHeight: 450,
            display: "flex"
        }
    }),
    { name: "CustomGridPanel" }
);
type PanelProps = {
    children: any;
    open: any;
};
export default function CustomGridPanel(props: PanelProps) {
    const classes = useStyles();
    const { children, open } = props;
    const apiRef = React.useContext(GridApiContext);

    const getPopperModifiers = () => {
        return {
            flip: {
                enabled: false
            }
        };
    };

    const handleClickAway = React.useCallback(() => {
        if (apiRef)
            apiRef.current.hidePreferences();
    }, [apiRef]);

    const handleKeyDown = React.useCallback(
        (event) => {
            if (isEscapeKey(event.key)) {
                event.stopPropagation();
                if (apiRef)
                    apiRef.current.hidePreferences();
            }
        },
        [apiRef]
    );

    let anchorEl;
    if (apiRef && apiRef.current && apiRef.current.columnHeadersElementRef?.current) {
        anchorEl = apiRef?.current.columnHeadersElementRef?.current;
    }

    if (!anchorEl) {
        return null;
    }

    return (
        <Popper
            placement="bottom-start"
            className={classes.root}
            open={open}
            anchorEl={anchorEl}
            modifiers={getPopperModifiers()}
            disablePortal
        >
            <ClickAwayListener onClickAway={handleClickAway}>
                <Paper
                    className={classes.paper}
                    elevation={8}
                    onKeyDown={handleKeyDown}
                >
                    {children}
                </Paper>
            </ClickAwayListener>
        </Popper>
    );
}
