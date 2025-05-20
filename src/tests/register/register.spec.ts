import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { RegisterPage } from '../../pages/register-page';
import testData from './test-data.json';

test.describe('Registration Flow Tests', () => {
  let homePage: HomePage;
  let registerPage: RegisterPage;
  
  // Generate a unique test ID to avoid data collisions
  const timestamp = Date.now();
  const testId = `test${timestamp}`;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registerPage = new RegisterPage(page);
  });
  
  test('Complete Full Registration Flow', async ({ page }) => {
    await test.step('Navigate to registration page', async () => {
      await registerPage.NavigateToRegisterPage(homePage);
    });
    
    await test.step('Complete Step 1: Account', async () => {
      const validData = testData.registration.api.validMentor;
      // Use simple email format without special characters
      const email = `${testId}${validData.Email.replace(/[^a-zA-Z0-9@.]/g, '')}`;  
      await registerPage.completeStep1Registration(email, validData.Password);
    });
    
    await test.step('Complete Step 2: Profile Setup', async () => {
      const validData = testData.registration.api.validMentor;
      const mentorProfileData = testData.registration.step2_profile_setup.profileData.mentor;
      
      await registerPage.completeStep2Profile({
        roleId: validData.Role,
        fullName: validData.FullName,
        bio: validData.Bio,
        goals: mentorProfileData.goals,
        experience: mentorProfileData.experience,
        skills: mentorProfileData.skills,
        communication: mentorProfileData.communication as Array<'text' | 'audio' | 'video'>,
        availability: mentorProfileData.availability as Array<'weekends' | 'weekdays' | 'mornings' | 'afternoons' | 'evenings'>
      });
    });
    
    await test.step('Complete Step 3: Preferences', async () => {
      const preferenceData = testData.registration.step3_preferences.preferenceData.complete;
      await registerPage.completeStep3Preferences({
        topics: preferenceData.topics,
        learningStyles: preferenceData.learningStyles as Array<'Visual' | 'Kinesthetic' | 'Auditory' | 'Reading/Writing'>,
        teachingApproaches: preferenceData.teachingApproaches as Array<'Hands-on Practice' | 'Project Based' | 'Lecture Style' | 'Discussion Base'>,
        sessionFrequency: preferenceData.sessionFrequency as 'Weekly' | 'Every two weeks' | 'Monthly' | 'As Needed',
        sessionDuration: preferenceData.sessionDuration as '30 minutes' | '45 minutes' | '1 hour' | '1.5 hours' | '2 hours',
        privacySettings: preferenceData.privacySettings
      });
    });
    
    await test.step('Verify successful registration', async () => {
      // Verify navigation to dashboard after successful registration
      await expect(page).toHaveURL(/.*dashboard/);
    });
  });
  
  test('Complete Step 1 of Registration Form', async ({ page }) => {
    await test.step('Navigate to registration page', async () => {
      await registerPage.NavigateToRegisterPage(homePage);
    });
    
    await test.step('Verify step 1 is displayed', async () => {
      await expect(page.getByText('Create an account')).toBeVisible();
    });

    await test.step('Complete Step 1 registration', async () => {
      const validData = testData.registration.api.validMentor;
      // Use simple email format without special characters
      const email = `${testId}${validData.Email.replace(/[^a-zA-Z0-9@.]/g, '')}`;  
      await registerPage.completeStep1Registration(email, validData.Password);
    });
    
    await test.step('Verify navigation to profile setup page', async () => {
      await expect(page.getByText('Create your profile')).toBeVisible();
    });
  });

  test('Step 1 Validation - Empty Form Fields', async ({ page }) => {
    await test.step('Navigate to registration page', async () => {
      await registerPage.NavigateToRegisterPage(homePage);
    });
    
    await test.step('Submit empty form', async () => {
      await registerPage.clickNextButton();
    });
    
    await test.step('Verify error messages', async () => {
      await registerPage.verifyEmptyEmailError();
      await registerPage.verifyPasswordError('Password must not be empty.');
      await registerPage.verifyTermsError('Please agree to the Terms of Service');
    });
  });

  test('Step 1 Navigation - Back to Login', async ({ page }) => {
    await test.step('Navigate to registration page', async () => {
      await registerPage.NavigateToRegisterPage(homePage);
    });
    
    await test.step('Click back to login button', async () => {
      await registerPage.clickBackToLogin();
    });
    
    await test.step('Verify navigation to login page', async () => {
      await expect(page).toHaveURL(/.*login/);
    });
  });

  test('Step 1 Terms and Privacy Policy Links', async ({ page }) => {
    await test.step('Navigate to registration page', async () => {
      await registerPage.NavigateToRegisterPage(homePage);
    });
    
    await test.step('Verify links are accessible', async () => {
      await registerPage.verifyTermsLinkAccessible();
      await registerPage.verifyPrivacyLinkAccessible();
    });
    
    await test.step('Test Terms of Service modal', async () => {
      await registerPage.clickTermsLink();
      await expect(page.getByRole('dialog')).toBeVisible();
      await registerPage.clickCloseButton();
    });
    
    await test.step('Test Privacy Policy modal', async () => {
      await registerPage.clickPrivacyLink();
      await expect(page.getByRole('dialog')).toBeVisible();
      await registerPage.clickCloseButton();
    });
  });
});