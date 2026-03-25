import type { BrowserContext } from 'patchright';

// Blocks heavy media content if needed (70%+ of traffic)
const BLOCKED_EXTENSIONS = [
  '.mp4', '.webm', '.avi', '.mov', '.mkv',
  '.mp3', '.ogg', '.wav', '.aac',
  '.woff', '.woff2', '.ttf', '.eot',
];

const BLOCKED_DOMAINS = [
  'youtube.com',
  'youtu.be', 
  'vimeo.com',
  'jwplatform.com',
  'dailymotion.com',
  'outbrain.com',
  'taboola.com',
  'adnxs.com',
  'criteo.com',
  'adfox.ru',
  'disqus.com',
  'addthis.com',
];

export async function enableTrafficBlocking(context: BrowserContext): Promise<void> {
  await context.route('**/*', async (route) => {
    const request = route.request();
    const url = request.url();
    const resourceType = request.resourceType();

    if (resourceType === 'media') {
      await route.abort();
      return;
    }

    if (resourceType === 'font') {
      await route.abort();
      return;
    }

    const urlClean = url.split('?')[0].toLowerCase();
    if (BLOCKED_EXTENSIONS.some(ext => urlClean.endsWith(ext))) {
      await route.abort();
      return;
    }

    if (BLOCKED_DOMAINS.some(domain => url.includes(domain))) {
      await route.abort();
      return;
    }

    await route.continue();
  });
}
