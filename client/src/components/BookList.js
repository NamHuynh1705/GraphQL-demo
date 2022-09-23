import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookDetails from "./BookDetails";

import { useMutation, useQuery } from "@apollo/client";
import { getBooks } from "../graphql-client/queries";
import { deleteOneBook, updateOneBook } from "../graphql-client/mutation";

const BookList = () => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  
  const { loading, data, error, refetch } = useQuery(getBooks, {
    variables: {
      name: search || "",
      sortType: sortType || "asc",
      sortBy: sortBy || "asc",
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });
  
  const [deleteBook, dataMutation] = useMutation(deleteOneBook);
  const [updateBook, dataUpdate] = useMutation(updateOneBook);
  const [bookId, setBookId] = useState("");
  const [idBookEdit, setIdBookEdit] = useState(null);
  const [newNameBook, setNewNameBook] = useState("");

  const handleDeleteBook = (id) => {
    if (id) {
      deleteBook({
        variables: {
          id: id,
        },
        refetchQueries: () => [getBooks], // nếu chỉ 1 sài refetchQueries: [{ query: getBooks }] mà ko work, hãy đổi sang cách này
      });
    }
  };

  const handleEditBook = (id, value) => {
    if (id && value?.trim() !== "") {
      updateBook({
        variables: {
          id: id,
          name: value,
        },
        refetchQueries: [{ query: getBooks }],
      });
      setIdBookEdit(null);
      setNewNameBook("");
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
    }
  }

  const hanldeSort = () => {
    setSortType((preState) => preState === "asc" ? "desc" : "asc");
  }

  if (error) return "Error loading books!";
  return (
    <>
      <Row>
        <Col xs={8}>
          <div className="d-flex mb-3">
            <div className="form-floating w-50">
              <input
                type="text"
                // value={search}
                className="form-control"
                placeholder="Search Books"
                // onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
              />
              <label htmlFor="floatingPassword">Search Books</label>
            </div>
            <button
              type="button"
              className="btn btn-primary ms-2"
              onClick={hanldeSort}
            >
              Sort Name: {sortType}
            </button>
          </div>
          {loading
            ? "Loading..."
            : data?.books &&
              data?.books?.map((item, index) => {
                return (
                  <Card
                    key={index}
                    border="info"
                    text="info"
                    className="text-center shadow"
                    onClick={() => setBookId(item?.id)}
                  >
                    <div className="d-flex justify-content-between">
                      <Card.Body
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          setIdBookEdit(item?.id);
                          setNewNameBook(item?.name);
                        }}
                      >
                        {idBookEdit === item?.id ? (
                          <>
                            <input
                              value={newNameBook}
                              onChange={(e) => setNewNameBook(e.target.value)}
                            />
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() =>
                                handleEditBook(item?.id, newNameBook)
                              }
                            >
                              Save
                            </button>
                          </>
                        ) : (
                          <span>{item?.name}</span>
                        )}
                      </Card.Body>{" "}
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBook(item?.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </Card>
                );
              })}
        </Col>
        <Col>
          <BookDetails id={bookId} />
        </Col>
      </Row>
    </>
  );
};

export default BookList;
