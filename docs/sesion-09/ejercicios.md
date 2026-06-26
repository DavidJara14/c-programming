# Ejercicios en Clase — Sesión 9

---

## Ejercicio 1 — Tu primera estructura

**Objetivo:** Definir un `struct`, llenarlo y mostrarlo.

### Enunciado

Define una estructura `Libro` con título, autor, año y precio. Captura un libro y muéstralo con formato.

### Salida esperada

```
Titulo: El Quijote
Autor: Cervantes
Anio: 1605
Precio: 250.00
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    typedef struct {
        char titulo[60];
        char autor[40];
        int anio;
        float precio;
    } Libro;

    int main() {
        Libro l;

        printf("Titulo: ");  scanf(" %[^\n]", l.titulo);
        printf("Autor: ");   scanf(" %[^\n]", l.autor);
        printf("Anio: ");    scanf("%d", &l.anio);
        printf("Precio: ");  scanf("%f", &l.precio);

        printf("\n%s, de %s (%d) - $%.2f\n",
               l.titulo, l.autor, l.anio, l.precio);
        return 0;
    }
    ```

    **Nota:** `scanf(" %[^\n]", ...)` lee una línea completa hasta el salto de línea, permitiendo títulos con espacios.

---

## Ejercicio 2 — Punto en el plano

**Objetivo:** Usar una estructura sencilla en cálculos.

### Enunciado

Define `Punto` con coordenadas `x` y `y`. Lee dos puntos y calcula la distancia entre ellos.

### Salida esperada

```
Punto A (x y): 0 0
Punto B (x y): 3 4
Distancia: 5.00
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <math.h>

    typedef struct {
        double x, y;
    } Punto;

    int main() {
        Punto a, b;
        printf("Punto A (x y): ");
        scanf("%lf %lf", &a.x, &a.y);
        printf("Punto B (x y): ");
        scanf("%lf %lf", &b.x, &b.y);

        double d = sqrt(pow(b.x - a.x, 2) + pow(b.y - a.y, 2));
        printf("Distancia: %.2f\n", d);
        return 0;
    }
    ```

---

## Ejercicio 3 — Estructura con funciones

**Objetivo:** Pasar estructuras a funciones por valor y por referencia.

### Enunciado

Con la estructura `Punto`, escribe `void imprimirPunto(Punto p)` y `void trasladar(Punto *p, double dx, double dy)` que sume un desplazamiento. Demuestra que `trasladar` modifica el original.

### Salida esperada

```
Antes:   (2.00, 3.00)
Despues: (5.00, 7.00)
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    typedef struct { double x, y; } Punto;

    void imprimirPunto(Punto p) {
        printf("(%.2f, %.2f)\n", p.x, p.y);
    }

    void trasladar(Punto *p, double dx, double dy) {
        p->x += dx;
        p->y += dy;
    }

    int main() {
        Punto p = {2.0, 3.0};
        printf("Antes:   "); imprimirPunto(p);
        trasladar(&p, 3.0, 4.0);
        printf("Despues: "); imprimirPunto(p);
        return 0;
    }
    ```

    **Clave:** `imprimirPunto` recibe una copia (solo lee), mientras `trasladar` recibe un apuntador (modifica el original con `->`).

---

## Ejercicio 4 — Arreglo de estructuras

**Objetivo:** Manejar varios registros con un arreglo de estructuras.

### Enunciado

Captura 3 productos (nombre y precio) y muestra el más caro.

### Salida esperada

```
Producto mas caro: Laptop ($15000.00)
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 3

    typedef struct {
        char nombre[40];
        float precio;
    } Producto;

    int main() {
        Producto p[N];
        for (int i = 0; i < N; i++) {
            printf("Nombre del producto %d: ", i + 1);
            scanf(" %[^\n]", p[i].nombre);
            printf("Precio: ");
            scanf("%f", &p[i].precio);
        }

        int caro = 0;
        for (int i = 1; i < N; i++) {
            if (p[i].precio > p[caro].precio) caro = i;
        }

        printf("\nProducto mas caro: %s ($%.2f)\n",
               p[caro].nombre, p[caro].precio);
        return 0;
    }
    ```

