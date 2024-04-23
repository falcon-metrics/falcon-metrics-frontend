import { Box } from "@material-ui/core";

import StringDisplay from "./StringDisplay";

type Props = {
  metaData: any;
  isSmall?: boolean;
};

const RiskUpdateType = ({ metaData, isSmall }: Props) => {
  const likelihoodField = metaData.fields && metaData.fields.find(x => x.name === 'likelihood');
  const impactOnScheduleField = metaData.fields && metaData.fields.find(x => x.name === 'impactOnSchedule');
  const impactOnCostField = metaData.fields && metaData.fields.find(x => x.name === 'impactOnCost');
  const statusField = metaData.fields && metaData.fields.find(x => x.name === 'status');
  const nameField = metaData.fields && metaData.fields.find(x => x.name === 'name');
  const ownerNameField = metaData.fields && metaData.fields.find(x => x.name === 'ownerName');
  const descriptionField = metaData.fields && metaData.fields.find(x => x.name === 'description');
  return (
    <>
      {
        (metaData.action === 'create' || metaData.action === 'delete') ?
          (
            <Box>
              {nameField && <StringDisplay label="Name" value={nameField.value} isSmall={isSmall} />}
              {likelihoodField && <StringDisplay label="Likelihood" value={likelihoodField.value} isSmall={isSmall} />}
              {impactOnScheduleField && <StringDisplay label="Impact on schedule" value={impactOnScheduleField.value} isSmall={isSmall} />}
              {impactOnCostField && <StringDisplay label="Impact on cost" value={impactOnCostField.value} isSmall={isSmall} />}
              {statusField && <StringDisplay label="Status" value={statusField.value} isSmall={isSmall} />}
              {ownerNameField && <StringDisplay label="Owner name" value={ownerNameField.value} isSmall={isSmall} />}
              {descriptionField && <StringDisplay label="Description" value={descriptionField.value} isSmall={isSmall} />}
            </Box>
          ) :
          (
            <Box>
              {nameField && <StringDisplay label="Name" previousValue={nameField.previousValue} value={nameField.value} isSmall={isSmall} />}
              {likelihoodField && <StringDisplay label="Likelihood" previousValue={likelihoodField.previousValue} value={likelihoodField.value} isSmall={isSmall} />}
              {impactOnScheduleField && <StringDisplay label="Impact on schedule" previousValue={impactOnScheduleField.previousValue} value={impactOnScheduleField.value} isSmall={isSmall} />}
              {impactOnCostField && <StringDisplay label="Impact on cost" previousValue={impactOnCostField.previousValue} value={impactOnCostField.value} isSmall={isSmall} />}
              {statusField && <StringDisplay label="Status" previousValue={statusField.previousValue} value={statusField.value} isSmall={isSmall} />}
              {ownerNameField && <StringDisplay label="Owner name" previousValue={ownerNameField.previousValue} value={ownerNameField.value} isSmall={isSmall} />}
              {descriptionField && <StringDisplay label="Description" previousValue={descriptionField.previousValue} value={descriptionField.value} isSmall={isSmall} />}
            </Box>
          )}
    </>
  );
};

export default RiskUpdateType;
