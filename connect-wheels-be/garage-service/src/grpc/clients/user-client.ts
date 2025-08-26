import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '../../../../proto/user.proto');

// Load proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH);

// Load the gRPC package
const grpcObject = grpc.loadPackageDefinition(packageDefinition) as any;
const userPackage = grpcObject.user;

// Create the gRPC client instance
export const userClient = new userPackage.UserService(
  process.env.AUTH_SERVICE_URL || 'localhost:50051',
  grpc.credentials.createInsecure()
);
