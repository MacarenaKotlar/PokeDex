import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./scss/_base.scss";
import { NavBar } from "./components/navbar";
import Home from "./screens/home";
import Details from "./screens/details";
import Edit from "./screens/edit";
import Creation from "./screens/creation";
import Favorites from "./screens/favorites";
import { FiltersProvider } from "./context/filters";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <FiltersProvider>
              <Home />
            </FiltersProvider>
          }
        />
        <Route path="/detail/:source/:id" element={<Details />} />
        <Route path="/edit/:source/:id" element={<Edit />} />
        <Route path="/creation" element={<Creation />} />
        <Route
          path="/favorites"
          element={
            <FiltersProvider>
              <Favorites />
            </FiltersProvider>
          }
        />
      </Routes>
      <footer>Desarrollado por Macarena Kotlar</footer>
    </>
  );
}

export default App;
