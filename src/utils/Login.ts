import { Page } from "playwright";
import { GetRandomNumber } from "./GetRandomNumber";

export async function Login(page: Page, usuario: string, senha: string): Promise<void> {
  try {
    // await page.locator('.hm-MainHeaderRHSLoggedOutWide_Login').click({ delay: 400 });
    await page.locator('.hm-MainHeaderRHSLoggedOutNarrow_Login').click({ delay: 400 }); // mobile
    await page.waitForTimeout(GetRandomNumber(4000, 7000));
    await page.fill('.lms-StandardLogin_Username', usuario);
    await page.waitForTimeout(GetRandomNumber(500, 2000));
    await page.fill('.lms-StandardLogin_Password', senha);
    await page.waitForTimeout(GetRandomNumber(500, 2000));
    await page.locator('.lms-LoginButton').click({ delay: 400 });
    await page.waitForTimeout(GetRandomNumber(8000, 12000));
  } catch (error) {
    console.error('Erro durante o login:', error);
    throw error;
  }
}
