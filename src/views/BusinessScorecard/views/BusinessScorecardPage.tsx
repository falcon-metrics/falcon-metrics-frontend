import { memo, useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import BaseModal from "components/UI/BaseModal/BaseModal2";
import { GridToolbarContainer } from "@mui/x-data-grid-pro";
import { styled } from "@material-ui/styles";
import { Perspective, MetricsEntry } from "../interfaces/interfaces";
import PerspectiveTable from "../components/PerspectiveTable";
import PerspectiveForm from "../components/PerspectiveForm";
import MetricsTable from "../components/MetricsTable";
import MetricForm from "../components/MetricForm";
import { usePerspectives } from "../hooks/usePerspectives";
import { useMetrics } from "../hooks/useMetrics";
import _ from "lodash";
import useAuthentication from "hooks/useAuthentication";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Context } from "views/Dashboard/views/AnalyticsDashboard/interfaces/Context";
import ButtonTooltip from "views/Strategies/components/Tooltip/ButtonTooltip";

export const GridToolbarWrapper = styled(GridToolbarContainer)({
  display: "flex",
  justifyContent: "flex-end",
});

export const AddButton = styled(Button)({
  color: "#323130",
  fontFamily: "Open Sans",
  fontSize: 14,
  lineHeight: 0,
});

