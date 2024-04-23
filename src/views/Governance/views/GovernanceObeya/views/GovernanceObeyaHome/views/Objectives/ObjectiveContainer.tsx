/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import { OKRObjective } from "views/Governance/views/GovernanceObeya/utils";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import useAuthentication from "hooks/useAuthentication";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  CustomSelect,
  useStyles as useInitiativeStyles,
} from "../Updates/components/InitiativeActions/InitiativeActions";
import MenuItem from "@material-ui/core/MenuItem";
import "./styles.css";
import { RatingOptionsConstant } from "views/Governance/utils/constants";
import { getStatusStyles } from "../Updates/components/UpdateCard/utils";

type ObjectiveContainerProps = {
  objective: OKRObjective;
  containerIndex: number;
  onOpenModal?: (OKRObjective) => void;
  children: ReactNode;
  handleSubmitGoal?: (formData: OKRObjective, currentObjective: OKRObjective) => void;
};

export const ObjectiveContainer = ({
  objective,
  containerIndex,
  children,
  onOpenModal,
  handleSubmitGoal,
}: ObjectiveContainerProps) => {
  const initiativeClasses = useInitiativeStyles();
  const classes = useStyles();

  const { isAdminOrPowerUser } = useAuthentication();

  const openEditModal = useCallback(
    (event) => {
      event.stopPropagation();
      onOpenModal?.(objective);
    },
    [onOpenModal, objective]
  );

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
          defaultExpanded={!!(containerIndex === 0)}
          TransitionProps={{
            timeout: 0,
            mountOnEnter: true,
          }}
        >
          <AccordionSummary
            classes={{ content: classes.accordionContainer }}
            expandIcon={<ExpandMoreIcon className={classes.expandMoreIcon} />}
          >
            <Typography className={classes.objectiveTitle}>
              {containerIndex + 1}: {objective.objectiveDescription}
            </Typography>
            <Box
              justifyContent="flex-end"
              display="flex"
              pr={2}
              className={classes.ratingContainer}
            >
              <Box className={initiativeClasses.wrapper}>
                {objective?.achieved ? (
                  <CheckCircleIcon
                    className={`${classes.editIconButton} ${classes.checkIconContainer}`}
                  />
                ) : (
                  <CustomSelect
                    disabled={!isAdminOrPowerUser}
                    labelId="objective-status"
                    id="objective-status"
                    value={objective.ratingId}
                    style={{
                      width: 120,
                      height: 28,
                      marginRight: 10,
                      // background: `${ratingBackgroundColors?.[status ?? "4"] ?? '#fff'}`,
                      // color: `${ratingColors?.[status ?? "4"] ?? '#2B353B'}`,
                      background: getStatusStyles(objective.ratingId).background,
                      color: getStatusStyles(objective.ratingId).color,
                      fontSize: 14,
                      fontFamily: "Open Sans",
                      borderBottom: "none",
                    }}
                    onChange={(event) => {
                      if (handleSubmitGoal) {
                        handleSubmitGoal({ ...objective, ...{ ratingId: event?.target?.value as string } }, objective);
                      }
                    }}
                  >
                    {RatingOptionsConstant.map((option) => {
                      return (
                        <MenuItem dense key={option.label} value={option.value}>
                          <Box>{option.label}</Box>
                        </MenuItem>
                      );
                    })}
                  </CustomSelect>
                )}
              </Box>
            </Box>
            {isAdminOrPowerUser && (
              <Box className={classes.editIconContainer}>
                <IconButton
                  aria-label="edit objective"
                  size="small"
                  className={`${classes.editIconButton} objective-modal-button`}
                  onClick={openEditModal}
                >
                  <EditIcon
                    className={classes.objectiveEditIcon}
                    onFocus={openEditModal}
                  />
                </IconButton>
              </Box>
            )}
          </AccordionSummary>
          <Box key={objective.objectiveId} className={classes.keyResultContainer}>{children}</Box>
        </Accordion>
      </Grid>
    </Grid>
  );
};
