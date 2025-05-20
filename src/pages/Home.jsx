import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css"

function Home() {
    const [searchQuery, setsearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchMovies = async () => {
            try{
                const data = await getPopularMovies();
                setMovies(data);
                }catch(err){
                    console.log(err);
                    setError("failed to fetch movies");
                }
                finally{
                    setLoading(false);
                }
        }
        fetchMovies();
    },[]);

    //const movies= getPopularMovies();

    const handleSearch = async(e) => {
        e.preventDefault();
        if (searchQuery.trim() === "") {            
            return;
        }
        setLoading(true);
        try{
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        }catch(err){
            console.log(err);
            setError("failed to fetch movies");
        }finally{
            setLoading(false);
        }
        setsearchQuery("");
    }
  return (   
    <div className="home">
         <form onSubmit= {handleSearch}  className="search-form">
            <input 
            type="text" 
            placeholder="Search for a movie..."  
            className="search-input" 
            value ={searchQuery}
            onChange={(e) => setsearchQuery(e.target.value)} />
            <button type="submit" className="search-button">Search</button>
         </form>
         {error && <div className="error-message">{error}</div>}
        {/* {loading && <p className="loading">Loading...</p>} */}
        {loading ? <p className="loading">Loading...</p> :
        <div className="movies-grid">
            {movies.map(
                movie => 
                    movie.title.toLowerCase().startsWith(searchQuery) &&
                <MovieCard key={movie.id} movie={movie} />)}     
        </div>     
        }
        
        {error && <p className="error">{error}</p>} 
    </div>
  );
}

export default Home;