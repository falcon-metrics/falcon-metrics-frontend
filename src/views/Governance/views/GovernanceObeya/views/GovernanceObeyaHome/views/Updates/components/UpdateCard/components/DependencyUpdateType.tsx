import { Box } from "@material-ui/core";

import { formatDate } from "utils/dateTime";
import StringDisplay from "./StringDisplay";

type Props = {
  metaData: any;
  isSmall?: boolean;
};

const DependencyUpdateType = ({ metaData, isSmall }: Props) => {
  const statusField = metaData.fields && metaData.fields.find(x => x.name === 'status');
  const dateOfImpactField = metaData.fields && metaData.fields.find(x => x.name === 'dateOfImpact');
  const severityField = metaData.fields && metaData.fields.find(x => x.name === 'severity');
  const blockedNameField = metaData.fields && metaData.fields.find(x => x.name === 'blockedName');
  const blockerNameField = metaData.fields && metaData.fields.find(x => x.name === 'blockerName');
  const nameField = metaData.fields && metaData.fields.find(x => x.name === 'name');
  const summary = metaData.fields && metaData.fields.find(x => x.name === 'summary');

  return (
    <>
      {
        (metaData.action === 'create' || metaData.action === 'delete') ?
          (
            <Box>
              {nameField && <StringDisplay label="Name" value={nameField.value} isSmall={isSmall} />}
              {statusField && <StringDisplay label="Likelihood" value={statusField.value} isSmall={isSmall} />}
              {dateOfImpactField && <StringDisplay label="Date of impact"
                value={dateOfImpactField.value ? formatDate(dateOfImpactField.value) : ''} isSmall={isSmall} />}
              {severityField && <StringDisplay label="Severity" value={severityField.value} isSmall={isSmall} />}
              {blockedNameField && <StringDisplay label="Blocked team" value={blockedNameField.value} isSmall={isSmall} />}
              {blockerNameField && <StringDisplay label="Blocker team" value={blockerNameField.value} isSmall={isSmall} />}
              {summary && <StringDisplay label="Summary" value={summary.value} isSmall={isSmall} />}
            </Box>
          )
          :
          (
            <Box>
              {nameField && <StringDisplay label="Name" previousValue={nameField.previousValue} value={nameField.value} isSmall={isSmall} />}
              {statusField && <StringDisplay label="Likelihood" previousValue={statusField.previousValue} value={statusField.value} isSmall={isSmall} />}
              {dateOfImpactField && <StringDisplay label="Date of impact"
                previousValue={dateOfImpactField.previousValue ? formatDate(dateOfImpactField.previousValue) : ''}
                value={dateOfImpactField.value ? formatDate(dateOfImpactField.value) : ''} isSmall={isSmall} />}
              {severityField && <StringDisplay label="Severity" previousValue={severityField.previousValue} value={severityField.value} isSmall={isSmall} />}
              {blockedNameField && <StringDisplay label="Blocked team" previousValue={blockedNameField.previousValue} value={blockedNameField.value} isSmall={isSmall} />}
              {blockerNameField && <StringDisplay label="Blocker team" previousValue={blockerNameField.previousValue} value={blockerNameField.value} isSmall={isSmall} />}
              {summary && <StringDisplay label="Summary" previousValue={summary.previousValue} value={summary.value} isSmall={isSmall} />}
            </Box>
          )
      }
    </>
  );
};

export default DependencyUpdateType;
