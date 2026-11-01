import express from 'express';
import { requireMPPAdmin } from '../middleware/auth.js'; // Import the middleware we just made

const router = express.Router();

// Notice we put requireMPPAdmin in the middle. 
// Express will run the middleware FIRST. If it calls next(), then it runs the async function.
router.post('/approve-booking', requireMPPAdmin, async (req, res) => {
  const { bookingId } = req.body;

  // If the code reaches here, it means the user IS an active MPP Admin.
  // We can access their ID using req.user.id
  
  res.json({ 
    message: "Booking approved successfully",
    admin_id: req.user.id,
    booking_id: bookingId
  });
});

export default router;