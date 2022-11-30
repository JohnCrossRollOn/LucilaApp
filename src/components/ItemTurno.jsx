import esAdmin from './esAdmin';
import { useAuth0 } from '@auth0/auth0-react';

export default ({ turno, borrarTurno, modificarTurno }) => {
  const { user, isAuthenticated, loginWithPopup } = useAuth0();
  const aTimeInput = (turno) => {
    const resultado = new Date(turno);
    return `${
      resultado.getHours() > 9
        ? resultado.getHours()
        : '0' + resultado.getHours()
    }:${
      resultado.getMinutes() > 9
        ? resultado.getMinutes()
        : '0' + resultado.getMinutes()
    }`;
  };
  const deTimeInputANumber = (string, aPartirDe) => {
    const split = string.split(':');
    const resultado = new Date(aPartirDe);
    resultado.setHours(split[0]);
    resultado.setMinutes(split[1]);
    return new Date(resultado).getTime();
  };
  return (
    <div className="pl-4 p-2 border border-slate-300 rounded-md flex justify-between">
      <div>
        <p className="text-xl font-bold">Turno</p>
        <div className="text-sm">
          desde las{' '}
          <input
            type="time"
            className="bg-slate-500 text-white rounded-full pl-6 m-[0.1rem]"
            defaultValue={aTimeInput(turno.desde)}
            onChange={(e) =>
              modificarTurno({
                ...turno,
                desde: deTimeInputANumber(e.target.value, turno.desde),
              })
            }
            readOnly={!esAdmin()}
          />
          <br />
          hasta las{' '}
          <input
            type="time"
            className="bg-slate-500 text-white rounded-full pl-6 m-[0.1rem]"
            defaultValue={aTimeInput(turno.hasta)}
            onChange={(e) =>
              modificarTurno({
                ...turno,
                hasta: deTimeInputANumber(e.target.value, turno.hasta),
              })
            }
            readOnly={!esAdmin()}
          />
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
