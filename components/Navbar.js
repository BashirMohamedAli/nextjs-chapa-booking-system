import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-slate-200 shadow-lg p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-yellow-800">
          <Link href="/">Hotel Booking</Link>
        </div>
        <div className="hidden md:flex space-x-6 text-gray-600">
          <Link href="/" passHref>
            Home
          </Link>
          <Link href="/booking-history" passHref>
            Booking History
          </Link>
          <Link href="/about" passHref>
            About
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"} bg-slate-200`}
      >
        <ul className="space-y-4 p-4">
          <li>
            <Link href="/" passHref>
              Home
            </Link>
          </li>
          <li>
            <Link href="/booking-history" passHref>
              Booking History
            </Link>
          </li>
          <li>
            <Link href="/about" passHref>
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
