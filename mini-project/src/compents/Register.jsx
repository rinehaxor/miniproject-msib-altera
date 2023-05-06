import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';

import { Button, Label, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const authInstance = getAuth();
      const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      await signOut(authInstance);

      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="flex bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
        <div className="flex-auto w-full md:w-1/2">
          <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="container mx-auto px-4 ">
              <div className="w-1/2 md:w-2/3 lg:w-1/2 mx-auto px-5 m-5 bg-white" style={{ height: 'auto', borderRadius: 10 }}>
                <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                  {error && <p>{error}</p>}
                  <div>
                    <div className="mb-2 block pt-6">
                      <Label htmlFor="firstName" value="First Name" />
                    </div>
                    <TextInput id="firstName" type="text" placeholder="Alex" required={true} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <div className="mb-2 block ">
                      <Label htmlFor="lastName" value="First Name" />
                    </div>
                    <TextInput id="lastName" type="text" placeholder="Joe" required={true} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                  <div>
                    <div className="mb-2 block ">
                      <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput id="email1" type="email" placeholder="name@flowbite.com" required={true} value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput id="password" type="password" required={true} value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <Button className="mb-5" type="submit">
                    Register
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
