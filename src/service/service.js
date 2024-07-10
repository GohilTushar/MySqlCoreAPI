import User from "../model/user.model.js";
import Book from "../model/book.model.js";

const existanceOfUser = async (email) =>
  await User.findOne({ where: { email } });

const userCreation = async (name, email, password, gender, interest, imgUrl) =>
  await User.create({
    name: name,
    email: email,
    password: password,
    gender: gender,
    interest: interest,
    image: imgUrl,
  });

const getUserList = async () => await User.findAll();


const userUpdate = async (newData, id, imgUpload) =>
  await User.update({ ...newData, image: imgUpload }, { where: { id } });

const userDeletion = async (id) => await User.destroy({ where: { id } });

const existanceOfUserForBook = async (id) => await User.findByPk(id);

const bookCreation = async (bookData, userId) =>
  await Book.create({ ...bookData, userId });

const allBooks = async (searchQuery) => await Book.findAndCountAll(searchQuery);

const getBookDetail = async (userId, id) =>
  await Book.findOne({ where: { userId, id } });

const updateBookDetail = async (newBookData, userId, id) =>
  await Book.update(newBookData, { where: { userId, id } });

const bookDeletion = async (userId, id) =>
  await Book.destroy({ where: { userId, id } });

export {
  existanceOfUser,
  getUserList,
  userDeletion,
  existanceOfUserForBook,
  userCreation,
  bookCreation,
  allBooks,
  getBookDetail,
  updateBookDetail,
  bookDeletion,
  userUpdate,
};
