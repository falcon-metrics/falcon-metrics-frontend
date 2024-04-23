import { useState, useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import ModalStrategicsDrivers from "../TableNorthStar/components/ModalStrategicsDrivers";
import ModalStrategicHorizon from "../TableNorthStar/components/ModalStrategicHorizon";
import TableNorthStar from "../TableNorthStar";
import TableStrategicHorizon from "../TableStrategicHorizon";
import SaveButton from "components/NavigationButtons/components/SaveButton";
import AddIcon from "@material-ui/icons/Add";

import { useStyles } from "./NorthStarForm.styles";
import { AddButton } from "../TableNorthStar/TableNorthStar";
import { useConfirm } from "material-ui-confirm";
import { Typography } from "@material-ui/core";
import _, { noop } from "lodash";
import { DateTime } from "luxon";
import { v4 as uuidV4 } from 'uuid';

const emptyState = {
  id: "",
  title: "",
  startDate: DateTime.now(),
  endDate: DateTime.now().plus({ days: 30 }),
  uuid: uuidV4()
};

const CustomTextField = styled(TextField)({
  "&": {
    width: "100%",
    color: "#1890ff",
    fontFamily: "Open Sans",
  },
  "& .MuiFormLabel-root": {
    fontFamily: "Open Sans",
  },
});

type FormFields = {
  id?: string | number;
  visionStatement?: string;
  missionStatement?: string;
  iconName: string;
  strategicDrivers: any[];
  colour?: string;
  horizons: any[];
};

const defaultValidatorSchema = yup.object().shape({
  visionStatement: yup.string().required("Vision is required"),
  missionStatement: yup.string().required("Mission is required"),
});

function formattStrategicForm(formValues: FormFields) {
  const strategicWithoutIds = (formValues?.strategicDrivers || []).map(
    (strategicItem) => ({
      description: strategicItem?.description,
      name: strategicItem?.name,
      uuid: strategicItem?.uuid,
      icon_name: strategicItem?.icon_name,
      colour: strategicItem?.colour,
      oneLineSummary: strategicItem?.oneLineSummary,
    })
  );
  return {
    id: formValues.id,
    visionStatement: formValues.visionStatement,
    missionStatement: formValues.missionStatement,
    strategicDrivers: strategicWithoutIds,
    horizons: formValues.horizons,
  };
}

const SaveButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  // The rules below are to place the save button above the form
  // This is to make the save button always visible
  marginTop: 10,
  position: "absolute",
  bottom: 25,
  right: 64,
  width: "100%",
  background: "rgb(252, 252, 252)",
  // background: 'red',
});

const StrategicDriversTitle = styled(Box)({
  fontSize: 18,
  fontWeight: "bold",
  fontFamily: "Open Sans",
});

const StrategicHorizonTitle = styled(Box)({
  fontSize: 18,
  fontWeight: "bold",
  fontFamily: "Open Sans",
});

const WrapperTable = styled(Box)({
  display: "flex",
  flexDirection: "column",
  paddingTop: 34,
});

type Props = {
  afterSuccess: () => void;
  data: any;
  isLoadingVisions: boolean;
  mutateVisions: (newVisions?: any, shouldRevalidate?: boolean) => void;
  postVision: (values?: any) => Promise<unknown>;
  updateVision: (values?: any) => Promise<unknown>;
  setIsFormDirty: any;
  setFormModified: any;
  formDirty: boolean;
};

