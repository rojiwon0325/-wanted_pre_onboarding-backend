import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/user.aggregate';
import { IUser } from '../domain/user.interface';
import { IUserRepository } from '../domain/repository.interface';
import { UserRepository } from '../infrastructure/user.repository';
import {
  CreateUserDTO,
  FindOneUserDTO,
  RemoveUserDTO,
} from './user.service.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async create(dto: CreateUserDTO): Promise<IUser> {
    const { username } = dto;
    const user = User.get({ username });
    return this.userRepository.save(user);
  }

  async findOne(dto: FindOneUserDTO): Promise<IUser> {
    return this.userRepository.findOne(dto.id);
  }

  async remove(dto: RemoveUserDTO): Promise<void> {
    const user = await this.userRepository.findOne(dto.id);
    return this.userRepository.remove(user);
  }
}
