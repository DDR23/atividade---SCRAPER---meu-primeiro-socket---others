
import { Page } from 'playwright-firefox';
import { GetRandomNumber } from './utils/GetRandomNumber';

export async function Login(page: Page, usuario: string, senha: string): Promise<void> {
  try {
    await page.locator('.hm-MainHeaderRHSLoggedOutNarrow_Login').click();
    await page.waitForTimeout(GetRandomNumber(500, 2000));
    await page.fill('[placeholder="Usuário"]', usuario);
    await page.waitForTimeout(GetRandomNumber(500, 2000));
    await page.fill('[placeholder="Senha"]', senha);
    await page.waitForTimeout(GetRandomNumber(500, 2000));
    await Promise.all([page.locator('.lms-LoginButton').click()]);
    await page.waitForTimeout(8000);
    await page.waitForLoadState('networkidle');
  } catch (error) {
    console.error('Erro durante o login:', error);
  }
}
