import { IPokemon } from "../mock"
import { APIService } from "../services/api/APIService"
import { JSONAPIService } from "../services/api/JSONAPIService"
import { GlobalStateService } from "../services/globalStateService"

const getLocalPokemons = async () => {
    try{
        const localResponse = await JSONAPIService.getLocalPokemones()
        GlobalStateService.setPokemons(localResponse)
    }
    catch(e:any){
        console.log(e)
    }
}

const getPokemons = async (pageNumber:number, limit:number) => {
    try{
        const localResponse = await JSONAPIService.getLocalPokemones()

        const localPokemonsSlice = localResponse.slice(0, limit)
        const localPokemonsPages = Math.ceil(localResponse.length/limit)
        const localPokemons = pageNumber <= localPokemonsPages ? localPokemonsSlice : localResponse

        const APIOffset = localPokemonsPages >= pageNumber ? -1 : 0
        const APILimit = APIOffset >= 0 ? limit - localResponse.length : 0
        
        const response = await APIService.getPokemones({offset: APIOffset}, {limit: APILimit})
        
        GlobalStateService.setPokemons([...localPokemons, ...response])
    }
    catch(e:any){
        console.log(e)
    }
}

const getPokemon = async (source?:string, id?:string) => {
    let fetch
    if (source && id) {
        source === 'local'
        ?
            fetch = await JSONAPIService.getLocalPokemonDetails('pokemons/' + id)
        :
            source === 'api'
            ?
                fetch = await APIService.getPokemonDetails('pokemon/' + id)
            :
                fetch = null
                
        fetch === null && console.log("No se encontró el Pokémon");
        
        return fetch;
    }
    else{
        console.log("No se encontró el Pokémon");
    }
}

const postPokemon = async (pokemon:IPokemon) => {
    try {
        await JSONAPIService.postPokemon(pokemon)
    } catch (error) {
        console.log(error)
    }
}

export const PokemonUseCases = {getLocalPokemons, getPokemons, getPokemon, postPokemon}