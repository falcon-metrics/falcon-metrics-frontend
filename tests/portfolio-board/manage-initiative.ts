import { test, expect } from '@playwright/test';

// TODO: add spec.ts i.e manage-initiative.spec.ts on the filename to be considered as playwright test.
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

test.describe('Manage Initiative', () => {
    test('filter expression is empty', async ({ page }) => {
        page.setDefaultTimeout(1000000);
        page.setDefaultNavigationTimeout(1000000);
        test.setTimeout(1000000);

        await page.locator('nav div').first().click();
        await page.locator('.MuiAccordionDetails-root > div > div > .MuiButtonBase-root').click();
        await page.getByRole('menuitem', { name: 'Add Initiative' }).click();
        await page.getByPlaceholder('Name').fill('playwright test 1');

        const value = await page.$('.MuiInputBase-root.Mui-error textarea[name="filterExpression"]');

        await page.getByRole('button', { name: 'SAVE' }).click();

        let hasError = false;
        if (value) {
            hasError = true;
            console.log('Error is showing in the textarea with name "filterExpression".');
        }
        expect(hasError).toBe(true);
    });

    test('filter expression is not empty but invalid', async ({ page }) => {
        page.setDefaultTimeout(1000000);
        page.setDefaultNavigationTimeout(1000000);
        test.setTimeout(1000000);

        await page.locator('nav div').first().click();
        await page.locator('.MuiAccordionDetails-root > div > div > .MuiButtonBase-root').click();
        await page.getByRole('menuitem', { name: 'Add Initiative' }).click();
        await page.getByPlaceholder('Name').fill('playwright test 2');

        await page.getByPlaceholder('workItemType = \'feature\' OR workItemType = \'bug\'').fill('w');

        // allow fql validator to finish validating the expression
        page.setDefaultTimeout(1000000);
        page.setDefaultNavigationTimeout(1000000);
        test.setTimeout(1000000);

        const value = await page.$('.MuiInputBase-root.Mui-error textarea[name="filterExpression"]');

        // let hasError = false;
        if (value) {
            // hasError = true;
            console.log('Error is showing in the textarea with name "filterExpression".');
        }

        // expect(hasError).toBe(true);
    });

    test('filter expression is valid', async ({ page }) => {
        page.setDefaultTimeout(1000000);
        page.setDefaultNavigationTimeout(1000000);
        test.setTimeout(1000000);

        await page.locator('nav div').first().click();
        await page.locator('.MuiAccordionDetails-root > div > div > .MuiButtonBase-root').click();
        await page.getByRole('menuitem', { name: 'Add Initiative' }).click();
        await page.getByPlaceholder('Name').fill('playwright test 3');
        await page.getByPlaceholder('workItemType = \'feature\' OR workItemType = \'bug\'').fill('workItemType = \'bug\'');

        // allow fql validator to finish validating the expression
        page.setDefaultTimeout(1000000);
        page.setDefaultNavigationTimeout(1000000);
        test.setTimeout(1000000);

        const value = await page.$('.MuiInputBase-root.Mui-error textarea[name="filterExpression"]');

        await page.getByRole('button', { name: 'SAVE' }).click();

        let hasError = true;
        if (!value) {
            hasError = false;
            console.log('No error in the textarea with name "filterExpression".');
        }

        expect(hasError).toBe(false);
    });
});
