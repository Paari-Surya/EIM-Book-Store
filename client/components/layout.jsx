import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import UserHome from "./UserHome";
import { useState } from "react";

const Layout = () => {
  const router = useRouter();
  const [add, setAdd] = useState(false);
  return (
    <div>
      <Header setAdd={setAdd} add={add} />
      <div className="pb-4">
        {router.pathname === "/user" ? (
          <UserHome setAdd={setAdd} add={add} />
        ) : (
          ""
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
