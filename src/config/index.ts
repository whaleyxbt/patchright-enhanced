import * as path from 'path';
import * as fs from 'fs';
import type { AppConfig } from '../types/config.types';
import { getBrowserConfig } from './browser.config';
import { getProxyConfig } from './proxy.config';

export function getAppConfig(): AppConfig {
  const sessionsDir = process.env.SESSIONS_DIR 
    ? path.resolve(process.env.SESSIONS_DIR)
    : path.resolve(__dirname, '..', 'sessions');

  if (!fs.existsSync(sessionsDir)) {
    fs.mkdirSync(sessionsDir, { recursive: true });
  }

  return {
    browser: getBrowserConfig(),
    proxy: getProxyConfig(),
    maxParallel: parseInt(process.env.MAX_PARALLEL || '2', 10),
    sessionsDir,
  };
}
