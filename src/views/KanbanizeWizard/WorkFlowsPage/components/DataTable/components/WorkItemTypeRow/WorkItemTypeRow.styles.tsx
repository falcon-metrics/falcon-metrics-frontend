import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    pre: {
      // whiteSpace: 'pre',
      // padding: '1.5em'
      width: '20%',
      wordWrap: 'break-word'
      // display: 'inline-block'
    },
    projectName: {
      // padding: '0.3em',
    },
    highlightedProjectName: {
      borderRadius: '5px',
      background: 'rgba(255, 123, 0, 0.3)',
    },
  }),
);

export default useStyles;
