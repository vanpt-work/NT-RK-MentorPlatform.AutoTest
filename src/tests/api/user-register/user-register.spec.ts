import { expect, test } from "@playwright/test";
import RegisterAPI from "src/api/register/register.api";
import testRegister from "@tests-data/user-register-data.json";

test.describe('User Register API', () => {
  let registerAPI: RegisterAPI;

  test.beforeEach(async ({ request }) => {
    registerAPI = new RegisterAPI(request);
  });

  test("Positive case: Verify user register API successfully", async () => {
    const res = await registerAPI.register(testRegister.successRegister);
    const resBody = await res.json();
    expect(res.status()).toBe(200);
  });

  testRegister.unsuccessRegister.forEach((data, index) => {
    test(`Negative case ${index + 1}: Verify user register API`, async () => {
      const res = await registerAPI.register(data);
      const contentType = res.headers()['content-type'];

      expect(res.status()).toBe(data.status);

      if (contentType && contentType.includes('application/json')) {
        const resBody = await res.json();
        expect(resBody.message || resBody.errors?.[0]?.message).toBe(data.message);
      } else {
        const rawText = await res.text();
        console.error(`Response not JSON. Received:\n${rawText}`);
        throw new Error('Response is not valid JSON');
      }
    });
  });
});
