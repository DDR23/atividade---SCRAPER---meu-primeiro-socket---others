
import { Page } from 'playwright';
import { GetRandomNumber } from './utils/GetRandomNumber';

export async function Login(page: Page, usuario: string, senha: string): Promise<void> {
  try {

    await page.waitForTimeout(GetRandomNumber(500, 2000));
    await page.getByText('Login').nth(1).click();
    await page.waitForTimeout(GetRandomNumber(500, 2000));
    await page.getByPlaceholder('Usuário').click();
    await page.waitForTimeout(GetRandomNumber(500, 2000));
    await page.getByPlaceholder('Usuário').fill(usuario);
    await page.waitForTimeout(GetRandomNumber(500, 2000));
    await page.getByPlaceholder('Senha').click();
    await page.waitForTimeout(GetRandomNumber(500, 2000));
    await page.getByPlaceholder('Senha').fill(senha);
    await page.waitForTimeout(GetRandomNumber(500, 2000));
    await page.getByText('Login', { exact: true }).first().click();
    await page.waitForTimeout(8000);

    // await page.locator('.hm-MainHeaderRHSLoggedOutNarrow_Login').click({ delay: 200 });
    // await page.fill('[placeholder="Usuário"]', usuario);
    // await page.waitForTimeout(GetRandomNumber(500, 2000));
    // await page.fill('[placeholder="Senha"]', senha);
    // await page.waitForTimeout(GetRandomNumber(500, 2000));
    // await Promise.all([page.locator('.lms-LoginButton').click({ delay: 200 })]);
    // await page.waitForTimeout(8000);
    // await page.waitForLoadState('networkidle');
  } catch (error) {
    console.error('Erro durante o login:', error);
  }
}
