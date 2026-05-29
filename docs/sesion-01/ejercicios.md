# Ejercicios en Clase — Sesión 1

---

## Ejercicio 1 — Suma de dos constantes

**Objetivo:** Escribir el primer programa que realiza una operación matemática y muestra el resultado.

### Enunciado

Escribe un programa que sume dos valores constantes enteros (A = 21, B = 59) y muestre el resultado en pantalla con el formato: `21 + 59 = 80`.

### Código base — escríbelo y analiza cada línea

```c
#include <stdio.h>

int main() {
    int A, B, C;

    A = 21;
    B = 59;
    C = A + B;

    printf("\n\t%d + %d = %d\n", A, B, C);

    return 0;
}
```

### Salida esperada

```
        21 + 59 = 80
```

### Preguntas de análisis

1. ¿Qué hace el `\t` dentro del `printf`?
2. ¿Puedes cambiar A y B por otros valores sin tocar el `printf`? ¿El resultado se actualiza automáticamente?
3. ¿Qué sucede si cambias `int` por `float` y usas `%f` en lugar de `%d`?

---

## Ejercicio 2 — Suma de dos variables capturadas

**Objetivo:** Usar `scanf` para capturar datos del usuario y operar con ellos.

### Enunciado

Escribe un programa que le pida al usuario dos números reales, los sume y muestre el resultado con 2 decimales.

### Estructura del programa (completa los huecos)

```c
#include <stdio.h>

int main() {
    float a, b, c;

    printf("\n\t--- Programa de suma ---");
    printf("\n\tIngrese el valor 1: ");
    scanf(__________, &a);                    // (1) ¿qué especificador va aquí?

    printf("\n\tIngrese el valor 2: ");
    scanf("%f", __________);                  // (2) ¿qué va después de la coma?

    c = a + b;

    printf("\n\t%.2f + %.2f = __________\n", a, b, c);   // (3) completa el formato
}
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        float a, b, c;

        printf("\n\t--- Programa de suma ---");
        printf("\n\tIngrese el valor 1: ");
        scanf("%f", &a);

        printf("\n\tIngrese el valor 2: ");
        scanf("%f", &b);

        c = a + b;

        printf("\n\t%.2f + %.2f = %.2f\n", a, b, c);

        return 0;
    }
    ```

### Casos de prueba

| a | b | Resultado esperado |
|---|---|--------------------|
| 10.5 | 4.3 | 14.80 |
| -3.0 | 3.0 | 0.00 |
| 1000.0 | 0.001 | 1000.00 |

---

## Ejercicio 3 — Potencias de un número

**Objetivo:** Usar la librería `math.h` y la función `pow`.

### Enunciado

Escribe un programa que pida al usuario un número real `X`, calcule su cuadrado (X²) y su cubo (X³) usando `pow`, y muestre los resultados con 2 decimales.

### Pistas

- Necesitas incluir `<math.h>`
- La función es: `pow(base, exponente)` — ambos parámetros son `double`
- Con `scanf` y `double`, el especificador es `%lf`

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <math.h>

    int main() {
        double X;

        printf("\n\t--- Cuadrado y cubo de X ---");
        printf("\n\tIngrese el valor de X: ");
        scanf("%lf", &X);

        printf("\n\tX^2 = %.2f", pow(X, 2));
        printf("\n\tX^3 = %.2f\n", pow(X, 3));

        return 0;
    }
    ```

!!! note "Nota sobre `%lf` vs `%f`"
    Al usar `scanf` con `double`, el especificador correcto es `%lf`. Con `printf`, tanto `%f` como `%lf` funcionan para `double`. En `scanf`, usar `%f` con una variable `double` produce un error silencioso.

---

## Ejercicio 4 — Detecta y corrige los errores

**Objetivo:** Identificar errores sintácticos y lógicos en código C ajeno.

### Enunciado

El siguiente código tiene **6 errores**. Identifícalos, clasifícalos como sintácticos o lógicos, y escribe la versión corregida.

```c
#include <stdio>

int main()
{
    float altura, area, base;

    printf( "\nIntroduzca base:\t" );
    scanf( "%f", base );

    printf( "\nIntroduzca altura:\t" )
    scanf( "%f", &altura );

    area <- base * altura / 2.0;

    printf( "\nEl area del triangulo es: %d\n", area );

    return 0
}
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        float altura, area, base;

        printf("\nIntroduzca base:\t");
        scanf("%f", &base);

        printf("\nIntroduzca altura:\t");
        scanf("%f", &altura);

        area = base * altura / 2.0;

        printf("\nEl area del triangulo es: %f\n", area);

        return 0;
    }
    ```

    | # | Error | Tipo | Corrección |
    |---|-------|------|------------|
    | 1 | `<stdio>` | Sintáctico | `<stdio.h>` — extensión `.h` obligatoria |
    | 2 | `scanf("%f", base)` | Sintáctico | `scanf("%f", &base)` — falta el operador `&` |
    | 3 | `printf(...)` sin `;` | Sintáctico | Agregar `;` al final |
    | 4 | `area <- ...` | Sintáctico/lógico | `area = ...` — el operador `<-` no existe en C |
    | 5 | `%d` con `float` | Lógico | `%f` — `%d` es para `int` |
    | 6 | `return 0` sin `;` | Sintáctico | `return 0;` |

---

## Ejercicio 5 — Función matemática z = x² + y³

**Objetivo:** Combinar captura de datos, operaciones con `pow` y salida formateada.

### Enunciado

Escribe un programa que solicite al usuario los valores de `x` e `y` (números reales), calcule **z = x² + y³** y muestre el resultado con 4 decimales, indicando la operación completa.

### Salida esperada

```
--- Calculadora: z = x^2 + y^3 ---
Ingrese x: 3
Ingrese y: 2

