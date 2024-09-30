interface IEvolution{
  name: string;
  img: string;
}

export interface IPokemon{
    id: number;
    name: string,
    types: string[];
    height: number;
    weigth: number;
    experience: number;
    health: number
    attack: number;
    defence: number;
    speed: number;
    img: string;
    source: string;
    evolutions: IEvolution[];
}

export const listaPokemones:IPokemon[] = [
  {
    id: 1,
    name: "Bulbasaur",
    types: ["Grass", "Poison"],
    height: 7,
    weigth: 69,
    experience: 64,
    health: 45,
    attack: 49,
    defence: 49,
    speed: 45,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
    source: "https://pokeapi.co/api/v2/pokemon/1/",
    evolutions: [
      { name: "Bulbasaur", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png" },
      { name: "Ivysaur", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png" },
      { name: "Venusaur", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/3.png" }
    ]
  },
  {
    id: 2,
    name: "Ivysaur",
    types: ["Grass", "Poison"],
    height: 10,
    weigth: 130,
    experience: 142,
    health: 60,
    attack: 62,
    defence: 63,
    speed: 60,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png",
    source: "https://pokeapi.co/api/v2/pokemon/2/",
    evolutions: [
      { name: "Bulbasaur", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png" },
      { name: "Ivysaur", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png" },
      { name: "Venusaur", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/3.png" }
    ]
  },
  {
    id: 3,
    name: "Venusaur",
    types: ["Grass", "Poison"],
    height: 20,
    weigth: 1000,
    experience: 236,
    health: 80,
    attack: 82,
    defence: 83,
    speed: 80,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/3.png",
    source: "https://pokeapi.co/api/v2/pokemon/3/",
    evolutions: [
      { name: "Bulbasaur", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png" },
      { name: "Ivysaur", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png" },
      { name: "Venusaur", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/3.png" }
    ]
  },
  {
    id: 4,
    name: "Charmander",
    types: ["Fire"],
    height: 6,
    weigth: 85,
    experience: 62,
    health: 39,
    attack: 52,
    defence: 43,
    speed: 65,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png",
    source: "https://pokeapi.co/api/v2/pokemon/4/",
    evolutions: [
      { name: "Charmander", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png" },
      { name: "Charmeleon", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/5.png" },
      { name: "Charizard", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png" }
    ]
  },
  {
    id: 5,
    name: "Charmeleon",
    types: ["Fire"],
    height: 11,
    weigth: 190,
    experience: 142,
    health: 58,
    attack: 64,
    defence: 58,
    speed: 80,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/5.png",
    source: "https://pokeapi.co/api/v2/pokemon/5/",
    evolutions: [
      { name: "Charmander", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png" },
      { name: "Charmeleon", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/5.png" },
      { name: "Charizard", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png" }
    ]
  }
];