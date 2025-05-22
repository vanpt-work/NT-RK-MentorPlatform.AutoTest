import { ENDPOINTS } from "@core/const/endpoint";
import { APIRequestContext } from "@playwright/test"
import { emit } from "process";

export default class UserAPI {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request
    }

    async getAllUsers() {
        const res = await this.request.get(ENDPOINTS.ALL_USERS)
        return res
    }

    async updateActiveUserStatus(userId: string) {
        const res = await this.request.patch(ENDPOINTS.ACTIVE_USERS_BY_ID(userId))
        return res
    }

    async updateDeactiveStatus(userId: string) {
        const res = await this.request.patch(ENDPOINTS.DEACTIVE_USERS_BY_ID(userId))
        return res
    }
}