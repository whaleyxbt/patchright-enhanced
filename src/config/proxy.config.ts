import fs from 'fs';
import path from 'path';
import type { ProxyConfig } from '../types/config.types';

let proxies: ProxyConfig[] = [];
let currentProxyIndex = 0;

// Parses proxies.txt (format: host:port:username:password)
function loadProxiesFromFile(): ProxyConfig[] {
  try {
    const filePath = path.resolve(process.cwd(), 'proxies.txt');
    
    if (!fs.existsSync(filePath)) {
      console.error(`Proxy file not found: ${filePath}`);
      return [];
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    
    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.includes(':'))
      .map(line => {
        const parts = line.split(':');
        return {
          server: `http://${parts[0]}:${parts[1]}`,
          username: parts[2],
          password: parts[3],
        };
      });
  } catch (error) {
    console.error('Failed to read proxies.txt:', error);
    return [];
  }
}

// Load once on module init
proxies = loadProxiesFromFile();

// Returns the next proxy from the list (round-robin)
export function getProxyConfig(): ProxyConfig {
  if (proxies.length === 0) {
    return {
      server: 'http://your.proxy.com:port',
      username: 'default_user',
      password: 'default_password'
    };
  }

  const proxy = proxies[currentProxyIndex];
  currentProxyIndex = (currentProxyIndex + 1) % proxies.length;
  return proxy;
}
