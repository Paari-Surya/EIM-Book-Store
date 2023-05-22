import Layout from '@/components/layout';
import React from 'react';
import { useRouter } from 'next/router';

const MyBooks = () => {
  const router = useRouter();

  const handleButton = () => {
    router.push('/user');
  };
  return (
    <div>
      <Layout title="All Books" handleButton={handleButton} />
    </div>
  );
};

export default MyBooks;
