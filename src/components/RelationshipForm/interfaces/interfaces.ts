export type RelationshipEntity = {
    id: string;
    orgId: string;
    fromId: string;
    fromType: string;
    toId: string;
    toType: string;
    fromName?: string;
    toName?: string;
    linkType: string;
};

export type ElementEntity = {
    label: string;
    value: string;
};