import express from 'express';
import { AppDataSource } from './data-source';
import gargeRoutes from './routes/garage-routes';
import startAllConsumers  from './messaging/kafka/consumers';
import rateLimit from 'express-rate-limit';




const app = express();

app.get('/health', (req, res) => {
  res.send('Auth Microservice is running');
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());
app.use('/garage', gargeRoutes);
app.use(limiter);





AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(3001, () => {
      console.log('Garage Microservice is running on port 3001');
    });

  // startAllConsumers()
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });