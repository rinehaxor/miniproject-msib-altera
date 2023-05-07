import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Nav from './Navbar';
import Wave from './Wave';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [details, setDetails] = useState([]);
  const [plotType, setPlotType] = useState('short');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchData = async (page, searchQuery, searchYear) => {
    try {
      const response = await axios.get('https://www.omdbapi.com/', {
        params: {
          s: searchQuery,
          y: searchYear,
          apikey: '831be77e',
          page,
        },
      });

      setMovies(response.data.Search);

      if (response.data.totalResults) {
        setTotalPages(Math.ceil(response.data.totalResults / 8));
      }

      const movieDetails = response.data.Search
        ? await Promise.all(
            response.data.Search.map((movie) =>
              axios.get('https://www.omdbapi.com/', {
                params: {
                  i: movie.imdbID,

                  apikey: '831be77e',
                  plot: plotType,
                },
              })
            )
          )
        : [];
      const fetchedDetails = movieDetails.map((detail) => ({
        plot: detail.data.Plot,
        genre: detail.data.Genre,
        director: detail.data.Director,
        actors: detail.data.Actors,
      }));
      setDetails(fetchedDetails);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, searchQuery);
  }, [currentPage]);
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

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
    setHasSearched(true);
    setCurrentPage(1);
    fetchData(1, searchQuery, searchYear);
  };
  const handlePlotTypeChange = (e) => {
    setPlotType(e.target.value);
    fetchData(currentPage, searchQuery);
  };

  const onClick = (index) => {
    setSelectedMovieIndex(index);
    setModalVisible(true);
  };

  const onClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="flex bg-gradient-to-r from-blue-500  to-pink-500 h-96 min-h-screen items-center" style={{ height: 650 }}>
        <div className="container mx-auto ">
          <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 text-center">InfoNote Movie</h1>
            <h2 className="text-2xl md:text-4xl font-bold px-2 text-white mb-5 text-center">Tuliskan judul film yang ingin dicari di kolom pencarian di bawah ini.</h2>

            <div className="flex bg-gradient-to-r from-blue-500  to-pink-500 min-h-screen items-center">
              <div className="container mx-auto">
                <div className="flex justify-center">
                  <div className="bg-white shadow-md w-1/2 rounded-full px-4 py-3">
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari film..." className="w-full bg-transparent outline-none border-none text-lg" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center">
              <label htmlFor="search-year" className="mr-2 text-white">
                Year:
              </label>
              <input type="text" id="search-year" value={searchYear} onChange={(e) => setSearchYear(e.target.value)} placeholder="Year..." className="border border-gray-300 rounded-md p-1" />
              <label htmlFor="plot-type" className="mx-2 text-white">
                Plot:
              </label>
              <select id="plot-type" value={plotType} onChange={handlePlotTypeChange} className="border border-gray-300 rounded-md p-1">
                <option value="short">Pendek</option>
                <option value="full">Lengkap</option>
              </select>
              <button onClick={handleSearch} className="ml-4 bg-blue-500 text-white py-1 px-4 rounded-md">
                Cari
              </button>
            </div>
          </div>
        </div>
      </div>
      <Wave />
      <div className="flex flex-wrap justify-center items-center mt-10">
        {movies && movies.length > 0
          ? movies?.map((movie, index) => (
              <div key={movie.imdbID} className="p-5 text-center">
                <div className="flex flex-col h-full w-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
                  <img className="mx-auto w-44 h-72 object-cover rounded-t-lg" src={movie.Poster} alt={movie.Title} />
                  <div className="p-5 flex-1">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"> {movie.Title.slice(0, 10)}...</h5>
                    <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white"> {movie.Year.slice(0, 10)}...</h5>
                  </div>
                  <React.Fragment>
                    <button className="bg-blue-500 text-white" onClick={() => onClick(index)}>
                      Detail
                    </button>
                    <Modal isOpen={modalVisible} onRequestClose={onClose} contentLabel="Terms of Service">
                      {selectedMovieIndex !== null && (
                        <div className="flex flex-wrap justify-center mx-auto mt-16">
                          <img src={movies[selectedMovieIndex].Poster} alt={movies[selectedMovieIndex].Title} className="h-2/3 w-96 object-cover" />
                          <div className="bg-white bg-opacity-70 p-4">
                            <h3 className="font-bold text-gray-800 text-3xl">Title: {movies[selectedMovieIndex].Title}</h3>
                            <h3 className="mb-3  text-gray-700 mt-3  text-xl font-semibold dark:text-gray-400">Year: {movies[selectedMovieIndex].Year}</h3>

                            <p className="mb-3  text-gray-700 mt-3  text-xl font-semibold dark:text-gray-400">{details[selectedMovieIndex]?.genre}</p>
                            <p className="mb-3  text-gray-700 mt-3  text-xl font-semibold dark:text-gray-400">{details[selectedMovieIndex]?.Runtime}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> {details[selectedMovieIndex]?.director}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> {details[selectedMovieIndex]?.actors}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{details[selectedMovieIndex]?.plot}</p>
                          </div>
                        </div>
                      )}
                      <button className="bg-red-500 text-white mt-10" onClick={onClose}>
                        Close
                      </button>
                      <div>{/* Konten modal Anda di sini */}</div>
                    </Modal>
                  </React.Fragment>
                </div>
              </div>
            ))
          : hasSearched && <div className="text-xl text-center mt-10">Upps, film tidak ditemukan</div>}
      </div>
      <div className="text-center">
        {movies && movies.length > 0 && (
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
        )}
      </div>
    </>
  );
};

export default MovieList;
