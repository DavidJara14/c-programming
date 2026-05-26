# Programación en C

Bienvenida al curso intensivo de programación en **Lenguaje C**. Este material cubre los fundamentos esenciales del lenguaje en 10 sesiones de 90 minutos, acompañado de una lección introductoria de contexto histórico.

---

## Temario del curso

| # | Sesión | Tema principal |
|---|--------|----------------|
| 0 | [Contexto e Historia](leccion-00/que-es-programar.md) | Qué es programar, historia, niveles de lenguaje, impacto actual |
| 1 | [Introducción y Variables](sesion-01/teoria.md) | Estructura de un programa C, tipos de datos, `printf`, `scanf` |
| 2 | [Condicionales](sesion-02/teoria.md) | `if`, `else`, `switch`, operadores lógicos y relacionales |
| 3 | [Ciclos](sesion-03/teoria.md) | `for`, `while`, `do-while`, iteraciones anidadas |
| 4 | [Arreglos](sesion-04/teoria.md) | Arreglos 1D y 2D, recorrido, búsqueda, matrices |
| 5 | [Cadenas](sesion-05/teoria.md) | `char[]`, `\0`, `fgets`, funciones de `string.h` |
| 6 | [Funciones](sesion-06/teoria.md) | Declaración, prototipos, parámetros, ámbito, modularización |
| 7 | [Apuntadores I](sesion-07/teoria.md) | Direcciones de memoria, operadores `&` y `*`, paso por referencia |
| 8 | [Apuntadores II y Memoria Dinámica](sesion-08/teoria.md) | `malloc`, `free`, arreglos dinámicos |
| 9 | [Estructuras](sesion-09/teoria.md) | `struct`, acceso con `.` y `->`, arreglos de estructuras |
| 10 | [Archivos](sesion-10/teoria.md) | `fopen`, `fprintf`, `fscanf`, `fclose`, integración con estructuras |

---

## Historia del Lenguaje C

> *"C is quirky, flawed, and an enormous success."*
> — **Dennis M. Ritchie**, creador del lenguaje C

El lenguaje C nació en **1972** en los **Laboratorios Bell** de AT&T, de la mano de **Dennis Ritchie**. No fue un proyecto académico ni un experimento de laboratorio: nació de una necesidad real. Ken Thompson y Dennis Ritchie necesitaban un lenguaje con el que reescribir el sistema operativo **UNIX**, que hasta entonces estaba programado en ensamblador — lento de escribir, difícil de mantener e imposible de portar a otro hardware.

C resolvió ese problema de forma elegante: era lo suficientemente cercano al hardware para ser eficiente, y lo suficientemente abstracto para ser legible y portátil. En **1973**, el kernel de UNIX fue reescrito casi completamente en C. Ese fue el momento en que la industria cambió para siempre.

### Línea del tiempo

| Año | Evento |
|-----|--------|
| 1969 | Ken Thompson crea el lenguaje B, predecesor directo de C |
| 1972 | Dennis Ritchie desarrolla C en Bell Labs |
| 1973 | El kernel de UNIX es reescrito en C |
| 1978 | Kernighan y Ritchie publican *"The C Programming Language"* (K&R) |
| 1989 | ANSI estandariza el lenguaje: **C89 / ANSI C** |
| 1990 | ISO adopta el estándar: **C90** |
| 1999 | Se publican mejoras importantes: **C99** (tipos `_Bool`, `//` comentarios) |
| 2011 | Nueva revisión: **C11** (soporte para hilos, `_Generic`) |
| 2017 | Correcciones menores: **C17** |
| 2023 | Versión más reciente: **C23** |

### ¿Por qué C sigue siendo relevante en 2025?

- El **kernel de Linux** — que corre en el 97% de los servidores del mundo — está escrito en C.
- Los **microcontroladores** en autos, electrodomésticos, marcapasos y satélites se programan en C.
- Los intérpretes de **Python**, **Ruby** y **PHP** están escritos en C.
- Aprender C te da una comprensión real de cómo funciona la memoria, el compilador y el hardware — conocimiento que ningún lenguaje de alto nivel te entrega.

---

## Herramientas necesarias

- [CodeBlocks](https://www.codeblocks.org/downloads/) — IDE recomendado, descarga la versión que incluye **MinGW**
- Compilador: **GCC** (incluido en la instalación de CodeBlocks con MinGW)
- Sistema operativo: Windows / Linux / macOS
