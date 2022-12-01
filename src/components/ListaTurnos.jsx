import { useEffect, useState } from 'react';
import { CrearTurno, CrearDia } from './CrearTurno';
import {
  query,
  collection,
  onSnapshot,
  where,
  orderBy,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import AgruparDia from './AgruparDia';
import ItemTurno from './ItemTurno';
import esAdmin from './esAdmin';

export default () => {
  const firestoreTurnos = collection(db, 'turnos');
  const firestoreTurnosDoc = (id) => doc(db, 'turnos', id);
  const [turnos, setTurnos] = useState([]);

  const ahora = new Date();
  const hoy = new Date(ahora.toDateString()).getTime();
  console.log(
    turnos.map((turno) => new Date(turno.desde).toLocaleTimeString())
  );
  useEffect(() => {
    const unsuscribe = onSnapshot(
      query(firestoreTurnos, where('desde', '>=', hoy)),
      (querySnapshot) => {
        setTurnos(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    );
    return () => unsuscribe();
  }, []);

  const crearTurno = async (desde) => {
    await addDoc(firestoreTurnos, {
      desde: desde || ahora.getTime(),
      usuario: '',
    });
  };
  const modificarTurno = async (doc) => {
    await updateDoc(firestoreTurnosDoc(doc.id), doc);
  };
  const borrarTurno = async (id) => {
    await deleteDoc(firestoreTurnosDoc(id));
  };
  const agruparEnDias = (turnos) => {
    let dias = {};
    for (let turno of turnos) {
      const fecha = new Date(turno.desde).toDateString();
      dias[fecha] = [...(dias[fecha] || []), turno];
    }
    return Object.entries(dias);
  };
  const crearTurnoAnterior = async (turnos) => {
    const turnoAnterior = turnos[turnos.length - 1];
    await crearTurno(turnoAnterior?.desde || ahora.getTime());
  };

  const crearDia = async () => {
    const anteriorDia = turnosPorDia[turnosPorDia.length - 1]
      ? turnosPorDia[turnosPorDia.length - 1]
      : [[], [{ desde: ahora.getTime() }]];
    const dia = 1000 * 60 * 60 * 24;
    for (let turno of anteriorDia[1]) {
      await crearTurno(turno.desde + dia);
    }
  };

  const turnosPorDia = agruparEnDias(turnos);
  return (
    <div className="rounded-lg grid auto-cols-1 gap-8 py-8">
      <h1 className="relative text-[3rem] z-10 font-semibold leading-none">
        Lista de turnos.
        <span className="absolute leading-none font-extralight right-[0] top-[0] text-[6rem] -z-10 text-secundario font-MaterialIcons">
          fact_check
        </span>
      </h1>
      {turnosPorDia.map(([dateString, turnos], index) => (
        <AgruparDia
          key={index}
          date={dateString}
          crearTurnoAnterior={crearTurnoAnterior}
        >
          {turnos.map((turno, index) => (
            <ItemTurno
              turno={turno}
              modificarTurno={modificarTurno}
              borrarTurno={borrarTurno}
              key={index}
            />
          ))}
          {esAdmin() && (
            <CrearTurno
              crearTurnoAnterior={() => crearTurnoAnterior(turnos)}
              turnos={turnos}
            />
          )}
        </AgruparDia>
      ))}
      {esAdmin() && <CrearDia {...{ crearDia }} />}
    </div>
  );
};
