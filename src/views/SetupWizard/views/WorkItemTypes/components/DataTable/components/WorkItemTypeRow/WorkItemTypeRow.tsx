import { ChangeEvent, useState } from "react";

import classNames from "classnames";
import { isKeyOf } from "utils/typescript/assertions";
import {
  RawDiscontinuedSteps,
  TransformedDatabaseWorkItemType,
  TransformedDatabaseWorkItemTypeStep,
} from "views/SetupWizard/views/WorkItemTypes/interfaces/interfaces";

import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import WorkItemTypeLevels from "../../../../interfaces/WorkItemTypeLevels";
import { DisplayNameSelector } from "./DisplayNameSelector";
import { EventSelectors } from "./EventSelectors";
import { LevelSelector } from "./LevelSelector";
import { StepsContainer } from "./StepsContainer";
import useStyles from "./WorkItemTypeRow.styles";
import { Button, IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import { difference } from "lodash";
import { useSnackbar } from "notistack";
import CallSplitIcon from '@material-ui/icons/CallSplit';
import CallMergeIcon from '@material-ui/icons/CallMerge';

type Props = {
  workItemType: TransformedDatabaseWorkItemType;
  errorFields: string[];
  workItemTypeOptions: string[];
  index: number;
  onChange: (
    index: number,
    value: Partial<TransformedDatabaseWorkItemType>
  ) => void;
  onDisplayNameChange: (value: string) => void;
  copiedWorkflow?: TransformedDatabaseWorkItemType;
  onCopyWorkflow: (workflow: TransformedDatabaseWorkItemType) => void;
  onExpanded: (id: number, isChecked?: boolean) => void;
  openAccordions: number[];
  isChangeFontColor: boolean;
  setFontColor: (value: boolean) => void;
  initDiscontinuedSteps: RawDiscontinuedSteps[];
  setInitDiscontinuedSteps: (steps: RawDiscontinuedSteps[]) => void;
  onWITChange: any;
  splitProjects: () => void;
  mergeProjects: () => void;
};

const WorkItemTypeRow = ({
  workItemType,
  errorFields: errors,
  workItemTypeOptions: workItemTypeOptions,
  index,
  onChange,
  onDisplayNameChange,
  copiedWorkflow,
  onCopyWorkflow,
  onExpanded,
  openAccordions,
  isChangeFontColor,
  setFontColor,
  initDiscontinuedSteps,
  setInitDiscontinuedSteps,
  onWITChange,
  splitProjects,
  mergeProjects
}: Props) => {
  const classes = useStyles();
  const stepOptions = workItemType?.steps.map(
    ({ id, name, isUnmapped, compositeId }) => ({
      id,
      name,
      isUnmapped,
      compositeId,
    })
  );

  const unselectedProjectIds = workItemType.projects
    .filter(({ isUnmapped }) => isUnmapped)
    .map(({ id }) => id);

  const isChecked = unselectedProjectIds.length === 0;
  const isUnchecked =
    unselectedProjectIds.length === workItemType.projects.length;
  const isIndeterminate = !(isChecked || isUnchecked);

  const handleChange = <K extends keyof TransformedDatabaseWorkItemType>(
    name: K,
    value: TransformedDatabaseWorkItemType[K]
  ) => {
    onChange(index, { [name]: value });
  };

  const handleChangeEvent = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown; }>
  ) => {
    const { name = "", value } = event.target;

    const steps = workItemType.steps;
    const arrivalIndex = steps.findIndex(
      (item) => item.compositeId === workItemType.arrivalId
    );
    const commitmentIndex = steps.findIndex(
      (item) => item.compositeId === workItemType.commitmentId
    );
    const departureIndex = steps.findIndex(
      (item) => item.compositeId === workItemType.departureId
    );

    if (name === "arrivalId") {
      const selectedIndex = steps.findIndex(
        (item) => item.compositeId === value
      );
      if (
        commitmentIndex >= 0 &&
        departureIndex >= 0 &&
        (selectedIndex >= commitmentIndex || selectedIndex >= departureIndex)
      ) {
        enqueueSnackbar(
          "Arrival Point cannot be after commitment or departure point.",
          {
            variant: "error",
          }
        );
        return;
      }
    } else if (name === "commitmentId") {
      const selectedIndex = steps.findIndex(
        (item) => item.compositeId === value
      );
      if (
        arrivalIndex >= 0 &&
        departureIndex >= 0 &&
        (selectedIndex <= arrivalIndex || selectedIndex >= departureIndex)
      ) {
        enqueueSnackbar(
          "Commitment Point cannot be before arrival point or after departure point.",
          {
            variant: "error",
          }
        );
        return;
      }
    } else if (name === "departureId") {
      const selectedIndex = steps.findIndex(
        (item) => item.compositeId === value
      );
      if (
        arrivalIndex >= 0 &&
        commitmentIndex >= 0 &&
        (selectedIndex <= arrivalIndex || selectedIndex <= commitmentIndex)
      ) {
        enqueueSnackbar(
          "Departure Point cannot be before arrival or commitment point.",
          {
            variant: "error",
          }
        );
        return;
      }
    }

    if (isKeyOf(name, workItemType)) {
      handleChange(
        name,
        value as TransformedDatabaseWorkItemType[keyof TransformedDatabaseWorkItemType]
      );
    }
  };

  const handleStepsChange = (steps) => handleChange("steps", steps);

  const handleCheckboxChange = () => {
    const newUnmappedValue = isChecked;

    if (!isChecked) onExpanded(index);
    else onExpanded(index, false);

    handleChange(
      "projects",
      workItemType.projects.map((project) => ({
        ...project,
        isUnmapped: newUnmappedValue,
      }))
    );
  };

  const handleWITChange = (
    event: ChangeEvent<{ name?: string; value: unknown; }>
  ) => {
    //Level change should apply to all rows of the same workItemType
    const { name, value } = event.target;
    const { displayName } = workItemType;
    if (name) {
      //apply this change to all the rows with same workItemTypeId
      onWITChange({ [name]: value }, displayName);
    }

  };

  const handleSleEdit = (
    event: ChangeEvent<{ name?: string; value: unknown; }>
  ) => {
    const { name, value } = event.target;
    if (name && isKeyOf(name, workItemType)) {
      handleChange(
        name,
        value as TransformedDatabaseWorkItemType[keyof TransformedDatabaseWorkItemType]
      );
    }
  };

  const workItemTypeLevelKeys = Object.keys(WorkItemTypeLevels);
  const ExpandIcon = openAccordions.includes(index)
    ? ExpandLessIcon
    : ExpandMoreIcon;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { enqueueSnackbar } = useSnackbar();

  /**
   * Find steps that matches between target and source workflows
   */
  function getResultsMatch(target, source) {
    if (source.length < 1) return;

    const results = source?.filter(function (o1) {
      return target?.some(function (o2) {
        return o1.id === o2.id && o1.name === o2.name;
      });
    });

    return results;
  }

  /**
   * Find key workflow events that matches between target and source workflows
   */
  function getKeyEventsMatch(target, source) {
    if (source.length < 1) return;

    let count = 0;

    if (source.steps.find((item) => item.compositeId === target.arrivalId))
      count += 1;

    if (source.steps.find((item) => item.compositeId === target.commitmentId))
      count += 1;

    if (source.steps.find((item) => item.compositeId === target.departureId))
      count += 1;

    return count;
  }

  /**
   * Sort array of objects based on another array
   */
  function sortWorkflowSteps(target, source, key) {
    target.sort(function (a, b) {
      const A = a[key],
        B = b[key];

      if (source.indexOf(A) > source.indexOf(B)) {
        return 1;
      } else {
        return -1;
      }
    });

    return target;
  }

  /**
   * Handle events for dropdown menu
   */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Handle copy event
   */
  const handleCopyWorkflow = () => {
    onCopyWorkflow(workItemType);
    setAnchorEl(null);
    setFontColor(false);
  };

  /**
   * Handle compare event
   */
  const handleCompareWorkflow = (
    workflowSteps?: TransformedDatabaseWorkItemTypeStep[]
  ) => {
    const matchedResults = getResultsMatch(workItemType.steps, workflowSteps);
    const percentageMatch =
      ((matchedResults?.length || 0) / (workflowSteps?.length || 0)) * 100;

    setAnchorEl(null);

    if (percentageMatch === 0) {
      enqueueSnackbar("No match found.", {
        variant: "info",
      });
      return;
    }

    enqueueSnackbar(
      "Match found: " +
      matchedResults?.length +
      " of " +
      workflowSteps?.length +
      " Workflow Steps (" +
      Math.round(percentageMatch) +
      "%)",
      {
        variant: "success",
      }
    );

    const matchedKeyEvents =
      getKeyEventsMatch(workItemType, copiedWorkflow) || 0;

    if (matchedKeyEvents > 0) {
      enqueueSnackbar(
        "Match found : " + matchedKeyEvents + " of 3 Key Workflow Events",
        {
          variant: "success",
        }
      );
    }

    setFontColor(true);
  };

  /**
   * Handle paste event
   */
  const handlePasteWorkflow = (workflow?: TransformedDatabaseWorkItemType) => {
    const matchedResults = getResultsMatch(workItemType.steps, workflow?.steps);
    const percentageMatch =
      ((matchedResults?.length || 0) / (workflow?.steps?.length || 0)) * 100;

    setAnchorEl(null);

    if (percentageMatch === 0) {
      enqueueSnackbar("No match found.", {
        variant: "info",
      });
      return;
    }

    const workflowIds = workflow?.steps?.map((item) => item.id);
    const sortedWorkflowSteps = sortWorkflowSteps(
      workItemType.steps,
      workflowIds,
      "id"
    );

    // check matching results again
    const filteredWorkflow = getResultsMatch(
      matchedResults,
      sortedWorkflowSteps
    );

    // find difference between two arrays
    const diff = difference(sortedWorkflowSteps, filteredWorkflow);

    // change the type (Queue/Active) of target from source
    const resultsWithType = filteredWorkflow.map(function (item) {
      const matchItems = workflow?.steps?.find((a) => {
        return a.id === item.id && a.name === item.name;
      });

      return { ...item, ...{ type: matchItems?.type } };
    });

    setFontColor(true);
    handleKeyEventChange();
    handleSLEChange();

    handleStepsChange([...resultsWithType, ...diff]);

    enqueueSnackbar(
      "Workflow pasted! (" + matchedResults?.length + " Workflow Steps)",
      {
        variant: "success",
      }
    );

    const matchedKeyEvents =
      getKeyEventsMatch(workItemType, copiedWorkflow) || 0;

    if (matchedKeyEvents > 0) {
      enqueueSnackbar(
        "Workflow pasted! (" + matchedKeyEvents + " of 3 Key Workflow Events)",
        {
          variant: "success",
        }
      );
    }

    enqueueSnackbar("Workflow pasted! (Level / SLE)", {
      variant: "success",
    });
  };

  /**
   * Handle key workflow events change
   */
  const handleKeyEventChange = () => {
    if (copiedWorkflow === undefined) return;

    if (
      workItemType.steps.find(
        (item) => item.compositeId === copiedWorkflow.arrivalId
      )
    ) {
      workItemType.arrivalId = copiedWorkflow?.arrivalId;
    }

    if (
      workItemType.steps.find(
        (item) => item.compositeId === copiedWorkflow.commitmentId
      )
    )
      workItemType.commitmentId = copiedWorkflow?.commitmentId;

    if (
      workItemType.steps.find(
        (item) => item.compositeId === copiedWorkflow.departureId
      )
    )
      workItemType.departureId = copiedWorkflow?.departureId;
  };

  /**
   * Handle Level/SLE change
   */
  const handleSLEChange = () => {
    if (copiedWorkflow === undefined) return;

    workItemType.serviceLevelExpectationInDays =
      copiedWorkflow?.serviceLevelExpectationInDays || 0;
    const { displayName } = workItemType;
    //apply this change to all the rows with same workItemTypeId
    onWITChange({ level: copiedWorkflow?.level || '' }, displayName);
  };

  return (
    <>
      <TableRow key={workItemType.id}>
        <TableCell padding="checkbox">
          <Checkbox
            name="checked"
            color="primary"
            checked={isChecked || isIndeterminate}
            indeterminate={isIndeterminate}
            onChange={handleCheckboxChange}
            inputProps={{ "aria-labelledby": workItemType.id }}
          />
        </TableCell>
        <TableCell style={{ width: 25 }}>{workItemType.id}</TableCell>
        <TableCell style={{ width: 500 }}>
          <Box display="flex">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {workItemType.projects.map(({ id, name, isUnmapped }) => (
                <div key={id}>
                  <span
                    className={classNames(classes.projectName, {
                      [classes.highlightedProjectName]:
                        isUnmapped && isIndeterminate,
                    })}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>
            {
              workItemType.projects.length > 1 && !workItemType.isDistinct &&
              <Tooltip title="Configure separately">
                <IconButton onClick={splitProjects} style={{ marginLeft: 10 }}>
                  <CallSplitIcon />
                </IconButton>
              </Tooltip>
            }
            {
              workItemType.projects.length === 1 && workItemType.isDistinct &&
              <Tooltip title="Merge similar workflows">
                <IconButton onClick={mergeProjects} style={{ marginLeft: 10 }}>
                  <CallMergeIcon />
                </IconButton>
              </Tooltip>
            }
          </Box>
        </TableCell>
        <TableCell style={{ width: 250 }}>{workItemType.name}</TableCell>
        <TableCell style={{ width: 300, paddingLeft: 20 }}>
          <DisplayNameSelector
            disabled={isUnchecked}
            workItemType={workItemType}
            onDisplayNameChange={onDisplayNameChange}
            workItemTypeOptions={workItemTypeOptions}
          />
        </TableCell>
        <TableCell>
          <LevelSelector
            errors={errors}
            workItemType={workItemType}
            disabled={isUnchecked}
            handleWITChange={handleWITChange}
            workItemTypeLevelKeys={workItemTypeLevelKeys}
          />
        </TableCell>
        <TableCell>
          <Box display="flex">
            <Input
              name="serviceLevelExpectationInDays"
              error={errors.includes("serviceLevelExpectationInDays")}
              margin="dense"
              defaultValue={0}
              disabled={isUnchecked}
              value={workItemType.serviceLevelExpectationInDays}
              onChange={handleSleEdit}
              style={{ width: 50 }}
            />
            <span style={{ fontSize: 12 }}>day(s)</span>
          </Box>
        </TableCell>
        <TableCell style={{ width: "5%", textAlign: "right", padding: 0 }}>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{ width: 5 }}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleCopyWorkflow}>Copy</MenuItem>
            <MenuItem
              onClick={() => handlePasteWorkflow(copiedWorkflow)}
              disabled={!copiedWorkflow}
            >
              Paste
            </MenuItem>
            <MenuItem
              onClick={() => handleCompareWorkflow(copiedWorkflow?.steps)}
              disabled={!copiedWorkflow}
            >
              Compare
            </MenuItem>
          </Menu>
        </TableCell>
        <TableCell style={{ width: "5%", textAlign: "right", padding: 0 }}>
          <ExpandIcon
            style={{ cursor: "pointer", zIndex: 10 }}
            onClick={() => onExpanded(index)}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={8}>
          <Collapse
            mountOnEnter
            unmountOnExit
            in={openAccordions.includes(index)}
            timeout="auto"
          >
            <Box mt={4} mb={4} ml={6} mr={6} style={{ padding: 16 }}>
              <Grid
                container
                spacing={2}
                style={{
                  background: "rgba(242, 242, 242, 1)",
                  borderRadius: 4,
                }}
              >
                <StepsContainer
                  onChange={handleStepsChange}
                  steps={workItemType.steps}
                  copiedWorkflowSteps={copiedWorkflow?.steps || undefined}
                  isChangeFontColor={isChangeFontColor}
                  workItemType={workItemType}
                  initDiscontinuedSteps={initDiscontinuedSteps}
                  setInitDiscontinuedSteps={setInitDiscontinuedSteps}
                />

                <EventSelectors
                  errors={errors}
                  workItemType={workItemType}
                  handleChange={handleChangeEvent}
                  stepOptions={stepOptions}
                />
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default WorkItemTypeRow;
