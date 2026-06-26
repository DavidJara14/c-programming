# Ejercicios en Clase — Sesión 8

---

## Ejercicio 1 — Arreglo dinámico básico

**Objetivo:** Reservar, usar y liberar un arreglo cuyo tamaño define el usuario.

### Enunciado

Pide al usuario cuántos números quiere capturar, reserva un arreglo dinámico de ese tamaño, llénalo y muestra la suma. Libera la memoria al final.

### Salida esperada

```
¿Cuantos numeros? 3
[0]: 10
[1]: 20
[2]: 30
Suma: 60
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <stdlib.h>

    int main() {
        int n, suma = 0;

        printf("¿Cuantos numeros? ");
        scanf("%d", &n);

        int *v = malloc(n * sizeof(int));
        if (v == NULL) {
            printf("Sin memoria.\n");
            return 1;
        }

        for (int i = 0; i < n; i++) {
            printf("[%d]: ", i);
            scanf("%d", &v[i]);
            suma += v[i];
        }

        printf("Suma: %d\n", suma);
        free(v);
        return 0;
    }
    ```

---

## Ejercicio 2 — `malloc` vs. `calloc`

**Objetivo:** Observar la diferencia entre memoria sin inicializar y memoria en cero.

### Enunciado

Reserva dos arreglos de 5 enteros: uno con `malloc` y otro con `calloc`, **sin** asignarles valores. Imprime ambos. Observa que `calloc` garantiza ceros y `malloc` no.

### Salida esperada

```
malloc (basura): valores impredecibles
calloc (ceros):  0 0 0 0 0
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <stdlib.h>
    #define N 5

    int main() {
        int *a = malloc(N * sizeof(int));
        int *b = calloc(N, sizeof(int));

        printf("malloc (basura):");
        for (int i = 0; i < N; i++) printf(" %d", a[i]);

        printf("\ncalloc (ceros): ");
        for (int i = 0; i < N; i++) printf(" %d", b[i]);
        printf("\n");

        free(a);
        free(b);
        return 0;
    }
    ```

    **Nota:** los valores de `malloc` pueden variar (incluso ser cero por casualidad); lo importante es que **no están garantizados**.

---

## Ejercicio 3 — Crecer un arreglo con `realloc`

**Objetivo:** Redimensionar un bloque conservando su contenido.

### Enunciado

Crea un arreglo dinámico de 3 enteros y llénalo. Luego usa `realloc` para ampliarlo a 6, llena los nuevos y muestra los 6. Comprueba que los 3 originales siguen ahí.

### Salida esperada

```
Inicial:  1 2 3
Ampliado: 1 2 3 4 5 6
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <stdlib.h>

    int main() {
        int *v = malloc(3 * sizeof(int));
        for (int i = 0; i < 3; i++) v[i] = i + 1;

        printf("Inicial: ");
        for (int i = 0; i < 3; i++) printf(" %d", v[i]);

        int *temp = realloc(v, 6 * sizeof(int));
        if (temp == NULL) { free(v); return 1; }
        v = temp;

        for (int i = 3; i < 6; i++) v[i] = i + 1;

        printf("\nAmpliado:");
        for (int i = 0; i < 6; i++) printf(" %d", v[i]);
        printf("\n");

        free(v);
        return 0;
    }
    ```

---

## Ejercicio 4 — Devolver un arreglo desde una función

**Objetivo:** Aprovechar que la memoria del heap sobrevive al fin de la función.

### Enunciado

Escribe `int *crearCuadrados(int n)` que reserve un arreglo de `n` enteros, lo llene con los cuadrados 1, 4, 9, … y lo **devuelva**. En `main`, úsalo y libéralo.

### Salida esperada

```
1 4 9 16 25
```

### Pistas

