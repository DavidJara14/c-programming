# Ejercicios en Clase — Sesión 2

---

## Ejercicio 1 — División segura

**Objetivo:** Aplicar validación de entrada con `if-else` para prevenir una operación indefinida.

### Enunciado

Escribe un programa que solicite dos números reales al usuario (dividendo y divisor) y realice la división. El programa debe verificar que el divisor no sea cero antes de operar. Si es cero, debe mostrar un mensaje de error.

### Salida esperada

```
Ingrese el dividendo: 15.0
Ingrese el divisor: 4.0
15.00 / 4.00 = 3.75
```

```
Ingrese el dividendo: 10.0
Ingrese el divisor: 0
Error: no es posible dividir entre cero.
```

### Casos de prueba

| Dividendo | Divisor | Resultado |
|-----------|---------|-----------|
| 15.0 | 4.0 | 3.7500 |
| 10.0 | 0.0 | Error |
| -20.0 | 3.0 | -6.6667 |
| 0.0 | 5.0 | 0.0000 |

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        float dividendo, divisor;

        printf("Ingrese el dividendo: ");
        scanf("%f", &dividendo);
        printf("Ingrese el divisor: ");
        scanf("%f", &divisor);

        if (divisor != 0) {
            printf("%.2f / %.2f = %.4f\n", dividendo, divisor, dividendo / divisor);
        } else {
            printf("Error: no es posible dividir entre cero.\n");
        }

        return 0;
    }
    ```

---

## Ejercicio 2 — Menor de dos valores

**Objetivo:** Comparar dos valores con `if-else if-else` y manejar el caso de igualdad.

### Enunciado

Solicita al usuario dos números reales e imprime cuál es el menor. Si son iguales, indica que son iguales.

### Salida esperada

```
Valor 1: 8.5
Valor 2: 3.2
El menor es 3.20
```

```
Valor 1: 7.0
Valor 2: 7.0
Los valores son iguales.
```

### Casos de prueba

| a | b | Salida |
|---|---|--------|
| 8.5 | 3.2 | El menor es 3.20 |
| -1.0 | 5.0 | El menor es -1.00 |
| 7.0 | 7.0 | Los valores son iguales. |
| 0.0 | -0.5 | El menor es -0.50 |

### Pistas

- Necesitas tres ramas: `a < b`, `b < a`, y el caso de igualdad.
- Otra alternativa válida es cubrir igualdad primero con `a == b`, y luego comparar.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        float a, b;

        printf("Valor 1: ");
        scanf("%f", &a);
        printf("Valor 2: ");
        scanf("%f", &b);

        if (a == b) {
            printf("Los valores son iguales.\n");
        } else if (a < b) {
            printf("El menor es %.2f\n", a);
        } else {
            printf("El menor es %.2f\n", b);
        }

        return 0;
    }
    ```

---

## Ejercicio 3 — Menú con `switch`: las cuatro operaciones

**Objetivo:** Construir un menú de selección múltiple usando `switch` con validación de operaciones.

### Enunciado

Escribe un programa que presente un menú con las cuatro operaciones aritméticas básicas (suma, resta, multiplicación, división). El usuario selecciona una opción y luego ingresa dos números. El programa ejecuta la operación correspondiente. Debe validar:

- Que la opción seleccionada exista (usar `default`).
- Que la división no sea entre cero.

### Salida esperada

```
--- Calculadora ---
1. Suma
2. Resta
3. Multiplicacion
4. Division
Seleccione una opcion: 4

Ingrese dos numeros: 20 3
20.00 / 3.00 = 6.6667
```

```
Seleccione una opcion: 4
Ingrese dos numeros: 10 0
Error: division entre cero.
```

```
Seleccione una opcion: 7
Opcion no valida.
```

### Pistas

