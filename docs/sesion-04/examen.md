# Examen — Sesión 4: Arreglos

!!! note "Instrucciones"
    Examen de autoevaluación teórica. Resuélvelo **sin consultar** los apuntes ni el compilador; al terminar, contrasta con las respuestas desplegables de cada sección. Tiempo sugerido: **45 minutos**. Puntaje total: **100 puntos**.

!!! tip "Cómo aprovecharlo"
    Si fallas una pregunta, no basta con leer la respuesta: vuelve a la teoría, identifica el concepto y vuelve a intentar una variante. El objetivo es entender, no acertar.

---

## Parte A — Opción múltiple (40 pts, 5 c/u)

**1.** En el arreglo `int v[7];`, ¿cuál es el último índice válido?

- a) 7
- b) 6
- c) 8
- d) Depende del compilador

**2.** ¿Qué contiene `v` tras `int v[4] = {2};`?

- a) `2 2 2 2`
- b) `2 0 0 0`
- c) `2` y tres valores basura
- d) Error de compilación

**3.** ¿Qué hace `sizeof(v) / sizeof(v[0])` con `int v[10]`?

- a) Devuelve 10 (número de elementos)
- b) Devuelve 40
- c) Devuelve 4
- d) Devuelve el valor del primer elemento

**4.** ¿Por qué se inicializa el máximo con `v[0]` y no con `0`?

- a) Por costumbre, da igual
- b) Para que funcione aunque todos los elementos sean negativos
- c) Porque el índice 0 es especial
- d) Para ahorrar memoria

**5.** En `int m[3][5];`, ¿cuántos elementos enteros hay en total?

- a) 8
- b) 15
- c) 35
- d) 3

**6.** ¿Qué ocurre al ejecutar `v[10] = 5;` en un arreglo `int v[10];`?

- a) Error de compilación seguro
- b) Comportamiento indefinido: escribe fuera de los límites
- c) Se agranda el arreglo automáticamente
- d) Se asigna a `v[0]`

**7.** Para recorrer una matriz `m[F][C]` por columnas, el ciclo externo debe iterar sobre:

- a) las filas
- b) las columnas
- c) los elementos en orden lineal
- d) da igual el orden

**8.** ¿Cuál de estas asignaciones es válida en C?

- a) `b = a;` (copiar un arreglo entero)
- b) `if (a == b)` (comparar dos arreglos)
- c) `v[i] = v[i] + 1;`
- d) `int v[] ;` (sin tamaño ni inicialización)

??? success "Respuestas Parte A"
    | # | Resp. | Justificación |
    |---|-------|---------------|
    | 1 | **b** | Índices de 0 a N−1, es decir 0 a 6 |
    | 2 | **b** | El primero toma 2; el resto se rellena con 0 |
    | 3 | **a** | bytes totales / bytes de un elemento = número de elementos |
    | 4 | **b** | Con `0`, un arreglo todo-negativo daría un máximo erróneo |
    | 5 | **b** | Una matriz `m[3][5]` tiene 3 × 5 = 15 elementos |
    | 6 | **b** | C no verifica límites: es comportamiento indefinido |
    | 7 | **b** | Para sumar/recorrer por columnas, el externo recorre columnas |
    | 8 | **c** | Solo el acceso indexado es válido; arreglos no se copian ni comparan con `=`/`==` |

---

## Parte B — Verdadero o Falso (20 pts, 4 c/u)

Indica V o F y **justifica** las falsas.

1. Declarar `int v[5];` deja todos los elementos en cero. `____`
2. Los elementos de un arreglo ocupan posiciones contiguas en memoria. `____`
3. `v[5]` es un índice válido en `int v[5];`. `____`
4. Una matriz en C se almacena internamente fila por fila (*row-major*). `____`
5. Pasar un arreglo a una función copia todos sus elementos. `____`

??? success "Respuestas Parte B"
    1. **F** — Sin inicialización, contiene basura. Para ceros: `int v[5] = {0};`.
    2. **V** — Esa contigüidad es la base del acceso por índice.
    3. **F** — Los índices válidos van de 0 a 4; `v[5]` se sale de los límites.
    4. **V** — Primero toda la fila 0, luego la fila 1, etc.
    5. **F** — Se pasa la **dirección** del primer elemento; la función trabaja sobre el original.

---

## Parte C — ¿Qué imprime? (20 pts, 10 c/u)

Traza a mano la salida exacta.

**Código 1**

```c
int v[5] = {1, 2, 3};
int suma = 0;
for (int i = 0; i < 5; i++) suma += v[i];
printf("%d\n", suma);
```

**Código 2**

```c
int m[2][2] = {{1, 2}, {3, 4}};
int t = 0;
for (int i = 0; i < 2; i++)
    for (int j = 0; j < 2; j++)
        if (i == j) t += m[i][j];
printf("%d\n", t);
```

??? success "Respuestas Parte C"
    **Código 1 →** `6`. Los índices 3 y 4 valen 0 (inicialización parcial), así que la suma es 1+2+3+0+0 = 6.

    **Código 2 →** `5`. Solo suma la diagonal (`i == j`): `m[0][0]=1` y `m[1][1]=4`, total 5.

---

## Parte D — Detecta el error (10 pts)

Este código intenta llenar e imprimir un arreglo de 5 enteros, pero tiene **dos** errores. Encuéntralos y corrígelos.

```c
#include <stdio.h>
int main() {
    int v[5];
    for (int i = 1; i <= 5; i++) {
        scanf("%d", v[i]);
    }
    return 0;
}
```

??? success "Respuesta Parte D"
    1. **Índices fuera de rango:** el ciclo va de 1 a 5, pero debe ir de 0 a 4. `for (int i = 0; i < 5; i++)`.
    2. **Falta el operador `&` en `scanf`:** debe ser `scanf("%d", &v[i]);` para pasar la dirección.

    ```c
    for (int i = 0; i < 5; i++) {
        scanf("%d", &v[i]);
    }
    ```

---

## Parte E — Desarrollo (10 pts)

Explica con tus palabras, en 3–5 líneas, por qué la siguiente afirmación es peligrosa:

> *"Como C no verifica los límites de un arreglo, escribir en `v[100]` de un arreglo de tamaño 10 simplemente no hace nada."*

??? success "Respuesta orientativa Parte E"
    La afirmación es falsa y peligrosa. Escribir en `v[100]` **sí** modifica memoria: la que esté en esa dirección, que puede pertenecer a otras variables, a la pila o a estructuras del programa. El resultado es *comportamiento indefinido*: puede causar un fallo inmediato (*segmentation fault*), corromper datos de forma silenciosa o, en sistemas reales, abrir una vulnerabilidad de seguridad (*buffer overflow*). La responsabilidad de respetar los límites es **del programador**, no del lenguaje.
