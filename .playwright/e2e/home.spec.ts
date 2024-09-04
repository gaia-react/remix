import {expect, test} from '@playwright/test';
import languages from '~/languages';

test.use({locale: 'en'});
test('index page detect english, switch to japanese', async ({browser}) => {
  const context = await browser.newContext({
    extraHTTPHeaders: {
      'Accept-Language': 'en',
    },
  });
  await context.clearCookies();
  const page = await context.newPage();
  await page.goto('/');
  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle(languages.en.pages.index.meta.title);

  const localeSelect = page.locator('select', {hasText: 'English'});
  await expect(localeSelect).toBeVisible();

  await localeSelect.selectOption('ja');
  await expect(page).toHaveTitle(languages.ja.pages.index.meta.title);

  await context.close();
});

test.use({locale: 'ja'});
test('index page detect japanese, switch to english', async ({browser}) => {
  const context = await browser.newContext({
    extraHTTPHeaders: {
      'Accept-Language': 'ja',
    },
  });
  await context.clearCookies();
  const page = await context.newPage();
  await page.goto('/');
  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle(languages.ja.pages.index.meta.title);

  const localeSelect = page.locator('select', {hasText: '日本語'});
  await expect(localeSelect).toBeVisible();

  await localeSelect.selectOption('en');
  await expect(page).toHaveTitle(languages.en.pages.index.meta.title);

  await context.close();
});
