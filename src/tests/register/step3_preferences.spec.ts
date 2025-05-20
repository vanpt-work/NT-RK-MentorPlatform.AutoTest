import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { RegisterPage } from '../../pages/register-page';
import testData from './test-data.json';

test.describe('Step 3: Preferences Setup Tests', () => {
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
    
    await test.step('Complete Step 2 profile setup', async () => {
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
    
    await test.step('Verify preferences page is displayed', async () => {
      await expect(page.getByRole('heading', { name: 'Session Preferences' })).toBeVisible();
    });
  });

  test('Complete Step 3 Preferences Setup', async ({ page }) => {
    await test.step('Fill out preferences form', async () => {
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
    
    await test.step('Verify navigation to dashboard', async () => {
      await expect(page).toHaveURL(/.*dashboard/);
    });
  });
  
  test.describe('Learning and Teaching Preferences', () => {
    test('Verify All Learning Styles Options', async ({ page }) => {
      await test.step('Select each learning style option', async () => {
        const learningStyles = testData.registration.step3_preferences.preferenceData.options.learningStyles;
        for (const style of learningStyles) {
          await registerPage.selectLearningStyle(style as 'Visual' | 'Auditory' | 'Reading/Writing' | 'Kinesthetic');
        }
      });
    });
    
    test('Verify All Teaching Approaches', async ({ page }) => {
      await test.step('Select each teaching approach', async () => {
        const approaches = testData.registration.step3_preferences.preferenceData.options.teachingApproaches;
        for (const approach of approaches) {
          await registerPage.selectTeachingApproach(approach as 'Hands-on Practice' | 'Project Based' | 'Lecture Style' | 'Discussion Base');
        }
      });
    });
    
    test('Verify Session Frequency Options', async ({ page }) => {
      await test.step('Select each frequency option', async () => {
        const frequencies = testData.registration.step3_preferences.preferenceData.options.sessionFrequencies;
        for (const frequency of frequencies) {
          await registerPage.selectSessionFrequency(frequency as 'Weekly' | 'Every two weeks' | 'Monthly' | 'As Needed');
        }
      });
      
      await test.step('Verify final selection', async () => {
        const frequencies = testData.registration.step3_preferences.preferenceData.options.sessionFrequencies;
        const lastFrequency = frequencies[frequencies.length - 1];
        await expect(page.getByText(lastFrequency)).toBeVisible();
      });
    });
    
    test('Verify Session Duration Options', async ({ page }) => {
      await test.step('Select each duration option', async () => {
        const durations = testData.registration.step3_preferences.preferenceData.options.sessionDurations;
        for (const duration of durations) {
          await registerPage.selectSessionDuration(duration as '30 minutes' | '45 minutes' | '1 hour' | '1.5 hours' | '2 hours');
        }
      });
      
      await test.step('Verify final selection', async () => {
        const durations = testData.registration.step3_preferences.preferenceData.options.sessionDurations;
        const lastDuration = durations[durations.length - 1];
        await expect(page.getByText(lastDuration)).toBeVisible();
      });
    });
  });
  
  test.describe('Privacy Settings', () => {
    test('TS-311: Verify default privacy settings', async () => {
      await test.step('Check default settings', async () => {
        const defaults = testData.registration.step3_preferences.ui.defaults["TS-311"].testData;
        await registerPage.verifyPrivacyDefaults({
          isProfilePrivate: defaults.isProfilePrivate,
          allowMessages: defaults.allowMessages,
          emailNotifications: defaults.emailNotifications
        });
      });
    });

    test('TS-312: Configure profile privacy setting', async () => {
      await test.step('Toggle profile privacy', async () => {
        const privacyData = testData.registration.step3_preferences.ui.profilePrivacy["TS-312"].testData;
        await registerPage.setProfilePrivacy(privacyData.makePrivate);
        await registerPage.verifyProfilePrivacy(privacyData.expectedToggleState);

        await registerPage.setProfilePrivacy(!privacyData.makePrivate);
        await registerPage.verifyProfilePrivacy(!privacyData.expectedToggleState);
      });
    });

    test('TS-313: Configure message reception setting', async () => {
      await test.step('Toggle message reception', async () => {
        const messageData = testData.registration.step3_preferences.ui.messagePreferences["TS-313"].testData;
        await registerPage.setMessageReception(messageData.allowMessages);
        await registerPage.verifyMessageReception(messageData.expectedToggleState);

        await registerPage.setMessageReception(!messageData.allowMessages);
        await registerPage.verifyMessageReception(!messageData.expectedToggleState);
      });
    });

    test('TS-314: Configure email notification setting', async () => {
      await test.step('Toggle email notifications', async () => {
        const notificationData = testData.registration.step3_preferences.ui.notificationPreferences["TS-314"].testData;
        await registerPage.setEmailNotifications(notificationData.enableNotifications);
        await registerPage.verifyEmailNotifications(notificationData.expectedToggleState);

        await registerPage.setEmailNotifications(!notificationData.enableNotifications);
        await registerPage.verifyEmailNotifications(!notificationData.expectedToggleState);
      });
    });
  });

  // Valid Submission Test
  test('TS-320: Verify successful submission with privacy settings', async ({ request }) => {
    const validData = testData.registration.api.validMentor;
    
    await test.step('Submit complete registration form', async () => {
      // Set privacy settings
      await registerPage.setProfilePrivacy(validData.IsPrivateProfile);
      await registerPage.setMessageReception(validData.IsReceiveMessage);
      await registerPage.setEmailNotifications(validData.IsNotification);

      // Submit final step
      await registerPage.clickCreateAccount();

      // Create FormData for API verification
      const formData = new FormData();
      
      // Add fields
      formData.append('Email', validData.Email);
      formData.append('Password', validData.Password);
      formData.append('FullName', validData.FullName);
      formData.append('Role', validData.Role.toString());
      formData.append('IsPrivateProfile', validData.IsPrivateProfile.toString());
      formData.append('IsReceiveMessage', validData.IsReceiveMessage.toString());
      formData.append('IsNotification', validData.IsNotification.toString());
      
      // Add expertises for mentor
      if (validData.Role === 1) {
        for (const expertiseId of validData.Expertises) {
          formData.append('Expertises', expertiseId);
        }
      }

      // Verify response with API call
      const response = await request.post('/api/auth/register', {
        multipart: formData
      });

      // Verify response
      await expect(response.ok()).toBeTruthy();
      await expect(response.status()).toBe(200);
    });
  });
});