import { IPokemon } from "../mock"
import { APIService } from "../services/api/APIService"
import { JSONAPIService } from "../services/api/JSONAPIService"
import { GlobalStateService } from "../services/globalStateService"

const getAll = async (pageNumber:number, limit:number, filter:string) => {
    pageNumber === 1 && GlobalStateService.setPokemons([])

    try{
        let filteredPokemons

        const localResponse = await JSONAPIService.getLocalPokemons()
        const localPokemonsSlice = localResponse.slice(0, limit)
        const localPokemonsPages = Math.ceil(localResponse.length/limit) * pageNumber
        const localPokemons = pageNumber < localPokemonsPages ? localPokemonsSlice : localResponse

        if(filter === 'all'){
    
            const APIOffset = localPokemonsPages > pageNumber ? -1 : 0
            const APILimit = APIOffset >= 0 ? limit - localResponse.length : 0
            const APIResponse = await APIService.getPokemons({offset: APIOffset}, {limit: APILimit})

            filteredPokemons = [...localPokemons, ...APIResponse]
        }
        else if(filter === 'local'){
            filteredPokemons = localPokemons
        }
        else if(filter === 'api'){
            const APIResponse = await APIService.getPokemons({offset: 0}, {limit: limit})

            filteredPokemons = APIResponse
        }

        GlobalStateService.setPokemons(filteredPokemons)
    }
    catch(e:any){
        console.log(e)
    }
}

const getPokemon = async (source?:string, id?:string,) => {
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

export const PokemonUseCases = {getAll, getPokemon, postPokemon}