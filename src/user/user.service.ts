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

    if (!user) {
      throw new BadRequestException('User not found');
    }
    
    return user;
  }

  async findOne(id: string) {
    const findUser = await this.userRepository.findOne({ where: { id, deleted: false } });

    if (!findUser) {
      throw new BadRequestException('User not found');
    }

    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.findOne(id);

    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    const user = new User();
    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);

    return {ok: true};
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
