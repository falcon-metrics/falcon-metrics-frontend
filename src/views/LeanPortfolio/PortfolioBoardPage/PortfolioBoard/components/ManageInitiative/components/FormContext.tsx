import React, { createContext, useContext } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DateTime } from 'luxon';

export interface FormValues {
  type: string;
  contextId: string;
  roomName: string;
  goal: string;
  beginDate: DateTime;
  endDate: DateTime;
  filterExpression: string;
  isFinished: boolean;
  isArchived: boolean;
  includeRelated: boolean;
  includeChildren: boolean;
  includeChildrenOfRelated: boolean;
  hierarchyLevel: number;
  excludeFilterExpression: string;
  linkTypes: any[];
  columnId: string;
  order: number;
}

interface FormContextType {
  methods: UseFormReturn<FormValues>;
}

const requiredMessage = 'This field is required';

export const validationSchema = yup.object().shape({
  roomName: yup.string().required(requiredMessage),
  goal: yup.string().optional(),
  filterExpression: yup.string().required(requiredMessage),
  beginDate: yup.date().required(requiredMessage),
  endDate: yup.date().required(requiredMessage),
  // Right now, default value is handled and will never come as empty
  // Should there be an edge case yet to be encountered, enable this validation 
  // columnId: yup.string().required(requiredMessage)
});

export const emptyState: FormValues = {
  beginDate: DateTime.now(),
  columnId: "",
  contextId: '',
  endDate: DateTime.local().plus({ months: 3 }),
  excludeFilterExpression: '',
  filterExpression: '',
  goal: '',
  hierarchyLevel: 0,
  includeChildren: false,
  includeChildrenOfRelated: false,
  includeRelated: false,
  isArchived: false,
  isFinished: false,
  linkTypes: [],
  order: 0,
  roomName: '',
  type: 'initiative',
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider: React.FC = ({ children }) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: emptyState,
  });

  return (
    <FormContext.Provider value={{ methods }}>
      {children}
    </FormContext.Provider>
  );
};
