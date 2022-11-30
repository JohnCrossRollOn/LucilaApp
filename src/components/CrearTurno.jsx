export default ({ crearTurno, crearDia }) => (
  <div className="grid grid-cols-2 gap-4 h-16 text-white font-bold text-lg">
    <button onClick={crearTurno} className="bg-slate-500 text-white rounded-xl">
      Crear Turno
    </button>
    <button onClick={crearTurno} className="bg-slate-500 text-white rounded-xl">
      Crear Dia
    </button>
  </div>
);
