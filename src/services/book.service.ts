import { Repository } from 'typeorm';
import { Book } from '../entity/Book';
import { AppDataSource } from '../data-source';

export class BookService {
  private bookRepository: Repository<Book>;

  constructor() {
    this.bookRepository = AppDataSource.getRepository(Book);
  }

  async getBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async getBook(bookId: number): Promise<Book | undefined> {
    return this.bookRepository.findOne({
        where: { id: bookId },
        relations: ['user'],
    });
  }

  async createBook(name: string): Promise<Book> {
    const newBook = this.bookRepository.create({ name });
    await this.bookRepository.save(newBook);
    return newBook;
  }
}
