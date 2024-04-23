import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import DashboardCard from "components/Charts/components/DashboardCard/DashboardCard";
import { ChartSizes } from "components/Charts/components/DashboardCard/interfaces/ChartSizes";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react";
import ExtendedTooltip from "views/ValueStreamManagement/components/ExtendedTooltip";

import DistributionTabView from "../../components/DistributionTabView";
import { NormalisationChartsData } from "../../interfaces/normalisationCharts";
import IndicatorCard from "../../components/IndicatorCard/IndicatorCard";
import {
  completedWorkTooltip,
  upcomingWorkTooltip,
  workInProcessTooltip,
} from "views/ValueStreamManagement/components/ExtendedTooltip/contents/demandDistributionTooltips";

interface Props {
  isLoading: boolean;
  data: NormalisationChartsData | null;
  currentDataAggregation: string;
  isEmpty?: boolean;
  normalisationChartsOptions?: { id: string; displayName: string }[];
  normalisationChartTag: string;
  setNormalisationChartTag?: (tag: string) => void;
  getColorByDisplayName: (key: string) => string | undefined;
  isValidating: boolean;
  error?: Error;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
  isDashboard?: boolean;
}

const previewData = {
  upcomingWork: {
    distribution: {
      Defects: 7,
      Features: 12,
    },
    historical: [
      {
        dateStart: "2024-01-01T00:00:00.000+11:00",
        dateEnd: "2024-01-07T23:59:59.999+11:00",
        values: {
          Defects: 3,
          Features: 8,
        },
      },
      {
        dateStart: "2024-01-08T00:00:00.000+11:00",
        dateEnd: "2024-01-14T23:59:59.999+11:00",
        values: {
          Defects: 5,
          Features: 8,
        },
      },
      {
        dateStart: "2024-01-15T00:00:00.000+11:00",
        dateEnd: "2024-01-21T23:59:59.999+11:00",
        values: {
          Defects: 4,
          Features: 6,
        },
      },
      {
        dateStart: "2024-01-22T00:00:00.000+11:00",
        dateEnd: "2024-01-28T23:59:59.999+11:00",
        values: {
          Defects: 3,
          Features: 11,
        },
      },
      {
        dateStart: "2024-01-29T00:00:00.000+11:00",
        dateEnd: "2024-02-04T23:59:59.999+11:00",
        values: {
          Defects: 3,
          Features: 11,
        },
      },
    ],
  },
  workInProcess: {
    distribution: {
      Defects: 1,
      Features: 1,
    },
    historical: [
      {
        dateStart: "2024-01-01T00:00:00.000+11:00",
        dateEnd: "2024-01-07T23:59:59.999+11:00",
        values: {
          Defects: 2,
          Features: 1,
        },
      },
      {
        dateStart: "2024-01-08T00:00:00.000+11:00",
        dateEnd: "2024-01-14T23:59:59.999+11:00",
        values: {
          Defects: 4,
          Features: 3,
        },
      },
      {
        dateStart: "2024-01-15T00:00:00.000+11:00",
        dateEnd: "2024-01-21T23:59:59.999+11:00",
        values: {
          Defects: 1,
          Features: 3,
        },
      },
      {
        dateStart: "2024-01-22T00:00:00.000+11:00",
        dateEnd: "2024-01-28T23:59:59.999+11:00",
        values: {
          Defects: 1,
          Features: 3,
        },
      },
      {
        dateStart: "2024-01-29T00:00:00.000+11:00",
        dateEnd: "2024-02-04T23:59:59.999+11:00",
        values: {
          Defects: 1,
          Features: 2,
        },
      },
    ],
  },
  completedWork: {
    distribution: {
      Defects: 5,
      Features: 2,
    },
    historical: [
      {
        dateStart: "2024-01-01T00:00:00.000+11:00",
        dateEnd: "2024-01-07T23:59:59.999+11:00",
        values: {
          Defects: 4,
          Features: 2,
        },
      },
      {
        dateStart: "2024-01-08T00:00:00.000+11:00",
        dateEnd: "2024-01-14T23:59:59.999+11:00",
        values: {
          Defects: 4,
          Features: 2,
        },
      },
      {
        dateStart: "2024-01-15T00:00:00.000+11:00",
        dateEnd: "2024-01-21T23:59:59.999+11:00",
        values: {
          Defects: 1,
          Features: 2,
        },
      },
      {
        dateStart: "2024-01-22T00:00:00.000+11:00",
        dateEnd: "2024-01-28T23:59:59.999+11:00",
        values: {
          Defects: 1,
          Features: 1,
        },
      },
      {
        dateStart: "2024-01-29T00:00:00.000+11:00",
        dateEnd: "2024-02-04T23:59:59.999+11:00",
        values: {
          Defects: 1,
          Features: 1,
        },
      },
    ],
  },
};

