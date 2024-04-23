import { memo, useCallback, useEffect, useState } from "react";

import useSWR from "swr";
import FQLAuxiliaryTable, {
  FieldTypes,
  SystemFieldWithType,
} from "components/FQLAuxiliaryTable/FQLAuxiliaryTable";
import { SystemField } from "components/FQLAuxiliaryTable/interfaces/SystemFields";
import FQLUserGuide from "components/FQLUserGuide";
import { useSendTelemetry } from "core/api/CustomerTelemetryClient";
import useAuthentication from "hooks/useAuthentication";
import { useCrud } from "hooks/useCrud";
import { DateTime } from "luxon";
import { FormProvider, useForm } from "react-hook-form";
import { Redirect } from "react-router";
import { Link, useHistory, useLocation } from "react-router-dom";
import { mutate, useSWRConfig } from "swr";
import {
  BaseRoutes, InitiativeSocialFeedHome
} from "utils/routes";
import { sortByString } from "utils/string";
import { DatePicker } from "views/Governance/views/GovernanceObeya/components/DatePicker/DatePicker";
import Input from "views/Governance/views/GovernanceObeya/components/Input";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormHelperText, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import MuiContainer from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { Alert } from "@material-ui/lab";

import { ChildItemsAndChildrenOfChild } from "./ChildItemsAndChildrenOfChild";
import FQLInputObeya from "./FQLInputObeya";
import { RelatedAndChildrenOfRelated } from "./RelatedAndChildrenOfRelated";
import { useStyles } from "./styles";
import systemFields from "components/FQLAuxiliaryTable/interfaces/SystemFields";
import { getCustomFields } from "core/api/FetchConfigurations";
import { useLinkTypes } from "hooks/fetch/useLinkTypes";
import { DEFAULT_DATE_FORMAT } from "utils/dateTime";

const mutateObeyaRoomsKey = "obeya/rooms/all";

const defaultResources = {
  add: "obeya/room/create",
  update: "obeya/room/edit",
  getAll: mutateObeyaRoomsKey,
};

export type FormValues = {
  option: string;
  roomName: string;
  goal: string;
  beginDate: Date;
  endDate: Date;
  filterExpression: string;
  includeRelated?: string;
  includeChildren?: string;
  includeChildrenOfChildren?: boolean;
  includeChildrenOfRelated?: boolean;
  hierarchyLevel?: number;
  excludeFilterExpression?: string;
  linkType?: string;
  linkTypes?: string[];
  columnName?: string;
  contextId?: string;
  order?: number;
  isFinished?: boolean;
  isArchived?: boolean;
};

