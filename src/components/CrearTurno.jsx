export const CrearTurno = ({ crearTurnoAnterior, turnos }) => (
  <button
    onClick={() => crearTurnoAnterior(turnos)}
    className="font-MaterialIcons text-slate-200 text-[2rem] text-white font-bold leading-none"
  >
    add
  </button>
);
export const CrearDia = ({ crearDia }) => (
  <button
    onClick={crearDia}
    className="font-MaterialIcons text-slate-200 text-[4rem] text-white font-bold leading-none"
  >
    add_circle
  </button>
);
