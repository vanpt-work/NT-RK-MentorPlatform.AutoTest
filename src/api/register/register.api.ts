import { ENDPOINTS } from "@core/const/endpoint";
import { APIRequestContext } from "@playwright/test";

export default class RegisterAPI {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  private toFormPayload(payload: Record<string, any>): { [key: string]: string } {
    return Object.fromEntries(
      Object.entries(payload).map(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          return [key, JSON.stringify(value)];
        }
        return [key, String(value)];
      })
    );
  }

  async register(payload: Record<string, any>) {
    const formPayload = this.toFormPayload(payload);
    const res = await this.request.post(ENDPOINTS.REGISTER, {
      form: formPayload, 
    });
    return res;
  }
}
