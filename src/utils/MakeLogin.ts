// import { Page } from "playwright";
// import { TypeConfig } from "../types/TypeConfig";
// import { GetContext } from "./ConfigBrowser";
// import { GetRandomNumber } from "./GetRandomNumber";

// export async function StartScraper(config: TypeConfig): Promise<Page> {
//   try {
//     const { CONFIG_USER, CONFIG_PASSWORD } = config;
//     const context = await GetContext();
//     const page = await context.newPage();

//     // await page.setViewportSize({ width: 1800, height: 900 }); // desktop
//     await page.setViewportSize({ width: 430, height: 932 }); // mobile
//     await page.goto('https://www.bet365.com/');
//     await page.waitForURL('https://www.bet365.com/#/HO/');
//     await page.waitForLoadState('networkidle');

//     await page.waitForTimeout(GetRandomNumber(1000, 2000));
//     const introPopup = page.locator('.iip-IntroductoryPopup_Cross');
//     if (await introPopup.isVisible()) await introPopup.click();

//     await page.waitForTimeout(GetRandomNumber(1000, 2000));
//     const cookiesButton = page.locator('.ccm-CookieConsentPopup_Accept');
//     if (await cookiesButton.isVisible()) await cookiesButton.click();

//     await page.waitForTimeout(GetRandomNumber(4000, 8000));
//     await Login(page, CONFIG_USER, CONFIG_PASSWORD);

//     await page.waitForTimeout(GetRandomNumber(4000, 8000));
//     await page.locator('.hm-MainHeaderTabRow_InPlayLabel').click();

//     await page.waitForTimeout(GetRandomNumber(4000, 8000));
//     await page.locator('.ovm-ClassificationBarButton.ovm-ClassificationBarButton-92').click();

//     return page;
//   } catch (error) {
//     throw new Error('A página não foi inicializada: ' + (error as Error).message);
//   }
// }

// async function Login(page: Page, usuario: string, senha: string): Promise<void> {
//   try {
//     // await page.locator('.hm-MainHeaderRHSLoggedOutWide_Login').click({ delay: 400 });
//     await page.locator('.hm-MainHeaderRHSLoggedOutNarrow_Login').click({ delay: 400 }); // mobile
//     await page.waitForTimeout(GetRandomNumber(4000,7000));
//     await page.fill('.lms-StandardLogin_Username', usuario);
//     await page.waitForTimeout(GetRandomNumber(500, 2000));
//     await page.fill('.lms-StandardLogin_Password', senha);
//     await page.waitForTimeout(GetRandomNumber(500, 2000));
//     await page.locator('.lms-LoginButton').click({ delay: 400 });
//     await page.waitForTimeout(GetRandomNumber(8000, 12000));
//   } catch (error) {
//     console.error('Erro durante o login:', error);
//     throw error; // Re-throw the error to be caught by the caller
//   }
// }