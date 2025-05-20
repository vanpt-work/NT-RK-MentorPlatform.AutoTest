import { request, APIResponse } from '@playwright/test';
import { ENDPOINTS } from '../../core/const/endpoint';
import { CourseCategory, CourseCategoryRequest, CreateCourseCategoryRequest, UpdateCourseCategoryRequest } from '../../data-type/course-category.type';

export class CourseCategoriesAPI {
    baseURL: string;
    
    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async getCategories(token: string, params?: CourseCategoryRequest): Promise<APIResponse> {
        const queryParams = new URLSearchParams();
        
        if (params?.pageSize) queryParams.append('PageSize', params.pageSize.toString());
        if (params?.pageNumber) queryParams.append('PageNumber', params.pageNumber.toString());
        if (params?.search) queryParams.append('Search', params.search);
        
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
        
        const context = await request.newContext({
            baseURL: this.baseURL,
            extraHTTPHeaders: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        return await context.get(`${ENDPOINTS.COURSE_CATEGORIES}${queryString}`);
    }

    async getCategoryById(token: string, id: string): Promise<APIResponse> {
        const context = await request.newContext({
            baseURL: this.baseURL,
            extraHTTPHeaders: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        return await context.get(ENDPOINTS.COURSE_CATEGORIES_BY_ID(id));
    }

    async createCategory(token: string, data: CreateCourseCategoryRequest): Promise<APIResponse> {
        const context = await request.newContext({
            baseURL: this.baseURL,
            extraHTTPHeaders: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        return await context.post(ENDPOINTS.COURSE_CATEGORIES, {
            data: data
        });
    }

    async updateCategory(token: string, id: string, data: UpdateCourseCategoryRequest): Promise<APIResponse> {
        const context = await request.newContext({
            baseURL: this.baseURL,
            extraHTTPHeaders: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        return await context.put(ENDPOINTS.COURSE_CATEGORIES_BY_ID(id), {
            data: data
        });
    }

    async deleteCategory(token: string, id: string): Promise<APIResponse> {
        const context = await request.newContext({
            baseURL: this.baseURL,
            extraHTTPHeaders: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        return await context.delete(ENDPOINTS.COURSE_CATEGORIES_BY_ID(id));
    }
}