# Requerimientos funcionales

Proyecto: Marketplace de Alojamientos (Inversiones LR)
Alcance: solo frontend en Angular. No hay backend.

## RF-01. Página inicial
La aplicación muestra una página inicial con:
- Nombre de la plataforma.
- Una breve descripción.
- Los alojamientos destacados (los 3 activos con mejor calificación).
- Un botón que lleva a la búsqueda de alojamientos.

## RF-02. Listado de alojamientos
La aplicación muestra los alojamientos disponibles, obtenidos desde un servicio de datos. De cada uno se ve:
- Imagen.
- Nombre.
- Ciudad.
- Tipo de alojamiento.
- Capacidad.
- Precio por noche.
- Calificación.
- Servicios disponibles.

## RF-03. Búsqueda y filtrado
El usuario puede filtrar los alojamientos por:
- Ciudad.
- Número de huéspedes.
- Tipo de alojamiento.
- Precio máximo.

Los filtros cambian la lista al instante. Hay un botón para limpiar los filtros.
Si ningún alojamiento cumple los filtros, se muestra un mensaje.

## RF-04. Detalle del alojamiento
Al seleccionar un alojamiento se abre una vista de detalle mediante una ruta de Angular (`/alojamientos/:id`). Muestra:
- Nombre y descripción.
- Ciudad y dirección o ubicación.
- Tipo y capacidad.
- Número de habitaciones, camas y baños.
- Precio por noche.
- Servicios y reglas básicas.
- Calificación y reseñas.
- Imágenes.

## RF-05. Cotización
Desde el detalle, el usuario elige fecha de llegada, fecha de salida y número de huéspedes. La aplicación calcula y muestra:
- Número de noches.
- Subtotal (noches x precio por noche).
- Tarifa de limpieza (valor definido en el alojamiento).
- Tarifa de servicio (10 % del subtotal).
- Total (subtotal + limpieza + servicio).

El resultado se ve antes de reservar. Si los datos no son válidos, se muestran los errores y no se genera la cotización.

## RF-06. Simulación de reserva
Con una cotización válida, el usuario pulsa "Reservar" y la aplicación pide:
- Nombre del huésped.
- Correo electrónico.

La reserva guarda: identificador, datos básicos del alojamiento, fecha de llegada, fecha de salida, número de huéspedes, número de noches, valor total, nombre, correo y estado.
El estado inicial es CONFIRMADA.
La reserva no se envía a ningún backend: se guarda en memoria con un servicio Angular y en localStorage.

## RF-07. Consulta de reservas
La opción "Mis reservas" muestra las reservas hechas desde la aplicación. De cada una se ve:
- Alojamiento.
- Ciudad.
- Fecha de llegada.
- Fecha de salida.
- Número de huéspedes.
- Valor total.
- Estado.

Si no hay reservas, se muestra un mensaje al usuario.

## RF-08. Navegación
La aplicación tiene una barra de navegación con acceso a Inicio, Alojamientos y Mis reservas. Si el usuario entra a una ruta que no existe, ve una página de "no encontrado" con un enlace para volver al inicio.

## RF-09. Datos
Los datos iniciales están en un archivo JSON y se consultan solo a través de un servicio Angular. Los componentes no importan el JSON directamente.

## Requisitos no funcionales
- La interfaz se adapta a celular, tablet y escritorio.
- Los formularios muestran los errores de forma clara.
- Hay mensajes para los estados sin información (cargando, error, sin resultados, sin reservas).
