
export type ThresholdNotificationSubscriptionRequest = {
    notificationId?: string;
    threshold: number;
    thresholdUnit: ThresholdUnit;
    thresholdDirection: ThresholdDirection;
    queryParameters?: string;
    obeyaRoomId: string;
    targetDate: string;
    active?: boolean;
};

export type ThresholdNotificationSubscription = ThresholdNotificationSubscriptionRequest & {
    orgId: string;
    email: string;
    userId: string;
    active: boolean;
};


export enum ThresholdUnit {
    Day = 'day',
    Week = 'week',
    Month = 'month',
    Percent = 'percent',
}
export enum ThresholdDirection {
    Up = 'up',
    Down = 'down',
    Both = 'both',
}

export const ThresholdNotificationId = '1'