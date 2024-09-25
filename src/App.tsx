import { Route, Routes } from 'react-router-dom';
import './App.css';
import './scss/_base.scss';
import { NavBar } from './components/navbar';
import Home from './screens/home';
import Details from './screens/details';
import Edit from './screens/edit';

function App() {
  return(
    <>
      <header>
          <NavBar/>
      </header>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/details' element={<Details />} />
          <Route path='/edit' element={<Edit />} />
      </Routes>
      <footer>
        Desarrollado por Macarena Kotlar
      </footer>
    </>
  )
}

export default App
