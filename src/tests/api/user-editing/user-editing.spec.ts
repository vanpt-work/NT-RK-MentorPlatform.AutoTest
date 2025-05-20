import { expect, test } from "@playwright/test";
import testRegister from "@tests-data/user-register-data.json";
import EditProfileAPI from "src/api/editing/editing.api";

test.describe('User edit profile API', () => {
  let editProfileAPI : EditProfileAPI;

  test.beforeEach(async ({ request }) => {
    editProfileAPI  = new EditProfileAPI (request);
  });

  test("Positive case: Verify user register API successfully", async () => {
    const res = await editProfileAPI.editUserProfile(testRegister.successRegister);
    const resBody = await res.json();
    expect(res.status()).toBe(200);
  });

  testRegister.unsuccessRegister.forEach((data, index) => {
    test(`Negative case ${index + 1}: Verify user register API`, async () => {
      const res = await editProfileAPI.editUserProfile(data);
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