- Dentro del `case 4` necesitas un `if` anidado para verificar el divisor.
- Recuerda el `break` al final de cada `case`.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        int op;
        float a, b;

        printf("--- Calculadora ---\n");
        printf("1. Suma\n");
        printf("2. Resta\n");
        printf("3. Multiplicacion\n");
        printf("4. Division\n");
        printf("Seleccione una opcion: ");
        scanf("%d", &op);

        if (op >= 1 && op <= 4) {
            printf("Ingrese dos numeros: ");
            scanf("%f %f", &a, &b);
        }

        switch (op) {
            case 1:
                printf("%.2f + %.2f = %.4f\n", a, b, a + b);
                break;
            case 2:
                printf("%.2f - %.2f = %.4f\n", a, b, a - b);
                break;
            case 3:
                printf("%.2f * %.2f = %.4f\n", a, b, a * b);
                break;
            case 4:
                if (b != 0) {
                    printf("%.2f / %.2f = %.4f\n", a, b, a / b);
                } else {
                    printf("Error: division entre cero.\n");
                }
                break;
            default:
                printf("Opcion no valida.\n");
                break;
        }

        return 0;
    }
    ```

---

## Ejercicio 4 — Clasificación de triángulos

**Objetivo:** Aplicar condiciones compuestas con `&&` para clasificar datos según múltiples criterios.

### Enunciado

Solicita al usuario tres lados de un triángulo (valores reales positivos). El programa debe:

1. Validar que los tres lados sean positivos.
2. Verificar que los valores formen un triángulo válido (la suma de cualesquiera dos lados debe ser mayor al tercero).
3. Clasificar el triángulo como:
    - **Equilátero:** tres lados iguales
    - **Isósceles:** exactamente dos lados iguales
    - **Escaleno:** los tres lados diferentes

### Salida esperada

```
Lado a: 5
Lado b: 5
Lado c: 5
Triangulo equilatero.
```

```
Lado a: 3
Lado b: 4
Lado c: 5
Triangulo escaleno.
```

```
Lado a: 1
Lado b: 2
Lado c: 10
Los valores no forman un triangulo valido.
```

### Casos de prueba

| a | b | c | Resultado |
|---|---|---|-----------|
| 5 | 5 | 5 | Equilátero |
| 3 | 3 | 5 | Isósceles |
| 3 | 4 | 5 | Escaleno |
| 1 | 2 | 10 | No válido |
| -1 | 5 | 5 | Valores no positivos |

### Pistas

- La desigualdad triangular requiere tres verificaciones: `a+b > c`, `a+c > b`, `b+c > a`.
- Primero valida positivos, después validez del triángulo, después clasifica. No mezcles las validaciones.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        float a, b, c;

        printf("Lado a: ");
        scanf("%f", &a);
        printf("Lado b: ");
        scanf("%f", &b);
        printf("Lado c: ");
        scanf("%f", &c);

        if (a <= 0 || b <= 0 || c <= 0) {
            printf("Error: todos los lados deben ser positivos.\n");
        } else if (a + b <= c || a + c <= b || b + c <= a) {
            printf("Los valores no forman un triangulo valido.\n");
        } else if (a == b && b == c) {
            printf("Triangulo equilatero.\n");
        } else if (a == b || a == c || b == c) {
            printf("Triangulo isosceles.\n");
        } else {
            printf("Triangulo escaleno.\n");
        }

        return 0;
    }
    ```

---

## Ejercicio 5 — Calculadora de perímetros con menú

**Objetivo:** Combinar `switch`, `if` anidados y múltiples fórmulas en un programa estructurado.

### Enunciado

Escribe un programa que presente un menú para calcular el perímetro de cuatro figuras geométricas:

1. Círculo (P = 2πr)
2. Triángulo (P = a + b + c)
3. Cuadrado (P = 4l)
4. Rectángulo (P = 2(a + b))

El programa debe validar que todos los valores ingresados sean positivos y que la opción seleccionada sea válida. Usa `#define PI 3.14159`.

### Salida esperada

```
--- Calculadora de perimetros ---
1. Circulo
2. Triangulo
3. Cuadrado
4. Rectangulo
Seleccione figura: 2

Lado a: 3
Lado b: 4
Lado c: 5
Perimetro del triangulo: 12.000
```

```
Seleccione figura: 1
Radio: -5
Error: el radio debe ser positivo.
```

### Casos de prueba

| Figura | Entrada | Perímetro |
|--------|---------|-----------|
| Círculo | r = 5 | 31.416 |
| Triángulo | 3, 4, 5 | 12.000 |
| Cuadrado | l = 7 | 28.000 |
| Rectángulo | 10, 3 | 26.000 |

### Pistas

