
interface Identity {
    connection: string;
    user_id: string;
    provider: string;
    isSocial: boolean;
}

interface AppMetadata {
    user_organisation?: string;
    roles?: string[];
}

interface UserMetadata {
    // Define user metadata properties if needed
}

export interface Auth0User {
    blocked: boolean;
    created_at: string;
    email: string;
    email_verified: boolean;
    identities: Identity[];
    name: string;
    nickname: string;
    picture: string;
    updated_at: string;
    user_id: string;
    user_metadata: UserMetadata;
    last_password_reset: string;
    app_metadata: AppMetadata;
}

export type UserGroup = {
    name: string;
    orgId: string;
    description?: string;
    id: string;
    createdAt: string;
    createdBy: string;
};

export type GroupUser = {
    orgId: string;
    userId: string;
    addedAt: string;
    addedBy: string;
    groupId: string;
};

export { };