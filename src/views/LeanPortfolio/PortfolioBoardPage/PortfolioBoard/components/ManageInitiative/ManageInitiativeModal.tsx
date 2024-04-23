import { memo, useState } from "react";

import useSWR from "swr";
import {
  AppBar,
  Box,
  DialogContent,
  Grid,
  Tab as MuiTab,
  Tabs,
  Typography,
  styled,
} from "@material-ui/core";

import BaseModal from "components/UI/BaseModal/BaseModal2";
import ManageInitiativeForm from "./components/ManageInitiativeForm";
import { ObeyaRoom } from "core/api/ApiClient/ObeyaGoalsClient";
import FQLAuxiliaryTable, {
  FieldTypes,
  SystemFieldWithType,
} from "components/FQLAuxiliaryTable/FQLAuxiliaryTable";
import { getCustomFields } from "core/api/FetchConfigurations";
import systemFields, {
  SystemField,
} from "components/FQLAuxiliaryTable/interfaces/SystemFields";
import FQLUserGuide from "../FQLUserGuide";
import { useConfirm } from "material-ui-confirm";
import { noop } from "lodash";
import { FormProvider } from "./components/FormContext";

export interface ManageInitiativeProps {
  contextId: string | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultValue: ObeyaRoom | undefined;
  isLoadFromObeya?: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box pt={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const Tab = styled(MuiTab)({
  fontFamily: "Open Sans",
  textTransform: "capitalize",
  fontWeight: 600,
});

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ManageInitiativeModal = memo((props: ManageInitiativeProps) => {
  const title = `${!props.defaultValue ? "Add" : "Edit"} Initiative`;

  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const {
    data: customFieldsData,
    isValidating: isValidatingCustomFields,
  } = useSWR("customfields", getCustomFields, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const customFields = customFieldsData?.customFields || [];

  const filteredCustomFields = !(customFields instanceof Array)
    ? []
    : customFields.map(
      (customField) =>
      ({
        description: "",
        inputTypeOrAcceptedValues: "",
        datasourceFieldName: customField.customFieldName,
        ...customField,
      } as SystemField)
    );

  const addTypeToFields = (
    array: SystemField[],
    type: FieldTypes
  ): SystemFieldWithType[] =>
    array.map((field) => ({ ...field, type, id: field.datasourceFieldName }));

  const fields = [
    addTypeToFields(systemFields, "Falcon Metrics"),
    addTypeToFields(filteredCustomFields, "Custom"),
  ].flat();

  const [isFormDirty, setFormDirty] = useState(false);
  const [isFormModified, setFormModified] = useState(false);

  const confirm = useConfirm();

  const handleModalClose = () => {
    if (isFormDirty) {
      if (!props.defaultValue || isFormModified) {
        confirm({
          title: "Are you sure you want to leave this page?",
          description: (
            <Typography>You will lose the changes you have made.</Typography>
          ),
          cancellationText: "Cancel",
          confirmationText: "Continue without saving",
        })
          .then(() => props.setOpen(false))
          .catch(noop);
      } else {
        props.setOpen(false);
      }
    } else {
      props.setOpen(false);
    }
  };

  return (
    <FormProvider>
      <BaseModal
        open={props.open}
        setOpen={handleModalClose}
        maxWidth={tabValue === 0 ? "md" : "lg"}
        title={title}
        disableBackdropClick
        disableEscKeyDown={!isFormDirty} //disable all the time except when form is dirty, a confirmation should show
      >
        <DialogContent style={{ overflowX: "hidden" }}>
          <AppBar
            position="static"
            color="transparent"
            style={{ boxShadow: "none" }}
          >
            <Tabs
              value={tabValue}
              onChange={handleChange}
              indicatorColor="primary"
            >
              <Tab label="Initiative Form" {...a11yProps(0)} />
              <Tab label="Fields and Operators" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={tabValue} index={0}>
            <ManageInitiativeForm
              open={props.open}
              setOpen={props.setOpen}
              defaultValue={props.defaultValue}
              contextId={props.contextId}
              isLoadFromObeya={props.isLoadFromObeya}
              setFormDirty={setFormDirty}
              setFormModified={setFormModified}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Grid container style={{ width: "105%", padding: 0 }}>
              <Grid item xs={8}>
                <FQLAuxiliaryTable
                  fields={fields}
                  isValidating={isValidatingCustomFields}
                  isLoadFromObeya={true}
                />
              </Grid>
              <Grid item xs={3} style={{ marginLeft: 30 }}>
                <FQLUserGuide />
              </Grid>
            </Grid>
          </TabPanel>
        </DialogContent>
      </BaseModal>
    </FormProvider>
  );
});

export default ManageInitiativeModal;
