import { axiosInstance } from "./axiosInstance"

const getPokemones = async () => {
    try{
        const {data} = await axiosInstance.get('/pokemon')
        return data.response
    }

    catch(e:any){
        throw new Error(e.message)
    }
}

export const APIService = {getPokemones}
