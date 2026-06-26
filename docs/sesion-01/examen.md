# Examen — Sesión 1: Introducción y Variables

!!! note "Instrucciones"
    Examen de autoevaluación teórica. Resuélvelo **sin consultar** apuntes ni compilador; contrasta después con las respuestas desplegables. Tiempo sugerido: **40 minutos**. Puntaje total: **100 puntos**.

---

## Parte A — Opción múltiple (40 pts, 5 c/u)

**1.** ¿Cuál es el punto de entrada de todo programa en C?

- a) `start()`
- b) `main()`
- c) `programa()`
- d) `init()`

**2.** ¿Qué directiva se usa para incluir la biblioteca de entrada/salida estándar?

- a) `import stdio.h`
- b) `#include <stdio.h>`
- c) `using stdio`
- d) `#library stdio.h`

**3.** ¿Cuánto vale `7 / 2` en C?

- a) 3.5
- b) 3
- c) 4
- d) Error

**4.** ¿Qué especificador de formato se usa para imprimir un `float`?

- a) `%d`
- b) `%c`
- c) `%f`
- d) `%s`

**5.** ¿Qué operador da el **residuo** de una división entera?

- a) `/`
- b) `%`
- c) `*`
- d) `//`

**6.** ¿Cuál es la forma correcta de leer un entero con `scanf`?

- a) `scanf("%d", x);`
- b) `scanf("%d", &x);`
- c) `scanf("%f", &x);`
- d) `scanf(x);`

**7.** ¿Qué valor tiene `9 % 4`?

- a) 2
- b) 1
- c) 2.25
- d) 0

**8.** ¿Cuál es la forma correcta de declarar una constante?

- a) `const float PI = 3.14;`
- b) `constant PI = 3.14;`
- c) `float const = 3.14;`
- d) `define PI 3.14`

??? success "Respuestas Parte A"
    | # | Resp. | Justificación |
    |---|-------|---------------|
    | 1 | **b** | `main` es donde inicia la ejecución |
    | 2 | **b** | Sintaxis del preprocesador para incluir cabeceras |
    | 3 | **b** | División entera: descarta los decimales |
    | 4 | **c** | `%f` para reales (`float`/`double` con `%lf` al leer) |
    | 5 | **b** | El módulo `%` da el residuo |
    | 6 | **b** | `scanf` necesita la dirección con `&` |
    | 7 | **b** | 9 = 4×2 + 1, residuo 1 |
    | 8 | **a** | `const tipo NOMBRE = valor;` |

---

## Parte B — Verdadero o Falso (20 pts, 4 c/u)

1. En C, `int` y `float` ocupan la misma cantidad de memoria. `____`
2. La división `9.0 / 5.0` da un resultado con decimales. `____`
3. `scanf` puede leer una variable sin el operador `&`. `____`
4. Toda sentencia en C termina con punto y coma. `____`
5. Una variable debe declararse antes de usarse. `____`

??? success "Respuestas Parte B"
    1. **F** — Suelen diferir; un `int` típico ocupa 4 bytes y un `float` también 4, pero representan valores de forma distinta (y `double` ocupa 8). El punto clave: son tipos distintos con rangos y precisión distintos.
    2. **V** — Al menos un operando real fuerza división real: 1.8.
    3. **F** — Necesita la dirección (`&`) para escribir en la variable.
    4. **V** — El `;` delimita cada sentencia.
    5. **V** — C exige declarar el tipo antes del uso.

---

## Parte C — ¿Qué imprime? (20 pts, 10 c/u)

**Código 1**

```c
int a = 5, b = 2;
printf("%d %d\n", a / b, a % b);
```

**Código 2**

```c
float r = 9 / 2;
float s = 9.0 / 2;
printf("%.1f %.1f\n", r, s);
```

??? success "Respuestas Parte C"
    **Código 1 →** `2 1`. División entera 5/2 = 2; residuo 5%2 = 1.

    **Código 2 →** `4.0 4.5`. En `r`, `9/2` se calcula como **enteros** (da 4) y luego se guarda como float (4.0). En `s`, `9.0/2` es división real: 4.5. Es la trampa clásica de la división entera.

---

## Parte D — Detecta el error (10 pts)

Este programa quiere calcular el promedio de dos enteros, pero da un resultado equivocado. Identifica el problema.

```c
#include <stdio.h>
int main() {
    int a = 7, b = 8;
    float promedio = (a + b) / 2;
    printf("Promedio: %.2f\n", promedio);  // imprime 7.00, se esperaba 7.50
    return 0;
}
```

??? success "Respuesta Parte D"
    `(a + b)` es 15 (entero) y `/ 2` también es entero, así que `15 / 2` da **7** por división entera; al guardarlo en `float` queda 7.00. La pérdida de decimales ocurre **antes** de la asignación. Hay que forzar la división real con un cast o un literal real:

    ```c
    float promedio = (a + b) / 2.0;        // o (float)(a + b) / 2
    ```

---

## Parte E — Desarrollo (10 pts)

Explica con tus palabras, en 3–5 líneas, la diferencia entre los operadores `/` y `%`, y da un ejemplo concreto de un problema donde necesitarías ambos.

??? success "Respuesta orientativa Parte E"
    El operador `/` da el **cociente** de una división (cuántas veces cabe un número en otro) y, con operandos enteros, descarta los decimales. El operador `%` da el **residuo** de esa misma división. Juntos descomponen cantidades: por ejemplo, para convertir 125 segundos a minutos y segundos, `125 / 60` da 2 minutos y `125 % 60` da 5 segundos restantes. También aparecen al desglosar dígitos de un número, repartir en grupos o detectar si un número es par (`n % 2 == 0`).
