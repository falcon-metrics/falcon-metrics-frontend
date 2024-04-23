import { ForecastLevel } from "../../types";

export const TeamPerformanceLevels = {
  defaultValue: 100,
  range: [
    {
      value: 25,
      text: 'Significantly Slower'
    },
    {
      value: 50,
      text: 'Slower'
    },
    {
      value: 75,
      text: 'Slightly Slower'
    },
    {
      value: 100,
      text: 'Normal'
    },
    {
      value: 125,
      text: "Slightly Faster"
    },
    {
      value: 150,
      text: 'Faster'
    },
    {
      value: 175,
      text: 'Significantly Faster'
    }
  ]
};

export const WorkItemLevelNameMap: {
  [key: string]: {
    display: string,
    dataKey: keyof ForecastLevel,
  };
} = {
  portfolio: {
    display: 'Portfolio',
    dataKey: 'forecastPortfolio'
  },
  team: {
    display: 'Team',
    dataKey: 'forecastTeam'
  },
  individualContributor: {
    display: 'Individual Contributor',
    dataKey: 'forecastIndividualContributor'
  },
};

export const workExpansionLevels = [
  {
    value: 100,
    display: 'Already fully expanded'
  },
  {
    value: 150,
    display: 'Mostly Expanded'
  },
  {
    value: 200,
    display: 'Somewhat Expanded'
  },
  {
    value: 300,
    display: 'Not Expanded'
  },
];

export const predictiveAnalysisPrecisionLevels = [
  {
    value: 'day',
    display: 'Daily'
  },
  {
    value: 'week',
    display: 'Weekly'
  }
];
