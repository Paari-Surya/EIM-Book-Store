import Layout from '@/components/layout';
import React from 'react';
import { useState } from 'react';

const Client = ({ sessionId, userUuid, role }) => {

  const [clientAdd, setClientAdd] = useState(false)

  

  const title = 'Add Book';
  const handleButton = () => {
     setClientAdd(!clientAdd);
  };
  return (
    <div>
      <Layout sessionId={sessionId} userUuid={userUuid} role={role} clientAdd={clientAdd} setClientAdd={setClientAdd} handleButton={handleButton} title={title} />
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  const cookies = req.cookies;
  let sessionId = cookies.sessionId;
  let role = cookies.role;
  let userUuid = cookies.userUuid

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
    props: {
      sessionId, userUuid, role
    },
  };
}

export default Client;
