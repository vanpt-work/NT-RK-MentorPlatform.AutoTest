import { test, expect } from '@playwright/test';
import testData from './test-data.json';

const testDataPrefix = `test_${Date.now()}`; // Generate a unique test prefix for email addresses

test.describe('Step 1: Initial Signup Tests', () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to home page and click register link', async () => {
      await page.goto('/');
      await page.getByRole('link', { name: 'Register Now' }).click();
    });
    
    await test.step('Verify registration page loaded', async () => {
      await expect(page.getByText('Create an account')).toBeVisible();
      await expect(page.getByText('Complete the steps below to')).toBeVisible();
    });
  });

  test.afterEach(async ({ page }) => {
    await test.step('Clear form inputs for next test', async () => {
      // Check if we're still on Step 1 by looking for the Email field
      const emailField = page.getByRole('textbox', { name: 'Email' });
      if (await emailField.count() > 0) {
        await emailField.fill('');
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('');
        await page.getByRole('textbox', { name: 'Confirm Password' }).fill('');
        await page.getByRole('checkbox', { name: 'I agree to the Terms of' }).uncheck();
      }
    });
  });

  test.describe('Email Validation Tests', () => {
    test('Verify email field default state', async ({ page }) => {
      await test.step('Verify email field is empty', async () => {
        await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('');
      });
      
      await test.step('Verify placeholder', async () => {
        await expect(page.getByRole('textbox', { name: 'Email' })).toHaveAttribute('placeholder', 'email@example.com');
      });
    });

    test('Verify empty email validation', async ({ page }) => {
      await test.step('Submit form with empty email', async () => {
        await page.getByRole('button', { name: 'Next' }).click();
      });
      
      await test.step('Verify error message', async () => {
        await expect(page.getByText('Email must not be empty.')).toBeVisible();
      });
    });

    test('Verify maximum length validation for email', async ({ page }) => {
      const longEmail = 'a'.repeat(50) + '@example.com'; // for 8-50 char validation
      
      await test.step('Enter email and submit', async () => {
        await page.getByRole('textbox', { name: 'Email' }).fill(longEmail);
        await page.getByRole('button', { name: 'Next' }).click();
      });
    
      await test.step('Verify error message', async () => {
        await expect(page.getByText('Email must be 8-50 characters.')).toBeVisible();
      });
    });

    test('Verify invalid email format validation', async ({ page }) => {
      await test.step('Enter invalid email and submit', async () => {
        await page.getByRole('textbox', { name: 'Email' }).fill('invalid-email');
        await page.getByRole('button', { name: 'Next' }).click();
      });
      
      await test.step('Verify error message', async () => {
        await expect(page.getByText('Email is invalid.')).toBeVisible();
      });
    });
  });

  test.describe('Password Validation Tests', () => {
    test('Verify empty password validation', async ({ page }) => {
      await test.step('Enter valid email but leave password empty', async () => {
        await page.getByRole('textbox', { name: 'Email' }).fill('valid@example.com');
        await page.getByRole('button', { name: 'Next' }).click();
      });
      
      await test.step('Verify error message', async () => {
        await expect(page.getByText('Password must not be empty.')).toBeVisible();
      });
    });
    
    test('Verify password minimum length requirement', async ({ page }) => {
      await test.step('Enter valid email and short password', async () => {
        await page.getByRole('textbox', { name: 'Email' }).fill('valid@example.com');
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Ab1!');
        await page.getByRole('button', { name: 'Next' }).click();
      });
      
      await test.step('Verify error message', async () => {
        await expect(page.getByText('Password must be at least 8')).toBeVisible();
      });
    });
    
    test('Verify passwords match validation', async ({ page }) => {
      await test.step('Enter valid email, valid password, but different confirm password', async () => {
        await page.getByRole('textbox', { name: 'Email' }).fill('valid@example.com');
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Password123!');
        await page.getByRole('textbox', { name: 'Confirm Password' }).fill('DifferentPass123!');
        await page.getByRole('button', { name: 'Next' }).click();
      });
      
      await test.step('Verify error message', async () => {
        await expect(page.getByText('Passwords do not match.')).toBeVisible();
      });
    });
    
    test('Verify password length validation', async ({ page }) => {
      await test.step('Enter valid email but password that\'s too long', async () => {
        await page.getByRole('textbox', { name: 'Email' }).fill('valid@example.com');
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('P'.repeat(33) + 'a1!');
        await page.getByRole('button', { name: 'Next' }).click();
      });
      
      await test.step('Verify error message', async () => {
        await expect(page.getByText('Password must be 8–32 characters.')).toBeVisible();
      });
    });
  });

  test.describe('Terms Agreement Tests', () => {
    test('Verify terms agreement is required', async ({ page }) => {
      await test.step('Fill valid data but don\'t check terms', async () => {
        await page.getByRole('textbox', { name: 'Email' }).fill('valid@example.com');
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('ValidPass123!');
        await page.getByRole('textbox', { name: 'Confirm Password' }).fill('ValidPass123!');
        await page.getByRole('button', { name: 'Next' }).click();
      });
      
      await test.step('Verify error message', async () => {
        await expect(page.getByText('Please agree to the Terms of')).toBeVisible();
      });
    });
    
    test('Open and close Terms of Service', async ({ page }) => {
      await test.step('Click Terms of Service link', async () => {
        await page.getByRole('button', { name: 'Terms of Service' }).click();
      });
      
      await test.step('Verify modal is displayed', async () => {
        await expect(page.getByRole('dialog')).toBeVisible();
      });
      
      await test.step('Close modal', async () => {
        await page.getByRole('button', { name: 'Close' }).click();
        await expect(page.getByRole('dialog')).not.toBeVisible();
      });
    });
    
    test('Open and close Privacy Policy', async ({ page }) => {
      await test.step('Click Privacy Policy link', async () => {
        await page.getByRole('button', { name: 'Privacy Policy' }).click();
      });
      
      await test.step('Verify modal is displayed', async () => {
        await expect(page.getByRole('dialog')).toBeVisible();
      });
      
      await test.step('Close modal', async () => {
        await page.getByRole('button', { name: 'Close' }).click();
        await expect(page.getByRole('dialog')).not.toBeVisible();
      });
    });
  });

  test('Verify successful submission of step 1', async ({ page }) => {
    const validData = testData.registration.api.validMentor;
    const testEmail = `${testDataPrefix}_${validData.Email}`;
    
    await test.step('Fill valid registration data', async () => {
      await page.getByRole('textbox', { name: 'Email' }).fill(testEmail);
      await page.getByRole('textbox', { name: 'Password', exact: true }).fill(validData.Password);
      await page.getByRole('textbox', { name: 'Confirm Password' }).fill(validData.Password);
      await page.getByRole('checkbox', { name: 'I agree to the Terms of' }).check();
    });
    
    await test.step('Submit the form', async () => {
      await page.getByRole('button', { name: 'Next' }).click();
    });
    
    await test.step('Verify navigation to step 2', async () => {
      await expect(page.getByText('Step 2: Profile')).toBeVisible();
      await expect(page.getByText('Create your profile')).toBeVisible();
      await expect(page.getByText('Tell us more about yourself')).toBeVisible();
    });
  });
  
  test('Verify Back to Login button navigation', async ({ page }) => {
    await test.step('Click back to login button', async () => {
      await page.getByRole('button', { name: 'Back to Login' }).click();
    });
    
    await test.step('Verify navigation to login page', async () => {
      await expect(page).toHaveURL(/.*login/);
    });
  });
});