import { useEffect, useState, useCallback } from "react";
import { styled } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import Box from "@material-ui/core/Box";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ModalStrategicDriverDetail from "./components/ModalStrategicDriverDetail";
import ModalStrategyForStrategicDriver from "./components/ModalStrategyForStrategicDriver";
import FormCurrentStrategy from "./components/ModalStrategyForStrategicDriver/components/FormCurrentStrategy";
import StrategicDriverDetailCard from "./components/StrategicDriverDetailCard/StrategicDriverDetailCard";
import StrategyTitle from "./components/StrategyTitle";
import StrategicsDriversForm from "views/NorthStar/views/components/ModalNorthStar/components/TableNorthStar/components/StrategicsDriversForm";
import useProfile from "hooks/useProfile";
import TextEditor from "views/Strategies/views/StrategiesPage/components/TextEditor";
import Grid from "@material-ui/core/Grid";
import Footer from "views/Dashboard/views/Platform/views/Footer";
import { useNorthStar } from "../../../hooks/useNorthStar";
import RelationshipsExtendedDisplayVertical from "components/RelationshipsExtendedDisplayVertical";
import EmptyStrategyWidget from "./components/EmptyStrategyWidget";
import {
  postStrategy,
  updateStrategy,
} from "views/Strategies/hooks/useStrategies";
import { Skeleton } from "@material-ui/lab";
import { Typography } from "@material-ui/core";
import { calculateTimeSinceLastEdit } from "views/Strategies/views/StrategiesPage/utils";

export const GoBackLink = styled(Link)({
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
  marginTop: 10,
  marginBottom: 30,
});

export const WrapperMain = styled(Box)({
  display: "flex",
  background: "#F0F0F0",
  justifyContent: "space-between",
  marginLeft: 30,
});

export const WrapperHeader = styled(Box)({
  display: "flex",
  background: "#F0F0F0",
  borderRadius: 16,
  position: "relative",
});

export const WrapperFooter = styled(Box)({
  "& > .footerContainer": {
    backgroundColor: "#00bfb2",
    height: 145.34,
    marginTop: 0,
  },
});

export const TextEditorWrapper = styled(Box)({
  "& .ql-container.ql-snow": {
    borderWidth: 0,
  },
  marginTop: 30,
  position: "relative",
});

export const PageContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#F0F0F0",
  minHeight: "100vh",
  padding: 20,
  flex: 1,
});

