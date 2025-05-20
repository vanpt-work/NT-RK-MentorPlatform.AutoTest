import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "../base-page"
import { error } from "console"

export class LoginPage extends BasePage {
    private lnkSignInLoc: Locator = this.page.getByRole("link", { name: "Sign in" })
    private txtEmailLoc: Locator = this.page.getByPlaceholder("email@example.com")
    private txtPasswordLoc: Locator = this.page.getByRole("textbox", { name: "Password" })
    private chkRememberMeLoc: Locator = this.page.getByRole("checkbox", { name: "Remember me" })
    private btnSignInLoc: Locator = this.page.getByRole("button", { name: "Sign in" })
    private lnkForgotPasswordLoc: Locator = this.page.getByRole("link", { name: "Forgot password?" })
    private lnkSignUpLoc: Locator = this.page.getByRole("link", { name: "Sign up" })
    private lblHomePageLoc: Locator = this.page.getByText("Home")

    constructor(page: Page) {
        super(page)
    }

    async goToBrowser(url = "") {
        await this.page.goto(url)
    }

    private getErrorMessage(message: string) : Locator{
        return this.page.getByText(message)
    }

    async clickOnSignInLink() {
        await this.lnkSignInLoc.click()
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
        await this.lnkForgotPasswordLoc.click()
    }

    async clickOnSignUpLink() {
        await this.lnkSignUpLoc.click()
    }

    async verifyLoginSuccessfully() {
        await this.page.waitForLoadState('networkidle');
        expect(this.lblHomePageLoc).toBeVisible();
    }

    async verifyErrorMessage(message: string) {
        await this.page.waitForLoadState('networkidle');
        expect(this.getErrorMessage(message)).toBeVisible();
    }

}