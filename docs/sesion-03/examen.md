# Examen — Sesión 3: Ciclos

!!! note "Instrucciones"
    Examen de autoevaluación teórica. Resuélvelo **sin consultar** apuntes ni compilador; contrasta después con las respuestas desplegables. Tiempo sugerido: **40 minutos**. Puntaje total: **100 puntos**.

---

## Parte A — Opción múltiple (40 pts, 5 c/u)

**1.** ¿Cuáles son los tres elementos de todo ciclo?

- a) Inicio, fin, pausa
- b) Inicialización, condición, avance
- c) Variable, función, retorno
- d) Entrada, proceso, salida

**2.** ¿Qué ciclo garantiza ejecutarse **al menos una vez**?

- a) `for`
- b) `while`
- c) `do-while`
- d) Ninguno

**3.** ¿Cuántas veces imprime `for (int i = 0; i < 5; i++)`?

- a) 4
- b) 5
- c) 6
- d) Infinitas

**4.** ¿Qué hace la instrucción `break` dentro de un ciclo?

- a) Salta a la siguiente iteración
- b) Termina el ciclo por completo
- c) Reinicia el ciclo
- d) Pausa el programa

**5.** ¿Qué hace `continue`?

- a) Termina el ciclo
- b) Salta el resto del cuerpo y pasa a la siguiente iteración
- c) Sale del programa
- d) No hace nada

**6.** Un acumulador para una **suma** debe inicializarse en…

- a) 1
- b) 0
- c) el primer valor
- d) −1

**7.** Un acumulador para un **producto** (factorial) debe inicializarse en…

- a) 0
- b) 1
- c) el número
- d) 10

**8.** En ciclos anidados, el ciclo interno…

- a) se ejecuta una sola vez
- b) completa todas sus iteraciones por cada vuelta del externo
- c) no puede usar su propia variable
- d) reemplaza al externo

??? success "Respuestas Parte A"
    | # | Resp. | Justificación |
    |---|-------|---------------|
    | 1 | **b** | Inicialización, condición y avance |
    | 2 | **c** | `do-while` evalúa al final |
    | 3 | **b** | De 0 a 4 son 5 iteraciones |
    | 4 | **b** | `break` sale del ciclo |
    | 5 | **b** | `continue` salta a la siguiente iteración |
    | 6 | **b** | Una suma arranca en 0 (elemento neutro de la suma) |
    | 7 | **b** | Un producto arranca en 1 (elemento neutro del producto) |
    | 8 | **b** | El interno se completa por cada iteración del externo |

---

## Parte B — Verdadero o Falso (20 pts, 4 c/u)

1. Un `for` y un `while` pueden resolver el mismo problema. `____`
2. Olvidar el avance en un `while` puede causar un ciclo infinito. `____`
3. `for (int i = 0; i <= 10; i++)` se ejecuta 10 veces. `____`
4. En ciclos anidados conviene usar la misma variable de control para ambos. `____`
5. El `do-while` lleva un punto y coma después de la condición. `____`

??? success "Respuestas Parte B"
    1. **V** — Son intercambiables; cambia dónde van inicialización y avance.
    2. **V** — Si la condición nunca cambia, el ciclo no termina.
    3. **F** — De 0 a 10 inclusive son **11** iteraciones (error *off-by-one*).
    4. **F** — Cada ciclo necesita su **propia** variable de control.
    5. **V** — `} while (cond);` requiere el `;` final.

---

## Parte C — ¿Qué imprime? (20 pts, 10 c/u)

**Código 1**

```c
int suma = 0;
for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;
    suma += i;
}
printf("%d\n", suma);
```

**Código 2**

```c
for (int f = 1; f <= 3; f++) {
    for (int c = 1; c <= f; c++) {
        printf("*");
    }
    printf("\n");
}
```

??? success "Respuestas Parte C"
    **Código 1 →** `12`. Suma 1+2+4+5 = 12; el `continue` salta el 3.

    **Código 2 →**
    ```
    *
    **
    ***
    ```
    El interno imprime tantos asteriscos como el número de fila (`c <= f`).

---

## Parte D — Detecta el error (10 pts)

Este ciclo debería imprimir "Hola" cinco veces, pero solo lo imprime una vez. Encuentra el error.

```c
for (int i = 0; i < 5; i++);
    printf("Hola\n");
```

??? success "Respuesta Parte D"
    Hay un **punto y coma de más** tras el `for`: `for (...);`. Ese `;` convierte el cuerpo del ciclo en vacío, así que el `for` solo "cuenta" del 0 al 4 sin hacer nada, y el `printf` —que está fuera del ciclo— se ejecuta una sola vez. La corrección es quitar el `;` y, preferiblemente, usar llaves:

    ```c
    for (int i = 0; i < 5; i++) {
        printf("Hola\n");
    }
    ```

---

## Parte E — Desarrollo (10 pts)

Explica en 3–5 líneas cómo decides entre usar `for`, `while` o `do-while`. Da un ejemplo de situación ideal para cada uno.

??? success "Respuesta orientativa Parte E"
    Se elige según lo que se sabe del número de repeticiones: el **`for`** es ideal cuando se conoce de antemano cuántas veces se repetirá (recorrer un arreglo de tamaño `N`, contar del 1 al 100), porque reúne inicialización, condición y avance en una línea. El **`while`** conviene cuando la cantidad de repeticiones depende de una condición que puede cambiar y no se sabe de antemano (leer datos hasta encontrar un centinela, dividir un número entre 10 hasta que llegue a 0). El **`do-while`** se usa cuando el cuerpo debe ejecutarse al menos una vez, típicamente menús y validación de entradas que deben pedirse como mínimo una vez.
