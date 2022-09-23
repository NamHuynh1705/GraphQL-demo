import React from "react";
import Card from "react-bootstrap/Card";

import { useQuery } from "@apollo/client";
import { getBookById } from "../graphql-client/queries";

const BookDetails = ({id}) => {
  const { loading, error, data } = useQuery(getBookById, {
    variables: {
      id: id
    },
    skip: id === null // nó sẽ skip bỏ qua k chạy case này
  });

  return (
    <Card bg="info" text="white" className="shadow">
      {loading ? (
        "Loading..."
      ) : data ? (
        <Card.Body>
          <Card.Title>{data?.book?.name}</Card.Title>
          <Card.Subtitle>{data?.book?.genre}</Card.Subtitle>
          <Card.Text>
            <p>{data?.book?.author?.name}</p>
            <p>Age: {data?.book?.author?.age}</p>
            <p>All books by this author</p>
            <ul>
              {data?.book?.author?.books?.length > 0 &&
                data?.book?.author?.books?.map((item, index) => {
                  return <li key={index}>{item?.name}</li>;
                })}
            </ul>
          </Card.Text>
        </Card.Body>
      ) : (
        "Vui lòng chọn 1 sách nào đó"
      )}
    </Card>
  );
};

export default BookDetails;
