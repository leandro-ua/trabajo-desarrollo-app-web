# trabajo-desarrollo-app-web
Repositorio de trabajo para desarrollo de app web

## Integración React + Django

### 1. Arquitectura
El flujo de comunicación de la aplicación opera bajo el siguiente modelo[cite: 18]:
React (Interfaz en cliente) → Vite Proxy (puerto 5173) → Django Rest Framework (puerto 8000) → SQLite.

### 2. Contrato de la API
| Acción | Método HTTP | URL | Código Esperado |
|---|---|---|---|
| Listar puntuaciones | GET | `/api/puntuaciones/` | 200 OK |
| Crear puntuación | POST | `/api/puntuaciones/` | 201 Created (o 400 si es inválido) |
| Editar puntuación | PUT | `/api/puntuaciones/<id>/` | 200 OK (o 400 si es inválido) |
| Eliminar puntuación | DELETE | `/api/puntuaciones/<id>/` | 204 No Content |

### 3. Configuración Técnica
**Django (Back-end):**
- Se integraron los paquetes `djangorestframework` y `django-cors-headers`[cite: 18].
- Se definieron los orígenes seguros en `CORS_ALLOWED_ORIGINS` dentro de `settings.py`[cite: 18].

**React (Front-end):**
- Se implementó un proxy en `vite.config.js` para redirigir internamente las peticiones `/api` a Django[cite: 18].
- El acceso remoto se centralizó en el módulo `src/api/client.js` para unificar el manejo de errores HTTP[cite: 18].

### 4. Instrucciones de Ejecución
Se requieren dos terminales corriendo simultáneamente:
1. **Back-end:** Entrar a `backend/`, activar el entorno virtual (`.venv\Scripts\Activate.ps1`) y ejecutar `python manage.py runserver`.
2. **Front-end:** Entrar a `frontend/` y ejecutar `npm run dev`.
3. Navegar a `http://localhost:5173` en el navegador.

### 5. Decisiones de Diseño
Se optó por el uso primario del **proxy de Vite** en el front-end porque simplifica el desarrollo al evitar que el navegador bloquee las peticiones por tener distintos orígenes (puertos 5173 vs 8000). La librería de CORS en Django se mantiene como medida de seguridad complementaria.
