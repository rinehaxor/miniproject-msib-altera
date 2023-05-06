import heroImage from '../assets/hero-image.png';
import React, { useState, useEffect } from 'react';
import InformationWeb from './InformationWeb';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [movies, setMovies] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    fetchPopularMovies();

    const handleResize = () => {
      setActiveSlide(0);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prevActiveSlide) => (prevActiveSlide + 1) % movies.length);
    }, 3000);
    return () => {
      clearInterval(slideInterval);
    };
  }, [movies]);

  const fetchPopularMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=125ff0107b979b3c730ebd3b461fcfb1&language=en-US&page=1`);
    const data = await response.json();
    setMovies(data.results.slice(0, 5));
  };

  return (
    <>
      <div className="flex bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
        <div className="flex-auto w-full md:w-1/2">
          <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="container mx-auto px-4">
              <div className="w-full md:w-2/3 lg:w-1/2 mx-auto pl-5">
                <img src={heroImage} alt="Contoh Gambar" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-auto w-full md:w-1/2">
          <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="container mx-auto px-4">
              <div className="w-full md:w-2/3 lg:w-1/2 mx-auto text-center pr-5">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4">Temukan Film Terbaikmu</h1>
                <p className="text-xl sm:text-2xl text-white mb-8">Cari dan temukan berbagai film favorit Anda di sini, mulai dari film lama hingga film terbaru.</p>
                <Link to="/search" className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg">
                  Lihat Koleksi Film
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 md:grid-cols-3 gap-6 pb-10">
        <h1 className="text-center mb-10 font-bold pt-5">LIST MOVIE POPULAR</h1>
        <div className="grid grid-cols-1 mx-auto" style={{ maxWidth: '60rem' }}>
          {movies.map((movie, index) => (
            <div key={movie.id} className={`${index === activeSlide ? 'flex' : 'hidden'} transition-opacity duration-1000`}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className=" h-96 w-80 object-cover" />
              <div className="bg-white bg-opacity-70 p-4">
                <h3 className="font-bold text-gray-800 text-3xl"> Title: {movie.title}</h3>
                <h3 className="text-gray-800 text-xl font-semibold pt-5"> Realese Date: {movie.release_date}</h3>
                <h3 className="text-gray-800 text-xl font-semibold pt-5">Vote Average: {movie.vote_average}</h3>
                <h3 className="text-gray-800 text-xl font-semibold pt-5">Vote Count: {movie.vote_count}</h3>
                <h4 className="text-gray-600">({movie.overview})</h4>
                <h4 className="text-gray-600">Popularitas: ({movie.popularity})</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InformationWeb />
    </>
  );
}
