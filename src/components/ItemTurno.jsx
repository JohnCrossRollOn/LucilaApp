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
      className={` h-18 ${
        turno.user
          ? turno.user === user?.email
            ? 'bg-green-300'
            : 'bg-transparent h-12'
          : 'bg-slate-200'
      } p-2 rounded-full flex justify-between transition-all`}
    >
      <input
        type="time"
        className={`border-4 border-primario text-2xl px-4 font-extrabold tracking-widest text-center ${
          turno.user && turno.user === user?.email
            ? 'border-slate-800 bg-slate-800'
            : 'text-primario bg-transparent'
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
            <span className="border-4 border-slate-800 text-white bg-slate-800 font-MaterialIcons text-[3rem] font-extralight leading-none rounded-full px-3 ml-auto h-full">
              how_to_reg
            </span>
          ) : (
            <p className="font-MaterialIcons text-[2rem] leading-none px-5 text-primario h-full">
              person_off
            </p>
          )
        ) : (
          <button
            id={turno.id}
            className="border-4 border-primario bg-primario text-slate-200 font-MaterialIcons text-[3rem] font-extralight leading-none rounded-full px-3 h-full"
            onClick={() =>
              isAuthenticated
                ? modificarTurno({ ...turno, user: user.email })
                : loginWithPopup()
            }
          >
            person_add
          </button>
        )}
      </div>
    </div>
  );
};
