# Tarea — Sesión 7

!!! note "Instrucciones de entrega"
    Un archivo `.c` por ejercicio. En cada función, ten claro si recibes un **valor** o una **dirección**, y usa `&` y `*` con intención. Comenta qué representa cada apuntador.

!!! success "Soluciones disponibles"
    Cada ejercicio incluye su solución en un bloque desplegable. Intenta resolverlo por tu cuenta **antes** de abrirla.

---

## Ejercicio T1 — Estadísticas por referencia

### Enunciado

Escribe `void estadisticas(int v[], int n, int *suma, int *min, int *max, float *promedio)` que calcule las cuatro estadísticas en un solo recorrido y las deje en las variables apuntadas. En `main`, declara las variables, llama a la función e imprime los resultados.

### Salida esperada

```
Suma: 100
Minimo: 5
Maximo: 40
Promedio: 20.00
```

### Casos de prueba

| Arreglo | Suma | Min | Max | Promedio |
|---------|------|-----|-----|----------|
| 5 15 40 25 15 | 100 | 5 | 40 | 20.00 |
| 10 10 10 | 30 | 10 | 10 | 10.00 |

### Pistas

- Inicializa `*min` y `*max` con `v[0]` antes del ciclo.
- El promedio necesita un cast: `*promedio = (float) *suma / n;`.
- Recuerda usar `*` cada vez que toques el valor apuntado.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 5

    void estadisticas(int v[], int n, int *suma, int *min, int *max, float *prom) {
        *suma = 0;
        *min = *max = v[0];
        for (int i = 0; i < n; i++) {
            *suma += v[i];
            if (v[i] < *min) *min = v[i];
            if (v[i] > *max) *max = v[i];
        }
        *prom = (float) *suma / n;
    }

    int main() {
        int v[N] = {5, 15, 40, 25, 15};
        int suma, min, max;
        float prom;

        estadisticas(v, N, &suma, &min, &max, &prom);

        printf("Suma: %d\n", suma);
        printf("Minimo: %d\n", min);
        printf("Maximo: %d\n", max);
        printf("Promedio: %.2f\n", prom);
        return 0;
    }
    ```

---

## Ejercicio T2 — Ordenar tres números con apuntadores

### Enunciado

Escribe `void ordenar3(int *a, int *b, int *c)` que reordene los valores de tres variables para que queden en orden ascendente. Apóyate en una función `intercambiar(int *, int *)`.

### Salida esperada

```
Antes:   9 3 6
Despues: 3 6 9
```

### Casos de prueba

| a b c | Resultado |
|-------|-----------|
| 9 3 6 | 3 6 9 |
| 1 2 3 | 1 2 3 |
| 5 5 1 | 1 5 5 |

### Pistas

- Reutiliza `intercambiar`. Si `*a > *b`, intercámbialos; repite las comparaciones necesarias.
- Tres comparaciones bastan: (a,b), (a,c) y (b,c).

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    void intercambiar(int *x, int *y) {
        int t = *x; *x = *y; *y = t;
    }

    void ordenar3(int *a, int *b, int *c) {
        if (*a > *b) intercambiar(a, b);
        if (*a > *c) intercambiar(a, c);
        if (*b > *c) intercambiar(b, c);
    }

    int main() {
        int a = 9, b = 3, c = 6;
        printf("Antes:   %d %d %d\n", a, b, c);
        ordenar3(&a, &b, &c);
        printf("Despues: %d %d %d\n", a, b, c);
        return 0;
    }
    ```

    **Nota:** dentro de `ordenar3`, `a`, `b` y `c` ya son apuntadores, por eso se pasan **sin** `&` a `intercambiar`.

---

## Ejercicio T3 — Conversión de tiempo por referencia

### Enunciado

Escribe `void convertirSegundos(int total, int *horas, int *minutos, int *segundos)` que descomponga una cantidad de segundos en horas, minutos y segundos.

### Salida esperada

```
Total de segundos: 3725
01:02:05
```

### Casos de prueba

| Total | h | m | s |
|-------|---|---|---|
| 3725 | 1 | 2 | 5 |
| 60 | 0 | 1 | 0 |
| 86399 | 23 | 59 | 59 |

### Pistas

- `*horas = total / 3600;` luego `total %= 3600;`.
- `*minutos = total / 60;` y `*segundos = total % 60;`.
- Usa `%02d` para imprimir con dos dígitos.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    void convertirSegundos(int total, int *h, int *m, int *s) {
        *h = total / 3600;
        total %= 3600;
        *m = total / 60;
        *s = total % 60;
    }

    int main() {
        int total, h, m, s;
        printf("Total de segundos: ");
        scanf("%d", &total);

        convertirSegundos(total, &h, &m, &s);
        printf("%02d:%02d:%02d\n", h, m, s);
        return 0;
    }
    ```

---

## Ejercicio T4 — Rotar un arreglo

### Enunciado

Escribe `void rotarDerecha(int v[], int n)` que desplace todos los elementos una posición a la derecha; el último pasa a ser el primero. La función modifica el arreglo original (recuerda: los arreglos se pasan por dirección).

### Salida esperada

```
Original: 1 2 3 4 5
Rotado:   5 1 2 3 4
```

### Casos de prueba

| Entrada | Salida |
|---------|--------|
| 1 2 3 4 5 | 5 1 2 3 4 |
| 10 20 | 20 10 |
| 7 | 7 |

### Pistas

- Guarda el último elemento en una variable temporal.
- Recorre de derecha a izquierda: `v[i] = v[i-1]`.
- Coloca el temporal en `v[0]`.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 5

    void rotarDerecha(int v[], int n) {
        int ultimo = v[n - 1];
        for (int i = n - 1; i > 0; i--) {
            v[i] = v[i - 1];
        }
        v[0] = ultimo;
    }

    int main() {
        int v[N] = {1, 2, 3, 4, 5};
        printf("Original:");
        for (int i = 0; i < N; i++) printf(" %d", v[i]);

        rotarDerecha(v, N);

        printf("\nRotado:  ");
        for (int i = 0; i < N; i++) printf(" %d", v[i]);
        printf("\n");
        return 0;
    }
    ```

---

## Reto opcional — `strlen` con apuntadores puros

### Enunciado

Implementa tu propia versión de `strlen` usando **solo** aritmética de apuntadores (sin índices con corchetes). La firma: `int miStrlen(char *s)`.

### Pistas

- Guarda un apuntador al inicio. Avanza otro apuntador hasta llegar al `'\0'`.
- La longitud es la diferencia entre el apuntador final y el inicial: `fin - inicio`.
- Restar dos apuntadores del mismo arreglo da el número de elementos entre ellos.
