import { test, expect } from '@playwright/test';
import { test as baseTest } from '@core/fixture/fixture-api';
import VerifyEmailAPI from '../../../api/verify-email/verify-email.api';
import testData from '../../../tests-data/verify-email-data.json';

test.describe('Resend Email Verification Tests', () => {
    test('SYP_RVE001 - Email required validation', async ({ request }) => {
        // Arrange
        const verifyEmailAPI = new VerifyEmailAPI(request);
        const data = testData.invalidData.resendInvalidFormats.emptyEmail;

        // Act
        const response = await verifyEmailAPI.resendVerifyEmail(data.email);
        const responseBody = await response.json();

        // Assert
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
        expect(responseBody.errors[0].message).toContain('Email must not be empty.');
    });

    test('SYP_RVE002 - Email format validation', async ({ request }) => {
        // Arrange
        const verifyEmailAPI = new VerifyEmailAPI(request);
        const data = testData.invalidData.resendInvalidFormats.invalidFormat;

        // Act
        const response = await verifyEmailAPI.resendVerifyEmail(data.email);
        const responseBody = await response.json();

        // Assert
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
        expect(responseBody.errors[0].message).toContain('Email must be 8–50 characters and be valid format');
    });

    test('SYP_RVE003 - Email minimum length validation', async ({ request }) => {
        // Arrange
        const verifyEmailAPI = new VerifyEmailAPI(request);
        const data = testData.invalidData.resendInvalidFormats.tooShortEmail;

        // Act
        const response = await verifyEmailAPI.resendVerifyEmail(data.email);
        const responseBody = await response.json();

        // Assert
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
        expect(responseBody.errors[0].message).toContain('Email must be 8–50 characters and be valid format');
    });

    test('SYP_RVE004 - Email maximum length validation', async ({ request }) => {
        // Arrange
        const verifyEmailAPI = new VerifyEmailAPI(request);
        const data = testData.invalidData.resendInvalidFormats.tooLongEmail;

        // Act
        const response = await verifyEmailAPI.resendVerifyEmail(data.email);
        const responseBody = await response.json();

        // Assert
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
        expect(responseBody.errors[0].message).toContain('Email must be 8–50 characters and be valid format');
    });

    test('SYP_RVE005 - Non-existent email validation', async ({ request }) => {
        // Arrange
        const verifyEmailAPI = new VerifyEmailAPI(request);
        const data = testData.invalidData.nonExistentEmail;

        // Act
        const response = await verifyEmailAPI.resendVerifyEmail(data.email);
        const responseBody = await response.json();

        // Assert
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(404);
        expect(responseBody.errors[0].message).toContain('Email does not already register');
    });

    test('SYP_RVE006 - Successful resend test case', async ({ request }) => {
        // Arrange
        const verifyEmailAPI = new VerifyEmailAPI(request);
        const data = testData.validData.successfulResend;

        // Act
        const response = await verifyEmailAPI.resendVerifyEmail(data.email);

        // Assert
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    test('SYP_RVE007 - Already verified email validation', async ({ request }) => {
        // Arrange
        const verifyEmailAPI = new VerifyEmailAPI(request);
        const data = testData.invalidData.alreadyVerifiedEmail;

        // Act
        const response = await verifyEmailAPI.resendVerifyEmail(data.email);
        const responseBody = await response.json();

        // Assert
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
        expect(responseBody.errors[0].message).toContain('Email already verified');
    });
});