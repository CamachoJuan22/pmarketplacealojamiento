# Marketplace de Alojamientos - Inversiones LR

## Descripción

Aplicación web (solo frontend) que permite a un huésped explorar los alojamientos de Inversiones LR, filtrarlos, ver su detalle, cotizar una estancia y registrar una reserva simulada.

No tiene backend: los datos iniciales están en un archivo JSON que se consulta desde un servicio de Angular, y las reservas se guardan en el `localStorage` del navegador.

Proyecto de la asignatura Desarrollo de Sistemas de Información 3, Ingeniería de Sistemas, Universidad El Bosque (2026-2).

## Integrantes

- Juan David Camacho Espinel

## Tecnologías utilizadas

- Angular con módulos (NgModule)
- TypeScript
- Bootstrap 5 (solo estilos)
- RxJS
- HTML y CSS
- Git y GitHub

## Requisitos para ejecutar la aplicación

- Node.js (24 LTS)
- npm (viene con Node.js)
- Angular CLI: `npm install -g @angular/cli`

## Instalación

1. Clonar el repositorio:

```
   git clone https://github.com/CamachoJuan22/proyectoalojamientos.git
```

2. Entrar a la carpeta del proyecto:

```
   cd proyectoalojamientos
```

3. Instalar las dependencias:

```
   npm install
```

## Ejecución

```
ng serve
```

Abrir en el navegador: `http://localhost:4200`

Para generar la versión de producción:

```
ng build
```

## Principales funcionalidades

- **Inicio:** nombre de la plataforma, descripción, los 3 alojamientos mejor calificados y acceso a la búsqueda.
- **Listado:** tarjetas con imagen, nombre, ciudad, tipo, capacidad, precio por noche, calificación y servicios.
- **Filtros:** por ciudad, tipo, número de huéspedes y precio máximo. La lista cambia al instante y hay un botón para limpiar los filtros.
- **Detalle:** descripción, ubicación, habitaciones, camas, baños, servicios, reglas, calificación, reseñas y galería de imágenes. Se abre con una ruta de Angular (`/alojamientos/:id`).
- **Cotización:** fecha de llegada, fecha de salida y huéspedes. Calcula noches, subtotal, tarifa de limpieza, tarifa de servicio (10 % del subtotal) y total.
- **Reserva simulada:** formulario con nombre y correo, con validaciones. La reserva queda en estado CONFIRMADA.
- **Mis reservas:** tabla en pantallas grandes y tarjetas en celular, con mensaje cuando no hay reservas.
- **Página 404:** mensaje y enlace para volver al inicio.

## Reglas de negocio implementadas

- La fecha de salida debe ser posterior a la de llegada.
- La fecha de llegada no puede ser anterior a hoy.
- El número de huéspedes debe ser mayor que cero y no superar la capacidad.
- El precio por noche debe ser mayor que cero.
- La cotización solo se genera con datos válidos.
- La reserva solo se puede hacer después de una cotización válida.
- Los alojamientos inactivos no se muestran, ni siquiera escribiendo su URL.
- Si una búsqueda no tiene resultados, se informa al usuario.

## Estructura general del proyecto

```
docs/                    documentación y prototipos
  prototipos/            prototipos de las pantallas
public/assets/
  data/                  marketplace-data.json (datos iniciales)
  images/                imágenes de los alojamientos
src/app/
  models/                interfaces de TypeScript
  services/              acceso a datos, cotización y reservas
  components/            navbar, alojamiento-card, cotizador, reserva-form
  pages/                 inicio, alojamiento-lista, alojamiento-detalle,
                         mis-reservas, no-encontrado
  app-routing-module.ts  rutas de la aplicación
  app-module.ts          módulo principal
```

### Servicios

- `AlojamientoService`: lee el JSON y entrega solo los alojamientos activos y sus reseñas.
- `CotizacionService`: valida las fechas y los huéspedes y calcula la cotización.
- `ReservaService`: crea las reservas, las lista y las guarda en `localStorage`.

### Rutas

| Ruta | Página |
|------|--------|
| `/` | Inicio |
| `/alojamientos` | Listado con filtros |
| `/alojamientos/:id` | Detalle con cotizador |
| `/mis-reservas` | Mis reservas |
| `**` | Página no encontrada |

## Notas

- Los datos iniciales están en `public/assets/data/marketplace-data.json` y no en `src/assets/data/` porque esta versión de Angular sirve los archivos estáticos desde la carpeta `public/`.
- Las reservas se guardan en el `localStorage` del navegador con la clave `reservas-alojamientos-lr`. Para borrarlas, ejecutar en la consola del navegador: `localStorage.removeItem('reservas-alojamientos-lr')`.
- Documentación del proyecto (requerimientos, reglas de negocio, componentes, navegación y prototipos) en la carpeta `docs/`.
