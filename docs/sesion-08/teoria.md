# Sesión 8 — Apuntadores II y Memoria Dinámica

> *Todo programa en C trabaja con dos regiones de memoria muy distintas: la pila (`stack`), rápida y automática, donde viven las variables locales; y el montón (`heap`), una reserva enorme que el programador administra a mano. La memoria dinámica es la llave del* heap*: permite pedir exactamente la cantidad de memoria que se necesita, cuando se necesita, y devolverla al terminar. Es lo que hace posible un editor de texto que abre archivos de cualquier tamaño o un navegador que carga páginas que no existían cuando el programa se compiló.*

---

## Funciones y conceptos de esta sesión

| Función / Concepto | Firma | Descripción |
|--------------------|-------|-------------|
| `malloc` | `void *malloc(size_t n)` | Reserva `n` bytes; devuelve un apuntador o `NULL` |
| `calloc` | `void *calloc(size_t c, size_t t)` | Reserva e **inicializa en cero** `c` elementos de tamaño `t` |
| `realloc` | `void *realloc(void *p, size_t n)` | Redimensiona un bloque ya reservado |
| `free` | `void free(void *p)` | Libera la memoria reservada |
| `sizeof` | `sizeof(int)` | Tamaño en bytes de un tipo |
| Heap | montón | Región de memoria administrada manualmente |

Todas estas funciones viven en `<stdlib.h>`.

---

## 1. Memoria estática vs. dinámica

Hasta ahora, el tamaño de tus arreglos se fijaba al escribir el programa:

```c
int v[100];   // 100 enteros, ni uno más ni uno menos
```

¿Y si no sabes cuántos datos habrá hasta ejecutar el programa? Reservar 100 "por si acaso" desperdicia memoria si solo usas 3, y se queda corto si necesitas 200. La **memoria dinámica** resuelve esto: pides la cantidad exacta **en tiempo de ejecución**.

| | Memoria automática (pila) | Memoria dinámica (heap) |
|--|---------------------------|--------------------------|
| Tamaño | Fijo, conocido al compilar | Variable, decidido al ejecutar |
| Quién la libera | El sistema, al salir del bloque | **El programador**, con `free` |
| Velocidad | Muy rápida | Algo más lenta |
| Declaración | `int v[10];` | `int *v = malloc(...);` |

---

## 2. `malloc`: reservar memoria

`malloc` (*memory allocation*) reserva un bloque de bytes y devuelve la dirección de su inicio. Como no sabe para qué tipo lo quieres, devuelve un `void *` que se ajusta al tipo destino.

```c
#include <stdlib.h>

int *v = malloc(5 * sizeof(int));   // espacio para 5 enteros
```

El patrón es siempre el mismo: `cantidad * sizeof(tipo)`. Usar `sizeof(int)` en lugar de "4" hace el código portable a cualquier sistema.

!!! danger "Verifica SIEMPRE si `malloc` falló"
    Si no hay memoria suficiente, `malloc` devuelve `NULL`. Desreferenciar ese `NULL` es un fallo grave. Comprueba **siempre**:

    ```c
    int *v = malloc(n * sizeof(int));
    if (v == NULL) {
        printf("Error: sin memoria.\n");
        return 1;
    }
    ```

### Usar la memoria reservada

Una vez reservada, se usa **igual que un arreglo normal**:

```c
int n = 5;
int *v = malloc(n * sizeof(int));

for (int i = 0; i < n; i++) {
    v[i] = i * 10;          // notación de arreglo, sobre memoria dinámica
}
```

---

## 3. `free`: devolver la memoria

La memoria del heap **no** se libera sola. Si no la devuelves, queda reservada hasta que el programa termina: eso es una **fuga de memoria** (*memory leak*). Por cada `malloc` debe haber, tarde o temprano, un `free`.

```c
free(v);      // devuelve la memoria al sistema
v = NULL;     // buena práctica: evita usarla por accidente
```

!!! warning "Errores clásicos con `free`"
    - **Doble liberación:** llamar `free(v)` dos veces sobre el mismo bloque corrompe el heap.
    - **Usar después de liberar (*use after free*):** acceder a `v[0]` tras `free(v)` es comportamiento indefinido.
    - Asignar `v = NULL` después de `free` previene ambos: liberar `NULL` no hace nada y desreferenciar `NULL` falla de forma evidente.

---

## 4. `calloc` y `realloc`

