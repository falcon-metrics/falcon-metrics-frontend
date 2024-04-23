import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Grid } from "@material-ui/core";
import { ObeyaRooms } from "core/api/ApiClient/ObeyaGoalsClient";
import { DragDropContainer } from "./styles";
import { Column, PortfolioBoardData } from "../../../../interfaces/PortfolioBoard";
import { useInitiatives } from "../../../../hooks/useInitiatives";
import { initialData } from "../../data/mock";
import { mergeValues, updateRoomIdsOrder } from "../../utils/utils";
import OuterDragComponent from "../OuterDragComponent";
import { usePortfolio } from "views/LeanPortfolio/hooks/usePortfolio";

interface Props {
  contextId: string | undefined;
  portfolio: PortfolioBoardData;
  setShowColumnDialog: (value: boolean) => void;
  isAdminOrPowerUser: boolean;
}

export interface DragComponentProps {
  column: Column;
  initiatives: ObeyaRooms;
  dragging: boolean;
  setDragging: (value: boolean) => void;
  setOpen?: (value: boolean) => void;
  contextId: string | undefined;
  isDragDisabled: boolean;
}

const InitiativeBoard: React.FC<Props> = ({
  contextId,
  portfolio,
  setShowColumnDialog,
  isAdminOrPowerUser,
}) => {
  const { update: updateColumns } = usePortfolio();
  const { update: updateInitiative } = useInitiatives();

  const [data, setData] = useState<PortfolioBoardData>(portfolio);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (portfolio.columnOrder.length > 0) setData(portfolio);
    else setData(initialData);
  }, [portfolio]);

  const onDragEnd = async (result) => {
    setDragging(false);

    if (isAdminOrPowerUser) {
      if (!result.destination) return;

      if (result.type === "COLUMNS") {
        onOuterDragEnd(result);
      } else {
        onInnerDragEnd(result);
      }
    }
  };

  const onOuterDragEnd = async (result) => {
    const { destination, source } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // Reorder the list of columns
    const newColumnOrder = Array.from(data.columnOrder);
    newColumnOrder.splice(source.index, 1);
    newColumnOrder.splice(destination.index, 0, result.draggableId);

    const newData = {
      ...data,
      columnOrder: newColumnOrder,
    };

    setData(newData);
    await updateColumns(newData.columnOrder);
  };

  const onInnerDragEnd = async (result) => {
    const { destination, source } = result;

    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;
    const sourceColumn = data.columns[sourceColumnId];
    const destinationColumn = data.columns[destinationColumnId];

    const newColumns = { ...data.columns };

    if (sourceColumnId === destinationColumnId) {
      const newRoomIds = Array.from(sourceColumn.roomIds);
      const [removed] = newRoomIds.splice(result.source.index, 1);
      newRoomIds.splice(result.destination.index, 0, removed);

      const newColumn = { ...sourceColumn, roomIds: newRoomIds };
      newColumns[newColumn.columnId] = newColumn;
    } else {
      const sourceRoomIds = Array.from(sourceColumn.roomIds);
      const [removed] = sourceRoomIds.splice(result.source.index, 1);
      const newSourceColumn = { ...sourceColumn, roomIds: sourceRoomIds };
      newColumns[newSourceColumn.columnId] = newSourceColumn;

      const destinationRoomIds = Array.from(destinationColumn.roomIds);
      destinationRoomIds.splice(result.destination.index, 0, removed);
      const newDestinationColumn = {
        ...destinationColumn,
        roomIds: destinationRoomIds,
      };
      newColumns[newDestinationColumn.columnId] = newDestinationColumn;
    }

    const newData = { ...data, columns: newColumns };
    // setData(newData);

    // Map the roomIds to its proper order
    const reordered = updateRoomIdsOrder(newData);

    // Merge key-value pairs as one object
    const merged = mergeValues(reordered.columns);

    // await updateInitiative(merged);

    const updateInitiativePromise = updateInitiative(merged);
    setData(newData)

    await Promise.all([updateInitiativePromise]);

  };

  //enable when inside an accordion
  {/* <Box display="flex" flexDirection="column" flexGrow={1}> */}
  return (
    <DragDropContainer>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={(e) => {
          if (isAdminOrPowerUser) {
            setDragging(e.type === "INITIATIVES");
          }
        }}
      >
        <Droppable
          droppableId="droppable"
          direction="horizontal"
          type="COLUMNS"
        >
          {(provided) => (
            <div ref={provided.innerRef} style={{ display: "flex" }}>
              {data.columnOrder.map((col, index) => {
                const column = data.columns[col];
                const initiatives = column.roomIds ?? [];

                return (
                  <Grid item key={col} sm={8} md={10} lg={12}>
                    <OuterDragComponent
                      index={index}
                      column={column}
                      initiatives={initiatives}
                      dragging={dragging}
                      setDragging={setDragging}
                      setOpen={setShowColumnDialog}
                      contextId={contextId}
                      isDragDisabled={!isAdminOrPowerUser}
                    />
                  </Grid>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </DragDropContainer>
  );
};

export default InitiativeBoard;
