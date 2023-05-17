import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function Example(props) {
  const add = props.add;
  const setAdd = props.setAdd;

  const handleSubmit = (e) => {
    e.preventDefault();

    const author = document.getElementById("author").value;
    const name = document.getElementById("name").value;
    const publisher = document.getElementById("publisher").value;

    if (author && name && publisher) {
      console.log("ALl PERFECT");
      setAdd(!add);
    } else {
      alert("Please fill all the fields");
    }
  };
  return (
    <Transition.Root show={add} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setAdd}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                <form onSubmit={handleSubmit}>
                  <div>
                    <h2 className="text-center font-xl text-black font-bold">
                      ADD BOOK
                    </h2>

                    <div className="grid grid-cols-2">
                      <div className="block mt-4">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          id="name"
                          className="block rounded-md border border-gray-400 px-4 py-1.5"
                        />
                      </div>
                      <div className="block mt-4">
                        <label htmlFor="author">Author</label>
                        <input
                          type="text"
                          id="author"
                          className="block rounded-md border border-gray-400 px-4 py-1.5"
                        />
                      </div>
                      <div className="block mt-4">
                        <label htmlFor="publisher">Publisher</label>
                        <input
                          type="text"
                          id="publisher"
                          className="block rounded-md border border-gray-400 px-4 py-1.5"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 flex items-center justify-end gap-4">
                    <button
                      type="submit"
                      className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-gray-600 px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                      onClick={() => setAdd(false)}
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
