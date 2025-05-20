import { ENDPOINTS } from "@core/const/endpoint";
import { APIRequestContext } from "@playwright/test"

export default class RefreshTokenAPI {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request
    }

    async refreshToken(accessToken: string, newToken: string) {
        const res = await this.request.post(ENDPOINTS.REFRESH_TOKEN, { 
            data: { accessToken, newToken}
         })
        return res
    }
}