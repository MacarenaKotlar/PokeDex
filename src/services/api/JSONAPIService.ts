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

const getLocalPokemons = async () => {
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

const editPokemon = async (pokemon:IPokemon) => {
    try {
        await JSONAxiosInstance.put(`/pokemons/${pokemon.id}`, pokemon);
    } catch (error) {
        console.log(error);
    }
}

const deletePokemon = async (pokemon:IPokemon) => {
    try {
        await JSONAxiosInstance.delete(`/pokemons/${pokemon.id}`);
    } catch (error) {
        console.log(error);
    }
}

const getFavorites = async () => {
    try{
        const {data} = await JSONAxiosInstance.get('/favorites');
        return data;
    }

    catch(e:any){
        throw new Error(e.message);
    }
}

const postFavorite = async (pokemon:IPokemon) => {
    try {
        await JSONAxiosInstance.post('/favorites', pokemon);
    } catch (error) {
        console.log(error);
    }
}

const deleteFavorite = async (pokemon:IPokemon) => {
    try {
        await JSONAxiosInstance.delete(`/favorites/${pokemon.id}`);
    } catch (error) {
        console.log(error);
    }
}

export const JSONAPIService = {getLocalPokemons, getLocalPokemonDetails, postPokemon, editPokemon, deletePokemon, getFavorites, postFavorite, deleteFavorite}
