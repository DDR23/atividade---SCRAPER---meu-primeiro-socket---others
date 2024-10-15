import { Page } from "playwright";
import { GetRandomNumber } from "./GetRandomNumber";
import { Store } from "../models/ModelBot";
import { Login } from "./Login";

interface Props {
  page: Page;
  myBet: Page;
}

export async function MakeLogin(executionId: string): Promise<Props> {
  try {
    const data = Store.data;
    const { browser, config } = data[executionId];

    if (!config) throw new Error('Configuração não encontrada');
    const { CONFIG_USER, CONFIG_PASSWORD } = config;

    const context = await browser?.newContext({
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      viewport: {
        width: 1920,
        height: 1080,
      },
    });

    const page = await context?.newPage();
    if (!page) throw new Error('Não foi possível criar uma nova página.');

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

    await page.waitForTimeout(GetRandomNumber(4000, 8000));
    await page.reload();

    const myBet = await context?.newPage();
    if (!myBet) throw new Error('Não foi possível criar uma nova página.');

    await myBet.waitForTimeout(GetRandomNumber(4000, 8000));
    await myBet.goto('https://www.bet365.com/#/MB/');
    await myBet.waitForTimeout(GetRandomNumber(4000, 8000));

    await myBet.waitForTimeout(GetRandomNumber(4000, 8000));
    await myBet.locator('[data-content="Todos"]').click();

    return { page, myBet };
  } catch (error) {
    throw new Error('A página não foi inicializada: ' + (error as Error).message);
  }
}
