export default function PuntuacionList({ puntuaciones }) {
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
        </tr>
      </thead>
      <tbody>
        {puntuaciones.map((p) => (
          // key: identificador único para que React distinga cada fila
          <tr key={p.id}>
            <td>{p.alias_jugador}</td>
            <td>{p.puntaje}</td>
            <td>{p.tiempo_jugado_minutos}</td>
            <td>{p.partida_completada ? "Completada" : "Incompleta"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}