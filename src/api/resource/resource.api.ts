import { ENDPOINTS } from "@core/const/endpoint";
import { APIRequestContext } from "@playwright/test"
import { UserType } from "src/data-type/user.type";

export default class ResourceAPI {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request
    }

    async getResourceListing(params: any){
        const res = await this.request.get(ENDPOINTS.COURSE_CATEGORIES, { 
            params: params
         })
        return res
    }
    
    async getResourceDetailById(id: string){
        const res = await this.request.get(ENDPOINTS.COURSE_CATEGORIES, { params: id })
        return res
    }

    async postResource(data: any){
        const res = await this.request.post(ENDPOINTS.COURSE_CATEGORIES, {
            data: data
        })
        return res
    }

    async putResource(id: string, data: any){
        const res = await this.request.put(ENDPOINTS.COURSE_CATEGORIES_BY_ID(id), {
            data: data
        })
        return res
    }

    async deleteResource(id: string){
        const res = await this.request.delete(ENDPOINTS.COURSE_CATEGORIES_BY_ID(id))
        return res
    }
}