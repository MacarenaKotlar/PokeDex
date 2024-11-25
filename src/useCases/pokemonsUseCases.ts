import { IFilters } from "../context/filters"
import { IPokemon } from "../mock"
import { APIService } from "../services/api/APIService"
import { JSONAPIService } from "../services/api/JSONAPIService"
import { GlobalStateService } from "../services/globalStateService"

const getTypes = async () => {
    const response = await APIService.getTypes({offset: 0}, {limit: 19});
    return response;
}

const sortPokemons = async (pokemons:IPokemon[], sort:string) => {
    pokemons.sort((a:any, b:any) => {
        if(sort === "byID"){
            return parseInt(a.id) - parseInt(b.id);
        }

        else if(sort === "a-z"){
            return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
        }

        else if(sort === "z-a"){
            return b.name.toUpperCase().localeCompare(a.name.toUpperCase());
        }

        else if(sort === "byAttack"){
            return parseInt(a.attack) - parseInt(b.attack);
        }
        
        return 0;
    });

    return pokemons;
}

const filterLocals = async (filters:IFilters, localResponse:[]) => {
    let localFilteredPokemons:any = [];

    if(filters.types.length === 0){
        localFilteredPokemons = localResponse;
    }
    else{
        await Promise.all(filters.types.map(
            async type => {
                localResponse.map((pokemon:IPokemon) => {
                    if(pokemon.types.includes(type)){
                        localFilteredPokemons.push(pokemon);
                    }
                })
            }
        ));

        localFilteredPokemons = localFilteredPokemons.flat();

        const deleteLocalDuplicated = localFilteredPokemons.reduce((total:IPokemon[], pokemon:IPokemon) => {
            if(!total.some((p) => p.id === pokemon.id)){
                total.push(pokemon);
            }
            return total;
        }, []);

        localFilteredPokemons = deleteLocalDuplicated;
    }

    await sortPokemons(localFilteredPokemons, filters.sort);
    return localFilteredPokemons;
}

const filterAPI = async (filters:IFilters, APIResponse:IPokemon[], pageNumber:number, APILimit:number) => {
    let APIFilteredPokemons;
    let APIPokemonsSlice;

    if(filters.types.length === 0){
        APIFilteredPokemons = APIResponse;
    }
    else{
        const responses = await Promise.all(filters.types.map(async type => APIService.getPokemonsByTypes("type/" + type)));
        APIFilteredPokemons = responses.flat();

        const deleteAPIDuplicated = APIFilteredPokemons.reduce((total, pokemon) => {
            if(!total.some((p:IPokemon) => p.id === pokemon.id)){
                total.push(pokemon);
            }
            return total;
        }, []);

        APIPokemonsSlice = deleteAPIDuplicated.slice(0, APILimit);
        const APIPokemonsPages = Math.ceil(deleteAPIDuplicated.length/APILimit) * pageNumber;
        APIFilteredPokemons = pageNumber < APIPokemonsPages ? APIPokemonsSlice : deleteAPIDuplicated;
        if(filters.sort === "byID"){
            sortPokemons(APIFilteredPokemons, filters.sort);
        }
    }

    filters.sort !== "byID" && await sortPokemons(APIFilteredPokemons, filters.sort);
    return APIFilteredPokemons;
}

const filterPokemons = async (pageNumber: number, limit: number, filters: IFilters) => {
        try{
            let filteredPokemons;
    
            const localResponse = await JSONAPIService.getLocalPokemons();
    
            const localFilter = await filterLocals(filters, localResponse);
    
            const localPokemonsSlice = localFilter.slice(0, limit);
            const localPokemonsPages = Math.ceil(localFilter.length/limit) * pageNumber;
            const localFilteredPokemons = pageNumber < localPokemonsPages ? localPokemonsSlice : localFilter;
            
            const APIOffset = localPokemonsPages > pageNumber ? -1 : 0;
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
            
            return filteredPokemons;
        }
        catch(e:any){
            console.log(e)
        }
}

const getAll = async (pageNumber:number, limit:number, filters:IFilters) => {
    if(pageNumber === 1 || limit === 20) GlobalStateService.setPokemons([]);
    
    try {
        const pokemons = await filterPokemons(pageNumber, limit, filters);
        if(filters.search === ""){
            GlobalStateService.setPokemons(pokemons);
        }
        else{
            const searchedPokemons:IPokemon[] = [];

            pokemons.map((pokemon:IPokemon) => {
                if(pokemon.name.toLowerCase().includes(filters.search.toLowerCase())){
                    searchedPokemons.push(pokemon);
                }
                console.log(pokemon.name.toLowerCase().includes(filters.search.toLowerCase()));
            });

            GlobalStateService.setPokemons(searchedPokemons);
        }

    } catch (e:any) {
        console.log(e);
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

const editPokemon = async (pokemon:IPokemon) => {
    try {
        await JSONAPIService.editPokemon(pokemon)
    } catch (error) {
        console.log(error)
    }
}

const deletePokemon = async (pokemon:IPokemon) => {
    try {
        await JSONAPIService.deletePokemon(pokemon)
    } catch (error) {
        console.log(error)
    }
}

export const PokemonUseCases = {getTypes, filterPokemons, getAll, getPokemon, postPokemon, editPokemon, deletePokemon}