import { getRepository } from 'typeorm';
import { User } from '../entities/User';

export class UserService {
  private userRepository = getRepository(User);

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findOne(id);
  }

  async createUser(name: string): Promise<User> {
    const user = new User();
    user.name = name;
    return this.userRepository.save(user);
  }
}
