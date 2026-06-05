# Sesión 3 — Ciclos

> *El bucle `for` tiene su origen en 1951, cuando Heinz Rutishauser introdujo la instrucción `für` en su lenguaje Superplan, una de las primeras formas de automatizar la repetición en una computadora. Antes de los ciclos, repetir una operación significaba escribir físicamente la misma instrucción decenas de veces.*

---

## Palabras reservadas de esta sesión

| Keyword | Uso | Significado |
|---------|-----|-------------|
| `for` | `for (init; cond; paso)` | Ciclo con inicialización, condición y avance en una sola línea |
| `while` | `while (cond)` | Ciclo que se repite mientras la condición sea verdadera |
| `do` | `do { ... } while (cond);` | Ciclo que ejecuta el cuerpo al menos una vez antes de evaluar |
| `break` | `break;` | Termina el ciclo inmediatamente |
| `continue` | `continue;` | Salta a la siguiente iteración sin ejecutar el resto del cuerpo |

---

## Operadores de incremento y asignación compuesta

Los ciclos dependen de modificar una variable de control en cada vuelta. C ofrece operadores compactos para ello:

| Operador | Equivale a | Significado |
|----------|-----------|---------|
| `i++` | `i = i + 1` | incremento en 1 |
| `i--` | `i = i - 1` | decremento en 1 |
| `i += n` | `i = i + n` | incremento en n |
| `i -= n` | `i = i - n` | decremento en n |
| `i *= n` | `i = i * n` | multiplicación acumulada |
| `i /= n` | `i = i / n` | división acumulada |

!!! note "Pre-incremento vs post-incremento"
    `i++` (post-incremento) usa el valor actual de `i` y *después* lo incrementa. `++i` (pre-incremento) incrementa *primero* y luego usa el valor. En un ciclo `for` típico, ambos producen el mismo resultado porque el avance ocurre al final de cada iteración. La diferencia importa solo cuando el valor se usa dentro de la misma expresión:

    ```c
    int i = 5;
    printf("%d\n", i++);   // imprime 5, luego i vale 6
    printf("%d\n", ++i);   // i vale 7, imprime 7
    ```

---

## 1. ¿Qué es un ciclo?

Un **ciclo** (o bucle) repite un bloque de código mientras se cumpla una condición. Todo ciclo tiene tres elementos:

1. **Inicialización:** se establece la variable de control (por ejemplo, `i = 0`).
2. **Condición:** se evalúa antes (o después) de cada iteración; mientras sea verdadera, el ciclo continúa.
3. **Avance:** se modifica la variable de control para acercarse a la condición de salida (por ejemplo, `i++`).

Si el avance no acerca la condición a su fin, el ciclo nunca termina: es un **ciclo infinito**.

---

## 2. El ciclo `for`

El `for` reúne los tres elementos en una sola línea. Es ideal cuando **sabes cuántas veces** debe repetirse el ciclo.

```c
for (inicializacion; condicion; avance) {
    // cuerpo del ciclo
}
```

### Ejemplo: imprimir del 1 al 10

```c
#include <stdio.h>

int main() {
    int i;
    for (i = 1; i <= 10; i++) {
        printf("%d\n", i);
    }
    return 0;
}
```

### Orden de ejecución del `for`

| Paso | Qué ocurre |
|------|-----------|
| 1 | Se ejecuta la **inicialización** (una sola vez) |
| 2 | Se evalúa la **condición**. Si es falsa, el ciclo termina |
| 3 | Se ejecuta el **cuerpo** |
| 4 | Se ejecuta el **avance** |
| 5 | Se vuelve al paso 2 |

---

## 3. El ciclo `while`

El `while` evalúa la condición **antes** de cada iteración. Es ideal cuando **no sabes de antemano** cuántas veces se repetirá; el ciclo depende de una condición que puede cambiar.

```c
while (condicion) {
    // cuerpo del ciclo
}
```

### Ejemplo: imprimir del 1 al 10

```c
#include <stdio.h>

int main() {
    int i = 1;            // inicialización antes del ciclo
    while (i <= 10) {
        printf("%d\n", i);
        i++;              // avance dentro del cuerpo
    }
    return 0;
}
```

!!! warning "No olvides el avance"
    En un `while`, el avance de la variable de control es tu responsabilidad y va **dentro** del cuerpo. Si lo olvidas, la condición nunca cambia y el ciclo se vuelve infinito.

