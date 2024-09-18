import { Card } from '../../components/card';
import { SideContainer } from '../../components/side container';

function Home() {
    return (
      <>
        <SideContainer/>
        <div className='cardsContainer'>
          <Card id={parseInt("1")} name='Bulbasaur' image='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png' attackPoints={parseInt("1")}></Card>
          <Card id={parseInt("1")} name='Bulbasaur' image='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png' attackPoints={parseInt("1")}></Card>
          <Card id={parseInt("1")} name='Bulbasaur' image='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png' attackPoints={parseInt("1")}></Card>
          <Card id={parseInt("1")} name='Bulbasaur' image='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png' attackPoints={parseInt("1")}></Card>
          <Card id={parseInt("1")} name='Bulbasaur' image='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png' attackPoints={parseInt("1")}></Card>
          <Card id={parseInt("1")} name='Bulbasaur' image='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png' attackPoints={parseInt("1")}></Card>
          <Card id={parseInt("1")} name='Bulbasaur' image='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png' attackPoints={parseInt("1")}></Card>
          <Card id={parseInt("1")} name='Bulbasaur' image='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png' attackPoints={parseInt("1")}></Card>
        </div>
      </>
    )
  }
  
export default Home