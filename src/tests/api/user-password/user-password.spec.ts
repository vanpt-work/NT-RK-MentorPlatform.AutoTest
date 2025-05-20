import { expect, test } from "@playwright/test";
import testData from "@tests-data/user-login-data.json";
import LoginLogoutAPI from "src/api/login-logout/login-logout.api";
require('dotenv').config();


test.describe('User Forgot Password', () => {
    let loginAPI: LoginLogoutAPI

    test.beforeEach(async ({ request }) => {
        loginAPI = new LoginLogoutAPI(request);
    });

    test("Happy case: Verify user forgot password successfully", async () => {
        const res = await loginAPI.forgotPassword(process.env.EMAIL);
        const resBody = await res.json()
        expect(res.status()).toBe(200)
    });

    testData.userAccount.forEach((account, index) => {
        test(`Negative case ${index + 1}: Verify user forgot password`, async () => {
            const res = await loginAPI.login(account.email, account.password);
            const resBody = await res.json()
            expect(res.status()).toBe(account.status)
            expect(resBody.errors[0].message).toBe(account.message)
        });
    })
})

test.describe('User Verify Forgot Password', () => {
    let loginAPI: LoginLogoutAPI

    test.beforeEach(async ({ request }) => {
        loginAPI = new LoginLogoutAPI(request);
    });

    test("Happy case: Verify password is reset successfully", async () => {
        const data = {
            email: process.env.EMAIL,
            code: ""
        }
        const res = await loginAPI.verifyForgotPassword(data);
        const resBody = await res.json()
        expect(res.status()).toBe(200)
    });

    testData.userAccount.forEach((account, index) => {
        test(`Negative case ${index + 1}: Verify reset password`, async () => {
            const res = await loginAPI.verifyForgotPassword(account);
            const resBody = await res.json()
            expect(res.status()).toBe(account.status)
            expect(resBody.errors[0].message).toBe(account.message)
        });
    })
})

