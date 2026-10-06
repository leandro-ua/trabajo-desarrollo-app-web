export default function PuntuacionList({ puntuaciones, onEditar, onEliminar }) {
  if (puntuaciones.length === 0) {
    return <p className="aviso">Aún no hay puntuaciones registradas.</p>;
  }

  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>Alias</th>
          <th>Puntaje</th>
          <th>Tiempo (min)</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {puntuaciones.map((p) => (
          <tr key={p.id}>
            <td>{p.alias_jugador}</td>
            <td>{p.puntaje}</td>
            <td>{p.tiempo_jugado_minutos}</td>
            <td>{p.partida_completada ? "Completada" : "Incompleta"}</td>
            {/* Los botones deben ir DENTRO de estas etiquetas <td> */}
            <td>
              <button onClick={() => onEditar(p)}>Editar</button>
              <button onClick={() => onEliminar(p)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}