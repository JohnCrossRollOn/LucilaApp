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
    <div
      className={`p-2 grid grid-cols-2 gap-2 ${
        turno.user
          ? turno.user === user?.email
            ? 'bg-green-200'
            : 'grayscale'
          : 'border border-slate-300'
      } shadow-md rounded-md flex justify-between`}
    >
      <h4 className="text-2xl">Turno</h4>
      <span className={'text-right text-2xl font-extrabold'}>
        {turno.user
          ? turno.user === user?.email
            ? 'señado'
            : 'no disponible'
          : 'libre'}
      </span>
      <div className="text-md text-center font-light tracking-widest grid grid-cols-1 md:grid-cols-2 gap-2">
        <span className="hidden md:block">desde las</span>
        <input
          type="time"
          className={`border-2 border-primario text-md pl-10 font-bold tracking-widest text-center ${
            turno.user && turno.user === user?.email
              ? 'text-white bg-primario'
              : 'text-primario'
          } w-min rounded-full`}
          defaultValue={aTimeInput(turno.desde)}
          onChange={(e) =>
            modificarTurno({
              ...turno,
              desde: deTimeInputANumber(e.target.value, turno.desde),
            })
          }
          readOnly={!esAdmin()}
        />
        <span className="hidden md:block">hasta las</span>
        <input
          type="time"
          className={`border-2 border-primario text-md pl-10 font-bold tracking-widest text-center ${
            turno.user && turno.user === user?.email
              ? 'text-white bg-primario'
              : 'text-primario'
          } w-min rounded-full`}
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
      <div className="flex justify-end items-center">
        {esAdmin() ? (
          <button
            className="border border-slate-500 rounded-md px-2 ml-auto"
            onClick={() => borrarTurno(turno.id)}
          >
            {turno.user ? `Borrar turno de ${turno.user}` : 'Borrar Turno'}
          </button>
        ) : turno.user ? (
          turno.user === user?.email ? (
            <p className="font-MaterialIcons text-[4rem] px-2 leading-3">
              task_alt
            </p>
          ) : (
            <p className="font-MaterialIcons"></p>
          )
        ) : (
          <button
            id={turno.id}
            className="border-2 border-primario text-primario font-MaterialIcons text-[4rem] leading-none rounded-md px-2 ml-auto h-full"
            onClick={() =>
              isAuthenticated
                ? modificarTurno({ ...turno, user: user.email })
                : loginWithPopup()
            }
          >
            person_add_alt
          </button>
        )}
      </div>
    </div>
  );
};
