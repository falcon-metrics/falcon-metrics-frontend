import { test, expect } from '@playwright/test';

// TODO: add spec.ts i.e custom-views.spec.ts on the filename to be considered as playwright test.
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

test.describe('Manage Custom Views', () => {
    test('should have 1 custom view', async ({ page }) => {
        page.setDefaultTimeout(1000000);
        page.setDefaultNavigationTimeout(1000000);
        test.setTimeout(1000000);

        await page.getByLabel('settings').click();
        await page.getByRole('menuitem', { name: 'Manage Data Sources' }).click();
        await page.getByRole('row', { name: 'https://example.atlassian.net/rest/api/3 checkbox to enable datasource edit remove' }).getByLabel('edit').click();
        await page.getByText('Custom Views').click();

        const displayName0 = await page.getAttribute('input[name="dataset.0.fields.0.displayName"]', 'value');
        console.log(displayName0);
        expect(displayName0).not.toBeNull();

        // const flomatikaQuery0 = await page.getAttribute('textarea[name="dataset.0.fields.0.flomatikaQuery"]', 'value');
        // console.log(flomatikaQuery0);
        // expect(flomatikaQuery0).not.toBeNull();

        const sle0 = await page.getAttribute('input[name="dataset.0.fields.0.SLE"]', 'value');
        console.log(sle0);
        expect(sle0).not.toBeNull();
    });
});
