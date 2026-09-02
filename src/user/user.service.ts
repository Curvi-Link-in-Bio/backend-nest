import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const emailExists = await this.userRepository.findOne({ where: 
      { email: createUserDto.email, deleted: false },
      });

    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    const usernameExists = await this.userRepository.findOne({ where: 
      { username: createUserDto.username, deleted: false } });

    if (usernameExists) {
      throw new BadRequestException('Username already exists');
    }

    const newUser = new User();
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    newUser.username = createUserDto.username;
    newUser.displayName = createUserDto.displayName;
    newUser.bio = createUserDto.bio;
    newUser.avatarUrl = createUserDto.avatarUrl;
    newUser.theme = createUserDto.theme;
    newUser.buttonColor = createUserDto.buttonColor;
    newUser.backgroundColor = createUserDto.backgroundColor;
    newUser.backgroundImageUrl = createUserDto.backgroundImageUrl;
    newUser.plan = createUserDto.plan;
    newUser.paymentMethod = createUserDto.paymentMethod;
    newUser.categories = createUserDto.categories;    

    return await this.userRepository.save(newUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneforEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email, deleted: false } });
    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
