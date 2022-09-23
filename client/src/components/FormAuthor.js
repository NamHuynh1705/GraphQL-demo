import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useQuery, useMutation } from "@apollo/client";
import { getAuthors, getBooks } from "../graphql-client/queries";
import { addSingleAuthor } from "../graphql-client/mutation";

export default function FormAuthor() {
  const [createAuthor, dataMutation] = useMutation(addSingleAuthor);
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    age: "",
  });

  const handleChange = (e, type) => {
    let author = { ...newAuthor };
    if (type) {
      author[type] = e.target.value;
    }
    setNewAuthor(author);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (newAuthor?.name !== "" && newAuthor?.age !== "") {
      createAuthor({
        variables: {
          name: newAuthor.name,
          age: parseInt(newAuthor.age),
        },
        refetchQueries: [{ query: getAuthors }],
      });
      setNewAuthor({
        name: "",
        age: "",
      });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="invisible">
        <Form.Control />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Author name"
          name="name"
          value={newAuthor.name}
          onChange={(e) => handleChange(e, "name")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="number"
          placeholder="Author age"
          name="age"
          value={newAuthor.age}
          onChange={(e) => handleChange(e, "age")}
        />
      </Form.Group>
      <Button className="float-right" variant="info" type="submit">
        Add Author
      </Button>
    </Form>
  );
}
