import React, { useState } from "react";
import { useEffect } from "react";
import Book from "./Book";

const AdminHome = () => {
  const [allBooks, setAllBooks] = useState();
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    fetch("/api/booklist", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAllBooks(res.result.data.data);
      });

    fetch("/api/userslist", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result.status === "success") {
        }
      });
  }, []);
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-700">All Books</h2>
      <div className="grid grid-cols-4 gap-5 mt-2">
        {allBooks &&
          allBooks.map((book, i) => (
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
  );
};

export default AdminHome;
