import { test } from '@playwright/test';

// TODO: add spec.ts i.e strategy.spec.ts on the filename to be considered as playwright test.
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
    await page.goto('https://app.example.com/vmo');
    // await page.goto('https://app.example.com/value-stream-management/delivery-governance');
    // await page.goto('https://app.example.com/value-stream-management/delivery-governance?contextId=&currentDataAggregation=Weeks&dateAnalysisOption=all&delayedItemsSelection=inventory&departureDateLowerBoundary=2023-10-30&departureDateUpperBoundary=2023-12-01&lang=en-US&perspective=past&timezone=UTC');
    // await page.goto('https://app.example.com/value-stream-management/delivery-governance?contextId=68c35ab6-8472-4b2a-93b3-d367ad0b144e&currentDataAggregation=Weeks&dateAnalysisOption=all&delayedItemsSelection=inventory&departureDateLowerBoundary=2023-10-30&departureDateUpperBoundary=2023-12-01&lang=en-US&perspective=past&timezone=UTC'); 
    // await page.getByAltText('Loupe').click();
});

test.describe('Manage Metrics', () => {
    test('should have name', async ({ page }) => {
        page.setDefaultTimeout(1000000);
        page.setDefaultNavigationTimeout(1000000);
        test.setTimeout(1000000);

        await page.getByRole('tab', { name: 'Strategy BETA Strategy' }).click();

        await page.locator('div').filter({ hasText: /^Strategy Links$/ }).getByLabel('edit').click();
        await page.locator('div').filter({ hasText: /^Links for Strategy$/ }).getByRole('button').click();
        await page.getByText('Strategy Horizons').click();
        await page.getByRole('option', { name: 'June - October' }).click();
        await page.getByText('June - October').click();
        await page.getByRole('option', { name: 'Strategy Horizons 1' }).click();
        await page.getByRole('button', { name: 'Add Strategy' }).click();
        // await page.locator('div').filter({ hasText: /^Strategy Title0\/250$/ }).locator('div').nth(2).click();
        // await page.locator('.ql-editor').click();
        // await page.getByRole('button', { name: 'Save' }).click();
        // await page.getByText('Required0/250').click();

    });
});
