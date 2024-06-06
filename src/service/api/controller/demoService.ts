import axios from "axios"
import { getRequest, postRequest } from "../provider"

export const urlEndpointInit = 'api'

export const getApiDemo = async(path:string, payload?:any, config?:object) => {
    try {
        const response  = await getRequest(`${urlEndpointInit}/${path}`, payload, config)
        if(!!!response || response.status === 500) throw new Error(`Failed to api! ,${response?.data?.message}`)
     
        return response
    } catch (error) {
        return error
    }
}

export const getApiSignIn = async(path:string, payload?:any, config?:object) => {
    try {
        const response  = await postRequest(`${urlEndpointInit}/${path}`, payload, config)
        if(!!!response || response.status === 500) throw new Error(`Failed to api! ,${response?.data?.message}`)
     
        return response
    } catch (error) {
        return error
    }
}

export const signInOtp = async(path:string, payload?:any, config?:object) => {
    try {
        const response  = await postRequest(`${urlEndpointInit}/${path}`, payload, config)
        if(!!!response || response.status === 500) throw new Error(`Failed to api! ,${response?.data?.message}`)
     
        return response
    } catch (error) {
        return error
    }
}

export const getApired = async(path:string, payload?:any, config?:object) => {
    try {
        const response  = await axios.get(`${path}?email=${payload?.email}`,{params:payload , headers:{}})
        return response
    } catch (error) {
        return error
    }
}