export interface IPokemon{
    
    id: number;
    name: string,
    types: string[];
    experience: number;
    attack: number;
    defence: number;
    speed: number;
    height: number;
    img: string;
    source: string;
}

export const listaPokemones:IPokemon[] = [
  {
    id: 2,
    name: "Ivysaur",
    types: ["Grass", "Poison"],
    experience: 142,
    attack: 62,
    defence: 63,
    speed: 60,
    height: 1.0,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    source: "https://pokeapi.co/api/v2/pokemon/2"
  },
  {
    id: 6,
    name: "Charizard",
    types: ["Fire", "Flying"],
    experience: 240,
    attack: 84,
    defence: 78,
    speed: 100,
    height: 1.7,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    source: "https://pokeapi.co/api/v2/pokemon/6"
  },
  {
    id: 9,
    name: "Blastoise",
    types: ["Water"],
    experience: 239,
    attack: 83,
    defence: 100,
    speed: 78,
    height: 1.6,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
    source: "https://pokeapi.co/api/v2/pokemon/9"
  },
  {
    id: 25,
    name: "Pikachu",
    types: ["Electric"],
    experience: 112,
    attack: 55,
    defence: 40,
    speed: 90,
    height: 0.4,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    source: "https://pokeapi.co/api/v2/pokemon/25"
  },
  {
    id: 150,
    name: "Mewtwo",
    types: ["Psychic"],
    experience: 306,
    attack: 110,
    defence: 90,
    speed: 130,
    height: 2.0,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
    source: "https://pokeapi.co/api/v2/pokemon/150"
  }
];