### `calloc`: reservar e inicializar en cero

```c
int *v = calloc(5, sizeof(int));   // 5 enteros, TODOS en 0
```

A diferencia de `malloc` (que deja basura), `calloc` pone todo en cero. Recibe dos argumentos: la cantidad y el tamaño de cada elemento.

### `realloc`: cambiar el tamaño

Permite agrandar (o encoger) un bloque ya reservado, conservando su contenido.

```c
int *v = malloc(3 * sizeof(int));
// ... resulta que necesitas 6 ...
int *temp = realloc(v, 6 * sizeof(int));
if (temp != NULL) {
    v = temp;      // solo reasignar si tuvo éxito
}
```

!!! tip "Usa una variable temporal con `realloc`"
    Si `realloc` falla, devuelve `NULL` **pero el bloque original sigue válido**. Si hicieras `v = realloc(v, ...)` directamente y fallara, perderías la única referencia a la memoria anterior (otra fuga). Por eso se asigna primero a `temp`.

---

## 5. Un arreglo de tamaño definido por el usuario

Este es el caso de uso por excelencia de la memoria dinámica:

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;
    printf("¿Cuantos numeros? ");
    scanf("%d", &n);

    int *v = malloc(n * sizeof(int));   // tamaño decidido AHORA
    if (v == NULL) {
        printf("Sin memoria.\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        v[i] = i * i;
    }
    for (int i = 0; i < n; i++) {
        printf("%d ", v[i]);
    }
    printf("\n");

    free(v);     // siempre liberar
    return 0;
}
```

---

## 6. Apuntadores a apuntadores (doble apuntador)

Un apuntador también es una variable y, como tal, tiene dirección. Un **apuntador a apuntador** guarda la dirección de otro apuntador. Se declara con `**`.

```c
int x = 5;
int *p = &x;     // p apunta a x
int **pp = &p;   // pp apunta a p

printf("%d\n", x);      // 5
printf("%d\n", *p);     // 5
printf("%d\n", **pp);   // 5  (doble desreferencia)
```

```
   pp          p          x
+------+    +------+    +-----+
| &p   |--->| &x   |--->|  5  |
+------+    +------+    +-----+
```

### ¿Para qué sirven?

El uso más común es cuando una función debe **modificar un apuntador** del que la llama (por ejemplo, reservar memoria y devolverla a través de un parámetro), o para construir matrices dinámicas.

```c
void reservar(int **p, int n) {
    *p = malloc(n * sizeof(int));   // modifica el apuntador del llamador
}

int main() {
    int *datos = NULL;
    reservar(&datos, 10);    // pasamos la DIRECCIÓN del apuntador
    datos[0] = 99;
    free(datos);
    return 0;
}
```

---

## 7. Matriz dinámica (adelanto)

Combinando doble apuntador y `malloc`, se crea una matriz cuyas dimensiones se deciden en ejecución:

```c
int filas = 3, cols = 4;

int **m = malloc(filas * sizeof(int *));   // arreglo de apuntadores
for (int i = 0; i < filas; i++) {
    m[i] = malloc(cols * sizeof(int));     // cada fila, su propio bloque
}

m[1][2] = 7;    // se usa como una matriz normal

// liberar en orden inverso
for (int i = 0; i < filas; i++) free(m[i]);
free(m);
```

!!! note "Libera en orden inverso a como reservaste"
    Primero cada fila (`m[i]`), después el arreglo de apuntadores (`m`). Si liberas `m` primero, pierdes el acceso a las filas y provocas fugas.

---

## 8. Errores comunes con memoria dinámica

### No verificar `NULL`

```c
int *v = malloc(n * sizeof(int));
v[0] = 1;     // INCORRECTO si malloc falló: escribe en NULL
```

### Fuga de memoria (olvidar `free`)

```c
void f(void) {
    int *v = malloc(100 * sizeof(int));
    // ... falta free(v);  -> esa memoria queda perdida
}
```

### Usar después de liberar

```c
free(v);
printf("%d\n", v[0]);   // INCORRECTO: use after free
```

### Calcular mal el tamaño

```c
int *v = malloc(n);             // INCORRECTO: reserva n bytes, no n enteros
int *v = malloc(n * sizeof(int)); // CORRECTO
```

### Liberar memoria que no vino de `malloc`

```c
int v[10];
free(v);     // INCORRECTO: v es memoria automática, no del heap
```
