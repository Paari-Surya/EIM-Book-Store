import React from "react";
import Layout from "@/components/layout";

const User = () => {
  return (
    <div>
      <Layout />
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  const cookies = req.cookies;
  const sessionId = cookies.sessionId;
  const role = cookies.role;

  if (!sessionId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (role != "user") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default User;
