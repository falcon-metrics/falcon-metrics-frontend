import { Pivot, PivotItem } from "@fluentui/react";
import { useHistory } from "react-router";
import { useLeanPortfolioTab } from "../../hooks/useLeanPortfolioTab";
import { LeanPortfolioPages } from "../../LeanPortfolio";
import { useContext, useEffect, useState } from "react";
import { SelectedTabContext } from "components/UserStateProvider/UserStateProvider";

import useFilterPanelContext from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext";
import { initialFilters } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces";
import { Box, Typography } from "@material-ui/core";
import useAuthentication from "hooks/useAuthentication";

export function getTabId(itemKey: string) {
  return `ShapeColorPivot_${itemKey}`;
}

const NavigationBar = () => {
  const { isAlphaUser } = useAuthentication();
  const {
    setSelectedFilters: { setPerspective, setDateAnalysisOption },
  } = useFilterPanelContext();

  const [item, setItem] = useState<PivotItem>();

  const history = useHistory();

  const { setTab } = useContext(SelectedTabContext);
  const handleLinkClick = (item?: PivotItem) => {
    if (!item) {
      return;
    }
    setItem(item);
  };

  useEffect(() => {
    if (item) {
      let path = item.props.itemKey + history.location.search;
      // TODO debbug why we can't dispatch setTab here
      if (path === "north-star") {
        path = "/vmo/north-star";
      } else if (path === "business-score-card") {
        path = "/vmo/business-score-card";
      } else if (path === "strategies") {
        path = "/vmo/strategies";
      } else if (path === "link-map") {
        path = "/vmo/link-map";
      } else {
        path = "/vmo";
      }
      history.push(path);
      if (item.props.itemKey) {
        setTab(item.props.itemKey);
      }
      setDateAnalysisOption(initialFilters.dateAnalysisOption);
      setPerspective(initialFilters.perspective);
      setItem(undefined);
    }
  }, [item]);

  const tab = useLeanPortfolioTab();

  const chipStyle = {
    height: 15,
    width: 38,
    fontSize: 8,
    backgroundColor: "#03BFB2",
    color: "white",
    fontFamily: "Open Sans",
    borderRadius: 8,
    marginLeft: 5,
    alignItems: "center",
  };

  const betaChipStyle = {
    ...chipStyle,
    ...{
      backgroundColor: "#0277C8",
    },
  };

  const navItemStyle = {
    fontSize: 14,
    fontFamily: "Open Sans",
    cursor: "pointer",
    color: "#323130",
    alignItems: "center",
    display: "flex",
    margin: 0,
  };

  return (
    <div className="navigation-container" data-tour="perspective-of-flow">
      <Pivot
        aria-label="Lean portfolio tabs"
        selectedKey={tab}
        onLinkClick={handleLinkClick}
        headersOnly={true}
        getTabId={getTabId}
        linkFormat="links"
        linkSize="normal"
      >
        {LeanPortfolioPages.slice(0, 5).map(([name, key]) => {
        if (name === 'Link Map' && !isAlphaUser) {
          return null;
        }

        return (
          <PivotItem key={key} headerText={name} itemKey={key} onRenderItemLink={() => {
            return (
              <Box style={navItemStyle}>
                {name}
                {['Business Scorecard', 'Strategy', 'North Star'].includes(name) &&
                  <Typography style={betaChipStyle}>
                    <span style={{ whiteSpace: "nowrap", lineHeight: 1.75 }}>BETA</span>
                  </Typography>
                }
                {isAlphaUser && name === 'Link Map' &&
                  <Typography style={chipStyle}>
                    <span style={{ whiteSpace: "nowrap", lineHeight: 1.75 }}>ALPHA</span>
                  </Typography>
                }
              </Box>
            );
          }} />
        );
      })}

      </Pivot>
    </div>
  );
};

export default NavigationBar;
