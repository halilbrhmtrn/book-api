import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
import { BookService } from './book.service';
import { BorrowingService } from './borrowing.service';

export class UserService {
  private userRepository: Repository<User>;
  private bookService = new BookService();
  private borrowingService = new BorrowingService();

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(name:string): Promise<User> {
    const newUser = this.userRepository.create({ name });
    await this.userRepository.save(newUser);
    return newUser;
  }

  async getUser(userId: number): Promise<any | undefined> {
    const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['borrowings', 'borrowings.book'],
    });

    if (!user) {
      return null;
    }
    const books = {
      past: [],
      present: [],
    }

    if (user.borrowings) {
      user.borrowings.forEach(borrowing => {
        if (borrowing.status === 'past') {
          books.past.push({
            name: borrowing.book.name,
            userScore: borrowing.score,
          })
        }
        if (borrowing.status === 'present') {
          books.present.push({
            name: borrowing.book.name,
          })
        }
      });
    }

    return {
      id: user.id,
      name: user.name,
      books,
    };
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }
  
  async updateUser(userId: number, userData: Partial<User>): Promise<User | undefined> {
    let user = await this.getUser(userId);
    if (!user) {
      return null;
    }
    user = { ...user, ...userData };
    return this.userRepository.save(user);
  }

  async deleteUser(userId: number): Promise<any | undefined> {
    let user = await this.getUser(userId);
    if (!user) {
      return null;
    }
    return this.userRepository.remove(user);
  }

  async borrowBook(userId: number, bookId: number): Promise<any | undefined> {
    const user = await this.getUser(userId);
    if (!user) {
      return null;
    }
    const book = await this.bookService.getBook(bookId);
    if (!book) {
      return null;
    }
    const borrowing = await this.borrowingService.borrowBook(user, book);
    return borrowing;
  }


  async returnBook(userId: number, bookId: number, score: number): Promise<any | undefined> {
    const user = await this.getUser(userId);
    if (!user) {
      return null;
    }
    const book = await this.bookService.getBook(bookId);
    if (!book) {
      return null;
    }
    const borrowing = await this.borrowingService.returnBook(user, book, score);
    return borrowing;
  }
}
