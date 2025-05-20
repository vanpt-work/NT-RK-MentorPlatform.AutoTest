import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
  // Locators
  readonly registerNowLink = this.page.getByRole('link', { name: 'Register Now' });
  readonly signInLink = this.page.getByRole('link', { name: 'Sign In' });

  constructor(page: Page) {
    super(page);
  }

  async clickRegisterNow(): Promise<void> {
    await this.registerNowLink.click();
  }

  async clickSignIn(): Promise<void> {
    await this.signInLink.click();
  }
}