- A diferencia de una variable local, la memoria de `malloc` no muere al salir de la función: por eso se puede devolver.
- Quien recibe el apuntador es responsable de llamar `free`.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <stdlib.h>

    int *crearCuadrados(int n) {
        int *v = malloc(n * sizeof(int));
        if (v == NULL) return NULL;
        for (int i = 0; i < n; i++) v[i] = (i + 1) * (i + 1);
        return v;
    }

    int main() {
        int n = 5;
        int *cuadrados = crearCuadrados(n);
        if (cuadrados == NULL) return 1;

        for (int i = 0; i < n; i++) printf("%d ", cuadrados[i]);
        printf("\n");

        free(cuadrados);
        return 0;
    }
    ```

---

## Ejercicio 5 — Reservar a través de un doble apuntador

**Objetivo:** Modificar el apuntador del llamador con `int **`.

### Enunciado

Escribe `void reservarYllenar(int **p, int n)` que reserve un arreglo de `n` enteros (modificando el apuntador de `main`) y lo llene con los números del 1 al `n`. En `main`, declara `int *datos = NULL;` y pásalo con `&datos`.

### Salida esperada

```
1 2 3 4
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <stdlib.h>

    void reservarYllenar(int **p, int n) {
        *p = malloc(n * sizeof(int));
        if (*p == NULL) return;
        for (int i = 0; i < n; i++) {
            (*p)[i] = i + 1;
        }
    }

    int main() {
        int *datos = NULL;
        int n = 4;
        reservarYllenar(&datos, n);

        for (int i = 0; i < n; i++) printf("%d ", datos[i]);
        printf("\n");

        free(datos);
        return 0;
    }
    ```

    **Atención a `(*p)[i]`:** los paréntesis son necesarios porque `[]` tiene mayor precedencia que `*`. Sin ellos, `*p[i]` se interpretaría distinto.

---

## Ejercicio 6 — Matriz dinámica

**Objetivo:** Construir y liberar una matriz de dimensiones dadas en ejecución.

### Enunciado

Pide filas y columnas, crea una matriz dinámica, llénala con la tabla de multiplicar (`m[i][j] = (i+1)*(j+1)`) y muéstrala. Libera correctamente.

### Salida esperada

```
Filas: 3
Columnas: 4
 1  2  3  4
 2  4  6  8
 3  6  9 12
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <stdlib.h>

    int main() {
        int filas, cols;
        printf("Filas: ");    scanf("%d", &filas);
        printf("Columnas: "); scanf("%d", &cols);

        int **m = malloc(filas * sizeof(int *));
        for (int i = 0; i < filas; i++) {
            m[i] = malloc(cols * sizeof(int));
            for (int j = 0; j < cols; j++) {
                m[i][j] = (i + 1) * (j + 1);
            }
        }

        for (int i = 0; i < filas; i++) {
            for (int j = 0; j < cols; j++) printf("%3d", m[i][j]);
            printf("\n");
        }

        for (int i = 0; i < filas; i++) free(m[i]);   // primero las filas
        free(m);                                      // luego el arreglo
        return 0;
    }
    ```

---

## Ejercicio 7 — Detectar la fuga

**Objetivo:** Reconocer y corregir una fuga de memoria.

### Enunciado

El siguiente código tiene una fuga de memoria. Identifícala, explícala y corrígela.

```c
#include <stdlib.h>
int main() {
    for (int i = 0; i < 1000; i++) {
        int *v = malloc(100 * sizeof(int));
        v[0] = i;
    }
    return 0;
}
```

### Solución

??? example "Ver solución"
    El bucle reserva memoria **1000 veces** pero nunca la libera. En cada vuelta, el apuntador `v` se reasigna y se pierde la referencia al bloque anterior, que queda reservado sin posibilidad de liberarlo: 1000 fugas. La corrección es liberar dentro del bucle:

    ```c
    #include <stdlib.h>
    int main() {
        for (int i = 0; i < 1000; i++) {
            int *v = malloc(100 * sizeof(int));
            if (v == NULL) return 1;
            v[0] = i;
            free(v);          // libera antes de la siguiente iteración
        }
        return 0;
    }
    ```

    **Regla:** por cada `malloc` debe existir un `free`. Si reservas dentro de un bucle, normalmente también liberas dentro del bucle.
