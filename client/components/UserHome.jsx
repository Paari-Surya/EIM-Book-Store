import React from "react";
import { useEffect } from "react";
import Book from "./Book";
import { useState } from "react";
import BookDetail from "./BookDetail";
import AddBook from "./AddBook";

const UserHome = (props) => {
  const [books, setBooks] = useState();
  const [open, setOpen] = useState(false);
  const [singleBook, setSingleBook] = useState();

  const add = props.add;
  const setAdd = props.setAdd;

  useEffect(() => {
    fetch("/api/booklist", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setBooks(res.result.data.data);
      });
  }, []);

  const handleClick = (book) => {
    setSingleBook(book);
  };
  return (
    <div>
      <div className="mt-4 container mx-auto">
        <h2 className="text-xl font-bold text-gray-700">
          TOP 10 BOOKS OF THE WEEK
        </h2>
        <div className="grid grid-cols-4 gap-5 mt-2">
          {books &&
            books.map((book, i) => (
              <Book
                key={i}
                open={open}
                setOpen={setOpen}
                handleClick={handleClick}
                book={book}
              />
            ))}
        </div>
      </div>
      <BookDetail singleBook={singleBook} setOpen={setOpen} open={open} />
      <AddBook setAdd={setAdd} add={add} />
    </div>
  );
};

export default UserHome;
