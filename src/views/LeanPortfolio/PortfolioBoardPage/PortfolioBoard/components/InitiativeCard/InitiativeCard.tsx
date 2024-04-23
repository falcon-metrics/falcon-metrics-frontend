import React, { useMemo, useState } from "react";
import { Card, Menu, MenuItem, Typography } from "@material-ui/core";

import { ObeyaRoom } from "core/api/ApiClient/ObeyaGoalsClient";
import { DateTime } from "luxon";

import { ColumnFormFields } from "../../../../interfaces/PortfolioBoard";
import _, { noop } from "lodash";
import { useObeyaSelectedData } from "views/Governance/views/GovernanceObeya/hooks/useObeya";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { renderInitiativeDialog } from "../../PortfolioBoard";
import { useInitiatives } from "../../../../hooks/useInitiatives";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { Skeleton } from "@material-ui/lab";
import RelationshipsMinifiedDisplay from "components/RelationsipsMinifiedDisplay";
import { getInitiativeCardStyle, Title, Header, MenuIcon, InitiativeContent, DeliveryDate, PrimaryText, DeliveryDateContainer, SecondaryText, ProgressContainer, BorderLinearProgress, ProgressValue, ConfidenceContainer, ConfidenceCaption, ConfidenceValue, EstimatedDatesContainer, ExpectedDateHeader, EstimatedDates, SeeMoreButton, LinkIconContainer } from "../InitiativeBoard/styles";
import { formatDate } from "utils/dateTime";
interface Props {
  contextId: string | undefined;
  column: ColumnFormFields;
  initiative: ObeyaRoom;
  isDragDisabled: boolean;
}

enum ConfidenceColor {
  HIGH_CONFIDENCE = "rgba(170, 237, 233, 0.2)",
  MEDIUM_CONFIDENCE = "rgba(255, 182, 51, 0.2)",
  LOW_CONFIDENCE = "rgba(209, 90, 70, 0.2)",
  COMPLETE = "rgb(240,240,240)",
}

const confidenceLevelColor = (
  isFinished: boolean,
  desiredDateConfidenceLevel: number
) => {
  if (isFinished || desiredDateConfidenceLevel === 0)
    return ConfidenceColor.COMPLETE;

  if (desiredDateConfidenceLevel <= 64) return ConfidenceColor.LOW_CONFIDENCE;
  if (desiredDateConfidenceLevel <= 84 && desiredDateConfidenceLevel > 64)
    return ConfidenceColor.MEDIUM_CONFIDENCE;
  else return ConfidenceColor.HIGH_CONFIDENCE;
};