z = 3.00^2 + 2.00^3 = 17.0000
```

### Casos de prueba

| x | y | z esperada |
|---|---|-----------|
| 3 | 2 | 17.0000 |
| 0 | 5 | 125.0000 |
| -2 | 3 | 31.0000 |
| 1.5 | 2.5 | 17.8125 |

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <math.h>

    int main() {
        double x, y, z;

        printf("\n\t--- Calculadora: z = x^2 + y^3 ---");
        printf("\n\tIngrese x: ");
        scanf("%lf", &x);
        printf("\tIngrese y: ");
        scanf("%lf", &y);

        z = pow(x, 2) + pow(y, 3);

        printf("\n\tz = %.2f^2 + %.2f^3 = %.4f\n", x, y, z);

        return 0;
    }
    ```

---

## Ejercicio 6 — Volumen de figuras geométricas

**Objetivo:** Calcular múltiples fórmulas en un solo programa usando `#define` para constantes.

### Enunciado

Escribe **un solo programa** que calcule el volumen de las siguientes tres figuras, pidiendo los datos necesarios al usuario:

- **Esfera:** V = (4/3) · π · r³
- **Cilindro:** V = π · r² · h
- **Cono:** V = (π · r² · h) / 3

Usa `#define PI 3.14159`. Muestra los resultados con 3 decimales.

### Salida esperada

```
=== Volumenes geometricos ===

-- Esfera --
Radio: 5
Volumen de la esfera: 523.599

-- Cilindro --
Radio: 3
Altura: 10
Volumen del cilindro: 282.743

-- Cono --
Radio: 4
Altura: 6
Volumen del cono: 100.531
```

### Pistas

- La expresión `4/3` en C con enteros da `1` (división entera). Escríbela como `4.0/3.0`.
- Declara variables separadas para el radio y la altura de cada figura, o reutilízalas con cuidado.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <math.h>
    #define PI 3.14159

    int main() {
        double r, h, vol;

        printf("\n\t=== Volumenes geometricos ===\n");

        /* Esfera */
        printf("\n\t-- Esfera --");
        printf("\n\tRadio: ");
        scanf("%lf", &r);
        vol = (4.0 / 3.0) * PI * pow(r, 3);
        printf("\tVolumen de la esfera: %.3f\n", vol);

        /* Cilindro */
        printf("\n\t-- Cilindro --");
        printf("\n\tRadio: ");
        scanf("%lf", &r);
        printf("\tAltura: ");
        scanf("%lf", &h);
        vol = PI * pow(r, 2) * h;
        printf("\tVolumen del cilindro: %.3f\n", vol);

        /* Cono */
        printf("\n\t-- Cono --");
        printf("\n\tRadio: ");
        scanf("%lf", &r);
        printf("\tAltura: ");
        scanf("%lf", &h);
        vol = (PI * pow(r, 2) * h) / 3.0;
        printf("\tVolumen del cono: %.3f\n", vol);

        return 0;
    }
    ```

---

## Ejercicio 7 — Corrección de errores avanzada (8 errores)

**Objetivo:** Detectar errores en un programa con mayor densidad de fallos, incluyendo errores en directivas de preprocesador.

### Enunciado

El siguiente programa intenta calcular el área de un círculo con **A = π · r²**. Contiene **8 errores**. Identifícalos, corrígelos y valida que el programa compile y produzca resultados correctos.

```c
#include <stdio.h>
#include <math>
#define PI  

int main();
{
float radio area;

printf("\nRadio=\t");
scanf("%d", &radio);

area=PI*po (radio, 2);

printf("\nEl Area es %\n", area);

return 0
}
```

### Pistas

Los errores abarcan: directiva `#include` incompleta, `#define` sin valor, declaración de `main` con `;` sobrante, variables sin separador, especificador de formato incorrecto en `scanf`, nombre de función mal escrito, formato incompleto en `printf`, y `return` sin `;`.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <math.h>          /* 1: faltaba .h */
    #define PI 3.14159         /* 2: faltaba el valor de PI */

    int main()                 /* 3: sobraba el ; después de main() */
    {
        float radio, area;     /* 4: faltaba la coma entre variables */

        printf("\nRadio=\t");
        scanf("%f", &radio);   /* 5: %d incorrecto para float, debe ser %f */

        area = PI * pow(radio, 2);  /* 6: "po " → pow (nombre y espacio incorrectos) */

        printf("\nEl Area es %f\n", area);  /* 7: "%" incompleto, debe ser %f */

        return 0;              /* 8: faltaba ; */
    }
    ```

    | # | Elemento con error | Corrección |
    |---|-------------------|------------|
    | 1 | `#include <math>` | `#include <math.h>` |
    | 2 | `#define PI` (sin valor) | `#define PI 3.14159` |
    | 3 | `int main();` | `int main()` — el `;` convierte la declaración en un prototipo |
    | 4 | `float radio area;` | `float radio, area;` — la `,` separa declaraciones |
    | 5 | `scanf("%d", &radio)` | `scanf("%f", &radio)` — `radio` es `float` |
    | 6 | `po (radio, 2)` | `pow(radio, 2)` — nombre correcto sin espacio |
    | 7 | `printf("...%\n", area)` | `printf("...%f\n", area)` — especificador incompleto |
    | 8 | `return 0` | `return 0;` |
