# Tarea — Sesión 6

!!! note "Instrucciones de entrega"
    Un archivo `.c` por ejercicio. Declara los **prototipos** al inicio, `main` después y las definiciones al final. Cada función debe hacer **una sola cosa** y tener un nombre que la describa.

!!! success "Soluciones disponibles"
    Cada ejercicio incluye su solución en un bloque desplegable. Intenta resolverlo por tu cuenta **antes** de abrirla.

---

## Ejercicio T1 — Calculadora modular

### Enunciado

Construye una calculadora con un menú (`do-while`) donde cada operación sea una **función independiente**: `suma`, `resta`, `multiplica`, `divide`. La función `divide` debe validar la división entre cero y devolver un código de error.

### Salida esperada

```
--- Calculadora ---
1. Sumar  2. Restar  3. Multiplicar  4. Dividir  5. Salir
Opcion: 4
a y b: 10 0
Error: division entre cero.
```

### Pistas

- Cada función recibe dos `double` y devuelve un `double`.
- Para `divide`, puedes devolver un valor especial o usar un parámetro/bandera de error; lo más simple es validar antes de llamarla.
- El menú repite con `do-while` hasta elegir Salir.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    double suma(double a, double b)        { return a + b; }
    double resta(double a, double b)       { return a - b; }
    double multiplica(double a, double b)  { return a * b; }
    double divide(double a, double b)      { return a / b; }

    int main() {
        int opcion;
        double a, b;

        do {
            printf("\n--- Calculadora ---\n");
            printf("1. Sumar  2. Restar  3. Multiplicar  4. Dividir  5. Salir\n");
            printf("Opcion: ");
            scanf("%d", &opcion);

            if (opcion >= 1 && opcion <= 4) {
                printf("a y b: ");
                scanf("%lf %lf", &a, &b);
            }

            switch (opcion) {
                case 1: printf("= %.2f\n", suma(a, b)); break;
                case 2: printf("= %.2f\n", resta(a, b)); break;
                case 3: printf("= %.2f\n", multiplica(a, b)); break;
                case 4:
                    if (b == 0) printf("Error: division entre cero.\n");
                    else        printf("= %.2f\n", divide(a, b));
                    break;
                case 5: printf("Hasta luego.\n"); break;
                default: printf("Opcion invalida.\n");
            }
        } while (opcion != 5);
        return 0;
    }
    ```

---

## Ejercicio T2 — Biblioteca de funciones numéricas

### Enunciado

Escribe estas funciones y pruébalas desde `main`:

- `int mcd(int a, int b)` — máximo común divisor (algoritmo de Euclides).
- `int esPerfecto(int n)` — devuelve 1 si `n` es número perfecto (igual a la suma de sus divisores propios, como 6 = 1+2+3).
- `int sumaDigitos(int n)` — suma de los dígitos de `n`.

### Salida esperada

```
mcd(48, 36) = 12
6 es perfecto? 1
sumaDigitos(1234) = 10
```

### Casos de prueba

| Llamada | Resultado |
|---------|-----------|
| `mcd(48, 36)` | 12 |
| `mcd(17, 5)` | 1 |
| `esPerfecto(6)` | 1 |
| `esPerfecto(28)` | 1 |
| `esPerfecto(10)` | 0 |
| `sumaDigitos(999)` | 27 |

### Pistas

- Euclides: `mcd(a, b) = mcd(b, a % b)` hasta que `b` sea 0; entonces el resultado es `a`.
- Para `esPerfecto`, suma los divisores de 1 a `n/2` y compara con `n`.
- `sumaDigitos`: extrae el último dígito con `% 10` y elimínalo con `/ 10`.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int mcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    int esPerfecto(int n) {
        int suma = 0;
        for (int i = 1; i <= n / 2; i++) {
            if (n % i == 0) suma += i;
        }
        return suma == n;
    }

    int sumaDigitos(int n) {
        int suma = 0;
        if (n < 0) n = -n;
        while (n > 0) {
            suma += n % 10;
            n /= 10;
        }
        return suma;
    }

    int main() {
        printf("mcd(48, 36) = %d\n", mcd(48, 36));
        printf("6 es perfecto? %d\n", esPerfecto(6));
        printf("sumaDigitos(1234) = %d\n", sumaDigitos(1234));
        return 0;
    }
    ```

