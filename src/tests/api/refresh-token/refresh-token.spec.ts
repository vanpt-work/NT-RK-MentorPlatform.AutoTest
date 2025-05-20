import { expect, test, request } from "@playwright/test";
import testToken from "@tests-data/refresh-token-data.json";
import RefreshTokenAPI from "src/api/refresh-token/refresh-token.api";
require('dotenv').config();

test.describe('Refresh Token API', () => {
    let refreshTokenAPI: RefreshTokenAPI;

    test.beforeEach(async ({ request }) => {
        refreshTokenAPI = new RefreshTokenAPI(request);
    });

    test("Verify refresh token API sucessfully", async () => {
        const data = {
            accessToken: testToken.successRefreshToken.accessToken,
            newToken: testToken.successRefreshToken.newToken
        }
        const res = await refreshTokenAPI.refreshToken(testToken.successRefreshToken);
        const resBody = await res.json()
        expect(res.status()).toBe(200)
    });

    testToken.unsuccessRefreshToken.forEach((account, index) => {
        test(`Negative case ${index + 1}: Verify user login API`, async () => {
            const res = await refreshTokenAPI.refreshToken(account.accessToken, account.newToken);
            const resBody = await res.json()
            expect(res.status()).toBe(account.status)
            expect(resBody.errors[0].message).toBe(account.message)
        });
    })
})