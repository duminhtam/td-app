import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TaskDocument } from '../model/task.schema';
import { taskService } from '../service/task.service';
import { Handler } from '../utils/handler';
// import { ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/api/v1/task')
export class TaskController {
  constructor(
    private readonly taskService: taskService,
    private readonly successHandle: Handler,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createBook(@Res() response, @Req() request, @Body() task) {
    try {
      let requestBody: any = {};

      console.log('task', task)
      console.log('request request.user', request.user)
      console.log('request xxx', request.body)
      requestBody = {
        createdBy: request.user._id,
        title: task.title,
        description: task.description,
      };
      console.log('requestBody', task)
      const newTask = await this.taskService.createTask(requestBody);

      const result = await this.successHandle.success(response, newTask);
      return result;
    } catch (error) {
      return this.successHandle.errorException(response, error);
    }
  }

  @Get()
  async read(@Req() request, @Query() id): Promise<Object> {
    const createdBy = request.user._id;
    return await this.taskService.readtask(id, createdBy);
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() task: TaskDocument) {
    const updatedTask = await this.taskService.update(id, task);
    return response.status(HttpStatus.OK).json({});
  }
}