- Cada `case` del `switch` tiene su propia captura de datos y su propia validación.
- Puedes reutilizar nombres de variables entre `case`s porque cada uno tiene su `break`.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define PI 3.14159

    int main() {
        int op;
        float a, b, c;

        printf("--- Calculadora de perimetros ---\n");
        printf("1. Circulo\n");
        printf("2. Triangulo\n");
        printf("3. Cuadrado\n");
        printf("4. Rectangulo\n");
        printf("Seleccione figura: ");
        scanf("%d", &op);

        switch (op) {
            case 1:
                printf("\nRadio: ");
                scanf("%f", &a);
                if (a > 0)
                    printf("Perimetro del circulo: %.3f\n", 2 * PI * a);
                else
                    printf("Error: el radio debe ser positivo.\n");
                break;

            case 2:
                printf("\nLado a: ");
                scanf("%f", &a);
                printf("Lado b: ");
                scanf("%f", &b);
                printf("Lado c: ");
                scanf("%f", &c);
                if (a > 0 && b > 0 && c > 0)
                    printf("Perimetro del triangulo: %.3f\n", a + b + c);
                else
                    printf("Error: los lados deben ser positivos.\n");
                break;

            case 3:
                printf("\nLado: ");
                scanf("%f", &a);
                if (a > 0)
                    printf("Perimetro del cuadrado: %.3f\n", 4 * a);
                else
                    printf("Error: el lado debe ser positivo.\n");
                break;

            case 4:
                printf("\nLargo: ");
                scanf("%f", &a);
                printf("Ancho: ");
                scanf("%f", &b);
                if (a > 0 && b > 0)
                    printf("Perimetro del rectangulo: %.3f\n", 2 * (a + b));
                else
                    printf("Error: las dimensiones deben ser positivas.\n");
                break;

            default:
                printf("Opcion no valida.\n");
                break;
        }

        return 0;
    }
    ```

---

## Ejercicio 6 — Ecuación cuadrática completa

**Objetivo:** Retomar el ejercicio T4 de la tarea anterior y agregar validación del discriminante con condicionales.

### Enunciado

Dado que en la Sesión 1 se calcularon las raíces de **ax² + bx + c = 0** asumiendo discriminante positivo, ahora completa el programa para manejar los tres casos:

- **Δ > 0:** dos raíces reales distintas.
- **Δ = 0:** una raíz real doble.
- **Δ < 0:** no existen raíces reales (informar al usuario).

Adicionalmente, valida que `a != 0` (si `a == 0`, no es una ecuación cuadrática).

### Salida esperada

```
Coeficiente a: 1
Coeficiente b: -5
Coeficiente c: 6

Discriminante: 1.0000
x1 = 3.0000
x2 = 2.0000
```

```
Coeficiente a: 1
Coeficiente b: -2
Coeficiente c: 1

Discriminante: 0.0000
Raiz doble: x = 1.0000
```

```
Coeficiente a: 1
Coeficiente b: 0
Coeficiente c: 1

Discriminante: -4.0000
No existen raices reales.
```

### Casos de prueba

| a | b | c | Discriminante | Resultado |
|---|---|---|--------------|-----------|
| 1 | -5 | 6 | 1 | x1=3, x2=2 |
| 1 | -2 | 1 | 0 | Raíz doble x=1 |
| 1 | 0 | 1 | -4 | Sin raíces reales |
| 0 | 3 | 2 | — | No es ecuación cuadrática |

### Pistas

- Calcula el discriminante primero: `disc = b*b - 4*a*c`.
- Usa `if-else if-else` para los tres casos del discriminante.
- Valida `a != 0` antes de cualquier cálculo.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <math.h>

    int main() {
        double a, b, c, disc, x1, x2;

        printf("Coeficiente a: ");
        scanf("%lf", &a);
        printf("Coeficiente b: ");
        scanf("%lf", &b);
        printf("Coeficiente c: ");
        scanf("%lf", &c);

        if (a == 0) {
            printf("\nNo es una ecuacion cuadratica (a no puede ser 0).\n");
        } else {
            disc = b * b - 4 * a * c;
            printf("\nDiscriminante: %.4f\n", disc);

            if (disc > 0) {
                x1 = (-b + sqrt(disc)) / (2 * a);
                x2 = (-b - sqrt(disc)) / (2 * a);
                printf("x1 = %.4f\n", x1);
                printf("x2 = %.4f\n", x2);
            } else if (disc == 0) {
                x1 = -b / (2 * a);
                printf("Raiz doble: x = %.4f\n", x1);
            } else {
                printf("No existen raices reales.\n");
            }
        }

        return 0;
    }
    ```
