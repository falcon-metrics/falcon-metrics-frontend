import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

export const staticColumns = [
  {
    field: 'column1',
    headerName: 'Flow-based Metrics',
    renderHeader: () => <Skeleton width={400} height={20} />,
    renderCell: () => {
      return (
        <Box>
          <Skeleton width={380} height={20} />
        </Box>
      );
    },
    width: 400,
    minWidth: 420,
  },
  {
    field: 'column2',
    renderHeader: () => <Skeleton width={200} height={20} />,
    renderCell: () => {
      return (
        <Box>
          <Skeleton width={200} height={20} />
        </Box>
      );
    },
    minWidth: 200,
  },
  {
    field: 'column3',
    renderHeader: () => <Skeleton width={200} height={20} />,
    renderCell: () => {
      return (
        <Box>
          <Skeleton width={200} height={20} />
        </Box>
      );
    },
    minWidth: 200,
  },
  {
    field: 'column4',
    renderHeader: () => <Skeleton width={200} height={20} />,
    renderCell: () => {
      return (
        <Box>
          <Skeleton width={200} height={20} />
        </Box>
      );
    },
    minWidth: 200,
  },
  {
    field: 'column5',
    renderHeader: () => <Skeleton width={200} height={20} />,
    renderCell: () => {
      return (
        <Box>
          <Skeleton width={200} height={20} />
        </Box>
      );
    },
    minWidth: 200,
  },
];
