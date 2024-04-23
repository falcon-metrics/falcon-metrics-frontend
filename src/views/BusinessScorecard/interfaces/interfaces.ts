export type PerspectiveOption = {
    id?: string;
    name?: string;
    inputValue?: string;
};

export type MetricSnapshot = {
    id?: string;
    recordedDate?: string;
    value?: number;
};
export type MetricsEntry = {
    id?: string;
    name: string;
    type: string;
    lowerLimit?: number;
    upperLimit?: number;
    target?: number;
    metricValues: MetricSnapshot[];
    perspective?: string;
    context: string;
    unit?: string;
    trendDirection?: string;
};
export type PerspectiveEntry = {
    id?: string;
    name: string;
    metrics: MetricsEntry[],
};

export type Perspective = {
    id?: string;
    name: string;
};