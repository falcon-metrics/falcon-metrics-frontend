import { isObject, isUndefined } from 'lodash';
import {
  parseTrendAnalysisStructure,
} from 'views/ValueStreamManagement/utils/parseValueStreamManagement';
import {
  parseNumber,
  parseString,
} from 'views/ValueStreamManagement/utils/parsing';
import { HistoricalTabEntry, WidgetInformation } from '../../interfaces/common';
import { CustomerValueCriterion, FitnessCriteriaData, FlowEfficiencyCriterion, PredictabilityCriterion, ProductivityCriterion, SpeedCriterion, ServiceLevelExpectationCriterion, FitnessCriteriaWidgetInformation, SpeedValues } from '../../interfaces/fitnessCriteria';

const parseSpeedCriterion = (entry: object): SpeedCriterion | undefined => {
  try {
    const portfolio: SpeedValues = entry['portfolio'];
    const team: SpeedValues = entry['team'];
    const ic: SpeedValues = entry['ic'];

    const icPercentile85thChart: HistoricalTabEntry[] = entry['icPercentile85thChart'];
    const teamPercentile85thChart: HistoricalTabEntry[] = entry['teamPercentile85thChart'];
    const portfolioPercentile85thChart: HistoricalTabEntry[] = entry['portfolioPercentile85thChart'];

    const timeToCommit85thPercentileIC: HistoricalTabEntry[] = entry['timeToCommit85thPercentileIC'];
    const timeToCommit85thPercentileTeam: HistoricalTabEntry[] = entry['timeToCommit85thPercentileTeam'];
    const timeToCommit85thPercentilePortfolio: HistoricalTabEntry[] = entry['timeToCommit85thPercentilePortfolio'];

    const industryStandardMessage: string = entry['industryStandardMessage'];

    const requiredProperties = [
      portfolio,
      team,
    ];

    if (requiredProperties.some(isUndefined)) {
      throw new Error(
        'Fitness Criteria parsing failed. Missing SpeedCriterion properties.',
      );
    }

    const speedCriterion: SpeedCriterion = {
      portfolio,
      team,
      ic,

      icPercentile85thChart,
      teamPercentile85thChart,
      portfolioPercentile85thChart,

      timeToCommit85thPercentileIC,
      timeToCommit85thPercentileTeam,
      timeToCommit85thPercentilePortfolio,

      industryStandardMessage
    };

    return speedCriterion;

  } catch (error) {
    return undefined;
  }
};

const parsePredictabilityCriterion = (entry: object): PredictabilityCriterion | undefined => {
  try {
    const leadtime: unknown = entry['leadtime'];
    const throughput: unknown = entry['throughput'];
    const leadTimeHistorical: HistoricalTabEntry[] = entry['leadTimeHistorical'];
    const throughputHistorical: HistoricalTabEntry[] = entry['throughputHistorical'];

    const requiredProperties = [
      leadtime,
      throughput,
    ];

    if (requiredProperties.some(isUndefined)) {
      throw new Error(
        'Fitness Criteria parsing failed. Missing PredictabilityCriterion properties.',
      );
    }

    const predictability: PredictabilityCriterion = {
      leadtime: parseString(leadtime),
      throughput: parseString(throughput),
      leadTimeHistorical,
      throughputHistorical
    };

    return predictability;
  } catch (error) {
    return undefined;
  }
};

const parseProductivity = (entry: object): ProductivityCriterion | undefined => {
  try {
    const mean: unknown = entry['mean'];
    const current: unknown = entry['current'];
    const lastWeek: unknown = entry['lastWeek'];
    const trendAnalysis: unknown = entry['trendAnalysis'];
    const productivityLabel: unknown = entry['productivityLabel'];
    const productivityColor: unknown = entry['productivityColor'];
    const historical: HistoricalTabEntry[] = entry['historical'];

    const requiredProperties = [
      mean,
      current,
      lastWeek,
      trendAnalysis,
      productivityLabel,
    ];

    if (requiredProperties.some(isUndefined)) {
      throw new Error(
        'Fitness Criteria parsing failed. Missing ProductivityCriterion properties.',
      );
    }

    const productivity: ProductivityCriterion = {
      mean: parseNumber(mean),
      current: parseNumber(current),
      lastWeek: parseNumber(lastWeek),
      trendAnalysis: parseTrendAnalysisStructure(entry, 'trendAnalysis'),
      productivityLabel: parseString(productivityLabel),
      productivityColor: parseString(productivityColor),
      historical
    };

    return productivity;
  } catch (error) {
    return undefined;
  }
};

const parseCustomerValue = (entry: object): CustomerValueCriterion | undefined => {
  try {
    const customerValueWorkPercentage: unknown =
      entry['customerValueWorkPercentage'];
    const historical: HistoricalTabEntry[] = entry['historical'];
    const industryStandardMessage: string = entry['industryStandardMessage'];

    if (customerValueWorkPercentage === undefined) {
      throw new Error(
        'Fitness Criteria parsing failed. Missing CustomerValueCriterion properties.',
      );
    }

    const customerValue: CustomerValueCriterion = {
      customerValueWorkPercentage: parseNumber(customerValueWorkPercentage),
      historical,
      industryStandardMessage
    };

    return customerValue;
  } catch (error) {
    return undefined;
  }
};

