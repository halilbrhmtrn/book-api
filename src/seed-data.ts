import { User } from "./entity/User";
import { Book } from "./entity/Book";
import { Borrowing } from "./entity/Borrowing";

export const bulkInsertSeedData = async (AppDataSource) => {
    const userRepository = AppDataSource.getRepository(User);
    const bookRepository = AppDataSource.getRepository(Book);
    const borrowingRepository = AppDataSource.getRepository(Borrowing);
    const users = [
      { name: "Eray Aslan" },
      { name: "Enes Faruk Meniz" },
      { name: "Sefa Eren Şahin" },
      { name: "Kadir Mutlu" },
    ];
    const books = [
      { name: "The Hitchhiker's Guide to the Galaxy" },
      { name: "I, Robot" },
      { name: "Dune" },
      { name: "1984" },
      { name: "Brave New World" },
    ];

    const borrowings = [
      { userId: 2, bookId: 1, score: 10, status: "past" },
      { userId: 2, bookId: 2, score: 5, status: "past" },
      { userId: 2, bookId: 5, score: null, status: "present" },
    ];


    await Promise.all(
      users.map((user) => userRepository.save(user))
    );

    await Promise.all(
      books.map((book) => bookRepository.save(book))
    );

    await Promise.all(
      borrowings.map((borrowing) => {
        const cr = borrowingRepository.create({
          user: { id: borrowing.userId },
          book: { id: borrowing.bookId },
          status: borrowing.status,
        });
        return borrowingRepository.save(cr);
      })
    );

}