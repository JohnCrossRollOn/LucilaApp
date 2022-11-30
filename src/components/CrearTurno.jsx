export const CrearTurno = ({ crearTurnoAnterior }) => (
  <div className="text-white font-bold text-lg w-full">
    <button
      onClick={crearTurnoAnterior}
      className="text-white font-bold text-lg w-full bg-slate-500 text-white rounded-xl"
    >
      Crear Turno
    </button>
  </div>
);
export const CrearDia = ({ crearDia }) => (
  <button
    onClick={crearDia}
    className="text-white font-bold text-lg w-full bg-slate-500 text-white rounded-xl"
  >
    Crear Dia
  </button>
);
