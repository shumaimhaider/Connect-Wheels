import express from 'express';
import { AppDataSource } from './data-source';
import authRoutes from './routes/auth-routes';
import userRoutes from './routes/user-routes';
import { startGrpcServer } from './grpc/grpc-server';
import cors from "cors";

const app = express();

// ✅ CORS should be first
app.use(cors({
  origin: "http://localhost:5173", // 👈 remove the trailing slash!
  credentials: true,
}));

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Auth Microservice is running');
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(3000, () => {
      console.log('Auth Microservice is running on port 3000');
    });

    // Start gRPC server
    startGrpcServer();
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });