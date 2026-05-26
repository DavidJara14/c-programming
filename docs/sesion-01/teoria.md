# Sesión 1 — Introducción, Algoritmos y Variables

> *"El primer Hello World en C fue escrito por Brian Kernighan en 1974 como ejemplo en un tutorial interno de Bell Labs. Ese programa de 5 líneas se convirtió en la tradición de inicio de toda la programación moderna."*

---

## Palabras reservadas de esta sesión

Las **palabras reservadas** (keywords) son términos que el lenguaje C tiene predefinidos. No pueden usarse como nombres de variables ni funciones.

| Keyword | Uso en esta sesión | Significado |
|---------|--------------------|-------------|
| `int` | `int x = 5;` | Declara una variable entera (4 bytes) |
| `float` | `float p = 3.14;` | Declara un número real de precisión simple (4 bytes) |
| `double` | `double pi = 3.14159;` | Número real de precisión doble (8 bytes) |
| `char` | `char letra = 'A';` | Declara un carácter (1 byte) |
| `return` | `return 0;` | Devuelve un valor y termina la función |
| `void` | `int main(void)` | Sin valor / sin parámetros |
| `const` | `const int MAX = 100;` | Declara una constante (valor inmutable) |

---

## Librerías y funciones de esta sesión

Una **librería** es un conjunto de funciones ya escritas que puedes usar en tu programa con `#include`.

### `stdio.h` — Standard Input/Output

Es la librería más fundamental de C. Sin ella no puedes leer del teclado ni imprimir en pantalla.

| Función | Firma completa | ¿Qué hace? |
|---------|---------------|------------|
| `printf` | `int printf(const char *formato, ...)` | Imprime texto formateado en la consola |
| `scanf` | `int scanf(const char *formato, ...)` | Lee datos del teclado |
| `puts` | `int puts(const char *cadena)` | Imprime una cadena y agrega `\n` automáticamente |
| `getchar` | `int getchar(void)` | Lee un carácter del teclado |

### `math.h` — Funciones matemáticas

| Función | Firma completa | ¿Qué hace? | Ejemplo |
|---------|---------------|------------|---------|
| `pow` | `double pow(double base, double exp)` | Potencia: base^exp | `pow(2, 10)` → 1024 |
| `sqrt` | `double sqrt(double x)` | Raíz cuadrada | `sqrt(25)` → 5 |
| `fabs` | `double fabs(double x)` | Valor absoluto (float) | `fabs(-7.5)` → 7.5 |
| `ceil` | `double ceil(double x)` | Redondea hacia arriba | `ceil(3.2)` → 4 |
| `floor` | `double floor(double x)` | Redondea hacia abajo | `floor(3.9)` → 3 |

!!! warning "Importante al usar `math.h`"
    En algunos compiladores (Linux/GCC) es necesario compilar con la bandera `-lm` para enlazar la librería matemática. En CodeBlocks con MinGW en Windows esto **no es necesario** — funciona directamente.

---

## 1. Estructura básica de un programa en C

Todo programa en C tiene esta estructura mínima:

```c
#include <stdio.h>      // (1) Incluir librerías

int main() {            // (2) Función principal — punto de entrada
    
    // (3) Cuerpo del programa
    printf("Hola, mundo!\n");
    
    return 0;           // (4) Indicar que el programa terminó bien
}
```

### Anatomía del programa

| Elemento | Explicación |
|----------|-------------|
| `#include <stdio.h>` | **Directiva de preprocesador.** Le dice al compilador que incluya las funciones de `stdio.h` antes de compilar. Va sin punto y coma. |
| `int main()` | **Función principal.** Todo programa en C debe tener exactamente una función llamada `main`. Es el punto donde inicia la ejecución. |
| `{ ... }` | **Llaves.** Delimitan el bloque de código de la función. |
| `printf(...)` | **Llamada a función.** Imprime texto en consola. El `\n` es un carácter de salto de línea. |
| `return 0;` | **Retorno.** Devuelve 0 al sistema operativo para indicar que el programa terminó sin errores. |
| `;` | **Punto y coma.** Termina cada sentencia en C. Olvidarlo es el error más común de los principiantes. |

---

## 2. El proceso de compilación en CodeBlocks

```
Archivo .c  →  Preprocesador  →  Compilador (GCC)  →  Enlazador  →  .exe
(código          (procesa los        (convierte a        (une las       (ejecutable)
 fuente)          #include, #define)   código objeto)      librerías)
```

**En CodeBlocks:**

1. Crea un nuevo proyecto: `File → New → Project → Console Application → C`
2. Escribe tu código en `main.c`
3. Compila y ejecuta: `F9` (Build and Run)
4. Si hay errores, aparecen en la ventana inferior — **lee el error completo**, siempre indica la línea

!!! tip "Hábito de senior"
    Compila frecuentemente — después de cada bloque pequeño de código. Es mucho más fácil encontrar un error en 5 líneas que en 50.

---

## 3. Tipos de datos

En C, cada variable tiene un **tipo de dato** que determina cuánta memoria ocupa y qué valores puede almacenar.

| Tipo | Tamaño | Rango aproximado | Especificador `printf`/`scanf` |
|------|--------|-----------------|-------------------------------|
| `int` | 4 bytes | −2,147,483,648 a 2,147,483,647 | `%d` |
| `float` | 4 bytes | ±3.4 × 10⁻³⁸ a ±3.4 × 10³⁸ (6-7 dígitos) | `%f` |
| `double` | 8 bytes | ±1.7 × 10⁻³⁰⁸ a ±1.7 × 10³⁰⁸ (15-16 dígitos) | `%lf` |
| `char` | 1 byte | −128 a 127 (o 0 a 255) / un carácter ASCII | `%c` |

