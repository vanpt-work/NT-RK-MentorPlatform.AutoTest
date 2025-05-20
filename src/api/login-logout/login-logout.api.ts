import { ENDPOINTS } from "@core/const/endpoint";
import { APIRequestContext } from "@playwright/test"

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

    async logout() {
        const res = await this.request.post(ENDPOINTS.LOGOUT)
        return res
    }
}