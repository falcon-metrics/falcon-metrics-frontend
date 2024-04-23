import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import _ from "lodash";
import {
  MetricsEntry,
  Perspective,
  PerspectiveOption,
} from "views/BusinessScorecard/interfaces/interfaces";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { metricTypes } from "views/BusinessScorecard/utils/utils";
import { v4 as uuidV4 } from "uuid";
import DatePicker from "views/Governance/views/GovernanceObeya/components/DatePicker";
import ContextSelector from "views/LeanPortfolio/components/ContextSelector";
import { DEFAULT_DATE_FORMAT } from "utils/dateTime";
import {
  Section,
  GroupTitle,
  SectionTitle,
  StyledTextField,
  StyledSelect,
  StyledNumeric,
  SaveButtonContainer,
} from "./styles";
import Spinner from "components/UI/MUIFormInput/components/MUIFormInputSpinner/MUIFormInputSpinner";
import useFilterPanelContext from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext";

const filter = createFilterOptions<PerspectiveOption>();
type MetricFormProps = {
  perspectives: Perspective[];
  setPerspectives: any;
  metricModalData: MetricsEntry;
  setMetricModalData: any;
  metrics: MetricsEntry[];
  setMetrics: any;
  openEditMetricModal: boolean;
  setOpenEditMetricModal: any;
  onSaveMetrics: any;
  isFormDirty: boolean;
  setFormDirty: (val: boolean) => void;
};
type MetricFormFields = {
  perspective?: string;
  name?: string;
  type?: string;
  target?: number;
  lowerLimit?: number;
  upperLimit?: number;
  unit?: string;
  trendDirection?: string;
  initialRecordedDate?: Date;
  initialValue?: number;
  id?: string;
};

const REQUIRED_MESSAGE = "Required";

const validatorSchema = yup.object().shape({
  perspective: yup.string().required(REQUIRED_MESSAGE),
  name: yup.string().required(REQUIRED_MESSAGE),
  type: yup.string().required(REQUIRED_MESSAGE),
  target: yup.mixed().when("type", {
    is: (value) => {
      if (value === "fitness-criteria" || value === "improvement-driver") {
        return true;
      }
    },
    then: yup.string().required(REQUIRED_MESSAGE),
  }),
  lowerLimit: yup.mixed().when("type", {
    is: "health-indicator",
    then: yup.string().required(REQUIRED_MESSAGE),
  }),
  upperLimit: yup.mixed().when("type", {
    is: "health-indicator",
    then: yup.string().required(REQUIRED_MESSAGE),
  }),
  unit: yup.string().required(REQUIRED_MESSAGE),
  trendDirection: yup.string().required(REQUIRED_MESSAGE),
  initialRecordedDate: yup.string().when("id", {
    is: undefined,
    then: yup.string().required(REQUIRED_MESSAGE),
  }),
  initialValue: yup.mixed().when("id", {
    is: undefined,
    then: yup.string().required(REQUIRED_MESSAGE),
  }),
  id: yup.string(),
});

