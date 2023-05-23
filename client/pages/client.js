import Layout from '@/components/layout';
import React from 'react';
import { useState } from 'react';

const Client = () => {

  const [clientAdd, setClientAdd] = useState(false)

  const title = 'Add Book';
  const handleButton = () => {
     setClientAdd(!clientAdd);
  };
  return (
    <div>
      <Layout clientAdd={clientAdd} setClientAdd={setClientAdd} handleButton={handleButton} title={title} />
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
        destination: '/',
        permanent: false,
      },
    };
  }

  if (role != 'client') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Client;
