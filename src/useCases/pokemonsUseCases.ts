import { IPokemon } from "../mock"
import { APIService } from "../services/api/APIService"
import { JSONAPIService, totalLocalPokemons } from "../services/api/JSONAPIService"
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

const getPokemons = async (pageNumber:number, pageSize:number) => {
    try{
        const localResponse = await JSONAPIService.getLocalPokemones()
        const localPokemons = pageNumber < totalLocalPokemons ? localResponse.slice(0, pageNumber + pageSize) : localResponse

        console.log("totalLocalPokemons: ", totalLocalPokemons)

        const APIOffset = totalLocalPokemons >= pageNumber + pageSize ? -1 : 0
        const APILimit = APIOffset >= 0 ? pageNumber + pageSize - totalLocalPokemons : 0
        
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
        console.log("Fetch: ", fetch);
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