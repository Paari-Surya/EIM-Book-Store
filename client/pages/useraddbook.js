import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";

const UserAddBook = () => {
  const router = useRouter();
  const [singleBook, setSingleBook] = useState();

  useEffect(() => {
    const { data } = router.query;
    if (data) {
      const decodedData = decodeURIComponent(data);
      const deserializedObject = JSON.parse(decodedData);
      setSingleBook(deserializedObject);

      console.log(deserializedObject);
    }
  }, []);

  const handleClick = (e, singleBook) => {
    fetch("/api/useraddbook", {
      method: "POST",
      body: JSON.stringify({
        bookId: singleBook.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result.status === "success") {
          router.push("/user");
        }
      });
  };

  console.log(singleBook);
  return (
    <>
      <Header />
      <div>
        <div className="space-y-4 mt-10 w-2/3 py-4 border border-gray-300 mx-auto shadow-lg rounded-lg">
          <div className="mb-4 text-center font-xl text-black font-bold">
            BOOK DETAILS
          </div>
          <div className="grid grid-cols-2">
            <div>
              <p className="text-base text-center font-bold text-gray-900">
                Name
              </p>
            </div>
            <div>
              <p className="text-base text-center capitalize font-bold text-gray-600">
                {singleBook ? singleBook.name.toLowerCase() : ""}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <p className="text-base text-center font-bold text-gray-900">
                Author
              </p>
            </div>
            <div>
              <p className="text-base text-center capitalize font-bold text-gray-600">
                {singleBook ? singleBook.author.toLowerCase() : ""}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <p className="text-base text-center font-bold text-gray-900">
                Publisher
              </p>
            </div>
            <div>
              <p className="text-base text-center capitalize font-bold text-gray-600">
                {singleBook ? singleBook.publisher.toLowerCase() : ""}
              </p>
            </div>
          </div>
          <div className="mt-4 block">
            <button
              onClick={(e) => handleClick(e, singleBook)}
              className="block mx-auto rounded px-6 py-3 bg-slate-800 text-white font-medium"
            >
              Add Book
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAddBook;
