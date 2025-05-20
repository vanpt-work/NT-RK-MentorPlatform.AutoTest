import { expect, test } from "@playwright/test";
import testData from "@tests-data/user-login-data.json";
import CategoryAPI from "@api/category/category.api";
require('dotenv').config();


test.describe('Category API', () => {
    let categoryAPI: CategoryAPI

    test.beforeEach(async ({ request }) => {
        categoryAPI = new CategoryAPI(request);
    });

    test("Happy case: Get category by id successfully", async () => {
        const res = await categoryAPI.getCourseCategoryById("00ffeedd-ccbb-aabb-8899-776655443322");
        expect(res.status()).toBe(200)
    });

    test("Happy case: Get category successfully", async () => {
        const res = await categoryAPI.getCourseCategory({});
        expect(res.status()).toBe(200)
    });

    test("Happy case: Post category successfully", async () => {
        const res = await categoryAPI.postCourseCategory({});
        expect(res.status()).toBe(200)
    });

    test("Happy case: Put category successfully", async () => {
        const res = await categoryAPI.putCourseCategory("", {});
        expect(res.status()).toBe(200)
    });

    test("Happy case: Delete category successfully", async () => {
        const res = await categoryAPI.deleteCourseCategory("");
        expect(res.status()).toBe(200)
    });

    // testData.userAccount.forEach((account, index) => {
    //     test(`Negative case ${index + 1}: Verify user login API`, async () => {
    //         const res = await categoryAPI;
    //         const resBody = await res.json()
    //         expect(res.status()).toBe(account.status)
    //         expect(resBody.errors[0].message).toBe(account.message)
    //     });
    // })
})

