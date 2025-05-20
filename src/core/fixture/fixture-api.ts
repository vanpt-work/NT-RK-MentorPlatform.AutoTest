import { ENDPOINTS } from "@core/const/endpoint";
import { APIRequestContext, test as base } from "@playwright/test";
import LoginLogoutAPI from "src/api/login-logout/login-logout.api";
require('dotenv').config();

export async function apiFixture() {
    // Reading tokens from environment variables
    const token = process.env.ACCESS_TOKEN;
    const refreshToken = process.env.REFRESH_TOKEN;
    
    if (!token) {
        throw new Error('ACCESS_TOKEN not found in environment variables');
    }
    
    return { token, refreshToken };
}

export const test = base.extend<{request: APIRequestContext}>({
    request:
        async ({ playwright, request }, use) => {
            const loginAPI = new LoginLogoutAPI(request);
            const res = await loginAPI.login(process.env.EMAIL, process.env.PASSWORD);
            const resBody = await res.json();
            const token = resBody.data.accessToken;
            const newRequest = await playwright.request.newContext({
                extraHTTPHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
            await use(newRequest);
            await newRequest.dispose();
        }, 
})