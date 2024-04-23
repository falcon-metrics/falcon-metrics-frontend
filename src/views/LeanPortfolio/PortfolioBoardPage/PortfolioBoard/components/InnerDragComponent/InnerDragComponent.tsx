import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import InitiativeCard from "../InitiativeCard";
import { DragComponentProps } from "../InitiativeBoard/InitiativeBoard";
import { getDroppableStyle, InitiativeDiv } from "../InitiativeBoard/styles";

const InnerDragComponent: React.FC<DragComponentProps> = ({
  contextId,
  column,
  initiatives,
  dragging,
  setDragging,
  isDragDisabled,
}) => {
  return (
    <Droppable droppableId={column.columnId} type={"INITIATIVES"}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={getDroppableStyle(dragging)}
        >
          {initiatives &&
            initiatives.map((initiative, index) => (
              <Draggable
                key={initiative.roomId}
                draggableId={initiative.roomId}
                index={index}
                isDragDisabled={isDragDisabled}
              >
                {(provided) => (
                  <InitiativeDiv
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onDragStart={() => setDragging(true)}
                  >
                    <InitiativeCard
                      contextId={contextId}
                      column={column}
                      initiative={initiative}
                      isDragDisabled={isDragDisabled}
                    />
                  </InitiativeDiv>
                )}
              </Draggable>
            ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default InnerDragComponent;
