export enum NodeType {
    METRIC = 'metric',
    KEY_RESULT = 'strategyKeyResult',
    VISION = 'vision',
    MISSION = 'mission',
    INITIATIVE = 'obeyaRoom',
    OBEJECTIVE = 'strategicObjective',
    STRATETIC_DRIVER = 'strategicDriver',
    STRATEGY = 'strategy',
}

export enum LinkType {
    DEPENDENT_ON = 'dependent_on',
}

export type ExampleProps = {
    entityId?: string;
    setEntityId?: any;
    entityName?: string;
    setEntityName?: any;
    entityType?: string;
    setEntityType?: any;
    setShowPreviewModal?: any;
    showChildren?: any;
};

export type IconProps = {
    cursor?: string;
    color?: string;
    fontSize?: number;
};