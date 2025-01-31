import { Injectable, Inject } from '@nestjs/common';
import { TodoRepository, TODO_REPOSITORY } from '../interfaces/todo.repository.interface';
import { Todo } from '../entities/todo.entity';
import { CreateTodoDto } from '../data-transfer-objects/create.todo';
import { UpdateTodoDto } from '../data-transfer-objects/update.todo';

@Injectable()
export class TodoService {
  constructor(
    @Inject(TODO_REPOSITORY) private readonly repository: TodoRepository,
  ) {}

  async getAllTodos(): Promise<Todo[]> {
    return this.repository.findAll();
  }

  async createTodo(dto: CreateTodoDto): Promise<Todo> {
    return this.repository.create(dto);
  }

  async updateTodo(id: number, dto: UpdateTodoDto): Promise<Todo> {
    return this.repository.update(id, dto);
  }

  async deleteTodo(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}