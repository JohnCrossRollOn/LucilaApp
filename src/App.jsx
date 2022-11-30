import { Routes, Route } from 'react-router-dom';
import ListaTurnos from './components/ListaTurnos';
import Nav from './components/Nav';
import { createContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AdminContext = createContext();
export { AdminContext };

export default () => {
  const { user } = useAuth0();

  return (
    <AdminContext.Provider
      value={['juanrolon54@outlook.com'].includes(user?.email)}
    >
      <div className="min-h-[100vh] bg-gradient-to-b from-pink-200 to-pink-300">
        <Nav />
        <br />
        <p>{new Date().toLocaleString()}</p>
        <br />
        <div className="px-4">
          <Routes>
            <Route path="" element={<ListaTurnos />} />
          </Routes>
        </div>
      </div>
    </AdminContext.Provider>
  );
};
