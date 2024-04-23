import { AppBar, Box, Checkbox, Divider, Tooltip, Typography } from "@material-ui/core";
import ContextNavigationWithData from "views/Dashboard/views/Platform/views/Header/views/ContextNavigation/ContextNavigation.data";
import NavigationBar from "views/LeanPortfolio/components/NavigationBar";
import { HorizonItem } from "views/Strategies/hooks/useHorizons";
import HorizonSelector from "views/Strategies/views/StrategiesPage/components/HorizonSelector";
import { useValueStreamManagementStyles } from "views/ValueStreamManagement/ValueStreamManagement.styles";
import InfoIcon from "@material-ui/icons/Info";
import { usePortfolioBoardPageContext } from "views/LeanPortfolio/contexts/PortfolioBoardPageContext";

type TopBarProps = {
    selectedHorizon?: string;
    options?: HorizonItem[];
    setHorizon?: any;
    showHorizon?: boolean;
    setShowChildren?: any;
    showChildren?: boolean;
    showIncludeChildren?: boolean;
    showContext?: boolean;
    isHorizonsLoading?: boolean;
};

const TopBar = (props: TopBarProps) => {
    const classes = useValueStreamManagementStyles();
    const context = usePortfolioBoardPageContext();

    return (
        <AppBar
            position="sticky"
            classes={{
                root: classes.navigationSection,
                colorPrimary: classes.navigationSectionColor,
            }}
        >
            <Box style={{ display: "flex", justifyContent: 'flex-end', margin: 25 }}>
                <NavigationBar />
            </Box>
            {(props.showContext || props.showHorizon || props.showIncludeChildren) &&
                <Box style={{ marginLeft: 25, display: 'flex' }}>
                    {props.showContext &&
                        <ContextNavigationWithData />
                    }
                    {props.showIncludeChildren &&
                        <Box display="flex" alignItems="end" style={{ marginLeft: 15 }}>
                            <Checkbox
                                checked={props.showChildren}
                                style={{ marginTop: 30 }}
                                color="primary"
                                onChange={(e) => context.setShowChildren(e.target.checked)}
                            />
                            <Typography style={{ marginBottom: 8 }}>Include levels below &nbsp;</Typography>
                            <Tooltip title="Allows initiatives from below the selected board and aggregation to be displayed">
                                <Typography style={{ color: "#7C7C7C", marginBottom: 8 }}>
                                    <InfoIcon fontSize="inherit" />
                                </Typography>
                            </Tooltip>
                        </Box>
                    }
                    {props.showHorizon &&
                        <Box style={{ marginLeft: 20 }}>
                            <HorizonSelector
                                selectedHorizon={props.selectedHorizon}
                                options={props.options || []}
                                setHorizon={props.setHorizon}
                                isLoading={props.isHorizonsLoading}
                            />
                        </Box>
                    }
                </Box>
            }
            <Divider className={classes.navigationDivider} />
        </AppBar>
    );
};

export default TopBar;