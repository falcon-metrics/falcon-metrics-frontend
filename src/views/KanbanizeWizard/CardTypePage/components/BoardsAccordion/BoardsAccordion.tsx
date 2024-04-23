import React, { useState } from "react";
import CardTypesGrid from "../CardTypesGrid";
import { Box, TableRow, TableCell, Collapse, Table } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BoardsAccordionHeader from "./BoardsAccordionHeader";

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
export type BoardsAndCardTypesProps = {
    boards: any;
    methods: any;
    setIsDirty: (value: any) => void;
}

const BoardsAccordion = ({ boards, methods, setIsDirty }: BoardsAndCardTypesProps) => {
    // console.log("🚀 ~ file: CardTypePage.tsx:463 ~ Boards ~ boards:", boards);

    const [openAccordions, setOpenAccordions] = useState<number[]>([]);

    const onExpanded = (index: number) => {
        const currentIndex = openAccordions.indexOf(index);
        const newOpenAccordions = [...openAccordions];

        if (currentIndex === -1) {
            newOpenAccordions.push(index);
        } else {
            newOpenAccordions.splice(currentIndex, 1);
        }

        setOpenAccordions(newOpenAccordions);
    };

    return (
        <Table>
            <BoardsAccordionHeader />
            {
                Object.keys(boards).map((boardId: any, i) => {
                    const board = boards[boardId];
                    const key = `${i}-${boardId}`;

                    return (
                        <React.Fragment key={key}>
                            <TableRow>
                                <TableCell width={250}>{board.workspaceName}</TableCell>
                                <TableCell width={25}><ArrowForwardIcon /></TableCell>
                                <TableCell width={400}>{board.boardName}</TableCell>
                                {/* <TableCell width={100}>
                                    <Chip
                                        color="primary"
                                        size="small"
                                        style={{ fontSize: 14, fontWeight: 600, fontFamily: "Open Sans" }}
                                        label={`${checkedCount}`}
                                    />
                                </TableCell> */}
                                <TableCell style={{ width: "5%", textAlign: "right", padding: 0 }}>
                                    <ExpandMoreIcon
                                        style={{ cursor: "pointer", zIndex: 10 }}
                                        onClick={() => onExpanded(i)}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ padding: 0 }} colSpan={6}>
                                    <Collapse
                                        mountOnEnter
                                        unmountOnExit
                                        in={openAccordions.includes(i)}
                                        timeout="auto"
                                    >
                                        <Box m={2} style={{ backgroundColor: "#f9f9f9", borderRadius: 8, padding: 10 }}>
                                            <CardTypesGrid
                                                boards={board}
                                                methods={methods}
                                                setIsDirty={setIsDirty} />
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    );
                })
            }
        </Table>
    );
};

export default React.memo(BoardsAccordion);
