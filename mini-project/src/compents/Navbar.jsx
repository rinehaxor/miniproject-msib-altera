import React from 'react';
import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

export default function Nav() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Gagal keluar:', error);
    }
  };

  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap italic font-bold text-2xl font-semibold dark:text-white">InfoNote Movie</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link to="/" className="hover:text-sky-500">
            Home
          </Link>
          <Link to="/search" className="hover:text-sky-500">
            Search Movie
          </Link>
          {currentUser ? (
            <>
              <Link to="/user" className="hover:text-sky-500">
                Tambah Catatan
              </Link>
              <Link onClick={handleLogout} className="hover:text-sky-500">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-sky-500">
                Login
              </Link>
              <Link to="/register" className="hover:text-sky-500">
                Register
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
