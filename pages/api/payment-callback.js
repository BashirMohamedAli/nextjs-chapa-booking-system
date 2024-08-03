import dbConnect from '../../lib/dbConnect';
import Booking from '../../models/Booking';
import Room from '../../models/Room';

export default async function handler(req, res) {
  const { tx_ref, status } = req.query;
  await dbConnect();

  try {
    const booking = await Booking.findById(tx_ref);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (status === 'success') {
      // Mark the booking as confirmed
      booking.status = 'confirmed';
      await booking.save();

      // Mark the room as unavailable
      await Room.findByIdAndUpdate(booking.roomId, { available: false });

      res.redirect('/confirmation');
    } else {
      // Mark the booking as failed
      booking.status = 'failed';
      await booking.save();

      res.redirect('/failed');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing payment' });
  }
}
