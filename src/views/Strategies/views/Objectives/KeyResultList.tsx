import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useStyles } from "./styles";
// import HorizontalBar from '../../components/HorizontalBar';
import {
  OKRObjective,
  OKRKeyResult,
  // defaultHorizontalBarConfig,
} from "views/Governance/views/GovernanceObeya/utils";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import AddIcon from '@material-ui/icons/Add';
import { RatingLabels } from "./Rating";
// import ZeroState from 'components/ZeroState';
// import { OBEYA_ROLES_ALLOW_ACCESS } from 'utils/routes';
// import useAuthentication from 'hooks/useAuthentication';
import { styled } from "@material-ui/styles";
import RelationshipsMinifiedDisplay from "components/RelationsipsMinifiedDisplay";
import KeyResultProgress from "./components/KeyResultProgress";

type KeyResultListProps = {
  objective: OKRObjective;
  objectiveIndex: number;
  hideActions?: boolean;
  // onOpenModal?: (OKRObjective) => void;
};

export const KeyResultContainer = styled(Grid)({
  paddingTop: 10,
  background: "#FEFEFE",
});

export const KeyResultList = ({
  objective,
  objectiveIndex,
  hideActions,
}: // onOpenModal,
KeyResultListProps) => {
  const classes = useStyles();
  // const { isInRole } = useAuthentication();

  return (
    <KeyResultContainer item container direction="row" xs={12}>
      {objective.keyResults?.map((keyResult, i) => {
        const RatingLabel = RatingLabels[keyResult.ratingId ?? "default"];
        const keyRatingProps =
          keyResult.ratingId === "4" ? { width: 100, color: "#696969" } : {};
        return (
          <Grid container direction="row" key={i} style={{ padding: 10 }}>
            <KeyResultDescription
              objectiveIndex={objectiveIndex + 1}
              keyResult={keyResult}
              keyResultIndex={i}
            />
            <KeyResultProgress keyResult={keyResult} />
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
                <Box className={classes.relationshipsWrapperKeyResult}>
                  <RelationshipsMinifiedDisplay
                    elementId={keyResult.keyResultId || ""}
                    elementType="strategyKeyResult"
                    elementName={keyResult.keyResultDescription || ""}
                  />
                </Box>
              )}
            </Grid>
            {/* <Grid item xs={2}> */}
              <Box
                className={classes.ratingContainer}
                alignItems="center"
                display="flex"
              >
                {keyResult.completed ? (
                  <CheckCircleIcon
                    className={`${classes.checkIconContainer}`}
                  />
                ) : (
                  <RatingLabel labelColor="dark" customProps={keyRatingProps} />
                )}
              </Box>
            {/* </Grid> */}
          </Grid>
        );
      })}
    </KeyResultContainer>
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
    <Grid item xs={7} className={`${classes.keyResultCard}`}>
      <Typography className={classes.typographySm}>
        {objectiveIndex}.{keyResultIndex + 1} {keyResult.keyResultDescription}
      </Typography>
    </Grid>
  );
};
