import { Pivot, PivotItem } from "@fluentui/react";
import { useHistory } from "react-router";
import { AnalyticsDashboardPages } from "views/Dashboard/views/AnalyticsDashboard/components/AnalyticsDashboardRouter";
import { useAnalyticsDashboardTab } from "views/Dashboard/views/AnalyticsDashboard/hooks/useAnalyticsDashboardTab";
import { useValueStreamManagementTab } from "views/ValueStreamManagement/hooks/useValueStreamManagementTab";
import { ValueStreamManagementPages } from "views/ValueStreamManagement/ValueStreamManagementRoute";
import { BaseRoutes } from "utils/routes";
import useUserInfo from "hooks/fetch/useUserInfo";
import { useContext, useEffect, useRef, useState } from "react";
import { SelectedTabContext } from "components/UserStateProvider/UserStateProvider";
import useFilterPanelContext from "../../../FilterPanel/contexts/FilterPanelContext";
import { initialFilters } from "../../../FilterPanel/contexts/FilterPanelContext/interfaces";
import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import useAuthentication from "hooks/useAuthentication";
import { useCustomDashboardData } from "views/ValueStreamManagement/views/CustomDashboard/useCustomDashboardData";

import { v4 as uuidV4 } from "uuid";
import Spinner from "components/UI/MUIFormInput/components/MUIFormInputSpinner/MUIFormInputSpinner";

export function getTabId(itemKey: string) {
  return `ShapeColorPivot_${itemKey}`;
}

const navItemStyle = {
  fontSize: 14,
  fontFamily: "Open Sans",
  cursor: "pointer",
  color: "#323130",
  alignItems: "center",
  display: "flex",
  margin: 0,
};

const NavigationBar = () => {
  const { user } = useAuthentication();
  const { userInfo } = useUserInfo();

  const history = useHistory();

  const {
    setSelectedFilters: { setPerspective, setDateAnalysisOption },
  } = useFilterPanelContext();

  const [item, setItem] = useState<PivotItem>();

  const { data: dashboards, isLoading } = useCustomDashboardData(
    user?.sub ?? ""
  );

  const [selectedDashboardName, setSelectedDashboardName] = useState<string>(
    "My Dashboard"
  );

  useEffect(() => {
    if (item) {
      history.push(item.props.itemKey + history.location.search);
      if (item.props.itemKey) {
        setTab(item.props.itemKey);
      }
      setItem(undefined);
    }
  }, [item]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dashboardId = urlParams.get('dashboardId');
  
    if (dashboardId && dashboards && dashboards.length > 0) {
      const selectedDashboard = dashboards.find(dashboard => dashboard.dashboardId === dashboardId);
      if (selectedDashboard) {
        setSelectedDashboardName(selectedDashboard.dashboardTitle);
      }
    }
  }, [dashboards]);
  
  const { setTab } = useContext(SelectedTabContext);

  const handleLinkClick = (item?: PivotItem) => {
    if (!item) {
      return;
    }
    setDateAnalysisOption(initialFilters.dateAnalysisOption);
    setPerspective(initialFilters.perspective);
    setItem(item);
  };

  const isOldDashboard =
    userInfo?.analyticsDashboardUrl === BaseRoutes.AnalyticsDashboard;

  const analyticsDashboardTab = useAnalyticsDashboardTab();
  const valuestreamManagementTab = useValueStreamManagementTab();
  const tab = isOldDashboard ? analyticsDashboardTab : valuestreamManagementTab;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (
    event: React.MouseEvent<EventTarget>,
    dashboard?: any
  ) => {
    if (!dashboard) return;

    const url = `/value-stream-management/dashboard${history.location.search}&dashboardId=${dashboard.dashboardId}`;

    try {
      history.push(url);
      setSelectedDashboardName(dashboard.dashboardTitle);
      window.location.href = url;

      setOpen(false);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  };

  const handleCreateDashboard = () => {
    try {
      const newDashboardId = uuidV4();
      const url = `/value-stream-management/dashboard${history.location.search}&dashboardId=${newDashboardId}`;

      history.push(url);
      window.location.href = url;

      setOpen(false);
    } catch (error) {
      console.error("Error creating dashboard:", error);
    }
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  if (isOldDashboard) {
    return (
      <div className="navigation-container" data-tour="perspective-of-flow">
        <Pivot
          aria-label="Separately Rendered Content Pivot Example"
          selectedKey={tab}
          onLinkClick={handleLinkClick}
          headersOnly={true}
          getTabId={getTabId}
          linkFormat="links"
          linkSize="normal"
        >
          {AnalyticsDashboardPages.map(([name, key]) => (
            <PivotItem key={key} headerText={name} itemKey={key} />
          ))}
        </Pivot>
      </div>
    );
  } else {
    return (
      <div
        className="navigation-container"
        data-tour="perspective-of-flow"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {/* Custom Dashboard selector */}
        <div style={{ marginTop: 5 }}>
          <Button
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            style={{
              minWidth: 150,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            disabled={isLoading}
          >
            <Typography
              style={{
                fontFamily: "Open Sans",
                color: "#313230",
                textTransform: "capitalize",
                fontSize: 14,
                justifyContent: "space-between",
              }}
            >
              {selectedDashboardName}
            </Typography>{" "}
            {isLoading ? (
              <Spinner isVisible={isLoading} />
            ) : (
              <ExpandMoreRoundedIcon fontSize="small" />
            )}
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
            style={{
              zIndex: 1,
              minWidth: 200,
            }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                  zIndex: 1,
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      {dashboards && dashboards.map((dashboard) => (
                        <MenuItem
                          key={dashboard.dashboardId}
                          onClick={(e) => handleClose(e, dashboard)}
                        >
                          {dashboard.dashboardTitle}
                        </MenuItem>
                      ))}

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: 8,
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddRoundedIcon />}
                          style={{ fontFamily: "Open Sans", fontSize: 12 }}
                          onClick={handleCreateDashboard}
                        >
                          Create Dashboard
                        </Button>
                      </div>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>

        <Pivot
          aria-label="Separately Rendered Content Pivot Example"
          selectedKey={tab}
          onLinkClick={handleLinkClick}
          headersOnly={true}
          getTabId={getTabId}
          linkFormat="links"
          linkSize="normal"
        >
          {ValueStreamManagementPages.slice(0, 5).map(([name, key]) => {
            if (name !== "Dashboard") {
              return (
                <PivotItem
                  key={key}
                  headerText={name}
                  itemKey={key}
                  onRenderItemLink={() => {
                    return (
                      <Box style={navItemStyle}>
                        {name !== "Dashboard" && name}
                      </Box>
                    );
                  }}
                />
              );
            }
          })}
        </Pivot>
      </div>
    );
  }
};

export default NavigationBar;
