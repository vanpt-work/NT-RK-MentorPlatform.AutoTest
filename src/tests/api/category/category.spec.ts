import { test } from "@core/fixture/fixture-api";
import { expect } from "@playwright/test";
import testData from "@tests-data/category-data.json";
import CategoryAPI from "@api/category/category.api";
require('dotenv').config();


test.describe('Category API', () => {
    let categoryAPI: CategoryAPI

    test.beforeEach(async ({ request }) => {
        categoryAPI = new CategoryAPI(request);
    });

    testData.getCategory.forEach((category, index) => {
        test(`${index + 1}: Get category successfully`, async () => {
            const res = await categoryAPI.getCourseCategory(category);
            const resBody = await res.json() as ApiResponseType
            expect(resBody.statusCode).toBe(200)
        });
    })

    testData.getCategoryId.forEach((category, index) => {
        test(`${index + 1}: Get category by id successfully`, async () => {
            const res = await categoryAPI.getCourseCategoryById(category.id);
            const resBody = await res.json() as ApiResponseType
            expect(resBody.statusCode).toBe(200)
        });
    })

    testData.postValidCategory.forEach((category, index) => {
        test(`${index + 1}: Post category successfully`, async () => {
            const res = await categoryAPI.postCourseCategory(category.body);
            const resBody = await res.json() as ApiResponseType
            expect.soft(resBody.statusCode).toBe(201)
        });
    })

    testData.postInvalidCategory.forEach((category, index) => {
        test(`Negative case ${index + 1}: Post category unsuccessfully`, async () => {
            const res = await categoryAPI.postCourseCategory(category.body);
            const resBody = await res.json() as ApiResponseType
            expect.soft(resBody.statusCode).toBe(category.statusCode)
            expect.soft(resBody.errors[0].message).toBe(category.message)
        });
    })

    testData.postValidCategory.forEach((category, index) => {
        test(`${index + 1}: Put category successfully`, async () => {
            const res = await categoryAPI.putCourseCategory(category.id, category.body);
            expect(res.status()).toBe(204)
        });
    })

    testData.postValidCategory.forEach((category, index) => {
        test(`Negative case ${index + 1}: Put category unsuccessfully`, async () => {
            const res = await categoryAPI.putCourseCategory(category.id, category.body);
            expect(res.status()).toBe(204)
        });
    })

    testData.postValidCategory.forEach((category, index) => {
        test(`${index + 1}: Delete category successfully`, async () => {
            const res = await categoryAPI.deleteCourseCategory(category.id);
            expect(res.status()).toBe(200)
        });
    });
})

