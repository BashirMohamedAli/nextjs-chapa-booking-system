import { useRouter } from 'next/router';
import axios from 'axios';
import { useState } from 'react';
import dbConnect from '../../lib/dbConnect';
import Room from '../../models/Room';

const RoomDetail = ({ room }) => {
  const router = useRouter();
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
    <div>
      <h1>{room.name}</h1>
      <p>{room.description}</p>
      <p>Price: {room.price} ETB</p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button onClick={handleBooking} disabled={loading}>
        {loading ? 'Processing...' : 'Book Now'}
      </button>
    </div>
  );
};

export async function getServerSideProps(context) {
  await dbConnect();
  const { id } = context.params;
  const room = await Room.findById(id).lean();
  return { props: { room: JSON.parse(JSON.stringify(room)) } };
}

export default RoomDetail;
