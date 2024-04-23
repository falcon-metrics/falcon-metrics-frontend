import { useEffect, useState, useCallback, useMemo } from "react";
import { styled } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ModalNorthStarPage from "./components/ModalNorthStar";
import Box from "@material-ui/core/Box";
import {
  SkeletonVisionStatement,
  SkeletonMissionStatement,
  SkeletonTitleStrategic,
  SkeletonStrategicDrivers,
} from "views/NorthStar/views/components/SkeletonNorthStar/SkeletonNorthStar";
import Footer from "views/Dashboard/views/Platform/views/Footer";
import StrategicDriverList from "./components/StrategicDriverList/StrategicDriverList";
import { useNorthStar } from "../hooks/useNorthStar";
import {
  WrapperCardSkeleton,
  BoxSkeletonStrategicDrivers,
  WrapperStrategicDriversList,
} from "./NorthStarPage.styles";
import EmptyNorthStar from "./components/EmptyStateNorthStar/EmptyStateNorthStar";
import { useConfirm } from "material-ui-confirm";
import { Typography } from "@material-ui/core";
import { noop } from "lodash";
import TopBar from "views/LeanPortfolio/components/TopBar";

export const WrapperPage = styled(Box)({
  display: "flex",
  height: "100%",
  // flex: '1 1 0%',
  // padding: 22,
  paddingLeft: 22,
  paddingRight: 22,
  flexDirection: "column",
  marginTop: "0.5rem",
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

export const PageContainer = styled(Box)({
  paddingRight: 26,
  paddingLeft: 26,
  paddingBottom: 26,
  display: "flex",
  flexDirection: "column",
  position: "relative",
  // zIndex: -1,
  backgroundColor: "#F0F0F0",
  overflow: "auto",
  minHeight: "calc(100vh - 145px)",
});

const DividerLine = styled(Divider)({
  width: 23,
  marginTop: 5,
  color: "#2AD2C9",
  backgroundColor: "#2AD2C9",
  height: 3,
  borderRadius: 4,
});

const WrapperVisionFirstTextRow = styled(Box)({
  "&": {
    color: "#2B353B",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Open sans",
  },
});

const MissionDescription = styled(Box)({
  color: "#323130",
  fontSize: 18,
  marginTop: "1rem",
  fontFamily: "Open sans",
  width: "100%",
});

const Mission = styled(WrapperVisionFirstTextRow)({
  marginTop: "2rem",
});

const VisionTitle = styled(Box)({
  color: "#2B353B",
  fontSize: 20,
  marginTop: "1rem",
  fontWeight: "bold",
  fontFamily: "Open sans",
  marginBottom: 12,
});

const MissionTitle = styled(Box)({
  color: "#2B353B",
  fontSize: 20,
  marginTop: 48,
  fontWeight: "bold",
  fontFamily: "Open sans",
  marginBottom: 0,
});

const StrategicDriversTitle = styled(Box)({
  color: "#2B353B",
  fontSize: 20,
  marginTop: 48,
  fontWeight: "bold",
  fontFamily: "Open sans",
  marginBottom: 12,
});

const NorthStarHome = () => {
  const {
    data,
    isLoadingVisions,
    mutate,
    postVision,
    updateVision,
  } = useNorthStar();
  const [emptyData, setEmptyData] = useState(false);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const mutateVisions = useCallback(
    (newValues, shouldRevalidate) => mutate(newValues, shouldRevalidate),
    [data]
  );

  useEffect(() => {
    if (!data && !isLoadingVisions) {
      setEmptyData(true);
    } else {
      setEmptyData(false);
    }
  }, [data, isLoadingVisions]);

  const sortedStrategicDrivers = useMemo(() => {
    const strategicDrivers = [...(data?.strategicDrivers ?? [])];
    return strategicDrivers.sort(
      (a: any, b: any) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    );
  }, [data?.strategicDrivers]);

  const [isFormDirty, setFormDirty] = useState(false);
  const [isFormModified, setFormModified] = useState(false);

  const confirm = useConfirm();

  const handleModalClose = () => {
    if (isFormDirty) {
      if (!data || isFormModified) {
        confirm({
          title: "Are you sure you want to leave this page?",
          description: (
            <Typography>You will lose the changes you have made.</Typography>
          ),
          cancellationText: "Cancel",
          confirmationText: "Continue without saving",
        })
          .then(() => {
            setOpenModal(false);
            mutate();
          })
          .catch(noop);
      } else {
        setOpenModal(false);
      }
    } else {
      setOpenModal(false);
    }
  };

  return (
    <>
      <PageContainer>
        <TopBar />
        {isLoadingVisions ? (
          <WrapperPage>
            <Box>
              {!data?.visionStatement && isLoadingVisions ? (
                <>
                  <SkeletonVisionStatement />
                </>
              ) : null}
            </Box>
            <br />
            <MissionDescription>
              {!data?.missionStatement && isLoadingVisions ? (
                <>
                  <SkeletonMissionStatement />
                </>
              ) : null}
            </MissionDescription>
            <Mission>
              {!data?.strategicDrivers?.length && isLoadingVisions ? (
                <>
                  <SkeletonTitleStrategic />
                </>
              ) : null}
            </Mission>
            <WrapperCardSkeleton>
              <BoxSkeletonStrategicDrivers>
                <SkeletonStrategicDrivers />
              </BoxSkeletonStrategicDrivers>
              <BoxSkeletonStrategicDrivers>
                <SkeletonStrategicDrivers />
              </BoxSkeletonStrategicDrivers>
              <BoxSkeletonStrategicDrivers>
                <SkeletonStrategicDrivers />
              </BoxSkeletonStrategicDrivers>
              <BoxSkeletonStrategicDrivers>
                <SkeletonStrategicDrivers />
              </BoxSkeletonStrategicDrivers>
              <StrategicDriverList data={data?.strategicDrivers || []} />
            </WrapperCardSkeleton>
          </WrapperPage>
        ) : (
          <WrapperPage>
            {emptyData && !isLoadingVisions ? (
              ""
            ) : (
              <Box>
                <VisionTitle>
                  Vision
                  <DividerLine />
                </VisionTitle>
                <WrapperVisionFirstTextRow>
                  {data?.visionStatement}
                </WrapperVisionFirstTextRow>
              </Box>
            )}
            {emptyData && !isLoadingVisions ? (
              <EmptyNorthStar openCreateVision={() => setOpenModal(true)} />
            ) : (
              <>
                <Box>
                  <MissionTitle>
                    Mission
                    <DividerLine />
                  </MissionTitle>
                  <MissionDescription>
                    {data?.missionStatement}
                  </MissionDescription>
                </Box>
                <StrategicDriversTitle>
                  Strategic Drivers
                  <DividerLine />
                </StrategicDriversTitle>
                <WrapperStrategicDriversList>
                  <StrategicDriverList
                    vision={data}
                    data={sortedStrategicDrivers || []}
                    visionId={data?.id}
                  />
                </WrapperStrategicDriversList>
              </>
            )}
            <ModalNorthStarPage
              data={data}
              setOpenModal={setOpenModal}
              isOpenModal={isOpenModal}
              shouldHideEditIcon={emptyData && !isLoadingVisions}
              isLoadingVisions={isLoadingVisions}
              mutateVisions={mutateVisions}
              postVision={postVision}
              updateVision={updateVision}
              isFormDirty={isFormDirty}
              setIsFormDirty={setFormDirty}
              setFormModified={setFormModified}
              handleModalClose={handleModalClose}
            />
          </WrapperPage>
        )}
      </PageContainer>
      <WrapperFooter>
        <Footer />
      </WrapperFooter>
    </>
  );
};

export default NorthStarHome;
