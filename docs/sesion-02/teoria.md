# Sesión 2 — Condicionales

> *En 1999, el Mars Climate Orbiter de la NASA se desintegró al entrar en la atmósfera de Marte. La causa: un módulo de software usaba libras-fuerza y otro usaba newtons. No había ninguna validación condicional que verificara la coherencia de las unidades. Un simple `if` habría salvado un proyecto de 327 millones de dólares.*

---

## Palabras reservadas de esta sesión

| Keyword | Uso | Significado |
|---------|-----|-------------|
| `if` | `if (condicion) { ... }` | Ejecuta un bloque solo si la condición es verdadera |
| `else` | `else { ... }` | Ejecuta un bloque cuando la condición del `if` es falsa |
| `switch` | `switch (variable) { ... }` | Selección múltiple basada en el valor de una expresión entera |
| `case` | `case valor:` | Define una opción dentro de un `switch` |
| `default` | `default:` | Opción que se ejecuta cuando ningún `case` coincide |
| `break` | `break;` | Sale del `switch` (o de un ciclo). Sin `break`, la ejecución cae al siguiente `case` |

---

## Funciones y operadores de esta sesión

### Operadores relacionales

Comparan dos valores y devuelven 1 (verdadero) o 0 (falso).

| Operador | Significado | Ejemplo | Resultado |
|----------|-------------|---------|-----------|
| `==` | Igual a | `5 == 5` | 1 |
| `!=` | Diferente de | `5 != 3` | 1 |
| `<` | Menor que | `3 < 7` | 1 |
| `>` | Mayor que | `3 > 7` | 0 |
| `<=` | Menor o igual | `5 <= 5` | 1 |
| `>=` | Mayor o igual | `4 >= 9` | 0 |

!!! danger "Error frecuente: `=` vs `==`"
    El operador `=` es **asignación**. El operador `==` es **comparación**. Confundirlos es uno de los errores más peligrosos en C porque no siempre genera error de compilación:

    ```c
    if (x = 5)    // INCORRECTO: asigna 5 a x, siempre verdadero (5 != 0)
    if (x == 5)   // CORRECTO: compara x con 5
    ```

### Operadores lógicos

Combinan múltiples condiciones.

| Operador | Nombre | Significado | Ejemplo |
|----------|--------|-------------|---------|
| `&&` | AND | Verdadero si **ambas** condiciones son verdaderas | `(x > 0 && x < 100)` |
| `\|\|` | OR | Verdadero si **al menos una** condición es verdadera | `(x == 0 \|\| x == 1)` |
| `!` | NOT | Invierte el valor lógico | `!(x > 5)` equivale a `x <= 5` |

### Tabla de verdad

| A | B | A && B | A \|\| B | !A |
|---|---|--------|----------|-----|
| 1 | 1 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 | 1 |
| 0 | 0 | 0 | 0 | 1 |

### Librería `stdlib.h` (introducción)

| Función | Firma | Descripción |
|---------|-------|-------------|
| `system` | `int system(const char *command)` | Ejecuta un comando del sistema operativo |
| `abs` | `int abs(int x)` | Valor absoluto de un entero |
| `exit` | `void exit(int status)` | Termina el programa inmediatamente |

```c
#include <stdlib.h>
system("cls");   // limpia la consola en Windows
system("clear"); // limpia la consola en Linux/macOS
```

---

## 1. Estructura `if` — `else`

### Forma básica

```c
if (condicion) {
    // se ejecuta si la condición es verdadera (distinta de 0)
}
```

### Con alternativa

```c
if (condicion) {
    // bloque verdadero
} else {
    // bloque falso
}
```

### Cadena `if` — `else if` — `else`

```c
if (condicion1) {
    // se evalúa primero
} else if (condicion2) {
    // se evalúa solo si condicion1 fue falsa
} else if (condicion3) {
    // se evalúa solo si las anteriores fueron falsas
} else {
    // se ejecuta si ninguna condición fue verdadera
}
```

!!! note "Evaluación en cortocircuito"
    C evalúa las condiciones de izquierda a derecha y se detiene en cuanto una es suficiente para determinar el resultado:

    - `&&` — si la primera es falsa, no evalúa la segunda (ya sabe que el AND es falso).
    - `||` — si la primera es verdadera, no evalúa la segunda (ya sabe que el OR es verdadero).

    Esto tiene implicaciones prácticas: puedes escribir `if (b != 0 && a/b > 10)` sin riesgo de división entre cero, porque si `b == 0`, la segunda condición nunca se evalúa.

---

## 2. Validación de entrada

