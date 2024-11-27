export interface IType {
  name: string;
  url: string;
}

interface IEvolution{
  name: string;
  img: string;
}

export interface IPokemon{
    id: string;
    name: string;
    types: string[];
    height: number;
    weight: number;
    experience: number;
    health: number;
    attack: number;
    defense: number;
    speed: number;
    img: string;
    source: string;
    evolutions: IEvolution[];
}
