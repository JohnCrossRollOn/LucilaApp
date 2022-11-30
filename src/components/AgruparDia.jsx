export default ({ children, date }) => {
  return (
    <div className="rounded-md grid grid-cols-1 gap-4">
      <div className="flex flex-row justify-between items-center">
        <span className="text-2xl font-extrabold">
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
        </span>
        <span className="text-md font-light tracking-widest">
          {new Date(date).toLocaleDateString()}
        </span>
      </div>
      {children}
    </div>
  );
};
