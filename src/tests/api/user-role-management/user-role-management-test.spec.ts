import { test } from "@core/fixture/fixture-api";
import UserAPI from "src/api/user/user.api";
import { expect } from "@playwright/test";
import testData from "@tests-data/user-role-management-data.json";

test.describe('User Role Management API', () => {
    let userAPI: UserAPI

    test.beforeEach(async ({ request }) => {
        userAPI = new UserAPI(request);
    });

    test("Verify that all the information of all users are fetched successfully", async () => {
        const res = await userAPI.getAllUsers()
        const resBody = await res.json();
        await expect(resBody.statusCode).toBe(200)
    });

    testData.activeUser.forEach((account, index) => {
        test(`${index + 1}: Verify update status of active account of user successfully`, async () => {
            const res = await userAPI.updateActiveUserStatus(account.id)
            const resBody = await res.json()
            expect.soft(resBody.statusCode).toBe(200)
        });
    })

    testData.activeUserError.forEach((account, index) => {
        test(`Negative Case ${index + 1}: Verify update status of active account of user`, async () => {
            const res = await userAPI.updateActiveUserStatus(account.id)
            const resBody = await res.json()
            expect.soft(resBody.statusCode).toBe(account.statusCode)
            expect.soft(resBody.errors[0].message).toBe(account.message)
        });
    })

    testData.deactiveUser.forEach((account, index) => {
        test(`Case ${index + 1}: Verify update status of deactive account of user successfully`, async () => {
            const res = await userAPI.updateDeactiveStatus(account.id)
            const resBody = await res.json()
            expect(resBody.statusCode).toBe(200)
        });
    })

    testData.deactiveUserError.forEach((account, index) => {
        test(`Negative Case ${index + 1}: Verify update status of deactive account of user`, async () => {
            const res = await userAPI.updateDeactiveStatus(account.id)
            const resBody = await res.json()
            expect.soft(resBody.statusCode).toBe(account.statusCode)
            expect.soft(resBody.errors[0].message).toBe(account.message)
        });
    })
})