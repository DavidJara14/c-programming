# Tarea — Sesión 3

!!! note "Instrucciones de entrega"
    Un archivo `.c` por ejercicio. Prueba con todos los casos indicados, incluyendo los límites. En esta tarea **elige conscientemente** qué tipo de ciclo conviene en cada caso y justifica tu elección con un comentario.

!!! info "Soluciones"
    Las soluciones se publicarán antes de la Sesión 4. Por ahora cada ejercicio incluye solo pistas.

---

## Ejercicio T1 — ¿El número es primo?

### Enunciado

Pide al usuario un número entero mayor que 1 y determina si es **primo** (solo divisible entre 1 y él mismo). Muestra el resultado.

### Salida esperada

```
Ingrese un numero: 13
13 es primo.
```

```
Ingrese un numero: 12
12 no es primo (es divisible entre 2).
```

### Casos de prueba

| Número | Resultado |
|--------|-----------|
| 2 | Primo |
| 7 | Primo |
| 13 | Primo |
| 12 | No primo |
| 1 | No válido (pide > 1) |

### Pistas

- Recorre los posibles divisores desde 2 hasta `n - 1`. Si encuentras alguno que divida exacto (`n % divisor == 0`), el número **no** es primo.
- Usa una variable bandera (por ejemplo `esPrimo = 1`) que cambie a 0 en cuanto encuentres un divisor.
- Optimización opcional: basta con revisar divisores hasta la raíz cuadrada de `n`. Piensa por qué.

---

## Ejercicio T2 — Serie de Fibonacci

### Enunciado

Genera e imprime los primeros `N` términos de la serie de Fibonacci, donde cada término es la suma de los dos anteriores: 0, 1, 1, 2, 3, 5, 8, 13, … El usuario indica cuántos términos quiere.

### Salida esperada

```
Cuantos terminos? 10
0 1 1 2 3 5 8 13 21 34
```

### Casos de prueba

| N | Salida |
|---|--------|
| 1 | 0 |
| 2 | 0 1 |
| 5 | 0 1 1 2 3 |
| 10 | 0 1 1 2 3 5 8 13 21 34 |

### Pistas

- Necesitas guardar los **dos términos anteriores**. Usa dos variables, por ejemplo `a = 0` y `b = 1`.
- En cada iteración: imprime `a`, calcula el siguiente como `a + b`, y desplaza los valores (el nuevo `a` es el viejo `b`, el nuevo `b` es la suma). Necesitarás una variable temporal.
- Cuida los primeros dos términos: el caso `N = 1` solo imprime `0`.

---

## Ejercicio T3 — Invertir los dígitos de un número

### Enunciado

Pide un número entero positivo y muestra el mismo número con sus dígitos invertidos. Además, calcula la suma de sus dígitos.

### Salida esperada

```
Ingrese un numero: 12345
Invertido: 54321
Suma de digitos: 15
```

### Casos de prueba

| Número | Invertido | Suma de dígitos |
|--------|-----------|-----------------|
| 12345 | 54321 | 15 |
| 7 | 7 | 7 |
| 1000 | 1 | 1 |
| 9876 | 6789 | 30 |

### Pistas

- El último dígito de un número se obtiene con `n % 10`.
- Para "quitar" el último dígito, usa `n = n / 10` (división entera).
- Repite mientras `n` sea mayor que 0. Un `while` es natural aquí porque no sabes cuántos dígitos tiene el número de antemano.
- Para reconstruir el número invertido: `invertido = invertido * 10 + (n % 10)` en cada paso.

---

## Ejercicio T4 — Tabla de series numéricas

### Enunciado

Genera una tabla con los valores de las primeras 10 vueltas, donde cada fila muestra: el número de vuelta, un valor de la serie (los impares 1, 3, 5, …), su cuadrado y su cubo. Imprime la tabla alineada con tabuladores.

### Salida esperada

```
Vuelta  Serie   Cuadrado    Cubo
1       1       1           1
2       3       9           27
3       5       25          125
...
10      19      361         6859
```

### Casos de prueba

| Vuelta | Serie | Cuadrado | Cubo |
|--------|-------|----------|------|
| 1 | 1 | 1 | 1 |
| 2 | 3 | 9 | 27 |
| 5 | 9 | 81 | 729 |
| 10 | 19 | 361 | 6859 |

### Pistas

- La columna "Serie" son los impares: empieza en 1 y aumenta de 2 en 2 (`serie += 2`).
- El cuadrado es `serie * serie`; el cubo es `serie * serie * serie` (o usa `pow` de `math.h`, recordando que devuelve `double`).
- Usa `\t` en el `printf` para alinear las columnas.
- Imprime una fila de encabezados antes del ciclo.

---

## Reto opcional — Triángulo de números

### Enunciado

Para quien quiera ir más allá: usando ciclos anidados, imprime el siguiente patrón hasta la fila que indique el usuario:

```
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
```

### Pistas

- El ciclo externo controla las filas; el interno imprime los números del 1 hasta el número de fila actual.
- Es una variación del triángulo de asteriscos visto en clase, pero imprimiendo el valor de la columna en lugar de un asterisco.
