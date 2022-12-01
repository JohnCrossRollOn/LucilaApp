export default ({ children, date, crearTurnoAnterior }) => {
  return (
    <div className="grid grid-cols-1 gap-2 p-2 border border-slate-200 rounded-[2.5rem]">
      <div className="flex flex-row justify-between items-center mt-2 mx-3">
        <span className="text-2xl leading-none italic">
          {
            [
              'domingo',
              'lunes',
              'martes',
              'miercoles',
              'jueves',
              'viernes',
              'sabado',
            ][new Date(date).getDay()]
          }
        </span>
        <span className="text-md font-light leading-none tracking-widest italic">
          {new Date(date).toLocaleDateString()}
        </span>
      </div>
      {children}
    </div>
  );
};
