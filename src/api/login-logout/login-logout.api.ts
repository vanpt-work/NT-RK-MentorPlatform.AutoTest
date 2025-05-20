import { ENDPOINTS } from "@core/const/endpoint";
import { APIRequestContext } from "@playwright/test"
import { UserType } from "src/data-type/user.type";

export default class LoginLogoutAPI {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request
    }

    async login(email: string, password: string) {
        const res = await this.request.post(ENDPOINTS.USER_LOGIN, { 
            data: { email, password}
         })
        return res
    }

    async forgotPassword(email: string) {
        const res = await this.request.post(ENDPOINTS.FORGOT_PASSWORD, {
            data: email
        })
        return res
    }

    async verifyForgotPassword(data: any) {
        const res = await this.request.post(ENDPOINTS.VERIFY_FORGOT_PASSWORD, {
            data: data 
        })
        return res
    }

    async refreshToken(data: any) {
        const res = await this.request.post(ENDPOINTS.REFRESH_TOKEN)
        return res
    }
}