import { collection, getDocs, addDoc, updateDoc, doc as docRef, deleteDoc } from 'firebase/firestore';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { db } from '../Configs/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Configs/firebase';
import { useForm } from 'react-hook-form';
import { Table, Alert } from 'flowbite-react';
import heroUser from '../assets/user.png';
import Wave from './Wave';
import { atom, useAtom } from 'jotai';

const usersAtom = atom([]);
const forEditAtom = atom(false);
const showAlertAtom = atom(false);
const searchQueryAtom = atom('');
const movieListAtom = atom([]);

export default function User() {
  const [users, setUsers] = useAtom(usersAtom);
  const [forEdit, setForEdit] = useAtom(forEditAtom);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAlert, setShowAlert] = useAtom(showAlertAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [movieList, setMovieList] = useAtom(movieListAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      getData();
    }
  }, [currentUser]);

  const userRef = currentUser ? collection(db, `users/${currentUser.uid}/user`) : null;

  const getData = async () => {
    if (!userRef) return;

    const userSnap = await getDocs(userRef);

    console.log(userSnap);
    const user = [];
    userSnap.forEach((doc) => {
      const fullData = {
        ...doc.data(),
        id: doc.id,
      };
      user.push(fullData);
    });

    setUsers(user);
  };

  useEffect(() => {
    getData();
  }, []);

  const defaultField = {
    namaFilm: '',
    ulasan: '',
    tanggal_nonton: '',
    rekomendasi: false,
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultField,
  });

  const [field, setField] = useState(defaultField);

  const handleChangeField = (e) => {
    setValue(e.target.name, e.target.value);
  };

  const handleCheck = (e) => {
    setValue('rekomendasi', e.target.checked);
  };

  const onSubmit = (data) => {
    if (forEdit) {
      const userDocRef = docRef(db, `users/${currentUser.uid}/user/${field.id}`);
      updateDoc(userDocRef, data).then(() => {
        getData();
        setValue(defaultField);
        setForEdit(false);
      });
    } else {
      addDoc(userRef, data).then(() => {
        getData();
        setValue(defaultField);
      });
    }
  };

  const prepareEdit = (user) => {
    setField(user);
    setForEdit(true);
  };

  const deleteUser = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const userDocRef = docRef(db, `users/${currentUser.uid}/user/${id}`);
      deleteDoc(userDocRef).then(() => {
        getData();
        setShowAlert(true);
      });
    }
  };

  const handleSearch = async (event) => {
    setSearchQuery(event.target.value);

    if (searchQuery.length > 1) {
      try {
        const response = await axios.get('https://www.omdbapi.com/', {
          params: {
            s: searchQuery,
            apikey: 'cb9eebfe',
          },
        });

        if (response.data.Search) {
          setMovieList(response.data.Search);
        }
      } catch (error) {
        console.error('Error fetching data from OMDB API:', error);
      }
    } else {
      setMovieList([]);
    }
  };

  const handleMovieClick = (movieTitle) => {
    setValue('namaFilm', movieTitle);
    setField({
      ...field,
      namaFilm: movieTitle,
    });

    setSearchQuery(movieTitle);
    setMovieList([]);
  };

  return (
    <>
      <div className="flex bg-gradient-to-r from-blue-500  to-pink-500  " style={{ height: 650 }}>
        <div className="flex-auto w-full md:w-1/2">
          <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="container mx-auto px-4">
              <div className="w-full md:w-2/3 lg:w-1/2 mx-auto text-center pr-5">
                {currentUser && <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4">Selamat datang, {currentUser.displayName}!</h3>}
                <p className="text-xl sm:text-2xl text-white mb-8">Di halaman catatan film Anda! Di sini, Anda dapat menemukan berbagai catatan film yang telah Anda buat sebelumnya, serta menambah dan mengedit catatan baru. </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-auto w-full md:w-1/2">
          <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="container mx-auto px-4">
              <div className="w-2/3 md:w-2/3 lg:w-1/2 mx-auto pl-5">
                <img src={heroUser} alt="Contoh Gambar" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Wave />
      <div className="">
        <h1 className="text-3xl text-center font-bold">Tulis Catatan di Sini</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="px-10 space-y-5" style={{ paddingLeft: 50, paddingRight: 50 }}>
          <div className="relative">
            <label htmlFor="namaFilm" className="block text-sm font-medium text-gray-700 pb-1">
              Nama Film
            </label>
            <input
              id="namaFilm"
              name="namaFilm"
              placeholder="Cari film"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full py-2 px-4 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            {movieList.length > 0 && (
              <ul className="absolute w-full bg-white shadow rounded-md mt-2 border border-gray-300 z-10">
                {movieList.map((movie, index) => (
                  <li key={index} onClick={() => handleMovieClick(movie.Title)} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                    {movie.Title}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label htmlFor="ulasan" className="block text-sm font-medium text-gray-700 pb-1">
              Ulasan
            </label>
            <textarea
              id="ulasan"
              {...register('ulasan', { required: true })}
              placeholder="ulasan"
              onChange={handleChangeField}
              className="w-full py-2 px-4 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            {errors.ulasan && <p className="text-red-500">Ulasan harus diisi</p>}
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="rekomendasi" className="text-sm font-medium text-gray-700">
              Apakah dapat Rekomendasikan?
            </label>
            <input id="rekomendasi" {...register('rekomendasi')} type="checkbox" placeholder="rekomendasi" onChange={handleCheck} className="focus:outline-none" />
          </div>
          <div>
            <label htmlFor="tanggal_nonton" className="block text-sm font-medium text-gray-700 pb-1">
              Tanggal Nonton
            </label>
            <input
              id="tanggal_nonton"
              {...register('tanggal_nonton', { required: true })}
              type="date"
              placeholder="tanggal nonton"
              onChange={handleChangeField}
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.tanggal_nonton && <p className="text-red-500">Tanggal Nonton harus diisi</p>}
          </div>

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
            {field.id ? 'Edit ulasan' : 'Tambah Ulasan'}
          </button>
        </form>
      </div>
      <div className="pt-5" style={{ paddingLeft: 50, paddingRight: 50 }}>
        <p className="text-center text-3xl font-bold py-5">Catatan</p>
        {showAlert && (
          <Alert color="failure" className="mb-5">
            <span>
              <span className="font-medium">Info alert!</span> Data telah berhasil dihapus.
            </span>
          </Alert>
        )}
        <Table className="mb-5">
          <Table.Head>
            <Table.HeadCell>NO</Table.HeadCell>
            <Table.HeadCell>Nama Movie</Table.HeadCell>
            <Table.HeadCell>Ulasan Anda</Table.HeadCell>
            <Table.HeadCell>Rekomendasi</Table.HeadCell>
            <Table.HeadCell>Tanggal Nonton</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.map((pengguna, index) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell key={index} className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{pengguna.namaFilm}</Table.Cell>
                <Table.Cell>{pengguna.rekomendasi ? 'Rekomendasikan' : 'Tidak di rekomendasikan'}</Table.Cell>
                <Table.Cell className="w-30 whitespace-nowrap font-medium text-gray-900 dark:text-white">{pengguna.ulasan}</Table.Cell>

                <Table.Cell>{pengguna.tanggal_nonton}</Table.Cell>
                <Table.Cell>
                  <div className="flex flex-warp">
                    <button onClick={() => prepareEdit(pengguna)} className="bg-yellow-300 font-medium text-white-400 hover:underline dark:text-blue-500 mr-3">
                      Edit
                    </button>
                    <button onClick={() => deleteUser(pengguna.id)} className="bg-red-600 font-medium text-white hover:underline dark:text-blue-500">
                      Hapus
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
