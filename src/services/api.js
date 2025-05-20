const API_KEY = "8b695373df7e797a76f465f973393bb0";
const API_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    //fetch is a built-in function in JavaScript that allows you to make network requests
    const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query) => {
    //fetch is a built-in function in JavaScript that allows you to make network requests
    const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
};