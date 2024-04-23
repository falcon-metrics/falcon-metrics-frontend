import { test, expect } from '@playwright/test';

// TODO: add spec.ts i.e manage-column.spec.ts on the filename to be considered as playwright test.
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
});

test.describe('Manage Column', () => {
    test('should have column name', async ({ page }) => {
        page.setDefaultTimeout(1000000);
        page.setDefaultNavigationTimeout(1000000);
        test.setTimeout(1000000);

        await page.locator('nav div').first().click();
        await page.locator('.MuiAccordionDetails-root > div > div > .MuiButtonBase-root').click();
        await page.getByRole('menuitem', { name: 'Add Column' }).click();
        await page.getByPlaceholder('Name').fill('playwright test column');

        const value = await page.getAttribute('input[name="columnName"]', 'value');
        console.log(value);
        expect(value).not.toBeNull();
        expect(value).not.toEqual('');
    });
});
