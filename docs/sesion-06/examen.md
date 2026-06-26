# Examen — Sesión 6: Funciones

!!! note "Instrucciones"
    Examen de autoevaluación teórica. Resuélvelo **sin consultar** apuntes ni compilador; contrasta después con las respuestas desplegables. Tiempo sugerido: **45 minutos**. Puntaje total: **100 puntos**.

---

## Parte A — Opción múltiple (40 pts, 5 c/u)

**1.** ¿Para qué sirve un prototipo de función?

- a) Para ejecutar la función automáticamente
- b) Para declarar su firma antes de usarla
- c) Para reservar memoria
- d) No sirve para nada en C

**2.** ¿Qué significa `void` como tipo de retorno?

- a) La función devuelve cero
- b) La función no devuelve ningún valor
- c) La función falló
- d) La función devuelve un puntero

**3.** En `int f(int x)`, llamada como `f(7)`, ¿qué es `7`?

- a) Un parámetro
- b) Un prototipo
- c) Un argumento
- d) Una variable global

**4.** Dado `void g(int x){ x = 100; }` y `int a = 5; g(a);`, ¿cuánto vale `a` después?

- a) 100
- b) 5
- c) 0
- d) Indefinido

**5.** ¿Qué le falta a toda función recursiva para no ejecutarse infinitamente?

- a) Un bucle `while`
- b) Una variable global
- c) Un caso base
- d) Un prototipo

**6.** Una variable **local** declarada dentro de una función…

- a) es visible en todo el programa
- b) solo existe mientras la función se ejecuta
- c) conserva su valor entre llamadas siempre
- d) debe ser global

**7.** ¿Cuál es la firma correcta de una función que recibe un arreglo de enteros y su tamaño y no devuelve nada?

- a) `int f(int v, int n)`
- b) `void f(int v[], int n)`
- c) `void f(int v[])`
- d) `int[] f(int n)`

**8.** ¿Por qué `intercambiar(a, b)` con paso por valor no intercambia las variables originales?

- a) Porque C no permite intercambios
- b) Porque la función trabaja sobre copias de los argumentos
- c) Porque falta el prototipo
- d) Porque `a` y `b` son globales

??? success "Respuestas Parte A"
    | # | Resp. | Justificación |
    |---|-------|---------------|
    | 1 | **b** | Anuncia la firma para que el compilador la conozca antes |
    | 2 | **b** | `void` = sin valor de retorno |
    | 3 | **c** | El valor concreto de la llamada es el argumento |
    | 4 | **b** | Paso por valor: solo cambia la copia local |
    | 5 | **c** | El caso base detiene la recursión |
    | 6 | **b** | Vive y muere con la ejecución de la función |
    | 7 | **b** | Arreglo + tamaño, sin retorno → `void f(int v[], int n)` |
    | 8 | **b** | Opera sobre copias, no sobre los originales |

---

## Parte B — Verdadero o Falso (20 pts, 4 c/u)

1. Una función `void` puede usar `return;` para salir antes de tiempo. `____`
2. Si una local y una global tienen el mismo nombre, dentro de la función gana la global. `____`
3. Pasar un arreglo a una función copia todos sus elementos. `____`
4. `math.h` provee funciones reutilizables como `sqrt` y `pow`. `____`
5. Una función puede llamarse a sí misma. `____`

??? success "Respuestas Parte B"
    1. **V** — `return;` sin valor es válido en funciones `void`.
    2. **F** — Gana la **local**; la global queda tapada dentro de la función.
    3. **F** — Se pasa la dirección del primer elemento, no una copia.
    4. **V** — Es el ejemplo clásico de reutilización mediante funciones.
    5. **V** — Eso es la recursión.

---

## Parte C — ¿Qué imprime? (20 pts, 10 c/u)

**Código 1**

```c
int misterio(int n) {
    if (n == 0) return 0;
    return n + misterio(n - 1);
}
int main() { printf("%d\n", misterio(4)); return 0; }
```

**Código 2**

```c
int x = 10;                 // global
void f(void) { x = x + 5; }
int main() {
    int x = 1;              // local, tapa a la global
    f();
    printf("%d\n", x);
    return 0;
}
```

??? success "Respuestas Parte C"
    **Código 1 →** `10`. Suma 4+3+2+1+0 = 10 (suma de 0 a n).

    **Código 2 →** `1`. La `x` de `main` es **local** y vale 1; `f()` modifica la **global**, no la local de `main`. Por eso `main` sigue imprimiendo 1.

---

## Parte D — Detecta el error (10 pts)

Esta función debería devolver el mayor de dos números, pero tiene un problema. Identifícalo y corrígelo.

```c
void mayor(int a, int b) {
    if (a > b)
        return a;
    else
        return b;
}
```

??? success "Respuesta Parte D"
    El tipo de retorno es `void`, pero la función intenta **devolver un valor**. Como debe devolver un `int`, su tipo de retorno tiene que ser `int`:

    ```c
    int mayor(int a, int b) {
        if (a > b) return a;
        else       return b;
    }
    ```

---

## Parte E — Desarrollo (10 pts)

Explica en 3–5 líneas qué ventajas aporta dividir un programa en funciones en lugar de escribir todo dentro de `main`. Menciona al menos tres.

??? success "Respuesta orientativa Parte E"
    Dividir en funciones aporta: **(1) reutilización** —el mismo cálculo se escribe una vez y se llama muchas—; **(2) legibilidad** —un nombre como `calcularPromedio` documenta la intención sin obligar a leer el detalle—; **(3) mantenimiento** —si hay un error, se corrige en un solo lugar—; y **(4) facilidad de prueba** —cada función se puede verificar de forma aislada—. En conjunto, el diseño modular permite atacar problemas grandes descomponiéndolos en piezas pequeñas y comprensibles.
