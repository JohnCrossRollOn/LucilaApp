import { useEffect, useState } from 'react';
import CrearTurno from './CrearTurno';
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
import { MostrarPorDia } from './MostrarTurno';
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

  const crearTurno = async () => {
    await addDoc(firestoreTurnos, {
      desde: ahora.getTime(),
      hasta: ahora.getTime() + 60 * 60 * 1000 * 2,
      usuario: '',
    });
  };
  const señarTurno = async (e) => {
    await updateDoc(firestoreTurnosDoc(e.target.id), {
      user: 'marta',
    });
  };
  const borrarTurno = async (e) => {
    await deleteDoc(firestoreTurnosDoc(e.target.id));
  };

  return (
    <div className="bg-slate-100 p-4 border border-slate-300 rounded-lg grid auto-cols-1 gap-4">
      <h1 className="text-2xl italic text-center">Lista de turnos</h1>
      <MostrarPorDia {...{ turnos }} />
      {esAdmin() && <CrearTurno {...{ crearTurno }} />}
    </div>
  );
};
