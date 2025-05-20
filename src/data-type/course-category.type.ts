export interface CourseCategory {
    id: string;
    name: string;
    description: string;
    courseCount: number;
    isActive: boolean;
}

export interface CourseCategoryRequest {
    pageSize?: number;
    pageNumber?: number;
    search?: string;
}

export interface CreateCourseCategoryRequest {
    name: string;
    description: string;
    isActive: boolean;
}

export interface UpdateCourseCategoryRequest {
    name: string;
    description: string;
    isActive: boolean;
}