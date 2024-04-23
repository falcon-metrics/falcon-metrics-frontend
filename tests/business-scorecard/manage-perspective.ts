import { test, expect } from '@playwright/test';

// TODO: add spec.ts i.e manage-perspective.spec.ts on the filename to be considered as playwright test.
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
    // await page.getByAltText('Loupe').click();
    // await page.getByRole('tab', { name: 'Business Scorecard BETA Business Scorecard' }).click();
    // await page.locator('.MuiBox-root > .MuiButtonBase-root').first().click();
    // await page.getByRole('menuitem', { name: 'Manage Perspectives' }).click();
    // await page.locator('div').filter({ hasText: /^Perspectives$/ }).getByRole('button').click();
    // await page.locator('.MuiBox-root > .MuiButtonBase-root').first().click();
    // await page.getByRole('menuitem', { name: 'Manage Metrics' }).click();
    // await page.getByRole('button', { name: 'Add Metric' }).click();
});

test.describe('Manage Perspective', () => {
    test('should have name', async ({ page }) => {
        page.setDefaultTimeout(1000000);
        page.setDefaultNavigationTimeout(1000000);
        test.setTimeout(1000000);

        await page.getByRole('tab', { name: 'Business Scorecard BETA Business Scorecard' }).click();

        await page.locator('.MuiBox-root > .MuiButtonBase-root').first().click();
        await page.getByRole('menuitem', { name: 'Manage Perspectives' }).click();
        await page.getByRole('button', { name: 'Add perspective' }).click();

        await page.getByLabel('Perspective name').fill('playwright test metric 1');

        const value = await page.getAttribute('input[id="perspective-name"]', 'value');

        console.log(value);
        expect(value).not.toBeNull();
        expect(value).not.toEqual('');

    });
});
