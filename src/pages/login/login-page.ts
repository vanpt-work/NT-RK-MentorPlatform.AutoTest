import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "../base-page"

export class LoginPage extends BasePage {
    private txtEmailLoc: Locator = this.page.getByTestId("")
    private txtPasswordLoc: Locator = this.page.getByPlaceholder("")
    private chkRememberMeLoc: Locator = this.page.getByRole("checkbox", { name: "" })
    private btnSignInLoc: Locator = this.page.getByRole("button", { name: "" })
    private lnkForgotPasswordLoc: Locator = this.page.getByRole("link", { name: "" })
    private lnkSignUpLoc: Locator = this.page.getByRole("link", { name: "" })

    constructor(page: Page) {
        super(page)
    }

    async goToBrowser(url = "") {
        await this.page.goto(url)
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
    }
}