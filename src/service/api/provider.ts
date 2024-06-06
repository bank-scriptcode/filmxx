import axios from 'axios'

function createAxiosinstance (apiURL: string){
    return axios.create({
        baseURL: apiURL,
        headers: {
            'Content-Type': 'application/json',
        },
        insecureHTTPParser: true,
    })
}

export const getURL = (value: string) => {
    try {
        new URL(value)
        return value
    } catch (e) {
        return `/${value}`
    }
}

export const axiosClient =  createAxiosinstance(process.env.BASE_API_URL as string)

export const requestCreator = (config: object) => axiosClient({ ...config })

export const getRequest = (URL: string, params?: object ,headers? :object ) => axiosClient.get(getURL(URL), { params , headers }).then((res) => res).catch(err => err.response)
export const postRequest = (URL: string, payload?: object ,headers? :object ) => axiosClient.post(`/${URL}`, payload, { headers }).then((res) => res).catch(err => err.response)
export const patchRequest = (URL: string, payload?: object ,headers? :object ) => axiosClient.patch(`/${URL}`, payload, { headers }).then((res) => res).catch(err => err.response)
export const putRequest = (URL: string, payload?: object ,headers? :object ) => axiosClient.put(`/${URL}`, payload, { headers }).then((res) => res).catch(err => err.response)
export const deleteRequest = (URL: string, payload?: object ,headers? :object ) => axiosClient.delete(`/${URL}`, { data: payload, headers }).then((res) => res).catch(err => err.response)
