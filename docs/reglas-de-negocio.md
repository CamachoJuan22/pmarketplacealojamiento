# Reglas de negocio

| N.º | Regla | Dónde se aplica |
|-----|-------|-----------------|
| RN-01 | La fecha de salida debe ser posterior a la fecha de llegada. | CotizacionService (validar) |
| RN-02 | La fecha de llegada no puede ser anterior a la fecha actual. | CotizacionService (validar) |
| RN-03 | El número de huéspedes debe ser mayor que cero. | CotizacionService (validar) |
| RN-04 | El número de huéspedes no puede superar la capacidad del alojamiento. | CotizacionService (validar) |
| RN-05 | El precio por noche debe ser mayor que cero. | CotizacionService (validar) |
| RN-06 | Una cotización solo se genera cuando las fechas son válidas. | Componente Cotizador |
| RN-07 | Una reserva solo se puede hacer después de generar una cotización válida. | Componente Cotizador |
| RN-08 | La tarifa de servicio es el 10 % del subtotal. | CotizacionService (cotizar) |
| RN-09 | No se muestran alojamientos marcados como inactivos. | AlojamientoService |
| RN-10 | Si una búsqueda no encuentra resultados, se informa al usuario. | Página AlojamientoLista |

## Fórmulas de la cotización

- noches = fecha de salida - fecha de llegada (en días)
- subtotal = noches x precio por noche
- tarifa de limpieza = valor definido en el alojamiento
- tarifa de servicio = subtotal x 0.10
- total = subtotal + tarifa de limpieza + tarifa de servicio

Ejemplo: Loft en Chapinero, 3 noches.
- Subtotal: 3 x 180.000 = 540.000
- Limpieza: 45.000
- Servicio: 54.000
- Total: 639.000
