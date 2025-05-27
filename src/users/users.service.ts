import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest } from './dto/create-user.request';
import { UserRepository } from 'src/repositories';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserRequest) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new UnprocessableEntityException('Email already exists!');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const savedUser = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    if (!savedUser) {
      throw new UnprocessableEntityException('Failed to create user');
    }
    return {
      id: savedUser._id,
      email: savedUser.email,
    };
  }

  async getUserByEmail(email: string) {
    const foundedUser = await this.userRepository.findByEmail(email);

    if (!foundedUser) {
      throw new NotFoundException('Email not found!');
    }

    return {
      id: foundedUser._id,
      password: foundedUser.password,
    };
  }
}
