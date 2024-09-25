import { DetailsCard } from "../../components/details card";

function Edit(){
    return(
        <>
            <main className="mainCenter">
                <DetailsCard
                    id={1}
                    name="Bulbasaur"
                    image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png"
                    types={[
                        { value: '#93d373', label: 'Planta' },
                        { value: '#b9c64d', label: 'Insecto' },
                        { value: '#86a6f3', label: 'Agua' },
                        { value: '#f39959', label: 'Fuego' },
                    ]}
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

export default Edit