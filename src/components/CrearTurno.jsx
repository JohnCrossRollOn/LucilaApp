export const CrearTurno = ({ crearTurnoAnterior }) => (
  <div className="text-white font-bold text-lg w-full">
    <button
      onClick={crearTurnoAnterior}
      className="text-white font-bold text-lg w-full bg-slate-300 text-white rounded-md"
    >
      Crear Turno
    </button>
  </div>
);
export const CrearDia = ({ crearDia }) => (
  <button
    onClick={crearDia}
    className="text-white font-bold text-lg w-full bg-slate-300 text-white rounded-md"
  >
    Crear Dia
  </button>
);
