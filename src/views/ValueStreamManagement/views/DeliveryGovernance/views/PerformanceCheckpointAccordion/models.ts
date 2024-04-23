import _ from "lodash";
import { DateTime } from "luxon";
import tinycolor from 'tinycolor2';
export enum Unit {
    BLANK = '',
    PERCENTAGE = 'PERCENTAGE',
    DAYS = 'DAYS',
    FLOW_ITEMS = 'FLOW_ITEMS'
}

// Objects cannot have enum values as properties
// Thats why we need this function
export const getUnitDisplayString = (unit: Unit): string => {
    switch (unit) {
        case Unit.BLANK:
            return '';
        case Unit.DAYS:
            return ' days';
        case Unit.FLOW_ITEMS:
            return ' flow items';
        case Unit.PERCENTAGE:
            return '%';
        default:
            return '';
    }
};

export enum TrendComparison {
    UP_IS_GOOD = 'up is good',
    DOWN_IS_GOOD = 'down is good'
}

export enum TrendDirection {
    UP = 'Up',
    DOWN = 'Down',
    STABLE = 'Stable',
};

export class MetricBase {
    name: string;
    displayName: string;
    value: number | string;
    unit: Unit;
    error: boolean;

    constructor({ name, displayName, value, unit }
        : {
            name: string, displayName: string, value: number | string, unit: Unit;
        }
    ) {
        this.name = name;
        this.displayName = displayName;
        this.value = value;
        this.unit = unit;
        this.error = value === -999999;
    };

    roundToOneDecimal(n: number) {
        return Math.round(n * 10) / 10;
    }

    getUnitDisplayString(unit: Unit, value: number | string): string {
        let isPlural = true;
        if (typeof value === 'number' && value === 1) {
            isPlural = false;
        }
        let str = '';
        switch (unit) {
            case Unit.DAYS: {
                str = ' days';
                break;
            }
            case Unit.FLOW_ITEMS: {
                str = ' flow items';
                break;
            }
            case Unit.PERCENTAGE: {
                str = '%';
                break;
            }
            case Unit.BLANK:
            default:
                str = '';
        }
        // Remove the s at the end to make it singular
        if (!isPlural) str = str.replace(/s$/, '');
        return str;
    }

    getDisplayString() {
        if (this.error) {
            return 'ERROR';
        }
        let value = this.value;
        if (typeof this.value === 'number') {
            value = this.roundToOneDecimal(this.value);
        }
        if (value === '-')
            return value;
        return `${value}${this.getUnitDisplayString(this.unit, value)}`;
    }

}

export class PerformanceCheckpointMetric extends MetricBase {
    checkpoint: Checkpoint;
    trendComparison: TrendComparison;
    backgroundColor: string;

    constructor({ name, displayName, value, unit, checkpoint, trendComparison }
        : {
            name: string, displayName: string, value: number | string, unit: Unit;
            checkpoint: Checkpoint; trendComparison: TrendComparison;
        }
    ) {
        super({ name, displayName, value, unit });
        this.checkpoint = checkpoint;
        this.trendComparison = trendComparison;
        this.backgroundColor = 'white';
    };
}

export class Context {
    name: string;
    id: string;

    constructor({ name, id }: { name: string; id: string; }) {
        this.name = name;
        this.id = id;
    }
}
export class PerformanceBenchmarkMetric extends MetricBase {
    context: Context;
    checkpoint: Checkpoint;
    trendComparision: TrendComparison;

    constructor({ name, displayName, value, unit, context, checkpoint, trendComparision }
        : {
            name: string, displayName: string, value: number | string, unit: Unit;
            context: Context; checkpoint: Checkpoint; trendComparision: TrendComparison;
        }
    ) {
        super({ name, displayName, value, unit });
        this.context = context;
        this.checkpoint = checkpoint;
        this.trendComparision = trendComparision;
    };
}

export class PerformanceBenchmarkCustomViewMetric extends MetricBase {
    context: Context;
    checkpoint: Checkpoint;
    trendComparision: TrendComparison;
    absoluteValue: number;

    constructor({ name, displayName, value, unit, context, checkpoint, trendComparision, absoluteValue }
        : {
            name: string, displayName: string, value: number | string, unit: Unit;
            context: Context; checkpoint: Checkpoint; trendComparision: TrendComparison;
            absoluteValue: number;
        }
    ) {
        super({ name, displayName, value, unit });
        this.context = context;
        this.checkpoint = checkpoint;
        this.trendComparision = trendComparision;
        this.absoluteValue = absoluteValue;
    };

    getDisplayString() {
        if (this.error) {
            return 'ERROR';
        }
        let value = this.value;
        if (typeof this.value === 'number') {
            value = this.roundToOneDecimal(this.value);
        }
        if (value === '-')
            return value;
        return `${value}${this.getUnitDisplayString(this.unit, value)} (${this.absoluteValue} flow items)`;
    }
}

