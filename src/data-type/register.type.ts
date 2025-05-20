interface UserRegister {
  email: string;
  password: string;
  avatarUrl: string;
  fullname: string;
  role: string;
  bio: string;
  isNotification: boolean;
  isReceiveMessage: boolean;
  isPrivateProfile: boolean;
  expertises: string[];
  professionalSkill: string;
  experience: string;
  communicationPreference: number;
  goals: string;
  availability: number[];
  courseCategoryIds: string[];
  sessionFrequency: number;
  duration: number;
  learningStyle: number;
  teachingStyles: number;
  status?: number;
  message?: string;
}
