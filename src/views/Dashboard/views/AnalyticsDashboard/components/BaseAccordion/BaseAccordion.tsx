import React, { useEffect, useRef, useState } from "react";

import { Box, Chip } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ExpandMore from "@material-ui/icons/ExpandMore";

import { useStyles } from "./BaseAccordion.styles";
import { useBaseAccordionContext } from "./BaseAccordionContext";

export type BadgeType = "ALPHA" | "BETA";

export const BADGES: Record<BadgeType, string> = {
  ALPHA: "#03BFB2",
  BETA: "#0077C8",
};

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

  /**
   * Whether to show a loading spinner on the header
   */
  isLoading?: boolean;

  /**
   * Callback to when the accordion is opened
   */
  onOpen?: () => void | Promise<void>;

  /**
   * Callback to when the accordion is closed
   */
  onClose?: () => void | Promise<void>;

  badgeType?: BadgeType;
  icon?: React.ReactNode;
  tooltip?: React.ReactNode;
  customStyle?: any;
  id?: string;
}

interface BaseAccordionTitleProps {
  title: string;
  isLoading?: boolean;
}

const AccordionTitle = ({ title, isLoading }: BaseAccordionTitleProps) => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.accordionTitle}>{title}</Typography>
      {isLoading ? (
        <Box ml={1}>
          <CircularProgress size={22} />
        </Box>
      ) : null}
    </>
  );
};

export const BaseAccordion = ({
  id,
  title,
  defaultExpanded,
  isLoading,
  children,
  onOpen,
  onClose,
  badgeType,
  icon,
  tooltip,
  customStyle,
}: BaseAccordionProps) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded ?? false);
  const accordionRef = useRef(null);

  const { toggleAccordion, activeAccordions } = useBaseAccordionContext();

  useEffect(() => {
    if (defaultExpanded && id && !activeAccordions.includes(id))
      toggleAccordion(id, true);
  }, [id, defaultExpanded]);

  const handleChange = (_event, isExpanded) => {
    setExpanded(isExpanded);
    toggleAccordion(id, isExpanded);

    if (isExpanded && onOpen) {
      onOpen();
    } else if (!isExpanded && onClose) {
      onClose();
    }
  };

  return (
    <Accordion
      ref={accordionRef}
      onChange={handleChange}
      expanded={expanded}
      defaultExpanded={defaultExpanded}
      TransitionProps={{ mountOnEnter: true }}
      className={classes.accordion}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        className={classes.accordionSummary}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {icon && (
            <span style={{ paddingRight: 5, paddingTop: 5 }}>{icon}</span>
          )}
          <AccordionTitle title={title} isLoading={isLoading} />
          {tooltip && (
            <span style={{ marginTop: 5, marginRight: 5 }}>{tooltip}</span>
          )}
          {badgeType && (
            <span style={{ marginTop: 3, marginLeft: 20, marginRight: 10 }}>
              <Chip
                size="small"
                label={badgeType}
                style={{ backgroundColor: BADGES[badgeType], color: "#fff" }}
              />
            </span>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails
        className={classes.accordionDetails}
        style={{ ...customStyle }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};
