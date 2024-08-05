import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Room from '../models/Room';

const Home = ({ initialRooms }) => {
  const [rooms, setRooms] = useState(initialRooms);

  return (
    <Layout>
      <header className="text-center mt-20">
        <h1 className="text-4xl font-bold text-yellow-800">Welcome to Our Hotel</h1>
        <p className="text-xl text-gray-600 mt-2">Your luxurious stay in the heart of Jijiga</p>
      </header>
      <section className='m-8'>
        <h2 className="text-2xl text-gray-600 font-semibold mb-8">Available Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div key={room._id} className="bg-white shadow-md rounded-sm overflow-hidden">

              <div className="p-4">
                <h3 className="text-xl font-semibold text-black">{room.name}</h3>
                <p className="text-black mt-2">{room.description}</p>
                <p className="text-gray-600 mt-4">Price: {room.price} ETB per night</p>
                <Link href={`/rooms/${room._id}`} className="text-yellow-800 mt-4 inline-block">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  await dbConnect();
  const rooms = await Room.find({ available: true }).lean();
  return {
    props: {
      initialRooms: JSON.parse(JSON.stringify(rooms)),
    },
  };
}

export default Home;
