import './App.css';
import { useState, useEffect } from 'react';
import SearchIcon from './search.svg';
import Cards from './Cards';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const APi_URL = 'https://www.omdbapi.com/?apikey=7a2fbed8';

  const movie = {
    "Title": "Batman Begins",
    "Year": "2005",
    "imdbID": "tt0372784",
    "Type": 'movie',
    "Poster": 'N/A',
  };

  const searchmovies = async (title) => {
    const response = await fetch(`${APi_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchmovies('Batman');
  }, []);

  return (
    <div className="App">
      <h1>AyuMovies</h1>

      <div className="search">
        <input
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchmovies(searchTerm)} />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <Cards movie={movie}/>
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
