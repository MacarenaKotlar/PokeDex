import { create } from "zustand"
import { IPokemon } from "../mock"

interface IInitialData {
    pokemons:IPokemon[]
}

const initialData:IInitialData = {
    pokemons:[]
}

const getPokemons = () => {
    return globalState(store => store.pokemons)
}

const setPokemons = (pokemons:IPokemon[]) => {
    globalState.setState(prev => ({
        ...prev,pokemons
    }))
}

const globalState = create(() => initialData)

export const GlobalStateService = {getPokemons, setPokemons}