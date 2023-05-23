import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';
import UserHome from './UserHome';
import { useState } from 'react';
import ClientHome from './ClientHome';
import AdminHome from './AdminHome';
import MyBooks from './MyBooksComponent';

const Layout = (props) => {
  const router = useRouter();
  const [add, setAdd] = useState(false);

  const {clientAdd, setClientAdd} = props

  const title = props.title ? props.title : '';
  const handleButton = props.handleButton;
  return (
    <div>
      <Header
        handleButton={handleButton}
        title={title}
        setAdd={setAdd}
        add={add}
      />
      <div className="pb-4">
        {router.pathname === '/user' ? (
          <UserHome setAdd={setAdd} add={add} />
        ) : router.pathname === '/client' ? (
          <ClientHome clientAdd={clientAdd} setClientAdd={setClientAdd} />
        ) : router.pathname === '/admin' ? (
          <AdminHome />
        ) : router.pathname === '/mybooks' ? (
          <MyBooks />
        ) : (
          ''
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
