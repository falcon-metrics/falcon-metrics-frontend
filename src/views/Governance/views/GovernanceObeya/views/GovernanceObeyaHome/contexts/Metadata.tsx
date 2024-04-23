import { createContext, ReactNode, useState, useContext, useMemo, Dispatch, SetStateAction } from 'react';

export const defaultPeriod = '';
export const defaultEndDate = new Date();
export const defaultDirtyFields = { formName: '', fields: [] };
export const defaultPreviousObjective = undefined;
export const defaultPreviousKeyresult = undefined;


type DirtyFieldsT = {
  formName: string;
  fields: any;
};

export type ContextType = {
  status?: string;
  endDate?: Date;

  setStatus: (statusValue: string) => void;
  setEndDate: Dispatch<SetStateAction<Date>>;
  dirtyFieldNames: DirtyFieldsT;
  setDirtyFields: Dispatch<SetStateAction<DirtyFieldsT>>;
  previousObjective: undefined | any;
  setPreviousObjective: Dispatch<SetStateAction<any>>;
  
  previousKeyResult: undefined | any;
  setPreviousKeyResult: Dispatch<SetStateAction<any>>;
  krStatus: string,
  setKrStatus: Dispatch<SetStateAction<any>>;
};

export const errorSetStatus = () => console.error(`errorSetStatus ${Date.now}`);
export const errorSetEndDate = () => console.error(`errorSetEndDate ${Date.now}`);
export const errorSetDirtyFields = () => console.error(`errorsetDirtyFields ${Date.now}`);
export const errorSetPreviousObjective = () => console.error(`setPreviousObjective ${Date.now}`);
export const errorSetPreviouskeyResult = () => console.error(`setPreviouskeyResult ${Date.now}`);


const MetadataContext = createContext<ContextType>({
  status: defaultPeriod,
  endDate: defaultEndDate,
  setStatus: errorSetStatus,
  setEndDate: errorSetEndDate,
  dirtyFieldNames: defaultDirtyFields,
  setDirtyFields: errorSetDirtyFields,
  previousObjective:  defaultPreviousObjective,
  setPreviousObjective: errorSetPreviousObjective,
  previousKeyResult: defaultPreviousKeyresult,
  setPreviousKeyResult: errorSetPreviouskeyResult,
  krStatus: '',
  setKrStatus: errorSetPreviouskeyResult
});

interface Props {
  selectorIsVisible?: boolean;
  children: ReactNode;
}

function MetaDataProvider({ children }: Props) {
  const [status, setStatus] = useState(defaultPeriod);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [dirtyFieldNames, setDirtyFields] = useState(defaultDirtyFields);
  const [previousObjective, setPreviousObjective] = useState(defaultPreviousObjective);
  const [previousKeyResult, setPreviousKeyResult] = useState(defaultPreviousObjective);
  const [krStatus, setKrStatus] = useState(defaultPeriod);

  const info = useMemo(() => {
    return {
      status, endDate, setStatus, setEndDate,
      setDirtyFields, dirtyFieldNames, previousObjective,
      setPreviousObjective, setPreviousKeyResult,
      previousKeyResult, setKrStatus, krStatus
    };
  }, [status, endDate, dirtyFieldNames, previousObjective, previousKeyResult]);

  return (
    <MetadataContext.Provider
      value={info}
    >
      {children}
    </MetadataContext.Provider>
  );
}

export const useMetadata = () => useContext(MetadataContext);

export default MetaDataProvider;
