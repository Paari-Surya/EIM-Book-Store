import React from 'react';
import SignUpComponent from '@/components/SignUp';

const SignUp = () => {
  return (
    <div>
      <SignUpComponent />
    </div>
  );
};

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

export default SignUp;
