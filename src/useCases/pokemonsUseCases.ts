import { IFilters } from "../context/filters"
import { IPokemon } from "../mock"
import { APIService } from "../services/api/APIService"
import { JSONAPIService } from "../services/api/JSONAPIService"
import { GlobalStateService } from "../services/globalStateService"

const getTypes = async () => {
    const response = await APIService.getTypes({offset: 0}, {limit: 19});
    return response;
}

const filterLocals = async (filters:IFilters, localResponse:[]) => {
    let deleteLocalDuplicated;
    const localFilteredPokemons:any = [];
    let filteredByTypes;

    if(filters.types.length === 0){
        deleteLocalDuplicated = localResponse;
    }
    else{
        await Promise.all(filters.types.map(
            async type => {
                localResponse.map((pokemon:any) => {
                    if(pokemon.types.includes(type)){
                        localFilteredPokemons.push(pokemon);
                    }
                })
            }
        ));

        filteredByTypes = localFilteredPokemons.flat();

        deleteLocalDuplicated = filteredByTypes.reduce((total:any, pokemon:any) => {
            if(!total.some((p:any) => p.id === pokemon.id)){
                total.push(pokemon);
            }
            return total;
        }, []);
    }

    return deleteLocalDuplicated;
}

const filterAPI = async (filters:IFilters, APIResponse:IPokemon[], pageNumber:number, APILimit:number) => {
    let APIFilteredPokemons;
    let filteredByTypes;

    if(filters.types.length === 0){
        APIFilteredPokemons = APIResponse;
    }
    else{
        const responses = await Promise.all(filters.types.map(async type => APIService.getPokemonsByTypes("type/" + type)));
        filteredByTypes = responses.flat();

        const deleteAPIDuplicated = filteredByTypes.reduce((total, pokemon) => {
            if(!total.some((p:any) => p.id === pokemon.id)){
                total.push(pokemon);
            }
            return total;
        }, []);
        
        const APIPokemonsSlice = deleteAPIDuplicated.slice(0, APILimit);
        const APIPokemonsPages = Math.ceil(deleteAPIDuplicated.length/APILimit) * pageNumber;
        APIFilteredPokemons = pageNumber < APIPokemonsPages ? APIPokemonsSlice : deleteAPIDuplicated;
    }

    return APIFilteredPokemons;
}

const getAll = async (pageNumber:number, limit:number, filters:IFilters) => {
    if(pageNumber === 1 || limit === 20) GlobalStateService.setPokemons([])
    
    try{
        let filteredPokemons;

        const localResponse = await JSONAPIService.getLocalPokemons()

        const deleteLocalDuplicated = await filterLocals(filters, localResponse)

        const localPokemonsSlice = deleteLocalDuplicated.slice(0, limit);
        const localPokemonsPages = Math.ceil(deleteLocalDuplicated.length/limit) * pageNumber;
        const localFilteredPokemons = pageNumber < localPokemonsPages ? localPokemonsSlice : deleteLocalDuplicated;
        
        const APIOffset = localPokemonsPages > pageNumber ? -1 : 0
        let APIResponse = [];
        let APILimit = 0;
        
        if(filters.existence === "all"){
            APILimit = APIOffset >= 0 ? limit - localFilteredPokemons.length : 0
            APIResponse = await APIService.getPokemons({offset: APIOffset}, {limit: APILimit})

            const APIFilteredPokemons = await filterAPI(filters, APIResponse, pageNumber, APILimit);
            filteredPokemons = [...localFilteredPokemons, ...APIFilteredPokemons];
        }
        else if(filters.existence === "local"){
            filteredPokemons = localFilteredPokemons;
        }
        else if(filters.existence === "api"){
            APILimit = limit;
            APIResponse = await APIService.getPokemons({offset: 0}, {limit: APILimit});

            const APIFilteredPokemons = await filterAPI(filters, APIResponse, pageNumber, APILimit);
            filteredPokemons = APIFilteredPokemons;
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

export const PokemonUseCases = {getTypes, getAll, getPokemon, postPokemon}