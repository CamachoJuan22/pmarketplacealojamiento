# Identificación preliminar de componentes

Esta es la propuesta inicial. Puede ajustarse durante el desarrollo.

## Separación de responsabilidades

| Responsabilidad | Elementos |
|-----------------|-----------|
| Presentación | Componentes de `components/` y `pages/` |
| Navegación | Navbar y módulo de rutas (app-routing-module) |
| Acceso a datos | AlojamientoService |
| Formularios | Filtros del listado, Cotizador, ReservaForm |
| Manejo de reservas | CotizacionService y ReservaService |
| Modelos | Interfaces de TypeScript en `models/` |

## Páginas (una por ruta)

| Componente | Ruta | Qué hace |
|------------|------|----------|
| Inicio | / | Muestra el nombre, la descripción, los 3 destacados y el botón hacia la búsqueda |
| AlojamientoLista | /alojamientos | Muestra la lista con los filtros y el botón de limpiar |
| AlojamientoDetalle | /alojamientos/:id | Muestra toda la información de un alojamiento, sus reseñas y el cotizador |
| MisReservas | /mis-reservas | Muestra las reservas hechas |
| NoEncontrado | ** | Avisa que la ruta no existe y enlaza al inicio |

## Componentes reutilizables

| Componente | Dónde se usa | Qué hace |
|------------|--------------|----------|
| Navbar | app.html (en todas las páginas) | Menú con Inicio, Alojamientos y Mis reservas |
| AlojamientoCard | Inicio y AlojamientoLista | Tarjeta resumen de un alojamiento (recibe el alojamiento con @Input) |
| Cotizador | AlojamientoDetalle | Fechas y huéspedes, validación y resumen de la cotización |
| ReservaForm | Cotizador | Formulario con nombre y correo para confirmar la reserva |

## Servicios

| Servicio | Responsabilidad |
|----------|-----------------|
| AlojamientoService | Leer el JSON, devolver solo los alojamientos activos y sus reseñas |
| CotizacionService | Validar fechas y huéspedes, y calcular la cotización |
| ReservaService | Crear reservas, listarlas y guardarlas en localStorage |

## Modelos

- Alojamiento
- Resena
- MarketplaceData
- Cotizacion
- Reserva

## Estructura de carpetas prevista

    src/app/
      models/
      services/
      components/   (navbar, alojamiento-card, cotizador, reserva-form)
      pages/        (inicio, alojamiento-lista, alojamiento-detalle, mis-reservas, no-encontrado)
