import { gql } from "@apollo/client";

const addSingleBook = gql`
  mutation createBook($name: String, $genre: String, $authorId: ID) {
    createBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;

const addSingleAuthor = gql`
  mutation createAuthor($name: String, $age: Int) {
    createAuthor(name: $name, age: $age) {
      id
      name
    }
  }
`;

const deleteOneBook = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      name
    }
  }
`

const updateOneBook = gql`
  mutation updateBook($id: ID!, $name: String!) {
    updateBook(id: $id, name: $name) {
      id
      name
    }
  }
`;

export { addSingleBook, addSingleAuthor, deleteOneBook, updateOneBook };
