import { expect, test } from "@playwright/test";
import testData from "@tests-data/user-login-data.json";
import LoginLogoutAPI from "src/api/login-logout/login-logout.api";
require('dotenv').config();


test.describe('User Login API', () => {
    let loginAPI: LoginLogoutAPI

    test.beforeEach(async ({ request }) => {
        loginAPI = new LoginLogoutAPI(request);
    });

    test("Happy case: Verify user login API sucessfully", async () => {
        const res = await loginAPI.login(process.env.EMAIL, process.env.PASSWORD);
        expect(res.status()).toBe(200)
    });

    testData.userAccount.forEach((account, index) => {
        test(`Negative case ${index + 1}: Verify user login API`, async () => {
            const res = await loginAPI.login(account.email, account.password);
            const resBody = await res.json()
            expect(res.status()).toBe(account.status)
            expect(resBody.errors[0].message).toBe(account.message)
        });
    })
})

