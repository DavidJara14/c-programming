# Ejercicios en Clase — Sesión 4

---

## Ejercicio 1 — Llenar y mostrar

**Objetivo:** Dominar el llenado y recorrido básico de un arreglo.

### Enunciado

Pide al usuario 5 números enteros, guárdalos en un arreglo y luego muéstralos en el mismo orden y en orden inverso.

### Salida esperada

```
Ingrese 5 numeros:
[0]: 10
[1]: 20
[2]: 30
[3]: 40
[4]: 50

Orden normal:   10 20 30 40 50
Orden inverso:  50 40 30 20 10
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 5

    int main() {
        int v[N], i;

        printf("Ingrese %d numeros:\n", N);
        for (i = 0; i < N; i++) {
            printf("[%d]: ", i);
            scanf("%d", &v[i]);
        }

        printf("\nOrden normal:  ");
        for (i = 0; i < N; i++) {
            printf("%d ", v[i]);
        }

        printf("\nOrden inverso: ");
        for (i = N - 1; i >= 0; i--) {
            printf("%d ", v[i]);
        }
        printf("\n");
        return 0;
    }
    ```

---

## Ejercicio 2 — Suma, promedio, máximo y mínimo

**Objetivo:** Combinar los patrones de acumulación y comparación en un solo recorrido.

### Enunciado

Dado un arreglo de 8 números reales capturados por el usuario, calcula e imprime la suma, el promedio, el valor máximo y el valor mínimo.

### Salida esperada

```
Suma:     345.50
Promedio: 43.19
Maximo:   98.00
Minimo:   12.50
```

### Pistas

- Inicializa `maximo` y `minimo` con el **primer** elemento, no con 0.
- Usa un cast `(float)` al dividir la suma entre el número de elementos.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 8

    int main() {
        float v[N], suma = 0, maximo, minimo;
        int i;

        for (i = 0; i < N; i++) {
            printf("Elemento %d: ", i);
            scanf("%f", &v[i]);
        }

        maximo = minimo = v[0];
        for (i = 0; i < N; i++) {
            suma += v[i];
            if (v[i] > maximo) maximo = v[i];
            if (v[i] < minimo) minimo = v[i];
        }

        printf("\nSuma:     %.2f\n", suma);
        printf("Promedio: %.2f\n", suma / N);
        printf("Maximo:   %.2f\n", maximo);
        printf("Minimo:   %.2f\n", minimo);
        return 0;
    }
    ```

---

## Ejercicio 3 — Búsqueda de un valor

**Objetivo:** Implementar la búsqueda lineal con una variable de posición.

### Enunciado

Llena un arreglo de 10 enteros y pide al usuario un valor a buscar. Indica si está presente y, de estarlo, en qué posición (índice) aparece por primera vez.

### Salida esperada

```
Valor a buscar: 30
Encontrado en la posicion 4.
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 10

    int main() {
        int v[N], i, buscado, pos = -1;

        for (i = 0; i < N; i++) {
            printf("v[%d]: ", i);
            scanf("%d", &v[i]);
        }

        printf("Valor a buscar: ");
        scanf("%d", &buscado);

        for (i = 0; i < N; i++) {
            if (v[i] == buscado) {
                pos = i;
                break;
            }
        }

        if (pos != -1) {
            printf("Encontrado en la posicion %d.\n", pos);
        } else {
            printf("El valor %d no esta en el arreglo.\n", buscado);
        }
        return 0;
    }
    ```

---

## Ejercicio 4 — Contar pares e impares

**Objetivo:** Usar contadores condicionales durante el recorrido.

### Enunciado

Dado un arreglo de 12 enteros, cuenta cuántos son pares, cuántos impares y cuántos son cero.

### Salida esperada

```
Pares:   5
Impares: 6
Ceros:   1
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 12

    int main() {
        int v[N], i, pares = 0, impares = 0, ceros = 0;

        for (i = 0; i < N; i++) {
            printf("v[%d]: ", i);
            scanf("%d", &v[i]);
        }

        for (i = 0; i < N; i++) {
            if (v[i] == 0)          ceros++;
            else if (v[i] % 2 == 0) pares++;
            else                    impares++;
        }

        printf("\nPares:   %d\n", pares);
        printf("Impares: %d\n", impares);
        printf("Ceros:   %d\n", ceros);
        return 0;
    }
    ```

    **Nota:** el orden importa. Se verifica primero si es cero, porque 0 también cumpliría `v[i] % 2 == 0`.

---

## Ejercicio 5 — Invertir un arreglo en su lugar

**Objetivo:** Manipular el contenido del arreglo intercambiando elementos.

### Enunciado

Invierte el contenido de un arreglo **sin usar un segundo arreglo**. Intercambia el primer elemento con el último, el segundo con el penúltimo, y así sucesivamente.

### Salida esperada

```
Original:  1 2 3 4 5 6
Invertido: 6 5 4 3 2 1
```

### Pistas

- Usa dos índices: uno que avanza desde el inicio (`i`) y otro que retrocede desde el final (`j`).
- El intercambio necesita una variable temporal.
- Detente cuando los índices se crucen (`i < j`).

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 6

    int main() {
        int v[N] = {1, 2, 3, 4, 5, 6};
        int i, j, temp;

        printf("Original:  ");
        for (i = 0; i < N; i++) printf("%d ", v[i]);

        for (i = 0, j = N - 1; i < j; i++, j--) {
            temp = v[i];
            v[i] = v[j];
            v[j] = temp;
        }

        printf("\nInvertido: ");
        for (i = 0; i < N; i++) printf("%d ", v[i]);
        printf("\n");
        return 0;
    }
    ```

