import { test, expect } from '@playwright/test';

// TODO: add spec.ts i.e datasources.spec.ts on the filename to be considered as playwright test.
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

test.describe('Manage Data Source', () => {
    test('should validate datasource fields', async ({ page }) => {
        page.setDefaultTimeout(1000000);
        page.setDefaultNavigationTimeout(1000000);
        test.setTimeout(1000000);

        await page.getByLabel('settings').click();
        await page.getByRole('menuitem', { name: 'Manage Data Sources' }).click();
        await page.getByRole('button', { name: 'Connect a New Datasource' }).click();
        await page.locator('div').filter({ hasText: 'Jira Cloud' }).nth(3).click();

        await page.fill('input[name="namespace"]', 'YourNamespace');
        await page.fill('input[name="username"]', 'YourUsername');
        await page.fill('input[name="password"]', 'YourPassword');

        // Click the submit or save button
        await page.click('button[type="submit"]');

        // Assertion to check if the fields are filled
        const namespaceValue = await page.getAttribute('input[name="namespace"]', 'value');
        const usernameValue = await page.getAttribute('input[name="username"]', 'value');
        const passwordValue = await page.getAttribute('input[name="password"]', 'value');

        // Validate if fields are not empty
        expect(namespaceValue).not.toEqual('');
        expect(usernameValue).not.toEqual('');
        expect(passwordValue).not.toEqual('');
    });
});
