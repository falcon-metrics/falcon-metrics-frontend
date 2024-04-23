import { ObeyaBurndownSeries } from "views/Governance/views/GovernanceObeya/hooks/useObeya";

const isEmptyBurndownChart = (data?: ObeyaBurndownSeries) => {
  if (!data) {
    return false;
  }

  const { dates, remainingWork, dailyTargets } = data;
  const fields = [dates, remainingWork, dailyTargets];

  const arrayIsValid = (array) => array && array.length !== 0;
  const areFieldsNotEmpty = fields.every(arrayIsValid);

  return areFieldsNotEmpty;
};

export default isEmptyBurndownChart;
