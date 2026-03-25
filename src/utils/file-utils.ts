import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export function generateTempUserDataDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'ghostprobe_'));
}

// Must be called after context.close()
export function cleanupTempDir(tempDir: string): void {
  try {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
      console.log(`Temp dir removed: ${tempDir}`);
    }
  } catch (error) {
    console.error(`Failed to remove temp dir ${tempDir}:`, error);
  }
}

export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}
