import { memo, useCallback, useMemo, useState } from "react";

import Container from "components/PageContainer/PageContainer";
import ZeroState from "components/ZeroState";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import { useSnackbar } from "notistack";
import WizardSubmitWrapper from "views/SetupWizard/components/WizardSubmitWrapper";
import { useWizardContext } from "views/SetupWizard/contexts/useWizardContext";

import {
  DatabaseWorkItemType,
  DatabaseWorkItemTypeStep,
  ImportedWorkItemType,
  SubmitResponse,
  TransformedDatabaseWorkItemType,
  RawDiscontinuedSteps,
} from "./interfaces/interfaces";
import { Payload, schema } from "./interfaces/schema";
import { getSubmitPayload } from "./utils/utils";
import { combineDatabaseAndImportedData } from "./WorkFlowsPage.data";
import useAuthentication from "hooks/useAuthentication";
import DataTable from "./components/DataTable";
import { useSeedData } from "views/SetupWizard/utils/utils";
import useConfirmDelete from "views/SetupWizard/views/CustomFields/ConfirmDelete";
import { useDismissDependenciesWarning } from "views/SetupWizard/components/CantDeleteWarning";
import { UserGuideContent, UserGuideKey } from "components/UserGuide/UserGuideContent";

export type ErrorList = Record<number, string[]>;

export function getDiscontinuedStepsByInitOrder(
  initialData: TransformedDatabaseWorkItemType[]
): RawDiscontinuedSteps[] {
  const workflows: RawDiscontinuedSteps[] = [];

  initialData.forEach((item) => {
    const workflowId = item.workflowId;
    const discontinuedSteps = item.steps.filter(
      (step) =>
        "order" in step && (step as DatabaseWorkItemTypeStep).order === "9999"
    );
    if (discontinuedSteps.length > 0) {
      const steps = discontinuedSteps.map((step) => {
        const { compositeId, name, id } = step;
        const initOrder = item.steps.indexOf(step);
        return { compositeId, name, id, initOrder, order: null };
      });
      workflows.push({ workflowId, steps });
    }
  });

  return workflows;
}

// Helper function to extract relevant properties for comparison
function getValuesForComparison(data) {
  return data.map(({ datasourceWorkflowId, arrivalId, commitmentId, departureId, steps }) => ({
    datasourceWorkflowId,
    arrivalId,
    commitmentId,
    departureId,
    steps
  }));
}

// Function to check if the two objects are the same
function areObjectsSame(initialData, values) {
  const initialValues = getValuesForComparison(initialData);
  const newValues = getValuesForComparison(values);
  return isEqual(initialValues, newValues);
}
export type Props = {
  databaseData: DatabaseWorkItemType[];
  datasourceData: ImportedWorkItemType[];
  submit: (payload: Payload) => SubmitResponse;
};
const entityDisplayName = "work item types";

const WorkflowsPage = ({ databaseData, datasourceData, submit }: Props) => {
  const [errors, setErrors] = useState<ErrorList>([]);
  const { setIsDirty, setIsSubmitting } = useWizardContext();
  const {
    userInfo: { organisation },
  } = useAuthentication();
  const initialData = combineDatabaseAndImportedData(
    databaseData,
    datasourceData,
    organisation
  );
  const initiallyCheckedRows = useMemo(
    () =>
      initialData.filter(({ projects }) =>
        projects.some(({ isUnmapped }) => !isUnmapped)
      ),
    [initialData]
  );
  const confirmDelete = useConfirmDelete(
    initiallyCheckedRows.map(({ displayName, workflowId }) => ({
      displayName,
      id: workflowId,
    })),
    entityDisplayName
  );
  const warnDismissDependencies = useDismissDependenciesWarning(
    entityDisplayName
  );

  const { enqueueSnackbar } = useSnackbar();

  const [initDiscontinuedSteps, setInitDiscontinuedSteps] = useState<RawDiscontinuedSteps[]>
    (getDiscontinuedStepsByInitOrder(initialData));

  useSeedData();
  const handleSubmit = async (values: TransformedDatabaseWorkItemType[]) => {
    setIsSubmitting(true);

    // Helper function to extract relevant properties for comparison
    const getIdsForComparison = (data) =>
      data.map(({ datasourceWorkflowId }) => datasourceWorkflowId);

    const initialIds = getIdsForComparison(initialData);
    const newIds = getIdsForComparison(values);

    const changedIndices = newIds.reduce((result, id, index) => {
      if (!isEqual(id, initialIds[index])) {
        result.push(index);
      }
      return result;
    }, []);

    const transformedValues: any = getSubmitPayload(values);

    const validations = await schema
      .validate(transformedValues, { abortEarly: false })
      .then(() => ({}))
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          const { path, message } = error;
          const [indexStr, field] = path.split(".");
          const index = parseInt(indexStr);

          if (changedIndices.includes(index)) {
            if (!validationErrors[index]) {
              validationErrors[index] = {};
            }
            validationErrors[index][field] = message;
          }
        });
        return validationErrors;
      });

    setErrors(validations);

    if (Object.keys(validations).length === 0) {
      const currentlySelectedIds: any = transformedValues.map(
        ({ datasourceWorkflowId }) => datasourceWorkflowId
      );
      return confirmDelete(currentlySelectedIds).then(() => {
        return submit(transformedValues)
          .then(({ data }) => {
            if ("dependencies" in data) {
              warnDismissDependencies(data.dependencies);
              return Promise.reject(
                "Workflows could not be deleted because of dependency tree."
              );
            } else {
              return data;
            }
          })
          .catch((error) => {
            if (error.response?.data && "dependencies" in error.response.data) {
              const dependencies = error.response.data["dependencies"];
              warnDismissDependencies(dependencies);
              return Promise.reject(
                "Workflows could not be deleted because of dependency tree."
              );
            }
          });
      });
    } else {
      enqueueSnackbar("Please check the required fields and try again!", {
        variant: "warning",
      });
      return Promise.reject();
    }
  };

  const [workItemTypes, setWorkItemTypes] = useState(cloneDeep(initialData));

  const updateAt = useCallback(
    (index: number, newWorkItemType: Partial<TransformedDatabaseWorkItemType>) => {
      setWorkItemTypes((values) => {
        const removed = values[index];
        values.splice(index, 1, { ...removed, ...newWorkItemType });
        setIsDirty(!areObjectsSame(initialData, values));
        return values;
      });
    },
    [setIsDirty, initialData]
  );


  return (
    <Container.Wizard
      title={UserGuideContent[UserGuideKey.WORKFLOWS].title}
      userGuideId={UserGuideKey.WORKFLOWS}
      maxWidth="lg">
      {initialData.length ? (
        <WizardSubmitWrapper onSubmit={() => handleSubmit(workItemTypes)}>
          <DataTable
            errors={errors}
            workItemTypes={workItemTypes}
            setWorkItemTypes={setWorkItemTypes}
            onChange={updateAt}
            initDiscontinuedSteps={initDiscontinuedSteps}
            setInitDiscontinuedSteps={setInitDiscontinuedSteps}
          />
        </WizardSubmitWrapper>
      ) : (
        <ZeroState />
      )}
    </Container.Wizard>
  );
};

export default memo(WorkflowsPage);
