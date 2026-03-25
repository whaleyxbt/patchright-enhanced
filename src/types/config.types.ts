export interface BrowserConfig {
  headless: boolean;
  executablePath: string;
  locale: string;
  timezoneId: string;
}

export interface ProxyConfig {
  server: string;
  username: string;
  password: string;
}

export interface AppConfig {
  browser: BrowserConfig;
  proxy: ProxyConfig;
  maxParallel: number;
  sessionsDir: string;
}
