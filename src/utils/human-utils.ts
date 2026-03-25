import { Page, FrameLocator, Locator } from 'patchright';
import { getRandomFloat, getRandomInt } from './math-utils';
import { randomDelay } from './delays';

export async function smartTouchScroll(page: Page) {
  const viewport = page.viewportSize();
  if (!viewport) return;

  const x = viewport.width / 2;
  const startY = viewport.height * getRandomFloat(0.7, 0.85);
  const endY = viewport.height * getRandomFloat(0.1, 0.3);
  const steps = getRandomInt(5, 15);

  await page.mouse.move(x + getRandomInt(-10, 10), startY);
  await page.mouse.down();

  for (let i = 1; i <= steps; i++) {
    const progress = i / steps;
    const currentX = x + Math.sin(i * 0.5) * 2; 
    const currentY = startY - (startY - endY) * progress;

    await page.mouse.move(currentX, currentY, { steps: 1 });
    await page.waitForTimeout(getRandomInt(10, 25));
  }

  await page.mouse.up();
}

export async function humanMouseWiggle(page: Page, x: number, y: number) {
  for (let i = 0; i < 4; i++) {
    const offsetX = (Math.random() * 20) - 10;
    const offsetY = (Math.random() * 20) - 10;
    await page.mouse.move(x + offsetX, y + offsetY, { steps: 5 });
    await randomDelay(100, 300);
  }
}

export async function smoothScroll(page: Page, totalPixels: number) {
  let scrolled = 0;
  while (scrolled < totalPixels) {
    const scrollStep = Math.floor(Math.random() * 300) + 200;
    await page.mouse.wheel(0, scrollStep);
    scrolled += scrollStep;
    await new Promise(r => setTimeout(r, Math.random() * 600 + 400));
  }
}

export async function forceSmoothScroll(page: Page, distance: number) {
  await page.evaluate(`
    (async (dist) => {
      const getScrollTarget = () => {
        const root = document.scrollingElement || document.documentElement;
        if (root.scrollHeight > window.innerHeight) return root;
        return document.body;
      };

      const target = getScrollTarget();
      let current = 0;
      while (current < dist) {
        const step = Math.floor(Math.random() * 200) + 100;
        window.scrollBy(0, step);
        if (target) target.scrollTop += step;
        current += step;
        await new Promise(r => setTimeout(r, Math.floor(Math.random() * 200) + 100));
      }
    })(${distance})
  `);
}

export async function performBulletproofClick(page: Page, locator: Locator) {
  try {
    await locator.evaluate((el: any) => el.scrollIntoView({ block: 'center' }));
    await randomDelay(1000, 2000);

    const box = await locator.boundingBox();
    if (box) {
      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;

      await page.mouse.move(cx, cy, { steps: 10 });
      await humanMouseWiggle(page, cx, cy);

      const pagePromise = page.context().waitForEvent('page', { timeout: 10000 }).catch(() => null);
      await locator.click({ force: true }); 

      const newPage = await pagePromise;
      if (newPage) console.log('Target page opened');
    }
  } catch (e: any) {
    console.error('Click failed:', e.message);
  }
}

export async function humanType(
  page: Page | FrameLocator, 
  selector: string, 
  text: string
) {
  const element = page.locator(selector);
  await element.click({ delay: Math.random() * 200 + 100 });
  await element.pressSequentially(text, { 
    delay: Math.random() * 150 + 50 
  });
}
