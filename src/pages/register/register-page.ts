import { Page, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { HomePage } from './home-page';

export class RegisterPage extends BasePage {
  // Step 1 Form Fields
  private readonly step1Fields = {
    email: this.page.getByRole('textbox', { name: 'Email' }),
    password: this.page.getByRole('textbox', { name: 'Password', exact: true }),
    confirmPassword: this.page.getByRole('textbox', { name: 'Confirm Password' }),
    termsCheckbox: this.page.getByRole('checkbox', { name: 'I agree to the Terms of' })
  };

  // Step 2 Form Fields
  private readonly step2Fields = {
    // Basic Info
    fullName: this.page.getByRole('textbox', { name: 'Full Name' }),
    bio: this.page.getByRole('textbox', { name: 'Bio' }),
    uploadPhoto: this.page.getByRole('button', { name: 'Upload Photo' }),
    
    // Role Selection
    roleRadios: this.page.getByRole('radiogroup', { name: 'Role' }),
    mentorRole: this.page.getByRole('heading', { name: 'Mentor' }),
    learnerRole: this.page.getByRole('heading', { name: 'Learner' }),
    
    // Expertise & Skills
    goalsInput: this.page.getByRole('textbox', { name: 'Goals' }),
    experienceInput: this.page.getByRole('textbox', { name: 'Industry Experience' }),
    skillsInput: this.page.getByRole('textbox', { name: 'e.g. JavaScript, Project' }),
    
    // Communication & Availability
    textChatOption: this.page.getByText('Text Chat'),
    audioCallOption: this.page.getByText('Audio Call'),
    videoCallOption: this.page.getByText('Video Call'),
    weekendsOption: this.page.getByText('Weekends'),
    morningsOption: this.page.getByText('Mornings'),
    eveningsOption: this.page.getByText('Evenings'),
    afternoonsOption: this.page.getByText('Afternoons'),
    weekdaysOption: this.page.getByText('Weekdays'),
    
    // Preview elements
    avatarPreview: this.page.getByRole('img', { name: 'Avatar Preview' })
  };

  // Step 3 Preferences Fields
  private readonly step3Fields = {
    // Topic Selection
    topicsDropdown: this.page.getByRole('combobox').filter({ hasText: 'Select topics' }),
    topicSearchInput: this.page.getByRole('textbox', { name: 'Search topics...' }),
    
    // Learning Styles
    visualStyle: this.page.getByText('Visual'),
    auditoryStyle: this.page.getByText('Auditory'),
    readingWritingStyle: this.page.getByText('Reading/Writing'),
    kinestheticStyle: this.page.getByText('Kinesthetic'),
    
    // Teaching Approaches
    handsOnPractice: this.page.getByText('Hands-on Practice'),
    projectBased: this.page.getByText('Project Based'),
    lectureStyle: this.page.getByText('Lecture Style'),
    discussionBase: this.page.getByText('Discussion Base'),
    
    // Session Frequency
    frequencyDropdown: this.page.getByRole('combobox').filter({ hasText: 'Weekly' }),
    weeklyOption: this.page.getByRole('option', { name: 'Weekly' }),
    biweeklyOption: this.page.getByRole('option', { name: 'Every two weeks' }),
    monthlyOption: this.page.getByRole('option', { name: 'Monthly' }),
    asNeededOption: this.page.getByRole('option', { name: 'As Needed' }),
    
    // Session Duration
    durationDropdown: this.page.getByRole('combobox').filter({ hasText: 'hour' }),
    thirtyMinOption: this.page.getByRole('option', { name: '30 minutes' }),
    fortyFiveMinOption: this.page.getByRole('option', { name: '45 minutes' }),
    oneHourOption: this.page.getByRole('option', { name: '1 hour' }),
    oneHalfHourOption: this.page.getByRole('option', { name: '1.5 hours' }),
    twoHourOption: this.page.getByRole('option', { name: '2 hours' }),
    
    // Create Account Button
    createAccountButton: this.page.getByRole('button', { name: 'Create Account' })
  };
  
  // Privacy Settings Fields
  private readonly privacySettings = {
    profilePrivacyToggle: this.page.getByRole('checkbox', { name: 'Make my profile private' }),
    messageReceptionToggle: this.page.getByRole('checkbox', { name: 'Allow messages from other' }),
    emailNotificationsToggle: this.page.getByRole('checkbox', { name: 'Receive email notifications' }),
    expertiseList: this.page.getByRole('listbox', { name: 'Areas of Expertise' }),
    selectedExpertise: this.page.locator('[data-testid="selected-expertise"]')
  };

  // Navigation Buttons
  private readonly navigationButtons = {
    next: this.page.getByRole('button', { name: 'Next' }),
    backToLogin: this.page.getByRole('button', { name: 'Back to Login' }),
    close: this.page.getByRole('button', { name: 'Close' }),
    registerNow: this.page.getByRole('link', { name: 'Register Now' })
  };

  // Policy Links
  private readonly policyLinks = {
    terms: this.page.getByRole('button', { name: 'Terms of Service' }),
    privacy: this.page.getByRole('button', { name: 'Privacy Policy' })
  };

  // Page Elements
  private readonly pageElements = {
    stepTitle: this.page.getByRole('heading', { level: 2 }),
    submitCount: this.page.locator('[data-testid="submit-count"]'),
    navigationWarning: this.page.locator('[data-testid="navigation-warning"]'),
    errorMessage: this.page.locator('[data-testid="error-message"]')
  };

  // Error Messages
  private readonly errorMessages = {
    // Step 1 Errors
    invalidEmail: this.page.getByText('Please enter a valid email address'),
    emailLength: this.page.getByText('Email must be 8 - 50 characters.'),
    emailCharacters: this.page.getByText('Email contains invalid characters'),
    emailMaxLength: this.page.locator('[data-testid="error-message"]'),
    passwordComplexity: this.page.getByText('Password must include uppercase, lowercase, number & special character'),
    passwordMinLength: this.page.getByText('Password must be at least 8 characters'),
    passwordMissingUppercase: this.page.getByText('Password must include uppercase'),
    passwordMissingLowercase: this.page.getByText('Password must include lowercase'),
    passwordMissingNumber: this.page.getByText('Password must include numbers'),
    passwordMissingSpecial: this.page.getByText('Password must include special characters'),
    passwordMismatch: this.page.getByText('Passwords do not match'),
    emptyPassword: this.page.getByText('Please enter a password'),
    termsAgreement: this.page.getByText('Please agree to the Terms of Service'),
    duplicateEmail: this.page.getByText('Email is already registered'),
    networkTimeout: this.page.getByText('Request timeout. Please try again.'),
    serverError: this.page.getByText('Server error. Please try again later.'),

    // Step 2 Errors
    emptyFullName: this.page.getByText('Full name must not be empty.'),
    fullNameLength: this.page.getByText('Full name must be 3 - 200'),
    roleRequired: this.page.getByText('Please select a role'),
    invalidAvatar: this.page.getByText('Please upload a valid image file')
  };

  constructor(page: Page) {
    super(page);
  }

  // Common Methods
  async clickNextButton(): Promise<void> {
    await this.navigationButtons.next.click();
  }

  async clickBackToLogin(): Promise<void> {
    await this.navigationButtons.backToLogin.click();
  }

  async verifyCurrentStep(expectedStep: string): Promise<void> {
    if (expectedStep.includes('Profile')) {
      await expect(this.page.getByText('Create your profile')).toBeVisible();
    } else if (expectedStep.includes('Preferences')) {
      await expect(this.page.getByRole('heading', { name: 'Session Preferences' })).toBeVisible();
    } else {
      await expect(this.pageElements.stepTitle).toHaveText(expectedStep);
    }
  }

  async waitForStepTransition(toStep: string): Promise<void> {
    // Check for validation errors that might block transition
    const emailError = this.page.getByText('Email is invalid');
    if (await emailError.isVisible()) {
      throw new Error('Email validation error prevented step transition');
    }
    
    // Then check for expected elements based on step
    if (toStep.includes('Profile')) {
      await expect(this.page.getByText('Create your profile')).toBeVisible({ timeout: 5000 });
    } else if (toStep.includes('Preferences')) {
      await expect(this.page.getByRole('heading', { name: 'Session Preferences' })).toBeVisible({ timeout: 5000 });
    } else {
      await expect(this.pageElements.stepTitle).toHaveText(toStep, { timeout: 5000 });
    }
  }

  // Cleanup Methods
  async clearFormInputs(): Promise<void> {
    await this.step1Fields.email.clear();
    await this.step1Fields.password.clear();
    await this.step1Fields.confirmPassword.clear();
    await this.step1Fields.termsCheckbox.uncheck();
  }

  // Navigation Methods
  async NavigateToRegisterPage(homePage: HomePage): Promise<void> {
    await homePage.goto('');
    await homePage.clickRegisterNow();
  }

  // Step 1 Methods
  async fillEmail(email: string): Promise<void> {
    await this.step1Fields.email.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.step1Fields.password.fill(password);
  }

  async fillConfirmPassword(confirmPassword: string): Promise<void> {
    await this.step1Fields.confirmPassword.fill(confirmPassword);
  }

  async checkTermsCheckbox(): Promise<void> {
    await this.step1Fields.termsCheckbox.check();
  }

  async unCheckTermsCheckbox(): Promise<void> {
    await this.step1Fields.termsCheckbox.uncheck();
  }

  // Enhanced Validation Methods
  async verifyEmailPlaceholder(expectedPlaceholder: string): Promise<void> {
    await expect(this.step1Fields.email).toHaveAttribute('placeholder', expectedPlaceholder);
  }

  async verifyEmptyEmailField(): Promise<void> {
    await expect(this.step1Fields.email).toHaveValue('');
  }

  async verifyInvalidEmailError(): Promise<void> {
    await expect(this.errorMessages.invalidEmail).toBeVisible();
  }

  async verifyEmptyEmailError(): Promise<void> {
    await expect(this.page.getByText('Email must not be empty.')).toBeVisible();
  }

  async verifyEmailError(expectedError: string): Promise<void> {
    switch (expectedError) {
      case 'Email must not exceed 255 characters':
        await expect(this.errorMessages.emailMaxLength).toBeVisible();
        await expect(this.errorMessages.emailMaxLength).toHaveText(expectedError);
        break;
      case 'Email contains invalid characters':
        await expect(this.errorMessages.emailCharacters).toBeVisible();
        break;
      default:
        throw new Error(`Unexpected email error message: ${expectedError}`);
    }
  }

  async verifyEmailLengthError(): Promise<void> {
    await expect(this.errorMessages.emailLength).toBeVisible();
  }

  async verifyDuplicateEmailError(expectedMessage: string): Promise<void> {
    await expect(this.errorMessages.duplicateEmail).toBeVisible();
    await expect(this.errorMessages.duplicateEmail).toHaveText(expectedMessage);
  }

  async verifyPasswordError(expectedError: string): Promise<void> {
    switch (expectedError) {
      case 'Please enter a password':
      case 'Password must not be empty.':
        await expect(this.errorMessages.emptyPassword).toBeVisible();
        break;
      case 'Password must be at least 8 characters':
        await expect(this.errorMessages.passwordMinLength).toBeVisible();
        break;
      case 'Password must include uppercase':
        await expect(this.errorMessages.passwordMissingUppercase).toBeVisible();
        break;
      case 'Password must include lowercase':
        await expect(this.errorMessages.passwordMissingLowercase).toBeVisible();
        break;
      case 'Password must include numbers':
        await expect(this.errorMessages.passwordMissingNumber).toBeVisible();
        break;
      case 'Password must include special characters':
        await expect(this.errorMessages.passwordMissingSpecial).toBeVisible();
        break;
      case 'Passwords do not match':
        await expect(this.errorMessages.passwordMismatch).toBeVisible();
        break;
      default:
        throw new Error(`Unexpected password error message: ${expectedError}`);
    }
  }

  async verifyTermsError(expectedError: string): Promise<void> {
    await expect(this.errorMessages.termsAgreement).toBeVisible();
    await expect(this.errorMessages.termsAgreement).toHaveText(expectedError);
  }

  // Network Error Methods
  async verifyNetworkError(expectedError: string): Promise<void> {
    await expect(this.pageElements.errorMessage).toHaveText(expectedError);
  }

  async verifyNetworkTimeout(): Promise<void> {
    await expect(this.errorMessages.networkTimeout).toBeVisible();
  }

  async verifyServerError(): Promise<void> {
    await expect(this.errorMessages.serverError).toBeVisible();
  }

  // Edge Case Methods
  async verifySubmitCount(count: string): Promise<void> {
    await expect(this.pageElements.submitCount).toHaveText(count);
  }

  async verifyNavigationWarning(): Promise<void> {
    await expect(this.pageElements.navigationWarning).toBeVisible();
  }

  // Form Fill Helper Methods
  async fillValidForm(): Promise<void> {
    const validData = {
      email: 'valid@example.com',
      password: 'ValidP@ss123'
    };
    await this.fillEmail(validData.email);
    await this.fillPassword(validData.password);
    await this.fillConfirmPassword(validData.password);
    await this.checkTermsCheckbox();
  }

  // Rest of the existing methods remain unchanged...
  async verifyTermsLinkAccessible(): Promise<void> {
    await expect(this.policyLinks.terms).toBeVisible();
    await expect(this.policyLinks.terms).toBeEnabled();
  }

  async verifyPrivacyLinkAccessible(): Promise<void> {
    await expect(this.policyLinks.privacy).toBeVisible();
    await expect(this.policyLinks.privacy).toBeEnabled();
  }
  
  async clickTermsLink(): Promise<void> {
    await this.policyLinks.terms.click();
  }
  
  async clickPrivacyLink(): Promise<void> {
    await this.policyLinks.privacy.click();
  }
  
  async clickCloseButton(): Promise<void> {
    await this.navigationButtons.close.click();
  }

  // Basic Info Methods
  async fillFullName(fullName: string): Promise<void> {
    await this.step2Fields.fullName.fill(fullName);
  }
  
  async fillBio(bio: string): Promise<void> {
    await this.step2Fields.bio.fill(bio);
  }

  // Role Selection Methods
  async selectRole(roleId: number): Promise<void> {
    switch (roleId) {
      case 1:
        await this.step2Fields.mentorRole.click();
        break;
      case 2:
        await this.step2Fields.learnerRole.click();
        break;
      default:
        throw new Error(`Invalid role ID: ${roleId}`);
    }
  }

  async verifySelectedRole(roleId: number): Promise<void> {
    switch (roleId) {
      case 1:
        await expect(this.step2Fields.mentorRole).toBeChecked();
        break;
      case 2:
        await expect(this.step2Fields.learnerRole).toBeChecked();
        break;
    }
  }

  async verifyRoleOptions(roles: Array<{ id: number; name: string }>): Promise<void> {
    for (const role of roles) {
      switch (role.id) {
        case 1:
          await expect(this.step2Fields.mentorRole).toBeVisible();
          await expect(this.step2Fields.mentorRole).toBeEnabled();
          break;
        case 2:
          await expect(this.step2Fields.learnerRole).toBeVisible();
          await expect(this.step2Fields.learnerRole).toBeEnabled();
          break;
      }
    }
  }

  async verifyRoleError(expectedError: string): Promise<void> {
    await expect(this.errorMessages.roleRequired).toBeVisible();
    await expect(this.errorMessages.roleRequired).toHaveText(expectedError);
  }
  
  // Expertise & Skills Methods
  async fillGoals(goals: string): Promise<void> {
    await this.step2Fields.goalsInput.fill(goals);
  }
  
  async fillExperience(experience: string): Promise<void> {
    await this.step2Fields.experienceInput.fill(experience);
  }
  
  async fillSkills(skills: string): Promise<void> {
    await this.step2Fields.skillsInput.fill(skills);
  }
  
  // Communication Preferences
  async selectCommunicationPreference(preference: 'text' | 'audio' | 'video'): Promise<void> {
    switch (preference) {
      case 'text':
        await this.step2Fields.textChatOption.click();
        break;
      case 'audio':
        await this.step2Fields.audioCallOption.click();
        break;
      case 'video':
        await this.step2Fields.videoCallOption.click();
        break;
    }
  }
  
  // Availability Preferences
  async selectAvailability(timeSlot: 'weekends' | 'weekdays' | 'mornings' | 'afternoons' | 'evenings'): Promise<void> {
    switch (timeSlot) {
      case 'weekends':
        await this.step2Fields.weekendsOption.click();
        break;
      case 'weekdays':
        await this.step2Fields.weekdaysOption.click();
        break;
      case 'mornings':
        await this.step2Fields.morningsOption.click();
        break;
      case 'afternoons':
        await this.step2Fields.afternoonsOption.click();
        break;
      case 'evenings':
        await this.step2Fields.eveningsOption.click();
        break;
    }
  }

  async verifyFullNameError(expectedError: string): Promise<void> {
    await expect(this.errorMessages.emptyFullName).toBeVisible();
    await expect(this.errorMessages.emptyFullName).toHaveText(expectedError);
  }

  async uploadPhoto(filePath: string): Promise<void> {
    // Click the upload button first
    await this.step2Fields.uploadPhoto.click();
    
    // Then set the file input - we need to locate this input element first
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);
  }

  async verifyAvatarPreview(): Promise<void> {
    await expect(this.step2Fields.avatarPreview).toBeVisible();
  }

  async verifyAvatarError(expectedError: string): Promise<void> {
    await expect(this.errorMessages.invalidAvatar).toBeVisible();
    await expect(this.errorMessages.invalidAvatar).toHaveText(expectedError);
  }

  async verifyPrivacyDefaults(defaults: { isProfilePrivate: boolean; allowMessages: boolean; emailNotifications: boolean }): Promise<void> {
    await expect(this.privacySettings.profilePrivacyToggle).toBeChecked({ checked: defaults.isProfilePrivate });
    await expect(this.privacySettings.messageReceptionToggle).toBeChecked({ checked: defaults.allowMessages });
    await expect(this.privacySettings.emailNotificationsToggle).toBeChecked({ checked: defaults.emailNotifications });
  }

  // Step 3 Methods - Topic Selection
  async selectTopic(topic: string): Promise<void> {
    await this.step3Fields.topicsDropdown.click();
    await this.step3Fields.topicSearchInput.fill(topic);
    await this.page.getByText(topic).first().click();
  }
  
  // Step 3 Methods - Learning Styles
  async selectLearningStyle(style: 'Visual' | 'Auditory' | 'Reading/Writing' | 'Kinesthetic'): Promise<void> {
    switch (style) {
      case 'Visual':
        await this.step3Fields.visualStyle.click();
        break;
      case 'Auditory':
        await this.step3Fields.auditoryStyle.click();
        break;
      case 'Reading/Writing':
        await this.step3Fields.readingWritingStyle.click();
        break;
      case 'Kinesthetic':
        await this.step3Fields.kinestheticStyle.click();
        break;
    }
  }
  
  // Step 3 Methods - Teaching Approaches
  async selectTeachingApproach(approach: 'Hands-on Practice' | 'Project Based' | 'Lecture Style' | 'Discussion Base'): Promise<void> {
    switch (approach) {
      case 'Hands-on Practice':
        await this.step3Fields.handsOnPractice.click();
        break;
      case 'Project Based':
        await this.step3Fields.projectBased.click();
        break;
      case 'Lecture Style':
        await this.step3Fields.lectureStyle.click();
        break;
      case 'Discussion Base':
        await this.step3Fields.discussionBase.click();
        break;
    }
  }
  
  // Step 3 Methods - Session Frequency
  async selectSessionFrequency(frequency: 'Weekly' | 'Every two weeks' | 'Monthly' | 'As Needed'): Promise<void> {
    await this.step3Fields.frequencyDropdown.click();
    switch (frequency) {
      case 'Weekly':
        await this.step3Fields.weeklyOption.click();
        break;
      case 'Every two weeks':
        await this.step3Fields.biweeklyOption.click();
        break;
      case 'Monthly':
        await this.step3Fields.monthlyOption.click();
        break;
      case 'As Needed':
        await this.step3Fields.asNeededOption.click();
        break;
    }
  }
  
  // Step 3 Methods - Session Duration
  async selectSessionDuration(duration: '30 minutes' | '45 minutes' | '1 hour' | '1.5 hours' | '2 hours'): Promise<void> {
    await this.step3Fields.durationDropdown.click();
    switch (duration) {
      case '30 minutes':
        await this.step3Fields.thirtyMinOption.click();
        break;
      case '45 minutes':
        await this.step3Fields.fortyFiveMinOption.click();
        break;
      case '1 hour':
        await this.step3Fields.oneHourOption.click();
        break;
      case '1.5 hours':
        await this.step3Fields.oneHalfHourOption.click();
        break;
      case '2 hours':
        await this.step3Fields.twoHourOption.click();
        break;
    }
  }
  
  // Step 3 Methods - Privacy settings
  async clickCreateAccount(): Promise<void> {
    await this.step3Fields.createAccountButton.click();
  }
  
  async setProfilePrivacy(makePrivate: boolean): Promise<void> {
    if (makePrivate) {
      await this.privacySettings.profilePrivacyToggle.check();
    } else {
      await this.privacySettings.profilePrivacyToggle.uncheck();
    }
  }

  async verifyProfilePrivacy(isPrivate: boolean): Promise<void> {
    await expect(this.privacySettings.profilePrivacyToggle).toBeChecked({ checked: isPrivate });
  }

  async setMessageReception(allow: boolean): Promise<void> {
    if (allow) {
      await this.privacySettings.messageReceptionToggle.check();
    } else {
      await this.privacySettings.messageReceptionToggle.uncheck();
    }
  }

  async verifyMessageReception(allowed: boolean): Promise<void> {
    await expect(this.privacySettings.messageReceptionToggle).toBeChecked({ checked: allowed });
  }

  async setEmailNotifications(enable: boolean): Promise<void> {
    if (enable) {
      await this.privacySettings.emailNotificationsToggle.check();
    } else {
      await this.privacySettings.emailNotificationsToggle.uncheck();
    }
  }

  async verifyEmailNotifications(enabled: boolean): Promise<void> {
    await expect(this.privacySettings.emailNotificationsToggle).toBeChecked({ checked: enabled });
  }

  async selectExpertise(expertiseId: string): Promise<void> {
    await this.privacySettings.expertiseList.getByTestId(expertiseId).click();
  }

  async verifySelectedExpertise(expertiseIds: string[]): Promise<void> {
    for (const id of expertiseIds) {
      await expect(this.privacySettings.selectedExpertise.getByTestId(id)).toBeVisible();
    }
  }

  async fillRegistrationForm(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillConfirmPassword(password);
    await this.checkTermsCheckbox();
  }

  async submitRegistration(email: string, password: string): Promise<void> {
    await this.fillRegistrationForm(email, password);
    await this.clickNextButton();
  }

  // Step 1 Complete Registration Flow
  async completeStep1Registration(email: string, password: string): Promise<void> {
    // Fill out all required fields for step 1
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillConfirmPassword(password);
    await this.checkTermsCheckbox();
    
    // Submit the form
    await this.clickNextButton();
    
    // Wait a moment for any error messages to appear
    await this.page.waitForTimeout(500);
    
    // Check for email validation errors
    const emailError = this.page.getByText('Email is invalid');
    if (await emailError.isVisible()) {
      throw new Error(`Invalid email format: ${email}`);
    }
    
    // Wait for transition to Step 2
    await this.waitForStepTransition('Step 2: Profile');
  }
  
  // Step 2 Complete Profile Setup Flow
  async completeStep2Profile(profileData: {
    roleId: number,
    fullName: string,
    bio: string,
    photoPath?: string,
    goals: string,
    experience: string,
    skills: string,
    communication: Array<'text' | 'audio' | 'video'>,
    availability: Array<'weekends' | 'weekdays' | 'mornings' | 'afternoons' | 'evenings'>
  }): Promise<void> {
    // Select role (learner or mentor)
    await this.selectRole(profileData.roleId);
    
    // Fill basic info
    await this.fillFullName(profileData.fullName);
    await this.fillBio(profileData.bio);
    
    // Upload photo if provided
    if (profileData.photoPath) {
      await this.uploadPhoto(profileData.photoPath);
    }
    
    // Fill expertise and skills
    await this.fillGoals(profileData.goals);
    await this.fillExperience(profileData.experience);
    await this.fillSkills(profileData.skills);
    
    // Select communication preferences
    for (const preference of profileData.communication) {
      await this.selectCommunicationPreference(preference);
    }
    
    // Select availability
    for (const timeSlot of profileData.availability) {
      await this.selectAvailability(timeSlot);
    }
    
    // Submit the form
    await this.clickNextButton();
    
    // Wait for transition to Step 3
    await this.waitForStepTransition('Step 3: Preferences');
  }
  
  // Step 3 Complete Preferences Flow
  async completeStep3Preferences(preferencesData: {
    topics: string[],
    learningStyles: Array<'Visual' | 'Auditory' | 'Reading/Writing' | 'Kinesthetic'>,
    teachingApproaches: Array<'Hands-on Practice' | 'Project Based' | 'Lecture Style' | 'Discussion Base'>,
    sessionFrequency: 'Weekly' | 'Every two weeks' | 'Monthly' | 'As Needed',
    sessionDuration: '30 minutes' | '45 minutes' | '1 hour' | '1.5 hours' | '2 hours',
    privacySettings: {
      makeProfilePrivate: boolean,
      allowMessages: boolean,
      receiveEmailNotifications: boolean
    }
  }): Promise<void> {
    // Select topics of interest
    for (const topic of preferencesData.topics) {
      await this.selectTopic(topic);
    }
    
    // Select learning styles
    for (const style of preferencesData.learningStyles) {
      await this.selectLearningStyle(style);
    }
    
    // Select teaching approaches
    for (const approach of preferencesData.teachingApproaches) {
      await this.selectTeachingApproach(approach);
    }
    
    // Select session frequency and duration
    await this.selectSessionFrequency(preferencesData.sessionFrequency);
    await this.selectSessionDuration(preferencesData.sessionDuration);
    
    // Configure privacy settings
    await this.setProfilePrivacy(preferencesData.privacySettings.makeProfilePrivate);
    await this.setMessageReception(preferencesData.privacySettings.allowMessages);
    await this.setEmailNotifications(preferencesData.privacySettings.receiveEmailNotifications);
    
    // Create account
    await this.clickCreateAccount();
    
    // Wait for account creation to complete and redirect to dashboard
    await this.page.waitForURL(/.*dashboard/, { timeout: 10000 });
  }
}
