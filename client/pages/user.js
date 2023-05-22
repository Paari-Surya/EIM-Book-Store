import React from "react";
import Layout from "@/components/layout";
import { useRouter } from "next/router";

const User = () => {
  const title = "My Books";
  const router = useRouter();
  const handleButton = () => {
    router.push("/mybooks");
  };
  return (
    <div>
      <Layout handleButton={handleButton} title={title} />
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
