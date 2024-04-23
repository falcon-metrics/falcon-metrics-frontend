import { DateTime } from "luxon";
import pako from 'pako';


/**
 * Get the local timezone
 */
export const getTimezone = (): string => {
    const UTC = 'UTC';
    let timezone = UTC;
    try {
        // Alternative to  Intl.DateTimeFormat().resolvedOptions().timeZone
        timezone = DateTime.now().zoneName;
        if (!timezone || timezone.length === 0) timezone = UTC;
    } catch (e) {
        console.warn('Error getting the local timezone. Setting timezone to UTC');
        timezone = UTC;
    }

    return timezone;
};

/**
 * Utility to deflate a compressed string of stringified JSON
 */
export const deflate = (s: string) => {
    // Convert base64 string to a Uint8Array array
    const arr = Uint8Array.from(atob(s), c => c.charCodeAt(0));
    // Inflate the array
    const inflatedArr = pako.inflate(arr);
    // Decode the array of integers to a string
    const inflatedStr = new TextDecoder().decode(inflatedArr);
    // Parse the string to get an array of objects
    const inflated = JSON.parse(inflatedStr);
    return inflated;
};
