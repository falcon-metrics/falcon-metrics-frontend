import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
    createStyles({
        selectElement: {
            width: '50%'
        },
        multiSelectTags: {
            width: 374,
            height: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
        }
    }),
);
