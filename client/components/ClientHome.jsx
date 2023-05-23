import React, { useEffect, useState } from 'react';
import BookDetail from './BookDetail';
import AddBook from './AddBook';
import Book from './Book';

const ClientHome = (props) => {
  const [books, setBooks] = useState();
  const [open, setOpen] = useState(false);
  const [singleBook, setSingleBook] = useState();
  const [allBooks, setAllBooks] = useState();

  const { clientAdd, setClientAdd } = props;

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
          <img
            src="http://localhost:8000/static/public/uploads/img/coverImg1684837306575.jpg"
            alt="coverImg"
          />
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
          <div className="grid grid-cols-3 gap-5 mt-2">
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
        <AddBook setClientAdd={setClientAdd} clientAdd={clientAdd} />
      </div>
    </>
  );
};

export default ClientHome;
