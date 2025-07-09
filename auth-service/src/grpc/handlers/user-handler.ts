import { findUserById } from '../../service/user-service';
import * as grpc from '@grpc/grpc-js';

export const checkUser = async (call: any, callback: any) => {
    try {
        const userId = Number(call.request.userId);
        const exists = await findUserById(userId);        
        callback(null, { exists: exists });
    } catch (error) {
        console.error(error);
        callback({ code: grpc.status.INTERNAL, message: 'Server error' });
    }
};