export enum Color {
    RED = 'red',
    GREEN = 'green',
    YELLOW = 'yellow',
}

export type Comparison = {
    unit: Unit;
    diff: number | undefined;
    percentageChange: number | undefined;
    trendDirection: TrendDirection;
    displayString: string;
    arrowColor: Color;
};


export class Checkpoint {
    name: string;
    id: string;
    startDate: DateTime;
    endDate: DateTime;

    constructor({ name, id, startDate, endDate, }:
        {
            name: string;
            id: string;
            /**
             * ISO Date string of the start date
             */
            startDate: string;
            /**
             * ISO Date string the end date
             */
            endDate: string;
        }
    ) {
        this.id = id;
        this.name = name;
        this.startDate = DateTime.fromISO(startDate);
        this.endDate = DateTime.fromISO(endDate);

        if (this.startDate.isValid === false) throw new Error('startDate is invalid');
        if (this.endDate.isValid === false) throw new Error('startDate is invalid');
    };
}

export class PerformanceCheckpointsRow {
    metrics: PerformanceCheckpointMetric[];
    checkpointsOrder: string[];
    metricName: string;
    unit: Unit;

    constructor(metrics: PerformanceCheckpointMetric[], checkpointsOrder: string[]) {
        this.checkpointsOrder = checkpointsOrder;

        if (metrics.length < 2) throw new Error('A row must have atleast 2 metrics');

        // Sort the metrics by the checkpoints Order
        this.metrics = _.sortBy(metrics, (m) => {
            return this.checkpointsOrder.findIndex(id => m.checkpoint.id === id);
        });

        this.metricName = this.metrics[0].displayName;
        this.unit = this.metrics[0].unit;

        // Disabling for now because the colors generated arent good to look at
        // this.assignColors();
    }

    getDisplayName() {
        return this.metrics[0].displayName;
    }

    private compareStringResults(v1: string, v2: string): { trendDirection: TrendDirection, displayString: string; arrowColor: Color; } {
        const HIGH = 'High', LOW = 'Low';
        let displayString = '';
        let trendDirection: TrendDirection = TrendDirection.STABLE;
        let arrowColor = Color.YELLOW;

        // Down trend
        if (v1 === HIGH && v2 === LOW) {
            displayString = 'Down';
            trendDirection = TrendDirection.DOWN;
        }

        // Up trend
        if (v1 === LOW && v2 === HIGH) {
            displayString = 'Up';
            trendDirection = TrendDirection.UP;
        }

        // Stable trend
        if ((v1 === LOW && v2 === LOW) ||
            (v1 === HIGH && v2 === HIGH)) {
            displayString = 'Stable';
            trendDirection = TrendDirection.STABLE;
            if (v1 === LOW) arrowColor = Color.RED;
            if (v1 === HIGH) arrowColor = Color.GREEN;
        }
        return {
            displayString,
            trendDirection,
            arrowColor
        };
    }

    private getArrowColor(trendDirection: TrendDirection, trendComparison: TrendComparison) {
        // Stable by default
        let color = Color.YELLOW;
        if (trendDirection === TrendDirection.DOWN) {
            if (trendComparison === TrendComparison.DOWN_IS_GOOD) {
                color = Color.GREEN;
            } else if (trendComparison === TrendComparison.UP_IS_GOOD) {
                color = Color.RED;
            }
        } else if (trendDirection === TrendDirection.UP) {
            if (trendComparison === TrendComparison.UP_IS_GOOD) {
                color = Color.GREEN;
            } else if (trendComparison === TrendComparison.DOWN_IS_GOOD) {
                color = Color.RED;
            }
        }
        return color;
    }

    private roundToOneDecimal(n: number) {
        return Math.round(n * 10) / 10;
    }

    private getUnitDisplayString(unit: Unit, value: number | string): string {
        let isPlural = true;
        if (typeof value === 'number' && value === 1) {
            isPlural = false;
        }
        let str = '';
        switch (unit) {
            case Unit.DAYS: {
                str = ' days';
                break;
            }
            case Unit.FLOW_ITEMS: {
                str = ' flow items';
                break;
            }
            case Unit.PERCENTAGE: {
                str = ' percentage points';
                break;
            }
            case Unit.BLANK:
            default:
                str = '';
        }
        // Remove the s at the end to make it singular
        if (!isPlural) str = str.replace(/s$/, '');
        return str;
    }

