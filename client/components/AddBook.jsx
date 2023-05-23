import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

export default function Example(props) {
  const { clientAdd, setClientAdd } = props;

  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [coverimage, setCoverImage] = useState('');
  const [bookpdf, setBookPdf] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };
  const handlePublisherChange = (e) => {
    setPublisher(e.target.value);
  };
  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };
  const handleBookPdfChange = (e) => {
    setBookPdf(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      'data',
      `${JSON.stringify({
        name,
        author,
        publisher,
        owner: '646b631953156234727a1a4b',
      })}`
    );
    formData.append('coverImg', coverimage, coverimage.name);
    formData.append('book', bookpdf, bookpdf.name);

    if ((name, author, publisher)) {
      (async () => {
        try {
          const postData = await axios.post(
            'http://192.168.1.9:8000/api/v1/books/',
            formData,
            {
              'Content-Type': `multipart/form-data;boundary=${formData._boundary}`,
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmI2MzE5NTMxNTYyMzQ3MjdhMWE0YiIsImlhdCI6MTY4NDgzMzEzMiwiZXhwIjoxNjkyNjA5MTMyfQ.2OX6W2_Js_W6OVvAKgyjouZJz1Xb8o_qJnNzI8MBmtQ`,
              },
              body: formData,
            }
          );
          const responseData = await postData.data;
          if (responseData.result.status === 'success') {
            console.log('Book Created');
          }
        } catch (err) {
          console.log(err.response?.data);
        }
      })();
    }
  };

  return (
    <Transition.Root show={clientAdd} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setClientAdd}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                  <h2 className="text-center font-xl text-black font-bold">
                    ADD BOOK
                  </h2>
                  <div className="grid grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={handleNameChange}
                        className="block px-4 py-1.5 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label htmlFor="author" className="block">
                        Author
                      </label>
                      <input
                        type="text"
                        id="author"
                        onChange={handleAuthorChange}
                        className="block px-4 py-1.5 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="publisher" className="block">
                        Publisher
                      </label>
                      <input
                        type="text"
                        id="publisher"
                        onChange={handlePublisherChange}
                        className="block px-4 py-1.5 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p>Cover Image</p>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="coverImg"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="coverImg"
                              name="coverImg"
                              type="file"
                              className="sr-only"
                              onChange={handleCoverImageChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>Book</p>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="bookPdf"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="bookPdf"
                              name="bookPdf"
                              type="file"
                              accept="application/pdf"
                              className="sr-only"
                              onChange={handleBookPdfChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 flex items-center justify-end gap-4">
                    <button
                      type="submit"
                      className=" rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => setClientAdd(false)}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className=" rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                      onClick={() => setClientAdd(false)}
                    >
                      Go back to dashboard
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
