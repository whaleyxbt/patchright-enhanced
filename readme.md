# GhostProbe

Stealth browser automation framework for penetration testing, scraping, and WAF bypass. Built on [Patchright](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-nodejs) — a patched fork of Playwright that avoids common automation detection vectors.

Zero fingerprint injection. Clean Chrome sessions that pass Cloudflare, Kasada, DataDome, and other WAFs out of the box.

## Features

- **Undetectable by design** - uses Patchright with `channel: "chrome"` and `viewport: null`, no custom User-Agent or fingerprint injection
- **Proxy rotation** - round-robin proxy support from `proxies.txt` (format: `host:port:user:pass`)
- **Parallel sessions** - configurable concurrent browser instances with isolated temp profiles
- **Human-like interaction utils** - mouse wiggle, smooth scroll, sequential typing, bulletproof click
- **Traffic blocker** - blocks heavy media, fonts, and ad network domains to save bandwidth
- **Clean session lifecycle** - temp profile per session, auto-cleanup on close

## Project Structure

```
ghostprobe/
├── main.ts                          # Entry point - session loop
├── src/
│   ├── browser/
│   │   ├── context-factory.ts       # Patchright context creation
│   │   └── browser-manager.ts       # Browser lifecycle management
│   ├── session/
│   │   ├── session-runner.ts        # Single session execution
│   │   └── session-manager.ts       # Parallel session orchestration
│   ├── config/
│   │   ├── index.ts                 # App config loader
│   │   ├── browser.config.ts        # Browser settings
│   │   └── proxy.config.ts          # Proxy loader & rotation
│   ├── start/
│   │   ├── default.ts               # Default start page opener
│   │   └── leadFormPentest.ts       # Example: ad click + lead form scenario
│   ├── universalpages/
│   │   └── uwhitepage.ts            # Example: whitepage CTA finder
│   ├── utils/
│   │   ├── human-utils.ts           # Mouse, scroll, click, type helpers
│   │   ├── traffic-blocker.ts       # Route-based resource blocker
│   │   ├── delays.ts                # Random delay helper
│   │   ├── file-utils.ts            # Temp dir management
│   │   └── math-utils.ts            # Random int/float helpers
│   ├── types/
│   │   ├── config.types.ts          # Config interfaces
│   │   └── session.types.ts         # Session interfaces & enums
│   └── leadFormConfig.ts            # Fake identity data (NL/DE/CZ)
├── proxies.txt                      # Your proxy list (gitignored)
├── .env                             # Your env config (gitignored)
└── .env.example                     # Env template
```

## Setup for Linux

```bash
# Install dependencies
npm install

# Install Chrome for Patchright
npx patchright install chrome

# Copy env template and configure
cp .env.example .env

# Add your proxies
# Format: host:port:username:password (one per line)
nano proxies.txt
```

## Configuration

All settings are in `.env`:

| Variable | Default | Description |
|---|---|---|
| `BROWSER_EXECUTABLE_PATH` | `/usr/bin/google-chrome-stable` | Path to Chrome binary |
| `BROWSER_LOCALE` | `de-DE` | Browser locale |
| `BROWSER_TIMEZONE` | `Europe/Berlin` | Browser timezone |
| `MAX_PARALLEL` | `1` | Number of parallel sessions |
| `START_PAGE_URL` | `https://google.com/` | Initial page to open |

## Usage

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

The framework opens a Chrome session with the configured proxy and navigates to `START_PAGE_URL`. The session stays open until you close the browser window manually.

## Writing Scenarios

Create your scenario in `src/start/` and import it in `session-runner.ts`. Use the built-in utils:

```typescript
import { humanMouseWiggle, smoothScroll, humanType, performBulletproofClick } from '../utils/human-utils';
import { randomDelay } from '../utils/delays';

export async function myScenario(page: Page): Promise<void> {
  await smoothScroll(page, 2000);
  await humanType(page, '#email', 'test@example.com');
  await randomDelay(1000, 2000);

  const button = page.locator('button[type="submit"]');
  await performBulletproofClick(page, button);
}
```

See `src/start/leadFormPentest.ts` for a full example.

## Use with AI Agents

GhostProbe works as a stealth browser backend for AI agents like [OpenClaw](https://github.com/openclaw/openclaw). Most agents use standard Playwright/Puppeteer under the hood, which gets instantly blocked by WAFs due to `Runtime.enable` leaks and automation flags.

GhostProbe solves this by providing a clean Patchright-powered `page` object that the agent can control without triggering any detection:

```typescript
import { createBrowserContext } from './src/browser/context-factory';

const { context, page } = await createBrowserContext(browserConfig, proxyConfig);

// Pass `page` to your AI agent — it works through a real Chrome session
// with proxy rotation and zero automation markers
await yourAgent.run(page);
```

The agent handles the logic, GhostProbe handles the stealth. I hope your openclaw gonna like it :)

## Anti-Detection

GhostProbe relies entirely on Patchright's built-in stealth patches:

- `Runtime.enable` leak patched (JS execution in isolated contexts)
- `--disable-blink-features=AutomationControlled` flag added
- `--enable-automation` flag removed
- `navigator.webdriver` returns `false` natively
- No fingerprint injection, no `addInitScript`, no `Object.defineProperty` overrides

Passes: Cloudflare, Kasada, DataDome, Akamai, Shape/F5, Fingerprint.com, CreepJS, BrowserScan, Sannysoft, Pixelscan.

## License

MIT
