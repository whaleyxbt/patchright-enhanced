import type { BrowserConfig } from '../types/config.types';

export function getBrowserConfig(): BrowserConfig {
  return {
    headless: false,
    executablePath: process.env.BROWSER_EXECUTABLE_PATH || '/usr/bin/google-chrome-stable',
//    locale: process.env.BROWSER_LOCALE || 'de-DE',
    timezoneId: process.env.BROWSER_TIMEZONE || 'Europe/Berlin',
  };
}
