# Tarea — Sesión 9

!!! note "Instrucciones de entrega"
    Un archivo `.c` por ejercicio. Usa `typedef` para nombrar tus tipos y decide conscientemente entre paso por valor (`.`) y paso por referencia (`->`). Recuerda el `;` al cerrar cada `struct`.

!!! success "Soluciones disponibles"
    Cada ejercicio incluye su solución en un bloque desplegable. Intenta resolverlo por tu cuenta **antes** de abrirla.

---

## Ejercicio T1 — Agenda de contactos

### Enunciado

Define una estructura `Contacto` (nombre, teléfono como cadena, edad). Captura `n` contactos en un arreglo y permite **buscar** un contacto por nombre, mostrando sus datos o "no encontrado".

### Salida esperada

```
¿Cuantos contactos? 2
Contacto 1 - Nombre: Ana   Telefono: 5551234   Edad: 25
Contacto 2 - Nombre: Luis  Telefono: 5559876   Edad: 30
Buscar: Luis
Encontrado: Luis, tel 5559876, 30 anios
```

### Pistas

- Para buscar, recorre el arreglo comparando con `strcmp(contactos[i].nombre, buscado) == 0`.
- El teléfono se guarda como cadena (puede empezar con 0 y no se opera con él).

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <string.h>

    typedef struct {
        char nombre[50];
        char telefono[20];
        int edad;
    } Contacto;

    int main() {
        int n;
        printf("¿Cuantos contactos? ");
        scanf("%d", &n);

        Contacto agenda[50];
        for (int i = 0; i < n; i++) {
            printf("Contacto %d - Nombre: ", i + 1);
            scanf("%s", agenda[i].nombre);
            printf("Telefono: ");
            scanf("%s", agenda[i].telefono);
            printf("Edad: ");
            scanf("%d", &agenda[i].edad);
        }

        char buscado[50];
        printf("Buscar: ");
        scanf("%s", buscado);

        int encontrado = 0;
        for (int i = 0; i < n; i++) {
            if (strcmp(agenda[i].nombre, buscado) == 0) {
                printf("Encontrado: %s, tel %s, %d anios\n",
                       agenda[i].nombre, agenda[i].telefono, agenda[i].edad);
                encontrado = 1;
                break;
            }
        }
        if (!encontrado) printf("No encontrado.\n");
        return 0;
    }
    ```

---

## Ejercicio T2 — Ranking de jugadores

### Enunciado

Define `Jugador` (nombre y puntaje). Captura `n` jugadores y ordénalos de **mayor a menor** puntaje (burbuja sobre el arreglo de estructuras). Muestra el ranking.

### Salida esperada

```
=== Ranking ===
1. Maria - 980
2. Pedro - 750
3. Juan - 500
```

### Casos de prueba

| Entrada (nombre:puntaje) | Orden resultante |
|--------------------------|------------------|
| Juan:500, Maria:980, Pedro:750 | Maria, Pedro, Juan |
| A:10, B:10, C:20 | C, A, B |

### Pistas

- Al intercambiar en el ordenamiento, intercambias **estructuras completas**, no solo el puntaje. Usa una variable temporal de tipo `Jugador`.
- La condición de orden descendente es `if (v[j].puntaje < v[j+1].puntaje)`.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    typedef struct {
        char nombre[40];
        int puntaje;
    } Jugador;

    int main() {
        int n;
        printf("¿Cuantos jugadores? ");
        scanf("%d", &n);

        Jugador v[50];
        for (int i = 0; i < n; i++) {
            printf("Nombre: ");  scanf("%s", v[i].nombre);
            printf("Puntaje: "); scanf("%d", &v[i].puntaje);
        }

        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                if (v[j].puntaje < v[j + 1].puntaje) {
                    Jugador temp = v[j];     // intercambia la estructura entera
                    v[j] = v[j + 1];
                    v[j + 1] = temp;
                }
            }
        }

        printf("\n=== Ranking ===\n");
        for (int i = 0; i < n; i++) {
            printf("%d. %s - %d\n", i + 1, v[i].nombre, v[i].puntaje);
        }
        return 0;
    }
    ```

    **Nota:** en C puedes asignar una estructura a otra con `=` (`temp = v[j]`); copia todos los campos. Esto NO funciona con arreglos, pero sí con estructuras.

---

## Ejercicio T3 — Operaciones con números complejos

### Enunciado

