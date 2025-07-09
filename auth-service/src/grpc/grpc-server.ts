import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { checkUser,  } from './handlers/user-handler';

const PROTO_PATH = path.join(__dirname, '../../../proto/user.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDefinition) as any;
const userPackage = grpcObject.user;

export const startGrpcServer = () => {
  const server = new grpc.Server();

  server.addService(userPackage.UserService.service, {
    CheckUser: checkUser,
  });

  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('🚀 gRPC Server running on port 50051');
    server.start();
  });
};