export const ObeyaRoomForm = memo(() => {
  const { cache } = useSWRConfig();

  const location = useLocation() as { pathname: string; state: any; };
  const classes = useStyles();
  const [validatingFql, setValidatingFql] = useState<boolean>(false);
  const [validatingExcludeFql, setValidatingExcludeFql] = useState<boolean>(
    false
  );
  const [defaultFormValues, setDefaultFormValues] = useState<
    | {
      roomName?: string;
      goal?: string;
      beginDate?: string;
      endDate?: string;
      flomatikaQuery?: string;

      includeChildren?: boolean;
      includeChildrenOfChildren?: boolean;

      includeRelated?: boolean;
      includeChildrenOfRelated?: boolean;

      hierarchyLevel?: number;
      excludeQuery?: string;

      linkType?: string;
      linkTypes?: string[];
      columnName?: string;
      contextId?: string;
      order?: number;
      isFinished?: boolean;
      isArchived?: boolean;
    }
    | undefined
  >();
  const { isAdmin } = useAuthentication();

  const { data: obeyaData, add, update } = useCrud(
    defaultResources,
    "obeyaRooms"
  );
  const history = useHistory();

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [successAlertOpen, setSuccessAlertOpen] = useState<boolean>(false);
  const [waitingAlertOpen, setWaitingAlertOpen] = useState<boolean>(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState<boolean>(false);

  const sendTelemetry = useSendTelemetry();

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setWaitingAlertOpen(false);
    setSuccessAlertOpen(false);
    setErrorAlertOpen(false);
  };

  const [hierarchyValue, setHierarchyValue] = useState(
    location.state?.obeyaRoom?.hierarchyLevel ?? 1
  );
  const handleChange = (value: number) => setHierarchyValue(value);

  const [linkType, setLinkType] = useState(
    location.state?.obeyaRoom?.linkType ?? ""
  );
  const handleRelatedChange = (value: string) => setLinkType(value.toString());

  const transformedLinkType: string[] = linkType.split(",");

  const onSubmit = useCallback(
    async (data) => {
      const isEditing = !!defaultFormValues;
      setWaitingAlertOpen(true);

      const telemetryAction = isEditing ? "EditObeyaRoom" : "CreateObeyaRoom";
      sendTelemetry(
        telemetryAction,
        `${telemetryAction} - RoomId: ${location.state?.obeyaRoom?.roomId}, RoomName: ${data.roomName}`,
        { page: "obeya", widget: "room" }
      );

      const formData = {
        type: "initiative",
        goal: data.goal,
        roomId: location.state?.obeyaRoom?.roomId,
        roomName: data.roomName,
        beginDate: data.beginDate,
        endDate: data.endDate,
        flomatikaQuery: data.filterExpression,
        datasourceId: "-",
        includeRelated: data.includeRelated,
        includeChildren: data.includeChildren,
        includeChildrenOfChildren: data.includeChildrenOfChildren,
        includeChildrenOfRelated: data.includeChildrenOfRelated,
        hierarchyLevel: data.includeChildren ? hierarchyValue : 0,
        excludeQuery: data.excludeFilterExpression,
        // linkType: data.includeRelated ? linkType : "",
        linkTypes: data.includeRelated ? transformedLinkType : [],
        columnName: data.columnName,
        contextId: "",
        order: data.order ?? 0,
        isFinished: data.isFinished ?? false,
        isArchived: data.isArchived ?? false,
      };
      const afterSuccess = () => {
        setWaitingAlertOpen(false);
        setSuccessMessage(
          `Obeya Room ${isEditing ? "saved" : "created"} successfully!`
        );
        setSuccessAlertOpen(true);
        const updatedRooms: any = [];
        (obeyaData?.obeyaRooms || []).forEach((room) => {
          if (room.roomId === location.state?.obeyaRoom?.roomId) {
            updatedRooms.push(formData);
          } else {
            updatedRooms.push(room);
          }
        });
        cache.delete(mutateObeyaRoomsKey);
        mutate(mutateObeyaRoomsKey, updatedRooms);
        history.push({
          pathname: InitiativeSocialFeedHome,
          state: { obeyaRoom: formData },
        });
      };

      const afterError = () => {
        setWaitingAlertOpen(false);
        setErrorAlertOpen(true);
      };

      try {
        if (isEditing) {
          const roomsList = obeyaData?.obeyaRooms || [];
          const newItems = roomsList.filter(
            (room) => room.roomId !== formData.roomId
          );

          const updatedList = [
            ...newItems,
            {
              ...formData,
              beginDate: DateTime.fromJSDate(formData.beginDate).toUTC(),
              endDate: DateTime.fromJSDate(formData.endDate).toUTC(),
            },
          ];

          const formDataToUpdate = {
            ...(defaultFormValues || {}),
            ...formData,
            flomatikaQuery: formData.flomatikaQuery,
            parsedQuery: formData.flomatikaQuery,
            excludeQuery: formData.excludeQuery,
            parsedExcludeQuery: formData.excludeQuery,
          };

          const newObeyaRooms = sortByString(updatedList, "roomName");

          await update(
            mutateObeyaRoomsKey,
            formDataToUpdate,
            newObeyaRooms,
            afterSuccess,
            afterError
          );
        } else {
          await add(
            mutateObeyaRoomsKey,
            formData,
            obeyaData,
            afterSuccess,
            afterError,
            true
          );
        }
      } catch (e) {
        console.log("error", e);
      }
    },
    [
      add,
      update,
      history,
      defaultFormValues,
      hierarchyValue,
      transformedLinkType,
    ]
  );

  const requiredMessage = "This field is required";

  const validationSchema = yup.object().shape({
    roomName: yup.string().required(requiredMessage),
    goal: yup.string().optional(),
    filterExpression: yup.string().required(requiredMessage),
    beginDate: yup.date().required(requiredMessage),
    endDate: yup.date().required(requiredMessage),
  });

  const resolver: any = yupResolver(validationSchema);
  const methods = useForm<FormValues>({
    resolver,
    defaultValues: {
      option: "initiative",
      roomName: "",
      goal: "",
      beginDate: DateTime.now(),
      endDate: DateTime.local().plus({ months: 3 }),
      filterExpression: "",
    },
  });

  const {
    getValues,
    control,
    register,
    handleSubmit,
    formState,
    setError,
    clearErrors,
    setValue,
  } = methods;

  const { errors } = formState;

  useEffect(() => {
    const telemetryAction = location.state?.obeyaRoom?.roomId
      ? "AccessEditObeyaRoomForm"
      : "AccessNewObeyaRoomForm";
    sendTelemetry(
      telemetryAction,
      `${telemetryAction} - RoomId: ${location.state?.obeyaRoom?.roomId}, RoomName: ${location.state?.obeyaRoom?.roomName}`,
      { page: "obeya", widget: "room" }
    );
  }, []);

  useEffect(() => {
    if (
      !defaultFormValues &&
      !formState.isDirty &&
      !!location.state?.obeyaRoom
    ) {
      setDefaultFormValues(location.state?.obeyaRoom);
      setValue("roomName", location.state?.obeyaRoom?.roomName, {
        shouldDirty: true,
      });
      setValue("goal", location.state?.obeyaRoom?.goal);
      setValue("beginDate", location.state?.obeyaRoom?.beginDate);
      setValue("endDate", location.state?.obeyaRoom?.endDate);
      setValue("filterExpression", location.state?.obeyaRoom?.flomatikaQuery);
      setValue("includeRelated", location.state?.obeyaRoom?.includeRelated);
      setValue("includeChildren", location.state?.obeyaRoom?.includeChildren);
      setValue(
        "includeChildrenOfChildren",
        location.state?.obeyaRoom?.includeChildrenOfChildren
      );
      setValue(
        "includeChildrenOfRelated",
        location.state?.obeyaRoom?.includeChildrenOfRelated
      );
      setValue("hierarchyLevel", location.state?.obeyaRoom?.hierarchyLevel);
      setValue(
        "excludeFilterExpression",
        location.state?.obeyaRoom?.excludeQuery
      );
      setValue("linkType", location.state?.obeyaRoom?.linkType);
      setValue("columnName", location.state?.obeyaRoom?.columnName);
      setValue("order", location.state?.obeyaRoom?.order);
      setValue("isFinished", location.state?.obeyaRoom?.isFinished);
      setValue("isArchived", location.state?.obeyaRoom?.isArchived);
    }
  }, [
    location,
    setDefaultFormValues,
    defaultFormValues,
    setValue,
    formState.isDirty,
  ]);

  const { data: linkTypesData, isLoading: isLoadingLinkTypes } = useLinkTypes();

  const linkTypes = linkTypesData || [];

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

  if (!isAdmin) {
    return <Redirect to={BaseRoutes.InitiativeSocialFeed} />;
  }
  return (
    <Box>
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={waitingAlertOpen}
        autoHideDuration={40000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="info">
          Your changes are being saved...
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorAlertOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="error">
          Error saving this obeya room.
        </Alert>
      </Snackbar>
      <Box height={60} ml={8} mt={6}>
        <Link
          to="/governance-obeya/governance-obeya-rooms"
          className={classes.backToLink}
        >
          <ArrowBackIcon /> MANAGE OBEYA ROOMS
        </Link>
      </Box>
      <Box className={classes.general} mb={4}>
        <Box className={classes.wrapperGeneral}>
          <Box display="inline-flex" pr={10}>
            <Typography variant="h5" className={classes.subtitle}>
              {defaultFormValues ? "Edit Obeya Room" : "Create an Obeya Room"}
            </Typography>
          </Box>
          <Box>
            <FormProvider {...methods}>
              <form
                name="interationForm"
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                <Box className={classes.wrapper}>
                  <Box>
                    <Box className={classes.section}>
                      <Typography
                        className={`${classes.titleSection} ${classes.titleObeyaInfo}`}
                      >
                        Obeya Information
                      </Typography>
                      <Box>
                        <Input
                          {...register("roomName")}
                          required
                          fullWidth
                          name="roomName"
                          placeholder="Name"
                          control={control}
                          className={classes.input}
                          errors={errors}
                          classes={classes}
                        />
                      </Box>
                      <Box>
                        <Input
                          {...register("goal")}
                          fullWidth
                          name="goal"
                          placeholder="What is the purpose for this Obeya?"
                          control={control}
                          className={classes.input}
                          errors={errors}
                          classes={classes}
                        />
                      </Box>
                      <Box className={classes.datesSelectionContainer}>
                        <Box className={classes.datepickerBox} ml={1}>
                          <DatePicker
                            {...register("beginDate")}
                            name="beginDate"
                            label="Expected Start Date"
                            format={DEFAULT_DATE_FORMAT}
                            placeholder="Expected Start Date"
                            margin="normal"
                            className={classes.datepicker}
                            control={control}
                            errors={errors}
                          />
                        </Box>
                        <Box className={classes.datepickerBox}>
                          <DatePicker
                            {...register("endDate")}
                            name="endDate"
                            label="Expected End Date"
                            format={DEFAULT_DATE_FORMAT}
                            placeholder="Expected End Date"
                            margin="normal"
                            className={classes.datepicker}
                            control={control}
                            errors={errors}
                          />
                        </Box>

                        <Box
                          className={classes.datepickerBox}
                          style={{ visibility: "hidden" }}
                        >
                          <FormHelperText>
                            Portfolio Board Column{" "}
                          </FormHelperText>
                          <Input
                            {...register("columnName")}
                            fullWidth
                            name="columnName"
                            className={classes.input}
                            errors={errors}
                            classes={classes}
                          />
                        </Box>

                        <Box
                          className={classes.datepickerBox}
                          style={{ visibility: "hidden" }}
                        >
                          <Input
                            {...register("order")}
                            fullWidth
                            name="order"
                            className={classes.input}
                            errors={errors}
                            classes={classes}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box className={classes.section}>
                      <Typography
                        className={`${classes.titleSection} ${classes.titleFilter}`}
                      >
                        Filter Expression
                      </Typography>
                      <Box>
                        <FQLInputObeya
                          {...{
                            displayName: "filterExpression",
                            fieldNameInForm: "filterExpression",
                            registerOptions: {
                              required: "Filter Expression is Required",
                            },
                            namespace: "-",
                            provider: "-",
                          }}
                          control={methods.control}
                          className={classes.input}
                          errors={errors}
                          classes={classes}
                          setValidate={setValidatingFql}
                          validatingFql={validatingFql}
                          setError={setError}
                          clearErrors={clearErrors}
                          register={register}
                          getValues={getValues}
                          formState={formState}
                        />
                      </Box>
                      <ChildItemsAndChildrenOfChild
                        control={control}
                        handleChange={handleChange}
                      />
                      <RelatedAndChildrenOfRelated
                        values={!isLoadingLinkTypes ? linkTypes : []}
                        control={control}
                        inputRelatedName="includeRelated"
                        inputChildrenOfRelatedName="includeChildrenOfRelated"
                        defaultLinkTypeValue={
                          location.state?.obeyaRoom?.linkTypes
                        }
                        multiselectLinkTypeName="linkType"
                        defaultRelatedValue={
                          location.state?.obeyaRoom?.includeRelated
                        }
                        defaultChildrenOfRelatedValue={
                          location.state?.obeyaRoom?.includeChildrenOfRelated
                        }
                        shouldReset={!getValues()?.includeRelated}
                        setValue={setValue}
                        handleChange={handleRelatedChange}
                        wrapperRelated={(children) => (
                          <Box display="flex" alignItems="center" mt={1} ml={1}>
                            {children}
                          </Box>
                        )}
                        customWidth={350}
                        customMargin={1}
                        name={linkType}
                      />

                      <Box mt={2}>
                        <FQLInputObeya
                          {...{
                            displayName: "excludeFilterExpression",
                            fieldNameInForm: "excludeFilterExpression",
                            namespace: "-",
                            provider: "-",
                          }}
                          placeholder="Exclude Filter Expression (optional)"
                          control={methods.control}
                          className={classes.input}
                          errors={errors}
                          classes={classes}
                          setValidate={setValidatingExcludeFql}
                          validatingFql={validatingExcludeFql}
                          setError={setError}
                          clearErrors={clearErrors}
                          register={register}
                          getValues={getValues}
                          formState={formState}
                        />
                      </Box>
                    </Box>
                    <Grid container spacing={1}>
                      <Grid item xs={6} container direction="column">
                        <Button
                          variant="outlined"
                          color="primary"
                          fullWidth
                          className={classes.buttonCancel}
                          type="button"
                        >
                          CANCEL
                        </Button>
                      </Grid>
                      <Grid item xs={6} container direction="column">
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          startIcon={
                            formState.isSubmitting && <HourglassEmptyIcon />
                          }
                          disabled={
                            !!(
                              Object.keys(errors)?.length ||
                              formState.isSubmitting ||
                              validatingFql ||
                              validatingExcludeFql ||
                              !formState.isDirty
                            )
                          }
                          className={classes.buttonSave}
                          type="submit"
                        >
                          {defaultFormValues ? "SAVE" : "CREATE"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </form>
            </FormProvider>
          </Box>
        </Box>
      </Box>
      <MuiContainer component="main" maxWidth="lg" className={classes.main}>
        <FQLAuxiliaryTable
          fields={fields}
          isValidating={isValidatingCustomFields}
        />
      </MuiContainer>
      <Box className={classes.general} mb={4}>
        <Box flexDirection="column">
          <Box className={classes.wrapperGeneral}>
            <FQLUserGuide />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});
