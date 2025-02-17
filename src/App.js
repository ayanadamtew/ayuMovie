import './App.css';
import { useState, useEffect } from 'react';
import SearchIcon from './search.svg';
import Cards from './Cards';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = 'https://www.omdbapi.com/?apikey=7a2fbed8';

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      // Check if data.Search exists and is an array
      setMovies(data.Search || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
    }
  };

  useEffect(() => {
    searchMovies('Batman');
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className="App">
      <h1>AyuMovies</h1>

      <div className="search">
        <input
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress} // Added Enter key support
        />
        <img 
          src={SearchIcon} 
          alt="search" 
          onClick={() => searchMovies(searchTerm)} 
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <Cards 
              key={movie.imdbID} // Added unique key prop
              movie={movie}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;