import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { styled } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import './ExpandableInsightEvidenceOverride.css';

const SmallBlueCircle = styled(Box)({
  width: '8px',
  height: '8px',
  backgroundColor: '#0077c8c7',
  borderRadius: '40px'
});

const useStyles = makeStyles({
  accordion: {
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    margin: '0 !important',
  },
  accordionSummary: {
    flexDirection: 'row-reverse',
    minHeight: 'auto !important',
    height: 36,
    fontWeight: 'bold',
    fontFamily: 'Open Sans'
  },
  accordionDetails: {

  },
});

type EvidenceProps = {
  title: string;
  evidences: string[];
  oldVersion?: boolean;
  defaultExpanded?: boolean;
};

const ExpandableInsightEvidence = ({
  title,
  evidences,
  oldVersion,
  defaultExpanded,
}: EvidenceProps) => {
  const classes = useStyles();
  if (oldVersion) {
    return (
      <Box className="analysis-unit">
        <Box className="header" display="flex" alignContent="center">
          <div style={{ transform: 'rotate(0deg)' }}><ExpandMore htmlColor="#0077c8" fontSize="medium" /></div>
          <Box fontSize="12.6px" fontFamily="Open Sans" fontWeight="bold" marginTop="5px" marginLeft="5px">{title}</Box>
        </Box>
        <Box className="children">{
          evidences.map((text, index) => (
            <Box key={index} margin="2px 0px 5px 30px" className="analysis-child" display="flex" alignItems="center">
              <SmallBlueCircle />
              <Box fontSize="12.6px" fontFamily="Open Sans" marginLeft="8px">{text}</Box>
            </Box>
          ))
        }</Box>
      </Box>
    );
  }
  return (
    <Accordion className={"analysis-unit " + classes.accordion} TransitionProps={{ unmountOnExit: true }} defaultExpanded={defaultExpanded}>
      <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandMore htmlColor="#0077c8" fontSize="medium" />}>{title}</AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <Box className="children" marginLeft="50px">{evidences.map((text, index) => (
          <Box key={index} margin="2px 0px 10px 0px" className="analysis-child" display="flex" alignItems="center">
            <SmallBlueCircle />
            <Box fontSize="12.6px" fontFamily="Open Sans" marginLeft="8px">{text}</Box>
          </Box>
        ))}</Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ExpandableInsightEvidence;