import { Page } from "playwright";
import { TypeConfig } from "../types/TypeConfig";
import { Login } from "./Login";
import { GetContext } from "./SetupBrowser";
import { GetRandomNumber } from "./utils/GetRandomNumber";

export async function StartScraper(config: TypeConfig): Promise<Page> {
  try {
    const { CONFIG_USER, CONFIG_PASSWORD } = config;
    const context = GetContext();
    const page = await context.newPage();

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

    await page.waitForTimeout(GetRandomNumber(4000, 8000));
    await page.locator('.hm-MainHeaderTabRow_InPlayLabel').click();

    await page.waitForTimeout(GetRandomNumber(4000, 8000));
    await page.locator('.ovm-ClassificationBarButton.ovm-ClassificationBarButton-92').click();

    return page;
  } catch (error) {
    throw new Error('A página não foi inicializada: ' + (error as Error).message);
  }
}
