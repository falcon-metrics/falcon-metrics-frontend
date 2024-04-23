import { createStyles, makeStyles, styled } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
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
  }),
);
export const TableHeader = styled('div')({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontFamily: 'Open Sans',
  fontSize: 16,
  fontWeight: 'bold',
});
