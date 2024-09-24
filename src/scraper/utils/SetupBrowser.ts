import { firefox, Browser, BrowserContext } from 'playwright';

let browser: Browser | null = null;
let context: BrowserContext | null = null;

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
];

function getRandomUserAgent(): string {
  const randomIndex = Math.floor(Math.random() * userAgents.length);
  return userAgents[randomIndex];
}

export async function OpenBrowser(): Promise<void> {
  if (!browser) {
    browser = await firefox.launch({
      headless: false,
      devtools: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    context = await browser.newContext({ userAgent: getRandomUserAgent() });
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
