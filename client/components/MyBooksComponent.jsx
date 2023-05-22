import React, { useEffect, useState } from 'react';
import Book from './Book';

const MyBooks = () => {
  const [mybooks, setMyBooks] = useState();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetch('/api/getclient', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result.status === 'success') {
          setMyBooks(res.result.data.books);
        }
      });
  }, []);

  const handleClick = (book) => {
    const serializedObject = encodeURIComponent(JSON.stringify(book));
    router.push(`/useraddbook?data=${serializedObject}`);
  };
  return (
    <div>
      <div>
        <div className="mt-4 container px-20 mx-auto">
          <h2 className="text-xl font-bold text-gray-700">MY BOOKS</h2>
          <div className="grid grid-cols-4 gap-5 mt-2">
            {mybooks &&
              mybooks.map((book, i) => (
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
        {/* <AddBook setAdd={setAdd} add={add} /> */}
      </div>
    </div>
  );
};

export default MyBooks;
