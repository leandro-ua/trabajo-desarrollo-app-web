// Prefijo común de la API. Con el proxy de Vite, basta una ruta relativa.[cite: 11]
const BASE = "/api";

// Función base: todas las peticiones pasan por aquí.[cite: 11]
async function request(ruta, opciones = {}) {
  const { headers, ...resto } = opciones;
  const respuesta = await fetch(BASE + ruta, {
    ...resto,
    headers: { "Content-Type": "application/json", ...headers },
  });

  // fetch NO lanza error con códigos 4xx/5xx: hay que revisar respuesta.ok[cite: 11]
  if (!respuesta.ok) {
    let detalle = null;
    try {
      detalle = await respuesta.json(); // DRF entrega los errores de validación en JSON[cite: 11]
    } catch {
      // la respuesta de error no traía JSON: se ignora[cite: 11]
    }
    const error = new Error("Error " + respuesta.status);
    error.status = respuesta.status;
    error.detalle = detalle; // ej.: { puntaje: ["El puntaje no puede ser negativo."] }
    throw error;
  }

  // DELETE responde 204 (sin cuerpo): no hay JSON que leer[cite: 11]
  if (respuesta.status === 204) return null;
  return respuesta.json();
}

// Operaciones del recurso Puntuacion. Observa la barra final: Django la exige.[cite: 11]
export const puntuacionesApi = {
  listar: () => request("/puntuaciones/"),
  crear: (datos) =>
    request("/puntuaciones/", { method: "POST", body: JSON.stringify(datos) }),
  actualizar: (id, datos) =>
    request("/puntuaciones/" + id + "/", { method: "PUT", body: JSON.stringify(datos) }),
  eliminar: (id) => request("/puntuaciones/" + id + "/", { method: "DELETE" }),
};