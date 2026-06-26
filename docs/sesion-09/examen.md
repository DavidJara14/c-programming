# Examen — Sesión 9: Estructuras

!!! note "Instrucciones"
    Examen de autoevaluación teórica. Resuélvelo **sin consultar** apuntes ni compilador; contrasta después con las respuestas desplegables. Tiempo sugerido: **45 minutos**. Puntaje total: **100 puntos**.

---

## Parte A — Opción múltiple (40 pts, 5 c/u)

**1.** ¿Qué es un `struct` en C?

- a) Un arreglo de un solo tipo
- b) Un tipo que agrupa varios campos, posiblemente de distintos tipos
- c) Una función especial
- d) Un apuntador

**2.** ¿Qué operador accede a un campo de una estructura **normal**?

- a) `->`
- b) `.`
- c) `*`
- d) `&`

**3.** Si `p` es un apuntador a estructura, ¿cómo se accede al campo `edad`?

- a) `p.edad`
- b) `*p.edad`
- c) `p->edad`
- d) `&p.edad`

**4.** ¿Para qué sirve `typedef`?

- a) Para reservar memoria
- b) Para crear un alias de un tipo
- c) Para definir funciones
- d) Para comparar estructuras

**5.** ¿Qué imprime el siguiente acceso, dado `e.fecha.dia = 15`?

- a) Error: no se pueden anidar estructuras
- b) 15
- c) La dirección de `fecha`
- d) 0

**6.** Al pasar una estructura a una función **por valor**, la función…

- a) modifica el original
- b) trabaja sobre una copia
- c) no compila
- d) recibe solo el primer campo

**7.** `a->edad` es equivalente a:

- a) `a.edad`
- b) `(*a).edad`
- c) `&a.edad`
- d) `*a.edad`

**8.** ¿Cuál de estas operaciones es **válida** entre dos estructuras `a` y `b` del mismo tipo?

- a) `a == b`
- b) `a + b`
- c) `a = b` (copia campo por campo)
- d) `a > b`

??? success "Respuestas Parte A"
    | # | Resp. | Justificación |
    |---|-------|---------------|
    | 1 | **b** | Agrupa campos heterogéneos bajo un nombre |
    | 2 | **b** | El punto accede a campos de una variable estructura |
    | 3 | **c** | Con apuntador se usa la flecha `->` |
    | 4 | **b** | Crea un alias para escribir menos |
    | 5 | **b** | Las estructuras anidadas se encadenan con `.` |
    | 6 | **b** | Las estructuras se copian al pasarlas por valor |
    | 7 | **b** | `->` es azúcar de `(*a).campo` |
    | 8 | **c** | La asignación `=` sí copia estructuras; `==`/`+`/`>` no aplican |

---

## Parte B — Verdadero o Falso (20 pts, 4 c/u)

1. Una estructura solo puede contener campos del mismo tipo. `____`
2. La definición de un `struct` debe terminar con punto y coma. `____`
3. Dos estructuras pueden compararse directamente con `==`. `____`
4. Un campo de una estructura puede ser otra estructura. `____`
5. Para modificar la estructura original dentro de una función, se pasa su dirección y se usa `->`. `____`

??? success "Respuestas Parte B"
    1. **F** — Pueden combinarse tipos distintos (esa es su ventaja).
    2. **V** — Olvidar el `;` es un error de sintaxis clásico.
    3. **F** — Hay que comparar campo por campo; `==` no compila para structs.
    4. **V** — Son las estructuras anidadas.
    5. **V** — Paso por referencia con apuntador y operador flecha.

---

## Parte C — ¿Qué imprime? (20 pts, 10 c/u)

**Código 1**

```c
typedef struct { int x, y; } Punto;
void mover(Punto p) { p.x += 10; }
int main() {
    Punto a = {1, 2};
    mover(a);
    printf("%d %d\n", a.x, a.y);
    return 0;
}
```

**Código 2**

```c
typedef struct { int x, y; } Punto;
void mover(Punto *p) { p->x += 10; }
int main() {
    Punto a = {1, 2};
    mover(&a);
    printf("%d %d\n", a.x, a.y);
    return 0;
}
```

??? success "Respuestas Parte C"
    **Código 1 →** `1 2`. Paso por valor: `mover` modifica la copia, el original no cambia.

    **Código 2 →** `11 2`. Paso por referencia: `mover` modifica el original a través del apuntador.

    Estos dos códigos juntos son la lección central de la sesión: valor copia, referencia modifica.

---

## Parte D — Detecta el error (10 pts)

Este código intenta usar una estructura mediante un apuntador, pero tiene un error. Encuéntralo.

```c
typedef struct { char nombre[30]; int edad; } Persona;
int main() {
    Persona p = {"Ana", 20};
    Persona *ptr = &p;
    printf("%s tiene %d\n", ptr.nombre, ptr.edad);
    return 0;
}
```

??? success "Respuesta Parte D"
    `ptr` es un **apuntador** a estructura, así que el acceso a sus campos debe usar la flecha `->`, no el punto:

    ```c
    printf("%s tiene %d\n", ptr->nombre, ptr->edad);
    ```

    El punto se usa con la variable directa (`p.nombre`); la flecha, con el apuntador (`ptr->nombre`).

---

## Parte E — Desarrollo (10 pts)

Antes de las estructuras, agrupar los datos de varios alumnos requería "arreglos paralelos" (`nombres[]`, `edades[]`, `promedios[]`). Explica en 4–6 líneas qué problema resuelven las estructuras frente a ese enfoque.

??? success "Respuesta orientativa Parte E"
    Con arreglos paralelos, los datos de un mismo alumno quedan repartidos en arreglos distintos y solo se mantienen unidos por el índice. Eso es frágil: si se ordena un arreglo y no los demás, los datos se desincronizan y `nombres[2]` deja de corresponder con `edades[2]`. Las estructuras resuelven esto agrupando todos los campos de una entidad en un solo objeto (`Alumno`), de modo que un arreglo de estructuras mantiene cada registro íntegro. Al ordenar, buscar o pasar a funciones, se mueve el alumno **completo**, eliminando el riesgo de desincronización y haciendo el código más legible y mantenible.
