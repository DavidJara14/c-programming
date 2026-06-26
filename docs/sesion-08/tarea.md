# Tarea — Sesión 8

!!! note "Instrucciones de entrega"
    Un archivo `.c` por ejercicio. **Regla absoluta:** cada `malloc`/`calloc`/`realloc` debe tener su `free`, y cada reserva debe verificarse contra `NULL`. Comenta dónde reservas y dónde liberas.

!!! success "Soluciones disponibles"
    Cada ejercicio incluye su solución en un bloque desplegable. Intenta resolverlo por tu cuenta **antes** de abrirla.

---

## Ejercicio T1 — Lista de calificaciones de tamaño variable

### Enunciado

Pide cuántos alumnos hay, reserva un arreglo dinámico, captura sus calificaciones y calcula el promedio, el máximo y el mínimo. Libera la memoria.

### Salida esperada

```
¿Cuantos alumnos? 4
Calificacion 1: 80
Calificacion 2: 90
Calificacion 3: 70
Calificacion 4: 100
Promedio: 85.00
Maximo: 100   Minimo: 70
```

### Casos de prueba

| n | Calificaciones | Promedio | Max | Min |
|---|----------------|----------|-----|-----|
| 4 | 80 90 70 100 | 85.00 | 100 | 70 |
| 1 | 55 | 55.00 | 55 | 55 |

### Pistas

- El tamaño se conoce solo en ejecución: caso perfecto para `malloc`.
- Verifica `NULL` antes de usar el arreglo.
- Inicializa max/min con el primer elemento.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <stdlib.h>

    int main() {
        int n;
        printf("¿Cuantos alumnos? ");
        scanf("%d", &n);

        float *cal = malloc(n * sizeof(float));
        if (cal == NULL) { printf("Sin memoria.\n"); return 1; }

        float suma = 0, max, min;
        for (int i = 0; i < n; i++) {
            printf("Calificacion %d: ", i + 1);
            scanf("%f", &cal[i]);
            suma += cal[i];
        }

        max = min = cal[0];
        for (int i = 0; i < n; i++) {
            if (cal[i] > max) max = cal[i];
            if (cal[i] < min) min = cal[i];
        }

        printf("Promedio: %.2f\n", suma / n);
        printf("Maximo: %.0f   Minimo: %.0f\n", max, min);

        free(cal);
        return 0;
    }
    ```

---

## Ejercicio T2 — Concatenar dos arreglos dinámicos

### Enunciado

Lee dos arreglos dinámicos de tamaños `n` y `m`. Crea un tercer arreglo dinámico de tamaño `n + m` que contenga todos los elementos del primero seguidos de los del segundo. Imprímelo y libera los tres.

### Salida esperada

```
Arreglo A (3): 1 2 3
Arreglo B (2): 7 8
Concatenado:   1 2 3 7 8
```

### Casos de prueba

| A | B | Resultado |
|---|---|-----------|
| 1 2 3 | 7 8 | 1 2 3 7 8 |
| 5 | 9 9 9 | 5 9 9 9 |

### Pistas

- Reserva el tercer arreglo con tamaño `n + m`.
- Copia A en las primeras `n` posiciones; copia B a partir del índice `n`.
- Tres reservas → tres `free`.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <stdlib.h>

    int main() {
        int n = 3, m = 2;
        int *a = malloc(n * sizeof(int));
        int *b = malloc(m * sizeof(int));
        int datosA[] = {1, 2, 3}, datosB[] = {7, 8};

        for (int i = 0; i < n; i++) a[i] = datosA[i];
        for (int i = 0; i < m; i++) b[i] = datosB[i];

        int *c = malloc((n + m) * sizeof(int));
        for (int i = 0; i < n; i++)     c[i] = a[i];
        for (int i = 0; i < m; i++)     c[n + i] = b[i];

        printf("Concatenado:");
        for (int i = 0; i < n + m; i++) printf(" %d", c[i]);
        printf("\n");

        free(a);
        free(b);
        free(c);
        return 0;
    }
    ```

---

## Ejercicio T3 — Arreglo que crece bajo demanda

### Enunciado

Lee números enteros uno por uno (termina cuando el usuario ingrese `-1`). No sabes cuántos serán. Empieza con capacidad 2 y, cada vez que se llene, **duplica** la capacidad con `realloc`. Al final, muestra todos los números capturados y cuántos fueron.

### Salida esperada

```
Numero (-1 para terminar): 5
Numero (-1 para terminar): 8
Numero (-1 para terminar): 3
Numero (-1 para terminar): -1
Capturaste 3 numeros: 5 8 3
```

### Pistas

- Lleva dos variables: `capacidad` (cuánto cabe) y `cantidad` (cuánto hay).
- Cuando `cantidad == capacidad`, duplica con `realloc` y verifica el resultado en una variable temporal.
- Esta es la idea detrás de los "arreglos dinámicos" o "vectores" de lenguajes de más alto nivel.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <stdlib.h>

    int main() {
        int capacidad = 2, cantidad = 0, num;
        int *v = malloc(capacidad * sizeof(int));
        if (v == NULL) return 1;

        printf("Numero (-1 para terminar): ");
        scanf("%d", &num);
        while (num != -1) {
            if (cantidad == capacidad) {
                capacidad *= 2;
                int *temp = realloc(v, capacidad * sizeof(int));
                if (temp == NULL) { free(v); return 1; }
                v = temp;
            }
            v[cantidad++] = num;
            printf("Numero (-1 para terminar): ");
            scanf("%d", &num);
        }

        printf("Capturaste %d numeros:", cantidad);
        for (int i = 0; i < cantidad; i++) printf(" %d", v[i]);
        printf("\n");

        free(v);
        return 0;
    }
    ```

---

## Ejercicio T4 — Matriz dinámica y su transpuesta

### Enunciado

Crea una matriz dinámica de `f × c` con valores capturados por el usuario. Genera una **segunda** matriz dinámica de `c × f` que sea su transpuesta. Muestra ambas y libera todo.

### Salida esperada

```
Original (2x3):     Transpuesta (3x2):
1 2 3               1 4
4 5 6               2 5
                    3 6
```

### Pistas

- La transpuesta tiene dimensiones **intercambiadas**: si la original es `f × c`, la transpuesta es `c × f`.
- `T[j][i] = M[i][j]`.
- Reserva, usa y libera cada matriz con su patrón de doble apuntador.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <stdlib.h>

    int **crearMatriz(int f, int c) {
        int **m = malloc(f * sizeof(int *));
        for (int i = 0; i < f; i++) m[i] = malloc(c * sizeof(int));
        return m;
    }

    void liberarMatriz(int **m, int f) {
        for (int i = 0; i < f; i++) free(m[i]);
        free(m);
    }

    int main() {
        int f = 2, c = 3;
        int **M = crearMatriz(f, c);
        int valor = 1;
        for (int i = 0; i < f; i++)
            for (int j = 0; j < c; j++) M[i][j] = valor++;

        int **T = crearMatriz(c, f);
        for (int i = 0; i < f; i++)
            for (int j = 0; j < c; j++) T[j][i] = M[i][j];

        printf("Transpuesta:\n");
        for (int i = 0; i < c; i++) {
            for (int j = 0; j < f; j++) printf("%d ", T[i][j]);
            printf("\n");
        }

        liberarMatriz(M, f);
        liberarMatriz(T, c);
        return 0;
    }
    ```

    **Diseño modular:** encapsular `crearMatriz` y `liberarMatriz` evita repetir el patrón de reserva/liberación y reduce errores.

---

## Reto opcional — Mini gestor de cadenas dinámicas

### Enunciado

Lee `n` nombres (n lo da el usuario). Reserva un arreglo dinámico de apuntadores `char **`, y para cada nombre reserva **solo** los bytes que necesita (`strlen(nombre) + 1`). Imprime los nombres y libera toda la memoria.

### Pistas

- `char **nombres = malloc(n * sizeof(char *));`.
- Por cada nombre leído en un búfer temporal, `nombres[i] = malloc(strlen(buffer) + 1);` y luego `strcpy`.
- Libera primero cada `nombres[i]`, después `nombres`. El mismo patrón inverso de la matriz dinámica.
