import { IUser } from '../domain/user.interface';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../application/user.service';
import {
  CreateUserBody,
  CreateUserResponse,
  FindOneUserParam,
  FindOneUserResponse,
  RemoveUserResponse,
} from './user.controller.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':user_id')
  async findOne(
    @Param() { user_id: id }: FindOneUserParam,
  ): Promise<FindOneUserResponse> {
    const user: IUser = await this.userService.findOne({ id });
    return { User: user.getResponseType() };
  }

  @Post()
  async create(@Body() body: CreateUserBody): Promise<CreateUserResponse> {
    const { username } = body;
    const User: IUser = await this.userService.create({
      username,
    });
    return { User };
  }

  @Delete(':user_id')
  async remove(
    @Param() { user_id: id }: FindOneUserParam,
  ): Promise<RemoveUserResponse> {
    await this.userService.remove({ id });
    return { user_id: id };
  }
}