const InitiativeCard: React.FC<Props> = ({
  contextId,
  column,
  initiative,
  isDragDisabled,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [obeyaFetchEnabled, setObeyaFetchEnabled] = useState(false);
  const { predictiveAnalysis, highlights, isLoading } = useObeyaSelectedData(
    initiative.roomId, obeyaFetchEnabled
  );

  const confirm = useConfirm();

  const { remove } = useInitiatives();

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleEdit = () => {
    // Handle edit action
    setIsEdit(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    // Handle delete action
    renderConfirmDelete(initiative.roomId, initiative.roomName);
    handleMenuClose();
  };

  const renderConfirmDelete = (roomId, roomName) =>
    confirm({
      title: "Warning: This action cannot be undone!",
      description: (
        <Typography>Are you sure you want to delete {roomName}?</Typography>
      ),
      cancellationText: "No",
      confirmationText: "Yes",
    })
      .then(() => onDelete?.(roomId))
      .catch(noop);

  const onDelete = async (roomId: string) => {
    try {
      await remove(roomId).then(() => {
        enqueueSnackbar("Initiative has been deleted.", {
          variant: "success",
          persist: false,
        });
      });
    } catch (error) {
      enqueueSnackbar("Error during delete. Please try again.", {
        variant: "error",
        persist: false,
      });

      console.log(`Error on delete : `, error);
    }
  };

  const total = useMemo(() => {
    return highlights.reduce(
      (acc, item) => {
        acc.totalCount += item.count;
        acc.completedCount += item.completed;
        acc.itemsLeft = acc.totalCount - acc.completedCount;
        return acc;
      },
      { totalCount: 0, completedCount: 0, itemsLeft: 0 }
    );
  }, [highlights]) || 0;

  const overallCompletionPercentage =
    (total.completedCount / total.totalCount) * 100 || 0;
  const cardStyle = getInitiativeCardStyle(column.colour);
  if (!obeyaFetchEnabled) cardStyle.minHeight = 70;
  return (
    <Card variant="outlined" style={cardStyle}>
      <Header>
        <Title to={`/vmo/initiative?roomId=${initiative.roomId}`}>
          {initiative.roomName}
        </Title>
        {!isDragDisabled && (
          <MenuIcon
            size="small"
            id={`${initiative.roomId}`}
            onClick={handleMenuOpen}
          >
            <MoreVertIcon fontSize="small" color="inherit" />
          </MenuIcon>
        )}
      </Header>
      <InitiativeContent>
        <DeliveryDate>
          <PrimaryText>Target Date:&nbsp;</PrimaryText>
          {initiative.endDate && (
            <PrimaryText>
              {formatDate(initiative.endDate)}
            </PrimaryText>
          )}
        </DeliveryDate>
        <DeliveryDateContainer>
          {initiative.endDate ? (
            <SecondaryText>
              <span>
                {(() => {
                  const daysLeft = _.ceil(
                    DateTime.fromISO(initiative.endDate)
                      .diff(DateTime.local(), "days")
                      .toObject().days ?? 0
                  );
                  return daysLeft > 0
                    ? `${daysLeft} ${daysLeft > 1 ? "days" : "day"} left`
                    : "";
                })()}
              </span>
            </SecondaryText>
          ) : <SecondaryText>&nbsp;</SecondaryText>}
        </DeliveryDateContainer>
        {
          obeyaFetchEnabled
            ? (
              <>
                {
                  isLoading
                    ? <Skeleton height={'115px'} style={{ marginBottom: '0px', paddingBottom: '0px' }} />
                    : (
                      <>
                        <ProgressContainer>
                          <BorderLinearProgress
                            variant="determinate"
                            value={_.round(overallCompletionPercentage)}
                          />
                          <ProgressValue>{`${_.round(
                            overallCompletionPercentage
                          )}%`}</ProgressValue>
                          {highlights && _.round(overallCompletionPercentage) < 100 && (
                            <SecondaryText>{`${total.itemsLeft} ${total.itemsLeft > 1 ? "items" : "item"
                              } left`}</SecondaryText>
                          )}
                        </ProgressContainer>
                        {predictiveAnalysis && <ConfidenceContainer
                          style={{
                            backgroundColor: confidenceLevelColor(
                              initiative.isFinished ?? false,
                              predictiveAnalysis.deliveryDateAnalysis[
                              "desiredDeliveryDateConfidenceLevelPercentage"
                              ]
                            ),
                          }}
                        >
                          {initiative.isFinished ? (
                            <ConfidenceCaption>This initiative has finished</ConfidenceCaption>
                          ) : (
                            <>
                              <ConfidenceValue>
                                {predictiveAnalysis
                                  ? `${predictiveAnalysis.deliveryDateAnalysis["desiredDeliveryDateConfidenceLevelPercentage"]}%`
                                  : ""}
                              </ConfidenceValue>
                              <ConfidenceCaption>
                                confidence level for on-time delivery
                              </ConfidenceCaption>
                            </>
                          )}
                        </ConfidenceContainer>}
                        {!initiative.isFinished && (
                          <EstimatedDatesContainer>
                            <ExpectedDateHeader>Estimated Delivery Dates:</ExpectedDateHeader>
                            <EstimatedDates>
                              <SecondaryText style={{ fontSize: 12 }}>
                                98% confidence
                              </SecondaryText>
                              <PrimaryText style={{ fontSize: 12 }}>
                              {predictiveAnalysis?.deliveryDateAnalysis?.["98Percentile"]
                                ? formatDate(predictiveAnalysis.deliveryDateAnalysis["98Percentile"])
                                : "-"
                              }
                              </PrimaryText>
                            </EstimatedDates>
                            <EstimatedDates>
                              <SecondaryText style={{ fontSize: 12 }}>
                                85% confidence
                              </SecondaryText>
                              <PrimaryText style={{ fontSize: 12 }}>
                              {predictiveAnalysis?.deliveryDateAnalysis?.["85Percentile"]
                                ? formatDate(predictiveAnalysis.deliveryDateAnalysis["85Percentile"])
                                : "-"
                              }
                              </PrimaryText>
                            </EstimatedDates>
                          </EstimatedDatesContainer>
                        )}
                      </>
                    )
                }
              </>
            )
            : (
              <SeeMoreButton
                size="small"
                color="primary"
                onClick={() => setObeyaFetchEnabled(true)}
              >
                See more
              </SeeMoreButton>
            )
        }
        <LinkIconContainer>
          <RelationshipsMinifiedDisplay elementId={initiative.roomId || ''} elementName={initiative.roomName} elementType="obeyaRoom" />
        </LinkIconContainer>
      </InitiativeContent>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      {isEdit &&
        renderInitiativeDialog({
          contextId,
          open: isEdit,
          setOpen: setIsEdit,
          defaultValue: initiative,
        })}
    </Card>
  );
};

export default InitiativeCard;
