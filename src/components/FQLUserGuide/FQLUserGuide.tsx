import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ReactComponent as FieldOperationValue } from 'assets/images/user-guide-field-operation.svg';
import { ReactComponent as AndOrParenthesis } from 'assets/images/user-guide-and-or.svg';
import { Element } from 'react-scroll';
import useStyles from './FQLUserGuide.styles';

const FQLUserGuide = () => {
  const classes = useStyles();

  return (
    <Element name="quick-reference" className="quick-reference" tabIndex={0}>
      <Box display="flex" flexDirection="column">
        <Box mt={3}>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionTitle}
          >
            <b>Filter Expression Quick Reference Guide</b>
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            To write a Filter expression query, simply put together
          </Typography>
        </Box>
        <Box mt={2} justifyContent="center" display="flex">
          <FieldOperationValue />
        </Box>
        <Box mt={3}>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            you can also connect expressions using
          </Typography>
        </Box>
        <Box mt={2} justifyContent="center" display="flex">
          <AndOrParenthesis />
        </Box>
        <Box mt={4}>
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
        <Box ml={6}>
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
        <Box ml={6}>
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
        <Box ml={6}>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            <b>Value:</b> Value is the content you expect the field to have.
          </Typography>
        </Box>
        <Box ml={6}>
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
        <Box ml={6}>
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
        <Box mt={3}>
          <Typography
            paragraph
            variant="h5"
            align="left"
            className={classes.filterExpressionTitle}
          >
            <b>Examples</b>
          </Typography>
        </Box>
        <Box mt={4} ml={6}>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            (fieldOne = true) AND (fieldTwo = false OR fieldThree = false)
          </Typography>
        </Box>
        <Box mt={2} ml={6}>
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
        <Box mt={2} ml={6}>
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
        <Box mt={3}>
          <Typography
            paragraph
            variant="h4"
            align="left"
            className={classes.filterExpressionTitle}
          >
            Cheat Sheet
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionSmallTitle}
          >
            System Fields
          </Typography>
        </Box>
        <Box>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            List of Falcon Metrics fields you can use in your query:
          </Typography>
        </Box>
        <Box mt={2} justifyContent="center" alignItems="center" display="flex">
          <Box className={classes.systemFieldContainer}>
            <Box display="inline-flex" flexDirection="column" width="50%">
              <Box display="flex" className={classes.systemFieldCell}>
                <b>System Field</b>
              </Box>
              <Box display="flex" className={classes.systemFieldCell}>
                state
              </Box>
              <Box display="flex" className={classes.systemFieldCell}>
                stateCategory
              </Box>
              <Box display="flex" className={classes.systemFieldCell}>
                stateType
              </Box>
              <Box display="flex" className={classes.systemFieldCell}>
                flagged
              </Box>
              <Box display="flex" className={classes.systemFieldCell}>
                resolution
              </Box>
            </Box>
            <Box display="inline-flex" flexDirection="column" width="50%">
              <Box display="flex" className={classes.systemFieldCell}>
                <b>Data Type</b>
              </Box>
              <Box display="flex" className={classes.systemFieldCell}>
                String
              </Box>
              <Box display="flex" className={classes.systemFieldCell}>
                String
              </Box>
              <Box display="flex" className={classes.systemFieldCell}>
                String
              </Box>
              <Box display="flex" className={classes.systemFieldCell}>
                Boolean
              </Box>
              <Box display="flex" className={classes.systemFieldCell}>
                String
              </Box>
            </Box>
          </Box>
        </Box>
        <Box mt={2}>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionSmallTitle}
          >
            Custom Fields
          </Typography>
        </Box>
        <Box>
          <Typography
            paragraph
            variant="body1"
            align="left"
            className={classes.filterExpressionParagraph}
          >
            Custom fields are defined by the user
          </Typography>
        </Box>
        <Box mt={2}>
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
        <Box mt={2}>
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
        <Box mt={2}>
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
