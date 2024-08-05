import dbConnect from '../../lib/dbConnect';
import Booking from '../../models/Booking';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      // Fetch all bookings
      const bookings = await Booking.find({ status: 'confirmed' }).populate('roomId');
      const totalBookings = bookings.length;

      res.status(200).json({ totalBookings, bookings });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch booking history' });
    }
  } else {
    res.status(405).end();
  }
}