const NormalisationChartsAccordion = ({
  isLoading,
  data,
  currentDataAggregation,
  isEmpty,
  normalisationChartsOptions,
  normalisationChartTag,
  setNormalisationChartTag,
  error,
  getColorByDisplayName,
  isValidating,
  isDashboardEdit,
  isWidgetPreview,
  isDashboard,
}: Props) => {
  const dataRequestLoading = isLoading && isValidating;

  const upcomingWorkWidgetInfo = upcomingWorkTooltip;
  const workInProcessWidgetInfo = workInProcessTooltip;
  const completedWorkWidgetInfo = completedWorkTooltip;
  const customStyle = isDashboard
    ? {
        display: "grid",
        gridGap: "16px",
        gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
      }
    : {};

  if (!isWidgetPreview) {
    return (
      <Box display="flex" flexDirection="column" width="100%">
        <Box
          className="options"
          width="240px"
          marginLeft="22px"
          marginBottom="7px"
          marginTop="6px"
        >
          <Typography
            style={{ marginTop: "5px", marginBottom: "6px", fontWeight: 400 }}
          >
            Select a profile of work
          </Typography>
          <Dropdown
            disabled={!normalisationChartsOptions}
            options={
              normalisationChartsOptions
                ? normalisationChartsOptions.map((option) => ({
                    key: option.id,
                    text: option.displayName,
                  }))
                : []
            }
            defaultValue={normalisationChartTag}
            selectedKey={normalisationChartTag}
            onChange={(_e, item: IDropdownOption | undefined) => {
              if (setNormalisationChartTag && item) {
                setNormalisationChartTag(item.key.toString());
              }
            }}
          />
        </Box>
        <Box
          className={isDashboard ? "" : "delivery-page-grid full-width-chart"}
          style={customStyle}
        >
          <DashboardCard
            title="Upcoming Work"
            size={ChartSizes.small}
            isDashboardEdit={isDashboardEdit}
          >
            <DistributionTabView
              isLoading={!data?.upcomingWork || dataRequestLoading}
              data={data?.upcomingWork}
              currentDataAggregation={currentDataAggregation}
              getColorByDisplayName={getColorByDisplayName}
              isEmpty={isEmpty}
              error={error}
            />

            {!dataRequestLoading &&
              (upcomingWorkWidgetInfo?.length !== 0 ? (
                <ExtendedTooltip
                  maxWidth="md"
                  name="Upcoming Work"
                  content={upcomingWorkWidgetInfo}
                />
              ) : (
                <></>
              ))}
          </DashboardCard>
          <DashboardCard
            title="Work in Progress"
            size={ChartSizes.small}
            isDashboardEdit={isDashboardEdit}
          >
            <DistributionTabView
              isLoading={!data?.workInProcess || dataRequestLoading}
              data={data?.workInProcess}
              currentDataAggregation={currentDataAggregation}
              getColorByDisplayName={getColorByDisplayName}
              isEmpty={isEmpty}
              error={error}
            />
            {!dataRequestLoading &&
              (workInProcessWidgetInfo?.length !== 0 ? (
                <ExtendedTooltip
                  maxWidth="md"
                  name="Work in Progress"
                  content={workInProcessWidgetInfo}
                />
              ) : (
                <></>
              ))}
          </DashboardCard>
          <DashboardCard
            title="Completed Work"
            size={ChartSizes.small}
            isDashboardEdit={isDashboardEdit}
          >
            <DistributionTabView
              isLoading={!data?.completedWork || dataRequestLoading}
              data={data?.completedWork}
              currentDataAggregation={currentDataAggregation}
              getColorByDisplayName={getColorByDisplayName}
              isEmpty={isEmpty}
              error={error}
            />
            {!dataRequestLoading &&
              (completedWorkWidgetInfo?.length !== 0 ? (
                <ExtendedTooltip
                  maxWidth="md"
                  name="Completed Work"
                  content={completedWorkWidgetInfo}
                />
              ) : (
                <></>
              ))}
          </DashboardCard>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box display="flex" flexDirection="column" height="20%">
        <Box display="grid" gridTemplateColumns={"repeat(3, 2fr)"} gridGap={8}>
          <IndicatorCard title="Upcoming Work" hideWidgetInfo>
            <DistributionTabView
              isLoading={!previewData?.upcomingWork || dataRequestLoading}
              data={previewData?.upcomingWork}
              currentDataAggregation={currentDataAggregation}
              getColorByDisplayName={getColorByDisplayName}
              isEmpty={isEmpty}
              error={error}
            />
          </IndicatorCard>
          <IndicatorCard title="Work in Progress" hideWidgetInfo>
            <DistributionTabView
              isLoading={!previewData?.workInProcess || dataRequestLoading}
              data={previewData?.workInProcess}
              currentDataAggregation={currentDataAggregation}
              getColorByDisplayName={getColorByDisplayName}
              isEmpty={isEmpty}
              error={error}
            />
          </IndicatorCard>
          <IndicatorCard title="Completed Work" hideWidgetInfo>
            <DistributionTabView
              isLoading={!previewData?.completedWork || dataRequestLoading}
              data={previewData?.completedWork}
              currentDataAggregation={currentDataAggregation}
              getColorByDisplayName={getColorByDisplayName}
              isEmpty={isEmpty}
              error={error}
            />
          </IndicatorCard>
        </Box>
      </Box>
    );
  }
};

export default NormalisationChartsAccordion;
