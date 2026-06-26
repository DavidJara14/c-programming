# Examen — Sesión 2: Condicionales

!!! note "Instrucciones"
    Examen de autoevaluación teórica. Resuélvelo **sin consultar** apuntes ni compilador; contrasta después con las respuestas desplegables. Tiempo sugerido: **40 minutos**. Puntaje total: **100 puntos**.

---

## Parte A — Opción múltiple (40 pts, 5 c/u)

**1.** ¿Qué operador compara si dos valores son iguales?

- a) `=`
- b) `==`
- c) `!=`
- d) `=>`

**2.** ¿Qué representa el valor "falso" en C?

- a) Cualquier número negativo
- b) El valor 0
- c) La letra `'F'`
- d) `NULL`

**3.** ¿Qué imprime `if (5) printf("Hola");`?

- a) Nada
- b) `Hola`
- c) Error de compilación
- d) `5`

**4.** El operador lógico `&&` es verdadero cuando…

- a) al menos una condición es verdadera
- b) ambas condiciones son verdaderas
- c) ambas son falsas
- d) las condiciones son distintas

**5.** ¿Qué tipo de dato **no** puede usarse en la expresión de un `switch`?

- a) `int`
- b) `char`
- c) `float`
- d) Un entero constante

**6.** ¿Qué ocurre si olvidas el `break` en un `case` del `switch`?

- a) Error de compilación
- b) La ejecución "cae" al siguiente `case` (*fall-through*)
- c) El programa se detiene
- d) Se ignora el `switch`

**7.** ¿Cuál es el peligro de escribir `if (x = 5)`?

- a) No compila nunca
- b) Asigna 5 a `x` y la condición siempre es verdadera
- c) Compara `x` con 5 correctamente
- d) Borra `x`

**8.** El operador ternario `(a > b) ? a : b` devuelve…

- a) siempre `a`
- b) el mayor de `a` y `b`
- c) el menor de `a` y `b`
- d) un valor booleano

??? success "Respuestas Parte A"
    | # | Resp. | Justificación |
    |---|-------|---------------|
    | 1 | **b** | `==` compara; `=` asigna |
    | 2 | **b** | 0 es falso; cualquier otro valor es verdadero |
    | 3 | **b** | 5 es distinto de 0, así que la condición es verdadera |
    | 4 | **b** | AND requiere ambas verdaderas |
    | 5 | **c** | `switch` solo trabaja con enteros/`char` |
    | 6 | **b** | Sin `break`, cae al siguiente caso |
    | 7 | **b** | Asignación en vez de comparación: siempre verdadera |
    | 8 | **b** | Devuelve `a` si `a>b`, si no `b`: el mayor |

---

## Parte B — Verdadero o Falso (20 pts, 4 c/u)

1. El operador `=` sirve para comparar dos valores. `____`
2. En `&&`, si la primera condición es falsa, la segunda no se evalúa. `____`
3. `switch` puede evaluar variables de tipo `float`. `____`
4. Comparar dos `float` con `==` siempre es seguro y exacto. `____`
5. `!(x > 5)` equivale a `x <= 5`. `____`

??? success "Respuestas Parte B"
    1. **F** — `=` asigna; comparar es `==`.
    2. **V** — Evaluación en cortocircuito: el AND ya es falso.
    3. **F** — Solo enteros o `char`.
    4. **F** — Los errores de representación pueden hacer fallar la igualdad; se compara con tolerancia.
    5. **V** — La negación de "mayor que 5" es "menor o igual que 5".

---

## Parte C — ¿Qué imprime? (20 pts, 10 c/u)

**Código 1**

```c
int x = 7;
if (x > 10)
    printf("A");
else if (x > 5)
    printf("B");
else
    printf("C");
```

**Código 2**

```c
int op = 2;
switch (op) {
    case 1: printf("uno ");
    case 2: printf("dos ");
    case 3: printf("tres "); break;
    default: printf("otro ");
}
```

??? success "Respuestas Parte C"
    **Código 1 →** `B`. `x > 10` es falso; `x > 5` es verdadero, así que entra en el segundo bloque.

    **Código 2 →** `dos tres `. Entra en `case 2`, imprime "dos ", y como no hay `break`, **cae** a `case 3` e imprime "tres " antes de cortar. Es el efecto *fall-through*.

---

## Parte D — Detecta el error (10 pts)

Este código debería imprimir "Positivo" solo cuando `x` es positivo, pero lo imprime siempre. Encuentra el error.

```c
int x = -3;
if (x > 0);
    printf("Positivo\n");
```

??? success "Respuesta Parte D"
    Hay un **punto y coma de más** justo después del `if`: `if (x > 0);`. Ese `;` cierra el `if` con un cuerpo vacío, así que el `printf` queda **fuera** del condicional y se ejecuta siempre. La corrección es quitar el `;` (y, como buena práctica, usar llaves):

    ```c
    if (x > 0) {
        printf("Positivo\n");
    }
    ```

---

## Parte E — Desarrollo (10 pts)

Explica en 3–5 líneas qué es la "evaluación en cortocircuito" de los operadores `&&` y `||`, y da un ejemplo donde aprovecharla evita un error en tiempo de ejecución.

??? success "Respuesta orientativa Parte E"
    En la evaluación en cortocircuito, C deja de evaluar una expresión lógica en cuanto el resultado ya está determinado: con `&&`, si la primera condición es falsa no evalúa la segunda (el AND ya es falso); con `||`, si la primera es verdadera no evalúa la segunda. Esto permite escribir, por ejemplo, `if (b != 0 && a / b > 10)`: como la división solo se evalúa cuando `b != 0` es verdadero, nunca ocurre una división entre cero. El orden de las condiciones, por tanto, importa: la "guarda" debe ir primero.
