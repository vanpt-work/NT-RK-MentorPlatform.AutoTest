import { test } from "@core/fixture/fixture-api";
import UserAPI from "src/api/user/user.api";
import { expect } from "@playwright/test";
import testData from "@tests-data/user-role-management-data.json";

test.describe('User Role Management API', () => {
    let userAPI: UserAPI

    test.beforeEach(async ({ request }) => {
        userAPI = new UserAPI(request);
    });

    test("Happy Case: Verify that all the information of all users are fetched successfully", async () => {
        const res = await userAPI.getAllUsers()
        const resBody = await res.json();
        await expect(resBody.statusCode).toBe(200)
    });

    testData.activeUser.forEach((account, index) => {
        test(`Happy Case ${index}: Verify update status of active account of user successfully`, async () => {
            const res = await userAPI.updateActiveUserStatus(account.id)
            const resBody = await res.json()
            expect.soft(resBody.statusCode).toBe(200)
        });
    })

    testData.activeUser_error.forEach((account, index) => {
        test(`Negative Case ${index}: Verify update status of active account of user`, async () => {
            const res = await userAPI.updateActiveUserStatus(account.id)
            const resBody = await res.json()
            expect.soft(resBody.statusCode).toBe(account.statusCode)
            expect.soft(resBody.errors[0].message).toBe(account.message)
        });
    })

    testData.deactiveUser.forEach((account, index) => {
        test(`Happy Case ${index}: Verify update status of deactive account of user successfully`, async () => {
            const res = await userAPI.updateDeactiveStatus(account.id)
            const resBody = await res.json()
            expect(resBody.statusCode).toBe(200)
        });
    })

    testData.deactiveUser_error.forEach((account, index) => {
        test(`Negative Case ${index}: Verify update status of deactive account of user`, async () => {
            const res = await userAPI.updateDeactiveStatus(account.id)
            const resBody = await res.json()
            expect.soft(resBody.statusCode).toBe(account.statusCode)
            expect.soft(resBody.errors[0].message).toBe(account.message)
        });
    })
})