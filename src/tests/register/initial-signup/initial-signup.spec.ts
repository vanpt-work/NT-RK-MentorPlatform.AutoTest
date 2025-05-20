import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/home-page';
import { RegisterPage } from '../../../pages/register-page';
import testData from './test-data.json';

test.describe('Initial Signup Stage Tests (TS-1xx)', () => {
  let homePage: HomePage;
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registerPage = new RegisterPage(page);

    await test.step('Pre-condition: Navigate to registration page', async () => {
      await registerPage.NavigateToRegisterPage(homePage);
    });
  });

  // Email Validation Tests (TS-11x)
  test.describe('Email Validation Tests', () => {
    test('TS-111: ' + testData.ui.email['TS-111'].description, async () => {
      await test.step('Verify email field default state', async () => {
        await registerPage.verifyEmptyEmailField();
        await registerPage.verifyEmailPlaceholder(testData.ui.email['TS-111'].testData.expectedPlaceholder);
      });
    });

    test('TS-112: ' + testData.ui.email['TS-112'].description, async () => {
      await test.step('Submit form with empty email', async () => {
        await registerPage.fillEmail(testData.ui.email['TS-112'].testData.email);
        await registerPage.clickNextButton();
        await registerPage.verifyInvalidEmailError();
      });
    });

    test('TS-113: ' + testData.ui.email['TS-113'].description, async () => {
      for (const testCase of testData.ui.email['TS-113'].testCases) {
        await test.step(`Verify ${testCase.scenario}`, async () => {
          await registerPage.fillEmail(testCase.email);
          await registerPage.clickNextButton();
          await registerPage.verifyInvalidEmailError();
        });
      }
    });

    test('TS-114: ' + testData.ui.email['TS-114'].description, async () => {
      await test.step('Verify minimum length validation', async () => {
        await registerPage.fillEmail(testData.ui.email['TS-114'].testData.shortEmail);
        await registerPage.clickNextButton();
        await registerPage.verifyEmailLengthError();
      });

      await test.step('Verify maximum length validation', async () => {
        await registerPage.fillEmail(testData.ui.email['TS-114'].testData.longEmail);
        await registerPage.clickNextButton();
        await registerPage.verifyEmailLengthError();
      });
    });
  });

  // Password Validation Tests (TS-12x)
  test.describe('Password Validation Tests', () => {
    test('TS-121: ' + testData.ui.password['TS-121'].description, async () => {
      await test.step('Submit form with empty password', async () => {
        await registerPage.fillEmail(testData.ui.password['TS-121'].testData.email);
        await registerPage.fillPassword(testData.ui.password['TS-121'].testData.password);
        await registerPage.clickNextButton();
        await registerPage.verifyPasswordError(testData.ui.password['TS-121'].testData.expectedError);
      });
    });

    test('TS-122: ' + testData.ui.password['TS-122'].description, async () => {
      for (const testCase of testData.ui.password['TS-122'].testCases) {
        await test.step(`Verify ${testCase.scenario}`, async () => {
          await registerPage.fillPassword(testCase.password);
          await registerPage.clickNextButton();
          await registerPage.verifyPasswordError(testCase.expectedError);
        });
      }
    });

    test('TS-123: ' + testData.ui.password['TS-123'].description, async () => {
      const testCase = testData.ui.password['TS-123'].testData;
      await test.step('Verify password mismatch validation', async () => {
        await registerPage.fillEmail(testCase.email);
        await registerPage.fillPassword(testCase.password);
        await registerPage.fillConfirmPassword(testCase.mismatchConfirm);
        await registerPage.clickNextButton();
        await registerPage.verifyPasswordError(testCase.expectedError);
      });
    });
  });

  // Terms Agreement Tests (TS-13x)
  test.describe('Terms Agreement Tests', () => {
    test('TS-131: ' + testData.ui.terms['TS-131'].description, async () => {
      const testCase = testData.ui.terms['TS-131'].testData;
      await test.step('Submit form without accepting terms', async () => {
        await registerPage.fillEmail(testCase.email);
        await registerPage.fillPassword(testCase.password);
        await registerPage.fillConfirmPassword(testCase.password);
        // Do not check terms checkbox
        await registerPage.clickNextButton();
        await registerPage.verifyTermsError(testCase.expectedError);
      });
    });

    test('TS-132: Verify terms and privacy policy links are accessible', async () => {
      await test.step('Verify Terms of Service link', async () => {
        await registerPage.verifyTermsLinkAccessible();
      });

      await test.step('Verify Privacy Policy link', async () => {
        await registerPage.verifyPrivacyLinkAccessible();
      });
    });
  });

  // API Tests
  test.describe('API Registration Tests', () => {
    const createFormData = (data: Record<string, any>): FormData => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item.toString()));
        } else if (value !== null) {
          formData.append(key, value.toString());
        }
      });
      return formData;
    };

    test('API-001: Verify successful mentor registration', async ({ request }) => {
      const response = await request.post('/api/auth/register', {
        multipart: createFormData(testData.api.validMentor)
      });
      await expect(response.ok()).toBeTruthy();
    });

    test('API-002: Verify successful learner registration', async ({ request }) => {
      const response = await request.post('/api/auth/register', {
        multipart: createFormData(testData.api.validLearner)
      });
      await expect(response.ok()).toBeTruthy();
    });

    test('API-003: Verify required field validation', async ({ request }) => {
      const response = await request.post('/api/auth/register', {
        multipart: createFormData(testData.api.invalidData.emptyRequired)
      });
      await expect(response.status()).toBe(400);
    });

    test('API-004: Verify invalid email format validation', async ({ request }) => {
      const response = await request.post('/api/auth/register', {
        multipart: createFormData(testData.api.invalidData.invalidEmail)
      });
      await expect(response.status()).toBe(400);
    });

    test('API-005: Verify weak password validation', async ({ request }) => {
      const response = await request.post('/api/auth/register', {
        multipart: createFormData(testData.api.invalidData.weakPassword)
      });
      await expect(response.status()).toBe(400);
    });

    test('API-006: Verify invalid role validation', async ({ request }) => {
      const response = await request.post('/api/auth/register', {
        multipart: createFormData(testData.api.invalidData.invalidRole)
      });
      await expect(response.status()).toBe(400);
    });
  });
});