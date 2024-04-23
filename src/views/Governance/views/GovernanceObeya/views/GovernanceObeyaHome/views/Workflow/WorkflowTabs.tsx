// import { useMemo, useState } from 'react';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import WorkflowBoard from './WorkflowBoard';
// import ObeyaTabs from '../../components/ObeyaTabs';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: '#fff',
      color: '#000',
    },
    team: {
      fontSize: 18,
      fontFamily: 'Open Sans',
      color: 'rgb(96, 94, 92)',
    },
    header: {
      color: 'rgb(96, 94, 92)',
      borderBottom: '1px solid rgb(96, 94, 92)',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    linkTab: {
      width: 140,
      fontFamily: 'Open Sans',
      textTransform: 'capitalize',
    },
    tabContainer: {
      width: 400,
    },
    overflow: {
      height: '100%',
    },
    workflowTitle: {
      color: '#807e7e',
      fontFamily: 'Open Sans',
      fontSize: 18,
    },
  }),
);

interface Props {
  obeyaRoomId?: string;
}

const WorkflowTab = ({ obeyaRoomId }: Props) => {
  const classes = useStyles();
//   const [activeTab, setActiveTab] = useState('boards');

//   const tabConfig = useMemo(
//     () => [
//       {
//         value: 'boards',
//         label: 'Boards',
//         selected: true,
//       },
//     ],
//     [],
//   );

//   const onChangeTab = (currentTab) => setActiveTab(currentTab);

  return (
    <Box className={classes.root}>
      {/* <Box ml={2}>
        <ObeyaTabs
          activeTab={activeTab}
          onChangeTab={onChangeTab}
          tabs={tabConfig}
        />
      </Box> */}
      <WorkflowBoard obeyaRoomId={obeyaRoomId} />
    </Box>
  );
};

export default WorkflowTab;
