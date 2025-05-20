import { APIRequestContext } from '@playwright/test';
import { ENDPOINTS } from '../../core/const/endpoint';
import { VerifyEmailRequest } from '../../data-type/verify-email.type';

export default class VerifyEmailAPI {
    constructor(private request: APIRequestContext) {}

    async verifyEmail(data: VerifyEmailRequest) {
        return await this.request.post(ENDPOINTS.VERIFY_EMAIL, {
            data
        });
    }

    async resendVerifyEmail(email: string) {
        return await this.request.post(ENDPOINTS.RESEND_VERIFY_EMAIL, {
            data: { email }
        });
    }
}