const CenteredBox = styled(Box)({
  height: 500,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const EmptyStateAddButton = styled(Button)({
  marginRight: 25,
});

const TypographyWithFont = styled(Typography)({
  fontFamily: "Open Sans , sans-serif",
});

type BusinessScorecardPageProps = {
  children: any;
  contexts: Context[] | undefined;
  isEmpty: boolean;
};
const BusinessScorecardPage = (props: BusinessScorecardPageProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openPerspectiveModal, setOpenPerspectiveModal] = useState<boolean>(
    false
  );
  const [openMetricsModal, setOpenMetricsModal] = useState<boolean>(false);
  const [openEditMetricModal, setOpenEditMetricModal] = useState<boolean>(
    false
  );
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [perspectives, setPerspectives] = useState<Perspective[]>([]);
  const [metrics, setMetrics] = useState<MetricsEntry[]>([]);
  const { isAdminOrPowerUser } = useAuthentication();

  const [perspectiveModalData, setPerspectiveModalData] = useState<Perspective>(
    {
      id: "",
      name: "",
    }
  );

  const [metricModalData, setMetricModalData] = useState<MetricsEntry>({
    id: "",
    name: "",
    type: "",
    lowerLimit: 0,
    upperLimit: 0,
    target: 0,
    metricValues: [],
    perspective: "",
    context: "",
  });

  const {
    data: perspectivesData,
    mutate,
    updatePerspectives,
  } = usePerspectives();
  const {
    data: metricsData,
    mutate: mutateMetrics,
    updateMetrics,
  } = useMetrics();

  useEffect(() => {
    if (perspectivesData && perspectivesData?.length > 0) {
      setPerspectives(perspectivesData);
    }
  }, [perspectivesData]);

  useEffect(() => {
    if (metricsData && metricsData?.length > 0) {
      setMetrics(metricsData);
    }
  }, [metricsData]);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const openPerspectiveTableModal = () => {
    setOpen(!open);
    handleMenuClose();
  };

  const openMetricsTableModal = () => {
    setOpenMetricsModal(!openMetricsModal);
    handleMenuClose();
  };

  const onSavePerspectives = async (
    updatedPerspectives: Perspective[] | undefined = undefined
  ) => {
    const perspectivesUpdated = updatedPerspectives || perspectives;
    if (
      JSON.stringify(perspectivesData) !== JSON.stringify(perspectivesUpdated)
    ) {
      const removedPerspectives: Perspective[] = [];
      perspectivesData.map((perspective) => {
        if (!perspectivesUpdated.find((i) => i.id === perspective.id)) {
          removedPerspectives.push(perspective);
        }
      });
      if (removedPerspectives.length > 0 && metricsData) {
        const metricsCopy = _.cloneDeep(metricsData);
        const updatedMetrics = metricsCopy.filter(
          (x) => !removedPerspectives.map((i) => i.id).includes(x.perspective)
        );
        mutateMetrics({ data: updatedMetrics }, false);
        updateMetrics(updatedMetrics, metricsData || []);
      }
      mutate({ data: perspectivesUpdated }, false);
      updatePerspectives(perspectivesUpdated, perspectivesData || []);
    }
  };

  const onSaveMetrics = async (
    updatedMetrics: MetricsEntry[] | undefined = undefined
  ) => {
    const metricsUpdated = updatedMetrics || metrics;
    if (JSON.stringify(metricsData) !== JSON.stringify(metricsUpdated)) {
      mutateMetrics({ data: metricsUpdated }, false);
      updateMetrics(metricsUpdated, metricsData || []);
      if (JSON.stringify(perspectivesData) !== JSON.stringify(perspectives)) {
        mutate({ data: perspectives }, false);
        updatePerspectives(perspectives, perspectivesData || []);
      }
    }
  };

  const onAddMetric = () => {
    const newMetric: MetricsEntry = {
      id: undefined,
      name: "",
      type: "",
      lowerLimit: 0,
      upperLimit: 0,
      target: 0,
      metricValues: [],
      perspective: undefined,
      context: "",
    };
    handleMenuClose();
    setMetricModalData(newMetric);
    setOpenEditMetricModal(!openEditMetricModal);
  };

  //Setting scorecard data on every render since useEffect when swr data changes is not triggering if both metrics and perspectives complete at the same time.
  // setScorecardData();

  const [isFormDirty, setFormDirty] = useState(false);

  return (
    <Box
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Box padding={3} flex={1}>
        {!props.isEmpty ? (
          <Box
            style={{
              flexDirection: "column",
              marginBottom: 25,
              display: "flex",
            }}
          >
            {isAdminOrPowerUser && (
              <Box style={{ display: "flex", alignSelf: "flex-end", flex: 1 }}>
                <IconButton size="small" onClick={handleMenuOpen}>
                  <MoreVertIcon style={{ fontSize: 30 }} />
                </IconButton>
              </Box>
            )}
            {props.children}
          </Box>
        ) : (
          <CenteredBox>
            <Box>
              <TypographyWithFont>
                No perspectives and metrics have been configured for this
                context. Please proceed to add a metric
              </TypographyWithFont>
              <Box display="flex" justifyContent="center" mt={1}>
                
                <ButtonTooltip text="add new Metric">
                  <EmptyStateAddButton variant="contained" color="primary" onClick={onAddMetric} disabled={!isAdminOrPowerUser}>
                    Add Metric
                  </EmptyStateAddButton>
                </ButtonTooltip>
              </Box>
            </Box>
          </CenteredBox>
        )}
      </Box>
      <BaseModal
        open={open}
        setOpen={setOpen}
        maxWidth="sm"
        title={"Perspectives"}
        disableEscKeyDown
        disableBackdropClick
      >
        <PerspectiveTable
          setPerspectiveModalData={setPerspectiveModalData}
          perspectives={perspectives}
          setPerspectives={setPerspectives}
          openPerspectiveModal={openPerspectiveModal}
          setOpenPerspectiveModal={setOpenPerspectiveModal}
          onSave={onSavePerspectives}
          metrics={metrics}
        />
      </BaseModal>
      <BaseModal
        open={openPerspectiveModal}
        setOpen={setOpenPerspectiveModal}
        maxWidth="sm"
        title={
          perspectiveModalData?.id === undefined
            ? "Add Perspective"
            : "Edit Perspective"
        }
        disableEscKeyDown={!isFormDirty} //disable all the time except when form is dirty, a confirmation should show
        disableBackdropClick
        isFormDirty={isFormDirty}
      >
        <PerspectiveForm
          perspectiveModalData={perspectiveModalData}
          setPerspectiveModalData={setPerspectiveModalData}
          openPerspectiveModal={openPerspectiveModal}
          setOpenPerspectiveModal={setOpenPerspectiveModal}
          perspectives={perspectives}
          setPerspectives={setPerspectives}
          onSavePerspectives={onSavePerspectives}
          isDirty={isFormDirty}
          setFormDirty={setFormDirty}
        />
      </BaseModal>
      <BaseModal
        open={openMetricsModal}
        setOpen={setOpenMetricsModal}
        maxWidth="md"
        title={"Metrics"}
        disableEscKeyDown
        disableBackdropClick
      >
        <MetricsTable
          contexts={props.contexts}
          metrics={metrics}
          setMetrics={setMetrics}
          setMetricModalData={setMetricModalData}
          setOpenEditMetricModal={setOpenEditMetricModal}
          openEditMetricModal={openEditMetricModal}
          perspectives={perspectives}
          onSave={onSaveMetrics}
        />
      </BaseModal>
      <BaseModal
        open={openEditMetricModal}
        setOpen={setOpenEditMetricModal}
        maxWidth="md"
        title={metricModalData?.id === undefined ? "Add Metric" : "Edit Metric"}
        disableEscKeyDown={!isFormDirty} //disable all the time except when form is dirty, a confirmation should show
        disableBackdropClick
        isFormDirty={isFormDirty}
      >
        <MetricForm
          perspectives={perspectives}
          setPerspectives={setPerspectives}
          metricModalData={metricModalData}
          setMetricModalData={setMetricModalData}
          metrics={metrics}
          setMetrics={setMetrics}
          openEditMetricModal={openEditMetricModal}
          setOpenEditMetricModal={setOpenEditMetricModal}
          onSaveMetrics={onSaveMetrics}
          isFormDirty={isFormDirty}
          setFormDirty={setFormDirty}
        />
      </BaseModal>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <MenuItem onClick={openPerspectiveTableModal}>
          Manage Perspectives
        </MenuItem>
        <MenuItem onClick={openMetricsTableModal}>Manage Metrics</MenuItem>
        {/* Hide Add Perspective because it will not show unless metric is added */}
        {/* <MenuItem onClick={onAddPerspective}>Add Perspective</MenuItem> */}
        <MenuItem onClick={onAddMetric}>Add Metric</MenuItem>
      </Menu>
    </Box>
  );
};

export default memo(BusinessScorecardPage);
