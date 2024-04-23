import { memo, ReactNode, useCallback, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import { OKRObjective } from "views/Governance/views/GovernanceObeya/utils";
import { RatingLabels } from "./Rating";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import useAuthentication from "hooks/useAuthentication";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import "./styles.css";
import RelationshipsMinifiedDisplay from "components/RelationsipsMinifiedDisplay";

type ObjectiveContainerProps = {
  objective: OKRObjective;
  containerIndex: number;
  onOpenModal?: (OKRObjective) => void;
  children: ReactNode;
  hideActions?: boolean;
};

export const ObjectiveContainer = memo(
  ({
    objective,
    containerIndex,
    children,
    onOpenModal,
    hideActions,
  }: ObjectiveContainerProps) => {
    const classes = useStyles();
    const RatingLabel = RatingLabels[objective?.ratingId ?? "default"];
    const ratingProps =
      objective?.ratingId === "4" ? { color: "#696969", width: 100 } : {};

    const { isAdmin, isPowerUser } = useAuthentication();

    const openEditModal = useCallback(
      (event) => {
        event.stopPropagation();
        onOpenModal?.(objective);
      },
      [onOpenModal, objective]
    );
    const [isAccordionExpanded, setIsAccordionExpanded] = useState(true); // Initialize the expanded state

    const handleAccordionChange = () => {
      // Toggle the expanded state when the Accordion is clicked
      setIsAccordionExpanded(!isAccordionExpanded);
    };

    return (
      <Grid
        item
        container
        direction="column"
        xs={12}
        className="objectives-container"
      >
        <Grid container className={classes.objectiveContainer} direction="row">
          <Accordion
            className={classes.accordionContainer}
            defaultExpanded={true}
            onChange={handleAccordionChange}
            TransitionProps={{
              timeout: 0,
              mountOnEnter: true,
            }}
          >
            <AccordionSummary
              classes={{ content: classes.accordionSummary }}
              expandIcon={<ExpandMoreIcon className={classes.expandMoreIcon} />}
            >
              <Grid container direction="row">
                <Grid
                  item
                  xs={8}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    className={classes.objectiveTitle}
                    style={{
                      color: isAccordionExpanded ? "#FCFCFC" : "#323130",
                    }}
                  >
                    {containerIndex + 1}: {objective.objectiveDescription}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={1}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  {!hideActions && (
                    <Box
                      className={
                        classes.relationshipsWrapper + " some-temp-name"
                      }
                    >
                      <RelationshipsMinifiedDisplay
                        elementId={objective.objectiveId || ""}
                        elementType="strategicObjective"
                        elementName={objective.objectiveDescription || ""}
                        color="inherit"
                      />
                    </Box>
                  )}
                </Grid>
                {/* Grid item xs={2} style={{ alignItems: "center" }}> */}
                  <Box className={classes.ratingContainer}>
                    {objective?.achieved ? (
                      <Box display="flex" flexDirection="row" alignItems="center" gridGap={5}>
                        <CheckCircleIcon
                          className={`${classes.checkIconContainer}`}
                        />
                        <span
                          style={{
                            fontFamily: "Open Sans",
                            fontSize: 14,
                            color: isAccordionExpanded ? "#FCFCFC" : "#323130",
                            paddingTop: 2,
                            fontWeight: 600,
                            alignItems: "center"
                          }}
                        >
                          Finished
                        </span>
                      </Box>
                    ) : (
                      <RatingLabel
                        labelColor={isAccordionExpanded ? "light" : "dark"}
                        {...ratingProps}
                      />
                    )}
                  </Box>
                {/* </Grid> */}
                <Grid item xs={1}>
                  {(isAdmin || isPowerUser) && !hideActions && (
                    <Box className={classes.editIconContainer}>
                      <IconButton
                        aria-label="edit objective"
                        size="small"
                        className={`objective-modal-button`}
                        onClick={openEditModal}
                      >
                        <EditIcon
                          className={classes.objectiveEditIcon}
                          onFocus={openEditModal}
                        />
                      </IconButton>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </AccordionSummary>
            
            <Box className={classes.keyResultContainer}>{children}</Box>
          </Accordion>
        </Grid>
      </Grid>
    );
  }
);