const NorthStarForm = ({
  afterSuccess,
  data,
  isLoadingVisions,
  mutateVisions,
  postVision,
  updateVision,
  formDirty,
  setIsFormDirty,
  setFormModified,
}: Props) => {
  const classes = useStyles();
  const confirm = useConfirm();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isOpenModalStrategicHorizon, setOpenModalStrategicHorizon] = useState(
    false
  );

  const [horizonInfoToEdit, setHorizonInfoToEdit] = useState<any>(emptyState);
  const [strategicInfoToEdit, setStrategicInfoToEdit] = useState<any>(
    emptyState
  );

  const [strategyHorizons, setStrategyHorizons] = useState<any>([]);
  const [strategicDrivers, setStrategicDrivers] = useState<any>([]);

  const resolver = yupResolver(defaultValidatorSchema);

  const formMethods = useForm<FormFields>({
    resolver,
    defaultValues: {
      id: "",
      visionStatement: "",
      missionStatement: "",
      iconName: "",
      strategicDrivers: [],
      horizons: [],
    },
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = formMethods;

  useEffect(() => {
    if (data && !isDirty) {
      setValue("id", data?.id);
      setValue("visionStatement", data?.visionStatement || "");
      setValue("missionStatement", data?.missionStatement || "");
      setValue("iconName", data?.iconName || "");
      setValue("strategicDrivers", data?.strategicDrivers || []);

      setStrategicDrivers(data?.strategicDrivers || []);
    }
  }, [data?.strategicDrivers, data]);

  useEffect(() => {
    if (data && !isDirty) {
      setValue("horizons", data?.horizons);
    }
    setStrategyHorizons(data?.horizons || []);
  }, [data?.horizons, data]);

  const onSubmitValues = async () => {
    if (Object.keys(errors).length) {
      return;
    }
    const formValues = getValues();

    // check when has id use update otherwise post
    try {
      mutateVisions({ data: [formValues] }, false);
      setOpenModal(false);
      afterSuccess?.();
      const values = formattStrategicForm(formValues);
      if (formValues?.id) {
        await updateVision(values);
      } else {
        await postVision(values);
      }
      mutateVisions({ data: [formValues] }, true);
    } catch (e) {
      console.log("error when postVision", e);
    }
  };

  const openModal = () => {
    setStrategicInfoToEdit(undefined);
    setOpenModal(true);
  };

  const openModalStrategicHorizon = () => {
    setHorizonInfoToEdit(undefined);
    setOpenModalStrategicHorizon(true);
  };

  const onSubmitStrategicDrivers = (newStrategicDriver) => {
    // merge currentStatregicDrivers with new
    const { strategicDrivers } = getValues();

    if (
      !(strategicDrivers || []).find((d) => d.uuid === newStrategicDriver.uuid)
    ) {
      setValue("strategicDrivers", [
        ...(strategicDrivers || []),
        newStrategicDriver,
      ]);
      if (newStrategicDriver.colour === "") {
        newStrategicDriver.colour = "#04548A"; // Set a default color
      }
      mutateVisions(
        {
          data: [
            {
              ...data,
              strategicDrivers: [
                ...(data?.strategicDrivers || []),
                newStrategicDriver,
              ],
            },
          ],
        },
        false
      );
    } else {
      const newStrategicDriversList = (data?.strategicDrivers || []).map(
        (s) => {
          if (s.uuid === newStrategicDriver.uuid) {
            return newStrategicDriver;
          }
          return s;
        }
      );
      setValue("strategicDrivers", newStrategicDriversList);
      mutateVisions(
        {
          data: [
            {
              ...data,
              strategicDrivers: newStrategicDriversList,
            },
          ],
        },
        false
      );
    }

    setOpenModal(false);
  };

  const onSubmitStrategicsHorizonForm = (newStrategicHorizon) => {
    const allItems = [...(data?.horizons || [])];
    const shouldCreate = !allItems?.find(
      (d) => d?.uuid === newStrategicHorizon?.uuid
    );

    if (shouldCreate) {
      mutateVisions(
        {
          data: [
            {
              ...data,
              horizons: [...allItems, newStrategicHorizon],
            },
          ],
        },
        false
      );
      setValue("horizons", [...allItems, newStrategicHorizon]);
    } else {
      const newList = allItems.reduce((acc, h, index) => {
        if (h?.uuid === newStrategicHorizon?.uuid) {
          acc[index] = newStrategicHorizon;
        } else {
          acc[index] = h;
        }
        return acc;
      }, []);
      mutateVisions(
        {
          data: [
            {
              ...data,
              horizons: newList,
            },
          ],
        },
        false
      );
    }
    setHorizonInfoToEdit(emptyState);
    setOpenModalStrategicHorizon(false);
  };

  const onEditStrategicDriver = (strategicDriverInfo) => {
    setStrategicInfoToEdit(strategicDriverInfo);
    setOpenModal(true);
  };

  const onEditHorizon = (horizonInfo) => {
    setHorizonInfoToEdit(horizonInfo);
    setOpenModalStrategicHorizon(true);
  };

  const onRemoveStrategicDriver = (strategicDriverInfo) => {
    confirm({
      title: `Are you sure you want to delete ${strategicDriverInfo?.name}?`,
      description: (
        <Typography>This strategic driver will be deleted.</Typography>
      ),
      cancellationText: "Cancel",
      confirmationText: "Delete",
    })
      .then(() => {
        const driversCopy = _.cloneDeep(getValues()?.strategicDrivers || []).filter(
          (s) => s?.uuid !== strategicDriverInfo?.uuid
        );

        // const newList = (getValues()?.strategicDrivers || []).filter(
        //   (s) => s?.uuid !== strategicDriverInfo?.uuid
        // );

        // setValue("strategicDrivers", driversCopy || []);
        setStrategicDrivers(driversCopy || []);
        mutateVisions(
          {
            data: [
              {
                ...data,
                strategicDrivers: driversCopy,
              },
            ],
          },
          false
        );
      })
      .catch(noop);
  };

  const onRemoveHorizon = (horizonInfo) => {
    confirm({
      title: `Are you sure you want to delete ${horizonInfo?.title}?`,
      description: (
        <Typography>This strategy horizon will be deleted.</Typography>
      ),
      cancellationText: "Cancel",
      confirmationText: "Delete",
    })
      .then(() => {
        const horizonsCopy = _.cloneDeep(getValues()?.horizons || []).filter(
          (s) => s?.uuid !== horizonInfo?.uuid
        );

        setStrategyHorizons(horizonsCopy || []);
        mutateVisions(
          {
            data: [
              {
                ...data,
                horizons: horizonsCopy,
              },
            ],
          },
          false
        );
      })
      .catch(noop);
  };

  const [isStrategicDriverDirty, setStrategicDriverDirty] = useState(false);
  const [isStrategicHorizonDirty, setStrategicHorizonDirty] = useState(false);

  useEffect(() => {
    setStrategicDriverDirty(!_.isEqual(data?.strategicDrivers, strategicDrivers));
    setStrategicHorizonDirty(!_.isEqual(data?.horizons, strategyHorizons));
    
    setIsFormDirty(isDirty || isStrategicDriverDirty || isStrategicHorizonDirty);
    setFormModified(isDirty || isStrategicDriverDirty || isStrategicHorizonDirty);

  }, [isDirty, data?.strategicDrivers, data?.horizons]);

  return (
    <Box className={classes.wrapperForm}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Box>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmitValues)}
          >
            <>
              <Controller
                render={({ field }) => {
                  return (
                    <Box style={{ width: "100%" }}>
                      <FormControl className={classes.inputSize}>
                        <CustomTextField
                          {...field}
                          className={classes.textField}
                          size="medium"
                          multiline
                          fullWidth
                          maxRows={3}
                          onChange={field.onChange}
                          value={field.value}
                          InputLabelProps={{ shrink: true }}
                          error={!!errors?.visionStatement}
                          label="Vision Statement"
                          inputProps={{ style: { fontFamily: "Open Sans" } }}
                        />
                      </FormControl>
                      <FormHelperText className={classes.helpText}>
                        {errors && errors?.visionStatement?.message}
                      </FormHelperText>
                    </Box>
                  );
                }}
                name="visionStatement"
                control={control}
              />
              <Controller
                render={({ field }) => {
                  return (
                    <>
                      <FormControl className={classes.inputSize}>
                        <CustomTextField
                          {...field}
                          className={classes.textField}
                          size="medium"
                          multiline
                          fullWidth
                          minRows={4}
                          maxRows={6}
                          onChange={field.onChange}
                          value={field.value}
                          InputLabelProps={{ shrink: true }}
                          error={!!errors?.missionStatement}
                          label="Mission Statement"
                          inputProps={{ style: { fontFamily: "Open Sans" } }}
                        />
                      </FormControl>
                      <FormHelperText className={classes.helpText}>
                        {errors && errors?.missionStatement?.message}
                      </FormHelperText>
                    </>
                  );
                }}
                name="missionStatement"
                control={control}
              />
            </>
            <WrapperTable>
              <Box display={"flex"} justifyContent={"space-between"} mb={2}>
                <StrategicDriversTitle>Strategic Drivers</StrategicDriversTitle>
                <AddButton startIcon={<AddIcon />} onClick={openModal}>
                  Strategic Driver
                </AddButton>
              </Box>
              <TableNorthStar
                loading={isLoadingVisions}
                handleEditClick={onEditStrategicDriver}
                onAddStrategicDriver={openModal}
                strategicsDataRows={strategicDrivers || []}
                onRemoveStrategicDriver={onRemoveStrategicDriver}
              />

              <Box
                display={"flex"}
                justifyContent={"space-between"}
                mb={2}
                mt={5}
              >
                <StrategicHorizonTitle>Strategy Horizon</StrategicHorizonTitle>
                <AddButton
                  startIcon={<AddIcon />}
                  onClick={openModalStrategicHorizon}
                >
                  Strategy Horizon
                </AddButton>
              </Box>
              <TableStrategicHorizon
                loading={isLoadingVisions}
                handleEditClick={onEditHorizon}
                onAddStrategicDriver={openModalStrategicHorizon}
                strategicsDataRows={strategyHorizons || []}
                onRemoveHorizon={onRemoveHorizon}
              />
              <SaveButtonContainer>
                <SaveButton
                  isSubmitting={isSubmitting}
                  className={classes.saveButton}
                  disabled={
                    !formDirty ||
                    isSubmitting ||
                    !!Object.keys(errors)?.length
                  }
                  defaultText="Save"
                  submittingText="Saving..."
                />
              </SaveButtonContainer>
            </WrapperTable>
          </form>
        </Box>
        <Box className={classes.wrapperStrateticTable}>
          <ModalStrategicsDrivers
            strategicInfoToEdit={strategicInfoToEdit}
            onSubmitStrategicDrivers={onSubmitStrategicDrivers}
            onClickStrategicDrive={openModal}
            isOpenModalStrategic={isOpenModal}
            setOpenModalStrategic={setOpenModal}
          />
        </Box>
        <Box className={classes.wrapperStrateticTable}>
          <ModalStrategicHorizon
            horizonInfoToEdit={horizonInfoToEdit}
            onSubmitStrategicDrivers={onSubmitStrategicsHorizonForm}
            onClickStrategicDrive={openModalStrategicHorizon}
            isOpenModalStrategic={isOpenModalStrategicHorizon}
            setOpenModalStrategic={setOpenModalStrategicHorizon}
          />
        </Box>
      </MuiPickersUtilsProvider>
    </Box>
  );
};

export default memo(NorthStarForm);
