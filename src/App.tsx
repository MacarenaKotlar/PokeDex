import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./scss/_base.scss";
import { NavBar } from "./components/navbar";
import Home from "./screens/home";
import Details from "./screens/details";
import Edit from "./screens/edit";
import Creation from "./screens/creation";
import Favorites from "./screens/favorites";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/creation" element={<Creation />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <footer>Desarrollado por Macarena Kotlar</footer>
    </>
  );
}

export default App;
