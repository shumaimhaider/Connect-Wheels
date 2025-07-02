import express from 'express';
import { AppDataSource } from './data_source';
import authRoutes from './routes/auth_routes';


const app = express();

app.get('/health', (req, res) => {
  res.send('Auth Microservice is running');
});

app.use(express.json());
app.use('/auth', authRoutes);

AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(3000, () => {
      console.log('Auth Microservice is running on port 3000');
    });

  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });