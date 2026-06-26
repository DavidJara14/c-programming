# Tarea — Sesión 4

!!! note "Instrucciones de entrega"
    Un archivo `.c` por ejercicio. Define siempre el tamaño con `#define` y valida los índices. Comenta brevemente qué patrón (recorrido, acumulador, búsqueda) usas en cada caso.

!!! success "Soluciones disponibles"
    Cada ejercicio incluye su solución en un bloque desplegable. Intenta resolverlo por tu cuenta **antes** de abrirla.

---

## Ejercicio T1 — Estadísticas de un grupo

### Enunciado

Captura las calificaciones de 10 alumnos (valores de 0 a 100). Calcula y muestra:

1. El promedio del grupo.
2. Cuántos alumnos están **por encima** del promedio.
3. La calificación más alta y la más baja.

### Salida esperada

```
Promedio del grupo: 76.50
Alumnos sobre el promedio: 4
Mayor: 98   Menor: 45
```

### Casos de prueba

| Calificaciones | Promedio | Sobre prom. | Mayor | Menor |
|----------------|----------|-------------|-------|-------|
| 50 50 50 50 50 50 50 50 50 50 | 50.00 | 0 | 50 | 50 |
| 100 0 100 0 100 0 100 0 100 0 | 50.00 | 5 | 100 | 0 |

### Pistas

- Necesitas **dos** recorridos: en el primero calculas el promedio; en el segundo, ya conocido el promedio, cuentas cuántos lo superan.
- El máximo y el mínimo pueden obtenerse en el primer recorrido.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 10

    int main() {
        int cal[N], i, sobre = 0, mayor, menor, suma = 0;
        float promedio;

        for (i = 0; i < N; i++) {
            printf("Calificacion %d: ", i + 1);
            scanf("%d", &cal[i]);
        }

        mayor = menor = cal[0];
        for (i = 0; i < N; i++) {
            suma += cal[i];
            if (cal[i] > mayor) mayor = cal[i];
            if (cal[i] < menor) menor = cal[i];
        }
        promedio = (float) suma / N;

        for (i = 0; i < N; i++) {
            if (cal[i] > promedio) sobre++;
        }

        printf("\nPromedio del grupo: %.2f\n", promedio);
        printf("Alumnos sobre el promedio: %d\n", sobre);
        printf("Mayor: %d   Menor: %d\n", mayor, menor);
        return 0;
    }
    ```

---

## Ejercicio T2 — Ordenamiento de burbuja

### Enunciado

Ordena un arreglo de 8 enteros de **menor a mayor** usando el algoritmo de **burbuja** (*bubble sort*): comparar pares de elementos adyacentes e intercambiarlos si están desordenados, repitiendo el proceso hasta que el arreglo quede ordenado.

### Salida esperada

```
Original:  5 1 4 2 8 0 9 3
Ordenado:  0 1 2 3 4 5 8 9
```

### Casos de prueba

| Entrada | Salida |
|---------|--------|
| 5 1 4 2 8 | 1 2 4 5 8 |
| 3 3 1 1 2 | 1 1 2 3 3 |
| 9 8 7 6 5 | 5 6 7 8 9 |

### Pistas

- Necesitas dos ciclos anidados. El externo controla cuántas pasadas se hacen; el interno compara pares adyacentes (`v[j]` con `v[j+1]`).
- Cuidado con el límite del ciclo interno: si accedes a `v[j+1]`, `j` debe llegar solo hasta `N - 2`.
- El intercambio requiere variable temporal.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 8

    int main() {
        int v[N] = {5, 1, 4, 2, 8, 0, 9, 3};
        int i, j, temp;

        printf("Original:  ");
        for (i = 0; i < N; i++) printf("%d ", v[i]);

        for (i = 0; i < N - 1; i++) {
            for (j = 0; j < N - 1 - i; j++) {
                if (v[j] > v[j + 1]) {
                    temp = v[j];
                    v[j] = v[j + 1];
                    v[j + 1] = temp;
                }
            }
        }

        printf("\nOrdenado:  ");
        for (i = 0; i < N; i++) printf("%d ", v[i]);
        printf("\n");
        return 0;
    }
    ```

    **Optimización:** el `- i` en el límite interno aprovecha que, tras cada pasada, el elemento más grande ya quedó "burbujeado" hasta el final y no hace falta volver a compararlo.

