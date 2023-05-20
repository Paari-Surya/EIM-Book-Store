import { useEffect } from "react";
import { useRouter } from "next/router";

const SignOutButton = () => {
  const router = useRouter();

  const handleClearCookies = () => {
    // Clear cookies on the client-side
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    // Clear cookies on the server-side
    fetch("/api/clear-cookies")
      .then(() => {
        // Redirect to the homepage after clearing cookies
        router.push("/");
      })
      .catch((error) => {
        console.error("Error clearing cookies:", error);
      });
  };

  return (
    <button
      onClick={handleClearCookies}
      className="ml-3 flex items-center gap-2 bg-black text-gray-300 px-4 py-2 hover:text-white rounded font-bold"
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
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
      <span>Sign Out</span>
    </button>
  );
};

export default SignOutButton;
