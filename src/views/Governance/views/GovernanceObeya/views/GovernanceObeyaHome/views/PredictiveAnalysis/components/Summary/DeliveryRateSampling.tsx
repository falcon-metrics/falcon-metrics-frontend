import { Box, Button, Typography } from "@material-ui/core";
import { ObeyaContext, SettingsData, SimulationAdditionalInfo } from "../../types";
import BaseModal from "components/UI/BaseModal/BaseModal2";
import ThroughputPreview from "./ThroughputPreview";
import { useState } from "react";
interface Props {
  simulationData: SimulationAdditionalInfo;
  settingsData?: SettingsData;
  setAnalysisData?: any;
  setSettingsData?: any;
  roomId: string;
  contexts: ObeyaContext[];
}

export const DeliveryRateSampling = ({
  simulationData, settingsData, setAnalysisData, setSettingsData, roomId, contexts }: Props) => {
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);

  return (
    <Box display="flex" flexDirection="column" mb={1}>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box
          display="flex"
          flexDirection="row"
          style={{ borderRadius: 5, backgroundColor: "#f0f0f0", padding: 5 }}
        >
          <Typography style={{ fontSize: 10, fontFamily: "Open Sans" }}>
            Date range:&nbsp;
          </Typography>
          <Typography style={{ fontSize: 10, fontFamily: "Open Sans" }}>
            &nbsp;{simulationData.dateRangeValue}
          </Typography>
        </Box>
        <Typography
          style={{
            fontSize: 10,
            fontFamily: "Open Sans",
            color: "#bdbdbd",
            padding: 5,
          }}
        >
          {simulationData.duration} days
        </Typography>
      </Box>
      <Box display='flex' mt={2}>
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography style={{ fontSize: 10, fontFamily: "Open Sans" }}>
              Dataset Size:&nbsp;
            </Typography>
            <Typography
              style={{ fontSize: 10, fontFamily: "Open Sans", fontWeight: 600 }}
            >
              {simulationData.dataSetSize}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <Typography
              style={{
                fontSize: 10,
                fontFamily: "Open Sans",
                wordWrap: "break-word",
              }}
            >
              No. of samples where throughput is greater than 0:
            </Typography>
            <Typography
              style={{ fontSize: 10, fontFamily: "Open Sans", fontWeight: 600 }}
            >
              &nbsp;{simulationData.throughputDays}
            </Typography>
          </Box>
        </Box>
        <Box ml={3}>
          <Button size="small" variant="contained" color="primary" onClick={() => { setOpenPreviewModal(true); }}>Preview sample</Button>
        </Box>
      </Box>
      <BaseModal
        open={openPreviewModal}
        setOpen={setOpenPreviewModal}
        maxWidth="md"
        title="Preview delivery rate sample"
      >
        <ThroughputPreview
          settingsData={settingsData}
          setAnalysisData={setAnalysisData}
          setSettingsData={setSettingsData}
          roomId={roomId}
          setOpenPreviewModal={setOpenPreviewModal}
          contexts={contexts} />
      </BaseModal>
    </Box>
  );
};
