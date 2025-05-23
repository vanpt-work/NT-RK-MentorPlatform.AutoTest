import { ENDPOINTS } from "@core/const/endpoint";
import { APIRequestContext } from "@playwright/test"
import { UserType } from "src/data-type/user.type";

export default class CategoryAPI {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request
    }

    async getCourseListing(params: any){
        const res = await this.request.get(ENDPOINTS.COURSE_CATEGORIES, { 
            params: params
         })
        return res
    }
    
    async getCourseDetailById(id: string){
        const res = await this.request.get(ENDPOINTS.COURSE_CATEGORIES, { params: id })
        return res
    }

    async postCourse(data: any){
        const res = await this.request.post(ENDPOINTS.COURSE_CATEGORIES, {
            data: data
        })
        return res
    }

    async putCourse(id: string, data: any){
        const res = await this.request.put(ENDPOINTS.COURSE_CATEGORIES_BY_ID(id), {
            data: data
        })
        return res
    }

    async deleteCourse(id: string){
        const res = await this.request.delete(ENDPOINTS.COURSE_CATEGORIES_BY_ID(id))
        return res
    }
}