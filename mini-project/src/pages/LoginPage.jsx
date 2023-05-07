import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Configs/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';
import Nav from '../compents/Navbar';

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Pengguna berhasil masuk:', user);

      navigate('/user');
    } catch (error) {
      console.error('Terjadi kesalahan saat masuk:', error);
      setLoginError('Email atau kata sandi salah atau tidak terdaftar');
    }
  };

  return (
    <>
      <Nav />
      <div className="flex bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
        <div className="flex-auto w-full md:w-1/2">
          <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="container mx-auto px-4 ">
              <div className="w-1/2  md:w-2/3 lg:w-1/2 mx-auto px-5 m-5 bg-white" style={{ height: 330, borderRadius: 10 }}>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <div className="mb-2 block pt-6">
                      <Label htmlFor="email1" value="Email Anda" />
                    </div>
                    <TextInput id="email1" type="email" placeholder="name@flowbite.com" {...register('email', { required: 'Email wajib diisi' })} />
                    {errors.email && <p>{errors.email.message}</p>}
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="password1" value="Kata Sandi Anda" />
                    </div>
                    <TextInput id="password1" type="password" {...register('password', { required: 'Kata sandi wajib diisi', minLength: { value: 8, message: 'Kata sandi minimal 8 karakter' } })} />
                    {errors.password && <p>{errors.password.message}</p>}
                  </div>
                  <Button type="submit">Masuk</Button>
                  {loginError && <p className="text-red-500">{loginError}</p>}
                  <Link to="/register">Register</Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
