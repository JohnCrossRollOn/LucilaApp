export default ({ children, date }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-row justify-between items-center">
        <span className="text-2xl font-extrabold leading-3">
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
        <span className="text-md font-light tracking-widest leading-3">
          {new Date(date).toLocaleDateString()}
        </span>
      </div>
      {children}
    </div>
  );
};
