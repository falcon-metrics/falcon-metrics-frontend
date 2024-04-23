import { ReactNode } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TourCard from '../components/TourCard';
import { CSSProperties } from '@material-ui/styles';
import { useRouteMatch } from 'react-router';
import { ReactourStep } from 'reactour';
import useAuthentication from 'hooks/useAuthentication';
import useTrialInfo from 'hooks/fetch/useTrialInfo';

const defaultCardStyle: CSSProperties = {
  backgroundColor: 'rgb(0 53 148)',
  color: 'white',
  fontFamily: 'Open Sans',
  fontSize: 14,
};

const defaultProperties = {
  style: defaultCardStyle,
  highlightedMaskClassName: 'customTour',
  className: 'customTour',
  stepInteraction: false,
  rounded: 10,
};

type StepConfig = {
  rounded?: number;
  dataTourSelector: string;
  content: () => ReactNode;
  position: ReactourStep['position'];
  action?(node: any): void;
  shouldNotDisplay?: boolean;
} & Partial<typeof defaultProperties>;

type GetStepsFunction = ({
  isAdmin,
  hasDatasource,
  widthOver1172,
}: {
  isAdmin: boolean;
  hasDatasource: boolean;
  widthOver1172: boolean;
}) => StepConfig[];

const getAnalyticsDashboardSteps: GetStepsFunction = ({
  isAdmin,
  hasDatasource,
  widthOver1172,
}) => [
  {
    dataTourSelector: 'content-main-container',
    content: () => (
      <TourCard
        title="Flow Analytics"
        text={`Gain visibility to customer-centric and flow-based metrics and
        analytics from your data on the flow analytics.`}
      />
    ),
    position: [window.innerWidth - 360, 10],
    action: (node) => {
      // by using this, focus trap is temporary disabled
      node.focus();
    },
  },
  {
    dataTourSelector: 'perspective-of-flow',
    content: () => {
      //TODO leo should remove it when summary is openend for all customers
      const countOfPerspectives =
        document?.querySelector('.content-navigation > div > div > div')
          ?.childElementCount || 5;

      return (
        <TourCard
          title="Perspectives of Flow"
          text={`Use these ${countOfPerspectives} perspectives to get insights on
          time to market, predictability, productivity, quality and flow
          efficiency.`}
        />
      );
    },
    position: 'left',
  },
  {
    dataTourSelector: 'boards-and-aggregations',
    content: () => (
      <TourCard
        title="Boards and Aggregations"
        text={`Use this three-tier navigation system to switch between the delivery
        performance data of different teams, team of teams and portfolios.`}
      />
    ),
    position: 'right',
  },
  {
    dataTourSelector: 'filter-panel',
    content: () => (
      <TourCard
        title="Filter Panel"
        text={'Use the filter panel to perform deeper contextual analysis.'}
      />
    ),
    position: 'left',
  },
  {
    dataTourSelector: 'date-range',
    content: () => (
      <TourCard
        title="Date Range"
        text={
          'The displayed date range indicates the period being considered for the analysis and displayed in the metrics and analytics.'
        }
      />
    ),
    position: 'left',
    shouldNotDisplay: !widthOver1172,
  },
  {
    dataTourSelector: 'logo',
    content: () => (
      <TourCard title="Logo" text={'Your company’s logo will come here.'} />
    ),
    position: 'right',
  },
  {
    dataTourSelector: 'connect-your-data',
    content: () => {
      let title: string, text: string;
      if (hasDatasource) {
        title = 'Manage Data Sources';
        text = 'Click here to add, delete or edit your data sources';
      } else {
        title = 'Connect your Data';
        text = 'Click here to add your data in Falcon Metrics';
      }
      return <TourCard title={title} text={text} />;
    },
    position: 'right',
    shouldNotDisplay: !isAdmin,
  },
];

const pagesTourStepsMap: Record<string, GetStepsFunction> = {
  'analytics-dashboard': getAnalyticsDashboardSteps,
};

export const useTourStepsGetter = (): GetStepsFunction | undefined => {
  const { params } = useRouteMatch<{ page: string }>('/:page') ?? {};
  const page = params?.page ?? '';
  return pagesTourStepsMap[page];
};

const useTourSteps = (): ReactourStep[] => {
  const widthOver1172 = useMediaQuery('(min-width: 1172px)');
  const { isAdmin } = useAuthentication();
  const { trialInfo } = useTrialInfo();
  const hasDatasource = trialInfo?.hasDatasource ?? false;

  const stepsGetter = useTourStepsGetter();
  const steps = stepsGetter?.({
    isAdmin,
    hasDatasource,
    widthOver1172,
  });

  if (!steps) {
    return [];
  }

  return steps
    .filter((step) => !step.shouldNotDisplay)
    .map((step, i) => ({
      ...defaultProperties,
      ...step,
      selector: `[data-tour="${step.dataTourSelector}"]`,
      navDotAriaLabel: `Go to step ${i + 2}`,
    }));
};

export default useTourSteps;
