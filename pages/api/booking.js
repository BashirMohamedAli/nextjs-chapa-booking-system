import dbConnect from "../../lib/dbConnect";
import Room from "../../models/Room";
import Booking from "../../models/Booking";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();

    const { roomId, email } = req.body;
    const { CHAPA_SECRET_KEY } = process.env;

    try {
      const room = await Room.findById(roomId);
      if (!room || !room.available) {
        return res.status(400).json({ message: "Room not available" });
      }

      // Create a new booking
      const booking = await Booking.create({ roomId, email });

      // Call Chapa API to create a payment
      const response = await axios.post(
        "https://api.chapa.co/v1/transaction/initialize",
        {
          amount: room.price.toString(),
          currency: "ETB",
          email,
          tx_ref: booking._id.toString(),
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-callback`,
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking-history`,
          customization: {
            title: "Room Booking",
            description: `Booking for room ${room.name}`,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
          },
        }
      );

      booking.chapaTxRef = response.data.data.tx_ref;
      await booking.save();

      res.status(200).json({ payment_url: response.data.data.checkout_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating booking" });
    }
  } else {
    res.status(405).end();
  }
}
