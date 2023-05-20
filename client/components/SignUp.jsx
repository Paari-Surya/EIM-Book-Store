import React from "react";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";

const SignUp = (props) => {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const userName = document.getElementById("username").value;
    const role = document.getElementById("role").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (name && userName && role && email && password && confirmPassword) {
      if (password === confirmPassword) {
        fetch("/api/signup", {
          method: "POST",
          body: JSON.stringify({
            userName: userName,
            name: name,
            email: email,
            role: role,
            password: password,
            confirmPassword: confirmPassword,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.result.status === "success") {
              router.push("/user");
            }
          });
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
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
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
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="block w-full focus:outline-none rounded-md px-4 py-1.5 text-gray-700 border border-gray-400"
              />
            </div>
            <div className="block mt-2 px-4">
              <label htmlFor="role">Role</label>
              <select
                className="block w-full border border-gray-400 rounded-md px-4 py-1.5"
                name="role"
                id="role"
              >
                <option value="user">User</option>
                <option value="client">Client</option>
              </select>
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

        <div className="block mt-3">
          <p className="text-center">
            Already have an account{" "}
            <span>
              <a className="text-blue-700 font-medium hover:underline" href="/">
                Login
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
