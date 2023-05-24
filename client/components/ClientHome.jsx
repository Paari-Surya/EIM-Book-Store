import React, { useEffect, useState } from 'react';
import BookDetail from './BookDetail';
import AddBook from './AddBook';
import Book from './Book';
import MainBooks from '../books.json';

const ClientHome = (props) => {
  const [books, setBooks] = useState();
  const [open, setOpen] = useState(false);
  const [singleBook, setSingleBook] = useState();
  const [allBooks, setAllBooks] = useState();
  const [grid, setGrid] = useState(true);

  const { clientAdd, setClientAdd } = props;

  const { userUuid, sessionId, role } = props;

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
          console.log(res.result.data);
          setBooks(res.result.data.books);
        }
        console.log(res);
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
          <div className="my-4 px-4 py-2 rounded flex items-center justify-end">
            <div className="flex items-center gap-4 px-4 py-2 bg-blue-200 text-gray-700">
              <button
                onClick={() => setGrid(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                  />
                </svg>
              </button>
              <button
                onClick={() => setGrid(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {books && books.length > 0 && (
            <h2 className="text-xl font-bold text-gray-700">MY BOOKS</h2>
          )}

          {grid ? (
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
          ) : (
            books &&
            books.length != 0 && (
              <table className="table-fixed w-full mt-3">
                <tr>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Name
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Author
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Publisher
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Owner
                  </th>
                </tr>
                {books.map((book, i) => (
                  <tr>
                    <td className="px-4 py-2 border border-gray-300">
                      {book.name}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {book.author}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {book.publisher}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {book.owner?.name ? book.owner?.name : book.owner}
                    </td>
                  </tr>
                ))}
              </table>
            )
          )}
          <h2 className="text-xl font-bold text-gray-700 my-5 border-t border-gray-400 py-3">
            All Books
          </h2>
          {grid ? (
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
          ) : (
            <table className="table-fixed w-full mt-3">
              <tr>
                <th className="px-4 py-2 border border-gray-300 text-left">
                  Name
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left">
                  Author
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left">
                  Publisher
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left">
                  Owner
                </th>
              </tr>
              {allBooks.map((book, i) => (
                <tr>
                  <td className="px-4 py-2 border border-gray-300">
                    {book.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {book.author}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {book.publisher}
                  </td>
                  {book.owner ? (
                    <td className="px-4 py-2 border border-gray-300">
                      {book.owner?.name ? book.owner?.name : book.owner}
                    </td>
                  ) : (
                    <td className="px-4 py-2 border border-gray-300">
                      Unknown
                    </td>
                  )}
                </tr>
              ))}
            </table>
          )}
        </div>
        {singleBook && (
          <BookDetail singleBook={singleBook} setOpen={setOpen} open={open} />
        )}
        <AddBook
          sessionId={sessionId}
          userUuid={userUuid}
          role={role}
          setClientAdd={setClientAdd}
          clientAdd={clientAdd}
        />
      </div>
    </>
  );
};

export default ClientHome;
