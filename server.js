import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import 'dotenv/config';
import connectDB from './database/connection.js';
import userRoutes from './routes/userRoutes.js';
import thoughtRoutes from './routes/thoughtRoutes.js';

const app = new Hono();

app.use('*', logger());
app.use('*', cors());

app.route('/api/users', userRoutes);
app.route('/api/thoughts', thoughtRoutes);

const PORT = process.env.PORT || 3000;

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

app.get('/test', (c) => c.text('Test route is working'));


connectDB().then(() => {
  console.log(`Server running on port http://localhost:${PORT}`);
  app.fire();
});

export default app