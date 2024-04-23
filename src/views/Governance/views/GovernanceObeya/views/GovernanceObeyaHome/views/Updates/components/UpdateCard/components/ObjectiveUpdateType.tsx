import { Box } from "@material-ui/core";

import StringDisplay from "./StringDisplay";
import StatusDisplay from "./StatusDisplay";

type Props = {
  metaData: any;
  isSmall?: boolean;
};

const ObjectiveUpdateType = ({
  metaData, isSmall
}: Props) => {
  const statusField = metaData.fields && metaData.fields.find(x => x.name === 'ratingId');
  const achievedField = metaData.fields && metaData.fields.find(x => x.name === 'achieved');
  const descriptionField = metaData.fields && metaData.fields.find(x => x.name === 'objectiveDescription');
  return (
    <>
      {
        (metaData.action === 'create' || metaData.action === 'delete') ?
          (
            <Box>
              {descriptionField && (
                <StringDisplay label="Description" value={descriptionField.value} isSmall={isSmall} />
              )}
              {statusField && (
                <StatusDisplay label="Status" value={statusField.value} isSmall={isSmall} />
              )}
              {achievedField && (
                <StringDisplay label="Achieved" value={achievedField.value ? 'Completed' : 'Not Completed'} isSmall={isSmall} />
              )}
            </Box>
          ) : (
            <Box>
              {descriptionField && (
                <StringDisplay label="Description" previousValue={descriptionField.previousValue} value={descriptionField.value} isSmall={isSmall} />
              )}
              {statusField && (
                <StatusDisplay label="Status" previousValue={statusField.previousValue} value={statusField.value} isSmall={isSmall} />
              )}
              {achievedField && (
                <StringDisplay label="Achieved" previousValue={achievedField.previousValue ? 'Completed' : 'Not Completed'} value={achievedField.value ? 'Completed' : 'Not Completed'} isSmall={isSmall} />
              )}
            </Box>
          )}
    </>
  );
};

export default ObjectiveUpdateType;
