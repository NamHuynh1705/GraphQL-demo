const Author = require('../models/Author')
const Book = require("../models/Book");

const resolvers = {
  // QUERY
  Query: {
    books: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAllBooks(args);
    },
    book: async (parent, args, { mongoDataMethods }) => {
      return mongoDataMethods.getBookById(args);
    },

    authors: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAllAuthors();
    },
    author: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAuthorById(args);
    },
  },
  Book: {
    author: async ({ authorId }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(authorId),
  },
  Author: {
    books: async ({ id }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks({ authorId: id }),
  },

  // MUTATION
  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createAuthor(args),
    createBook: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createBook(args),
    deleteBook: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.deleteBook(args),
    updateBook: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.updateBook(args),
  },
};

module.exports = resolvers