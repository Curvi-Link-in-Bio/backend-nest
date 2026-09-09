import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const emailExists = await this.userRepository.findOne({
      where: { email: createUserDto.email, deleted: false },
    });

    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    const usernameExists = await this.userRepository.findOne({
      where: { username: createUserDto.username, deleted: false },
    });

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
    const user = await this.userRepository.findOne({
      where: { email, deleted: false },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async findOne(id: string) {
    const findUser = await this.userRepository.findOne({
      where: { id, deleted: false },
    });

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

    return { ok: true };
  }

  async remove(id: string) {
    const userExists = await this.findOne(id);

    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    await this.userRepository.update(id, { deleted: true });

    return { ok: true };
  }

  async me(authorization: string) {
    const token = authorization?.replace('Bearer ', '');
    const payload = this.jwtService.decode(token);
    const userId = payload.sub;

    const userExists = await this.userRepository.findOne({
      where: { id: userId, deleted: false },
      relations: {
        links: true
      },
    });

    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    delete (userExists as any).password;
    delete (userExists as any).deleted;
    delete (userExists as any).createdAt;
    delete (userExists as any).updatedAt;

    return userExists;
  }

  async findOneById(id: string) {
    const userExists = await this.userRepository.findOne({
      where: { id, deleted: false },
    });

    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    delete (userExists as any).password;

    return userExists;
  }

  async updateUserById(id: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: { id, deleted: false },
    });

    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    Logger.debug('passou por aqui', 'UserService');
    Logger.debug(`updateUserDto: ${JSON.stringify(updateUserDto, null, 2)}`, 'UserService');

    const updatedUser = userExists;

    updateUserDto.email
      ? (updatedUser.email = updateUserDto.email.trim().toLowerCase())
      : null;
    updateUserDto.username
      ? (updatedUser.username = updateUserDto.username.trim().toLowerCase())
      : null;
    updateUserDto.displayName
      ? (updatedUser.displayName = updateUserDto.displayName.trim().toLowerCase())
      : null;
    updateUserDto.bio ? (updatedUser.bio = updateUserDto.bio) : null;
    updateUserDto.avatarUrl
      ? (updatedUser.avatarUrl = updateUserDto.avatarUrl)
      : null;
    updateUserDto.theme ? (updatedUser.theme = updateUserDto.theme) : null;
    updateUserDto.buttonColor
      ? (updatedUser.buttonColor = updateUserDto.buttonColor)
      : null;
    updateUserDto.backgroundColor
      ? (updatedUser.backgroundColor = updateUserDto.backgroundColor)
      : null;
    updateUserDto.backgroundImageUrl
      ? (updatedUser.backgroundImageUrl = updateUserDto.backgroundImageUrl)
      : null;
    updateUserDto.plan ? (updatedUser.plan = updateUserDto.plan) : null;
    updateUserDto.paymentMethod
      ? (updatedUser.paymentMethod = updateUserDto.paymentMethod)
      : null;
    updateUserDto.categories
      ? (updatedUser.categories = updateUserDto.categories.map((c: string) =>
          c.trim().toLowerCase(),
        ))
      : null;

    await this.userRepository.save(updatedUser);

    return { ok: true };
  }

  async findOneByUsername(username: string) {
    const userExists = await this.userRepository.findOne({
      where: { username, deleted: false },
      relations: {
        links: true,
      },
    });

    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    delete (userExists as any).password;
    delete (userExists as any).plan;
    delete (userExists as any).paymentMethod;
    delete (userExists as any).deleted;
    delete (userExists as any).createdAt;
    delete (userExists as any).updatedAt;

    return userExists;
  }
}
