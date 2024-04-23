/**
 * Transform an amount of days into varying layers of precision depending on how large the difference is
 * @param days 
 * @returns 
 */
export function daysToIntervalString(days: number) {
    if (days < 1) {
        const hours = days * 24;
        if (hours < 1) {
            const minutes = hours * 60;
            const minuteString = minutes.toFixed(0);
            return `${minuteString} minute${minuteString === '1' ? '' : 's'}`;
        }
        const hourString = hours.toFixed(0);
        return `${hourString} hour${hourString === '1' ? '' : 's'}`;
    }

    if (days < 30) {
        const dayString = days.toFixed(0);
        return `${dayString} day${dayString === '1' ? '' : 's'}`;
    }

    // Rough approximation of a month
    const months = days / 30;
    const monthString = months.toFixed(0);
    return `${monthString} month${monthString === '1' ? '' : 's'}`;
}

