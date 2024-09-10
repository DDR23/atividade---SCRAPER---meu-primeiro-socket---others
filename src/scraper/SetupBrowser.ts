import { firefox, Browser, BrowserContext } from 'playwright-firefox';

let browser: Browser | null = null;
let context: BrowserContext | null = null;

const userAgents = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.361675787110',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5412.99 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5361.172 Safari/537.36',
  'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5388.177 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5397.215 Safari/537.36'
];

const proxies = [
  { server: '35.185.196.38:3128' },
];

function getRandomUserAgent(): string {
  const randomIndex = Math.floor(Math.random() * userAgents.length);
  return userAgents[randomIndex];
}

function getRandomProxy() {
  const randomIndex = Math.floor(Math.random() * proxies.length);
  return proxies[randomIndex];
}

export async function OpenBrowser(): Promise<void> {
  if (!browser) {
    const randomProxy = getRandomProxy();
    browser = await firefox.launch({
      headless: false,
      proxy: randomProxy,
    });
    context = await browser.newContext({
      userAgent: getRandomUserAgent(),
    });
  }
}

export function GetContext(): BrowserContext {
  if (!context) {
    throw new Error('O contexto não foi inicializado. Certifique-se de chamar OpenBrowser primeiro.');
  }
  return context;
}

export async function CloseBrowser(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = null;
    context = null;
  }
}
