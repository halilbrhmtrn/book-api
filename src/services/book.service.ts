import { Repository } from 'typeorm';
import { Book } from '../entity/Book';
import { Borrowing } from '../entity/Borrowing';
import { AppDataSource } from '../data-source';

export class BookService {
  private bookRepository: Repository<Book>;
  private borrowingRepository: Repository<Borrowing>;

  constructor() {
    this.bookRepository = AppDataSource.getRepository(Book);
    this.borrowingRepository = AppDataSource.getRepository(Borrowing);
  }

  async getBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }
  
  async getBook(bookId: number): Promise<any | undefined> {
    const scoresOfBook = await this.borrowingRepository.find({
      where: { book: { id: bookId } },
    });

    const book = await this.bookRepository.findOne({where: { id: bookId }});

    if (!book) {
      return undefined;
    }

    if (scoresOfBook.length === 0) {
      return {
        ...book,
        score: -1,
      };
    } else {
      const totalScore = scoresOfBook.reduce((acc, curr) => acc + curr.score, 0);
      const averageScore = totalScore / scoresOfBook.length;
      return {
        ...book,
        score: averageScore.toFixed(2),
      };
    }
  }

  async createBook(name: string): Promise<Book> {
    const newBook = this.bookRepository.create({ name });
    await this.bookRepository.save(newBook);
    return newBook;
  }
}
