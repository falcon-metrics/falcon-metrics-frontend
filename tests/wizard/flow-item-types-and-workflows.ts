import { test, expect } from '@playwright/test';

// TODO: add spec.ts i.e flow-item-types-and-workflows.spec.ts on the filename to be considered as playwright test.
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
});

test.describe('Manage Workflows', () => {
    test('should have key workflow events', async ({ page }) => {
        page.setDefaultTimeout(1000000);
        page.setDefaultNavigationTimeout(1000000);
        test.setTimeout(1000000);

        await page.getByLabel('settings').click();
        await page.getByRole('menuitem', { name: 'Manage Data Sources' }).click();
        await page.getByRole('row', { name: 'https://example.atlassian.net/rest/api/3 checkbox to enable datasource edit remove' }).getByLabel('edit').click();
        await page.getByText('Work Item Types').click();

        // Accordion should be expanded to record arrival, commitment and departure points
        // Not ideal due to name being the actual inner text
        await page.getByRole('row', { name: '10004 Falcon Metrics Bug Bug Team day(s)' }).locator('svg').nth(4).click();

        const arrivalPoint = await page.$('#mui-component-select-arrivalId');
        const arrivalPointId = await arrivalPoint?.innerText();

        expect(arrivalPointId).not.toBeNull();
        expect(arrivalPointId).not.toEqual('');

        const commitmentPoint = await page.$('#mui-component-select-commitmentId');
        const commitmentPointId = await commitmentPoint?.innerText();

        expect(commitmentPointId).not.toBeNull();
        expect(commitmentPointId).not.toEqual('');

        const departurePoint = await page.$('#mui-component-select-departureId');
        const departurePointId = await departurePoint?.innerText();

        expect(departurePointId).not.toBeNull();
        expect(departurePointId).not.toEqual('');
    });
});
