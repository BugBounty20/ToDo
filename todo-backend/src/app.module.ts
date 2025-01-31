import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from './todos/todos.controller';
import { TodoService } from './todos/services/todo.services';
import { TypeOrmTodoRepository } from './todos/repositories/todo.repository';
import { Todo } from './todos/entities/todo.entity';
import { APP_FILTER } from '@nestjs/core';
import {HttpExceptionFilter} from './common/filters/http-exception.filters'
import {TODO_REPOSITORY} from './todos/interfaces/todo.repository.interface'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [Todo],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Todo]),
  ],
  controllers: [TodosController],
  providers: [
    {
      provide: TODO_REPOSITORY,
      useClass: TypeOrmTodoRepository,
    },
    TodoService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}