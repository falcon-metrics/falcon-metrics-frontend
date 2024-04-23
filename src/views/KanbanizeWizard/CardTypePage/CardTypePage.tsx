import { memo, useMemo, useState } from "react";
import { useWizardContext } from "views/SetupWizard/contexts/useWizardContext";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { transformImportResponse } from "./CardTypePage.data";
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from "./validation_schema";
import { Payload } from "./interfaces/schema";
import {
  DatabaseWorkItemType,
  ImportedWorkItemType,
  SubmitResponse,
} from "./interfaces/interfaces";
import BoardsAccordion from "./components/BoardsAccordion";
import WizardSubmitWrapper from "views/SetupWizard/components/WizardSubmitWrapper";
import Container from 'components/PageContainer/PageContainer';
import { useSnackbar } from "notistack";
import Filters from "./components/Filters";
import { CardTypesFilters } from "./components/Filters/Filters";
import { UserGuideContent, UserGuideKey } from "components/UserGuide/UserGuideContent";

export type ErrorList = Record<number, string[]>;

export type Props = {
  databaseData: DatabaseWorkItemType[];
  datasourceData: ImportedWorkItemType[];
  submit: (payload: Payload) => SubmitResponse;
};

const CardTypePage = ({ databaseData, datasourceData, submit }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const boardsInit = transformImportResponse(datasourceData as any, databaseData);

  const methods = useForm({
    defaultValues: boardsInit,
    resolver: yupResolver(validationSchema as any),
  });

  const {
    setIsSubmitting,
    setIsDirty,
    goToNext,
  } = useWizardContext();

  const { handleSubmit: rhfHandleSubmit, getValues } = methods;

  const [filters, setFilters] = useState<CardTypesFilters>({
    workspaceId: undefined,
    boardId: undefined,
  });

  const [sortedData, setSortedData] = useState(Object.values(boardsInit.boards));

  const filteredBoards = useMemo(() => {
    const result: { [key: string]: any } = {};

    Object.keys(sortedData).forEach((boardId) => {
      const board = sortedData[boardId];
      if (
        (!filters.workspaceId || board.workspaceId === filters.workspaceId) &&
        (!filters.boardId || board.boardId === filters.boardId)
      ) {
        result[`boardId-${boardId}`] = board;
      }
    });

    return result;
  }, [filters.workspaceId, filters.boardId, sortedData]);

  const onSubmit = async () => {
    const data = getValues();
    const rows: any[] = [];
    Object.values(data.boards).forEach((b) => {
      Object.values(b.cardTypes)
        .filter((ct: any) => ct.checked === true)
        .forEach((ct: any) => {
          rows.push({
            boardId: b.boardId,
            ..._.omit(ct, ["checked"]),
          });
        });
    });

    // Check if at least one card type is selected
    if (rows.length === 0) {
      enqueueSnackbar("At least one card type must be selected.", {
        variant: "error",
      });
      return Promise.reject();
    }

    try {
      setIsSubmitting(true);
      await submit(rows as any);

      // Save the form data to the database here
      // console.log("🚀 ~ file: CardTypePage.tsx:169 ~ onSubmit ~ rows:", rows);

      enqueueSnackbar(
        `Modifying Card Types may impact the filters configured in the Custom Views page.\n Please review the filters configured in the Custom Views page.`,
        {
          variant: 'warning',
          autoHideDuration: 5000,
          onClick: goToNext,
          // https://github.com/iamhosseindhv/notistack/issues/32#issuecomment-510992746
          style: { whiteSpace: 'pre-line' }
        },
      );

      // Do any other actions needed after successful submission
      // For example, you can navigate to another page or perform additional tasks.
    } catch (error) {
      // Handle errors and show error snackbar
      enqueueSnackbar("Error submitting form. Please try again later.", {
        variant: "error",
      });
    }
  };

  return (
    <Container.Wizard
      title={UserGuideContent[UserGuideKey.CARDTYPES].title}
      userGuideId={UserGuideKey.CARDTYPES}
      maxWidth="md">
      <WizardSubmitWrapper onSubmit={rhfHandleSubmit(onSubmit)}>
        <Filters
          boards={boardsInit.boards}
          filters={filters}
          setFilters={setFilters}
          setSortedData={setSortedData} />
        <BoardsAccordion
          boards={filteredBoards}
          methods={methods}
          setIsDirty={setIsDirty} />
      </WizardSubmitWrapper>
    </Container.Wizard>
  );
};



export default memo(CardTypePage);

