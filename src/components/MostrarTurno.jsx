import ItemTurno from './ItemTurno';

export const MostrarPorDia = ({ turnos }) => {
  const agruparEnDias = (turnos) => {
    let dias = {};
    for (let turno of turnos) {
      const fecha = new Date(turno.desde).toDateString();
      dias[fecha] = [...(dias[fecha] || []), turno];
    }
    return dias;
  };
  return (
    <>
      {Object.entries(agruparEnDias(turnos)).map(
        ([dateString, turnos], index) => (
          <div
            className="p-2 border border-slate-300 rounded-md grid grid-cols-1 gap-2"
            key={index}
          >
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
                  ][new Date(dateString).getDay()]
                }
              </strong>
              <strong>{new Date(dateString).toLocaleDateString()}</strong>
            </div>
            {turnos.map((turno, index) => (
              <ItemTurno {...{ turno }} key={index} />
            ))}
          </div>
        )
      )}
    </>
  );
};
