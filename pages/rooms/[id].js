import Layout from '../../components/Layout';
import axios from 'axios';
import { useState } from 'react';
import dbConnect from '../../lib/dbConnect';
import Room from '../../models/Room';

const RoomDetail = ({ room }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/booking', {
        roomId: room._id,
        email,
      });
      window.location.href = response.data.payment_url;
    } catch (error) {
      console.error(error);
      alert('Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto mt-20">
        <h1 className="text-3xl font-bold mt-6 text-black">{room.name}</h1>
        <p className="text-gray-600 mt-4">{room.description}</p>
        <p className="text-yellow-800 mt-4">Price: {room.price} ETB per night</p>
        <div className="mt-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-2 rounded w-full text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-yellow-800 text-white px-4 py-2 rounded mt-4"
            onClick={handleBooking}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Book Now'}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  await dbConnect();
  const { id } = context.params;
  const room = await Room.findById(id).lean();
  return { props: { room: JSON.parse(JSON.stringify(room)) } };
}

export default RoomDetail;
