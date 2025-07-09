import { userClient } from '../clients/user-client';

// Wrapper function for CheckUser RPC call
export const checkUserGrpc = (userId: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    userClient.CheckUser({ userId }, (error: any, response: any) => {
      if (error) {
        console.error('gRPC CheckUser error:', error);
        return reject(error);
      }
      resolve(response.exists);
    });
  });
};



