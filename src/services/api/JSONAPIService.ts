import { IPokemon } from "../../mock";
import { JSONAxiosInstance } from "./JSONAxiosInstance";

const getLocalPokemones = async ({limit}:{limit?: number}) => {
    try{
        const {data} = await JSONAxiosInstance.get('/pokemons', {params: {
            limit
        }});
        
        return data;
    }

    catch(e:any){
        throw new Error(e.message);
    }
}

const postPokemon = async (pokemon:IPokemon) => {
    try {
        await JSONAxiosInstance.post('/pokemons', pokemon);
    } catch (error) {
        console.log(error);
    }
}

export const JSONAPIService = {getLocalPokemones, postPokemon}
