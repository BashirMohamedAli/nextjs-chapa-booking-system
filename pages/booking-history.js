import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const BookingHistory = () => {
  const [bookingData, setBookingData] = useState({ totalBookings: 0, bookings: [] });

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await axios.get('/api/booking-history');
        setBookingData(response.data);
      } catch (error) {
        console.error('Failed to fetch booking history:', error);
      }
    };

    fetchBookingHistory();
  }, []);

  return (
    <Layout>
      <div className='mx-10'>
      <h1 className="text-xl text-gray-600 font-bold mb-4 mt-20">Total Rooms Booked: {bookingData.totalBookings}</h1>
      {bookingData.bookings.length === 0 ? (
        <p>No rooms have been booked yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookingData.bookings.map((booking) => (
            <div key={booking._id} className="shadow-md rounded-sm overflow-hidden p-4 text-gray-600 bg-white">
              <h3 className="text-xl font-semibold text-black">Room: {booking.roomId.name}</h3>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
              <p className='text-yellow-800 font-semibold'><strong className='text-black'>Status:</strong> {booking.status}</p>
            </div>
          ))}
        </div>
      )}
      </div>
    </Layout>
  );
};

export default BookingHistory;
