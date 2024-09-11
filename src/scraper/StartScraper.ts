import { TypeConfig } from "../types/TypeConfig";
import { Login } from "./Login";
import { GetContext } from "./SetupBrowser";
import { GetRandomNumber } from "./utils/GetRandomNumber";

export async function StartScraper(config: TypeConfig): Promise<void> {
  try {
    const { CONFIG_USER, CONFIG_PASSWORD } = config;
    const context = GetContext();
    const page = await context.newPage();
    await page.setViewportSize({ width: 1900, height: 900 });

    await page.goto('https://www.bet365.com/');
    await page.waitForTimeout(GetRandomNumber(5000, 8000));

    // await page.waitForTimeout(GetRandomNumber(1000, 2000));
    // const cookiesButton = page.locator('text="Aceitar todos"');
    // if (await cookiesButton.isVisible()) await cookiesButton.click();

    // await page.waitForTimeout(GetRandomNumber(5000, 8000))
    await Login(page, CONFIG_USER, CONFIG_PASSWORD);
    // await page.waitForTimeout(GetRandomNumber(500, 800))

    await page.waitForTimeout(GetRandomNumber(5000, 8000));
    const popUpAviso = await page.$(".pm-MessageOverlayCloseButton");
    await popUpAviso?.click();

    await page.waitForTimeout(GetRandomNumber(5000, 8000));
    const acceptCookiesButton = await page.$(".ccm-CookieConsentPopup_Accept");
    await acceptCookiesButton?.click();

    await page.waitForTimeout(GetRandomNumber(1000, 2000));
    await page.click(
      '.hm-MainHeaderTabRow_InPlayLabel:has-text("Ao-Vivo")'
    );
    await page.waitForTimeout(GetRandomNumber(3000, 5000));
    await page.click('.ovm-ClassificationBarButton_Text:has-text("Futebol")');
    await page.waitForTimeout(GetRandomNumber(3000, 5000));

    // await page.waitForTimeout(GetRandomNumber(1000, 2000));
    // const OfferPasscodeDialog = page.locator('.pcm-OfferPasscodeDialog_NotNowButton');
    // if (await OfferPasscodeDialog.isVisible()) await cookiesButton.click({ delay: 300 });

    // await page.waitForTimeout(GetRandomNumber(3000, 5000));
    // const aoVivoBtn = page.locator('.hm-MainHeaderTabRow_InPlayLabel');
    // if (await aoVivoBtn.isVisible()) await aoVivoBtn.click({ delay: 300 });
    // await page.waitForTimeout(GetRandomNumber(500, 800));


    // await page.waitForURL('https://www.bet365.com/#/IP/B92')
    // await page.waitForTimeout(GetRandomNumber(3000, 5000));
    // await page.waitForTimeout(GetRandomNumber(1000, 2000));
    // await page.locator('.hm-MainHeaderTabRow_InPlayWrapper.hm-HeaderMenuItem').click();
    // await page.waitForTimeout(GetRandomNumber(500, 800));

    // await page.waitForURL('https://www.bet365.com/#/IP/FAV')

    // await page.waitForTimeout(GetRandomNumber(5000, 8000));
    // await page.locator('.ovm-ClassificationBarButton.ovm-ClassificationBarButton-92').click();
    // await page.waitForTimeout(GetRandomNumber(500, 800));

    // await page.waitForURL('https://www.bet365.com/#/IP/B92')

    // await page.pause();

  } catch (error) {
    throw new Error('A página não foi inicializada: ' + (error as Error).message);
  }
}
