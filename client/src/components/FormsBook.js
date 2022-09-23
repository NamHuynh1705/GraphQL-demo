import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useQuery, useMutation } from "@apollo/client";
import { getAuthors, getBooks } from "../graphql-client/queries";
import { addSingleBook } from "../graphql-client/mutation";
import FormAuthor from "./FormAuthor";

const FormsBook = () => {
  const { loading, error, data } = useQuery(getAuthors);
  const [createBook, dataMutation] = useMutation(addSingleBook);
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const onSubmit = event => {
    event.preventDefault();
    if (newBook?.name !== "" && newBook?.genre !== "") {
      createBook({
        variables: newBook,
        refetchQueries: () => [getBooks], // refetch lại list books khi thêm mới
      });
      setNewBook({
        name: "",
        genre: "",
        authorId: "",
      });
    }
  };

  return (
    <Row>
      <Col>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Book name"
              value={newBook?.name}
              name="name"
              onChange={(e) =>
                setNewBook((preState) => {
                  return {
                    ...preState,
                    name: e.target.value,
                  };
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              name="genre"
              value={newBook?.genre}
              placeholder="Book genre"
              onChange={(e) =>
                setNewBook((preState) => {
                  return {
                    ...preState,
                    genre: e.target.value,
                  };
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              name="author"
              value={newBook?.authorId}
              onChange={(e) =>
                setNewBook((preState) => {
                  return {
                    ...preState,
                    authorId: e.target.value,
                  };
                })
              }
            >
              <option disabled value={''}>Select author</option>
              {data?.authors?.length > 0 &&
                data?.authors?.map((item, index) => {
                  return (
                    <option key={index} value={item?.id}>
                      {item?.name}
                    </option>
                  );
                })}
            </Form.Control>
          </Form.Group>
          <Button className="float-right" variant="info" type="submit">
            Add Book
          </Button>
        </Form>
      </Col>

      <Col>
        <FormAuthor />
      </Col>
    </Row>
  );
};

export default FormsBook;
