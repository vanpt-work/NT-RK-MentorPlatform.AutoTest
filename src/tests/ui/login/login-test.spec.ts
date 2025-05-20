import { expect, test } from "@playwright/test";
import { LoginPage } from "src/pages/login/login-page";
import testData from "@tests-data/user-login-data.json"
require('dotenv').config();

test.describe('Profile Test', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
    });

    test("@Login Verify that user login successfully with valid data", async ({ page }) => {
        await test.step("Go to the LoginPage", async () => {
            await loginPage.goToBrowser();
            await loginPage.clickOnSignInLink();
        });

        await test.step("Enter an existing email and password to textbox", async () => {
            await loginPage.enterEmailAndPasswordToTextBox(process.env.EMAIL, process.env.PASSWORD);
        });

        await test.step("Click the Sign in button", async () => {
            await loginPage.clickOnSignInButton();
        });

        await test.step("Verify that user navigate to HomePage", async () => {
            await loginPage.verifyLoginSuccessfully();
        });
    });

    testData.userAccount.forEach((account, index) => {
        test(`@Login Case ${index}: Verify that user login unsuccessfully with invalid data`, async ({ page }) => {
            await test.step("Go to the LoginPage", async () => {
                await loginPage.goToBrowser();
                await loginPage.clickOnSignInLink();
            });

            await test.step("Enter an existing email and password to textbox", async () => {
                await loginPage.enterEmailAndPasswordToTextBox(account.email, account.password);
            });

            await test.step("Click the Sign in button", async () => {
                await loginPage.clickOnSignInButton();
            });

            await test.step("Verify that user navigate to HomePage", async () => {
                await loginPage.verifyErrorMessage(account.message);
            });
        });
    })
})