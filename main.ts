import dotenv from 'dotenv';
dotenv.config();

import { getAppConfig } from './src/config/index';
import { SessionManager } from './src/session/session-manager';
import { getStartPageUrl } from './src/start/default';

async function main() {
  const config = getAppConfig();
  console.log('--- Starting session loop ---');

  const startPageUrl = getStartPageUrl();
  const sessionManager = new SessionManager(config, startPageUrl);
  const PARALLEL_COUNT = config.maxParallel;

  while (true) {
    console.log(`\n[${new Date().toLocaleTimeString()}] New round`);

    try {
      const results = await sessionManager.runParallelSessions(PARALLEL_COUNT);
      
      results.forEach((result) => {
        if (result.success) {
          console.log('Session completed successfully');
        } else {
          console.log('Session failed');
        }
      });
      
    } catch (error) {
      console.error('Error in runParallelSessions:', error);
    }

    const waitTime = Math.floor(Math.random() * 10000) + 10000;
    console.log(`Pause: ${waitTime / 1000}s...`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});
