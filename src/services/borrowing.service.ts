import { Repository } from 'typeorm';
import { Borrowing } from '../entity/Borrowing';
import { AppDataSource } from '../data-source';

export class BorrowingService {
  private borrowingRepository: Repository<Borrowing>;

  constructor() {
    this.borrowingRepository = AppDataSource.getRepository(Borrowing);
  }

  async borrowBook(user: any, book: any): Promise<any> {
    const borrowing = this.borrowingRepository.create({
      user: { id: user.id },
      book: { id: book.id },
      status: 'present',
    });
    await this.borrowingRepository.save(borrowing);


    return borrowing;
  }

  async returnBook(user: any, book: any, score: number): Promise<any | undefined> {
    const borrowing = await this.borrowingRepository.findOne({
      where: { user: { id: user.id }, book: { id: book.id }, status: 'present'},
    });
    if (!borrowing) {
      return null;
    }
    borrowing.status = 'past';
    borrowing.score = score;
    return this.borrowingRepository.save(borrowing);
  }
  
}