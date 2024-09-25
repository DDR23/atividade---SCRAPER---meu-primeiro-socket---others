import { Browser, Page } from "playwright";
import { Login } from "./Login";
import { GetRandomNumber } from "./utils/GetRandomNumber";
import { Store } from "./utils/Store";

interface LoginResult {
  page: Page;
  browser: Browser;
  myBet: Page;
}

export async function MakeLogin(store: Store): Promise<LoginResult> {
  console.log('iniciando makelogin'); // TODO - possivel socket.emit
  console.log('socket.emit("bot__info",'); // TODO - possivel socket.emit
  try {
    const browser = store.data.browser;
    const { CONFIG_USER, CONFIG_PASSWORD } = store.data.config;
    const context = await browser.newContext({
      userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      args: ["--start-maximized"],
      viewport: {
        width: 1920,
        height: 1080,
      },
    });
    const page = await context.newPage();
    
    console.log('criou o context'); // TODO - possivel socket.emit
    // await page.setViewportSize({ width: 1800, height: 900 }); // desktop
    await page.setViewportSize({ width: 430, height: 932 }); // mobile
    await page.goto('https://www.bet365.com/');
    await page.waitForURL('https://www.bet365.com/#/HO/');
    await page.waitForLoadState('networkidle');

    await page.waitForTimeout(GetRandomNumber(1000, 2000));
    const introPopup = page.locator('.iip-IntroductoryPopup_Cross');
    if (await introPopup.isVisible()) await introPopup.click();

    await page.waitForTimeout(GetRandomNumber(1000, 2000));
    const cookiesButton = page.locator('.ccm-CookieConsentPopup_Accept');
    if (await cookiesButton.isVisible()) await cookiesButton.click();

    await page.waitForTimeout(GetRandomNumber(4000, 8000));
    await Login(page, CONFIG_USER, CONFIG_PASSWORD);
    console.log('efetuou o login corretamente'); // TODO - possivel socket.emit

    await page.waitForTimeout(GetRandomNumber(4000, 8000));
    await page.locator('.hm-MainHeaderTabRow_InPlayLabel').click();

    await page.waitForTimeout(GetRandomNumber(4000, 8000));
    await page.locator('.ovm-ClassificationBarButton.ovm-ClassificationBarButton-92').click();

    await page.waitForTimeout(GetRandomNumber(3000, 5000));
    const buttonClosePopUp = page.locator(".iip-IntroductoryPopup_Cross");
    if (await buttonClosePopUp.isVisible()) await buttonClosePopUp.click();
    await page.waitForTimeout(GetRandomNumber(5000, 8000));
    await page.reload();

    const myBet = await context.newPage();
    await myBet.goto("https://www.bet365.com/#/MB/");
    await myBet.waitForTimeout(GetRandomNumber(5000, 8000));
    await myBet.click('[data-content="Todos"]');

    return { page, browser, myBet };
  } catch (error) {
    throw new Error('A página não foi inicializada: ' + (error as Error).message);
  }
}
