import React, { useMemo } from "react";
import { Box, Button, Grid, Typography, Select, MenuItem, FormHelperText } from "@material-ui/core";

type Props = {
    boards: any;
    filters: CardTypesFilters;
    setFilters: (value: any) => void;
    setSortedData: (value: any) => void;
}

export type CardTypesFilters = {
    workspaceId?: string;
    boardId?: string;
};

const sortOptions = [
    {
        order: 0,
        value: "workspaces",
        name: "Workspaces",
    },
    {
        order: 1,
        value: "boards",
        name: "Boards",
    }
];

const Filters = ({ boards, filters, setFilters, setSortedData }: Props) => {

    const filteredBoards = useMemo(() => {
        let result = Object.values(boards);

        if (filters.workspaceId) {
            result = result.filter((board: any) => board.workspaceId === filters.workspaceId);
        }

        return result;
    }, [filters.workspaceId, boards]);

    const handleSort = (option: string) => {
        const sortedBoards = { ...boards };
        const sortedBoardIds = Object.keys(sortedBoards).sort((a, b) => {
            const boardA = sortedBoards[a];
            const boardB = sortedBoards[b];
            switch (option) {
                case "workspaces":
                    return boardA.workspaceName.localeCompare(boardB.workspaceName);
                case "boards":
                    return boardA.boardName.localeCompare(boardB.boardName);
                default:
                    return 0;
            }
        });

        const result: { [key: string]: any } = {};
        sortedBoardIds.forEach((boardId) => {
            result[boardId] = sortedBoards[boardId];
        });

        setSortedData(result);
    };


    const handleWorkspaceSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        const workspaceId = event.target.value as string;
        setFilters((prevFilters) => ({ ...prevFilters, workspaceId, boardId: undefined }));
    };

    const handleBoardSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        const boardId = event.target.value as string;
        setFilters((prevFilters) => ({ ...prevFilters, boardId }));
    };

    return (
        <Box width={'100%'} style={{ backgroundColor: "#f9f9f9", borderRadius: 8, padding: 10 }}>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                style={{ padding: 10 }}
            >
                <Box>
                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>Sort by</Typography>
                    <FormHelperText>Column</FormHelperText>
                    <Select
                        defaultValue={"workspaces"}
                        style={{ width: "180px" }}
                        onChange={(e: any) => handleSort(e.target.value)}
                    >
                        <MenuItem value="" disabled>
                            Sort by
                        </MenuItem>
                        {sortOptions.map((item, index) => {
                            return (
                                <MenuItem value={item.value} key={index}>
                                    {item.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </Box>


                <Box>
                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>Filter by</Typography>
                    <FormHelperText>Workspaces</FormHelperText>
                    <Select
                        defaultValue={"None"}
                        style={{ width: "300px" }}
                        onChange={handleWorkspaceSelect}
                        value={filters.workspaceId ?? 'None'}
                    >
                        {Array.from(new Set(Object.values(boards).map((board: any) => board.workspaceId))).map((workspaceId: string) => {
                            const workspace: any = Object.values(boards).find((board: any) => board.workspaceId === workspaceId);
                            return (
                                <MenuItem key={workspaceId} value={workspaceId}>
                                    {workspace?.workspaceName}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </Box>

                <Box>
                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>&nbsp;</Typography>
                    <FormHelperText>Boards</FormHelperText>
                    <Select
                        defaultValue={"None"}
                        style={{ width: "300px" }}
                        onChange={handleBoardSelect}
                        value={filters.boardId ?? 'None'}
                    >
                        {filteredBoards.map((board: any) => (
                            <MenuItem value={board.boardId} key={board.boardId}>
                                {`${board.workspaceName} > ${board.boardName}`}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </Grid>

            <Box display="flex" justifyContent='flex-end' m={1} mr={1}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setFilters({ workspaceId: undefined, boardId: undefined })}
                    size="small">
                    Clear Filters
                </Button>
            </Box>
        </Box>
    );
};
export default React.memo(Filters);
