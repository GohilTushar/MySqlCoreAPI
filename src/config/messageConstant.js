const messageObject = {
  user: {
    userExisted: "User Already Exist",
    userCreated: "User Created Successfully",
    serverError: "Internal Server Error",
    userNotExisted: "User Not Exist",
    successLogin: "LogIn Successful",
    failedLogin: "Invalid Credentials",
    noToken: "Access Denied: No Token Provided!",
    invalidToken: "Invalid Token",
    uploadTypeError: "Images Only!",
    userDeleted: "User Deleted Successfully",
  },
  book: {
    userNotFounded: "User Not Found!",
    bookCreated: "Book Created Successfully",
    serverError: "Internal Server Error",
    bookNotFounded: "Book not found",
    exceedLimit: "Page number cannot be greater than total pages",
    bookDeleted: "Book Deleted Successfully",
    bookUpdated: "Book Updated Successfully",
  },
};
const pageConstant = {
  page: 1,
  limit: 10,
};
export { messageObject, pageConstant };