---

## Ejercicio 6 — Suma de una matriz por filas y columnas

**Objetivo:** Recorrer una matriz con ciclos anidados y acumular por dimensión.

### Enunciado

Llena una matriz de 3×3 e imprime la suma de cada fila y la suma de cada columna.

### Salida esperada

```
Suma fila 0: 6
Suma fila 1: 15
Suma fila 2: 24

Suma columna 0: 12
Suma columna 1: 15
Suma columna 2: 18
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define F 3
    #define C 3

    int main() {
        int m[F][C], f, c, suma;

        for (f = 0; f < F; f++)
            for (c = 0; c < C; c++) {
                printf("m[%d][%d]: ", f, c);
                scanf("%d", &m[f][c]);
            }

        for (f = 0; f < F; f++) {
            suma = 0;
            for (c = 0; c < C; c++) suma += m[f][c];
            printf("Suma fila %d: %d\n", f, suma);
        }

        for (c = 0; c < C; c++) {
            suma = 0;
            for (f = 0; f < F; f++) suma += m[f][c];
            printf("Suma columna %d: %d\n", c, suma);
        }
        return 0;
    }
    ```

    **Punto clave:** para sumar por columnas, el ciclo externo recorre las columnas y el interno las filas — al revés que para sumar por filas.

---

## Ejercicio 7 — Histograma de frecuencias

**Objetivo:** Usar el valor de un dato como índice de otro arreglo (arreglo de conteo).

### Enunciado

Pide 15 calificaciones del 1 al 5 (encuestas de satisfacción) y muestra cuántas veces apareció cada calificación, dibujando una barra de asteriscos.

### Salida esperada

```
1: ** (2)
2: * (1)
3: **** (4)
4: ***** (5)
5: *** (3)
```

### Pistas

- Crea un arreglo `conteo[6]` inicializado en 0 (usarás los índices 1 a 5).
- Por cada calificación leída, incrementa `conteo[calificacion]`.
- Para dibujar la barra, imprime tantos asteriscos como el valor del conteo.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define DATOS 15

    int main() {
        int conteo[6] = {0};
        int i, j, cal;

        for (i = 0; i < DATOS; i++) {
            printf("Calificacion %d (1-5): ", i + 1);
            scanf("%d", &cal);
            if (cal >= 1 && cal <= 5) {
                conteo[cal]++;
            }
        }

        printf("\n");
        for (i = 1; i <= 5; i++) {
            printf("%d: ", i);
            for (j = 0; j < conteo[i]; j++) printf("*");
            printf(" (%d)\n", conteo[i]);
        }
        return 0;
    }
    ```

    **Idea central:** el "arreglo de conteo" usa el **dato** como **índice**. Es una técnica fundamental que reaparece en ordenamiento, estadística y procesamiento de texto.
