import { FastifyRequest } from 'fastify';
import { UsersEntity } from '@/modules/users/entities/users.entity';

declare global {
  export type EscribaRequest = {
    user: UsersEntity;
  } & FastifyRequest;
}
