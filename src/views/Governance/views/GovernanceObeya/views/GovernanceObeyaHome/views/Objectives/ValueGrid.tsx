import { OKRObjective } from "views/Governance/views/GovernanceObeya/utils";
import sortBy from "lodash/sortBy";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { ObjectiveContainer } from "./ObjectiveContainer";
import { KeyResultList } from "./KeyResultList";
import { useStyles } from "./styles";
import { useCallback } from "react";
import ButtonTooltip from "../../components/Tooltip/ButtonTooltip";
import useAuthentication from "hooks/useAuthentication";

export interface Props {
  isLoadingOkrs: boolean;
  okrs?: Array<OKRObjective>;
  openModal(): void;
  setObjective(objective: OKRObjective): void;
  obeyaRoomId?: string;
  onAddGoalRequest?: () => void;
  handleObjectiveStatusChange?: (formData: OKRObjective, currentObjective: OKRObjective) => void;
  handleKeyResultStatusChange?: (formData: OKRObjective, currentObjective: OKRObjective, krId: string) => void;
}

export const ValueGrid = ({
  okrs = [],
  openModal,
  setObjective,
  onAddGoalRequest,
  isLoadingOkrs,
  handleObjectiveStatusChange,
  handleKeyResultStatusChange
}: Props) => {
  const classes = useStyles();

  const onOpenModal = useCallback(
    (objective: OKRObjective) => {
      setObjective(objective);
      openModal();
    },
    [setObjective, openModal]
  );

  const { isAdminOrPowerUser } = useAuthentication();

  if (okrs.length === 0 && !isLoadingOkrs) {
    return (
      <Box>
        <div className={classes.emptyValueGridContainer}>
          <span className={classes.emptyValueGridText}>
            Seems like there are no objectives recorded
          </span>

          <ButtonTooltip text="add new Objective">
            <span>
              <Fab
                color="primary"
                aria-label="Edit"
                size="small"
                variant="extended"
                onClick={onAddGoalRequest}
                className={classes.emptyValueGridButton}
                disabled={!isAdminOrPowerUser}
              >
                <AddIcon />
                <Typography className={classes.emptyValueGridButtonText}>
                  Add an Objective
                </Typography>
              </Fab>
            </span>
          </ButtonTooltip>
        </div>
      </Box>
    );
  }

  return (
    <Box className="widget-content">
      {sortBy(okrs, "createdAt").map((objective, index) => (
        <Box key={objective.objectiveId}>
          <Grid container className={classes.root} justifyContent="center">
            <ObjectiveContainer
              key={objective.objectiveId}
              objective={objective}
              containerIndex={index}
              onOpenModal={onOpenModal}
              handleSubmitGoal={handleObjectiveStatusChange}
            >
              <KeyResultList
                key={objective.objectiveId}
                handleSubmitGoal={handleKeyResultStatusChange}
                onOpenModal={onOpenModal}
                objective={objective}
                objectiveIndex={index}
              />
            </ObjectiveContainer>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};
