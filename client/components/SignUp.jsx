import React from "react";

const SignUp = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fname = document.getElementById("firstName").value;
    const lname = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (fname && lname && phone && email && password && confirmPassword) {
      if (password === confirmPassword) {
        console.log("Perfect");
      }
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="block border border-gray-300 w-1/2 rounded-lg shadow-lg px-4 py-5">
        <h3 className="text-xl font-bold text-gray-800 text-center">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="block mt-2 px-4">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                className="block w-full focus:outline-none rounded-md px-4 py-1.5 text-gray-700 border border-gray-400"
              />
            </div>
            <div className="block mt-2 px-4">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="block w-full focus:outline-none rounded-md px-4 py-1.5 text-gray-700 border border-gray-400"
              />
            </div>
            <div className="block mt-2 px-4">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                className="block w-full focus:outline-none rounded-md px-4 py-1.5 text-gray-700 border border-gray-400"
              />
            </div>
            <div className="block mt-2 px-4">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                className="block w-full focus:outline-none rounded-md px-4 py-1.5 text-gray-700 border border-gray-400"
              />
            </div>
            <div className="block mt-2 px-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="block w-full focus:outline-none rounded-md px-4 py-1.5 password-gray-700 border border-gray-400"
              />
            </div>
            <div className="block mt-2 px-4">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="block w-full focus:outline-none rounded-md px-4 py-1.5 text-gray-700 border border-gray-400"
              />
            </div>
          </div>
          <div className="block mt-4">
            <button className="block px-4 py-2 mx-auto bg-blue-700 text-white rounded ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  const cookies = req.cookies;
  console.log(cookies);
}

export default SignUp;
