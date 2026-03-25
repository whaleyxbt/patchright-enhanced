import type { BrowserContext } from 'patchright';
import { cleanupTempDir } from '../utils/file-utils';

export class BrowserManager {
  private context: BrowserContext | null = null;
  private tempDir: string | null = null;

  setContext(context: BrowserContext, tempDir: string): void {
    this.context = context;
    this.tempDir = tempDir;
  }

  async close(): Promise<void> {
    if (this.context) {
      await this.context.close();
      this.context = null;
    }
  }

  // Must be called after close()
  cleanup(): void {
    if (this.tempDir) {
      cleanupTempDir(this.tempDir);
      this.tempDir = null;
    }
  }

  async closeAndCleanup(): Promise<void> {
    await this.close();
    this.cleanup();
  }

  getContext(): BrowserContext | null {
    return this.context;
  }
}
