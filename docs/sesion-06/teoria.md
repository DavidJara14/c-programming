# Sesión 6 — Funciones

> *En 1947, Grace Hopper y su equipo encontraron una polilla atrapada en un relé de la computadora Mark II y la pegaron en la bitácora con la nota "first actual case of bug being found". Hopper fue también pionera de una idea que damos por sentada: que un programa debe construirse con bloques reutilizables y con nombre, en lugar de una sola masa de instrucciones. Las funciones son la materialización de esa idea: dividir un problema grande en piezas pequeñas que se entienden, se prueban y se reutilizan por separado.*

---

## Palabras reservadas y conceptos de esta sesión

| Keyword / Concepto | Uso | Significado |
|--------------------|-----|-------------|
| `return` | `return valor;` | Devuelve un valor y termina la función |
| `void` | `void f(void)` | "Nada": sin valor de retorno o sin parámetros |
| Prototipo | `int suma(int, int);` | Declaración anticipada de la firma de una función |
| Parámetro | `int f(int x)` | Variable que recibe un valor al llamar |
| Argumento | `f(5)` | Valor concreto que se pasa en la llamada |
| Ámbito | local / global | Región del programa donde una variable existe |

---

## 1. ¿Por qué funciones?

Hasta ahora todo el código vivía dentro de `main`. Eso funciona para programas pequeños, pero a medida que crecen aparecen tres problemas: el código se **repite**, se vuelve **difícil de leer** y es **difícil de probar**. Las funciones resuelven los tres:

- **Reutilización:** escribes una vez, llamas muchas veces.
- **Legibilidad:** `calcularPromedio(notas, n)` se entiende sin leer el detalle.
- **Mantenimiento:** si hay un error, lo corriges en un solo lugar.

Esta estrategia se llama **diseño modular**: dividir el problema en subproblemas, cada uno resuelto por una función.

---

## 2. Anatomía de una función

```c
tipo_retorno  nombre(lista_de_parametros) {
    // cuerpo
    return valor;   // si el tipo de retorno no es void
}
```

```c
int suma(int a, int b) {     // recibe dos enteros, devuelve un entero
    int resultado = a + b;
    return resultado;
}
```

| Parte | En el ejemplo | Significado |
|-------|---------------|-------------|
| Tipo de retorno | `int` | El tipo del valor que devuelve |
| Nombre | `suma` | Cómo se llama a la función |
| Parámetros | `int a, int b` | Datos de entrada |
| Cuerpo | `{ ... }` | Las instrucciones |
| `return` | `return resultado;` | El valor que sale |

### Llamar a la función

```c
int main() {
    int r = suma(3, 4);   // r vale 7
    printf("%d\n", r);
    return 0;
}
```

---

## 3. El prototipo (declaración anticipada)

C lee el archivo de arriba hacia abajo. Si `main` llama a una función definida **más abajo**, el compilador aún no la conoce. La solución es declarar el **prototipo** al inicio: la firma de la función sin su cuerpo.

```c
#include <stdio.h>

int suma(int a, int b);   // PROTOTIPO: anuncia la función

int main() {
    printf("%d\n", suma(3, 4));
    return 0;
}

int suma(int a, int b) {  // DEFINICIÓN: la implementa
    return a + b;
}
```

!!! tip "Convención profesional"
    Lo habitual es: prototipos arriba, `main` después, y las definiciones completas al final. Así, quien lee el archivo ve primero el "índice" de funciones y luego el detalle. En proyectos grandes, los prototipos viven en archivos `.h` (cabeceras).

---

## 4. Funciones sin retorno y sin parámetros: `void`

`void` significa "ninguno". Se usa en dos lugares:

```c
void saludar(void) {            // no recibe ni devuelve nada
    printf("Hola desde una funcion\n");
}
```

Una función `void` no usa `return` con valor (puede usar `return;` solo para salir antes).

```c
void imprimirLinea(int n) {     // recibe pero no devuelve
    for (int i = 0; i < n; i++) printf("-");
    printf("\n");
}
```

---

## 5. Ámbito de las variables (*scope*)

El **ámbito** define dónde una variable es visible y cuánto vive.

### Variables locales

Se declaran dentro de una función (o bloque). Solo existen ahí y desaparecen al terminar.

```c
int cuadrado(int x) {
    int r = x * x;    // 'r' solo existe dentro de cuadrado
    return r;
}
// aquí 'r' ya no existe
```

### Variables globales

