import { APIService } from "../services/api/apiService"
import { GlobalStateService } from "../services/globalStateService"

const getPokemons = async () => {
    try{
        const response = await APIService.getPokemones()
        GlobalStateService.setPokemons(response)
    }
    catch(e:any){
        console.log(e)
    }
}

export const PokemonUseCases = {getPokemons}