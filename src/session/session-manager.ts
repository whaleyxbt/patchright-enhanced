import type { AppConfig } from '../types/config.types';
import type { SessionResult, SessionInfo } from '../types/session.types';
import { SessionState } from '../types/session.types';
import { SessionRunner } from './session-runner';
import { getProxyConfig } from '../config/proxy.config';

export class SessionManager {
  private config: AppConfig;
  private sessions: Map<string, SessionInfo> = new Map();
  private startPageUrl: string;

  constructor(config: AppConfig, startPageUrl: string) {
    this.config = config;
    this.startPageUrl = startPageUrl;
  }

  // Runs a single session with a rotated proxy
  async runSession(): Promise<SessionResult> {
    const sessionId = `${Date.now()}`;
    const sessionInfo: SessionInfo = {
      id: sessionId,
      state: SessionState.PENDING,
    };

    this.sessions.set(sessionId, sessionInfo);

    try {
      sessionInfo.state = SessionState.RUNNING;
      sessionInfo.startTime = new Date();

      const proxyConfig = getProxyConfig();
      const runner = new SessionRunner(
        this.config.browser,
        proxyConfig,
        this.startPageUrl
      );

      const result = await runner.run();

      sessionInfo.state = result.success ? SessionState.COMPLETED : SessionState.FAILED;
      sessionInfo.endTime = new Date();
      if (result.error) {
        sessionInfo.error = result.error;
      }

      return result;
    } catch (error) {
      sessionInfo.state = SessionState.FAILED;
      sessionInfo.endTime = new Date();
      sessionInfo.error = error instanceof Error ? error : new Error(String(error));
      
      return {
        success: false,
        error: sessionInfo.error,
      };
    }
  }

  // Runs multiple sessions in parallel
  async runParallelSessions(count: number): Promise<SessionResult[]> {
    const promises: Promise<SessionResult>[] = [];

    for (let i = 0; i < count; i++) {
      promises.push(this.runSession());
    }

    return Promise.all(promises);
  }

  getSessionsInfo(): SessionInfo[] {
    return Array.from(this.sessions.values());
  }
}
