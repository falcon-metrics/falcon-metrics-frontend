import { memo, useCallback, useMemo, useState } from "react";

import Container from "components/PageContainer/PageContainer";
import ZeroState from "components/ZeroState";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import { useSnackbar } from "notistack";
import WizardSubmitWrapper from "views/SetupWizard/components/WizardSubmitWrapper";
import { useWizardContext } from "views/SetupWizard/contexts/useWizardContext";
import * as yup from "yup";

import { useDismissDependenciesWarning } from "../../components/CantDeleteWarning";
import useConfirmDelete from "../CustomFields/ConfirmDelete";
import {
  DatabaseWorkItemType,
  DatabaseWorkItemTypeStep,
  ImportedWorkItemType,
  SubmitResponse,
  TransformedDatabaseWorkItemType,
  RawDiscontinuedSteps,
} from "./interfaces/interfaces";
import { isValidPayload, Payload, schema } from "./interfaces/schema";
import { getRowKey } from "./utils/getRowKey";
import { getValuesForComparison } from "./utils/isDirtyComparison";
import { filterChecked, getSubmitPayload } from "./utils/utils";
import { combineDatabaseAndImportedData } from "./WorkItemTypes.data";
import useAuthentication from "hooks/useAuthentication";
import DataTable from "./components/DataTable";
import { useSeedData } from "views/SetupWizard/utils/utils";
import { UserGuideContent, UserGuideKey } from "components/UserGuide/UserGuideContent";
import _ from "lodash";

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

export type Props = {
  databaseData: DatabaseWorkItemType[];
  datasourceData: ImportedWorkItemType[];
  submit: (payload: Payload) => SubmitResponse;
};
const entityDisplayName = "work item types";
const WorkItemTypesPage = ({ databaseData, datasourceData, submit }: Props) => {
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
    const filteredValues = filterChecked(values);
    setIsSubmitting(true);

    const transformedValues = getSubmitPayload(filteredValues);
    const validations = await schema
      .validate(transformedValues, { abortEarly: false })
      .then((): ErrorList => ({}))
      .catch(
        ({
          inner,
          value,
        }: Omit<yup.ValidationError, "value"> & {
          value: typeof transformedValues;
        }) => {
          return inner.reduce((result, { path }) => {
            const [, strIndex, errorKey] = path?.split(/\[|\]\./g) ?? [];
            const index = Number(strIndex);
            if (!isNaN(index)) {
              const valueId = getRowKey(value[index]);
              const currentArray = result[valueId];
              if (!currentArray) {
                result[valueId] = [errorKey];
              } else {
                currentArray.push(errorKey);
              }
            }
            return result;
          }, {} as ErrorList);
        }
      );

    setErrors(validations);
    if (isValidPayload(transformedValues, validations)) {
      const currentlySelectedIds = transformedValues.map(
        ({ workflowId }) => workflowId
      );
      return confirmDelete(currentlySelectedIds).then(() => {
        return submit(transformedValues)
          .then(({ data }) => {
            if ("dependencies" in data) {
              warnDismissDependencies(data.dependencies);
              Promise.reject(
                "Work Item Types could not be deleted because of dependency tree."
              );
            } else {
              return data;
            }
          })
          .catch((error) => {
            if (error.response?.data && "dependencies" in error.response.data) {
              const dependencies = error.response.data["dependencies"];
              warnDismissDependencies(dependencies);
              Promise.reject(
                "Work Item Types could not be deleted because of dependency tree."
              );
            }
          });
      });
    } else {
      console.error("ERROR", validations);
      enqueueSnackbar("Please check the required fields and try again!", {
        variant: "warning",
      });
      return Promise.reject();
    }
  };

  const [workItemTypes, setWorkItemTypes] = useState(cloneDeep(initialData));

  const updateAt = useCallback(
    (
      index: number,
      newWorkItemType: Partial<TransformedDatabaseWorkItemType>
    ) => {
      setWorkItemTypes((values) => {
        const removed = values[index];
        values.splice(index, 1, { ...removed, ...newWorkItemType });
        setIsDirty(
          !isEqual(
            getValuesForComparison(initialData),
            getValuesForComparison(values)
          )
        );
        return values;
      });
    },
    [setIsDirty, initialData]
  );

  const splitProjects = useCallback(
    (
      index: number
    ) => {
      setWorkItemTypes((values) => {
        const newValues = values[index].projects.map((project) => {
          return {
            ...values[index],
            projects: [project],
            isDistinct: true
          };
        });
        values.splice(index, 1, ...newValues);
        setIsDirty(
          !isEqual(
            getValuesForComparison(initialData),
            getValuesForComparison(values)
          )
        );
        return values;
      });
    }, [setIsDirty, initialData]
  );

  const mergeProjects = useCallback(
    (
      index: number
    ) => {
      const initialMergedData = combineDatabaseAndImportedData(
        databaseData,
        datasourceData,
        organisation,
        true
      );
      const matchingMergedData = initialMergedData.find(x => x.id === workItemTypes[index].id && x.projects.map(p => p.id).includes(workItemTypes[index].projects[0].id));
      if (matchingMergedData) {
        setWorkItemTypes((values) => {
          const newValue = _.cloneDeep(values[index]);
          const projectIds = matchingMergedData.projects.map(x => x.id);
          newValue.projects = matchingMergedData.projects;
          newValue.isDistinct = false;

          values = values.filter(val => !(val.projects.length === 1 && projectIds.includes(val.projects[0].id) && val.id === values[index].id));
          values.splice(index, 0, newValue);
          setIsDirty(
            !isEqual(
              getValuesForComparison(initialData),
              getValuesForComparison(values)
            )
          );
          return values;
        });
      }
    }, [setIsDirty, initialData]
  );
  return (
    <Container.Wizard
      title={UserGuideContent[UserGuideKey.WORKITEMTYPES].title}
      userGuideId={UserGuideKey.WORKITEMTYPES}
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
            splitProjects={splitProjects}
            mergeProjects={mergeProjects}
          />
        </WizardSubmitWrapper>
      ) : (
        <ZeroState />
      )}
    </Container.Wizard>
  );
};

export default memo(WorkItemTypesPage);
