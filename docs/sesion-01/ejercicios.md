# Ejercicios en Clase — Sesión 1

!!! info "Dinámica de trabajo"
    Los ejercicios son progresivos: el primero es completamente guiado, el segundo semiguiado y los siguientes los resuelves tú con el instructor disponible para dudas. Escribe el código en CodeBlocks, compila con `F9` y verifica la salida antes de avanzar.

---

## Ejercicio 1 — Guiado: Suma de dos constantes

**Objetivo:** Escribir el primer programa que realiza una operación matemática y muestra el resultado.

### Enunciado

Escribe un programa que sume dos valores constantes enteros (A = 21, B = 59) y muestre el resultado en pantalla con el formato: `21 + 59 = 80`.

### Código base — escríbelo y analiza cada línea

```c
#include <stdio.h>

int main() {
    int A, B, C;   // declaramos tres variables enteras

    A = 21;        // asignamos valores constantes
    B = 59;
    C = A + B;     // realizamos la operación

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
2. ¿Puedes cambiar A y B por otros valores sin tocar el `printf`? ¿El resultado se actualiza?
3. ¿Qué pasa si cambias `int` por `float` y usas `%f` en lugar de `%d`?

---

## Ejercicio 2 — Semiguiado: Suma de dos variables capturadas

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

    return 0;
}
```

### Solución

??? example "Ver solución (intenta primero)"
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

### Prueba tu programa con estos casos

| a | b | Resultado esperado |
|---|---|--------------------|
| 10.5 | 4.3 | 14.80 |
| -3.0 | 3.0 | 0.00 |
| 1000.0 | 0.001 | 1000.00 |

---

## Ejercicio 3 — Independiente: Potencias de un número

**Objetivo:** Usar la librería `math.h` y la función `pow`.

### Enunciado

Escribe un programa que:

1. Pida al usuario un número real `X`
2. Calcule e imprima su cuadrado (X²) y su cubo (X³)
3. Use la función `pow` de `math.h`
4. Muestre los resultados con 2 decimales

### Formato de salida esperado

```
Ingrese X: 4
X^2 = 16.00
X^3 = 64.00
```

### Pistas

- Necesitas incluir `<math.h>`
- La función es: `pow(base, exponente)` — ambos parámetros son `double`
- Usa `double` para la variable X para compatibilidad con `pow`

### Solución

??? example "Ver solución (intenta primero)"
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
    Al usar `scanf` con `double`, el especificador correcto es `%lf` (l de *long*). Con `printf`, tanto `%f` como `%lf` funcionan para `double`. En `scanf`, usar `%f` con una variable `double` es un error silencioso — leerá menos bytes de los necesarios.

---

## Ejercicio 4 — Reto: Detecta y corrige los errores

**Objetivo:** Desarrollar el ojo crítico para identificar errores sintácticos y lógicos en C.

### Enunciado

El siguiente código tiene **6 errores** (algunos sintácticos, algunos lógicos). Identifícalos, explica por qué son errores y escribe la versión corregida.

```c
#include <stdio>          /* error 1 */

int main()
{
    float altura, area, base;

    printf( "\nIntroduzca base:\t" );
    scanf( "%f", base );              /* error 2 */

    printf( "\nIntroduzca altura:\t" )   /* error 3 */
    scanf( "%f", &altura );

    area <- base * altura / 2.0;     /* error 4 */

    printf( "\nEl area del triangulo es: %d\n", area );  /* error 5 */

    return 0
}                                    /* error 6 */
```

### Tabla de análisis — llénala antes de ver la solución

| # | Línea | Error | Corrección |
|---|-------|-------|------------|
| 1 | `#include <stdio>` | | |
| 2 | `scanf( "%f", base )` | | |
| 3 | `printf(...)` sin `;` | | |
| 4 | `area <- base * ...` | | |
| 5 | `%d` con variable `float` | | |
| 6 | `return 0` sin `;` | | |

### Solución corregida

??? example "Ver solución (completa la tabla primero)"
    ```c
    #include <stdio.h>        // error 1: faltaba la extensión .h

    int main() {
        float altura, area, base;

        printf("\nIntroduzca base:\t");
        scanf("%f", &base);   // error 2: faltaba el & antes de base

        printf("\nIntroduzca altura:\t");  // error 3: faltaba el ; al final
        scanf("%f", &altura);

        area = base * altura / 2.0;  // error 4: <- no existe en C, el operador de asignación es =

        printf("\nEl área del triángulo es: %f\n", area);  // error 5: float usa %f, no %d

        return 0;   // error 6: faltaba el ; 
    }
    ```

    **Los 6 errores explicados:**

    1. `<stdio>` → `<stdio.h>`: todas las librerías estándar de C llevan extensión `.h`
    2. `scanf("%f", base)` → `scanf("%f", &base)`: `scanf` necesita la **dirección de memoria** de la variable, no su valor
    3. Faltaba `;` al final del `printf`: cada sentencia en C termina con punto y coma
    4. `<-` no existe en C: el operador de asignación es `=`
    5. `%d` es para `int`: un `float` debe imprimirse con `%f`
    6. `return 0` sin `;`: toda sentencia en C termina con punto y coma, incluyendo `return`
