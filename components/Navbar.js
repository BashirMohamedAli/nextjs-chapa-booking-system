import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-slate-200 shadow-lg p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-yellow-800">
          <Link href="/">
            Hotel Booking
          </Link>
        </div>
        <ul className="flex space-x-6 text-gray-600">
          <li>
            <Link href="/" className="hover:text-gray-900 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/booked-list" className="hover:text-gray-900 transition">
              Booked List
            </Link>
          </li>
          <li>
            <Link href="/booking-history" className="hover:text-gray-900 transition">
              Booking History
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-900 transition">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
