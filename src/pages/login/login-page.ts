import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "../base-page"
import { error } from "console"

export class LoginPage extends BasePage {
    private txtEmailLoc: Locator = this.page.getByPlaceholder("email@example.com")
    private txtPasswordLoc: Locator = this.page.getByRole("textbox", { name: "Password" })
    private chkRememberMeLoc: Locator = this.page.getByRole("checkbox", { name: "Remember me" })
    private btnSignInLoc: Locator = this.page.getByRole("button", { name: "Sign in" })
    private lblHomePageLoc: Locator = this.page.getByText("Home")

    constructor(page: Page) {
        super(page)
    }

    async goToBrowser(url = "") {
        await this.page.goto(url)
    }

    private getErrorMessage(message: string): Locator {
        return this.page.getByText(message)
    }

    async clickOnSignInLink() {
        await this.linkTextLocator("Sign in").click()
    }

    async enterEmailAndPasswordToTextBox(email: string, password: string) {
        await this.txtEmailLoc.fill(email)
        await this.txtPasswordLoc.fill(password)
    }

    async clickOnRememberCheckbox() {
        await this.chkRememberMeLoc.click()
    }

    async clickOnSignInButton() {
        await this.btnSignInLoc.click()
    }

    async clickOnForgotPasswordLink() {
        await this.linkTextLocator("Forgot password?").click()
    }

    async clickOnSignUpLink() {
        await this.linkTextLocator("Sign up").click()
    }

    async verifyLoginSuccessfully() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.lblHomePageLoc).toBeVisible();
    }

    async verifyErrorMessage(message: string) {
        await this.page.waitForLoadState('networkidle');
        await expect(this.getErrorMessage(message)).toBeVisible();
    }
}