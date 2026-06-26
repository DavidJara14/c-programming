# Examen — Sesión 7: Apuntadores I

!!! note "Instrucciones"
    Examen de autoevaluación teórica. Resuélvelo **sin consultar** apuntes ni compilador; contrasta después con las respuestas desplegables. Tiempo sugerido: **50 minutos**. Puntaje total: **100 puntos**.

!!! warning "El examen más conceptual del curso"
    Los apuntadores se entienden razonando, no memorizando. En cada pregunta, pregúntate: ¿esto es una **dirección** o un **valor**?

---

## Parte A — Opción múltiple (40 pts, 5 c/u)

**1.** ¿Qué guarda un apuntador?

- a) Un valor numérico cualquiera
- b) Una dirección de memoria
- c) Una copia de otra variable
- d) Una cadena de texto

**2.** ¿Qué significa `&x`?

- a) El valor de `x`
- b) La dirección de `x`
- c) El doble de `x`
- d) Un apuntador nulo

**3.** Dado `int x = 5; int *p = &x;`, ¿qué imprime `printf("%d", *p)`?

- a) La dirección de `x`
- b) 5
- c) Basura
- d) La dirección de `p`

**4.** ¿Qué hace `*p = 20;` si `p` apunta a `x`?

- a) Asigna 20 a `p`
- b) Asigna 20 a `x`
- c) Crea una variable nueva
- d) Error de compilación

**5.** ¿Por qué `scanf("%d", &edad)` necesita el `&`?

- a) Por costumbre histórica
- b) Para que `scanf` reciba la dirección y pueda modificar `edad`
- c) Porque `edad` es un apuntador
- d) No lo necesita realmente

**6.** ¿Cuál es la firma correcta de una función que intercambia dos enteros?

- a) `void swap(int a, int b)`
- b) `void swap(int *a, int *b)`
- c) `int swap(int a, int b)`
- d) `void swap(int &a, int &b)`

**7.** En un arreglo `int v[5];`, ¿a qué equivale `*(v + 2)`?

- a) `v + 2`
- b) `v[2]`
- c) `&v[2]`
- d) La dirección del arreglo

**8.** ¿Qué valor debe darse a un apuntador que aún no apunta a nada válido?

- a) 0.0
- b) `NULL`
- c) `-1`
- d) `void`

??? success "Respuestas Parte A"
    | # | Resp. | Justificación |
    |---|-------|---------------|
    | 1 | **b** | Un apuntador almacena una dirección |
    | 2 | **b** | `&` es "dirección de" |
    | 3 | **b** | `*p` desreferencia: da el valor apuntado, 5 |
    | 4 | **b** | Modifica el contenido apuntado, es decir `x` |
    | 5 | **b** | `scanf` necesita la dirección para escribir en tu variable |
    | 6 | **b** | Debe recibir apuntadores para modificar los originales |
    | 7 | **b** | `*(v+i)` es exactamente `v[i]` |
    | 8 | **b** | `NULL` señala "no apunta a nada" |

---

## Parte B — Verdadero o Falso (20 pts, 4 c/u)

1. `*(&x)` es igual a `x`. `____`
2. El nombre de un arreglo equivale a la dirección de su primer elemento. `____`
3. En paso por valor, una función puede modificar la variable original del que la llama. `____`
4. Desreferenciar un apuntador `NULL` es seguro. `____`
5. `v[i]` y `*(v + i)` producen el mismo resultado. `____`

??? success "Respuestas Parte B"
    1. **V** — `&` y `*` son operaciones inversas.
    2. **V** — Por eso los arreglos se modifican dentro de funciones.
    3. **F** — Paso por valor copia; para modificar el original se usan apuntadores.
    4. **F** — Provoca un fallo grave (*segmentation fault*).
    5. **V** — El compilador traduce `v[i]` a `*(v+i)`.

---

## Parte C — ¿Qué imprime? (20 pts, 10 c/u)

**Código 1**

```c
int x = 7;
int *p = &x;
*p = *p + 3;
printf("%d\n", x);
```

**Código 2**

```c
void f(int *a, int *b) {
    *a = *a + *b;
    *b = *a - *b;
    *a = *a - *b;
}
int main() {
    int x = 4, y = 9;
    f(&x, &y);
    printf("%d %d\n", x, y);
    return 0;
}
```

??? success "Respuestas Parte C"
    **Código 1 →** `10`. `*p` modifica `x`: 7 + 3 = 10.

    **Código 2 →** `9 4`. Es un intercambio sin variable temporal: deja `x=9`, `y=4`.

---

## Parte D — Detecta el error (10 pts)

Esta función debería duplicar el valor de la variable original, pero no funciona. Encuentra y corrige el error.

```c
void duplicar(int *p) {
    p = p * 2;
}
int main() {
    int n = 8;
    duplicar(&n);
    printf("%d\n", n);   // se espera 16
    return 0;
}
```

??? success "Respuesta Parte D"
    El error está en `p = p * 2;`: opera sobre el **apuntador** (la dirección), no sobre el valor apuntado. Debe desreferenciarse:

    ```c
    void duplicar(int *p) {
        *p = *p * 2;
    }
    ```

    Con `*p`, se multiplica el contenido y el cambio se refleja en `n`.

---

## Parte E — Desarrollo (10 pts)

En la Sesión 6 vimos que una función `intercambiar(int a, int b)` no logra intercambiar las variables del `main`. Explica en 4–6 líneas **por qué** falla esa versión y **cómo** los apuntadores resuelven el problema.

??? success "Respuesta orientativa Parte E"
    La versión con paso por valor falla porque C **copia** los argumentos: `a` y `b` dentro de la función son copias locales de las variables del `main`. Intercambiar las copias no afecta a los originales, que permanecen intactos. Con apuntadores, en cambio, la función recibe las **direcciones** de las variables (`&x`, `&y`). Al desreferenciar (`*a`, `*b`), la función accede y modifica directamente la memoria de las variables originales, de modo que el intercambio sí se refleja fuera de la función. La clave es pasar *dónde vive* el dato, no una copia de su valor.
