import {expect, test} from '@playwright/test';
import {resetTestData} from 'test/mocks/database';
import languages from '~/languages';
import {hydration} from '../utils';

test.describe('Things CRUD', () => {
  test.use({locale: 'en'});

  test.afterEach(() => {
    resetTestData();
  });

  test('things can be created, updated, and deleted', async ({page}) => {
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en',
    });
    await page.context().clearCookies();

    await page.goto('/things');
    await hydration(page);

    await expect(page).toHaveURL('/things');
    await expect(page).toHaveTitle(languages.en.pages.things.meta.title);
    await expect(page.getByTitle(/Thing/)).toHaveCount(2);

    // Create a thing
    await page.getByRole('link', {name: 'Create'}).click();
    await expect(page).toHaveURL('/things/create');
    await page.getByRole('textbox', {name: 'Name'}).fill('Thing C');
    await page
      .getByRole('textbox', {name: 'Description'})
      .fill('This is the third thing');
    await page.getByRole('button', {name: 'Create'}).click();
    await expect(page).toHaveURL('/things');
    const things = page.getByTitle(/Thing/);
    await expect(things).toHaveCount(3);

    // Edit the created thing
    await page.getByRole('link', {name: 'Edit'}).last().click();
    await expect(page).toHaveTitle('Thing C');
    await page.getByRole('textbox', {name: 'Name'}).fill('Thing C2');
    await page.getByRole('button', {name: 'Save'}).click();
    await expect(page).toHaveURL('/things');
    await expect(page.getByTitle(/Thing/).last()).toContainText('Thing C2');

    // Delete the created thing
    await page.getByRole('button', {name: 'Delete'}).last().click();
    await expect(page.getByTitle(/Thing/)).toHaveCount(2);
  });
});
