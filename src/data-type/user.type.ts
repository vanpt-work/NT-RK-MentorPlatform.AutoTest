export interface RegisterUserRequest {
    Email: string;
    Password: string;
    AvatarUrl?: string;
    FullName: string;
    Role: number;
    Bio?: string;
    Expertises?: string[];
    ProfessionalSkill?: string;
    Experience?: string;
    CommunicationPreference?: number;
    Goals?: string;
    Availability?: number[];
    CourseCategoryIds?: string[];
    SessionFrequency?: number;
    Duration?: number;
    LearningStyle?: number;
    TeachingStyles?: number[];
}