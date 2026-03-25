import type { Page, Locator } from 'patchright';
import { randomDelay } from '../utils/delays';
import { forceSmoothScroll, performBulletproofClick } from '../utils/human-utils';

function isValidOfferLink(href: string): boolean {
  if (!href) return false;

  return !(
    href.includes('mgid.com') ||
    href.includes('doubleclick') ||
    href.includes('google-analytics')
  );
}

export async function findAndClickButton(page: Page): Promise<void> {
  await page.bringToFront();
  await page.waitForLoadState('domcontentloaded');

  // Scroll to trigger lazy-loaded blocks
  await forceSmoothScroll(page, 3000);

  // Primary CTA from arrow-text block
  const primaryCta = page
    .locator('.arrow-text a:has(.landing-url)')
    .first();

  if (await primaryCta.count()) {
    const href = (await primaryCta.getAttribute('href')) || '';
    if (isValidOfferLink(href)) {
      console.log(`Found CTA button: ${href}`);
      await performBulletproofClick(page, primaryCta);
      return;
    }
  }

  // Fallback: find best link by weight
  const links = await page.locator('a').all();
  let bestLink: Locator | null = null;
  let maxWeight = -1;

  for (const link of links) {
    const href = (await link.getAttribute('href')) || '';
    const text = (await link.innerText()).trim();
    const html = await link.innerHTML();

    if (!isValidOfferLink(href) || text.length < 3) continue; 

    let weight = 0;
    if (html.includes('landing-url')) weight += 100;
    if (text.length > 20) weight += 50;
    if (href.startsWith('//') || href.startsWith('http')) weight += 10;

    if (weight > maxWeight) {
      maxWeight = weight;
      bestLink = link;
    }
  }

  if (bestLink) {
    console.log(`Selected fallback link: ${await bestLink.getAttribute('href')}`);
    await performBulletproofClick(page, bestLink);
  } else {
    console.warn('No suitable link found on the page');
  }
}
