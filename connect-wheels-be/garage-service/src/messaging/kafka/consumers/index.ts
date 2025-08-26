import { UserDeletionConsumer } from './user-event-consumer';

const startAllConsumers = async () => {
  try {
    await UserDeletionConsumer();
    console.log('All Kafka consumers are running');

  } catch (error) {
    console.log("error starting consumers", error)
  }

};

export default startAllConsumers