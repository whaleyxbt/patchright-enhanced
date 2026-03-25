import type { BrowserConfig, ProxyConfig } from '../types/config.types';
import type { SessionResult } from '../types/session.types';
import { createBrowserContext } from '../browser/context-factory';
import { BrowserManager } from '../browser/browser-manager';
import { enableTrafficBlocking } from '../utils/traffic-blocker';
import { openStartPage } from '../start/default';

export class SessionRunner {
  private browserManager: BrowserManager;
  private browserConfig: BrowserConfig;
  private proxyConfig: ProxyConfig;
  private startPageUrl: string;

  constructor(
    browserConfig: BrowserConfig,
    proxyConfig: ProxyConfig,
    startPageUrl: string
  ) {
    this.browserManager = new BrowserManager();
    this.browserConfig = browserConfig;
    this.proxyConfig = proxyConfig;
    this.startPageUrl = startPageUrl;
  }

  async run(): Promise<SessionResult> {
    try {
      const { context, page, tempDir } = await createBrowserContext(
        this.browserConfig,
        this.proxyConfig
      );

      // Blocks heavy media content (70%+ of traffic). Uncomment if needed.
      // await enableTrafficBlocking(context);

      this.browserManager.setContext(context, tempDir);

      await openStartPage(page, this.startPageUrl);

      // Wait until the user closes the browser manually
      await new Promise<void>(resolve => (context as any).once('close', resolve));

      return {
        success: true,
        context,
        tempDir,
      };
    } catch (error) {
      console.error('Session error:', error);
      return {
        success: false,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    } finally {
      await this.browserManager.closeAndCleanup();
    }
  }
}
