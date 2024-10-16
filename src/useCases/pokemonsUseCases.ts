import { IPokemon } from "../mock"
import { APIService } from "../services/api/APIService"
import { JSONAPIService } from "../services/api/JSONAPIService"
import { GlobalStateService } from "../services/globalStateService"

const getPokemons = async () => {
    try{
        const response = await APIService.getPokemones({limit: 20})
        GlobalStateService.setPokemons(response)
    }
    catch(e:any){
        console.log(e)
    }
}

const postPokemon = async (pokemon:IPokemon) => {
    try {
        await JSONAPIService.postPokemon(pokemon)
    } catch (error) {
        console.log(error)
    }
}

export const PokemonUseCases = {getPokemons, postPokemon}