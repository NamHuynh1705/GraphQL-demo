import { gql } from "@apollo/client";

const getBooks = gql`
  query getBooksQuery($name: String, $sortType: String, $sortBy: String) {
    books(name: $name, sortType: $sortType, sortBy: $sortBy) {
      name
      id
    }
  }
`;

const getBookById = gql`
  query getBookById($id: ID!) {
    book(id: $id) {
      name
      genre
      author {
        id
        age
        name
        books {
          id
          name
        }
      }
    }
  }
`;

const getAuthors = gql`
  query getAuthorsQuery {
    authors {
      id
      name
    }
  }
`;

export { getBooks, getBookById, getAuthors };
