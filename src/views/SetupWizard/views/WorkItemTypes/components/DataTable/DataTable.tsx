import { Box, Button, FormHelperText, Grid, MenuItem, Select, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import _ from "lodash";
import uniq from "lodash/uniq";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { RawDiscontinuedSteps, TransformedDatabaseWorkItemType } from "../../interfaces/interfaces";
import { getRowKey } from "../../utils/getRowKey";
import { sortOptions, sortWorkItemType } from "../../utils/sortWorkItemType";
import { ErrorList } from "../../WorkItemTypes";
import WorkItemTypeBody from "./components/WorkItemTypeBody";
import WorkItemTypeHeader from "./components/WorkItemTypeHeader";

type Props = {
  workItemTypes: TransformedDatabaseWorkItemType[];
  errors: ErrorList;
  setWorkItemTypes: (items: any) => void;
  onChange: (
    index: number,
    values: Partial<TransformedDatabaseWorkItemType>
  ) => void;
  initDiscontinuedSteps: RawDiscontinuedSteps[];
  setInitDiscontinuedSteps: (steps: RawDiscontinuedSteps[]) => void;
  splitProjects: (index: number) => void;
  mergeProjects: (index: number) => void;
};

export type WorkItemTypeFilters = {
  projectId?: string;
  workItemTypeId?: string;
};

const DataTable = ({
  errors,
  workItemTypes,
  setWorkItemTypes,
  onChange,
  initDiscontinuedSteps,
  setInitDiscontinuedSteps,
  splitProjects,
  mergeProjects
}: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const workItemTypeOptions = uniq([
    ...workItemTypes.map(({ name }) => name),
    ...workItemTypes.map(({ displayName }) => displayName),
  ]);

  // Data for filters
  const projects = _
    .chain(workItemTypes)
    .map(wit => wit.projects)
    .flatten()
    .map(p => ({
      id: p.id,
      name: p.name
    }))
    .uniqBy(obj => obj.id)
    .orderBy(obj => obj.name)
    .value();

  const wits = _.chain(workItemTypes)
    .map(wit => ({
      name: wit.displayName,
      id: wit.id,
    }))
    .uniqBy(wit => wit.id)
    .value();

  //  eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortedList, setSortedList] = useState<
    TransformedDatabaseWorkItemType[]
  >();

  const [isChangeFontColor, setFontColor] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<number[]>([]);
  const [filters, setFilters] = useState<WorkItemTypeFilters>({});

  //  eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortedBy, setSortedBy] = useState("");

  const onExpanded = (id: any, isChecked?: boolean) => {
    if (isChecked === false) {
      setOpenAccordions(
        openAccordions.filter((accordionId) => accordionId !== id)
      );
      return;
    }

    if (!openAccordions.includes(id)) {
      setOpenAccordions([...openAccordions, id]);
    } else {
      setOpenAccordions(
        openAccordions.filter((accordionId) => accordionId !== id)
      );
    }
  };

  // TODO : this could be made better
  const onSortOrder = (option: string) => {
    setSortedList([]);

    const sorted = sortWorkItemType(option, workItemTypes);

    setSortedList(sorted);
    setWorkItemTypes(sorted);
    setOpenAccordions([]);
    setFontColor(false);
    setSortedBy(option);
  };

  const [
    copiedWorkFlow,
    setCopiedWorkFlow,
  ] = useState<TransformedDatabaseWorkItemType>();

  const handleCopyWorkflow = (workflow: TransformedDatabaseWorkItemType) => {
    setCopiedWorkFlow(workflow);

    enqueueSnackbar(
      "Workflow copied! (" +
      workflow.steps.length +
      " Workflow Steps, Key Workflow Events and Level / SLE)",
      {
        variant: "success",
      }
    );
  };

  return (
    <>
      <Box width={'100%'}>

        {/* Filters */}
        <Box width={'100%'} style={{ backgroundColor: "#f9f9f9", borderRadius: 8, padding: 10 }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            style={{ padding: 10 }}
          >
            <Box>
              <Typography style={{ fontSize: 16, fontWeight: 600 }}>Sort by</Typography>
              <FormHelperText>Column</FormHelperText>
              <Select
                defaultValue={"work-item-type"}
                style={{ width: "220px", marginRight: 10 }}
                onChange={(e: any) => onSortOrder(e.target.value)}
              >
                <MenuItem value="" disabled>
                  Sort by
                </MenuItem>
                {sortOptions.map((item, index) => {
                  return (
                    <MenuItem value={item.value} key={index}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>

            {
              projects.length > 1 &&
              <Box>
                <Typography style={{ fontSize: 16, fontWeight: 600 }}>Filter by</Typography>
                <FormHelperText>Project</FormHelperText>
                <Select
                  defaultValue={"None"}
                  style={{ width: "380px", marginRight: 10 }}
                  onChange={(e: any) => setFilters({ ...filters, projectId: e.target.value })}
                  value={filters.projectId ?? 'None'}
                >
                  {projects.map((p, index) => {
                    return (
                      <MenuItem value={p.id} key={index}>
                        {p.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Box>
            }

            <Box>
              {projects.length <= 1 ?
                <Typography style={{ fontSize: 16, fontWeight: 600 }}>Filter by</Typography> :
                <Typography style={{ fontSize: 16, fontWeight: 600 }}>&nbsp;</Typography>}
              <FormHelperText>Work Item Type</FormHelperText>
              <Select
                defaultValue={"None"}
                style={{ width: "380px", marginRight: 10 }}
                onChange={(e: any) => setFilters({ ...filters, workItemTypeId: e.target.value })}
                value={filters.workItemTypeId ?? 'None'}
              >
                {wits.map((wit, index) => {
                  return wit.name && (
                    <MenuItem value={wit.id} key={index}>
                      {wit.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>

            <Box display="flex" justifyContent='flex-end' mt={5}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setFilters({ workItemTypeId: undefined, projectId: undefined })}
                size="small">
                Clear Filters
              </Button>
            </Box>
          </Grid>
        </Box>

        {/* Work Item Type grid */}
        <TableContainer>
          <Table aria-label="work-item-type">
            <WorkItemTypeHeader />
            <TableBody>
              {
                workItemTypes
                  .map(
                    (workItemType, index) => {
                      if (filters.workItemTypeId !== undefined) {
                        if (workItemType.id !== filters.workItemTypeId) {
                          return <></>;
                        }
                      }
                      if (filters.projectId !== undefined) {
                        if (!(workItemType.projects.find(p => p.id === filters.projectId))) {
                          return <></>;
                        }
                      }
                      return <WorkItemTypeBody
                        key={index}
                        workItemType={workItemType}
                        workItemTypes={workItemTypes}
                        errorFields={errors[getRowKey(workItemType) ?? ""] ?? []}
                        workItemTypeOptions={workItemTypeOptions}
                        index={index}
                        onChange={onChange}
                        onExpanded={onExpanded}
                        openAccordions={openAccordions}
                        isChangeFontColor={isChangeFontColor}
                        setFontColor={setFontColor}
                        copiedWorkflow={copiedWorkFlow || undefined}
                        onCopyWorkflow={handleCopyWorkflow}
                        initDiscontinuedSteps={initDiscontinuedSteps}
                        setInitDiscontinuedSteps={setInitDiscontinuedSteps}
                        splitProjects={splitProjects}
                        mergeProjects={mergeProjects}
                      />;

                    }
                  )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default DataTable;
