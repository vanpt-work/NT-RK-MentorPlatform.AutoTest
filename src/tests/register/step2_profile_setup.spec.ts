import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { RegisterPage } from '../../pages/register-page';
import testData from './test-data.json';

test.describe('Step 2: Profile Setup Tests', () => {
  let homePage: HomePage;
  let registerPage: RegisterPage;
  
  // Generate a unique test ID to avoid data collisions
  const timestamp = Date.now();
  const testId = `test${timestamp}`;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registerPage = new RegisterPage(page);

    await test.step('Navigate to registration page', async () => {
      await registerPage.NavigateToRegisterPage(homePage);
    });
    
    await test.step('Complete Step 1 registration', async () => {
      const validData = testData.registration.api.validMentor;
      // Use simple email format without special characters
      const email = `${testId}${validData.Email.replace(/[^a-zA-Z0-9@.]/g, '')}`;   
      await registerPage.completeStep1Registration(
        email, 
        validData.Password
      );
    });
    
    await test.step('Verify profile setup page is displayed', async () => {
      await expect(page.getByText('Create your profile')).toBeVisible();
      await expect(page.getByText('Tell us more about yourself')).toBeVisible();
    });
  });

  test('Complete Step 2 Profile Setup with Learner Role', async ({ page }) => {
    await test.step('Get test data', async () => {
      const learnerData = testData.registration.api.validLearner;
      const learnerProfileData = testData.registration.step2_profile_setup.profileData.learner;
      
      await test.step('Fill profile with learner data', async () => {
        await registerPage.completeStep2Profile({
          roleId: learnerData.Role,
          fullName: learnerData.FullName,
          bio: learnerData.Bio,
          goals: learnerProfileData.goals,
          experience: learnerProfileData.experience,
          skills: learnerProfileData.skills,
          communication: learnerProfileData.communication as Array<'text' | 'audio' | 'video'>,
          availability: learnerProfileData.availability as Array<'weekends' | 'weekdays' | 'mornings' | 'afternoons' | 'evenings'>
        });
      });
    });
    
    await test.step('Verify navigation to preferences page', async () => {
      await expect(page.getByRole('heading', { name: 'Session Preferences' })).toBeVisible();
    });
  });
  
  test('Complete Step 2 Profile Setup with Mentor Role', async ({ page }) => {
    await test.step('Get test data', async () => {
      const mentorData = testData.registration.api.validMentor;
      const mentorProfileData = testData.registration.step2_profile_setup.profileData.mentor;
      
      await test.step('Fill profile with mentor data', async () => {
        await registerPage.completeStep2Profile({
          roleId: mentorData.Role,
          fullName: mentorData.FullName,
          bio: mentorData.Bio,
          goals: mentorProfileData.goals,
          experience: mentorProfileData.experience,
          skills: mentorProfileData.skills,
          communication: mentorProfileData.communication as Array<'text' | 'audio' | 'video'>,
          availability: mentorProfileData.availability as Array<'weekends' | 'weekdays' | 'mornings' | 'afternoons' | 'evenings'>
        });
      });
    });
    
    await test.step('Verify navigation to preferences page', async () => {
      await expect(page.getByRole('heading', { name: 'Session Preferences' })).toBeVisible();
    });
  });
  
  test('Validate Empty Full Name Error', async ({ page }) => {
    await test.step('Select role but leave name empty', async () => {
      await registerPage.selectRole(2); // Learner
      await registerPage.clickNextButton();
    });
    
    await test.step('Verify error message', async () => {
      await registerPage.verifyFullNameError('Full name must not be empty.');
    });
  });
  
  test('Validate Full Name Length Requirement', async ({ page }) => {
    await test.step('Enter too short name', async () => {
      await registerPage.selectRole(2); // Learner
      await registerPage.fillFullName('AB'); // Too short (needs to be 3-200 chars)
      await registerPage.clickNextButton();
    });
    
    await test.step('Verify length error message', async () => {
      await expect(page.getByText('Full name must be 3 - 200')).toBeVisible();
    });
  });
  
  test('Validate Required Fields for Step 2', async ({ page }) => {
    await test.step('Fill only required fields', async () => {
      await registerPage.selectRole(1); // Mentor
      await registerPage.fillFullName('Test User');
      await registerPage.fillBio('Test bio information');
      await registerPage.fillGoals('Learning goals');
      
      // Select at least one communication preference
      await registerPage.selectCommunicationPreference('text');
      
      // Select at least one availability
      await registerPage.selectAvailability('weekdays');
      
      // Submit the form
      await registerPage.clickNextButton();
    });
    
    await test.step('Verify successful navigation with minimal fields', async () => {
      await expect(page.getByRole('heading', { name: 'Session Preferences' })).toBeVisible();
    });
  });
});