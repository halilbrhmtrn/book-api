import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(firstName: string, lastName: string, age: number): Promise<User> {
    const newUser = this.userRepository.create({ firstName, lastName, age });
    await this.userRepository.save(newUser);
    return newUser;
  }

  async getUser(userId: number): Promise<User | undefined> {
    return this.userRepository.findOne({
        where: { id: userId },
        relations: ['books'],
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['books'] });
  }
  
  async updateUser(userId: number, userData: Partial<User>): Promise<User | undefined> {
    let user = await this.getUser(userId);
    if (!user) {
      return undefined;
    }
    user = { ...user, ...userData };
    return this.userRepository.save(user);
  }

  async deleteUser(userId: number): Promise<User | undefined> {
    let user = await this.getUser(userId);
    if (!user) {
      return undefined;
    }
    return this.userRepository.remove(user);
  }
}
