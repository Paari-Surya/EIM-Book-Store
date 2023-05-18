import Layout from '@/components/layout';
import Login from '@/components/login';
import { useState } from 'react';
export default function Home() {
  return (
    <div>
      <Login />
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const cookies = req.cookies;
  const sessionId = cookies.sessionId;
  const role = cookies.role;
  if (sessionId && role === 'user') {
    return {
      redirect: {
        destination: '/user',
      },
    };
  }

  if (sessionId && role === 'client') {
    return {
      redirect: {
        destination: '/client',
      },
    };
  }

  return {
    props: {},
  };
}
