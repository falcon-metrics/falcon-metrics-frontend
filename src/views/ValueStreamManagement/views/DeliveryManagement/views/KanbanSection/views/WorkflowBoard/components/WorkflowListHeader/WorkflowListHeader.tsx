import Box from '@material-ui/core/Box';
import { WorkflowColors } from '../../../../../../utils/constants';
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
    <Box
      style={{ background: statusColor, color: textColor ?? '#fff' }}
      className={classes.header}
    >
      <Title className={classes.title}>{titleColumn}</Title>
      <Box className={classes.count}>{total || ''}</Box>
    </Box>
  );
};

export default WorkflowListHeader;
