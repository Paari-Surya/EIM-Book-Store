import React, { useEffect, useState } from 'react';
import BookDetail from './BookDetail';
import AddBook from './AddBook';
import Book from './Book';

const ClientHome = (props) => {
  const [clientDetails, setClientDetails] = useState();
  const [books, setBooks] = useState();
  const [open, setOpen] = useState(false);
  const [singleBook, setSingleBook] = useState();
  const [allBooks, setAllBooks] = useState();

  const add = props.clientAdd;
  const setAdd = props.setClientAdd;

  const handleClick = (book) => {
    setSingleBook(book);
  };

  useEffect(() => {
    fetch('/api/getclient', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result.status === 'success') {
          setClientDetails(res.result);
          setBooks(res.result.data.myBooks);
        }
      });
    fetch('/api/booklist', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAllBooks(res.result.data.data);
      });
  }, []);
  return (
    <>
      <div>
        <div className="mt-4 container px-20 mx-auto">
          {books && books.length > 0 && (
            <h2 className="text-xl font-bold text-gray-700">MY BOOKS</h2>
          )}
          <div className="grid grid-cols-4 gap-5 mt-2">
            {books &&
              books.length > 0 &&
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
        <BookDetail singleBook={singleBook} setOpen={setOpen} open={open} />
        <AddBook setAdd={setAdd} add={add} />
      </div>
    </>
  );
};

export default ClientHome;
