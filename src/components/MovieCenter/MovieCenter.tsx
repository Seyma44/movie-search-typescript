import React, { useState, useEffect } from 'react';
import MovieTable from '../MovieTable/MovieTable';
import { Input } from 'antd';
import './MovieCenter.scss';

const { Search } = Input;

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const API_URL = process.env.REACT_APP_API_URL;

const MovieCenter: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const searchMovies = async (title: string) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch movies. Status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format. Expected JSON.');
      }

      const data = await response.json();
      setMovies(Array.isArray(data.Search) ? data.Search : []);
      setSearchTerm(title);
      localStorage.setItem('lastSearchTerm', title);
    } catch (error) {
      console.error('Error fetching movies:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('lastSearchTerm');
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
      searchMovies(storedSearchTerm);
    }
  }, []); // Run only once on mount

  return (
    <div className="container">
      <div className='header'>Invent Movie</div>
      <div className="search">
        <Search
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={() => searchMovies(searchTerm)}
          enterButton
        />
      </div>
      {movies?.length > 0 ? <MovieTable movies={movies} /> : <div className="empty"><h2>No Movies found</h2></div>}
    </div>
  );
};

export default MovieCenter;