const parseFlowEfficiency = (entry: object): FlowEfficiencyCriterion | undefined => {
  try {
    const averageOfWaitingTime: unknown = entry['averageOfWaitingTime'];
    const industryStandardMessage: string = entry['industryStandardMessage'];

    if (averageOfWaitingTime === undefined) {
      throw new Error(
        'Fitness Criteria parsing failed. Missing FlowEfficiencyCriterion properties.',
      );
    }

    const flowEfficiency: FlowEfficiencyCriterion = {
      averageOfWaitingTime: parseNumber(averageOfWaitingTime),
      industryStandardMessage
    };

    return flowEfficiency;
  } catch (error) {
    return undefined;
  }
};

const parseServiceLevelExpectation = (entry: object): ServiceLevelExpectationCriterion | undefined => {
  try {
    const serviceLevelExpectation: unknown = entry['serviceLevelExpectation'];
    const historical: HistoricalTabEntry[] = entry['historical'];
    let grade: string = entry['grade'];
    const industryStandardMessage: string = entry['industryStandardMessage'];

    if (serviceLevelExpectation === undefined) {
      throw new Error(
        'Fitness Criteria parsing failed. Missing ServiceLevelExpectationCriterion properties.',
      );
    }

    if (
      !grade &&
      serviceLevelExpectation &&
      typeof serviceLevelExpectation === 'number' &&
      !isNaN(serviceLevelExpectation)
    ) {
      console.log('Used grade fallback due to missing grade from backend');
      if (serviceLevelExpectation < 50) {
        grade = 'F';
      } else {
        const options = ['D', 'C -', 'C', 'C +', 'B -', 'B', 'B +', 'A -', 'A', 'A +'];
        const t = serviceLevelExpectation;
        grade = options[Math.floor(options.length * (t - 45) / 50)];
      }
    }

    const serviceLevel: ServiceLevelExpectationCriterion = {
      serviceLevelExpectation: parseNumber(serviceLevelExpectation),
      historical,
      grade,
      industryStandardMessage
    };

    return serviceLevel;
  } catch (error) {
    return undefined;
  }
};

const parseWidgetInformation = (entry: WidgetInformation): FitnessCriteriaWidgetInformation | undefined => {
  try {
    const speed: WidgetInformation[] = entry['speed'];
    const serviceLevelExpectation: WidgetInformation[] = entry['serviceLevelExpectation'];
    const predictability: WidgetInformation[] = entry['predictability'];
    const productivity: WidgetInformation[] = entry['productivity'];
    const customerValue: WidgetInformation[] = entry['customerValue'];
    const flowEfficiency: WidgetInformation[] = entry['flowEfficiency'];

    const widgetInfo: FitnessCriteriaWidgetInformation = {
      speed,
      serviceLevelExpectation,
      predictability,
      productivity,
      customerValue,
      flowEfficiency
    };

    return widgetInfo;
  } catch (error) {
    return undefined;
  }
};

export const parseFitnessCriteriaData = (data: unknown): FitnessCriteriaData | null => {
  if (!isObject(data)) {
    return null;
  }

  const speed: unknown = data['speed'];
  const parsedSpeed = isObject(speed)
    ? parseSpeedCriterion(speed)
    : undefined;

  const serviceLevelExpectation: unknown = data['serviceLevelExpectation'];
  const parsedServiceLevelExpectation = isObject(serviceLevelExpectation)
    ? parseServiceLevelExpectation(serviceLevelExpectation)
    : undefined;

  const predictability: unknown = data['predictability'];
  const parsedPredictability = isObject(predictability)
    ? parsePredictabilityCriterion(predictability)
    : undefined;

  const productivity: unknown = data['productivity'];
  const parsedProductivity = isObject(productivity)
    ? parseProductivity(productivity)
    : undefined;

  const customerValue: unknown = data['customerValue'];
  const parsedCustomerValue = isObject(customerValue)
    ? parseCustomerValue(customerValue)
    : undefined;

  const flowEfficiency: unknown = data['flowEfficiency'];
  const parsedFlowEfficiency = isObject(flowEfficiency)
    ? parseFlowEfficiency(flowEfficiency)
    : undefined;

  const widgetInformation: WidgetInformation = data['widgetInformation'];
  const parsedWidgetInformation = isObject(widgetInformation)
    ? parseWidgetInformation(widgetInformation)
    : undefined;

  const parsedData: FitnessCriteriaData = {
    speed: parsedSpeed,
    serviceLevelExpectation: parsedServiceLevelExpectation,
    predictability: parsedPredictability,
    productivity: parsedProductivity,
    customerValue: parsedCustomerValue,
    flowEfficiency: parsedFlowEfficiency,
    widgetInformation: parsedWidgetInformation
  };

  return parsedData;
};
