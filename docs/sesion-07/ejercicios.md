# Ejercicios en Clase — Sesión 7

---

## Ejercicio 1 — Dirección y contenido

**Objetivo:** Distinguir entre el valor de una variable, su dirección y el contenido apuntado.

### Enunciado

Declara una variable `int numero = 42;` y un apuntador que la apunte. Imprime: el valor de `numero`, su dirección, el valor del apuntador y el valor desreferenciado. Observa que la dirección de `numero` y el valor del apuntador coinciden.

### Salida esperada

```
numero       = 42
&numero      = 0x7ffd...
p (direccion)= 0x7ffd...
*p (valor)   = 42
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        int numero = 42;
        int *p = &numero;

        printf("numero       = %d\n", numero);
        printf("&numero      = %p\n", (void *) &numero);
        printf("p (direccion)= %p\n", (void *) p);
        printf("*p (valor)   = %d\n", *p);
        return 0;
    }
    ```

    **Nota:** `p` y `&numero` imprimen la misma dirección porque `p` apunta a `numero`.

---

## Ejercicio 2 — Modificar a través del apuntador

**Objetivo:** Cambiar el valor de una variable usando su apuntador.

### Enunciado

Declara `int x = 10;`. Usando **solo** un apuntador (sin nombrar `x` directamente), duplica su valor. Imprime `x` antes y después.

### Salida esperada

```
Antes: 10
Despues: 20
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        int x = 10;
        int *p = &x;

        printf("Antes: %d\n", x);
        *p = *p * 2;          // modifica x a traves del apuntador
        printf("Despues: %d\n", x);
        return 0;
    }
    ```

---

## Ejercicio 3 — Intercambio con paso por referencia

**Objetivo:** Implementar la función `intercambiar` que sí modifica los originales.

### Enunciado

Escribe `void intercambiar(int *a, int *b)` y demuéstrala intercambiando dos variables en `main`.

### Salida esperada

```
Antes:   x=3, y=7
Despues: x=7, y=3
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    void intercambiar(int *a, int *b) {
        int temp = *a;
        *a = *b;
        *b = temp;
    }

    int main() {
        int x = 3, y = 7;
        printf("Antes:   x=%d, y=%d\n", x, y);
        intercambiar(&x, &y);
        printf("Despues: x=%d, y=%d\n", x, y);
        return 0;
    }
    ```

    **Clave:** se pasan las direcciones (`&x`, `&y`) y la función opera sobre los contenidos (`*a`, `*b`).

---

## Ejercicio 4 — Devolver dos valores

**Objetivo:** Usar apuntadores para que una función entregue más de un resultado.

### Enunciado

Escribe `void minMax(int v[], int n, int *min, int *max)` que recorra un arreglo y deje el mínimo y el máximo en las variables apuntadas.

### Salida esperada

```
Minimo: 2
Maximo: 19
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 6

    void minMax(int v[], int n, int *min, int *max) {
        *min = *max = v[0];
        for (int i = 1; i < n; i++) {
            if (v[i] < *min) *min = v[i];
            if (v[i] > *max) *max = v[i];
        }
    }

    int main() {
        int v[N] = {7, 2, 19, 5, 11, 8};
        int menor, mayor;
        minMax(v, N, &menor, &mayor);
        printf("Minimo: %d\n", menor);
        printf("Maximo: %d\n", mayor);
        return 0;
    }
    ```

---

## Ejercicio 5 — Recorrer un arreglo con aritmética de apuntadores

**Objetivo:** Comprobar que `*(v+i)` equivale a `v[i]`.

### Enunciado

Recorre un arreglo de 5 enteros e imprímelo de dos formas: con la notación de corchetes `v[i]` y con la notación de apuntadores `*(v + i)`. Verifica que el resultado es idéntico.

### Salida esperada

```
Con corchetes:   10 20 30 40 50
Con apuntadores: 10 20 30 40 50
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 5

    int main() {
        int v[N] = {10, 20, 30, 40, 50};
        int i;

        printf("Con corchetes:  ");
        for (i = 0; i < N; i++) printf(" %d", v[i]);

        printf("\nCon apuntadores:");
        for (i = 0; i < N; i++) printf(" %d", *(v + i));
        printf("\n");
        return 0;
    }
    ```

---

## Ejercicio 6 — Función que normaliza con apuntador

**Objetivo:** Modificar un arreglo desde una función mediante su dirección.

### Enunciado

Escribe `void incrementarTodos(int *v, int n, int delta)` que sume `delta` a cada elemento del arreglo. Como el arreglo se pasa por su dirección, los cambios deben verse reflejados en `main`.

### Salida esperada

```
Original: 1 2 3 4 5
+10:      11 12 13 14 15
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 5

    void incrementarTodos(int *v, int n, int delta) {
        for (int i = 0; i < n; i++) {
            v[i] += delta;        // o: *(v + i) += delta;
        }
    }

    int main() {
        int v[N] = {1, 2, 3, 4, 5};
        printf("Original:");
        for (int i = 0; i < N; i++) printf(" %d", v[i]);

        incrementarTodos(v, N, 10);

        printf("\n+10:     ");
        for (int i = 0; i < N; i++) printf(" %d", v[i]);
        printf("\n");
        return 0;
    }
    ```

    **Observa:** aunque el parámetro es `int *v`, dentro se puede usar `v[i]` con total naturalidad. Arreglo y apuntador son intercambiables como parámetros.

---

## Ejercicio 7 — Contador a través de apuntador

**Objetivo:** Acumular en una variable de `main` desde una función.

### Enunciado

Escribe `void contarPares(int v[], int n, int *contador)` que recorra el arreglo y deje en `*contador` cuántos números pares encontró. El contador vive en `main`.

### Salida esperada

```
Arreglo: 4 7 2 9 6 1 8
Pares encontrados: 4
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 7

    void contarPares(int v[], int n, int *contador) {
        *contador = 0;
        for (int i = 0; i < n; i++) {
            if (v[i] % 2 == 0) (*contador)++;
        }
    }

    int main() {
        int v[N] = {4, 7, 2, 9, 6, 1, 8};
        int pares;
        contarPares(v, N, &pares);
        printf("Pares encontrados: %d\n", pares);
        return 0;
    }
    ```

    **Atención a `(*contador)++`:** los paréntesis son obligatorios. Sin ellos, `*contador++` incrementaría el **apuntador**, no el valor apuntado.
