type Nodes = {
    id: string;
    name: string;
    contextId?: string;
    startDate?: any;
    endDate?: string;
    flomatikaWorkItemTypeLevel?: string;
    workItemType?: string;
    contextName?: string;
    assignedTo?: string;
    baselines?: any;
    dependencies?: any;
    linkedItems?: any;
    manuallyScheduled?: boolean;
    children: Nodes[];
    eventColor?: string;
    readOnly?: boolean;
    isUserDefinedDate?: boolean;
    isCalculatedDate?: boolean;
};

type GoalNode = {
    id: string;
    name: string;
    children: Nodes[];
};

type Roots = Nodes[];

export const createTreeNode = (items, viewSelection) => {
    const map = new Map();
    const roots: Roots = [];

    let eventColor;

    for (const item of items) {
        if (item.isActual)
            eventColor = 'green ';
        else {
            eventColor = item.isCalculatedDate && !item.isUserDefinedDate ? 'teal' : 'cyan';
        }

        const node: Nodes = {
            id: item.workItemId,
            name: `${item.workItemId} : ${item.title}`,
            contextId: item.contextId,
            startDate: item.targetStart,
            endDate: item.targetEnd,
            flomatikaWorkItemTypeLevel: item.flomatikaWorkItemTypeLevel,
            workItemType: item.workItemType,
            contextName: item.contextName,
            assignedTo: item.assignedTo,
            baselines: item.baselines,
            dependencies: item.dependencies,
            linkedItems: item.linkedItems,
            manuallyScheduled: true,
            readOnly: item.isActual,
            isUserDefinedDate: item.isUserDefinedDate,
            isCalculatedDate: item.isCalculatedDate,
            children: [],
            eventColor

        };

        if (viewSelection === "Work breakdown") {
            map.set(item.workItemId, node);
        } else if (viewSelection === "Boards and aggregations") {
            if (!map.has(item.contextName)) {
                const boardNode = {
                    id: item.contextId,
                    name: item.contextName,
                    children: [],
                };
                map.set(item.contextName, boardNode);
                roots.push(boardNode);
            }
            const boardNode = map.get(item.contextName);
            boardNode.children.push(node);
        } else if (viewSelection === "Flow Item Level") {
            if (!map.has(item.flomatikaWorkItemTypeLevel)) {
                const levelNode = {
                    id: item.flomatikaWorkItemTypeLevel,
                    name: item.flomatikaWorkItemTypeLevel,
                    children: [],
                };
                map.set(item.flomatikaWorkItemTypeLevel, levelNode);
                roots.push(levelNode);
            }
            const levelNode = map.get(item.flomatikaWorkItemTypeLevel);
            levelNode.children.push(node);
        } else if (viewSelection === "Flow Item Type") {
            if (!map.has(item.workItemType)) {
                const typeNode = {
                    id: item.workItemType,
                    name: item.workItemType,
                    children: [],
                };
                map.set(item.workItemType, typeNode);
                roots.push(typeNode);
            }
            const typeNode = map.get(item.workItemType);
            typeNode.children.push(node);
        } else if (viewSelection === "Goals") {
            const goalNode: GoalNode = {
                id: item.objectiveId,
                name: item.objectiveDescription,
                children: [],
            };
            roots.push(goalNode);

            const keyResultMap = new Map();

            for (const keyResult of item.keyResults) {
                const keyResultNode: any = {
                    id: keyResult.keyResultId,
                    name: keyResult.keyResultDescription,
                    //manuallyScheduled: true,
                    children: [],
                };

                keyResultMap.set(keyResult.keyResultId, keyResultNode);

                const flattenedChildren = [
                    ...(keyResult.completedItems || []),
                    ...(keyResult.proposedItems || []),
                    ...(keyResult.inProgressItems || []),
                ];

                for (const item of flattenedChildren) {
                    const nodes = {
                        id: item.workItemId,
                        name: `${item.workItemId} : ${item.title}`,
                        contextId: item.contextId,
                        startDate: item.targetStart,
                        endDate: item.targetEnd,
                        flomatikaWorkItemTypeLevel: item.flomatikaWorkItemTypeLevel,
                        workItemType: item.workItemType,
                        contextName: item.contextName,
                        assignedTo: item.assignedTo,
                        baselines: item.baselines,
                        dependencies: item.dependencies,
                        linkedItems: item.linkedItems,
                        manuallyScheduled: true,
                        readOnly: item.isActual,
                        isUserDefinedDate: item.isUserDefinedDate,
                        isCalculatedDate: item.isCalculatedDate,
                        children: [],
                        eventColor
                    };

                    if (!keyResultMap.has(keyResult.keyResultId)) {
                        keyResultMap.set(keyResult.keyResultId, nodes);
                    } else {
                        const existingKeyResultNode = keyResultMap.get(
                            keyResult.keyResultId
                        );
                        existingKeyResultNode.children.push(nodes);
                    }
                }

                goalNode.children.push(keyResultNode);
            }
        }
    }

    if (viewSelection === "Work breakdown") {
        for (const item of items) {
            const node = map.get(item.workItemId);
            const parent = map.get(item.parentId);

            if (parent) {
                parent.children.push(node);
            } else if (item.parentId === null) {
                roots.push(node);
            } else {
                let foundParent = false;
                for (const parentItem of items) {
                    if (parentItem.workItemId === item.parentId) {
                        const parentNode = map.get(parentItem.workItemId);
                        parentNode.children.push(node);
                        foundParent = true;
                        break;
                    }
                }
                if (!foundParent) {
                    roots.push(node);
                }
            }
        }
    }

    return roots;
};