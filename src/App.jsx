import { Routes, Route } from 'react-router-dom';
import ListaTurnos from './components/ListaTurnos';
import Nav from './components/Nav';

export default () => {
  return (
    <div className="min-h-screen bg-slate-800 text-slate-200">
      <Nav />
      <br />
      <div className="px-4 md:px-16 lg:px-64">
        <Routes>
          <Route path="" element={<ListaTurnos />} />
        </Routes>
      </div>
    </div>
  );
};