!!! note "¿`float` o `double`?"
    Usa `float` cuando el espacio importa (sistemas embebidos, arreglos grandes) y la precisión de 6 dígitos es suficiente. Usa `double` para cálculos científicos o financieros donde necesitas más precisión. En la mayoría de los ejercicios de este curso, `float` es suficiente.

---

## 4. Variables y constantes

### Declaración de variables

```c
tipo nombre;              // declaración sin valor inicial
tipo nombre = valor;      // declaración con inicialización
```

```c
int edad;                 // declarada pero sin valor definido (¡peligroso!)
int edad = 20;            // declarada e inicializada
float temperatura = 36.6;
char inicial = 'D';
```

!!! warning "Variable sin inicializar"
    En C, una variable declarada sin valor inicial contiene **basura de memoria** — lo que haya en esa dirección de RAM. Nunca uses una variable sin asignarle un valor primero.

### Reglas para nombres de variables

- Solo letras, dígitos y guión bajo `_`
- No puede empezar con un dígito
- No puede ser una keyword (`int`, `float`, `return`, etc.)
- C es **case-sensitive**: `edad`, `Edad` y `EDAD` son tres variables distintas

```c
int edad;       // válido
int 2do;        // INVÁLIDO — empieza con dígito
int int;        // INVÁLIDO — es una keyword
int Edad;       // válido (distinto a "edad")
int nota_1;     // válido
```

### Constantes con `#define`

`#define` es una **directiva de preprocesador** — no es una sentencia, no lleva punto y coma, y el valor se sustituye textualmente antes de compilar.

```c
#define PI 3.14159
#define GRAVEDAD 9.81
#define MAX_ELEMENTOS 100
```

```c
// Uso:
double area = PI * radio * radio;
```

!!! note "Convención"
    Por convención, los nombres de constantes con `#define` se escriben en **MAYÚSCULAS**. Esto las hace inmediatamente reconocibles en el código.

---

## 5. `printf` — Imprimir en pantalla

```c
printf("texto con %especificadores", variable1, variable2, ...);
```

### Especificadores de formato

| Especificador | Tipo | Ejemplo |
|---------------|------|---------|
| `%d` | `int` | `printf("%d", 42)` → `42` |
| `%f` | `float` / `double` | `printf("%f", 3.14)` → `3.140000` |
| `%.2f` | `float` con 2 decimales | `printf("%.2f", 3.14159)` → `3.14` |
| `%c` | `char` | `printf("%c", 'A')` → `A` |
| `%s` | cadena de texto | `printf("%s", "hola")` → `hola` |
| `%%` | imprime `%` literal | `printf("100%%")` → `100%` |

### Secuencias de escape

| Secuencia | Efecto |
|-----------|--------|
| `\n` | Salto de línea (Enter) |
| `\t` | Tabulación horizontal |
| `\\` | Imprime `\` |
| `\"` | Imprime `"` |
| `\a` | Sonido de alerta (beep) |

```c
printf("Nombre: %s\tEdad: %d\n", "Ana", 21);
// Salida: Nombre: Ana    Edad: 21
```

---

## 6. `scanf` — Leer del teclado

```c
scanf("%especificador", &variable);
```

!!! danger "El operador `&` es obligatorio"
    El `&` (operador de dirección) le indica a `scanf` **dónde en memoria** debe guardar el dato. Olvidarlo es un error clásico que causa comportamiento impredecible — el programa puede correr aparentemente bien pero corromper memoria.

    ```c
    int edad;
    scanf("%d", &edad);   // CORRECTO
    scanf("%d", edad);    // ERROR — comportamiento indefinido
    ```

### Ejemplo completo

```c
#include <stdio.h>

int main() {
    int edad;
    float estatura;
    
    printf("Ingresa tu edad: ");
    scanf("%d", &edad);
    
    printf("Ingresa tu estatura en metros: ");
    scanf("%f", &estatura);
    
    printf("\nTienes %d años y mides %.2f metros.\n", edad, estatura);
    
    return 0;
}
```

---

## 7. Operadores aritméticos

| Operador | Operación | Ejemplo | Resultado |
|----------|-----------|---------|-----------|
| `+` | Suma | `5 + 3` | `8` |
| `-` | Resta | `10 - 4` | `6` |
| `*` | Multiplicación | `6 * 7` | `42` |
| `/` | División | `10 / 3` | `3` (entera) |
| `/` | División | `10.0 / 3` | `3.333...` (real) |
| `%` | Módulo (residuo) | `10 % 3` | `1` |

!!! warning "División entera"
    Cuando ambos operandos son `int`, la división es **entera** — el resultado se trunca, no se redondea.
    ```c
    int r = 10 / 3;   // r = 3, no 3.33
    float r = 10.0 / 3;  // r = 3.333...
    ```

---

## 8. Comentarios

Los comentarios son ignorados por el compilador — son notas para el programador.

```c
// Comentario de una línea (estilo C99 y posteriores)

/* Comentario
   de múltiples
   líneas (estilo C89/ANSI C) */
```

!!! tip "Hábito de senior"
    Comenta el **porqué**, no el **qué**. El código ya dice qué hace — el comentario debe explicar por qué lo hace así.
    ```c
    // MAL: incrementa i en 1
    i++;
    
    // BIEN: avanza al siguiente elemento (índice base 0)
    i++;
    ```
