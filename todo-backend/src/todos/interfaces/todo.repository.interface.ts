import { Todo } from '../entities/todo.entity';
import { Injectable } from '@nestjs/common';


export interface TodoRepository {
  findAll(): Promise<Todo[]>;
  findById(id: number): Promise<Todo | null>;
  create(todo: Partial<Todo>): Promise<Todo>;
  update(id: number, updates: Partial<Todo>): Promise<Todo>;
  delete(id: number): Promise<void>;
}

export const TODO_REPOSITORY = 'TODO_REPOSITORY';