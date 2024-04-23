import WorkItemTypeRow from "./WorkItemTypeRow";
import { getRowKey } from "../../../utils/getRowKey";
import { pick } from "lodash";
import { RawDiscontinuedSteps, TransformedDatabaseWorkItemType } from "views/KanbanizeWizard/WorkFlowsPage/interfaces/interfaces";

type Props = {
  workItemType: TransformedDatabaseWorkItemType;
  workItemTypes: TransformedDatabaseWorkItemType[];
  errorFields: string[];
  workItemTypeOptions: string[];
  index: number;
  onChange: (
    index: number,
    value: Partial<TransformedDatabaseWorkItemType>
  ) => void;
  onExpanded: (id: number, isChecked?: boolean) => void;
  openAccordions: number[];
  isChangeFontColor: boolean;
  setFontColor: (value: boolean) => void;
  copiedWorkflow?: TransformedDatabaseWorkItemType;
  onCopyWorkflow: (workflow: TransformedDatabaseWorkItemType) => void;
  initDiscontinuedSteps: RawDiscontinuedSteps[];
  setInitDiscontinuedSteps: (steps: RawDiscontinuedSteps[]) => void;
};

const WorkItemTypeBody = ({
  workItemType,
  workItemTypes,
  errorFields: errors,
  workItemTypeOptions: workItemTypeOptions,
  index,
  onChange,
  onExpanded,
  openAccordions,
  isChangeFontColor,
  setFontColor,
  copiedWorkflow,
  onCopyWorkflow,
  initDiscontinuedSteps,
  setInitDiscontinuedSteps
}: Props) => {
  
  const handleRowChange = (
    index: number,
    newWorkItemType: Partial<TransformedDatabaseWorkItemType>
  ) => onChange(index, newWorkItemType);

  return (
    <WorkItemTypeRow
      key={index}
      workItemType={workItemType}
      errorFields={errors[getRowKey(workItemType) ?? ""] ?? []}
      workItemTypeOptions={workItemTypeOptions}
      index={index}
      onChange={handleRowChange}
      onDisplayNameChange={(newDisplayName) => {
        //  find the other existing row with this displayName
        //  update the current row's SLE, level to the same as existing row
        const existingRow = workItemTypes.find(
          (row) => row.displayName === newDisplayName
        );
        if (!existingRow) {
          handleRowChange(index, {
            displayName: newDisplayName,
          });
        } else {
          const newValues = pick(existingRow, [
            "level",
            "serviceLevelExpectationInDays",
            "displayName",
          ]);
          handleRowChange(index, newValues);
        }
      }}
      //  updates field value of rows with same workItemTypeId use index
      onWITChange={(
        value: Partial<TransformedDatabaseWorkItemType>,
        displayName
      ) => {
        workItemTypes.forEach((row, index) => {
          if (row.displayName === displayName) {
            handleRowChange(index, { ...row, ...value });
          }
        });
      }}
      copiedWorkflow={copiedWorkflow || undefined}
      onCopyWorkflow={onCopyWorkflow}
      onExpanded={onExpanded}
      openAccordions={openAccordions}
      isChangeFontColor={isChangeFontColor}
      setFontColor={setFontColor}
      initDiscontinuedSteps={initDiscontinuedSteps}
      setInitDiscontinuedSteps={setInitDiscontinuedSteps}
    />
  );
};

export default WorkItemTypeBody;
