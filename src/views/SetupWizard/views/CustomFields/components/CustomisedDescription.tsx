import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    defaultParagraph: {
      fontFamily: 'Open Sans',
    },
  }),
);

export const CustomisedDescription = () => {
  const classes = useStyles();
  return (
    <Box>
      <Typography
        paragraph
        variant="body1"
        className={classes.defaultParagraph}
      >
        <Box mt={1}>
          Below are all the relevant fields from your selected datasource.
        </Box>
        <Box mt={3} mb={4}>
          Are there any fields that you would like to set as custom filters for
          performing contextual analysis on your work items.
        </Box>
      </Typography>
    </Box>
  );
};
