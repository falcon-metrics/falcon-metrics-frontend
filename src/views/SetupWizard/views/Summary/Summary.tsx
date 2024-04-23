import { ColorButton } from 'material-ui-color';
import startCase from 'lodash/startCase';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
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

const getHierarchyLevel = (positionInHierarchy: string) =>
  positionInHierarchy.split('.').length;

const SummaryPage = ({ data }: Props) => {
  const classes = useStyles();
  const { goToNext } = useWizardContext();

  const {
    datasource,
    projects,
    workflows,
    contexts,
    customfields,
    normalization,
  } = data;

  const filteredNormalization = normalization.filter((data) =>
    /normalisation/.test(data.tags),
  );

  const { serviceUrl, datasourceType } = datasource;

  const boards = contexts.filter(({ contextAddress }) => !!contextAddress);
  const aggregations = contexts.filter(({ contextAddress }) => !contextAddress);
  const teams = contexts.filter(
    ({ positionInHierarchy }) => getHierarchyLevel(positionInHierarchy) === 3,
  );
  const initiatives = contexts.filter(
    ({ positionInHierarchy }) => getHierarchyLevel(positionInHierarchy) === 2,
  );
  const potfolios = contexts.filter(
    ({ positionInHierarchy }) => getHierarchyLevel(positionInHierarchy) === 1,
  );

  return (
    <Container title="Summary">
      <Paper style={{ padding: 16 }}>
        <Typography>Datasource: {datasourceType}</Typography>
        <Typography>{serviceUrl}</Typography>
      </Paper>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {projects.length} Projects & {workflows.length} Work Item Types
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={8} className={classes.padding}>
            <Grid item sm={6}>
              <Typography className={classes.heading}>Projects:</Typography>
              <ul>
                {projects.map(({ name }) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </Grid>
            <Grid item sm={6}>
              <Typography className={classes.heading}>
                Work Item Types:
              </Typography>
              <ul>
                {workflows.map(({ displayName }) => (
                  <li key={displayName}>{displayName}</li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
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
                {aggregations.map(({ name }) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </Grid>
            <Grid item sm={4}>
              <Typography className={classes.heading}>Portfolio:</Typography>
              <ul>
                {potfolios.map(({ name }) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </Grid>
            <Grid item sm={4}>
              <Typography className={classes.heading}>Initiatives:</Typography>
              <ul>
                {initiatives.map(({ name }) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </Grid>
            <Grid item sm={4}>
              <Typography className={classes.heading}>Teams:</Typography>
              <ul>
                {teams.map(({ name }) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {customfields.length} Custom Fields
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.chips}>
          {customfields.map((data) => {
            const { displayName } = data;
            return <Chip key={displayName} label={displayName} />;
          })}
        </AccordionDetails>
      </Accordion>
      {/* TODO: Finish this <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          GeneralSettings
        </AccordionSummary>
        <AccordionDetails>
          {Object.keys(settings)
            .filter(key => !!settings[key])
            .map(key => 
              <>
                <div>
                  <b>
                    {startCase(key)}:{' '}
                  </b>
                  <span>{settings[key]}</span>
                </div>
                <br/>
              </>
            )}
        </AccordionDetails>
      </Accordion> */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {filteredNormalization.length} Normalised Work Items
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table aria-label="filters">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Display Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Filter Expression</TableCell>
                <TableCell>Target</TableCell>
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
                  target,
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
                    <TableCell component="th" scope="row">
                      {displayName}
                    </TableCell>
                    <TableCell>{formattedTags}</TableCell>
                    <TableCell>{flomatikaQuery}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {target}%
                    </TableCell>
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