Se declaran fuera de toda función. Son visibles desde cualquier punto. **Úsalas con moderación**: dificultan el seguimiento de quién las modifica.

```c
#include <stdio.h>

int contador = 0;     // global

void incrementar(void) {
    contador++;       // accede a la global
}
```

!!! warning "Dos variables con el mismo nombre"
    Si una variable local tiene el mismo nombre que una global, dentro de la función **gana la local**. La global queda "tapada". Por eso conviene nombrar con cuidado y preferir parámetros en vez de globales.

---

## 6. Paso por valor: C copia los argumentos

Este es uno de los conceptos más importantes de la sesión. Cuando llamas a una función, C **copia** el valor de cada argumento en el parámetro. La función trabaja sobre la **copia**, no sobre el original.

```c
#include <stdio.h>

void intentarCambiar(int x) {
    x = 99;            // cambia la copia local
}

int main() {
    int a = 5;
    intentarCambiar(a);
    printf("%d\n", a);   // imprime 5, NO 99
    return 0;
}
```

!!! danger "El paso por valor explica por qué `intercambiar` no funciona"
    Una función `void intercambiar(int a, int b)` que haga `temp=a; a=b; b=temp;` **no** cambia las variables originales: solo intercambia sus copias. Para modificar el original se necesitan **apuntadores**, el tema de la Sesión 7. Esta limitación es justamente la motivación para estudiarlos.

!!! note "Los arreglos son la excepción"
    Cuando pasas un arreglo, C no lo copia: pasa la dirección de su primer elemento. Por eso una función **sí** puede modificar el contenido de un arreglo que recibe. Lo veremos formalmente con apuntadores.

---

## 7. La librería `math.h`

Un ejemplo perfecto de funciones reutilizables: la biblioteca matemática estándar. Sus funciones reciben y devuelven `double`.

| Función | Descripción | Ejemplo |
|---------|-------------|---------|
| `sqrt(x)` | Raíz cuadrada | `sqrt(9.0)` → 3.0 |
| `pow(b, e)` | Potencia bᵉ | `pow(2, 10)` → 1024 |
| `fabs(x)` | Valor absoluto real | `fabs(-3.5)` → 3.5 |
| `ceil(x)` / `floor(x)` | Redondeo arriba / abajo | `floor(3.7)` → 3.0 |
| `round(x)` | Redondeo al más cercano | `round(2.5)` → 3.0 |
| `sin`, `cos`, `tan` | Trigonométricas (radianes) | `sin(0)` → 0.0 |

```c
#include <stdio.h>
#include <math.h>

int main() {
    double h = sqrt(pow(3, 2) + pow(4, 2));   // hipotenusa
    printf("%.1f\n", h);   // 5.0
    return 0;
}
```

!!! note "Compilar con `math.h`"
    En Linux/macOS, `math.h` requiere enlazar la biblioteca con la bandera `-lm`: `gcc programa.c -lm`. En CodeBlocks/Windows normalmente no hace falta.

---

## 8. Recursión (introducción)

Una función puede **llamarse a sí misma**. Esto se llama **recursión**. Toda función recursiva necesita un **caso base** que detenga las llamadas.

```c
int factorial(int n) {
    if (n <= 1) {          // caso base
        return 1;
    }
    return n * factorial(n - 1);   // caso recursivo
}
```

`factorial(4)` se resuelve así: `4 * factorial(3)` → `4 * 3 * factorial(2)` → … → `4 * 3 * 2 * 1 = 24`.

!!! danger "Sin caso base, recursión infinita"
    Si olvidas el caso base (o nunca lo alcanzas), la función se llama sin fin hasta agotar la memoria de la pila (*stack overflow*) y el programa se cae.

---

## 9. Errores comunes con funciones

### Olvidar el prototipo

```c
int main() {
    saludar();   // ADVERTENCIA/ERROR si saludar se define después y no hay prototipo
}
void saludar(void) { ... }
```

### Esperar que la función modifique el original (paso por valor)

```c
void duplicar(int x) { x = x * 2; }   // no cambia nada afuera
```

### Olvidar el `return` en una función no-`void`

```c
int suma(int a, int b) {
    int r = a + b;
    // falta return r;  -> devuelve un valor basura
}
```

### Confundir parámetro con argumento

El **parámetro** es la variable en la definición (`int x`); el **argumento** es el valor de la llamada (`f(5)`). El argumento se copia en el parámetro.

### Declarar el tipo de retorno mal

```c
void promedio(int v[], int n) {
    return suma / n;   // ERROR: una funcion void no puede devolver un valor
}
```
