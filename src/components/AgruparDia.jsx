export default ({ children, date }) => {
  return (
    <div className="p-2 border border-slate-300 rounded-md grid grid-cols-1 gap-2">
      <div className="flex flex-row justify-between px-1">
        <strong>
          {
            [
              'Domingo',
              'Lunes',
              'Martes',
              'Miercoles',
              'Jueves',
              'Viernes',
              'Sabado',
            ][new Date(date).getDay()]
          }
        </strong>
        <strong>{new Date(date).toLocaleDateString()}</strong>
      </div>
      {children}
    </div>
  );
};
