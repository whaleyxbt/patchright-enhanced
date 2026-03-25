import type { BrowserContext } from 'patchright';

export interface SessionResult {
  success: boolean;
  context?: BrowserContext;
  tempDir?: string;
  error?: Error;
}

export enum SessionState {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface SessionInfo {
  id: string;
  state: SessionState;
  startTime?: Date;
  endTime?: Date;
  error?: Error;
}
