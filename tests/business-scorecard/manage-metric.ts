import { test, expect } from '@playwright/test';

// TODO: add spec.ts i.e manage-metric.spec.ts on the filename to be considered as playwright test.
// It was temporarily removed due to jest complaining in the pipeline

test.beforeEach(async ({ page }) => {
    await page.goto('https://app.example.com/');
    await page.goto('https://example.auth0.com/u/login/identifier?state=your_token');
    await page.getByLabel('Email address').click();
    await page.getByLabel('Email address').fill('your_email@example.com');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.goto('https://app.example.com/value-stream-management');
    await page.goto('https://app.example.com/value-stream-management/delivery-governance');
    await page.goto('https://app.example.com/value-stream-management/delivery-governance?contextId=&currentDataAggregation=Weeks&dateAnalysisOption=all&delayedItemsSelection=inventory&departureDateLowerBoundary=2023-10-30&departureDateUpperBoundary=2023-12-01&lang=en-US&perspective=past&timezone=UTC');
    await page.goto('https://app.example.com/value-stream-management/delivery-governance?contextId=68c35ab6-8472-4b2a-93b3-d367ad0b144e&currentDataAggregation=Weeks&dateAnalysisOption=all&delayedItemsSelection=inventory&departureDateLowerBoundary=2023-10-30&departureDateUpperBoundary=2023-12-01&lang=en-US&perspective=past&timezone=UTC');
    await page.getByAltText('Loupe').click();
});

test.describe('Manage Metrics', () => {
    test('should have name', async ({ page }) => {
        page.setDefaultTimeout(1000000);
        page.setDefaultNavigationTimeout(1000000);
        test.setTimeout(1000000);

        await page.getByRole('tab', { name: 'Business Scorecard BETA Business Scorecard' }).click();

        await page.locator('.MuiBox-root > .MuiButtonBase-root').first().click();
        await page.getByRole('menuitem', { name: 'Manage Metrics' }).click();
        await page.getByRole('button', { name: 'Add Metric' }).click();

        await page.getByLabel('Metric Name').fill('playwright test metric 1');
        await page.getByLabel('Metric Unit').fill('cm');
        await page.getByLabel('Initial Value').fill('1');


        const metricName = await page.getAttribute('input[id="metric-name"]', 'value');
        const metricUnit = await page.getAttribute('input[id="metric-unit"]', 'value');
        await page.getByRole('button', { name: 'SAVE' }).click();

        expect(metricName).not.toBeNull();
        expect(metricName).not.toEqual('');

        expect(metricUnit).not.toBeNull();
        expect(metricUnit).not.toEqual('');

    });
});
