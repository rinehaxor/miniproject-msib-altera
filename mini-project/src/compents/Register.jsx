import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { Button, Label, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    try {
      const { firstName, lastName, email, password } = data;
      const authInstance = getAuth();
      const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });

      await signOut(authInstance);
      navigate('/login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email sudah terdaftar');
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <div className="flex bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
        <div className="flex-auto w-full md:w-1/2">
          <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="container mx-auto px-4 ">
              <div className="w-1/2 md:w-2/3 lg:w-1/2 mx-auto px-5 m-5 bg-white" style={{ height: 'auto', borderRadius: 10 }}>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleRegister)}>
                  <div>
                    <div className="mb-2 block pt-6">
                      <Label htmlFor="firstName" value="Nama Depan" />
                    </div>
                    <TextInput {...register('firstName', { required: 'Nama depan wajib diisi' })} id="firstName" type="text" placeholder="Alex" />
                    {errors.firstName && <p>{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="lastName" value="Nama Belakang" />
                    </div>
                    <TextInput {...register('lastName', { required: 'Nama belakang wajib diisi' })} id="lastName" type="text" placeholder="Joe" />
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email1" value="Email Anda" />
                    </div>
                    <TextInput {...register('email', { required: 'Email wajib diisi' })} id="email1" type="email" placeholder="name@flowbite.com" />
                    {errors.email && <p>{errors.email.message}</p>}
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="password" value="Kata Sandi Anda" />
                    </div>
                    <TextInput {...register('password', { required: 'Kata sandi wajib diisi' })} id="password" type="password" />
                    {errors.password && <p>{errors.password.message}</p>}
                  </div>
                  <Button className="mb-2" type="submit">
                    Daftar
                  </Button>
                  {error && <p className="text-red-600">{error}</p>}
                  <Link className="mb-2" to="/login">
                    Login
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
