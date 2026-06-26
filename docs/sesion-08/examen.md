# Examen — Sesión 8: Apuntadores II y Memoria Dinámica

!!! note "Instrucciones"
    Examen de autoevaluación teórica. Resuélvelo **sin consultar** apuntes ni compilador; contrasta después con las respuestas desplegables. Tiempo sugerido: **50 minutos**. Puntaje total: **100 puntos**.

---

## Parte A — Opción múltiple (40 pts, 5 c/u)

**1.** ¿Qué devuelve `malloc` si no hay memoria suficiente?

- a) 0
- b) `NULL`
- c) Un bloque vacío
- d) Termina el programa

**2.** ¿Cuál es la forma correcta de reservar espacio para `n` enteros?

- a) `malloc(n)`
- b) `malloc(n * sizeof(int))`
- c) `malloc(sizeof(n))`
- d) `malloc(int * n)`

**3.** ¿Qué diferencia hay entre `malloc` y `calloc`?

- a) Ninguna
- b) `calloc` inicializa la memoria en cero, `malloc` no
- c) `malloc` es más seguro
- d) `calloc` no necesita `free`

**4.** ¿Qué es una fuga de memoria (*memory leak*)?

- a) Memoria reservada que nunca se libera
- b) Un error de compilación
- c) Liberar memoria dos veces
- d) Usar `calloc`

**5.** ¿Para qué sirve `realloc`?

- a) Para liberar memoria
- b) Para redimensionar un bloque ya reservado
- c) Para inicializar en cero
- d) Para comparar apuntadores

**6.** Tras `free(v);`, ¿qué es buena práctica hacer?

- a) `v = 0.0;`
- b) `v = NULL;`
- c) `free(v)` otra vez
- d) Nada

**7.** ¿Qué declara `int **pp;`?

- a) Un arreglo de enteros
- b) Un apuntador a apuntador a int
- c) Dos enteros
- d) Un entero doble

**8.** Al liberar una matriz dinámica `int **m` de `f` filas, el orden correcto es:

- a) `free(m)` y ya
- b) Primero cada `m[i]`, luego `m`
- c) Primero `m`, luego cada `m[i]`
- d) No hace falta liberar

??? success "Respuestas Parte A"
    | # | Resp. | Justificación |
    |---|-------|---------------|
    | 1 | **b** | Devuelve `NULL` ante fallo; siempre verificarlo |
    | 2 | **b** | `cantidad * sizeof(tipo)` es el patrón portable |
    | 3 | **b** | `calloc` deja todo en cero; `malloc` deja basura |
    | 4 | **a** | Memoria reservada que se pierde sin liberar |
    | 5 | **b** | Cambia el tamaño conservando el contenido |
    | 6 | **b** | Evita *use after free* y doble liberación |
    | 7 | **b** | `**` = apuntador a apuntador |
    | 8 | **b** | Liberar en orden inverso a la reserva |

---

## Parte B — Verdadero o Falso (20 pts, 4 c/u)

1. La memoria reservada con `malloc` se libera automáticamente al salir de la función. `____`
2. Por cada `malloc` debería existir un `free`. `____`
3. `calloc(5, sizeof(int))` reserva 5 enteros inicializados en cero. `____`
4. Acceder a `v[0]` después de `free(v)` es seguro. `____`
5. La memoria dinámica permite decidir el tamaño de un arreglo en tiempo de ejecución. `____`

??? success "Respuestas Parte B"
    1. **F** — El heap NO se libera solo; es responsabilidad del programador.
    2. **V** — Equilibrar reservas y liberaciones evita fugas.
    3. **V** — Esa es justamente la función de `calloc`.
    4. **F** — Es *use after free*: comportamiento indefinido.
    5. **V** — Esa es su razón de ser.

---

## Parte C — ¿Qué imprime / qué falla? (20 pts, 10 c/u)

**Código 1**

```c
int *v = calloc(3, sizeof(int));
v[1] = 5;
printf("%d %d %d\n", v[0], v[1], v[2]);
free(v);
```

**Código 2 — ¿qué problema tiene?**

```c
int *v = malloc(3 * sizeof(int));
v = malloc(5 * sizeof(int));
free(v);
```

??? success "Respuestas Parte C"
    **Código 1 →** `0 5 0`. `calloc` inicializa todo en 0; solo `v[1]` se cambió a 5.

    **Código 2 →** **Fuga de memoria.** El primer bloque de 3 enteros se pierde: al reasignar `v` con el segundo `malloc`, nadie conserva la dirección del primero, así que ya no puede liberarse. Habría que `free(v)` antes de la segunda reserva (o usar `realloc`).

---

## Parte D — Detecta el error (10 pts)

Este programa quiere reservar e inicializar un arreglo, pero tiene **dos** fallos. Encuéntralos.

```c
#include <stdlib.h>
int main() {
    int n = 5;
    int *v = malloc(n);
    for (int i = 0; i <= n; i++) {
        v[i] = i;
    }
    return 0;
}
```

??? success "Respuesta Parte D"
    1. **Tamaño incorrecto:** `malloc(n)` reserva 5 **bytes**, no 5 enteros. Debe ser `malloc(n * sizeof(int))`.
    2. **Índice fuera de rango:** el ciclo usa `i <= n`, accediendo a `v[5]`, que no existe (índices válidos 0–4). Debe ser `i < n`.

    Además, falta `free(v);` antes de terminar (fuga de memoria).

    ```c
    int *v = malloc(n * sizeof(int));
    if (v == NULL) return 1;
    for (int i = 0; i < n; i++) v[i] = i;
    free(v);
    ```

---

## Parte E — Desarrollo (10 pts)

Explica en 4–6 líneas la diferencia entre la memoria de la **pila** (variables locales) y la del **montón** (memoria dinámica). Menciona quién libera cada una y cuándo conviene usar el heap.

??? success "Respuesta orientativa Parte E"
    La **pila** (*stack*) guarda las variables locales: el sistema reserva su espacio al entrar en la función y lo libera automáticamente al salir; su tamaño debe conocerse al compilar y es muy rápida. El **montón** (*heap*) es una reserva grande que el programador administra a mano con `malloc`/`free`: su tamaño puede decidirse en tiempo de ejecución y la memoria persiste hasta que se libere explícitamente. Conviene usar el heap cuando no se conoce el tamaño de los datos de antemano, cuando los datos deben sobrevivir al fin de la función que los creó, o cuando son demasiado grandes para la pila. El precio es la responsabilidad: olvidar `free` produce fugas.
