import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { useStyles } from './BaseAccordion.styles';

interface BaseAccordionProps {
  /**
   * If `true`, expands the accordion by default.
   */
  defaultExpanded?: boolean;
  /**
   * The content of the accordion.
   */
  title: string;
  /**
   * The content of the accordion.
   */
  children: JSX.Element;
  
  customStyle?: any;
}

interface BaseAccordionTitleProps {
  title: string,
  customStyle?: any;
}

const AccordionTitle = ({
  title,
  customStyle
}: BaseAccordionTitleProps) => {
  const classes = customStyle ?? useStyles();

  return (
    <Typography className={classes.accordionTitle}>
      {title}
    </Typography>
  );
};

export const BaseAccordion = ({
  title,
  defaultExpanded,
  children,
  customStyle
}: BaseAccordionProps) => {
  const classes = customStyle ?? useStyles();

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }} defaultExpanded={defaultExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
      >
        <AccordionTitle title={title} customStyle={customStyle} />
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};
