import { useState } from 'react';
import esAdmin from './esAdmin';
import { useAuth0 } from '@auth0/auth0-react';

export default ({ turno, señarTurno, borrarTurno }) => {
  const [editar, setEditar] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  return (
    <div className="pl-4 p-2 border border-slate-300 rounded-md flex justify-between">
      <div>
        <p className="text-xl font-bold">Turno</p>
        <div className="font-mono text-sm">
          desde las{' '}
          <strong className="border border-slate-500 px-1 rounded-md break-keep whitespace-nowrap">
            {new Date(turno.desde).toLocaleTimeString()}
          </strong>{' '}
          hasta las{' '}
          <strong className="border border-slate-500 px-1 rounded-md break-keep whitespace-nowrap">
            {new Date(turno.hasta).toLocaleTimeString()}
          </strong>{' '}
        </div>
      </div>
      <div className="flex justify-evenly">
        {esAdmin() ? (
          <button
            id={turno.id}
            className="border border-slate-500 rounded-md px-2 ml-auto"
            onClick={borrarTurno}
          >
            {turno.user ? `Borrar turno de ${turno.user}` : 'Borrar Turno'}
          </button>
        ) : turno.user ? (
          <strong>Ya no esta disponible</strong>
        ) : (
          <button
            id={turno.id}
            className="border border-slate-500 rounded-md px-2 ml-auto"
            onClick={señarTurno}
          >
            Señar Turno
          </button>
        )}
      </div>
    </div>
  );
};
