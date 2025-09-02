import KafkaConsumer from '../../../../../common/messaging/kafka/consumer';
import { USER_DELETED, USER_DELETED_DLQ } from '../../../../../common/messaging/kafka/topics';
import garageController from "../../../controller/garage-controller";
import { withRetries } from '../../../../../common/messaging/retry';
import { sendToDLQ } from '../../../../../common/messaging/kafka/dlq-helper';


export const UserDeletionConsumer = async () => {
  await KafkaConsumer({
    groupId: 'garage-service-group',
    topic: USER_DELETED,
    handleMessage: async ({ userId }) => {
      try {
        // retries when fails to delete
        const result = await withRetries(async () => {
          await garageController.deleteGarageByOwnerID(userId);
        }, 3);

        // sending message to dead letter queue after maximum retries
        if (!result) {
          await sendToDLQ({
            topic: USER_DELETED_DLQ,
            payload: { userId: userId },
            reason: 'Failed to delete after max retries',
          });
          
          return;
        }

        console.log(`Garage records deleted for userId ${userId}`, result);
      } catch (error) {
        console.error(`Failed to process USER_DELETED for userId ${userId}:`, error);
        throw error;
      }
    },
  });
};

