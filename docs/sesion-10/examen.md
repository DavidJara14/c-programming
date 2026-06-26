# Examen — Sesión 10: Archivos

!!! note "Instrucciones"
    Examen de autoevaluación teórica. Resuélvelo **sin consultar** apuntes ni compilador; contrasta después con las respuestas desplegables. Tiempo sugerido: **45 minutos**. Puntaje total: **100 puntos**.

---

## Parte A — Opción múltiple (40 pts, 5 c/u)

**1.** ¿Qué tipo se usa para manejar un archivo abierto?

- a) `int`
- b) `FILE *`
- c) `char *`
- d) `void`

**2.** ¿Qué devuelve `fopen` si no puede abrir el archivo?

- a) 0
- b) −1
- c) `NULL`
- d) `EOF`

**3.** ¿Qué hace el modo `"w"` con un archivo que **ya existe**?

- a) Añade al final
- b) Borra su contenido
- c) Falla
- d) Lo abre solo para lectura

**4.** Para **añadir** datos sin borrar el contenido previo, ¿qué modo se usa?

- a) `"r"`
- b) `"w"`
- c) `"a"`
- d) `"x"`

**5.** ¿Cuál es la firma correcta para escribir con formato en un archivo?

- a) `fprintf("%d", f, x)`
- b) `fprintf(f, "%d", x)`
- c) `printf(f, "%d", x)`
- d) `fscanf(f, "%d", x)`

**6.** ¿Por qué es importante llamar a `fclose`?

- a) Para liberar el archivo y asegurar que los datos se guarden
- b) Porque si no, el programa no compila
- c) Para borrar el archivo
- d) No es importante

**7.** ¿Cuál es la forma recomendada de leer un archivo hasta el final?

- a) `while (!feof(f))`
- b) Controlar el ciclo con el valor de retorno de `fscanf`/`fgets`
- c) Leer exactamente 100 veces
- d) Usar `fopen` en un bucle

**8.** ¿Por qué `fgetc` devuelve un `int` y no un `char`?

- a) Por un error histórico
- b) Para poder representar `EOF`, que no cabe en un `char`
- c) Porque los archivos son enteros
- d) Para ahorrar memoria

??? success "Respuestas Parte A"
    | # | Resp. | Justificación |
    |---|-------|---------------|
    | 1 | **b** | `FILE *` representa el archivo abierto |
    | 2 | **c** | Devuelve `NULL` ante fallo; siempre verificarlo |
    | 3 | **b** | `"w"` borra el contenido existente |
    | 4 | **c** | `"a"` (*append*) escribe al final sin borrar |
    | 5 | **b** | Primero el archivo, luego formato y argumentos |
    | 6 | **a** | Vacía el búfer a disco y libera el recurso |
    | 7 | **b** | Controlar por el retorno evita leer la última línea dos veces |
    | 8 | **b** | `EOF` (−1) necesita un rango mayor que el de `char` |

---

## Parte B — Verdadero o Falso (20 pts, 4 c/u)

1. El modo `"r"` crea el archivo si no existe. `____`
2. `fprintf` funciona igual que `printf`, pero escribe en un archivo. `____`
3. Olvidar `fclose` puede provocar que datos escritos no se guarden. `____`
4. Usar `feof` como condición del ciclo es la forma más segura de leer un archivo. `____`
5. Se pueden tener varios archivos abiertos al mismo tiempo. `____`

??? success "Respuestas Parte B"
    1. **F** — `"r"` **falla** (devuelve `NULL`) si el archivo no existe; es `"w"`/`"a"` los que lo crean.
    2. **V** — Solo cambia que el primer argumento es el `FILE *`.
    3. **V** — Los datos pueden quedar en el búfer sin volcarse a disco.
    4. **F** — `feof` se activa tras una lectura fallida; suele procesar la última línea dos veces.
    5. **V** — Cada uno con su propio `FILE *` y su `fclose`.

---

## Parte C — Análisis (20 pts, 10 c/u)

**Código 1 — ¿Qué pasa con el archivo `datos.txt` (que ya contenía texto) tras esto?**

```c
FILE *f = fopen("datos.txt", "w");
fprintf(f, "nuevo\n");
fclose(f);
```

**Código 2 — ¿Qué imprime, suponiendo que `nums.txt` contiene `3 6 9`?**

```c
FILE *f = fopen("nums.txt", "r");
int x, suma = 0;
while (fscanf(f, "%d", &x) == 1) suma += x;
fclose(f);
printf("%d\n", suma);
```

??? success "Respuestas Parte C"
    **Código 1 →** El contenido anterior de `datos.txt` se **borra por completo**; al final el archivo contiene únicamente la línea `nuevo`. El modo `"w"` trunca el archivo al abrirlo.

    **Código 2 →** `18`. El ciclo lee 3, 6 y 9 (acumulando 18) y termina cuando `fscanf` deja de devolver 1 al llegar al final.

---

## Parte D — Detecta el error (10 pts)

Este programa intenta leer un archivo, pero tiene **dos** problemas. Encuéntralos.

```c
#include <stdio.h>
int main() {
    FILE *f = fopen("datos.txt", "w");
    int x;
    fscanf(f, "%d", &x);
    printf("%d\n", x);
    return 0;
}
```

??? success "Respuesta Parte D"
    1. **Modo incorrecto:** el archivo se abre en `"w"` (escritura) pero se intenta **leer** con `fscanf`. Debe abrirse en `"r"`.
    2. **Falta verificar `fopen` y cerrar:** no se comprueba si `f` es `NULL` ni se llama `fclose(f)`.

    ```c
    FILE *f = fopen("datos.txt", "r");
    if (f == NULL) { printf("No se pudo abrir.\n"); return 1; }
    int x;
    fscanf(f, "%d", &x);
    printf("%d\n", x);
    fclose(f);
    ```

---

## Parte E — Desarrollo (10 pts)

Explica en 4–6 líneas por qué los archivos son necesarios si ya tenemos variables y memoria dinámica. ¿Qué problema resuelven que la memoria no puede?

??? success "Respuesta orientativa Parte E"
    Las variables y la memoria dinámica viven en la memoria RAM, que es **volátil**: todo su contenido se pierde cuando el programa termina o la computadora se apaga. Los archivos guardan los datos en el disco, que es **persistente**, de modo que la información sobrevive entre ejecuciones y entre encendidos del equipo. Esto es lo que permite que un programa "recuerde": una agenda conserva sus contactos, un juego guarda la partida, un sistema escolar mantiene las calificaciones aunque se cierre y se vuelva a abrir días después. Sin archivos, cada ejecución empezaría desde cero.
