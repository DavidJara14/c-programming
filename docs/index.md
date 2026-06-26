---
hide:
  - navigation
  - toc
---

<div class="hero" markdown>

<span class="hero__eyebrow">Curso intensivo · 10 sesiones · 90 min</span>

# Programación en <span class="accent">C</span>

Domina los fundamentos del lenguaje que sostiene al software moderno: desde variables y memoria hasta apuntadores, estructuras y archivos. Teoría clara, práctica guiada y ejercicios de nivel universitario.

[Comenzar el curso](leccion-00/que-es-programar.md){ .md-button .md-button--primary }
[Explorar el temario](#temario){ .md-button }

</div>

## Temario del curso { #temario }

El curso se compone de una lección introductoria de contexto y diez sesiones prácticas que cubren los fundamentos esenciales del lenguaje.

<div class="grid cards" markdown>

-   :material-book-open-page-variant:{ .lg .middle } __Lección 0 — Contexto__

    ---

    Historia de la computación, niveles de lenguaje y el impacto de la programación en el mundo actual.

    [:octicons-arrow-right-24: Comenzar aquí](leccion-00/que-es-programar.md)

-   :material-variable:{ .lg .middle } __Sesión 1 — Variables__

    ---

    Estructura de un programa, tipos de datos, constantes, `printf` y `scanf`.

    [:octicons-arrow-right-24: Ir a la sesión](sesion-01/teoria.md)

-   :material-source-branch:{ .lg .middle } __Sesión 2 — Condicionales__

    ---

    `if`, `else`, `switch`, operadores lógicos y relacionales, validación de entradas.

    [:octicons-arrow-right-24: Ir a la sesión](sesion-02/teoria.md)

-   :material-sync:{ .lg .middle } __Sesión 3 — Ciclos__

    ---

    `for`, `while`, `do-while`, variables de control e iteraciones anidadas.

    [:octicons-arrow-right-24: Ir a la sesión](sesion-03/teoria.md)

-   :material-view-grid:{ .lg .middle } __Sesión 4 — Arreglos__

    ---

    Arreglos unidimensionales y bidimensionales: recorrido, búsqueda y matrices.

    [:octicons-arrow-right-24: Ir a la sesión](sesion-04/teoria.md)

-   :material-format-quote-close:{ .lg .middle } __Sesión 5 — Cadenas__

    ---

    `char[]`, terminación `\0`, lectura segura con `fgets` y funciones de `string.h`.

    [:octicons-arrow-right-24: Ir a la sesión](sesion-05/teoria.md)

-   :material-function-variant:{ .lg .middle } __Sesión 6 — Funciones__

    ---

    Prototipos, parámetros, ámbito de variables y modularización del código.

    [:octicons-arrow-right-24: Ir a la sesión](sesion-06/teoria.md)

-   :material-map-marker:{ .lg .middle } __Sesión 7 — Apuntadores I__

    ---

    Direcciones de memoria, operadores `&` y `*`, paso por referencia.

    [:octicons-arrow-right-24: Ir a la sesión](sesion-07/teoria.md)

-   :material-memory:{ .lg .middle } __Sesión 8 — Memoria Dinámica__

    ---

    Apuntadores y arreglos, `malloc`, `free` y apuntadores dobles.

    [:octicons-arrow-right-24: Ir a la sesión](sesion-08/teoria.md)

-   :material-cube-outline:{ .lg .middle } __Sesión 9 — Estructuras__

    ---

    `struct`, acceso con `.` y `->`, arreglos de estructuras y paso a funciones.

    [:octicons-arrow-right-24: Ir a la sesión](sesion-09/teoria.md)

-   :material-file-document-outline:{ .lg .middle } __Sesión 10 — Archivos__

    ---

    `fopen`, modos de apertura, `fprintf`, `fscanf` e integración con estructuras.

    [:octicons-arrow-right-24: Ir a la sesión](sesion-10/teoria.md)

-   :material-trophy-outline:{ .lg .middle } __Exámenes Finales__

    ---

    Evaluación integradora: un examen final teórico y un examen práctico de programación de nivel desafiante.

    [:octicons-arrow-right-24: Ir a los exámenes](examen-final/teorico.md)

</div>

## Historia del Lenguaje C

> *"C is quirky, flawed, and an enormous success."* — **Dennis M. Ritchie**, creador del lenguaje C

El lenguaje C nació en **1972** en los **Laboratorios Bell** de AT&T, de la mano de **Dennis Ritchie**. No fue un proyecto académico: surgió de una necesidad real. Ken Thompson y Dennis Ritchie necesitaban un lenguaje con el que reescribir el sistema operativo **UNIX**, que hasta entonces estaba programado en ensamblador — lento de escribir, difícil de mantener e imposible de portar a otro hardware.

C resolvió ese problema de forma elegante: era lo suficientemente cercano al hardware para ser eficiente, y lo suficientemente abstracto para ser legible y portátil. En **1973**, el kernel de UNIX fue reescrito casi por completo en C. Ese fue el momento en que la industria cambió para siempre.

### Línea del tiempo

| Año | Evento |
|-----|--------|
| 1969 | Ken Thompson crea el lenguaje B, predecesor directo de C |
| 1972 | Dennis Ritchie desarrolla C en Bell Labs |
| 1973 | El kernel de UNIX es reescrito en C |
| 1978 | Kernighan y Ritchie publican *"The C Programming Language"* (K&R) |
| 1989 | ANSI estandariza el lenguaje: **C89 / ANSI C** |
| 1999 | Mejoras importantes: **C99** |
| 2011 | Nueva revisión: **C11** |
| 2023 | Versión más reciente: **C23** |

### ¿Por qué C sigue vigente?

<div class="grid cards" markdown>

-   :material-linux:{ .lg .middle } __Sistemas operativos__

    ---

    El kernel de **Linux** — presente en la mayoría de los servidores del mundo — está escrito en C.

-   :material-chip:{ .lg .middle } __Sistemas embebidos__

    ---

    Microcontroladores en autos, electrodomésticos, marcapasos y satélites se programan en C.

-   :material-language-python:{ .lg .middle } __Otros lenguajes__

    ---

    Los intérpretes de **Python**, **Ruby** y **PHP** están construidos en C.

-   :material-school:{ .lg .middle } __Comprensión profunda__

    ---

    Aprender C revela cómo funcionan la memoria, el compilador y el hardware.

</div>

## Herramientas necesarias

- [CodeBlocks](https://www.codeblocks.org/downloads/) — IDE recomendado; descarga la versión que incluye **MinGW**.
- Compilador **GCC**, incluido en la instalación de CodeBlocks con MinGW.
- Sistema operativo: Windows, Linux o macOS.
