import { useCallback, useEffect, useState } from "react";
import { puntuacionesApi } from "./api/client";
import PuntuacionList from "./components/PuntuacionList";
import PuntuacionForm from "./components/PuntuacionForm";
import "./App.css";

export default function App() {
  const [puntuaciones, setPuntuaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [editando, setEditando] = useState(null); // puntuación en edición o null[cite: 17]

  const cargar = useCallback(async () => {
    try {
      setError(null);
      setCargando(true);
      const datos = await puntuacionesApi.listar();
      setPuntuaciones(datos);
    } catch (e) {
      setError("No se pudo cargar la lista. ¿Está encendido el servidor Django?");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  // Tras crear o editar: se cierra el modo edición y se recarga la lista[cite: 17]
  const handleGuardado = () => {
    setEditando(null);
    cargar();
  };

  const handleEliminar = async (puntuacion) => {
    // Confirmación antes de una acción que no se puede deshacer[cite: 17]
    if (!window.confirm("¿Eliminar la puntuación de «" + puntuacion.alias_jugador + "»?")) return;
    
    try {
      await puntuacionesApi.eliminar(puntuacion.id);
      cargar();
    } catch (e) {
      setError("No se pudo eliminar la puntuación.");
    }
  };

  return (
    <main className="contenedor">
      <h1>Puntuaciones</h1>
      
      <PuntuacionForm
        puntuacion={editando}
        onGuardado={handleGuardado}
        onCancelar={() => setEditando(null)}
      />
      
      {cargando && <p className="aviso">Cargando…</p>}
      {error && <p className="aviso error">{error}</p>}
      {!cargando && !error && (
        <PuntuacionList
          puntuaciones={puntuaciones}
          onEditar={setEditando}
          onEliminar={handleEliminar}
        />
      )}
    </main>
  );
}