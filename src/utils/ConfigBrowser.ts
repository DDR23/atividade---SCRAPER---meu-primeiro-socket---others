import { firefox } from 'playwright';

export async function configBrowser() {
  try {
    const browser = await firefox.launch({
      headless: false,
      devtools: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    return browser;
  } catch (error) {
    console.log(error);
  }
}