---

## 4. El ciclo `do-while`

El `do-while` evalúa la condición **al final**. Esto garantiza que el cuerpo se ejecute **al menos una vez**, sin importar la condición. Es ideal para menús y validación de entradas que deben pedirse mínimo una vez.

```c
do {
    // cuerpo del ciclo
} while (condicion);     // ¡el punto y coma final es obligatorio!
```

### Ejemplo: imprimir del 1 al 10

```c
#include <stdio.h>

int main() {
    int i = 1;
    do {
        printf("%d\n", i);
        i++;
    } while (i <= 10);
    return 0;
}
```

### Comparación de los tres ciclos

| Ciclo | Evalúa la condición | Se ejecuta al menos una vez | Úsalo cuando… |
|-------|---------------------|------------------------------|---------------|
| `for` | Antes | No | Conoces el número de repeticiones |
| `while` | Antes | No | El número de repeticiones depende de una condición |
| `do-while` | Después | Sí | El cuerpo debe ejecutarse mínimo una vez (menús) |

---

## 5. Patrones clásicos de iteración

### Acumulador (suma)

Una variable que arranca en 0 y va sumando en cada iteración.

```c
int suma = 0;
for (int i = 1; i <= 100; i++) {
    suma += i;          // acumula
}
printf("Suma = %d\n", suma);   // 5050
```

### Contador (conteo condicional)

Una variable que cuenta cuántas veces se cumple una condición.

```c
int pares = 0;
for (int i = 1; i <= 20; i++) {
    if (i % 2 == 0) {
        pares++;        // cuenta solo los pares
    }
}
printf("Hay %d numeros pares\n", pares);
```

### Producto (factorial)

```c
int factorial = 1;
for (int i = 1; i <= 5; i++) {
    factorial *= i;     // 1*2*3*4*5
}
printf("5! = %d\n", factorial);   // 120
```

---

## 6. Ciclos anidados

Un ciclo dentro de otro. El ciclo interno completa **todas** sus iteraciones por **cada** iteración del externo. Son la base para trabajar con tablas, matrices y figuras.

```c
#include <stdio.h>

int main() {
    int f, c;
    for (f = 1; f <= 3; f++) {        // filas
        for (c = 1; c <= 4; c++) {    // columnas
            printf("* ");
        }
        printf("\n");                 // salto de línea al terminar cada fila
    }
    return 0;
}
```

Salida:

```
* * * *
* * * *
* * * *
```

!!! tip "Regla de las variables de control"
    Cada ciclo anidado necesita **su propia** variable de control (`f` para filas, `c` para columnas). Reutilizar la misma variable en ambos provoca comportamientos incorrectos.

---

## 7. `break` y `continue`

| Instrucción | Efecto |
|-------------|--------|
| `break` | Sale del ciclo por completo, sin importar la condición |
| `continue` | Salta el resto del cuerpo y pasa a la siguiente iteración |

```c
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;          // al llegar a 5, termina el ciclo
    }
    printf("%d ", i);   // imprime: 1 2 3 4
}
```

```c
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        continue;       // salta los pares
    }
    printf("%d ", i);   // imprime: 1 3 5 7 9
}
```

---

## 8. Errores comunes con ciclos

### Punto y coma después del `for` o `while`

```c
for (int i = 0; i < 5; i++);    // INCORRECTO: el ; termina el for vacío
    printf("Hola\n");            // se ejecuta una sola vez, no 5
```

### Ciclo infinito por olvidar el avance

```c
int i = 1;
while (i <= 10) {
    printf("%d\n", i);
    // falta i++  ->  i siempre vale 1, el ciclo nunca termina
}
```

### Error de límites (*off-by-one*)

```c
for (int i = 0; i <= 10; i++)   // 11 iteraciones (0 a 10)
for (int i = 0; i <  10; i++)   // 10 iteraciones (0 a 9)
for (int i = 1; i <= 10; i++)   // 10 iteraciones (1 a 10)
```

Decidir entre `<` y `<=` es una de las decisiones más frecuentes (y más propensas a error) al escribir un ciclo. Verifica siempre los valores en los extremos.

### Olvidar el `;` final del `do-while`

```c
do {
    printf("Hola\n");
} while (i < 5)      // INCORRECTO: falta el ; al final
```
