import { test, expect } from '@playwright/test';
import { test as baseTest } from '@core/fixture/fixture-api';
import VerifyEmailAPI from '../../../api/verify-email/verify-email.api';
import testData from '../../../tests-data/verify-email-data.json';
import { VerifyEmailRequest } from '../../../data-type/verify-email.type';

test.describe('Email Verification Tests', () => {
    test('SYP_VE001 - Verify successful email verification with valid code', async ({ request }) => {
        // Arrange
        const verifyEmailAPI = new VerifyEmailAPI(request);
        const data = testData.validData.successfulVerification as VerifyEmailRequest;

        // Act
        const response = await verifyEmailAPI.verifyEmail(data);
        const responseBody = await response.json();

        // Assert
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        expect(responseBody.accessToken).toBeDefined();
        expect(responseBody.refreshToken).toBeDefined();
    });

    test('SYP_VE002 - Verify error when email is null', async ({ request }) => {
        // Arrange
        const verifyEmailAPI = new VerifyEmailAPI(request);
        const data = testData.invalidData.nullEmail as VerifyEmailRequest;

        // Act
        const response = await verifyEmailAPI.verifyEmail(data);
        const responseBody = await response.json();
        
        // Debug logging
        console.log('Response Status:', response.status());
        console.log('Response Body:', JSON.stringify(responseBody, null, 2));

        // Assert
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
        expect(responseBody.errors[0].message).toBe('Email must be 8–50 characters and be valid format');
    });

    test('SYP_VE003 - Verify error with invalid email format', async ({ request }) => {
        // Arrange
        const verifyEmailAPI = new VerifyEmailAPI(request);
        const data = testData.invalidData.invalidFormatEmail as VerifyEmailRequest;

        // Act
        const response = await verifyEmailAPI.verifyEmail(data);
        const responseBody = await response.json();

        // Assert
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
        expect(responseBody.errors[0].message).toBe('Email must be 8–50 characters and be valid format');
    });

    test('SYP_VE004 - Verify error when code is null', async ({ request }) => {
        // Arrange
        const verifyEmailAPI = new VerifyEmailAPI(request);
        const data = testData.invalidData.nullCode as VerifyEmailRequest;

        // Act
        const response = await verifyEmailAPI.verifyEmail(data);
        const responseBody = await response.json();

        // Assert
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
        expect(responseBody.errors[0].message).toBe('Code is required.');
    });

    test('SYP_VE005 - Verify error with invalid code format', async ({ request }) => {
        // Arrange
        const verifyEmailAPI = new VerifyEmailAPI(request);
        const data = testData.invalidData.invalidCodeFormat as VerifyEmailRequest;

        // Act
        const response = await verifyEmailAPI.verifyEmail(data);
        const responseBody = await response.json();

        // Assert
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
        expect(responseBody.errors[0].message).toBe('Code must consist of exactly 6 digits.');
    });

    test('SYP_VE006 - Verify error with non-existent email', async ({ request }) => {
        // Arrange
        const verifyEmailAPI = new VerifyEmailAPI(request);
        const data = testData.invalidData.nonExistentEmail as VerifyEmailRequest;

        // Act
        const response = await verifyEmailAPI.verifyEmail(data);
        const responseBody = await response.json();

        // Assert
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
        expect(responseBody.errors[0].message).toBe('Email does not already register.');
    });

    test('SYP_VE007 - Verify error with incorrect verification code', async ({ request }) => {
        // Arrange
        const verifyEmailAPI = new VerifyEmailAPI(request);
        const data = testData.invalidData.incorrectCode as VerifyEmailRequest;

        // Act
        const response = await verifyEmailAPI.verifyEmail(data);
        const responseBody = await response.json();

        // Assert
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
        expect(responseBody.errors[0].message).toBe('Verify email code incorrect');
    });
});