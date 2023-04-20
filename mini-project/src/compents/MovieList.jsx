import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const fetchData = async (page, searchQuery) => {
    try {
      const response = await axios.get('https://www.omdbapi.com/', {
        params: {
          s: searchQuery,
          apikey: '831be77e',
          page,
        },
      });

      setMovies(response.data.Search);

      if (response.data.totalResults) {
        setTotalPages(Math.ceil(response.data.totalResults / 10));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchData(currentPage - 1, searchQuery);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchData(currentPage + 1, searchQuery);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(1, searchQuery);
  };

  return (
    <div>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Sebelumnya
        </button>
        <span>
          {' '}
          Halaman {currentPage} dari {totalPages}{' '}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Berikutnya
        </button>
      </div>
      <div>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari film..." />
        <button onClick={handleSearch}>Cari</button>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {movies?.map((movie) => (
          <div key={movie.imdbID} className="m-2 text-center">
            <h3>{movie.Title}</h3>
            <img src={movie.Poster} alt={movie.Title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
