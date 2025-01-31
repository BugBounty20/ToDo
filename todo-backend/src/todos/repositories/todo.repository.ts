import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../entities/todo.entity';
import { TodoRepository, TODO_REPOSITORY  } from '../interfaces/todo.repository.interface';

@Injectable()
export class TypeOrmTodoRepository implements TodoRepository {
  constructor(
    @InjectRepository(Todo)
    private readonly repository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<Todo | null> {
    return this.repository.findOneBy({ id });
  }

  async create(todo: Partial<Todo>): Promise<Todo> {
    const newTodo = this.repository.create(todo);
    return this.repository.save(newTodo);
  }

  async update(id: number, updates: Partial<Todo>): Promise<Todo> {
    await this.repository.update(id, updates);
    const updatedTodo = await this.findById(id);
    if (!updatedTodo) throw new Error('Todo not found after update');
    return updatedTodo;
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) throw new Error('Todo not found');
  }
}