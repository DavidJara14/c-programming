# Tarea — Sesión 2

!!! note "Instrucciones de entrega"
    Un archivo `.c` por ejercicio. Prueba con todos los casos indicados. Las soluciones se publicarán antes de la Sesión 3.

---

## Ejercicio T1 — Calificación a letra

### Enunciado

Escribe un programa que solicite una calificación numérica (de 0 a 100) y la convierta a una letra según la siguiente escala:

| Rango | Letra |
|-------|-------|
| 90 – 100 | A |
| 80 – 89 | B |
| 70 – 79 | C |
| 60 – 69 | D |
| 0 – 59 | F |

El programa debe validar que la calificación esté en el rango [0, 100]. Si está fuera de rango, debe mostrar un error.

### Salida esperada

```
Calificacion: 85
Letra: B
```

```
Calificacion: 105
Error: la calificacion debe estar entre 0 y 100.
```

### Casos de prueba

| Calificación | Letra |
|-------------|-------|
| 95 | A |
| 90 | A |
| 89 | B |
| 70 | C |
| 60 | D |
| 59 | F |
| 0 | F |
| -5 | Error |
| 101 | Error |

### Pistas

- Valida el rango primero, antes de clasificar.
- Con `if-else if`, empieza por el rango más alto y baja. No necesitas condiciones dobles como `x >= 80 && x <= 89` si estructuras correctamente la cadena: al llegar a `else if (cal >= 80)`, ya sabes que `cal < 90` por el `if` anterior.

---

## Ejercicio T2 — Calculadora de IMC con diagnóstico

### Enunciado

El Índice de Masa Corporal se calcula como: **IMC = peso / estatura²**, donde el peso es en kilogramos y la estatura en metros.

Escribe un programa que solicite peso y estatura, calcule el IMC con 2 decimales y muestre el diagnóstico según la OMS:

| IMC | Clasificación |
|-----|--------------|
| < 18.5 | Bajo peso |
| 18.5 – 24.9 | Peso normal |
| 25.0 – 29.9 | Sobrepeso |
| 30.0 – 34.9 | Obesidad grado I |
| 35.0 – 39.9 | Obesidad grado II |
| >= 40.0 | Obesidad grado III |

Valida que el peso y la estatura sean positivos.

### Salida esperada

```
Peso (kg): 70
Estatura (m): 1.75

IMC: 22.86
Clasificacion: Peso normal
```

### Casos de prueba

| Peso | Estatura | IMC | Clasificación |
|------|----------|-----|--------------|
| 50 | 1.70 | 17.30 | Bajo peso |
| 70 | 1.75 | 22.86 | Peso normal |
| 85 | 1.70 | 29.41 | Sobrepeso |
| 100 | 1.65 | 36.73 | Obesidad grado II |
| 0 | 1.70 | — | Error |

### Pistas

- La estatura al cuadrado se puede calcular como `estatura * estatura` o con `pow(estatura, 2)`.
- Verifica estatura antes de dividir — estatura igual a cero produce división indefinida.

---

## Ejercicio T3 — Tarifa eléctrica escalonada

### Enunciado

La Comisión Federal de Electricidad (CFE) aplica tarifas escalonadas por consumo bimestral. Escribe un programa que reciba el consumo en kWh y calcule el monto a pagar según la siguiente tabla simplificada:

| Rango de consumo (kWh) | Tarifa por kWh |
|------------------------|----------------|
| 0 – 75 | $0.793 |
| 76 – 140 | $0.956 |
| 141 – 200 | $1.210 |
| 201 – 250 | $2.890 |
| 251 en adelante | $3.420 |

La tarifa es **acumulativa**: los primeros 75 kWh siempre se cobran a $0.793, los siguientes 65 kWh (del 76 al 140) a $0.956, y así sucesivamente. No es una tarifa plana sobre todo el consumo.

### Salida esperada

```
Consumo bimestral (kWh): 180

Desglose:
  75 kWh x $0.793 = $59.475
  65 kWh x $0.956 = $62.140
  40 kWh x $1.210 = $48.400

Total a pagar: $170.015
```

### Casos de prueba

| Consumo | Total |
|---------|-------|
| 50 | $39.650 |
| 75 | $59.475 |
| 140 | $121.615 |
| 200 | $194.215 |
| 300 | $514.815 |

### Pistas

- El cálculo acumulativo es la parte difícil. Piensa escalón por escalón: si el consumo es mayor que el límite del escalón, cobra el escalón completo y pasa al siguiente. Si es menor o igual, solo cobra lo que queda y termina.
- Define variables separadas para cada tramo o usa una variable acumuladora para el total.
- Resta el consumo ya facturado antes de calcular el siguiente tramo. Por ejemplo, si el consumo es 180: factura 75 al primer precio, luego los siguientes 65 al segundo precio, y los restantes 40 al tercer precio.

---

## Ejercicio T4 — Año bisiesto y día de la semana (Congruencia de Zeller)

### Enunciado

Escribe un programa que reciba una fecha (día, mes, año) y determine:

1. Si el año es bisiesto.
2. El día de la semana correspondiente a esa fecha, usando la **Congruencia de Zeller**.

Un año es bisiesto si:

- Es divisible entre 4, **excepto** los divisibles entre 100, **excepto** los divisibles entre 400.

La fórmula de Zeller (para el calendario gregoriano) es:

```
h = (q + floor(13*(m+1)/5) + K + floor(K/4) + floor(J/4) - 2*J) % 7
```

Donde:

- `q` = día del mes
- `m` = mes (enero y febrero se cuentan como meses 13 y 14 del año anterior)
- `K` = año del siglo (año % 100)
- `J` = siglo (año / 100)
- `h` = día de la semana (0=sábado, 1=domingo, 2=lunes, ..., 6=viernes)

### Salida esperada

```
Ingrese dia: 15
Ingrese mes: 9
Ingrese anio: 2025

El anio 2025 NO es bisiesto.
El 15/9/2025 es lunes.
```

### Casos de prueba

| Fecha | Bisiesto | Día de la semana |
|-------|----------|-----------------|
| 01/01/2000 | Sí | Sábado |
| 15/09/2025 | No | Lunes |
| 29/02/2024 | Sí | Jueves |
| 04/07/1776 | Sí | Jueves |

### Pistas

- Resuelve primero la parte del año bisiesto, que solo requiere operador `%` y condiciones anidadas.
- Para Zeller, si el mes es enero o febrero, ajusta: `mes += 12` y `anio -= 1` antes de calcular `K` y `J`.
- El operador `%` en C puede devolver valores negativos con operandos negativos. Para asegurar un resultado positivo: `h = ((resultado % 7) + 7) % 7`.
- Usa un `switch` o una cadena `if-else if` para convertir el valor numérico de `h` al nombre del día.
