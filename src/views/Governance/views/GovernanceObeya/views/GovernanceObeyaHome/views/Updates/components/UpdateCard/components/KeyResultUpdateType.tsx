import { Box } from "@material-ui/core";

import StringDisplay from "./StringDisplay";
import StatusDisplay from "./StatusDisplay";

type Props = {
  metaData: any;
  isSmall?: boolean;
};

const KeyResultUpdateType = ({
  metaData, isSmall
}: Props) => {
  const statusField = metaData.fields && metaData.fields.find(x => x.name === 'ratingId');
  const achievedField = metaData.fields && metaData.fields.find(x => x.name === 'achieved');
  const childItemLevelField = metaData.fields && metaData.fields.find(x => x.name === 'childItemLevel');
  const includeChildrenField = metaData.fields && metaData.fields.find(x => x.name === 'includeChildren');
  const includeRelatedField = metaData.fields && metaData.fields.find(x => x.name === 'includeRelated');
  const descriptionField = metaData.fields && metaData.fields.find(x => x.name === 'keyResultDescription');
  const parentWorkItemIdField = metaData.fields && metaData.fields.find(x => x.name === 'parentWorkItemId');
  const linkTypesField = metaData.fields && metaData.fields.find(x => x.name === 'linkTypes');

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
              {childItemLevelField && (
                <StringDisplay label="Child Item Level" value={childItemLevelField.value} isSmall={isSmall} />
              )}
              {includeChildrenField && (
                <StringDisplay label="Include Children" value={includeChildrenField.value ? 'Include' : 'Exclude'} isSmall={isSmall} />
              )}
              {includeRelatedField && (
                <StringDisplay label="Include Related" value={includeRelatedField.previousValue ? 'Include' : 'Exclude'} isSmall={isSmall} />
              )}
              {parentWorkItemIdField && (
                <StringDisplay label="Parent work item ID" value={parentWorkItemIdField.value} isSmall={isSmall} />
              )}
              {linkTypesField && (
                <StringDisplay label="Link types"
                  value={linkTypesField.value ? (linkTypesField.value.join(',') !== '' ? linkTypesField.value.join(',') : 'None') : ''} isSmall={isSmall} />
              )}
            </Box >
          ) :
          (
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
              {childItemLevelField && (
                <StringDisplay label="Child Item Level" previousValue={childItemLevelField.previousValue} value={childItemLevelField.value} isSmall={isSmall} />
              )}
              {includeChildrenField && (
                <StringDisplay label="Include Children" previousValue={includeChildrenField.previousValue ? 'Include' : 'Exclude'} value={includeChildrenField.value ? 'Include' : 'Exclude'} isSmall={isSmall} />
              )}
              {includeRelatedField && (
                <StringDisplay label="Include Related" previousValue={includeRelatedField.previousValue ? 'Include' : 'Exclude'} value={includeRelatedField.previousValue ? 'Include' : 'Exclude'} isSmall={isSmall} />
              )}
              {parentWorkItemIdField && (
                <StringDisplay label="Parent work item ID" previousValue={parentWorkItemIdField.previousValue} value={parentWorkItemIdField.value} isSmall={isSmall} />
              )}
              {linkTypesField && (
                <StringDisplay label="Link types"
                  previousValue={linkTypesField.previousValue ? (linkTypesField.previousValue.join(',') !== '' ? linkTypesField.previousValue.join(',') : 'None') : ''}
                  value={linkTypesField.value ? (linkTypesField.value.join(',') !== '' ? linkTypesField.value.join(',') : 'None') : ''} isSmall={isSmall} />
              )}
            </Box >
          )}
    </>
  );
};

export default KeyResultUpdateType;
