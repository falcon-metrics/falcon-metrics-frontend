export type BoardItem = {
    boardName: string;
    proposed: number;
    completed: number;
    inProgress: number;
    contextId: string;
};

export const ChildItemsLevels = { 
    1 : "Level 1",
    2 : "Level 2",
    3 : "Level 3",
    4 : "Level 4",
    5 : "Level 5"
}

export const RelationType = [
    "relates",
    "blocks",
    "blocked by",
    "clones",
    "cloned by",
    "duplicates",
    "duplicated by",
    "causes",
    "caused by",
    "contributed by",
    "contributed to",
]