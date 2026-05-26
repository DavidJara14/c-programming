# ¿Qué es programar?

> *"Todo el mundo debería aprender a programar una computadora, porque te enseña cómo pensar."*
> — **Steve Jobs**, 1995

---

## La idea central

Programar es el acto de darle **instrucciones precisas a una computadora** para que resuelva un problema. Una computadora no piensa, no infiere, no adivina: ejecuta exactamente lo que se le dice, en el orden que se le indica, sin excepción.

Esa es la clave: **precisión total**. Cuando escribes un programa, no hay ambigüedad. La máquina hará exactamente lo que escribiste — ni más, ni menos — y si algo está mal, el error es tuyo.

---

## Una analogía cotidiana

Imagina que tienes que escribirle instrucciones a alguien que **nunca ha cocinado**, no conoce el idioma, no puede improvisar y seguirá cada paso al pie de la letra.

Si escribes: *"Hierve agua y echa la pasta"*, falla. ¿Cuánta agua? ¿En qué recipiente? ¿A qué temperatura? ¿Cuánta pasta? ¿Por cuánto tiempo?

Un programa debe ser así de específico:

```
1. Tomar una olla de 3 litros
2. Llenarla con 2 litros de agua
3. Colocarla en la estufa a fuego alto
4. Esperar hasta que el agua hierva (100°C)
5. Agregar 200 gramos de pasta
6. Esperar 8 minutos
7. Colar la pasta
8. Apagar la estufa
```

Eso es un **algoritmo**: una secuencia finita de pasos bien definidos que resuelven un problema.

---

## Del algoritmo al código

El camino de un programa en C es:

```
Problema  →  Algoritmo  →  Código fuente (.c)  →  Compilación  →  Ejecutable (.exe)
```

| Etapa | ¿Qué sucede? | ¿Quién lo hace? |
|-------|-------------|-----------------|
| **Algoritmo** | Defines la lógica paso a paso (pseudocódigo o diagrama) | Tú |
| **Código fuente** | Traduces el algoritmo a C | Tú |
| **Compilación** | El código C se convierte a lenguaje de máquina | El compilador (GCC) |
| **Ejecución** | El procesador ejecuta las instrucciones | La computadora |

---

## ¿Qué puede hacer un programa?

Todo programa, sin importar su complejidad, hace alguna combinación de estas cuatro cosas:

- **Entrada (Input):** recibir datos del usuario, un archivo, la red, un sensor.
- **Proceso:** realizar cálculos, comparaciones, transformaciones.
- **Salida (Output):** mostrar resultados en pantalla, escribir en un archivo, enviar datos.
- **Almacenamiento:** guardar información en variables, arreglos, archivos.

El programa más simple del mundo — el famoso **"Hello, World!"** — solo hace salida. Fue Brian Kernighan quien lo usó por primera vez en un manual interno de Bell Labs en **1974**, y desde entonces es la tradición universal para aprender cualquier lenguaje.

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

Medio siglo después, ese mismo programa sigue siendo el primero que escribe cualquier programador.

---

## ¿Por qué aprender a programar?

No se trata solo de conseguir empleo (aunque el mercado es excelente). Programar desarrolla una forma de pensar:

- **Descomposición:** dividir un problema grande en partes pequeñas y manejables.
- **Patrones:** reconocer estructuras que se repiten y reutilizarlas.
- **Abstracción:** trabajar con ideas sin necesitar todos los detalles al mismo tiempo.
- **Depuración:** encontrar errores de forma sistemática y lógica, no por intuición.

Esas habilidades son útiles en cualquier disciplina: ingeniería, medicina, finanzas, arquitectura, diseño.

!!! tip "Dato para reflexionar"
    En 1983, el 100% de las computadoras del mundo eran operadas por especialistas. En 2025, hay más de **5,600 millones de usuarios** de smartphones — cada uno interactuando con docenas de programas al día. La programación dejó de ser una especialidad técnica y se convirtió en la infraestructura invisible del mundo moderno.
