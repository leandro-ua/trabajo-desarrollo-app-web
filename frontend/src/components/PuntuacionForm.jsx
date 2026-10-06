import { useEffect, useState } from "react";
import { puntuacionesApi } from "../api/client";

const VACIO = { alias_jugador: "", puntaje: "", tiempo_jugado_minutos: "", partida_completada: false };

export default function PuntuacionForm({ puntuacion, onGuardado, onCancelar }) {
  const [form, setForm] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);

  // Si cambia la puntuacion seleccionada (modo edición), se precargan sus datos[cite: 14]
  useEffect(() => {
    setForm(puntuacion ?? VACIO);
    setErrores({});
  }, [puntuacion]);

  // Un solo manejador para todos los campos: usa el atributo "name" del input[cite: 14]
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que el navegador recargue la página[cite: 15]
    setEnviando(true);
    setErrores({});
    try {
      if (puntuacion) {
        await puntuacionesApi.actualizar(puntuacion.id, form);
      } else {
        await puntuacionesApi.crear(form);
      }
      setForm(VACIO);
      onGuardado(); // avisa a App para que recargue la lista[cite: 15]
    } catch (err) {
      if (err.status === 400 && err.detalle) {
        setErrores(err.detalle); // errores de validación del serializer[cite: 15]
      } else {
        setErrores({ general: ["No se pudo guardar. Intenta nuevamente."] });
      }
    } finally {
      setEnviando(false);
    }
  };

  // Muestra los mensajes de error de un campo, si existen[cite: 15]
  const mensajes = (campo) =>
    errores[campo]?.map((m) => (
      <span key={m} className="campo-error">{m}</span>
    ));

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>{puntuacion ? "Editar puntuación" : "Nueva puntuación"}</h2>
      
      <label>
        Alias del Jugador
        <input name="alias_jugador" value={form.alias_jugador} onChange={handleChange} />
        {mensajes("alias_jugador")}
      </label>
      
      <label>
        Puntaje
        <input name="puntaje" type="number" value={form.puntaje} onChange={handleChange} />
        {mensajes("puntaje")}
      </label>
      
      <label>
        Tiempo Jugado (minutos)
        <input name="tiempo_jugado_minutos" type="number" value={form.tiempo_jugado_minutos} onChange={handleChange} />
        {mensajes("tiempo_jugado_minutos")}
      </label>
      
      <label>
        <span>
          <input name="partida_completada" type="checkbox" checked={form.partida_completada} onChange={handleChange} />{" "}
          Partida Completada
        </span>
      </label>
      
      {mensajes("general")}
      
      <div>
        <button type="submit" disabled={enviando}>
          {enviando ? "Guardando..." : "Guardar"}
        </button>
        {puntuacion && (
          <button type="button" onClick={onCancelar}>Cancelar</button>
        )}
      </div>
    </form>
  );
}