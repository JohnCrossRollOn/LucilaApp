import { useState } from 'react';
import esAdmin from './esAdmin';
import { useAuth0 } from '@auth0/auth0-react';

export default ({ turno, borrarTurno, modificarTurno }) => {
  const { user, isAuthenticated, loginWithPopup } = useAuth0();

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
            className="border border-slate-500 rounded-md px-2 ml-auto"
            onClick={() => borrarTurno(turno.id)}
          >
            {turno.user ? `Borrar turno de ${turno.user}` : 'Borrar Turno'}
          </button>
        ) : turno.user ? (
          <strong>Ya no esta disponible</strong>
        ) : (
          <button
            id={turno.id}
            className="border border-slate-500 rounded-md px-2 ml-auto"
            onClick={() =>
              isAuthenticated
                ? modificarTurno({ ...turno, user: user.email })
                : loginWithPopup()
            }
          >
            Señar Turno
          </button>
        )}
      </div>
    </div>
  );
};
