# Ejercicios en Clase — Sesión 3

---

## Ejercicio 1 — Los tres ciclos, el mismo resultado

**Objetivo:** Comprender que `for`, `while` y `do-while` resuelven el mismo problema con sintaxis distinta.

### Enunciado

Escribe **tres versiones** de un programa que imprima los números del 1 al 10, una con cada tipo de ciclo. Compara las tres y observa dónde va la inicialización, la condición y el avance en cada caso.

### Solución

??? example "Ver solución"
    === "for"
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
    === "while"
        ```c
        #include <stdio.h>

        int main() {
            int i = 1;
            while (i <= 10) {
                printf("%d\n", i);
                i++;
            }
            return 0;
        }
        ```
    === "do-while"
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

---

## Ejercicio 2 — Suma acumulada

**Objetivo:** Aplicar el patrón acumulador.

### Enunciado

Calcula e imprime la suma de los números del 1 al 100 (debe dar 5050). Muestra solo el resultado final.

### Salida esperada

```
La suma del 1 al 100 es: 5050
```

### Pistas

- Necesitas una variable acumuladora inicializada en 0 **antes** del ciclo.
- En cada iteración, suma el valor actual del contador al acumulador.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        int i, suma = 0;

        for (i = 1; i <= 100; i++) {
            suma += i;
        }

        printf("La suma del 1 al 100 es: %d\n", suma);
        return 0;
    }
    ```

---

## Ejercicio 3 — Tabla de multiplicar

**Objetivo:** Usar la variable de control dentro de un cálculo.

### Enunciado

Pide al usuario un número entero y muestra su tabla de multiplicar del 1 al 10, con el formato `n x i = resultado`.

### Salida esperada

```
Ingrese un numero: 7

7 x 1 = 7
7 x 2 = 14
...
7 x 10 = 70
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        int n, i;

        printf("Ingrese un numero: ");
        scanf("%d", &n);

        printf("\n");
        for (i = 1; i <= 10; i++) {
            printf("%d x %d = %d\n", n, i, n * i);
        }
        return 0;
    }
    ```

---

## Ejercicio 4 — Factorial con validación

**Objetivo:** Combinar el patrón producto con validación de entrada y elegir el ciclo adecuado.

### Enunciado

Pide al usuario un número entero `n` y calcula su factorial (`n! = 1 · 2 · 3 · … · n`). Valida que `n` sea mayor o igual a 0. Recuerda que `0! = 1` por definición.

### Salida esperada

```
Ingrese n: 5
5! = 120
```

### Casos de prueba

| n | n! |
|---|-----|
| 0 | 1 |
| 1 | 1 |
| 5 | 120 |
| 7 | 5040 |
| -3 | Error |

### Pistas

- El acumulador del producto debe inicializarse en `1`, no en `0` (si empieza en 0, todo el producto será 0).
- Para `n = 0`, el ciclo no se ejecuta y el factorial queda en 1, que es justo lo correcto.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        int n, i;
        long factorial = 1;

        printf("Ingrese n: ");
        scanf("%d", &n);

        if (n < 0) {
            printf("Error: el factorial no esta definido para negativos.\n");
        } else {
            for (i = 1; i <= n; i++) {
                factorial *= i;
            }
            printf("%d! = %ld\n", n, factorial);
        }
        return 0;
    }
    ```

    **Nota:** se usa `long` porque el factorial crece muy rápido: `13!` ya supera el rango de un `int`.

---

## Ejercicio 5 — Pares e impares en una sola pasada

**Objetivo:** Usar el operador módulo dentro de un ciclo con dos acumuladores.

### Enunciado

Recorre los números del 1 al 100 con un **solo** ciclo y calcula dos sumas: la suma de los pares y la suma de los impares. Muestra ambos resultados.

### Salida esperada

```
Suma de pares: 2550
Suma de impares: 2500
```

### Pistas

- Un número es par si `i % 2 == 0`.
- Necesitas dos acumuladores independientes, ambos inicializados en 0.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        int i, sumaPares = 0, sumaImpares = 0;

        for (i = 1; i <= 100; i++) {
            if (i % 2 == 0) {
                sumaPares += i;
            } else {
                sumaImpares += i;
            }
        }

        printf("Suma de pares: %d\n", sumaPares);
        printf("Suma de impares: %d\n", sumaImpares);
        return 0;
    }
    ```

---

## Ejercicio 6 — Figuras con ciclos anidados

**Objetivo:** Dominar los ciclos anidados controlando filas y columnas.

### Enunciado

Usando ciclos anidados, imprime el siguiente triángulo de asteriscos de altura 5:

```
*
**
***
****
*****
```

Luego, modifícalo para que el usuario elija la altura.

### Pistas

- El ciclo externo controla las filas (de 1 a la altura).
- El ciclo interno imprime tantos asteriscos como el número de fila actual.
- El salto de línea va **después** del ciclo interno, dentro del externo.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        int altura, f, c;

        printf("Altura del triangulo: ");
        scanf("%d", &altura);

        for (f = 1; f <= altura; f++) {     // filas
            for (c = 1; c <= f; c++) {      // columnas: tantas como la fila
                printf("*");
            }
            printf("\n");                   // termina la fila
        }
        return 0;
    }
    ```

    **Punto clave:** la condición del ciclo interno (`c <= f`) depende de la variable del externo (`f`). Por eso cada fila tiene un asterisco más que la anterior.

---

## Ejercicio 7 — Menú repetible con `do-while`

**Objetivo:** Aplicar `do-while` para un menú que se repite hasta que el usuario decide salir.

### Enunciado

Construye un menú que se muestre **al menos una vez** y se repita mientras el usuario lo desee. Las opciones:

1. Imprimir los primeros 10 números naturales.
2. Imprimir los primeros 10 pares.
3. Salir.

Usa un `do-while` para el menú y un ciclo interno para cada opción.

### Pistas

- El `do-while` es ideal aquí porque el menú siempre debe mostrarse una primera vez.
- La condición de repetición del `do-while` depende de la opción elegida (repetir mientras no sea la opción de salir).

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        int opcion, i;

        do {
            printf("\n--- Menu ---\n");
            printf("1. Primeros 10 naturales\n");
            printf("2. Primeros 10 pares\n");
            printf("3. Salir\n");
            printf("Seleccione una opcion: ");
            scanf("%d", &opcion);

            switch (opcion) {
                case 1:
                    for (i = 1; i <= 10; i++) {
                        printf("%d ", i);
                    }
                    printf("\n");
                    break;
                case 2:
                    for (i = 1; i <= 10; i++) {
                        printf("%d ", i * 2);
                    }
                    printf("\n");
                    break;
                case 3:
                    printf("Hasta luego.\n");
                    break;
                default:
                    printf("Opcion no valida.\n");
                    break;
            }
        } while (opcion != 3);

        return 0;
    }
    ```
