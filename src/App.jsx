import { Routes, Route } from 'react-router-dom';
import Turnos from './components/Turnos';

export default () => {
  return (
    <div className="min-h-[100vh] bg-pink-200">
      <Routes>
        <Route path="" element={<Turnos />} />
      </Routes>
    </div>
  );
};
