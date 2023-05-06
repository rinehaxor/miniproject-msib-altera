import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Configs/firebase';
import { useNavigate } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';
import Nav from '../compents/Navbar';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Pengguna berhasil masuk:', user);

      navigate('/user');
    } catch (error) {
      console.error('Terjadi kesalahan saat masuk:', error);
    }
  };

  return (
    <>
      <Nav />
      <div className="flex bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
        <div className="flex-auto w-full md:w-1/2">
          <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="container mx-auto px-4 ">
              <div className="w-1/2  md:w-2/3 lg:w-1/2 mx-auto px-5 m-5 bg-white" style={{ height: 300, borderRadius: 10 }}>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div>
                    <div className="mb-2 block pt-6">
                      <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput id="email1" type="email" placeholder="name@flowbite.com" required={true} value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="password1" value="Your password" />
                    </div>
                    <TextInput id="password1" type="password" required={true} value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <Button type="submit">Login</Button>
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
