import { test, expect } from '@playwright/test';
import RegisterAPI from '../../../api/register/register.api';
import { test as baseTest } from '@core/fixture/fixture-api';
import userData from '../../../tests-data/user-register-data.json';
import { RegisterUserRequest } from '../../../data-type/user.type';

test.describe('User Registration Tests', () => {
    test('SYP_036 - Verify successful account creation with valid required fields', async ({ request }) => {
        // Arrange
        const registerAPI = new RegisterAPI(request);
        const testData = userData.validData.basicRegistration as RegisterUserRequest;

        // Act
        const response = await registerAPI.register(testData);
        const responseBody = await response.json();

        // Assert
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        expect(responseBody.message).toBe('Registered account successfully.');
    });
});
