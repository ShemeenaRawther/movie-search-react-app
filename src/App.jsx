import { Routes , Route} from "react-router-dom";
import Home from "./pages/home";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";
import "./css/App.css";

function App() {
    return (
    <>   
    <MovieProvider>
      <NavBar />
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </main>
    </MovieProvider>
    </>
   
  )
}

export default App
