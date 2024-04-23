import { useState, useContext, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { SelectedContextIdContext } from "components/UserStateProvider/UserStateProvider";
import ModalCurrentStrategy from "./components/ModalCurrentStrategy";
import ModalStrategyPreview from "./components/ModalStrategyPreview";
import StrategyTitle from "../../../NorthStar/views/components/StrategicDriverDetail/components/StrategyTitle";
import { useStrategy } from "../../hooks/useStrategies";
import Objectives from "../Objectives";
import { useContextName } from "../../hooks/useContextName";
import RelationshipsExtendedDisplayVertical from "components/RelationshipsExtendedDisplayVertical";
import { useHorizons } from "../../hooks/useHorizons";
import { useLocation } from "react-router-dom";
import {
  EditIcon,
  IconButtonWrapper,
  WrapperMain,
} from "./StrategiesPage.styles";
import { calculateTimeSinceLastEdit } from "./utils";
import useAuthentication from "hooks/useAuthentication";
import TopBar from "views/LeanPortfolio/components/TopBar";

const Strategy = () => {
  const location: any = useLocation();
  const { contextId } = useContext(SelectedContextIdContext);
  const { isAdminOrPowerUser } = useAuthentication();
  const [horizonId, setHorizon] = useState<string | undefined>(undefined);

  const { data: horizons, isLoading } = useHorizons();

  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenModalReadMore, setOpenModalReadMore] = useState(false);
  const [isHorizonSetFromLink, setIsHorizonSetFromLink] = useState(false);

  const {
    data,
    postStrategy,
    updateStrategy,
    mutate,
    isLoadingStrategy
  } = useStrategy("strategies", contextId, horizonId);

  const strategy = data?.[0];
  const {
    updatedAt,
    lastUser,
    strategyStatement,
    okrs,
    id: strategyId,
    strategyDescription,
  } = strategy ?? {};

  const noStrategy = (data ?? []).length === 0;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOpenModalReadMore = () => {
    setOpenModalReadMore(true);
  };

  const { selectedContext } = useContextName("");

  const lastUserWhoDidEdit = lastUser ? `by ${lastUser}` : undefined;
  const [lastEditStatement, setLastEditStatement] = useState("");

  const selectedHorizon =
    (horizons ?? [])?.find((h) => h?.id === horizonId)?.id ?? horizons?.[0]?.id;

  useEffect(() => {
    const lastEditStatement =
      updatedAt && lastUserWhoDidEdit
        ? `Last edit was made ${calculateTimeSinceLastEdit(
          updatedAt
          )} ago ${lastUserWhoDidEdit}`
        : "";

    setLastEditStatement(lastEditStatement);
  }, [lastUserWhoDidEdit, updatedAt]);

  useEffect(() => {
    if (!horizonId && horizons?.length && !isHorizonSetFromLink) {
      setHorizon(selectedHorizon);
    }
  }, [horizonId, horizons, selectedHorizon]);

  useEffect(() => {
    if (!isHorizonSetFromLink && location.state && location.state.horizonId) {
      setHorizon(location.state.horizonId);
      setIsHorizonSetFromLink(true);
      window.history.replaceState({}, document.title);
    }
  }, [location?.state]);

  return (
    <Box>
      <ModalCurrentStrategy
        postStrategy={postStrategy}
        updateStrategy={updateStrategy}
        mutate={mutate}
        handleOpenModal={handleOpenModal}
        isOpen={isOpenModal}
        setOpenModal={setOpenModal}
        selectedHorizon={horizonId}
        title={`Strategy for ${selectedContext}`}
        setLastEditStatement={setLastEditStatement}
        lastUserWhoDidEdit={lastUserWhoDidEdit}
      />
      <TopBar
        showHorizon={true}
        selectedHorizon={horizonId}
        isHorizonsLoading={isLoading}
        options={horizons || []}
        setHorizon={setHorizon}
        showContext={true}
      />
      <WrapperMain>
        <Grid container spacing={2} style={{ padding: 25, width: "100%" }}>
          <Grid item xs={12} md={9}>
            <Box
              style={{
                backgroundColor: "#FEFEFE",
                padding: 30,
                borderRadius: 16,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <StrategyTitle
                isEmpty={noStrategy}
                isLoading={isLoadingStrategy}
                handleOpenModal={handleOpenModalReadMore}
                openEditModal={() => setOpenModal(true)}
                title={`Current Strategy for ${selectedContext}`}
                description={strategyStatement}
                lastEditStatement={lastEditStatement}
              />
              {!isLoadingStrategy && !noStrategy && isAdminOrPowerUser && (
                <Box style={{ height: 30 }}>
                  <IconButtonWrapper
                    aria-label="edit"
                    onClick={handleOpenModal}
                  >
                    <EditIcon />
                  </IconButtonWrapper>
                </Box>
              )}
            </Box>
            {okrs && (
              <Box
                className="obeya-container charts-page-grid"
                style={{ padding: 0 }}
              >
                <Box
                  className="widget"
                  style={{
                    borderRadius: 16,
                    marginTop: 20,
                    minHeight: 800,
                    gridColumn: "span 4",
                    // padding: 20
                  }}
                >
                  <Objectives
                    isLoading={isLoadingStrategy}
                    horizonId={horizonId}
                  />
                </Box>
              </Box>
            )}
            <ModalStrategyPreview
              content={strategyDescription || ""}
              isOpen={isOpenModalReadMore}
              setOpenModal={setOpenModalReadMore}
              title="Current Strategy"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            {/* <Box
            style={{
              marginLeft: 0,
              height: "100%",
            }}
          > */}
            {strategyId ? (
              <RelationshipsExtendedDisplayVertical
                customStyle={{
                  general: {
                    width: "104%",
                    borderRadius: 16,
                    boxShadow: "0px 2px 11px 0px #dcdcdc",
                  },
                }}
                elementId={strategyId.toString() || ""}
                elementType="strategy"
                elementName={strategyStatement || ""}
                isLoading={isLoadingStrategy}
              />
            ) : null}
            {/* </Box> */}
          </Grid>
        </Grid>
      </WrapperMain>
      {/* <WrapperFooter>
      </WrapperFooter> */}
    </Box>
  );
};

export default Strategy;
