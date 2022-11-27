import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const AuthProvider = {
  provide: 'AUTH_SERVICE',
  useFactory: (configService: ConfigService) => {
    const user = configService.get('RABBITMQ_USER');
    const password = configService.get('RABBITMQ_PASSWORD');
    const host = configService.get('RABBITMQ_HOST');
    const queueName = configService.get('RABBITMQ_QUEUE_NAME');
    const client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${password}@${host}`],
        queue: queueName,
        queueOptions: {
          durable: true,
        },
      },
    });
    console.log(client);
    return client;
  },
  inject: [ConfigService],
};
