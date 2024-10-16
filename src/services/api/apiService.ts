import { IPokemon } from "../../mock"
import { axiosInstance } from "./axiosInstance"

function firstLetterToUpperCase(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getPokemonDetails = async (url: string): Promise<IPokemon> => {
    const { data } = await axiosInstance.get(url);

    return {
        id: data.id,
        name: firstLetterToUpperCase(data.name),
        types: data.types.map((t: any) => t.type.name),
        height: data.height,
        weight: data.weight,
        experience: data.base_experience,
        health: data.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0,
        attack: data.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0,
        defense: data.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0,
        speed: data.stats.find((s: any) => s.stat.name === 'speed')?.base_stat || 0,
        img: data.sprites.other['home'].front_default,
        source: 'api',
        evolutions: []
    }
}

const getPokemones = async ({limit}:{limit?: number}) => {
    try{
        const {data} = await axiosInstance.get('/pokemon/', {params: {
            limit
        }});

        const pokemons = await Promise.all(
            data.results.map((pokemon: any) => getPokemonDetails(pokemon.url))
        );
        
        return pokemons;
    }

    catch(e:any){
        throw new Error(e.message);
    }
}

export const APIService = {getPokemones}
