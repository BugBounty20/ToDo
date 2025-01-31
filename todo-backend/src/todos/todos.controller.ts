// src/todos/todos.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TodoService } from './services/todo.services';
import { CreateTodoDto } from './data-transfer-objects/create.todo';
import { UpdateTodoDto } from './data-transfer-objects/update.todo';
import { Todo } from './entities/todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAll(): Promise<Todo[]> {
    return this.todoService.getAllTodos();
  }

  @Post()
  async create(@Body() dto: CreateTodoDto): Promise<Todo> {
    return this.todoService.createTodo(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.updateTodo(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.todoService.deleteTodo(id);
  }
}