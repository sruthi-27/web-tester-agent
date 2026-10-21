import { test, expect } from '@playwright/test';

test.describe('EPAM navigation', () => {
  test('navigates from Services to Client Work', async ({ page }) => {
    await page.goto('https://www.epam.com/');

    const cookieBanner = page.getByRole('dialog', { name: 'Privacy' });
    const acceptAll = cookieBanner.getByRole('button', { name: 'Accept All' });
    if (await acceptAll.isVisible().catch(() => false)) {
      await acceptAll.click();
    }

    await page.getByRole('button').first().click();
    await page.getByRole('link', { name: 'Services', exact: true }).first().click();
    await page.getByText('Explore Our Client Work', { exact: true }).click();

    await expect(page).toHaveURL(/\/services\/client-work$/);
    await expect(page.getByRole('heading', { name: 'Client Work' })).toBeVisible();
  });
});
