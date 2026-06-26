# Sesión 4 — Arreglos

> *En 1957, el lenguaje Fortran introdujo el arreglo (`array`) como la primera estructura de datos de la historia capaz de almacenar muchos valores bajo un solo nombre. Antes de eso, un programa que manejara 100 números necesitaba 100 variables distintas. El arreglo no solo ahorró nombres: hizo posible escribir un único bloque de código que recorre cualquier cantidad de datos. Sin él, no existirían las matrices, las imágenes digitales ni las bases de datos.*

---

## Palabras reservadas y operadores de esta sesión

| Keyword / Operador | Uso | Significado |
|--------------------|-----|-------------|
| `[]` | `int v[10];` | Declara un arreglo o accede a uno de sus elementos |
| `sizeof` | `sizeof(v)` | Devuelve el tamaño en bytes de un tipo o variable |
| `{ }` | `int v[3] = {1, 2, 3};` | Lista de inicialización de un arreglo |
| `,` | `{1, 2, 3}` | Separa los elementos en la inicialización |

!!! note "`sizeof` no es una función"
    `sizeof` es un **operador** que el compilador resuelve antes de ejecutar el programa. `sizeof(int)` vale 4 en la mayoría de los sistemas; `sizeof(v)` con `int v[10]` vale 40 (10 elementos × 4 bytes). El truco clásico para conocer cuántos elementos tiene un arreglo es `sizeof(v) / sizeof(v[0])`.

---

## 1. ¿Qué es un arreglo?

Un **arreglo** (*array*) es una colección de elementos del **mismo tipo**, almacenados en posiciones **contiguas** de memoria y accesibles mediante un **índice**.

```c
int calificaciones[5];   // reserva espacio para 5 enteros
```

Hasta ahora, para guardar cinco calificaciones necesitarías cinco variables: `c1`, `c2`, `c3`, `c4`, `c5`. Con un arreglo, las cinco viven bajo un solo nombre y se distinguen por su **índice**.

!!! danger "Los índices empiezan en CERO"
    En un arreglo de tamaño `N`, los índices válidos van de `0` a `N - 1`. Un arreglo `int v[5]` tiene los índices `0, 1, 2, 3, 4`. **No existe** `v[5]`. Este es el error más frecuente y peligroso de todo el lenguaje C.

```
Índice:     0    1    2    3    4
          +----+----+----+----+----+
v[5]  =   | 90 | 85 | 70 | 88 | 95 |
          +----+----+----+----+----+
```

---

## 2. Declaración e inicialización

```c
int v[5];                         // sin inicializar (contiene basura)
int v[5] = {10, 20, 30, 40, 50};  // inicializado con valores
int v[5] = {0};                   // TODOS los elementos en 0
int v[]  = {1, 2, 3};             // el compilador deduce el tamaño (3)
```

| Forma | Resultado |
|-------|-----------|
| `int v[3];` | Tres enteros con valores indefinidos (basura) |
| `int v[3] = {1, 2, 3};` | `v[0]=1, v[1]=2, v[2]=3` |
| `int v[3] = {1};` | `v[0]=1, v[1]=0, v[2]=0` (el resto se rellena con 0) |
| `int v[3] = {0};` | Todos en 0 |
| `int v[] = {1, 2, 3, 4};` | Tamaño deducido: 4 |

!!! warning "Un arreglo sin inicializar contiene basura"
    Declarar `int v[5];` **no** pone los elementos en cero. Contienen lo que hubiera en esa zona de memoria. Si necesitas que empiecen en 0, inicialízalos explícitamente con `{0}`.

---

## 3. Acceso y recorrido con ciclos

El verdadero poder del arreglo aparece cuando se combina con un ciclo `for`: una sola línea de código procesa todos los elementos.

### Llenar un arreglo

```c
int v[5];
for (int i = 0; i < 5; i++) {
    printf("Ingrese el elemento %d: ", i + 1);
    scanf("%d", &v[i]);
}
```

### Mostrar un arreglo

```c
for (int i = 0; i < 5; i++) {
    printf("v[%d] = %d\n", i, v[i]);
}
```

!!! tip "Define el tamaño como constante"
    Repetir el número `5` por todo el programa es frágil: si mañana son 100 elementos, tendrás que cambiarlo en cada ciclo. Define el tamaño una sola vez:

    ```c
    #define N 5
    int v[N];
    for (int i = 0; i < N; i++) { ... }
    ```

    Así, cambiar `N` ajusta el programa entero.

---

## 4. Patrones fundamentales con arreglos

### Suma y promedio

```c
int suma = 0;
for (int i = 0; i < N; i++) {
    suma += v[i];
}
float promedio = (float) suma / N;   // cast para no perder decimales
```

### Máximo y mínimo

```c
int mayor = v[0];                    // se asume el primero como mayor
for (int i = 1; i < N; i++) {        // se empieza en 1
    if (v[i] > mayor) {
        mayor = v[i];
    }
}
```

!!! danger "Nunca inicialices el máximo en 0"
    Un error clásico es escribir `int mayor = 0;`. Si todos los elementos son negativos, el resultado sería incorrecto. Inicializa siempre con el **primer elemento** del arreglo (`v[0]`) y recorre desde el índice 1.

### Búsqueda lineal

```c
int buscado = 70, pos = -1;
for (int i = 0; i < N; i++) {
    if (v[i] == buscado) {
        pos = i;
        break;            // se encontró, no hay que seguir
    }
}
if (pos != -1) {
    printf("Encontrado en la posicion %d\n", pos);
} else {
    printf("No se encontro.\n");
}
```

---

## 5. Arreglos bidimensionales (matrices)

Una **matriz** es un arreglo de arreglos: una tabla con filas y columnas. Se declara con dos índices.

```c
int m[3][4];          // 3 filas, 4 columnas
```

```
            col 0  col 1  col 2  col 3
fila 0  →  [ m[0][0]  m[0][1]  m[0][2]  m[0][3] ]
fila 1  →  [ m[1][0]  m[1][1]  m[1][2]  m[1][3] ]
fila 2  →  [ m[2][0]  m[2][1]  m[2][2]  m[2][3] ]
```

### Recorrido con ciclos anidados

Una matriz se recorre con **dos ciclos**: el externo para las filas, el interno para las columnas.

```c
#define FILAS 3
#define COLS  4

int m[FILAS][COLS];

for (int f = 0; f < FILAS; f++) {
    for (int c = 0; c < COLS; c++) {
        printf("Elemento [%d][%d]: ", f, c);
        scanf("%d", &m[f][c]);
    }
}
```

### Inicialización de una matriz

```c
int m[2][3] = {
    {1, 2, 3},      // fila 0
    {4, 5, 6}       // fila 1
};
```

!!! note "La memoria sigue siendo lineal"
    Aunque dibujamos la matriz como una tabla, en memoria sus elementos están uno tras otro: primero toda la fila 0, luego toda la fila 1, etc. (orden *row-major*). Esta es la razón por la que en C **debes** especificar el número de columnas al pasar una matriz a una función.

---

## 6. Arreglos y funciones (adelanto)

Cuando pasas un arreglo a una función, **no se copia**: la función recibe la dirección del primer elemento. Esto significa que la función puede **modificar** el arreglo original. Lo estudiaremos a fondo en las Sesiones 6 y 7, pero conviene saberlo desde ahora.

```c
void mostrar(int v[], int n) {       // recibe el arreglo y su tamaño
    for (int i = 0; i < n; i++) {
        printf("%d ", v[i]);
    }
    printf("\n");
}
```

!!! warning "El arreglo no conoce su propio tamaño"
    Dentro de una función, `sizeof(v)` **no** da el tamaño del arreglo: da el tamaño de un apuntador. Por eso siempre se pasa el tamaño como un parámetro adicional (`int n`).

---

## 7. Errores comunes con arreglos

### Salirse de los límites (*out of bounds*)

```c
int v[5];
v[5] = 100;     // INCORRECTO: el último índice válido es 4
```

C **no verifica** los límites. Escribir fuera del arreglo no genera error de compilación: corrompe memoria ajena y produce fallos impredecibles (el temido *segmentation fault* o, peor, datos corruptos silenciosos).

### Olvidar que el índice empieza en 0

```c
for (int i = 1; i <= 5; i++) {   // INCORRECTO: omite v[0] y accede a v[5]
    scanf("%d", &v[i]);
}
```

### Comparar arreglos con `==`

```c
if (v1 == v2)   // INCORRECTO: compara direcciones, no contenido
```

Para comparar dos arreglos hay que recorrerlos elemento por elemento.

### Asignar un arreglo completo a otro

```c
int a[3] = {1, 2, 3};
int b[3];
b = a;          // INCORRECTO: no compila. Hay que copiar con un ciclo
```

### Perder decimales en el promedio

```c
int suma = 90;
float prom = suma / 4;        // INCORRECTO: división entera, da 22.0
float prom = (float) suma / 4; // CORRECTO: da 22.5
```
