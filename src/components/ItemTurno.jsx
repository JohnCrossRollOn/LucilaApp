import { useState } from 'react';

export default ({ turno, señarTurno, borrarTurno }) => {
  const admin = false;
  const [editar, setEditar] = useState(false);
  return (
    <div className="pl-4 p-1 border border-slate-300 rounded-md flex justify-between">
      <div>
        <div className="text-xl font-bold">Turno</div>
        <div className="font-mono text-sm">
          desde las{' '}
          <strong className="border border-slate-500 px-1 rounded-md break-keep whitespace-nowrap">
            {new Date(turno.desde).toLocaleTimeString()}
          </strong>{' '}
          <br />
          hasta las{' '}
          <strong className="border border-slate-500 px-1 rounded-md break-keep whitespace-nowrap">
            {new Date(turno.hasta).toLocaleTimeString()}
          </strong>{' '}
        </div>
      </div>
      <div className="flex justify-evenly">
        {admin ? (
          <>
            <button
              id={turno.id}
              className="border border-slate-500 rounded-md px-2 ml-auto"
              onClick={borrarTurno}
            >
              borrar turno
            </button>
          </>
        ) : turno.user ? (
          <strong>{turno.user}</strong>
        ) : (
          <button
            id={turno.id}
            className="border border-slate-500 rounded-md px-2 ml-auto"
            onClick={señarTurno}
          >
            señar turno
          </button>
        )}
      </div>
    </div>
  );
};
