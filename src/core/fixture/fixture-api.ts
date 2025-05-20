import { ENDPOINTS } from "@core/const/endpoint";
import { APIRequestContext, test as base } from "@playwright/test";
import LoginLogoutAPI from "src/api/login-logout/login-logout.api";
require('dotenv').config();

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