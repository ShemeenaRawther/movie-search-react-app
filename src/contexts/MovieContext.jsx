import { createContext,useState,useContext,useEffect, use } from "react";

const MovieContext = createContext();

export const useMovieContext = () => {
    return useContext(MovieContext);
}

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavourites = localStorage.getItem("favorites");
        if (storedFavourites) {
            setFavorites(JSON.parse(storedFavourites));
        }
    },[]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie) => {
        setFavorites(prevFavorites => [...prevFavorites, movie]);
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prevFavorites => prevFavorites.filter(movie => movie.id !== movieId));
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );  
}