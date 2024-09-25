import { Browser, firefox } from 'playwright';

export async function ConfigBrowser(): Promise<Browser | undefined> {
  try {
    const browser = await firefox.launch({
      headless: false,
      devtools: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    return browser;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}










// const userAgents = [
//   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
// ];