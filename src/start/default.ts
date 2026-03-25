import type { Page } from 'patchright';
import { randomDelay } from '../utils/delays';

export const startPageUrl = process.env.START_PAGE_URL;

export async function openStartPage(page: Page, url: string): Promise<void> {
  await randomDelay(1000, 2000);
  await page.goto(url, {
    waitUntil: 'domcontentloaded',
    timeout: 0,
  });
  await randomDelay(4000, 5000);
}