---

## Ejercicio T3 — Potencia recursiva

### Enunciado

Escribe `long potencia(int base, int exp)` de forma **recursiva** (sin usar `pow`). Define correctamente el caso base (`exp == 0` devuelve 1).

### Salida esperada

```
2^10 = 1024
5^3 = 125
7^0 = 1
```

### Casos de prueba

| base | exp | resultado |
|------|-----|-----------|
| 2 | 10 | 1024 |
| 5 | 3 | 125 |
| 7 | 0 | 1 |
| 3 | 4 | 81 |

### Pistas

- Caso base: cualquier número elevado a 0 es 1.
- Caso recursivo: `base^exp = base * base^(exp-1)`.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    long potencia(int base, int exp) {
        if (exp == 0) return 1;               // caso base
        return base * potencia(base, exp - 1); // caso recursivo
    }

    int main() {
        printf("2^10 = %ld\n", potencia(2, 10));
        printf("5^3 = %ld\n", potencia(5, 3));
        printf("7^0 = %ld\n", potencia(7, 0));
        return 0;
    }
    ```

---

## Ejercicio T4 — Estadística con funciones sobre arreglos

### Enunciado

Escribe funciones que reciban un arreglo de `double` y su tamaño:

- `double maximo(double v[], int n)`
- `double minimo(double v[], int n)`
- `double media(double v[], int n)`
- `int contarMayoresQue(double v[], int n, double umbral)`

Pruébalas con un arreglo de 7 temperaturas.

### Salida esperada

```
Maximo: 31.50
Minimo: 18.00
Media: 24.64
Dias sobre 25 grados: 3
```

### Pistas

- Reutiliza el patrón máximo/mínimo inicializando con `v[0]`.
- `contarMayoresQue` recorre y cuenta los que superan el umbral.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 7

    double maximo(double v[], int n) {
        double m = v[0];
        for (int i = 1; i < n; i++) if (v[i] > m) m = v[i];
        return m;
    }

    double minimo(double v[], int n) {
        double m = v[0];
        for (int i = 1; i < n; i++) if (v[i] < m) m = v[i];
        return m;
    }

    double media(double v[], int n) {
        double s = 0;
        for (int i = 0; i < n; i++) s += v[i];
        return s / n;
    }

    int contarMayoresQue(double v[], int n, double umbral) {
        int c = 0;
        for (int i = 0; i < n; i++) if (v[i] > umbral) c++;
        return c;
    }

    int main() {
        double t[N] = {22.0, 25.5, 18.0, 31.5, 27.0, 23.0, 25.5};
        printf("Maximo: %.2f\n", maximo(t, N));
        printf("Minimo: %.2f\n", minimo(t, N));
        printf("Media: %.2f\n", media(t, N));
        printf("Dias sobre 25 grados: %d\n", contarMayoresQue(t, N, 25.0));
        return 0;
    }
    ```

---

## Reto opcional — Serie de Fibonacci recursiva con contador de llamadas

### Enunciado

Escribe `int fib(int n)` recursivo. Usa una variable **global** `int llamadas` que cuente cuántas veces se invoca `fib`. Imprime `fib(10)` y el total de llamadas. Reflexiona sobre por qué el número es tan grande.

### Pistas

- `fib(0)=0`, `fib(1)=1`, `fib(n)=fib(n-1)+fib(n-2)`.
- Incrementa `llamadas` al inicio de cada invocación.
- Verás que `fib(10)` genera **177** llamadas: la recursión "ingenua" de Fibonacci recalcula los mismos valores una y otra vez. Es un ejemplo clásico de por qué la elegancia recursiva a veces sale cara.
