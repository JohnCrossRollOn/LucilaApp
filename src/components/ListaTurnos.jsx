import { useEffect, useState } from 'react';
import { CrearTurno, CrearDia } from './CrearTurno';
import {
  query,
  collection,
  onSnapshot,
  where,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { useAuth0 } from '@auth0/auth0-react';
import { db } from '../firebase';
import AgruparDia from './AgruparDia';
import ItemTurno from './ItemTurno';
import esAdmin from './esAdmin';

export default ({ configuracion }) => {
  const { isAuthenticated, user } = useAuth0;
  const firestoreTurnos = collection(db, 'turnos');
  const firestoreTurnosDoc = (id) => doc(db, 'turnos', id);

  const [turnos, setTurnos] = useState([]);
  const ahora = new Date();
  const hoy = new Date(ahora.toDateString()).getTime();

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

  const crearTurno = async (desde, hasta) => {
    await addDoc(firestoreTurnos, {
      desde: desde || ahora.getTime(),
      hasta: hasta || ahora.getTime() + 60 * 60 * 1000,
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
  const crearTurnoAnterior = async () => {
    const anteriorTurno = turnos[turnos.length - 1];
    const anteriorDuracion = anteriorTurno?.hasta - anteriorTurno?.desde;
    await crearTurno(
      anteriorTurno?.hasta,
      anteriorTurno?.hasta + anteriorDuracion
    );
  };
  const turnosPorDia = agruparEnDias(turnos);

  const crearDia = async () => {
    const anteriorDia = turnosPorDia[turnosPorDia.length - 1];
    const dia = 1000 * 60 * 60 * 24;
    for (let turno of anteriorDia[1]) {
      await crearTurno(turno.desde + dia, turno.hasta + dia);
    }
  };

  return (
    <div className="bg-slate-100 p-4 border border-slate-300 rounded-lg grid auto-cols-1 gap-4">
      <h1 className="text-[2.5rem] italic text-center">Lista de turnos</h1>
      {turnosPorDia.map(([dateString, turnos], index) => (
        <AgruparDia key={index} date={dateString}>
          {turnos.map((turno, index) => (
            <ItemTurno
              turno={turno}
              modificarTurno={modificarTurno}
              borrarTurno={borrarTurno}
              key={index}
            />
          ))}
          {esAdmin() && <CrearTurno {...{ crearTurnoAnterior }} />}
        </AgruparDia>
      ))}
      {esAdmin() && <CrearDia {...{ crearDia }} />}
    </div>
  );
};
