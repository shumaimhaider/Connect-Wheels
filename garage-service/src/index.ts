import express from 'express';
import { AppDataSource } from './data-source';
import gargeRoutes from './routes/garage-routes';


const app = express();

app.get('/health', (req, res) => {
  res.send('Auth Microservice is running');
});

app.use(express.json());
app.use('/garage', gargeRoutes);

AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(3001, () => {
      console.log('Garage Microservice is running on port 3001');
    });

  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });