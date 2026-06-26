# Sesión 7 — Apuntadores I

> *Cuando Dennis Ritchie diseñó C, los apuntadores no fueron un accidente: eran el corazón del lenguaje. Eran lo que permitía escribir un sistema operativo entero —UNIX— manipulando la memoria de la máquina directamente, sin perder legibilidad. Décadas después, los apuntadores siguen siendo el concepto que separa a quien "usa" C de quien realmente lo entiende. Son, a la vez, la herramienta más poderosa del lenguaje y la fuente de sus errores más temidos.*

---

## Palabras reservadas y operadores de esta sesión

| Operador / Concepto | Uso | Significado |
|---------------------|-----|-------------|
| `&` | `&x` | "Dirección de": da la dirección en memoria de `x` |
| `*` (declaración) | `int *p;` | Declara `p` como apuntador a `int` |
| `*` (desreferencia) | `*p` | "El contenido de": el valor al que apunta `p` |
| `NULL` | `p = NULL;` | Apuntador que no apunta a nada válido |
| `%p` | `printf("%p", p)` | Formato para imprimir una dirección |

---

## 1. La memoria como casilleros

Imagina la memoria de la computadora como una larguísima fila de casilleros numerados. Cada casillero guarda un byte, y cada uno tiene una **dirección** única (su número). Cuando declaras una variable, el sistema le asigna uno o más casilleros.

```c
int edad = 25;
```

Esto reserva casilleros (4 bytes para un `int`) en alguna dirección, por ejemplo la `0x7ffe1a3c`, y guarda ahí el valor 25.

- El **valor** de la variable es `25`.
- La **dirección** de la variable es `0x7ffe1a3c`.

El operador `&` ("dirección de") nos da esa dirección:

```c
printf("Valor: %d\n", edad);    // 25
printf("Direccion: %p\n", &edad); // 0x7ffe1a3c (varía en cada ejecución)
```

!!! note "Ya usabas `&` sin saberlo"
    En `scanf("%d", &edad)`, el `&` le pasa a `scanf` la **dirección** de `edad` para que pueda escribir el valor leído ahí. Esa es precisamente la razón por la que `scanf` necesita el `&`: para modificar tu variable, necesita saber dónde vive.

---

## 2. ¿Qué es un apuntador?

Un **apuntador** (*pointer*) es una variable que, en lugar de guardar un valor común, guarda una **dirección de memoria**. Decimos que "apunta a" otra variable.

```c
int edad = 25;
int *p;        // p es un apuntador a int
p = &edad;     // p guarda la dirección de edad: ahora p "apunta a" edad
```

```
         p                    edad
      +--------+           +------+
      |0x7ffe..| --------> |  25  |
      +--------+           +------+
   (guarda una            (guarda un
    dirección)             valor)
```

### Las dos caras del `*`

El símbolo `*` significa cosas distintas según el contexto:

| Contexto | Significado |
|----------|-------------|
| `int *p;` | **Declaración:** "p es un apuntador a int" |
| `*p` (en código) | **Desreferencia:** "el valor al que apunta p" |

```c
int edad = 25;
int *p = &edad;

printf("%d\n", *p);   // 25  -> desreferencia: el valor apuntado
*p = 30;              // modifica edad a través del apuntador
printf("%d\n", edad); // 30  -> ¡edad cambió!
```

!!! tip "Lee los apuntadores en voz alta"
    `p = &edad` se lee "p toma la dirección de edad". `*p = 30` se lee "el contenido apuntado por p ahora es 30". Verbalizarlo evita la confusión entre dirección y contenido.

---

## 3. El operador `&` y el operador `*` son inversos

```c
int x = 10;
int *p = &x;

// &x  -> la dirección de x
// *p  -> el valor en esa dirección -> de nuevo x
// *(&x) == x       siempre
// &(*p) == p       siempre
```

`&` toma una variable y da su dirección. `*` toma una dirección y da el valor que hay ahí. Aplicar uno deshace el otro.

---

## 4. `NULL`: el apuntador que no apunta a nada

Un apuntador recién declarado contiene basura: apunta a una dirección aleatoria. Desreferenciarlo es peligroso. Por eso, cuando un apuntador aún no tiene destino válido, se le asigna `NULL`:

```c
int *p = NULL;     // p no apunta a nada (todavía)

if (p != NULL) {
    printf("%d\n", *p);   // solo desreferencia si es seguro
}
```

!!! danger "Desreferenciar un apuntador no válido"
    `*p` cuando `p` es `NULL` o contiene basura provoca un fallo grave (*segmentation fault*) o corrompe memoria. **Regla de oro:** nunca desreferencies un apuntador sin estar seguro de que apunta a algo válido.

---

## 5. Paso por referencia: la solución al problema de la Sesión 6

En la Sesión 6 vimos que una función no puede modificar sus argumentos porque recibe **copias** (paso por valor). Los apuntadores rompen esa barrera: si en lugar del valor pasamos la **dirección**, la función puede modificar el original.

### El intercambio que SÍ funciona

```c
#include <stdio.h>

void intercambiar(int *a, int *b) {   // reciben direcciones
    int temp = *a;    // temp = valor apuntado por a
    *a = *b;          // el contenido de a toma el contenido de b
    *b = temp;        // el contenido de b toma temp
}

int main() {
    int x = 5, y = 9;
    intercambiar(&x, &y);   // pasamos las DIRECCIONES
    printf("x=%d y=%d\n", x, y);   // x=9 y=5  ¡funcionó!
    return 0;
}
```

| Concepto | Paso por valor (Sesión 6) | Paso por referencia (apuntadores) |
|----------|---------------------------|-----------------------------------|
| Qué recibe la función | Una copia del valor | La dirección del original |
| ¿Puede modificar el original? | No | Sí |
| Cómo se llama | `f(x)` | `f(&x)` |
| Parámetro | `int x` | `int *x` |

### Devolver varios resultados

El paso por referencia también permite que una función "devuelva" más de un valor:

```c
void divModulo(int a, int b, int *cociente, int *residuo) {
    *cociente = a / b;
    *residuo  = a % b;
}

int main() {
    int c, r;
    divModulo(17, 5, &c, &r);   // c=3, r=2
    printf("%d residuo %d\n", c, r);
    return 0;
}
```

---

## 6. Apuntadores y arreglos

En C, el nombre de un arreglo **es** la dirección de su primer elemento. Esta equivalencia es la razón profunda por la que los arreglos se modifican dentro de las funciones.

```c
int v[3] = {10, 20, 30};

// v        equivale a   &v[0]
// *v       equivale a   v[0]     -> 10
// *(v + 1) equivale a   v[1]     -> 20
// *(v + 2) equivale a   v[2]     -> 30
```

`v + 1` no avanza un byte: avanza **un elemento** (4 bytes para un `int`). El compilador conoce el tipo y escala automáticamente. Esto se llama **aritmética de apuntadores**.

```c
int *p = v;          // p apunta al inicio del arreglo
printf("%d\n", *p);     // 10
printf("%d\n", *(p+1)); // 20
p++;                 // ahora p apunta a v[1]
printf("%d\n", *p);     // 20
```

!!! note "`v[i]` es azúcar sintáctico"
    El compilador traduce `v[i]` exactamente a `*(v + i)`. La notación con corchetes existe solo por comodidad: por dentro, todo es aritmética de apuntadores. Por curioso que parezca, incluso `i[v]` compila y funciona, porque `*(v+i) == *(i+v)`.

---

## 7. Apuntadores como parámetros de arreglos

Estas dos firmas son **idénticas** para el compilador:

```c
void procesar(int v[], int n) { ... }
void procesar(int *v, int n) { ... }   // exactamente lo mismo
```

Ambas reciben la dirección del primer elemento. Por eso, dentro de la función, `sizeof(v)` da el tamaño de un apuntador (no del arreglo), y por eso siempre pasamos el tamaño `n` aparte.

---

## 8. Errores comunes con apuntadores

### Confundir el apuntador con su contenido

```c
int x = 5;
int *p = &x;
p = 10;      // INCORRECTO: asigna 10 a la dirección (basura)
*p = 10;     // CORRECTO: asigna 10 al valor apuntado
```

### Desreferenciar un apuntador no inicializado

```c
int *p;      // contiene basura
*p = 5;      // INCORRECTO: escribe en una dirección desconocida -> crash
```

### Olvidar el `&` al pasar la dirección

```c
intercambiar(x, y);    // INCORRECTO: pasa valores, no direcciones
intercambiar(&x, &y);  // CORRECTO
```

### Olvidar el `*` al usar el contenido en la función

```c
void duplicar(int *p) {
    p = p * 2;     // INCORRECTO: opera sobre la dirección
    *p = *p * 2;   // CORRECTO: opera sobre el valor apuntado
}
```

### Devolver la dirección de una variable local

```c
int *crear(void) {
    int x = 5;
    return &x;     // INCORRECTO: x deja de existir al salir de la función
}
```

La variable local muere al terminar la función; su dirección queda "colgando". Para devolver memoria que sobreviva, se usa memoria dinámica (Sesión 8).
