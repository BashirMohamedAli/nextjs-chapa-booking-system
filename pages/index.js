import { useEffect, useState } from 'react';
import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Room from '../models/Room';

const Home = ({ initialRooms }) => {
  const [rooms, setRooms] = useState(initialRooms);

  return (
    <div>
      <header>
        <h1>Welcome to Our Hotel</h1>
        <p>Your luxurious stay in the heart of Jijiga</p>
      </header>

      <section>
        <h2>Available Rooms</h2>
        <div className="room-list">
          {rooms.map((room) => (
            <div key={room._id} className="room-card">
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <p>Price: {room.price} ETB per night</p>
              <Link href={`/rooms/${room._id}`}>
              View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .room-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
        }
        .room-card {
          border: 1px solid #ddd;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
        }
      `}</style>
    </div>
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
