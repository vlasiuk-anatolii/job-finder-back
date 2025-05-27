import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Document } from 'mongoose';
import { IUser } from '../interfaces';
import { CreateUserRequest } from 'src/users/dto/create-user.request';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  public async find({ filter = {}, populate = [] } = {}): Promise<IUser[]> {
    return this.userModel
      .find(filter, { password: 0, __v: 0 })
      .populate(populate)
      .exec();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.userModel.findOne({ email }).exec();
  }

  public async findOne({
    filter = {},
    populate = [],
  } = {}): Promise<IUser | null> {
    return this.userModel
      .findOne(filter, { password: 0, __v: 0 })
      .populate(populate)
      .exec();
  }

  public async countDocuments({ filter = {} } = {}): Promise<number> {
    return this.userModel.countDocuments(filter);
  }

  public async create(
    user: CreateUserRequest,
  ): Promise<(IUser & Document) | null> {
    const createdUser = await this.userModel.create(user);
    return createdUser as IUser & Document;
  }

  public async aggregate(pipeline: PipelineStage[] = []) {
    return this.userModel.aggregate(pipeline);
  }
}
