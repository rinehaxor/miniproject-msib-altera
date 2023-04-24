import axios from 'axios';
import { Carousel } from 'flowbite-react';
import React, { useState, useEffect } from 'react';

export default function ListPopuler() {
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
      <div className="flex">
        <div className="">info</div>

        <div className="flex-1 relative h-56 sm:h-64 xl:h-80 2xl:h-96">
          <h1 className="text-center">List Populer</h1>
          <div className="flex"></div>
          <div className="flex justify-center items-center h-full">
            {movies.map((movie, index) => (
              <div key={movie.id} className={`${index === activeSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-1/2 transform -translate-x-1/2 w-52 h-full transition-opacity duration-1000`}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover object-center" />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-0">
            {movies.map((movie, index) => (
              <div key={movie.id} className={`${index === activeSlide ? 'opacity-100' : 'opacity-0'} absolute text-center transition-opacity duration-1000`}>
                <h3> {movie.title}</h3>
                <h4>Popularity : ({movie.popularity})</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