const MetricForm = (props: MetricFormProps) => {
  const resolver = yupResolver(validatorSchema);
  // to force re-render when type is changed , react form hook prevents this specific behaviour
  const [type, setType] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedKeys, setSelectedKeys] = useState(["", "", ""]);
  const [selected, setSelected] = useState("");

  const {
    otherApiQueryParameters: { contextId },
  } = useFilterPanelContext();

  const formMethods = useForm<MetricFormFields>({
    resolver,
    defaultValues: {
      perspective: undefined,
      name: "",
      type: "",
      target: undefined,
      lowerLimit: undefined,
      upperLimit: undefined,
      unit: "",
      trendDirection: "",
      initialRecordedDate: new Date(),
      initialValue: undefined,
      id: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    register,
    clearErrors,
    formState: { errors, isSubmitting, isDirty },
  } = formMethods;

  const [selectedPerspective, setSelectedPerspective] = useState<
    string | undefined
  >();

  // Function to reset the perspective field error
  const resetPerspectiveError = () => {
    clearErrors("perspective");
  };

  useEffect(() => {
    if (selectedPerspective) {
      // Reset the perspective field error when a perspective is selected
      resetPerspectiveError();
    }
  }, [selectedPerspective]);

  useEffect(() => {
    const isPerspectiveDirty = !_.isEqual(props.metricModalData.perspective, getValues().perspective)
    props.setFormDirty(isDirty || isPerspectiveDirty);
  }, [isDirty, getValues().perspective]);

  useEffect(() => {
    setValue("perspective", props.metricModalData.perspective);
    setValue("name", props.metricModalData.name);
    setValue("type", props.metricModalData.type);
    setValue("target", props.metricModalData.target);
    setValue("lowerLimit", props.metricModalData.lowerLimit);
    setValue("upperLimit", props.metricModalData.upperLimit);
    setValue("unit", props.metricModalData.unit);
    setValue("trendDirection", props.metricModalData.trendDirection);
    setValue("id", props.metricModalData.id);
    setType(props.metricModalData.type);
  }, [props.metricModalData]);

  const onSubmitForm = () => {
    const updatedMetric: MetricsEntry = {
      id:
        props.metricModalData.id === undefined
          ? uuidV4()
          : props.metricModalData.id,
      name: getValues().name || "",
      type: getValues().type || "",
      lowerLimit: getValues().lowerLimit,
      upperLimit: getValues().upperLimit,
      target: Number(getValues().target),
      metricValues:
        props.metricModalData.id === undefined
          ? [
              {
                id: uuidV4(),
                recordedDate: getValues().initialRecordedDate?.toISOString(),
                value: parseInt(getValues().initialValue?.toString() || ""),
              },
            ]
          : props.metricModalData.metricValues,
      perspective: getValues().perspective,
      context: selected,
      unit: getValues().unit,
      trendDirection: getValues().trendDirection,
    };

    const metricsCopy = _.cloneDeep(props.metrics);
    const idx = metricsCopy.findIndex((i) => i.id === props.metricModalData.id);
    idx === -1
      ? metricsCopy.push(updatedMetric)
      : (metricsCopy[idx] = updatedMetric);
    props.setMetrics(metricsCopy);
    props.onSaveMetrics(metricsCopy);
    props.setOpenEditMetricModal(!props.openEditMetricModal);
  };

  const getSelectedColumnValue = (array) => {
    let _selected = "";

    if (array[0] !== "") {
      if (array[1] === "all" || array[1] === "") {
        _selected = array[0];
      } else if (array[2] === "all" || array[2] === "") {
        _selected = array[1];
      } else {
        _selected = array[2];
      }
    } else {
      _selected = array[0];
    }

    return _selected;
  };

  useEffect(() => {
    setSelected(getSelectedColumnValue(selectedKeys));
  }, [selectedKeys]);

  return (
    <Box display="flex" flexDirection="column">
      <Box
        mb={3}
        style={{
          display: "flex",
          paddingTop: 25,
          paddingLeft: 25,
          flexDirection: "column",
          marginBottom: 35,
        }}
      >
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Section>
            <GroupTitle>Boards & Aggregations</GroupTitle>
            <ContextSelector
              currentContextId={props.metricModalData.context || contextId}
              selectedKeys={selectedKeys}
              setSelectedKeys={setSelectedKeys}
              register={register}
              control={control}
              errors={errors}
            />

            <Box style={{ paddingTop: 20 }}>
              <GroupTitle>Perspective</GroupTitle>
              <Controller
                render={({ field }) => {
                  return (
                    <Autocomplete
                      aria-required={true}
                      defaultValue={
                        props.perspectives.find(
                          (i) => i.id === props.metricModalData.perspective
                        ) || null
                      }
                      value={
                        props.perspectives.find((i) => i.id === field.value) ||
                        null
                      }
                      onChange={(event, newValue) => {
                        if (typeof newValue === "string") {
                          const perspectiveId = props.perspectives.find(
                            (i) => i.name === newValue
                          )?.id;
                          setValue("perspective", perspectiveId);
                          setSelectedPerspective(perspectiveId);
                        } else if (newValue && newValue.inputValue) {
                          // Create a new value from the user input

                          const newId = uuidV4();
                          const newPerspective: Perspective = {
                            id: newId,
                            name: newValue.inputValue,
                          };
                          const perspectivesCopy = _.cloneDeep(
                            props.perspectives
                          );
                          perspectivesCopy.push(newPerspective);
                          props.setPerspectives(perspectivesCopy);
                          setValue("perspective", newId);
                          setSelectedPerspective(newId);
                        } else {
                          const newId = props.perspectives.find(
                            (i) => i.id === newValue?.id
                          )?.id;
                          setValue("perspective", newId);
                          setSelectedPerspective(newId);
                        }
                        setValue("target", undefined);
                        setValue("lowerLimit", undefined);
                        setValue("upperLimit", undefined);
                      }}
                      filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        // Suggest the creation of a new value
                        if (params.inputValue !== "") {
                          filtered.push({
                            inputValue: params.inputValue,
                            name: `Add "${params.inputValue}"`,
                          });
                        }

                        return filtered;
                      }}
                      getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === "string") {
                          return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                          return option.inputValue;
                        }
                        // Regular option
                        return option.name || "abc";
                      }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      id="perspective"
                      options={props.perspectives as PerspectiveOption[]}
                      renderOption={(option) => option.name}
                      style={{ width: 300 }}
                      freeSolo
                      inputValue={inputValue}
                      onInputChange={(_, newInputValue) => {
                        setInputValue(newInputValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Perspective" />
                      )}
                    />
                  );
                }}
                name="perspective"
                control={control}
              />
              <FormHelperText error>
                {errors && errors?.perspective?.message}
              </FormHelperText>
            </Box>
          </Section>

          <Section>
            <SectionTitle>Metric Details</SectionTitle>
            <Box display="flex" flexDirection="column">
              <Controller
                render={({ field }) => {
                  return (
                    <StyledTextField
                      id={"metric-name"}
                      size="medium"
                      fullWidth
                      variant="standard"
                      label="Metric Name"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  );
                }}
                name="name"
                control={control}
              />
              <FormHelperText error>
                {errors && errors?.name?.message}
              </FormHelperText>

              <FormControl variant="standard" fullWidth>
                <InputLabel id={"metric-type-label" + props.metricModalData.id}>
                  Metric Type
                </InputLabel>
                <Controller
                  render={({ field }) => {
                    const options = metricTypes.map((type) => (
                      <MenuItem value={type.id} key={type.id}>
                        {type.displayName}
                      </MenuItem>
                    ));
                    return (
                      <StyledSelect
                        labelId={"metric-type-label"}
                        id={"metric-type-label"}
                        value={field.value}
                        onChange={(event) => {
                          field.onChange(event);
                          setType((event.target.value as string) || "");
                        }}
                        fullWidth={true}
                      >
                        {options}
                      </StyledSelect>
                    );
                  }}
                  name="type"
                  control={control}
                />
                <FormHelperText error>
                  {errors && errors?.type?.message}
                </FormHelperText>
              </FormControl>

              {(type === "fitness-criteria" ||
                type === "improvement-driver") && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Controller
                    render={({ field }) => {
                      return (
                        <StyledTextField
                          type="number"
                          id={"metric-threshold"}
                          size="medium"
                          variant="standard"
                          label={
                            type === "fitness-criteria"
                              ? "Metric Threshold"
                              : "Metric Target"
                          }
                          value={field.value}
                          onChange={field.onChange}
                        />
                      );
                    }}
                    name="target"
                    control={control}
                  />
                  <FormHelperText error>
                    {errors && errors?.target?.message}
                  </FormHelperText>
                </div>
              )}
              {type === "health-indicator" && (
                <Box display="flex" flexDirection="row" gridGap={20}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Controller
                      render={({ field }) => {
                        return (
                          <StyledNumeric
                            type="number"
                            id={
                              "metric-lower-limit"
                            }
                            size="medium"
                            variant="standard"
                            label="Metric Lower Limit"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        );
                      }}
                      name="lowerLimit"
                      control={control}
                    />
                    <FormHelperText error>
                      {errors && errors?.lowerLimit?.message}
                    </FormHelperText>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Controller
                      render={({ field }) => {
                        return (
                          <StyledNumeric
                            type="number"
                            id={
                              "metric-upper-limit"
                            }
                            size="medium"
                            variant="standard"
                            label="Metric Upper Limit"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        );
                      }}
                      name="upperLimit"
                      control={control}
                    />
                    <FormHelperText error>
                      {errors && errors?.upperLimit?.message}
                    </FormHelperText>
                  </div>
                </Box>
              )}
              <Controller
                render={({ field }) => {
                  return (
                    <StyledTextField
                      id={"metric-unit"}
                      size="medium"
                      fullWidth
                      variant="standard"
                      label="Metric Unit"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  );
                }}
                name="unit"
                control={control}
              />
              <FormHelperText error>
                {errors && errors?.unit?.message}
              </FormHelperText>

              <FormControl variant="standard" fullWidth>
                <InputLabel
                  id={"metric-trend-direction-label" + props.metricModalData.id}
                >
                  Metric Trend Direction
                </InputLabel>
                <Controller
                  render={({ field }) => {
                    return (
                      <StyledSelect
                        labelId={
                          "metric-trend-direction-label"
                        }
                        id={
                          "metric-trend-direction-label"
                        }
                        value={field.value}
                        onChange={(event) => {
                          field.onChange(event);
                        }}
                        fullWidth={true}
                      >
                        <MenuItem value={"higher-is-better"}>
                          Higher is better
                        </MenuItem>
                        <MenuItem value={"lower-is-better"}>
                          Lower is better
                        </MenuItem>
                      </StyledSelect>
                    );
                  }}
                  name="trendDirection"
                  control={control}
                />
                <FormHelperText error>
                  {errors && errors?.trendDirection?.message}
                </FormHelperText>
              </FormControl>
            </Box>
          </Section>

          {props.metricModalData.id === undefined && (
            <Section>
              <SectionTitle>First Check-in</SectionTitle>
              <Box display="flex" flexDirection="column">
                <DatePicker
                  {...register("initialRecordedDate")}
                  defaulValue={undefined}
                  name="initialRecordedDate"
                  label="Date of Check-in"
                  format={DEFAULT_DATE_FORMAT}
                  placeholder="Date of Check-in"
                  margin="normal"
                  control={control}
                  errors={errors}
                  style={{ width: 300 }}
                />
                <Controller
                  render={({ field }) => {
                    return (
                      <StyledTextField
                        id="initialValue"
                        type="number"
                        size="medium"
                        variant="standard"
                        label="Initial Value"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                  name="initialValue"
                  control={control}
                />
                <FormHelperText error>
                  {errors && errors?.initialValue?.message}
                </FormHelperText>
              </Box>
            </Section>
          )}
        </form>
      </Box>

      <SaveButtonContainer>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => {
            handleSubmit(onSubmitForm)();
          }}
          disabled={!props.isFormDirty || !!Object.keys(errors).length || isSubmitting}
        >
          {isSubmitting ? (
            <Spinner
              isVisible={isSubmitting}
              style={{ marginLeft: 30, marginBottom: 2 }}
            />
          ) : (
            <span>Save</span>
          )}
        </Button>
      </SaveButtonContainer>
    </Box>
  );
};

export default MetricForm;
