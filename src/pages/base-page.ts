import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
    page : Page
    constructor(page: Page) {
        this.page = page
    }

    linkTextLocator(name: string){
        return this.page.getByRole("link", { name: name })
    }
}