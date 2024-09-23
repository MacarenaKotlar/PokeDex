import { DetailsCard } from "../../components/details card";

function Details(){
    return(
        <>
            <main className="mainCenter">
                <DetailsCard
                    id={1}
                    name="Bulbasaur"
                    image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png"
                    types={[
                        { value: '#93d373', label: 'Planta' },
                        { value: 'violet', label: 'Veneno' }]}
                    height={1}
                    weight={1}
                    healthPoints={1}
                    attackPoints={1}
                    defensePoints={1}
                    speedPoints={1}
                    evolutions={[
                        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png',
                        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png',
                        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/3.png']}
                />
            </main>
        </>
    )
}

export default Details