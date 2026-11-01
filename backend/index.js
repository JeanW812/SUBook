import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookingRoutes from './routes/bookings.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Backend is running!'));
console.log("=== CHECKING ROUTES ===");
console.log("Booking Routes loaded:", typeof bookingRoutes);
console.log("=======================");
app.use('/api', bookingRoutes);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;