Define `Complejo` (parte real e imaginaria). Implementa funciones que devuelvan estructuras: `suma`, `resta` y `multiplicacion` de dos números complejos. Recuerda: `(a+bi)(c+di) = (ac−bd) + (ad+bc)i`.

### Salida esperada

```
z1 = 3.0 + 2.0i
z2 = 1.0 + 4.0i
Suma: 4.0 + 6.0i
Producto: -5.0 + 14.0i
```

### Casos de prueba

| z1 | z2 | Suma | Producto |
|----|----|------|----------|
| 3+2i | 1+4i | 4+6i | −5+14i |
| 1+1i | 1−1i | 2+0i | 2+0i |

### Pistas

- Cada función recibe dos `Complejo` y devuelve un `Complejo`.
- Cuida los signos en la multiplicación: la parte real lleva un menos.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    typedef struct { double re, im; } Complejo;

    Complejo suma(Complejo a, Complejo b) {
        Complejo r = { a.re + b.re, a.im + b.im };
        return r;
    }

    Complejo multiplicacion(Complejo a, Complejo b) {
        Complejo r;
        r.re = a.re * b.re - a.im * b.im;
        r.im = a.re * b.im + a.im * b.re;
        return r;
    }

    int main() {
        Complejo z1 = {3.0, 2.0}, z2 = {1.0, 4.0};
        Complejo s = suma(z1, z2);
        Complejo p = multiplicacion(z1, z2);
        printf("Suma: %.1f + %.1fi\n", s.re, s.im);
        printf("Producto: %.1f + %.1fi\n", p.re, p.im);
        return 0;
    }
    ```

---

## Ejercicio T4 — Inventario con memoria dinámica

### Enunciado

Define `Producto` (nombre, cantidad, precio). Pide cuántos productos hay, reserva un arreglo **dinámico** de estructuras, captúralos y muestra: el valor total del inventario (Σ cantidad × precio) y el producto con menor existencia. Libera la memoria.

### Salida esperada

```
¿Cuantos productos? 2
Producto 1 - Nombre: Lapiz   Cantidad: 100   Precio: 5.00
Producto 2 - Nombre: Cuaderno Cantidad: 20   Precio: 30.00
Valor total del inventario: 1100.00
Menor existencia: Cuaderno (20)
```

### Pistas

- Reserva con `malloc(n * sizeof(Producto))` y verifica `NULL`.
- Acumula `total += grupo[i].cantidad * grupo[i].precio`.
- Para la menor existencia, guarda el índice del mínimo.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <stdlib.h>

    typedef struct {
        char nombre[40];
        int cantidad;
        float precio;
    } Producto;

    int main() {
        int n;
        printf("¿Cuantos productos? ");
        scanf("%d", &n);

        Producto *inv = malloc(n * sizeof(Producto));
        if (inv == NULL) return 1;

        float total = 0;
        for (int i = 0; i < n; i++) {
            printf("Producto %d - Nombre: ", i + 1);
            scanf("%s", inv[i].nombre);
            printf("Cantidad: "); scanf("%d", &inv[i].cantidad);
            printf("Precio: ");   scanf("%f", &inv[i].precio);
            total += inv[i].cantidad * inv[i].precio;
        }

        int menor = 0;
        for (int i = 1; i < n; i++) {
            if (inv[i].cantidad < inv[menor].cantidad) menor = i;
        }

        printf("Valor total del inventario: %.2f\n", total);
        printf("Menor existencia: %s (%d)\n",
               inv[menor].nombre, inv[menor].cantidad);

        free(inv);
        return 0;
    }
    ```

---

## Reto opcional — Estructura con apuntador a otra estructura (lista enlazada simple)

### Enunciado

Para quien quiera asomarse a las estructuras de datos avanzadas: define un `Nodo` que contenga un entero y un **apuntador al siguiente** `Nodo`. Crea tres nodos enlazados manualmente (con `malloc`), recórrelos imprimiendo sus valores y libéralos.

### Pistas

- `typedef struct Nodo { int valor; struct Nodo *siguiente; } Nodo;` — fíjate en que el `struct` necesita nombre (`Nodo`) para poder referenciarse a sí mismo.
- El último nodo apunta a `NULL` para marcar el fin.
- Recorre con un apuntador auxiliar: `while (actual != NULL) { ... actual = actual->siguiente; }`.
- Esta es la base de las **listas enlazadas**, tema central de un segundo curso de estructuras de datos.
