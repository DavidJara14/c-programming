# Tarea — Sesión 1

!!! tip "Instrucciones"
    Resuelve los ejercicios en CodeBlocks. Crea un archivo `.c` separado por cada ejercicio con tu nombre y número de ejercicio en el comentario inicial. Entrega los archivos `.c` con el código fuente — no capturas de pantalla.

!!! warning "Regla de oro"
    Si tu programa compila pero el resultado es incorrecto, **el programa tiene un error lógico** — es tan válido como un error de compilación. Prueba siempre con varios valores de entrada, incluyendo casos límite (cero, negativos, valores muy grandes).

---

## Ejercicio T1 — Función matemática z = x² + y³

### Enunciado

Escribe un programa en C que:

1. Solicite al usuario los valores de `x` e `y` (números reales)
2. Calcule el valor de la función: **z = x² + y³**
3. Muestre el resultado con 4 decimales

### Formato de salida esperado

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

!!! tip "Pista"
    Necesitas `#include <math.h>` y la función `pow`. Recuerda usar `double` para mayor precisión.

---

## Ejercicio T2 — Volumen de figuras geométricas

### Enunciado

Escribe **un solo programa** que calcule e imprima el volumen de las siguientes tres figuras, pidiendo los datos necesarios para cada una:

**a) Esfera:** V = (4/3) · π · r³

**b) Cilindro:** V = π · r² · h

**c) Cono:** V = (π · r² · h) / 3

Usa `#define PI 3.14159` para la constante π. Muestra todos los resultados al final, con 3 decimales.

### Formato de salida esperado

```
=== Volúmenes geométricos ===

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

### Casos de prueba — Esfera

| Radio | Volumen esperado |
|-------|-----------------|
| 1 | 4.189 |
| 5 | 523.599 |
| 10 | 4188.790 |

---

## Ejercicio T3 — Corrección de errores avanzada

### Enunciado

El siguiente programa intenta calcular el área de un círculo usando la fórmula **A = π · r²**. Contiene **8 errores**. Identifícalos todos, explica cada uno brevemente y entrega el código corregido que compile y funcione correctamente.

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

### Tabla de errores — llénala

| # | Línea / elemento | Descripción del error | Corrección |
|---|------------------|-----------------------|------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | |
| 8 | | | |

!!! note "Pista — los tipos de errores presentes"
    - Error en directiva `#include`
    - Constante `#define` incompleta
    - Error en la declaración de `main`
    - Variables mal declaradas (falta separador)
    - Especificador de formato incorrecto en `scanf`
    - Nombre de función mal escrito con espacio
    - Especificador de formato incompleto en `printf`
    - Falta de punto y coma en `return`