---

## Ejercicio T3 — Producto de matrices 2×2

### Enunciado

Lee dos matrices de 2×2 (A y B) y calcula su producto C = A × B siguiendo la regla del producto matricial: cada elemento `C[i][j]` es la suma de los productos de la fila `i` de A por la columna `j` de B.

### Salida esperada

```
Matriz A:        Matriz B:
1 2              5 6
3 4              7 8

Producto A x B:
19 22
43 50
```

### Casos de prueba

| A | B | A×B |
|---|---|-----|
| [[1,2],[3,4]] | [[5,6],[7,8]] | [[19,22],[43,50]] |
| [[1,0],[0,1]] | [[9,8],[7,6]] | [[9,8],[7,6]] |

### Pistas

- El producto de matrices necesita **tres** índices: fila (`i`), columna (`j`) y el índice de la sumatoria (`k`).
- `C[i][j] = A[i][0]*B[0][j] + A[i][1]*B[1][j]`.
- Inicializa cada `C[i][j]` en 0 antes de acumular.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 2

    int main() {
        int A[N][N], B[N][N], C[N][N];
        int i, j, k;

        printf("Matriz A (4 valores):\n");
        for (i = 0; i < N; i++)
            for (j = 0; j < N; j++) scanf("%d", &A[i][j]);

        printf("Matriz B (4 valores):\n");
        for (i = 0; i < N; i++)
            for (j = 0; j < N; j++) scanf("%d", &B[i][j]);

        for (i = 0; i < N; i++) {
            for (j = 0; j < N; j++) {
                C[i][j] = 0;
                for (k = 0; k < N; k++) {
                    C[i][j] += A[i][k] * B[k][j];
                }
            }
        }

        printf("\nProducto A x B:\n");
        for (i = 0; i < N; i++) {
            for (j = 0; j < N; j++) printf("%d ", C[i][j]);
            printf("\n");
        }
        return 0;
    }
    ```

---

## Ejercicio T4 — Eliminar duplicados

### Enunciado

Dado un arreglo de 10 enteros, muestra únicamente los valores **distintos**, en el orden en que aparecen por primera vez.

### Salida esperada

```
Original: 3 3 1 5 1 3 7 5 9 1
Unicos:   3 1 5 7 9
```

### Casos de prueba

| Entrada | Salida |
|---------|--------|
| 1 1 1 1 1 | 1 |
| 1 2 3 4 5 | 1 2 3 4 5 |
| 4 2 4 2 4 | 4 2 |

### Pistas

- Por cada elemento, recórrelo contra los **anteriores**: si ya apareció, no lo imprimas.
- Una función auxiliar mental: "¿este valor ya está en alguna posición previa?".

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 10

    int main() {
        int v[N], i, j, repetido;

        for (i = 0; i < N; i++) {
            printf("v[%d]: ", i);
            scanf("%d", &v[i]);
        }

        printf("\nUnicos: ");
        for (i = 0; i < N; i++) {
            repetido = 0;
            for (j = 0; j < i; j++) {       // compara con los anteriores
                if (v[j] == v[i]) {
                    repetido = 1;
                    break;
                }
            }
            if (!repetido) printf("%d ", v[i]);
        }
        printf("\n");
        return 0;
    }
    ```

---

## Reto opcional — La transpuesta

### Enunciado

Lee una matriz de 3×3 e imprime su **transpuesta**: la matriz que resulta de intercambiar filas por columnas (el elemento `[i][j]` pasa a la posición `[j][i]`).

```
Original:        Transpuesta:
1 2 3            1 4 7
4 5 6      →     2 5 8
7 8 9            3 6 9
```

### Pistas

- No necesitas una segunda matriz para imprimirla: basta con imprimir `m[c][f]` en lugar de `m[f][c]`.
- Si sí quieres transponer "en su lugar" (sobre la misma matriz cuadrada), intercambia `m[i][j]` con `m[j][i]` solo para `j > i`, para no deshacer el cambio.
