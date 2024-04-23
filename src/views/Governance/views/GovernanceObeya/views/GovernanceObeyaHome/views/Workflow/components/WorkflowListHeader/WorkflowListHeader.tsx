import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { WorkflowColors } from 'views/Governance/utils/constants';
import useStyles, { Title } from './WorkflowListHeader.styles';

interface Props {
  titleColumn?: string;
  statusColor?: WorkflowColors;
  textColor?: string;
  total?: number | string;
}

const WorkflowListHeader = ({
  titleColumn,
  statusColor,
  total,
  textColor,
}: Props) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={0}
    >
      <Grid item xs={12} md={12} lg={12}>
        <Box
          className={classes.header}
          style={{ background: statusColor, color: textColor ?? '#fff' }}
        >
          <Title>{titleColumn}</Title>
          <Box>{total || ''}</Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default WorkflowListHeader;
