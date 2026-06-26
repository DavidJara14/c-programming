# Ejercicios en Clase — Sesión 6

---

## Ejercicio 1 — Tu primera función

**Objetivo:** Definir una función con retorno y llamarla desde `main`.

### Enunciado

Escribe una función `int cuadrado(int n)` que devuelva el cuadrado de un número. Úsala desde `main` para imprimir los cuadrados del 1 al 5.

### Salida esperada

```
1^2 = 1
2^2 = 4
3^2 = 9
4^2 = 16
5^2 = 25
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int cuadrado(int n) {
        return n * n;
    }

    int main() {
        for (int i = 1; i <= 5; i++) {
            printf("%d^2 = %d\n", i, cuadrado(i));
        }
        return 0;
    }
    ```

---

## Ejercicio 2 — Función con varios parámetros

**Objetivo:** Practicar funciones con más de un argumento y `double`.

### Enunciado

Escribe una función `double areaTriangulo(double base, double altura)` y otra `double areaRectangulo(double base, double altura)`. Pide los datos en `main` y muestra ambas áreas.

### Salida esperada

```
Base: 10
Altura: 4
Area del triangulo: 20.00
Area del rectangulo: 40.00
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    double areaTriangulo(double b, double h) {
        return (b * h) / 2.0;
    }

    double areaRectangulo(double b, double h) {
        return b * h;
    }

    int main() {
        double base, altura;
        printf("Base: ");
        scanf("%lf", &base);
        printf("Altura: ");
        scanf("%lf", &altura);

        printf("Area del triangulo: %.2f\n", areaTriangulo(base, altura));
        printf("Area del rectangulo: %.2f\n", areaRectangulo(base, altura));
        return 0;
    }
    ```

---

## Ejercicio 3 — Función `void` que dibuja

**Objetivo:** Usar funciones sin retorno para encapsular salida.

### Enunciado

Escribe una función `void dibujarRectangulo(int ancho, int alto)` que imprima un rectángulo de asteriscos. Llámala con distintos tamaños.

### Salida esperada

```
*****
*****
*****
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    void dibujarRectangulo(int ancho, int alto) {
        for (int f = 0; f < alto; f++) {
            for (int c = 0; c < ancho; c++) {
                printf("*");
            }
            printf("\n");
        }
    }

    int main() {
        dibujarRectangulo(5, 3);
        return 0;
    }
    ```

---

## Ejercicio 4 — ¿Es primo? como función booleana

**Objetivo:** Escribir una función que devuelva un valor lógico (0 o 1).

### Enunciado

Escribe `int esPrimo(int n)` que devuelva 1 si `n` es primo y 0 si no. Úsala para imprimir todos los primos del 2 al 30.

### Salida esperada

```
Primos del 2 al 30: 2 3 5 7 11 13 17 19 23 29
```

### Pistas

- Una función "booleana" devuelve 1 (verdadero) o 0 (falso).
- Dentro, recorre los divisores de 2 a `n-1`; si alguno divide exacto, devuelve 0 de inmediato.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int esPrimo(int n) {
        if (n < 2) return 0;
        for (int i = 2; i < n; i++) {
            if (n % i == 0) return 0;   // tiene un divisor: no es primo
        }
        return 1;                       // ningun divisor: es primo
    }

    int main() {
        printf("Primos del 2 al 30:");
        for (int i = 2; i <= 30; i++) {
            if (esPrimo(i)) printf(" %d", i);
        }
        printf("\n");
        return 0;
    }
    ```

    **Idea clave:** delegar el "¿es primo?" a una función deja el `main` limpio y legible.

---

## Ejercicio 5 — Paso por valor en acción

**Objetivo:** Comprobar empíricamente que C copia los argumentos.

### Enunciado

Escribe una función `void intentarDuplicar(int x)` que haga `x = x * 2` e imprima `x` dentro. En `main`, declara `a = 10`, llama a la función y muestra `a` antes y después. Observa que `a` no cambia.

### Salida esperada

```
Antes: 10
Dentro de la funcion: 20
Despues: 10
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    void intentarDuplicar(int x) {
        x = x * 2;
        printf("Dentro de la funcion: %d\n", x);
    }

    int main() {
        int a = 10;
        printf("Antes: %d\n", a);
        intentarDuplicar(a);
        printf("Despues: %d\n", a);
        return 0;
    }
    ```

    **Conclusión:** la función modificó su **copia** (`x`), no la variable original (`a`). Para cambiar `a`, necesitaríamos apuntadores (Sesión 7).

---

## Ejercicio 6 — Funciones sobre arreglos

**Objetivo:** Pasar un arreglo y su tamaño a funciones.

### Enunciado

Escribe dos funciones: `int sumaArreglo(int v[], int n)` y `float promedioArreglo(int v[], int n)`. Úsalas para procesar un arreglo de 6 enteros.

### Salida esperada

```
Suma: 60
Promedio: 10.00
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 6

    int sumaArreglo(int v[], int n) {
        int s = 0;
        for (int i = 0; i < n; i++) s += v[i];
        return s;
    }

    float promedioArreglo(int v[], int n) {
        return (float) sumaArreglo(v, n) / n;
    }

    int main() {
        int v[N] = {5, 10, 15, 8, 12, 10};
        printf("Suma: %d\n", sumaArreglo(v, N));
        printf("Promedio: %.2f\n", promedioArreglo(v, N));
        return 0;
    }
    ```

    **Observa:** `promedioArreglo` reutiliza `sumaArreglo`. Componer funciones pequeñas es la esencia del diseño modular.

---

## Ejercicio 7 — Factorial recursivo vs. iterativo

**Objetivo:** Comparar las dos formas de resolver un problema repetitivo.

### Enunciado

Escribe el factorial de dos maneras: `long factorialIterativo(int n)` con un ciclo y `long factorialRecursivo(int n)` con recursión. Verifica que dan el mismo resultado.

### Salida esperada

```
5! iterativo:  120
5! recursivo:  120
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    long factorialIterativo(int n) {
        long r = 1;
        for (int i = 2; i <= n; i++) r *= i;
        return r;
    }

    long factorialRecursivo(int n) {
        if (n <= 1) return 1;                 // caso base
        return n * factorialRecursivo(n - 1); // caso recursivo
    }

    int main() {
        int n = 5;
        printf("%d! iterativo:  %ld\n", n, factorialIterativo(n));
        printf("%d! recursivo:  %ld\n", n, factorialRecursivo(n));
        return 0;
    }
    ```

    **Reflexión:** la versión recursiva es más corta y elegante; la iterativa suele ser más eficiente en memoria. Ambas son válidas.
