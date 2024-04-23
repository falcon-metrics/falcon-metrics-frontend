import { ObeyaBurnupSeries } from 'views/Governance/views/GovernanceObeya/hooks/useObeya';

const isEmptyBurnupChart = (data?: ObeyaBurnupSeries) => {
    if (!data) {
        return false;
    }

    const { dates, accomplishedWork, dailyTargets, scope } = data;
    const fields = [dates, accomplishedWork, dailyTargets, scope]

    const arrayIsValid = (array) => array && array.length !== 0;
    const areFieldsNotEmpty = fields.every(arrayIsValid);

    return areFieldsNotEmpty;
}

export default isEmptyBurnupChart;
