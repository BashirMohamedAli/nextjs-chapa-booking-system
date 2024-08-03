import dbConnect from '../../lib/dbConnect';
import Room from '../../models/Room';
import Booking from '../../models/Booking';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { roomId, email } = req.body;
    await dbConnect();

    try {
      // Check if the room is available
      const room = await Room.findById(roomId);
      if (!room || !room.available) {
        return res.status(400).json({ message: 'Room not available' });
      }

      // Create a new booking in the database
      const booking = await Booking.create({ roomId, email });

      // Call Chapa API to create a payment
      const response = await axios.post(
        'https://api.chapa.co/v1/transaction/initialize',
        {
          amount: room.price.toString(),
          currency: 'ETB',
          email,
          tx_ref: booking._id.toString(),
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-callback`,
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/confirmation`,
          customization: {
            title: 'Room Booking',
            description: `Booking for room ${room.name}`,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          },
        }
      );

      // Update the booking with the Chapa transaction reference
      booking.chapaTxRef = response.data.data.tx_ref;
      await booking.save();

      // Send the payment URL back to the client
      res.status(200).json({ payment_url: response.data.data.checkout_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating booking' });
    }
  } else {
    res.status(405).end();
  }
}
