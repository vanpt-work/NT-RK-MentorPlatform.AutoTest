import { expect, test } from "@playwright/test";
import LoginLogoutAPI from "src/api/login-logout/login-logout.api";
require('dotenv').config();

test.describe('User Logout API', () => {
    let loginLogoutAPI: LoginLogoutAPI;

    test.beforeEach(async ({ request }) => {
        loginLogoutAPI = new LoginLogoutAPI(request);
    });

    test("Verify successful logout and token invalidation", async () => {
        // First login to get a valid session
        const loginRes = await loginLogoutAPI.login(process.env.EMAIL, process.env.PASSWORD);
        expect(loginRes.status()).toBe(200);

        // Attempt logout
        const logoutRes = await loginLogoutAPI.logout();
        expect(logoutRes.status()).toBe(200);

        // Try to use the same session by attempting another login
        // This should fail as the token should be invalidated
        const postLogoutRes = await loginLogoutAPI.login(process.env.EMAIL, process.env.PASSWORD);
        const postLogoutBody = await postLogoutRes.json();
        
        expect(postLogoutRes.status()).toBe(401);
        expect(postLogoutBody.errors[0].message).toBe("Unauthorized");
    });
});