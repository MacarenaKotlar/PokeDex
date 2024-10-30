import { IPokemon } from "../../mock";
import { JSONAxiosInstance } from "./JSONAxiosInstance";

const getLocalPokemonDetails = async (url:string) => {
    try{
        const {data} = await JSONAxiosInstance.get(url)
        return data;
    }

    catch(e:any){
        throw new Error(e.message)
    }
}

const getLocalPokemones = async () => {
    try{
        const {data} = await JSONAxiosInstance.get('/pokemons');
        
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

export const JSONAPIService = {getLocalPokemones, getLocalPokemonDetails, postPokemon}
