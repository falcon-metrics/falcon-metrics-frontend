import { ColorButton } from 'material-ui-color';
import startCase from 'lodash/startCase';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { SummaryData } from './Summary.data';
import { useWizardContext } from 'views/SetupWizard/contexts/useWizardContext';
import Container from 'components/PageContainer/PageContainer';
import useStyles from './Summary.styles';

export type Props = {
  data: SummaryData;
};

// This is just a workaround. Could be done somewhere else
// Have to be done like this since we do not store the workflow name 
function reverseSlugify(slug: string): string {
  const [, , name] = slug.split('.').map((item) => capitalize(item));
  return `${name.replaceAll('-', ' ')}`;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getDistinctWorkflowNames(data: any[]): any[] {
  const workflowNames = data.map((item) => {
    const reversedWorkflowName = reverseSlugify(item.workflowName);
    return (
      `${item.workspace} > ${item.board} > ${reversedWorkflowName}`
    );
  });
  return workflowNames;
}

const SummaryPage = ({ data }: Props) => {
  const classes = useStyles();
  const { goToNext } = useWizardContext();

  const {
    datasource,
    projects,
    workflows,
    workitemtypes,
    contexts,
    customfields,
    normalization
  } = data;
  const filteredNormalization = normalization.filter((data) =>
    /normalisation/.test(data.tags),
  );

  const { serviceUrl, datasourceType } = datasource;

  const boards = contexts.filter(({ contextAddress }) => !!contextAddress);
  const aggregations = contexts.filter(({ contextAddress }) => !contextAddress);

  // This is just a workaround 'coz displayName is not showing in Kanbanize
  function reverseSlugify(slug: string): string {
    if (!slug) return '';
    const [, name] = slug.split('.').map((item) => startCase(item));
    if (!slug) return '';
    return `${name.replaceAll('-', ' ')}`;
  }

  const getDistinctListByDatasourceWorkItemId = (
    data: any
  ): any => {
    const uniqueItems: { [key: string]: any } = {};

    data.forEach((item) => {
      const { datasourceWorkItemId } = item;
      if (!uniqueItems[datasourceWorkItemId]) {
        uniqueItems[datasourceWorkItemId] = item;
      }
    });

    return Object.values(uniqueItems);
  };

  return (
    <Container title="Summary">
      <Paper style={{ padding: 16 }}>
        <Typography>Datasource: {datasourceType}</Typography>
        <Typography>{serviceUrl}</Typography>
      </Paper>

      {/* Workspaces and Boards */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {projects.length} Workspaces & Boards
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={8} className={classes.padding}>
            <Grid item sm={12}>
              <ul>
                {projects.map(({ workspace, name }) => (
                  <li key={name}>
                    {workspace} &gt; {name}
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Card Types */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {getDistinctListByDatasourceWorkItemId(workitemtypes).length} Card Types
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={8} className={classes.padding}>
            <Grid item sm={6}>
              <ul>
                {getDistinctListByDatasourceWorkItemId(workitemtypes).map(({ workItemTypeId }) => (
                  <li key={workItemTypeId}>{reverseSlugify(workItemTypeId)}</li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Workflows */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {getDistinctWorkflowNames(workflows.filter(({ datasourceWorkflowId, deletedAt }) => datasourceWorkflowId !== null && deletedAt === null)).length} Workflows
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={8} className={classes.padding}>
            <Grid item sm={12}>
              <ul>
                {getDistinctWorkflowNames(workflows.filter(({ datasourceWorkflowId, deletedAt }) => datasourceWorkflowId !== null && deletedAt === null)).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Boards & Aggregations */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {boards.length} Boards & {aggregations.length} Aggregations
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={8} className={classes.padding}>
            <Grid item sm={6}>
              <Typography className={classes.heading}>Boards:</Typography>
              <ul>
                {boards.map(({ name }) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </Grid>
            <Grid item sm={6}>
              <Typography className={classes.heading}>Aggregations:</Typography>
              <ul>
                {aggregations.filter(({ name }) => name !== "All").map(({ name }) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Custom Fields */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {customfields.length} Custom Fields
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={8} className={classes.padding}>
            <Grid item sm={6}>
              <ul>
                {customfields.map((item) => (
                  <li key={item.displayName}>{item.displayName}</li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Custom Views */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {filteredNormalization.length} Custom Views
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table aria-label="filters">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Category</TableCell>
                <TableCell>Display Name</TableCell>
                <TableCell>Filter Expression</TableCell>
                <TableCell>SLE (in days)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredNormalization.map((data) => {
                const {
                  id,
                  tags,
                  displayName,
                  flomatikaQuery,
                  SLE,
                  colorHex,
                } = data;
                const formattedTags = startCase(
                  tags.replace('normalisation, ', ''),
                );

                return (
                  <TableRow key={id}>
                    <TableCell style={{ pointerEvents: 'none' }}>
                      <ColorButton color={colorHex} />
                    </TableCell>
                    <TableCell>{formattedTags}</TableCell>
                    <TableCell component="th" scope="row">
                      {displayName}
                    </TableCell>
                    <TableCell>{flomatikaQuery}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{SLE}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>

      <br />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        onClick={goToNext}
      >
        Finish
      </Button>
    </Container>
  );
};

export default SummaryPage;
