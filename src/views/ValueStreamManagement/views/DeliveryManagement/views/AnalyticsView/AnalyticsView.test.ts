// getTitle.test.ts
import {
    getDetailedReportTitle,
    getThroughputAnalyticsTitle
} from './AnalyticsView';

describe('getTitle function', () => {
    it('returns correct title for "past" perspective', () => {
        expect(getThroughputAnalyticsTitle('past')).toBe('Work Completion & Throughput Analytics');
    });

    it('returns correct title for "present" perspective', () => {
        expect(getThroughputAnalyticsTitle('present')).toBe('Work in Progress Analytics');
    });

    it('returns correct title for "future" perspective', () => {
        expect(getThroughputAnalyticsTitle('future')).toBe('Upcoming Work Analytics');
    });

    it('returns fallback title for invalid perspective', () => {
        expect(getThroughputAnalyticsTitle('invalid')).toBe('Work Completion & Throughput Analytics');
    });
});


describe('getDetailedReportTitle function', () => {
    it('returns correct title for "past" perspective', () => {
        expect(getDetailedReportTitle('past')).toBe('Completed Work Detailed Report');
    });

    it('returns correct title for "present" perspective', () => {
        expect(getDetailedReportTitle('present')).toBe('Work in Progress Detailed Report');
    });

    it('returns correct title for "future" perspective', () => {
        expect(getDetailedReportTitle('future')).toBe('Upcoming Work Detailed Report');
    });

    it('returns fallback title for invalid perspective', () => {
        expect(getDetailedReportTitle('invalid')).toBe('Detailed Report');
    });
});
