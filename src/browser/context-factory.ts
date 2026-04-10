import { chromium } from 'patchright';
import type { BrowserContext, Page } from 'patchright';
import type { BrowserConfig, ProxyConfig } from '../types/config.types';
import { generateTempUserDataDir } from '../utils/file-utils';

export interface BrowserContextResult {
  context: BrowserContext;
  page: Page;
  tempDir: string;
}

// Creates a clean Patchright persistent context (no spoofing, no custom UA)
export async function createBrowserContext(
  browserConfig: BrowserConfig,
  proxyConfig: ProxyConfig
): Promise<BrowserContextResult> {
  const userDataDir = generateTempUserDataDir();

  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: 'chrome',
    headless: browserConfig.headless,
    executablePath: browserConfig.executablePath,
    // locale: browserConfig.locale, // nah, cloudlfare detects it
    timezoneId: browserConfig.timezoneId,
    viewport: null,

    proxy: {
      server: proxyConfig.server,
      username: proxyConfig.username,
      password: proxyConfig.password,
    },
  });

  const page = await context.newPage();

  return {
    context,
    page,
    tempDir: userDataDir,
  };
}
