import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create.todo';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  isCompleted?: boolean;
}