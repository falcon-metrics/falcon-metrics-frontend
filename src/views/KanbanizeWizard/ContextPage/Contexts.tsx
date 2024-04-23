import { useCallback, useEffect } from "react";
import find from "lodash/find";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import flattenDeep from "lodash/flattenDeep";
import ContextTreeView, {
  FormValues,
} from "./components/ContextTreeView/ContextTreeView";
import Container from "components/PageContainer/PageContainer";
import WizardFormProvider from "views/SetupWizard/components/WizardFormProvider/WizardFormProvider";
import { useSnackbar } from "notistack";
import { Tree, Option } from "./Contexts.data";
import { useSeedData } from "views/SetupWizard/utils/utils";
import Providers from "views/SetupWizard/interfaces/Providers";
import {
  UserGuideContent,
  UserGuideKey,
} from "components/UserGuide/UserGuideContent";
import { validationSchema } from "./utils";

export type Props = {
  provider?: Providers;
  initialValues: Tree;
  options: Option[];
  submit: (payload: any[]) => Promise<unknown>;
};

const ContextsPage = ({ initialValues = [], options, submit }: Props) => {
  const resolver: any = yupResolver(validationSchema());
  const methods = useForm<FormValues>({
    resolver,
    defaultValues: { contexts: initialValues },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const { enqueueSnackbar } = useSnackbar();

  // Use useEffect to display validation errors that occur during initialization
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      // Function to recursively extract error messages
      const extractErrorMessages = (errorObject) => {
        if (errorObject && errorObject.message) {
          return errorObject.message;
        } else if (errorObject && typeof errorObject === "object") {
          return Object.values(errorObject)
            .map(extractErrorMessages)
            .join("\n");
        } else {
          return "";
        }
      };

      const errorMessages = extractErrorMessages(errors);

      // Split the error messages into an array
      const errorMessagesArray = errorMessages.split("\n");

      // Display the first half of error messages in the first snackbar
      if (errorMessagesArray.length > 0) {
        enqueueSnackbar(errorMessagesArray[0], { variant: "error" });
      }

      // Display the second half of error messages in the second snackbar (if available)
      if (errorMessagesArray.length > 1) {
        enqueueSnackbar(errorMessagesArray.slice(1).join("\n"), {
          variant: "error",
        });
      }
    }
  }, [errors, enqueueSnackbar]);

  const onValid = useCallback(
    async ({ contexts }: FormValues) => {
      const dataset = flattenContexts(contexts);

      const data = dataset.map((value) => {
        if (value.address) {
          const option = find(options, { id: value.address });
          value.projectId =
            option && option.projects.length ? option.projects[0] : null;
        }

        return { ...value };
      });
      try {
        await submit(data);
        if (initialValues.length) {
          enqueueSnackbar(
            "We are setting up your dashboard to reflect the changes. This may take few minutes.",
            { variant: "warning" }
          );
        }
      } catch (err) {
        console.error(err);
        enqueueSnackbar(
          "There was an error saving the form. Please try again later.",
          { variant: "error" }
        );
      }
    },
    [submit, options, enqueueSnackbar, initialValues]
  );

  useSeedData();

  return (
    <Container.Wizard
      title={UserGuideContent[UserGuideKey.CONTEXTS].title}
      userGuideId={UserGuideKey.CONTEXTS}
      isCustomDescription
    >
      <WizardFormProvider
        hookFormMethods={methods}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onValid, console.debug)}
      >
        <ContextTreeView
          options={options?.sort((a, b) => (a.name > b.name ? 1 : -1))}
        />
      </WizardFormProvider>
    </Container.Wizard>
  );
};

export default ContextsPage;

function flattenContexts(contexts: any[]) {
  return flattenDeep(contexts.map((node, deep) => normalize(node, `${deep}`)));
}

function normalize(node: any, deep = "0", data: any[] = []): any[] {
  const levels = deep.split(".").map(Number);
  const level = levels.pop() || 0;
  const positionInHierarchy = [...levels, level + 1].join(".");
  data.push({ ...node, positionInHierarchy });
  for (let index = 0; index < node.children?.length; index++) {
    const child = node.children[index];
    normalize(child, `${positionInHierarchy}.${index}`, data);
  }
  return data;
}
