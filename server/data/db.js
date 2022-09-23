const Book = require("../models/Book");
const Author = require("../models/Author");

const mongoDataMethods = {
  getAllBooks: async (args = null) => {
    const { name, sortType = "asc", sortBy = "name" } = args;
    let arrBooks = [];
    let searchQuery = {};
    if (name && name.trim() !== "") {
      searchQuery = {
        $or: [{ name: { $regex: name, $options: "i" } }],
      };
    }
    let sortQuery = {};
    sortQuery[sortBy] = sortType;

    arrBooks = await Book.find(searchQuery).sort(sortQuery);
    return arrBooks;
  },

  getBookById: async (args) => {
    return await Book.findById(args.id);
  },
  getAllAuthors: async () => await Author.find(),
  getAuthorById: async (args) => {
    return await Author.findById(args?.id || args);
  },

  // Action
  createAuthor: async (args) => {
    const newAuthor = new Author(args);
    return await newAuthor.save();
  },
  createBook: async (args) => {
    const newBook = new Book(args);
    return await newBook.save();
  },
  deleteBook: async (args) => {
    if (!args.id) return;
    return await Book.findByIdAndDelete(args.id);
  },
  updateBook: async (args) => {
    if (!args.id || !args.name) return;
    return await Book.findByIdAndUpdate(args?.id, {
      name: args?.name,
    });
  },
};

module.exports = mongoDataMethods;
