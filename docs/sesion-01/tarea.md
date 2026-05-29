# Tarea — Sesión 1

!!! note "Instrucciones de entrega"
    Un archivo `.c` por ejercicio. Incluye un comentario inicial con tu nombre y el número de ejercicio. Prueba cada programa con los casos indicados antes de entregar. Las soluciones se publicarán antes de la Sesión 3.

---

## Ejercicio T1 — Conversión de unidades de temperatura

### Enunciado

Escribe un programa que solicite al usuario una temperatura en grados **Celsius** y muestre su equivalente en **Fahrenheit** y **Kelvin**, aplicando las siguientes fórmulas:

- F = (9/5) · C + 32
- K = C + 273.15

El programa debe mostrar los tres valores con 2 decimales.

### Salida esperada

```
Temperatura en Celsius: 100.00
Fahrenheit: 212.00
Kelvin: 373.15
```

### Casos de prueba

| Celsius | Fahrenheit | Kelvin |
|---------|-----------|--------|
| 0.00 | 32.00 | 273.15 |
| 100.00 | 212.00 | 373.15 |
| -40.00 | -40.00 | 233.15 |
| 36.60 | 97.88 | 309.75 |

### Pistas

- Cuidado con la expresión `9/5`: en C, si ambos operandos son enteros, el resultado es entero (da `1`, no `1.8`). Escríbela como `9.0/5.0`.
- No necesitas `math.h` para este ejercicio.

---

## Ejercicio T2 — Desglose de un monto en billetes y monedas

### Enunciado

Dado un monto entero en pesos mexicanos (capturado por el usuario), determina la cantidad mínima de billetes y monedas necesarias para representar ese monto. Utiliza las denominaciones: $500, $200, $100, $50, $20, $10, $5, $2 y $1.

El desglose debe realizarse de mayor a menor denominación, usando el operador de división entera (`/`) y el operador módulo (`%`).

### Salida esperada

```
Ingrese el monto en pesos: 1387

Desglose de $1387:
  $500: 2
  $200: 1
  $100: 1
   $50: 1
   $20: 1
   $10: 1
    $5: 1
    $2: 1
    $1: 0
```

### Casos de prueba

| Monto | $500 | $200 | $100 | $50 | $20 | $10 | $5 | $2 | $1 |
|-------|------|------|------|-----|-----|-----|----|----|-----|
| 1387 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
| 999 | 1 | 2 | 0 | 1 | 2 | 0 | 1 | 2 | 0 |
| 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |

### Pistas

- El patrón se repite para cada denominación: la cantidad de billetes de esa denominación es `monto / denominacion`, y el residuo para las siguientes es `monto % denominacion`.
- Usa una variable auxiliar que vaya almacenando el residuo tras cada paso.

---

## Ejercicio T3 — Intercambio de valores y cálculos compuestos

### Enunciado

Escribe un programa que:

1. Solicite al usuario tres valores reales: `a`, `b` y `c`.
2. Imprima los valores originales.
3. Realice un intercambio cíclico: el valor de `a` pasa a `b`, el de `b` pasa a `c`, y el de `c` pasa a `a`. Utiliza una variable temporal.
4. Imprima los valores después del intercambio.
5. Con los valores ya intercambiados, calcule y muestre:
    - La media aritmética: (a + b + c) / 3
    - La suma de sus cuadrados: a² + b² + c²

### Salida esperada

```
Ingrese a: 10.0
Ingrese b: 20.0
Ingrese c: 30.0

Valores originales:  a=10.00  b=20.00  c=30.00
Valores rotados:     a=30.00  b=10.00  c=20.00

Media aritmetica: 20.00
Suma de cuadrados: 1400.00
```

### Casos de prueba

| a | b | c | a' | b' | c' | Media | Suma cuadrados |
|---|---|---|----|----|-----|-------|----------------|
| 10 | 20 | 30 | 30 | 10 | 20 | 20.00 | 1400.00 |
| 1 | 2 | 3 | 3 | 1 | 2 | 2.00 | 14.00 |
| 5.5 | 0 | -3.5 | -3.5 | 5.5 | 0 | 0.67 | 42.50 |

### Pistas

- El intercambio cíclico no se puede hacer sin una **variable temporal**. Si escribes `a = c; c = b; b = a;` directamente, el valor original de `a` se pierde en la primera asignación.
- El orden correcto es: guardar uno en `temp`, luego asignar en cadena.

---

## Ejercicio T4 — Ecuación de segundo grado (cálculo directo)

### Enunciado

Escribe un programa que reciba los coeficientes `a`, `b` y `c` de una ecuación cuadrática de la forma **ax² + bx + c = 0**, calcule el **discriminante** (Δ = b² - 4ac) y las dos raíces usando la fórmula general:

x₁ = (-b + √Δ) / (2a)

x₂ = (-b - √Δ) / (2a)

Por ahora, asume que el discriminante siempre es positivo (dos raíces reales). En la Sesión 2 agregaremos la validación con condicionales.

### Salida esperada

```
=== Ecuacion cuadratica: ax^2 + bx + c = 0 ===
Ingrese a: 1
Ingrese b: -5
Ingrese c: 6

Discriminante: 1.0000
x1 = 3.0000
x2 = 2.0000
```

### Casos de prueba

| a | b | c | Discriminante | x1 | x2 |
|---|---|---|--------------|-----|-----|
| 1 | -5 | 6 | 1.0000 | 3.0000 | 2.0000 |
| 1 | -3 | 2 | 1.0000 | 2.0000 | 1.0000 |
| 2 | 7 | 3 | 25.0000 | -0.5000 | -3.0000 |
| 1 | -2 | 1 | 0.0000 | 1.0000 | 1.0000 |

### Pistas

- Necesitas `sqrt` de `math.h` para la raíz cuadrada del discriminante.
- Cuidado con la precedencia de operadores: `(-b + sqrt(d)) / (2*a)` necesita paréntesis explícitos. Sin ellos, `2*a` se evalúa como parte del numerador.
- Usa `double` para todas las variables.
