import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Element } from 'react-scroll';
import useStyles from './FQLUserGuide.styles';

const FQLUserGuide = () => {
  const classes = useStyles();

  return (
    <Element name="quick-reference" className="quick-reference" tabIndex={0}>
      <Box display="flex" flexDirection="column">
        <Box>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionTitle}
          >
            <b>Filter Expression Quick Reference Guide</b>
          </Typography>
        </Box>
        <Box>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            A Filter expression comprises of four elements put together in a
            logical manner. The four elements are:
          </Typography>
        </Box>
        <Box ml={2}>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            <b>Field:</b> Fields are nothing but the different properties of
            your work item type. e. g.: “AssignedTo” field of a work item type
            “User Story”
          </Typography>
        </Box>
        <Box ml={2}>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            <b>Operator:</b> Operators help build the logic of the query by
            telling how the value relates to the field in a expression. e. g.:
            =, !=
          </Typography>
        </Box>
        <Box ml={2}>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            <b>Value:</b> Value is the content you expect the field to have.
          </Typography>
        </Box>
        <Box ml={2}>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            <b>AND/OR Operator:</b> Used to connect different expressions
            together.
          </Typography>
        </Box>
        <Box ml={2}>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            <b>Parenthesis:</b> Parenthesis help to logically group queries by
            wrapping them in parenthesis
          </Typography>
        </Box>
        <Box>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionSmallTitle}
          >
            <b>Examples</b>
          </Typography>
        </Box>
        <Box ml={2}>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            (fieldOne = true) AND (fieldTwo = false OR fieldThree = false)
          </Typography>
        </Box>
        <Box ml={2}>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            WorkItemType = &apos;Epic&apos; OR WorkItemType =
            &apos;Feature&apos; <br />
          </Typography>
        </Box>
        <Box ml={2}>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            WorkItemType = &apos;User Story&apos; OR WorkItemType =
            &apos;Feature&apos; OR WorkItemType = &apos;Release&apos; OR
            WorkItemType = &apos;Epic&apos; <br />
          </Typography>
        </Box>
        <Box>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionSmallTitle}
          >
            Operators
          </Typography>
        </Box>
        <Box>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            AND, OR, =, !=
          </Typography>
        </Box>
        <Box>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionSmallTitle}
          >
            Parenthesis
          </Typography>
        </Box>
        <Box>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            Logical groupings can be wrapped in parenthesis &quot;( )&quot;
          </Typography>
        </Box>
        <Box>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionSmallTitle}
          >
            Values
          </Typography>
        </Box>
        <Box>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            Literals not in quotes, eg: field = 100, field = true <br />
            String in single quotes eg: field = &apos;hello world&apos;
          </Typography>
        </Box>
      </Box>
    </Element>
  );
};

export default FQLUserGuide;
