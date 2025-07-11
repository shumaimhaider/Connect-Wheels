import { createProducer } from './kafka-client';


// handles failed messages kafka
export const sendToDLQ = async ({
  topic,
  payload,
  reason,
}: {
  topic: string;
  payload: any;
  reason: string;
}) => {
  const producer = createProducer();

  try {
    await producer.connect();

    await producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify({
            ...payload,
            reason,
            failedAt: new Date().toISOString(),
          }),
        },
      ],
    });

    console.warn(`Message sent to DLQ (${topic}):`, payload, reason);
  } catch (error) {
    console.error(`Failed to send message to DLQ (${topic}):`, error, payload);
  } finally {
    await producer.disconnect().catch(e => console.error('Failed to disconnect DLQ producer:', e));
  }
};
