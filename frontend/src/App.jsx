import { useCallback, useEffect, useState } from "react";
import { puntuacionesApi } from "./api/client";
import PuntuacionList from "./components/PuntuacionList";
import "./App.css";

export default function App() {
  const [puntuaciones, setPuntuaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // useCallback mantiene la misma función entre renders[cite: 12]
  const cargar = useCallback(async () => {
    try {
      setError(null);
      setCargando(true);
      const datos = await puntuacionesApi.listar();
      setPuntuaciones(datos);
    } catch (e) {
      setError("No se pudo cargar la lista. ¿Está encendido el servidor Django?");
    } finally {
      setCargando(false); // se ejecuta siempre, haya éxito o error[cite: 12]
    }
  }, []);

  // Se ejecuta al montar el componente: carga inicial de datos[cite: 12]
  useEffect(() => {
    cargar();
  }, [cargar]);

  return (
    <main className="contenedor">
      <h1>Puntuaciones</h1>
      
      {cargando && <p className="aviso">Cargando…</p>}
      {error && <p className="aviso error">{error}</p>}
      {!cargando && !error && <PuntuacionList puntuaciones={puntuaciones} />}
    </main>
  );
}