    /**
     * This is to get the comparison column when there are 2 metrics in a row
     */
    getComparison([id1, id2]: [id1: string, id2: string]): Comparison {
        let [metric1, metric2] = this.metrics;
        const { unit, trendComparison } = metric1;


        let result: Comparison = {
            unit,
            diff: 0,
            percentageChange: 0,
            trendDirection: TrendDirection.STABLE,
            displayString: '',
            arrowColor: Color.YELLOW
        };

        const checkpointIds = this.metrics.map(m => m.checkpoint.id);
        if (!(checkpointIds.includes(id1) && checkpointIds.includes(id2))) {
            console.error('Invalid ids');
            return result;
        }
        metric1 = this.metrics.find(m => m.checkpoint.id === id1) as PerformanceCheckpointMetric;
        metric2 = this.metrics.find(m => m.checkpoint.id === id2) as PerformanceCheckpointMetric;

        if (metric1 === undefined || metric2 === undefined) {
            return result;
        }

        // If either of the metrics has an error, dont display comparison
        if (metric1.error || metric2.error) {
            console.error('Error in one of the metrics');
            result.displayString = '';
        } else {
            switch (unit) {
                // Use the fall-through of switch to process the numeric values
                case Unit.DAYS:
                case Unit.FLOW_ITEMS:
                case Unit.PERCENTAGE: {
                    const v1 = metric1.value as number;
                    const v2 = metric2.value as number;

                    // Trend direction
                    if (v2 === v1)
                        result.trendDirection = TrendDirection.STABLE;
                    else if (v2 > v1)
                        result.trendDirection = TrendDirection.UP;
                    else
                        result.trendDirection = TrendDirection.DOWN;

                    // Difference
                    result.diff = this.roundToOneDecimal(Math.abs(v2 - v1));

                    // Percentange change
                    if (v1 !== 0) {
                        result.percentageChange = this.roundToOneDecimal((result.diff) * 100 / v1);
                    }

                    // Display string
                    if (result.diff === 0) {
                        result.displayString = 'Stable';
                    } else {
                        result.displayString = `${result.diff}${this.getUnitDisplayString(unit, result.diff)} (${result.percentageChange}%)`;
                    }



                    // Percentange change
                    result.arrowColor = this.getArrowColor(result.trendDirection, trendComparison);

                    break;
                }
                case Unit.BLANK: {
                    // If the unit is blank, the value is a string. Hence the typecast
                    const v1 = metric1.value as string;
                    const v2 = metric1.value as string;
                    result = {
                        ...result,
                        ...this.compareStringResults(v1, v2)
                    };
                    break;
                }
                default: {
                    result.displayString = '';
                }
            }
        }

        return result;
    }

    /**
     * Assign ranks to the given array of number. 
     * 
     * If the array is `[100, 42, 203, 2]`
     * 
     * The return value will be 
     * `
     * {
     *   100: 3,
     *   42 : 2,
     *   203: 4,
     *   2  : 1
     * }
     * `
     */
    private buildRankMap(array: number[]): Map<number, number> {
        const uniqSorted = _.chain(array).uniq().sortBy().value();
        const rankMap: Map<number, number> = uniqSorted
            .reduce((accum, n, i) => {
                // Ranks must start at 1
                accum.set(n, i + 1);
                return accum;
            },
                new Map()
            );

        return rankMap;
    }

    private getColorForRank(rank: number) {
        if (rank === 1) return 'white';
        // Light blue. Darken this for higher rank values
        const baseColor = 'rgba(153, 215, 242, 0.5)';
        const tc = tinycolor(baseColor);

        // Assuming the user will not company too many checkpoints. 
        // Multiply the rank by a constant to ensure you can see the difference in colors 
        const amount = rank * 5;
        return tc.darken(amount).toString();
        // return tinycolor.mix(baseColor, blue, amount).toString();
    }

    /**
     * This implementation doesnt work well
     * 
     * Try colors from here: https://colorbrewer2.org/#type=sequential&scheme=Blues&n=9
     */
    private assignColors() {
        if (this.unit === Unit.BLANK) {
            this.metrics.forEach(m => {
                if (['High', 'Low'].includes(m.value.toString())) {
                    if (m.value === 'Low') {
                        m.backgroundColor = 'white';
                    } else {
                        m.backgroundColor = this.getColorForRank(5);
                    }
                }
            });
        } else {
            const rankMap = this.buildRankMap(this.metrics.map(m => m.value as number));
            this.metrics.forEach(m => {
                const rank = rankMap.get(m.value as number);
                if (rank !== undefined) {
                    m.backgroundColor = this.getColorForRank(rank);
                }
            });
        }
    }
}

export class PerformanceBenchmarkRow {
    metrics: PerformanceBenchmarkMetric[];
    metricName: string;

    constructor(metrics: PerformanceBenchmarkMetric[]) {
        this.metrics = metrics;
        this.metricName = this.metrics[0].displayName;
    }

    getMetrics(checkpointId: string, contextId: string) {
        const metrics = this.metrics.filter(m => m.context.id === contextId && m.checkpoint.id === checkpointId);
        return metrics;
    }
}