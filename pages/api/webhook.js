import dbConnect from '../../lib/dbConnect';
import Booking from '../../models/Booking';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();

    const chapaSecret = process.env.CHAPA_WEBHOOK_SECRET;
    const { tx_ref, status } = req.body;
    const signature = req.headers['x-chapa-signature'];

    const payload = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', chapaSecret)
      .update(payload)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    try {
      const booking = await Booking.findById(tx_ref);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      if (status === 'success') {
        booking.status = 'confirmed';
        await booking.save();
        return res.status(200).json({ message: 'Booking confirmed' });
      } else {
        booking.status = 'failed';
        await booking.save();
        return res.status(200).json({ message: 'Booking status updated to failed' });
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).end();
  }
}
