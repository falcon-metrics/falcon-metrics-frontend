import React, { createContext, useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidV4 } from "uuid";
import { OKRObjective } from "views/Governance/views/GovernanceObeya/utils";

interface FormContextType {
  methods: UseFormReturn<OKRObjective>;
}

const requiredMessage = "Required";

const validationSchema = yup.object().shape({
  objectiveDescription: yup.string().required(requiredMessage),
  ratingId: yup.string().required(requiredMessage),
});

export const emptyKeyResultState = () => {
  return (
    {
      keyResultDescription: "",
      parentWorkItemId: "",
      keyResultId: uuidV4(),
      completed: false,
      parentWorkItemTitle: "",
      datasourceId: "",
      numberOfItemsCompleted: 0,
      numberOfItemsInProgress: 0,
      numberOfItemsProposed: 0,
      ratingId: "4",
      ratingDescription: "Not Rated",
      includeChildren: false,
      includeRelated: false,
      childItemLevel: 1,
      linkTypes: []
    }
  );
};

export const emptyState: OKRObjective = {
  objectiveDescription: "",
  ratingId: "4",
  achieved: false,
  orgId: "",
  roomId: "",
  objectiveId: "",
  ratingDescription: "Not Rated",
  keyResults: [emptyKeyResultState()]
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useObjectivesFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error(
      "useObjectivesFormContext must be used within a FormProvider"
    );
  }
  return { ...context, emptyState };
};

export const ObjectivesFormProvider: React.FC = ({ children }) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: emptyState,
  });

  return (
    <FormContext.Provider value={{ methods }}>{children}</FormContext.Provider>
  );
};
