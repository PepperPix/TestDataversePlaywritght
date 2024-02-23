import { Page } from '@playwright/test';
import { TOTP } from 'otpauth';

async function login(
    page: Page,
    orgurl: string,
    username: string,
    password: string,

): Promise<void> {
    await page.goto(orgurl);
    await page.getByPlaceholder('DIGITALL').click();
    await page.getByPlaceholder('DIGITALL').fill(username);
    await page.getByRole('button', { name: 'Weiter',exact:true }).click();
    await page.getByPlaceholder('Kennwort').click();
    await page.getByPlaceholder('Kennwort').fill(password);

    var totp = new TOTP({
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: process.env.totp,
    });
    var token = totp.generate();

    await Promise.all([
        page.waitForNavigation(),
        await page.getByRole('button', { name: 'Anmelden' }).click(),
        await page.getByRole('button', { name: 'Ja' }).click(),
    ]);
}

export default login;