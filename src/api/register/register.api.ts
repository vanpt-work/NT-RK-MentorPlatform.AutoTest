import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENDPOINTS } from '@core/const/endpoint';
import { RegisterUserRequest } from '../../data-type/user.type';

export default class RegisterAPI {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async register(userData: RegisterUserRequest, avatarFile?: Buffer): Promise<APIResponse> {
        const multipartData: Record<string, any> = {
            Email: userData.Email,
            Password: userData.Password,
            FullName: userData.FullName,
            Role: userData.Role.toString()
        };

        if (avatarFile) {
            multipartData.AvatarUrl = {
                name: 'avatar.jpg',
                mimeType: 'image/jpeg',
                buffer: avatarFile
            };
        }

        if (userData.Bio) multipartData.Bio = userData.Bio;
        
        if (userData.Expertises?.length) {
            multipartData.Expertises = userData.Expertises;
        }
        
        if (userData.ProfessionalSkill) multipartData.ProfessionalSkill = userData.ProfessionalSkill;
        if (userData.Experience) multipartData.Experience = userData.Experience;
        
        if (typeof userData.CommunicationPreference === 'number') {
            multipartData.CommunicationPreference = userData.CommunicationPreference.toString();
        }
        
        if (userData.Goals) multipartData.Goals = userData.Goals;
        
        if (userData.Availability?.length) {
            multipartData.Availability = userData.Availability.map(x => x.toString());
        }
        
        if (userData.CourseCategoryIds?.length) {
            multipartData.CourseCategoryIds = userData.CourseCategoryIds;
        }
        
        if (typeof userData.SessionFrequency === 'number') {
            multipartData.SessionFrequency = userData.SessionFrequency.toString();
        }
        
        if (typeof userData.Duration === 'number') {
            multipartData.Duration = userData.Duration.toString();
        }
        
        if (typeof userData.LearningStyle === 'number') {
            multipartData.LearningStyle = userData.LearningStyle.toString();
        }
        
        if (userData.TeachingStyles?.length) {
            multipartData.TeachingStyles = userData.TeachingStyles.map(x => x.toString());
        }        return await this.request.post(ENDPOINTS.REGISTER, {
            headers: {
                'Accept': '*/*'
            },
            multipart: multipartData
        });
    }
}