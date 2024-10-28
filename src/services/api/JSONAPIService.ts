import { IPokemon } from "../../mock";
import { JSONAxiosInstance } from "./JSONAxiosInstance";

export let totalLocalPokemons:number;

const getLocalPokemones = async () => {
    try{
        const {data} = await JSONAxiosInstance.get('/pokemons');

        totalLocalPokemons = data.length
        
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
