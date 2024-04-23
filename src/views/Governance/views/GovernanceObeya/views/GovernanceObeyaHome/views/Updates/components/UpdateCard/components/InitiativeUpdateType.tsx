import { formatDate } from "utils/dateTime";
import StringDisplay from "./StringDisplay";
import StatusDisplay from "./StatusDisplay";

type Props = {
  metaData: any;
  isSmall?: boolean;
};

const InitiativeUpdateType = ({ metaData, isSmall }: Props) => {
  const statusField = metaData && metaData.fields && metaData.fields.find(x => x.name === 'ratingId');
  const endDateField = metaData && metaData.fields && metaData.fields.find(x => x.name === 'endDate');

  return (
    <>
      {endDateField && (
        <StringDisplay label="Target Date" previousValue={endDateField.previousValue ? formatDate(endDateField.previousValue) : ''} value={formatDate(endDateField.value)} isSmall={isSmall} />
      )}
      {statusField && (
        <StatusDisplay label="Status" previousValue={statusField.previousValue} value={statusField.value} isSmall={isSmall} />
      )}
    </>
  );
};

export default InitiativeUpdateType;;;