const StrategicDriverDetail = () => {
  const { id } = useParams() as any;
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isOpenStrategyModal, setOpenStrategyModal] = useState<boolean>(false);

  // const [intialStrategicDriver, setInitialData] = useState<any>();
  const [intialStrategicDriver, setInitialData] = useState<any>();
  const [initialStrategy, setStrategy] = useState<any>();

  const { data, mutate, updateVision, isLoadingVisions } = useNorthStar();
  const strategicDriver = data?.strategicDrivers.find((sd) => sd.uuid === id);
  const isLoading = isLoadingVisions;
  const idNotFound =
    !isLoading &&
    !(
      data?.strategicDrivers &&
      data?.strategicDrivers?.length > 0 &&
      strategicDriver !== undefined
    );

  useEffect(() => {
    const strategicDrivers = data?.strategicDrivers;
    if (strategicDrivers && strategicDrivers.length > 0) {
      const strategicDriver = strategicDrivers.find((sd) => sd.uuid === id);
      if (strategicDriver) {
        setInitialData(strategicDriver);

        // to make sure that the strategy is not undefined and will not cause the current strategy to show an empty state
        // whenever the strategic driver is updated
        setStrategy(strategicDriver?.strategy);
      }
    }
  }, [data]);

  const mutateVisions = useCallback(
    (newValues, shouldRevalidate) => mutate(newValues, shouldRevalidate),
    [data]
  );

  const onSubmitStrategicDriver = async (values) => {
    setInitialData(values);
    const newStrategicDriversList = (data?.strategicDrivers ?? []).map((s) => {
      if (s?.uuid === intialStrategicDriver?.uuid) {
        return {
          ...values,
          strategy: initialStrategy, 
        };
      }
      return s;
    });

    const currentVision = data ?? {};
    const newVisionWithStrategicDrivers = {
      ...currentVision,
      strategicDrivers: newStrategicDriversList,
    };

    try {
      mutateVisions({ data: [newVisionWithStrategicDrivers] }, false);
      setOpenModal(false);
      if (data?.id) {
        await updateVision(newVisionWithStrategicDrivers);
        setOpenModal(false);
      }
      mutateVisions({ data: [newVisionWithStrategicDrivers] }, true);
    } catch (e) {
      console.log("error when postVision", e);
    }

    setOpenModal(false);
  };

  const openModal = () => setOpenModal(true);

  const openStrategyModal = () => setOpenStrategyModal(true);

  /*
   * Get user info from useProfile hook
   */
  const { data: user } = useProfile();

  const onSubmitStrategyForStrategicDriver = async (values) => {
    const strategy = {
      ...(intialStrategicDriver?.strategy || {}),
      parentStrategicDriverId: intialStrategicDriver?.id,
      id: intialStrategicDriver?.strategy?.id,
      strategyStatement: values.strategyStatement,
      strategyDescription: values.strategyDescription,
      userCreated:
        intialStrategicDriver?.strategy?.userCreated || user?.user_id,
      userModified: intialStrategicDriver?.strategy?.userModified,
      lastUser: user?.given_name || user?.name || user?.nickname,
    };

    setLastEditStatement(
      `Last edit was made ${calculateTimeSinceLastEdit(
        new Date()
      )} ago ${lastUserWhoDidEdit}`
    );
    
    try {
      /*
       * Mutate Vision
       */
      const newStrategicDriversList = (data?.strategicDrivers ?? []).map(
        (s) => {
          if (s?.uuid === intialStrategicDriver?.uuid) {
            return {
              ...intialStrategicDriver,
              strategy,
            };
          }
          return s;
        }
      );

      const currentVision = data ?? {};
      const newVisionWithStrategicDrivers = {
        ...currentVision,
        strategicDrivers: newStrategicDriversList,
      };

      setOpenStrategyModal(false);
      mutateVisions({ data: [newVisionWithStrategicDrivers] }, false);
      setInitialData({
        // The "payload" is set when routing. Stop using this.
        // Use the id to get the data from the hook
        ...(strategicDriver ?? {}),
        ...(intialStrategicDriver ?? {}),
        strategy,
      });
      if (strategy.id) {
        await updateStrategy(strategy);
      } else {
        await postStrategy(strategy);
      }
      mutateVisions({ data: [newVisionWithStrategicDrivers] }, true);
      setStrategy(strategy);
    } catch (e) {
      console.log(
        "error when create/update strategy for strategic driver ==>",
        e
      );
    }
  };

  const lastUser = intialStrategicDriver?.strategy?.lastUser;
  const lastUpdatedAt = intialStrategicDriver?.strategy?.updatedAt;
  const lastUserWhoDidEdit = lastUser ? `by ${lastUser}` : undefined;
  const [lastEditStatement, setLastEditStatement] = useState("");

  useEffect(() => {
    const lastEditStatement =
    lastUpdatedAt && lastUserWhoDidEdit
        ? `Last edit was made ${calculateTimeSinceLastEdit(
          lastUpdatedAt
          )} ago ${lastUserWhoDidEdit}`
        : "";

    setLastEditStatement(lastEditStatement);
  }, [lastUserWhoDidEdit, lastUpdatedAt]);

  const defaultColor = intialStrategicDriver?.colour || "#04548A";

  const [isFormDirty, setIsFormDirty] = useState(false);
  
  return (
    <Box padding={0} margin={0}>
      <PageContainer>
        <WrapperHeader>
          <GoBackLink to="/vmo/north-star">
            <ArrowBackIcon />
            Back to North Star
          </GoBackLink>
          <ModalStrategicDriverDetail
            setOpenModal={setOpenModal}
            isOpenModal={isOpenModal}
            isFormDirty={isFormDirty}
          >
            <StrategicsDriversForm
              onSubmitStrategicDrivers={onSubmitStrategicDriver}
              strategicInfoToEdit={intialStrategicDriver}
              setIsFormDirty={setIsFormDirty}
              isFormDirty={isFormDirty}
            />
          </ModalStrategicDriverDetail>
          <ModalStrategyForStrategicDriver
            setOpenModal={setOpenStrategyModal}
            isOpenModal={isOpenStrategyModal}
            strategyName={intialStrategicDriver?.name}
          >
            <FormCurrentStrategy
              strategyInfo={intialStrategicDriver?.strategy}
              onSubmit={onSubmitStrategyForStrategicDriver}
            />
            {/* <StrategicsDriversForm
              onSubmitStrategicDrivers={onSubmitStrategicDriver}
              strategicInfoToEdit={intialStrategicDriver}
            /> */}
          </ModalStrategyForStrategicDriver>
        </WrapperHeader>
        <WrapperMain>
          <Grid container spacing={4} style={{ padding: 20, width: "100%" }}>
            {isLoading ? (
              <Skeleton height={"500px"} width={"100%"} />
            ) : idNotFound ? (
              <Grid item xs={5}>
                <Box alignContent={"center"}>
                  <Typography variant="h5">ID NOT FOUND</Typography>
                </Box>
              </Grid>
            ) : (
              <>
                <Grid item xs={12} md={8}>
                  <StrategicDriverDetailCard
                    customStyles={{ minHeight: 300 }}
                    colour={intialStrategicDriver?.colour}
                    openModal={openModal}
                    iconName={intialStrategicDriver?.icon_name}
                    title={intialStrategicDriver?.name}
                    description={intialStrategicDriver?.description}
                    oneLineSummary={intialStrategicDriver?.oneLineSummary}
                  />
                  <TextEditorWrapper>
                    <StrategicDriverDetailCard
                      openModal={openStrategyModal}
                      shouldHideIcon={false}
                      colour={defaultColor}
                      hideEdit={
                        !(
                          initialStrategy &&
                          Object.keys(initialStrategy).length > 0
                        )
                      }
                    >
                      {initialStrategy &&
                      Object.keys(initialStrategy).length > 0 ? (
                        <>
                          <Box
                            style={{
                              marginBottom: 20,
                              marginLeft: 16,
                              marginTop: 10,
                            }}
                          >
                            <StrategyTitle
                              hideReadMore
                              colour={defaultColor}
                              title={
                                <span>
                                  Current Strategy for{" "}
                                  <span
                                    style={{
                                      color: defaultColor,
                                      wordWrap: "break-word",
                                    }}
                                  >
                                    {intialStrategicDriver?.name}
                                  </span>
                                </span>
                              }
                              openEditModal={() => {
                                setOpenStrategyModal(true);
                              }}
                              description={
                                intialStrategicDriver?.strategy
                                  ?.strategyStatement
                              }
                              lastEditStatement={lastEditStatement}
                            />
                          </Box>
                          <TextEditor
                            customStyles={{ width: "100%" }}
                            maxLength={2000}
                            readOnly
                            hideToolbar
                            defaultContent={
                              intialStrategicDriver?.strategy
                                ?.strategyDescription
                            }
                            hideCharacters
                          />
                        </>
                      ) : (
                        <EmptyStrategyWidget
                          openStrategyModal={openStrategyModal}
                          color={defaultColor}
                          title={
                            <>
                              Current strategy for{" "}
                              <span style={{ color: defaultColor }}>
                                {intialStrategicDriver?.name}
                              </span>
                            </>
                          }
                        />
                      )}
                    </StrategicDriverDetailCard>
                  </TextEditorWrapper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <RelationshipsExtendedDisplayVertical
                    customStyle={{
                      general: {
                        width: "100%",
                        minHeight: 650,
                        borderRadius: 16,
                        boxShadow: "0px 2px 11px 0px #dcdcdc",
                      },
                      editIcon: { background: defaultColor },
                    }}
                    elementId={intialStrategicDriver?.uuid}
                    elementType="strategicDriver"
                    elementName={intialStrategicDriver?.name || ""}
                  />
                  {/* <Box display="flex" style={{ height: "100%" }}> */}
                  {/* <RelationshipList cardTitle="Objectives & Key Results" />
                <RelationshipList cardTitle="Initiatives" />
                <RelationshipList cardTitle="Products" />
                <RelationshipList cardTitle="Teams" /> */}
                  {/* </Box> */}
                </Grid>
              </>
            )}
          </Grid>
        </WrapperMain>
      </PageContainer>
      <WrapperFooter>
        <Footer />
      </WrapperFooter>
    </Box>
  );
};

export default StrategicDriverDetail;
