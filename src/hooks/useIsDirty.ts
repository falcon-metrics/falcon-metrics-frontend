import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
//Created to decouple the logic used in WizardFormProvider for reusing, but apparently,
//as least there it causes performance issues. Leaving unused for now.

function useIsFormDirty<T>(formMethods: UseFormReturn<T>) {
  //   const contextFormMethods = useFormContext();
  const {
    formState: { dirtyFields },
  } = formMethods; // ?? contextFormMethods;
  const [isDirty, setIsDirty] = useState(false);

  const dirtyFieldsLength = !!Object.keys(dirtyFields).length;

  useEffect(() => {
    setIsDirty(!!Object.keys(dirtyFields).length);
  }, [dirtyFields, dirtyFieldsLength]);
  return isDirty;
}

export default useIsFormDirty;
