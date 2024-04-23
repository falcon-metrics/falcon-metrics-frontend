import { useEffect } from "react";
import useUserInfo from "hooks/fetch/useUserInfo";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { DefaultButton, PrimaryButton } from "@fluentui/react";
import useFilterPanelContext from "./contexts/FilterPanelContext";
import FilterPanelContent from "./views/FilterPanelContent";

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    padding: theme.spacing(2),
    overflowX: "hidden",
  },
  footer: {
    position: "absolute",
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    right: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
  },
}));

interface Props {
  isOpen: boolean;
  onClose(): void;
}

function FilterPanel({ isOpen, onClose }: Props) {
  const classes = useStyles();
  const { userInfo: { email } = {} } = useUserInfo();
  const isInfoDemoUser = email === "info+demo@example.com";

  // History is used to get the current location.search that has the filters applied previously
  // this will access to history object the filters after (search parameter) ?currentDataAggregation=Weeks&departureDateLowerBoundary=2021-12-19&...
  // also will store it in custom hook useFilterPanelContext() that manipulate all actions of filter panel
  // the way to set it on this hook is by performing synchronizeSelectedFilters(currentFilterFromHistoryObject)

  const history = useHistory();
  const {
    isDirty,
    noFiltersSelected,
    applyFiltersFromPanel,
    clearSelectedFilters,
    synchronizeSelectedFilters,
  } = useFilterPanelContext();

  useEffect(() => {
    synchronizeSelectedFilters(history.location.search);
  }, [synchronizeSelectedFilters, isOpen, history.location.search]);

  const applyDisabled = isInfoDemoUser || !isDirty;

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={isOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className="filter-panel-container">
        <FilterPanelContent />
      </div>

      <div className={classes.footer}>
        <PrimaryButton
          disabled={applyDisabled}
          onClick={() => {
            applyFiltersFromPanel();
            onClose();
          }}
        >
          Apply
        </PrimaryButton>
        <DefaultButton
          disabled={noFiltersSelected}
          onClick={clearSelectedFilters}
          style={{ marginLeft: 8 }}
        >
          Clear
        </DefaultButton>
      </div>
    </Drawer>
  );
}

export default FilterPanel;