---

## Ejercicio 5 — Estructura anidada

**Objetivo:** Componer estructuras dentro de estructuras.

### Enunciado

Define `Fecha` (día, mes, año) y `Evento` (nombre y una `Fecha`). Captura un evento y muéstralo en formato `dd/mm/aaaa`.

### Salida esperada

```
Evento: Examen Final
Fecha: 15/12/2026
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    typedef struct { int dia, mes, anio; } Fecha;

    typedef struct {
        char nombre[50];
        Fecha fecha;
    } Evento;

    int main() {
        Evento e;
        printf("Nombre del evento: ");
        scanf(" %[^\n]", e.nombre);
        printf("Fecha (dd mm aaaa): ");
        scanf("%d %d %d", &e.fecha.dia, &e.fecha.mes, &e.fecha.anio);

        printf("\n%s\n", e.nombre);
        printf("Fecha: %02d/%02d/%d\n",
               e.fecha.dia, e.fecha.mes, e.fecha.anio);
        return 0;
    }
    ```

    **Observa el encadenamiento:** `e.fecha.dia` baja dos niveles: del evento a su fecha, y de la fecha a su día.

---

## Ejercicio 6 — Función que devuelve una estructura

**Objetivo:** Construir y devolver una estructura desde una función.

### Enunciado

Escribe `Fraccion crearFraccion(int num, int den)` y `Fraccion sumar(Fraccion a, Fraccion b)` para sumar dos fracciones (sin simplificar). Muestra el resultado.

### Salida esperada

```
1/2 + 1/3 = 5/6
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    typedef struct { int num, den; } Fraccion;

    Fraccion crearFraccion(int n, int d) {
        Fraccion f;
        f.num = n;
        f.den = d;
        return f;
    }

    Fraccion sumar(Fraccion a, Fraccion b) {
        Fraccion r;
        r.num = a.num * b.den + b.num * a.den;
        r.den = a.den * b.den;
        return r;
    }

    int main() {
        Fraccion a = crearFraccion(1, 2);
        Fraccion b = crearFraccion(1, 3);
        Fraccion s = sumar(a, b);
        printf("%d/%d + %d/%d = %d/%d\n",
               a.num, a.den, b.num, b.den, s.num, s.den);
        return 0;
    }
    ```

---

## Ejercicio 7 — Estructura dinámica

**Objetivo:** Reservar estructuras en el heap y acceder con `->`.

### Enunciado

Pide cuántos alumnos hay, reserva un arreglo dinámico de estructuras `Alumno` (nombre y promedio), captúralos y muestra el promedio general del grupo. Libera la memoria.

### Salida esperada

```
¿Cuantos alumnos? 2
Nombre: Ana
Promedio: 9.0
Nombre: Luis
Promedio: 8.0
Promedio del grupo: 8.50
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <stdlib.h>

    typedef struct {
        char nombre[50];
        float promedio;
    } Alumno;

    int main() {
        int n;
        printf("¿Cuantos alumnos? ");
        scanf("%d", &n);

        Alumno *grupo = malloc(n * sizeof(Alumno));
        if (grupo == NULL) return 1;

        float suma = 0;
        for (int i = 0; i < n; i++) {
            printf("Nombre: ");
            scanf("%s", grupo[i].nombre);
            printf("Promedio: ");
            scanf("%f", &grupo[i].promedio);
            suma += grupo[i].promedio;
        }

        printf("Promedio del grupo: %.2f\n", suma / n);
        free(grupo);
        return 0;
    }
    ```

    **Nota sobre `.` vs `->`:** aunque `grupo` es un apuntador, `grupo[i]` es una estructura, por eso se usa el punto (`grupo[i].nombre`).
