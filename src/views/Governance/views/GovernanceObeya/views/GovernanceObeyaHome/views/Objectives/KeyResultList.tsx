/* eslint-disable @typescript-eslint/no-unused-vars */
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useStyles } from "./styles";
import HorizontalBar from "../../components/HorizontalBar";
import {
  OKRObjective,
  OKRKeyResult,
  defaultHorizontalBarConfig,
} from "views/Governance/views/GovernanceObeya/utils";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AddIcon from "@material-ui/icons/Add";
import ZeroState from "components/ZeroState";
import useAuthentication from "hooks/useAuthentication";
import {
  CustomSelect,
  useStyles as useInitiativeClass,
} from "../Updates/components/InitiativeActions/InitiativeActions";
import MenuItem from "@material-ui/core/MenuItem";
import { RatingOptionsConstant } from "views/Governance/utils/constants";
import { getStatusStyles } from "../Updates/components/UpdateCard/utils";
import _ from "lodash";

type KeyResultListProps = {
  objective: OKRObjective;
  objectiveIndex: number;
  onOpenModal?: (OKRObjective) => void;
  handleSubmitGoal?: (formData: OKRObjective, currentObjective: OKRObjective, krId: string) => void;
};

export const KeyResultList = ({
  objective,
  objectiveIndex,
  onOpenModal,
  handleSubmitGoal,
}: KeyResultListProps) => {

  const iniativeClasses = useInitiativeClass();
  const classes = useStyles();
  const { isAdminOrPowerUser } = useAuthentication();

  const handleStatusChange = (krId: string, ratingId: string) => {
    const objCopy = _.cloneDeep(objective);
    const krToEdit = objCopy.keyResults && objCopy.keyResults.find(x => x.keyResultId === krId);
    if (handleSubmitGoal && krToEdit) {
      krToEdit.ratingId = ratingId;
      handleSubmitGoal(objCopy, objective, krId);
    }
  };

  return (
    <Grid item container direction="row" xs={12}>
      {objective.keyResults?.map((keyResult, i) => {
        return (
          <Grid
            container
            direction="row"
            key={keyResult.keyResultId}
            style={{ background: "#fff" }}
          >
            <KeyResultDescription
              objectiveIndex={objectiveIndex + 1}
              keyResult={keyResult}
              keyResultIndex={i}
            />
            <Grid item xs={keyResult.completed ? 2 : 1}>
              <Box className={classes.completedContainerIcon}>
                {keyResult.completed && (
                  <CheckCircleIcon className={classes.completedIcon} />
                )}
              </Box>
            </Grid>
            {((!keyResult.completed && !keyResult.parentWorkItemId) ||
              !keyResult.completed) && (
                <Grid item xs={1} style={{ width: 200 }}>
                  <Box className={`${classes.ratingIconContainer}`}>
                    <div className={iniativeClasses.wrapper}>
                      <CustomSelect
                        disabled={!isAdminOrPowerUser}
                        labelId="status-kr"
                        id={`${objectiveIndex}.status-kr`}
                        value={keyResult.ratingId ?? "4"}
                        renderValue={(value: any) => {
                          const item = RatingOptionsConstant.find((x) => x.value === value);
                          if (item) return <p>{item.label}</p>;
                          else return <p>Not Rated</p>;
                        }}
                        style={{
                          width: 120,
                          height: 28,
                          marginRight: 10,
                          background: getStatusStyles(keyResult.ratingId).background,
                          color: getStatusStyles(keyResult.ratingId).color,
                          fontSize: 14,
                          fontFamily: "Open Sans",
                          borderBottom: "none",
                        }}
                        onChange={(event) => {
                          handleStatusChange(keyResult.keyResultId || '', event.target.value as string);
                        }}
                      >
                        {RatingOptionsConstant.map((elementOption) => {
                          return (
                            <MenuItem
                              dense
                              key={elementOption.label}
                              value={elementOption.value}
                            >
                              <Box>{elementOption.label}</Box>
                            </MenuItem>
                          );
                        })}
                      </CustomSelect>
                    </div>
                  </Box>
                </Grid>
              )}
            <Grid item xs={6}>
              <Box flex="1" justifyContent="center" alignItems="center">
                {!keyResult.parentWorkItemId ? (
                  <Box className={classes.addParentWorkItemBtnContainer}>
                    <button
                      className={classes.addParentWorkItemBtn}
                      onClick={() => onOpenModal?.(objective)}
                    >
                      {isAdminOrPowerUser && (
                        <>
                          <AddIcon /> Associate a work item to see progress bar
                        </>
                      )}
                    </button>
                  </Box>
                ) : !keyResult.numberOfItemsCompleted &&
                  !keyResult.numberOfItemsInProgress &&
                  !keyResult.numberOfItemsProposed ? (
                  <ZeroState
                    minHeight={1}
                    fontSize={12}
                    maxIconHeight={70}
                    textTopMargin={1}
                    textBottomMargin={10}
                    iconPadding={10}
                    message="No items found"
                  />
                ) : (
                  <HorizontalBar
                    customProps={{
                      ...defaultHorizontalBarConfig,
                      plot: {
                        valueBox: {
                          ...defaultHorizontalBarConfig.plot.valueBox,
                          text: "%npv% ",
                          fontSize: 12,
                          decimals: 0,
                        },
                      },
                    }}
                    donePerc={keyResult.numberOfItemsCompleted}
                    inProgressPerc={keyResult.numberOfItemsInProgress}
                    toDoPerc={keyResult.numberOfItemsProposed}
                    backgroundColor="#fff"
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

type KeyResultDescriptionProps = {
  keyResult: OKRKeyResult;
  keyResultIndex: number;
  objectiveIndex?: string | number;
};

const KeyResultDescription = ({
  keyResult,
  keyResultIndex,
  objectiveIndex,
}: KeyResultDescriptionProps) => {
  const classes = useStyles();
  return (
    <Grid item xs={4} className={`${classes.keyResultCard}`}>
      <Typography className={classes.typographySm}>
        {objectiveIndex}.{keyResultIndex + 1} {keyResult.keyResultDescription}
      </Typography>
    </Grid>
  );
};
