import React from 'react';
import information from '../assets/information.png';
import internet from '../assets/internet.png';
import search from '../assets/search.png';
export default function InformationWeb() {
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
        <div className="flex-auto w-full md:w-1/2">
          <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="mx-auto px-4">
              <div className="w-full md:w-2/3 lg:w-1/2 mx-auto text-center pr-5">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4">Mudah Akses</h1>
                <p className="text-xl sm:text-2xl text-white mb-8">Website informasi film dapat diakses dengan mudah melalui internet, kapanpun dan di mana pun kita berada.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-auto w-full md:w-1/2">
          <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="mx-auto px-4">
              <div className="w-full md:w-2/3 lg:w-1/2 mx-auto pl-5">
                <img src={internet} alt="Contoh Gambar" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex-auto w-full md:w-1/2">
          <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="mx-auto px-4">
              <div className="w-full md:w-2/3 lg:w-1/2 mx-auto pl-5">
                <img src={information} alt="Contoh Gambar" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-auto w-full md:w-1/2">
          <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="mx-auto px-4">
              <div className="w-full md:w-2/3 lg:w-1/2 mx-auto text-center pr-5">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">Informasi Movie</h1>
                <p className="text-xl sm:text-2xl mb-8">Menyediakan informasi lengkap: Website informasi film menyediakan informasi lengkap mengenai film yang ingin kita tonton, mulai dari sinopsis, pemain, sutradara,.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
        <div className="flex-auto w-full md:w-1/2">
          <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="mx-auto px-4">
              <div className="w-full md:w-2/3 lg:w-1/2 mx-auto text-center pr-5">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4">Mencari Movie</h1>
                <p className="text-xl sm:text-2xl text-white mb-8">Memudahkan dalam mencari film: Kita dapat mencari film yang ingin ditonton melalui fitur pencarian yang disediakan.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-auto w-full md:w-1/2">
          <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="mx-auto px-4">
              <div className="w-full md:w-2/3 lg:w-1/2 mx-auto pl-5">
                <img src={search} alt="Contoh Gambar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