Una de las aplicaciones más importantes de los condicionales es verificar que los datos del usuario sean válidos **antes** de operar con ellos.

```c
#include <stdio.h>

int main() {
    float dividendo, divisor;

    printf("Ingrese el dividendo: ");
    scanf("%f", &dividendo);
    printf("Ingrese el divisor: ");
    scanf("%f", &divisor);

    if (divisor != 0) {
        printf("Resultado: %.4f\n", dividendo / divisor);
    } else {
        printf("Error: division entre cero no permitida.\n");
    }

    return 0;
}
```

En un programa serio, **nunca** se opera con datos sin validar. Si el usuario puede introducir un valor que rompe tu programa, es tu responsabilidad como programador preverlo.

---

## 3. Estructura `switch`

`switch` evalúa una expresión **entera** (o `char`, que internamente es un entero) y salta al `case` que coincida.

```c
switch (expresion) {
    case valor1:
        // instrucciones
        break;
    case valor2:
        // instrucciones
        break;
    default:
        // se ejecuta si ningún case coincide
        break;
}
```

### Reglas fundamentales

1. La expresión del `switch` debe ser de tipo **entero o carácter**. No funciona con `float` ni con cadenas.
2. Cada `case` debe terminar con `break;`. Sin él, la ejecución **cae** al siguiente `case` (*fall-through*) — esto es intencional en C pero casi siempre es un error.
3. `default` es opcional pero recomendable. Un `switch` sin `default` ignora silenciosamente los valores no contemplados.

### Ejemplo: Menú de operaciones

```c
#include <stdio.h>

int main() {
    int opcion;
    float a, b;

    printf("1. Suma\n");
    printf("2. Resta\n");
    printf("3. Multiplicacion\n");
    printf("Seleccione una opcion: ");
    scanf("%d", &opcion);

    printf("Ingrese dos numeros: ");
    scanf("%f %f", &a, &b);

    switch (opcion) {
        case 1:
            printf("%.2f + %.2f = %.2f\n", a, b, a + b);
            break;
        case 2:
            printf("%.2f - %.2f = %.2f\n", a, b, a - b);
            break;
        case 3:
            printf("%.2f * %.2f = %.2f\n", a, b, a * b);
            break;
        default:
            printf("Opcion no valida.\n");
            break;
    }

    return 0;
}
```

---

## 4. Operador ternario

El operador ternario es una forma compacta de un `if-else` que produce un valor:

```c
resultado = (condicion) ? valor_si_verdadero : valor_si_falso;
```

```c
int x = 10, y = 20;
int mayor = (x > y) ? x : y;   // mayor = 20
```

Es útil para asignaciones simples. Para lógica compleja, usa `if-else` — el ternario pierde legibilidad rápidamente cuando se anida.

---

## 5. Errores comunes con condicionales

### Punto y coma después del `if`

```c
if (x > 0);              // INCORRECTO: el ; termina el if aquí
    printf("Positivo");   // esta línea se ejecuta SIEMPRE
```

### Llaves omitidas con múltiples sentencias

```c
if (x > 0)
    printf("Positivo\n");
    printf("El valor es %d\n", x);  // se ejecuta SIEMPRE — no pertenece al if
```

La recomendación profesional es **siempre usar llaves**, incluso cuando el bloque tiene una sola sentencia:

```c
if (x > 0) {
    printf("Positivo\n");
}
```

### Comparar `float` con `==`

Los números de punto flotante tienen errores de representación. Comparar con `==` puede fallar:

```c
float x = 0.1 + 0.2;
if (x == 0.3) {           // puede ser FALSO
    printf("Iguales\n");
}
```

La solución es comparar con una tolerancia:

```c
#include <math.h>
if (fabs(x - 0.3) < 0.0001) {
    printf("Iguales (con tolerancia)\n");
}
```

---

## 6. Verdadero y falso en C

C no tiene un tipo booleano nativo en C89. En C:

- **Falso:** el valor `0` (cero).
- **Verdadero:** cualquier valor **distinto de cero**.

```c
int x = 42;
if (x) {
    printf("Verdadero\n");   // se ejecuta porque x != 0
}

int y = 0;
if (y) {
    printf("Nunca se imprime\n");   // no se ejecuta porque y == 0
}
```

Esto explica por qué `if (x = 5)` siempre es verdadero: la asignación devuelve `5`, que es distinto de cero.

!!! note "C99 y `stdbool.h`"
    A partir del estándar C99, puedes incluir `<stdbool.h>` para usar `bool`, `true` y `false`. Internamente, `true` es `1` y `false` es `0`.
    ```c
    #include <stdbool.h>
    bool esPar = (n % 2 == 0);
    ```
