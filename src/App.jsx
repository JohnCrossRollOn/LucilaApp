import { Routes, Route } from 'react-router-dom';
import ListaTurnos from './components/ListaTurnos';
import Nav from './components/Nav';

export default () => {
  return (
    <div className="min-h-[100vh] bg-gradient-to-b from-pink-200 to-pink-300">
      <Nav />
      <br />
      <p>{new Date().toLocaleString()}</p>
      <br />
      <div className="md:px-4">
        <Routes>
          <Route path="" element={<ListaTurnos />} />
        </Routes>
      </div>
    </div>
  );
};
