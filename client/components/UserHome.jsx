import React from 'react';
import { useEffect } from 'react';
import Book from './Book';
import { useState } from 'react';
import BookDetail from './BookDetail';
import AddBook from './AddBook';
import { useRouter } from 'next/router';

const UserHome = (props) => {
  const [books, setBooks] = useState();
  const [open, setOpen] = useState(false);
  const [singleBook, setSingleBook] = useState();

  const router = useRouter();

  const add = props.add;
  const setAdd = props.setAdd;

  useEffect(() => {
    fetch('/api/booklist', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setBooks(res.result.data.data);
        console.log('UserHome', res.result.data.data);
      });
  }, []);

  const handleClick = (book) => {
    const serializedObject = encodeURIComponent(JSON.stringify(book));
    router.push(`/useraddbook?data=${serializedObject}`);
  };
  return (
    <div>
      <div className="mt-4 container px-20 mx-auto">
        <h2 className="text-xl font-bold text-gray-700">
          TOP 10 BOOKS OF THE WEEK
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-2">
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
      {/* <AddBook setAdd={setAdd} add={add} /> */}
    </div>
  );
};

export default UserHome;
