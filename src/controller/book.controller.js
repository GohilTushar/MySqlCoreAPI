import { Op } from "sequelize";
import { messageObject, pageConstant } from "../config/messageConstant.js";
import {
  allBooks,
  bookCreation,
  bookDeletion,
  existanceOfUserForBook,
  getBookDetail,
  updateBookDetail,
} from "../service/service.js";
const { book } = messageObject;

const createBook = async (req, res) => {
  const { id } = req.user;
  try {
    const bookData = req.body;
    const userExist = await existanceOfUserForBook(id);

    if (!userExist)
      return res.status(400).json({ message: book.userNotFounded });

    await bookCreation(bookData, id);

    return res.status(201).json({ message: book.bookCreated });
  } catch (err) {
    return res.status(500).json({ error: err, message: book.serverError });
  }
};

const bookList = async (req, res) => {
  try {
    const {
      page = pageConstant.page,
      limit = pageConstant.limit,
      search = "",
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const offset = (pageNumber - 1) * limitNumber;
    const { id } = req.user;
    const searchQuery = {
      where: {
        userId: id,
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { author: { [Op.like]: `%${search}%` } },
          { category: { [Op.like]: `%${search}%` } },
        ],
      },
      offset,
      limit: limitNumber,
    };
    const { rows: books, count: totalBooks } = await allBooks(searchQuery);

    if (totalBooks == 0)
      return res.status(404).json({ message: book.bookNotFounded });

    const totalPages = Math.ceil(totalBooks / limitNumber);

    if (pageNumber > totalPages) {
      return res.status(400).json({ message: book.exceedLimit });
    }

    return res.status(200).json({
      BookList: books,
      pagination: {
        totalBooks,
        totalPages,
        currentPage: pageNumber,
        pageSize: limitNumber,
      },
      search: search,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: book.serverError });
  }
};

const bookDetail = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const bookData = await getBookDetail(userId, id);
    return res.status(200).json({ bookData });
  } catch (err) {
    return res.status(500).json({ error: err, message: book.serverError });
  }
};

const updateBook = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const newBookData = req.body;

    const updatedCount = await updateBookDetail(newBookData, userId, id);
    if (updatedCount)
      return res.status(200).json({ message: book.bookUpdated });
    return res.status(400).json({ message: book.bookNotFounded });
  } catch (err) {
    return res.status(500).json({ error: err, message: book.serverError });
  }
};
const deleteBook = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const deletedCount = await bookDeletion(userId, id);
    if (deletedCount)
      return res.status(200).json({ message: book.bookDeleted });
    return res.status(400).json({ message: book.bookNotFounded });
  } catch (err) {
    return res.status(500).json({ error: err, message: book.serverError });
  }
};

export { createBook, bookList, bookDetail, updateBook, deleteBook };
