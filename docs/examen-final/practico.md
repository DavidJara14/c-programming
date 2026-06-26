# Examen Final — Práctico (Coding)

!!! note "Instrucciones"
    Examen final **práctico**: cuatro retos de dificultad creciente que culminan en un proyecto integrador. Cada reto se entrega como un archivo `.c` independiente que compile **sin advertencias** (`gcc -Wall`). Tiempo sugerido: **3 horas**. Puntaje total: **100 puntos**.

!!! warning "Este examen es difícil — y así debe ser"
    Aquí se combina todo el curso: arreglos, cadenas, funciones, apuntadores, memoria dinámica, estructuras y archivos. No basta con que "funcione": se evalúa el **diseño modular** (funciones con una sola responsabilidad), el **manejo correcto de memoria** (cada `malloc` con su `free`, verificación de `NULL`) y la **robustez** (validación de entradas, casos límite).

!!! success "Soluciones de referencia"
    Cada reto incluye una solución completa en un bloque desplegable. **Resuélvelo entero antes de mirarla.** Hay muchas soluciones válidas; la de referencia es una entre varias.

---

## Criterios de evaluación

| Criterio | Peso |
|----------|------|
| Correctitud (produce los resultados esperados, incluidos casos límite) | 45% |
| Diseño modular (funciones bien separadas, sin repetición) | 20% |
| Manejo de memoria (sin fugas, sin accesos inválidos, verificación de `NULL`) | 20% |
| Robustez (validación de entradas y errores) | 10% |
| Estilo y legibilidad (nombres claros, indentación, comentarios útiles) | 5% |

---

## Reto 1 — Analizador estadístico (20 pts)

**Conceptos:** arreglos, funciones, ordenamiento.

### Enunciado

Escribe un programa que lea `n` números reales (con `n` dado por el usuario, máximo 100) y calcule, **cada uno en su propia función**:

1. La **media** aritmética.
2. La **mediana** (el valor central tras ordenar; si `n` es par, el promedio de los dos centrales).
3. La **moda** (el valor que más se repite; si hay empate, el menor).
4. La **desviación estándar** poblacional: `σ = √( Σ(xᵢ − media)² / n )`.

El programa debe ordenar los datos (sin alterar el orden de cálculo de la media) e imprimir un reporte.

### Ejemplo

```
n = 7
Datos: 4 8 6 4 9 4 7
--- Reporte ---
Media:     6.00
Mediana:   6.00
Moda:      4.00
Desv. est: 1.89
```

### Solución de referencia

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <math.h>
    #define MAX 100

    double media(double v[], int n) {
        double s = 0;
        for (int i = 0; i < n; i++) s += v[i];
        return s / n;
    }

    /* ordena una COPIA para no alterar el arreglo original al calcular la mediana */
    void ordenar(double v[], int n) {
        for (int i = 0; i < n - 1; i++)
            for (int j = 0; j < n - 1 - i; j++)
                if (v[j] > v[j + 1]) {
                    double t = v[j]; v[j] = v[j + 1]; v[j + 1] = t;
                }
    }

    double mediana(double v[], int n) {
        double copia[MAX];
        for (int i = 0; i < n; i++) copia[i] = v[i];
        ordenar(copia, n);
        if (n % 2 == 1) return copia[n / 2];
        return (copia[n / 2 - 1] + copia[n / 2]) / 2.0;
    }

    double moda(double v[], int n) {
        int mejorConteo = 0;
        double mejorValor = v[0];
        for (int i = 0; i < n; i++) {
            int conteo = 0;
            for (int j = 0; j < n; j++)
                if (v[j] == v[i]) conteo++;
            /* gana mayor frecuencia; en empate, el menor valor */
            if (conteo > mejorConteo ||
               (conteo == mejorConteo && v[i] < mejorValor)) {
                mejorConteo = conteo;
                mejorValor = v[i];
            }
        }
        return mejorValor;
    }

    double desviacion(double v[], int n) {
        double m = media(v, n), suma = 0;
        for (int i = 0; i < n; i++) suma += (v[i] - m) * (v[i] - m);
        return sqrt(suma / n);
    }

    int main() {
        int n;
        double v[MAX];
        printf("n = ");
        if (scanf("%d", &n) != 1 || n < 1 || n > MAX) {
            printf("n invalido.\n");
            return 1;
        }
        for (int i = 0; i < n; i++) scanf("%lf", &v[i]);

        printf("--- Reporte ---\n");
        printf("Media:     %.2f\n", media(v, n));
        printf("Mediana:   %.2f\n", mediana(v, n));
        printf("Moda:      %.2f\n", moda(v, n));
        printf("Desv. est: %.2f\n", desviacion(v, n));
        return 0;
    }
    ```

    **Puntos clave:** la mediana ordena una **copia** para no destruir los datos; la moda resuelve el empate eligiendo el menor; cada estadística vive en su propia función (diseño modular).

---

## Reto 2 — Procesador de texto (25 pts)

**Conceptos:** cadenas, `ctype.h`, recorrido y transformación.

### Enunciado

Lee una línea de texto (hasta 200 caracteres, con espacios) y genera un reporte:

1. Número de caracteres, palabras y oraciones (una oración termina en `.`, `!` o `?`).
2. La palabra **más larga**.
3. El texto convertido a **Capitalización de Título** (primera letra de cada palabra en mayúscula, el resto en minúscula).
4. El texto **invertido** palabra por palabra (la última palabra primero), conservando cada palabra intacta.

### Ejemplo

```
Texto: el rapido zorro. corre veloz!

--- Reporte ---
Caracteres: 31
Palabras:   5
Oraciones:  2
Mas larga:  rapido
Titulo:     El Rapido Zorro. Corre Veloz!
Invertido:  veloz! corre zorro. rapido el
```

### Solución de referencia

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <string.h>
    #include <ctype.h>

    void contar(const char *s, int *chars, int *palabras, int *oraciones) {
        *chars = 0; *palabras = 0; *oraciones = 0;
        int dentro = 0;
        for (int i = 0; s[i] != '\0'; i++) {
            if (s[i] != '\n') (*chars)++;
            if (isspace(s[i])) {
                dentro = 0;
            } else if (!dentro) {
                dentro = 1;
                (*palabras)++;
            }
            if (s[i] == '.' || s[i] == '!' || s[i] == '?') (*oraciones)++;
        }
    }

    void palabraMasLarga(const char *s, char *destino) {
        char actual[200];
        int len = 0, maxLen = 0;
        destino[0] = '\0';
        for (int i = 0; ; i++) {
            if (isalpha(s[i])) {
                actual[len++] = s[i];
            } else {
                if (len > maxLen) {
                    actual[len] = '\0';
                    strcpy(destino, actual);
                    maxLen = len;
                }
                len = 0;
                if (s[i] == '\0') break;
            }
        }
    }

    void aTitulo(const char *s, char *destino) {
        int inicioPalabra = 1, j = 0;
        for (int i = 0; s[i] != '\0'; i++) {
            if (isspace(s[i])) {
                inicioPalabra = 1;
                destino[j++] = s[i];
            } else {
                destino[j++] = inicioPalabra ? toupper(s[i]) : tolower(s[i]);
                inicioPalabra = 0;
            }
        }
        destino[j] = '\0';
    }

    void invertirPalabras(char *s, char *destino) {
        char palabras[50][200];
        int n = 0;
        char *tok = strtok(s, " \n");
        while (tok != NULL && n < 50) {
            strcpy(palabras[n++], tok);
            tok = strtok(NULL, " \n");
        }
        destino[0] = '\0';
        for (int i = n - 1; i >= 0; i--) {
            strcat(destino, palabras[i]);
            if (i > 0) strcat(destino, " ");
        }
    }

    int main() {
        char texto[201], copia[201], buffer[256];
        printf("Texto: ");
        fgets(texto, sizeof(texto), stdin);
        texto[strcspn(texto, "\n")] = '\0';
        strcpy(copia, texto);   /* invertirPalabras usa strtok, que destruye la cadena */

        int c, p, o;
        contar(texto, &c, &p, &o);
        printf("\n--- Reporte ---\n");
        printf("Caracteres: %d\n", c);
        printf("Palabras:   %d\n", p);
        printf("Oraciones:  %d\n", o);

        palabraMasLarga(texto, buffer);
        printf("Mas larga:  %s\n", buffer);

        aTitulo(texto, buffer);
        printf("Titulo:     %s\n", buffer);

        invertirPalabras(copia, buffer);
        printf("Invertido:  %s\n", buffer);
        return 0;
    }
    ```

    **Puntos clave:** `invertirPalabras` trabaja sobre una **copia**, porque `strtok` modifica la cadena. Cada transformación es una función independiente que recibe el origen y escribe en un destino.

---

## Reto 3 — Lista dinámica de enteros (25 pts)

**Conceptos:** apuntadores, memoria dinámica, `realloc`, doble apuntador.

### Enunciado

Implementa una "lista" de enteros que **crece dinámicamente** sin límite fijo, con estas operaciones, cada una como función:

- `void agregar(int **lista, int *n, int *cap, int valor)` — añade al final, duplicando la capacidad con `realloc` cuando se llena.
- `int eliminar(int **lista, int *n, int valor)` — elimina la **primera** aparición de `valor` (desplazando los siguientes); devuelve 1 si lo encontró, 0 si no.
- `void invertir(int *lista, int n)` — invierte la lista en su lugar.
- `void imprimir(int *lista, int n)`.

En `main`, demuestra todas las operaciones y **libera** la memoria al final, sin fugas.

### Ejemplo

```
Agrego 10, 20, 30, 40
Lista: 10 20 30 40   (capacidad: 4)
Elimino 20
Lista: 10 30 40
Invierto
Lista: 40 30 10
```

### Solución de referencia

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <stdlib.h>

    void agregar(int **lista, int *n, int *cap, int valor) {
        if (*n == *cap) {
            int nuevaCap = (*cap == 0) ? 2 : *cap * 2;
            int *temp = realloc(*lista, nuevaCap * sizeof(int));
            if (temp == NULL) { printf("Sin memoria.\n"); return; }
            *lista = temp;
            *cap = nuevaCap;
        }
        (*lista)[*n] = valor;
        (*n)++;
    }

    int eliminar(int **lista, int *n, int valor) {
        int pos = -1;
        for (int i = 0; i < *n; i++)
            if ((*lista)[i] == valor) { pos = i; break; }
        if (pos == -1) return 0;
        for (int i = pos; i < *n - 1; i++)
            (*lista)[i] = (*lista)[i + 1];   /* desplaza a la izquierda */
        (*n)--;
        return 1;
    }

    void invertir(int *lista, int n) {
        for (int i = 0, j = n - 1; i < j; i++, j--) {
            int t = lista[i]; lista[i] = lista[j]; lista[j] = t;
        }
    }

    void imprimir(int *lista, int n) {
        printf("Lista:");
        for (int i = 0; i < n; i++) printf(" %d", lista[i]);
        printf("\n");
    }

    int main() {
        int *lista = NULL;
        int n = 0, cap = 0;

        agregar(&lista, &n, &cap, 10);
        agregar(&lista, &n, &cap, 20);
        agregar(&lista, &n, &cap, 30);
        agregar(&lista, &n, &cap, 40);
        imprimir(lista, n);
        printf("(capacidad: %d)\n", cap);

        eliminar(&lista, &n, 20);
        imprimir(lista, n);

        invertir(lista, n);
        imprimir(lista, n);

        free(lista);     /* una sola reserva acumulada -> un solo free */
        return 0;
    }
    ```

    **Puntos clave:** `agregar` y `eliminar` reciben `int **` porque deben poder **cambiar el propio apuntador** del `main` (cuando `realloc` mueve el bloque). Toda la memoria se concentra en un único bloque que se libera con un solo `free`.

---

## Proyecto Integrador — Sistema de gestión de estudiantes (30 pts)

**Conceptos:** estructuras + arreglos dinámicos + archivos + funciones + menú. **Integra todo el curso.**

### Enunciado

Construye un sistema, manejado por un **menú**, que administre estudiantes con esta estructura:

```c
typedef struct {
    int id;
    char nombre[50];
    float promedio;
} Estudiante;
```

El sistema mantiene los estudiantes en un **arreglo dinámico** que crece con `realloc`, y debe ofrecer:

1. **Alta:** agregar un estudiante (id, nombre, promedio).
2. **Listar:** mostrar todos.
3. **Buscar** por id.
4. **Eliminar** por id.
5. **Estadísticas:** promedio general, mejor y peor estudiante, cuántos aprobados (≥ 6.0).
6. **Guardar** todos los estudiantes en `estudiantes.txt`.
7. **Cargar** desde `estudiantes.txt` (reemplazando los actuales).
8. **Salir** (liberando toda la memoria).

### Requisitos de calidad

- Cada opción del menú debe ser una **función separada**.
- El arreglo dinámico crece con `realloc`; **sin** límite fijo de estudiantes.
- Verifica `NULL` en cada reserva y en `fopen`.
- Al salir, **no debe haber fugas de memoria**.

### Solución de referencia

??? example "Ver solución completa"
    ```c
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>

    typedef struct {
        int id;
        char nombre[50];
        float promedio;
    } Estudiante;

    /* ---- gestión del arreglo dinámico ---- */

    void agregar(Estudiante **arr, int *n, int *cap, Estudiante e) {
        if (*n == *cap) {
            int nuevaCap = (*cap == 0) ? 4 : *cap * 2;
            Estudiante *temp = realloc(*arr, nuevaCap * sizeof(Estudiante));
            if (temp == NULL) { printf("Sin memoria.\n"); return; }
            *arr = temp;
            *cap = nuevaCap;
        }
        (*arr)[*n] = e;
        (*n)++;
    }

    int buscarIndice(Estudiante *arr, int n, int id) {
        for (int i = 0; i < n; i++)
            if (arr[i].id == id) return i;
        return -1;
    }

    int eliminar(Estudiante *arr, int *n, int id) {
        int pos = buscarIndice(arr, *n, id);
        if (pos == -1) return 0;
        for (int i = pos; i < *n - 1; i++) arr[i] = arr[i + 1];
        (*n)--;
        return 1;
    }

    void listar(Estudiante *arr, int n) {
        if (n == 0) { printf("(sin estudiantes)\n"); return; }
        printf("%-5s %-20s %s\n", "ID", "Nombre", "Prom");
        for (int i = 0; i < n; i++)
            printf("%-5d %-20s %.2f\n", arr[i].id, arr[i].nombre, arr[i].promedio);
    }

    void estadisticas(Estudiante *arr, int n) {
        if (n == 0) { printf("(sin datos)\n"); return; }
        float suma = 0;
        int mejor = 0, peor = 0, aprobados = 0;
        for (int i = 0; i < n; i++) {
            suma += arr[i].promedio;
            if (arr[i].promedio > arr[mejor].promedio) mejor = i;
            if (arr[i].promedio < arr[peor].promedio) peor = i;
            if (arr[i].promedio >= 6.0) aprobados++;
        }
        printf("Promedio general: %.2f\n", suma / n);
        printf("Mejor: %s (%.2f)\n", arr[mejor].nombre, arr[mejor].promedio);
        printf("Peor:  %s (%.2f)\n", arr[peor].nombre, arr[peor].promedio);
        printf("Aprobados: %d de %d\n", aprobados, n);
    }

    /* ---- persistencia en archivo ---- */

    void guardar(Estudiante *arr, int n) {
        FILE *f = fopen("estudiantes.txt", "w");
        if (f == NULL) { printf("Error al guardar.\n"); return; }
        for (int i = 0; i < n; i++)
            fprintf(f, "%d;%s;%.2f\n", arr[i].id, arr[i].nombre, arr[i].promedio);
        fclose(f);
        printf("Guardados %d estudiantes.\n", n);
    }

    void cargar(Estudiante **arr, int *n, int *cap) {
        FILE *f = fopen("estudiantes.txt", "r");
        if (f == NULL) { printf("No hay archivo previo.\n"); return; }
        *n = 0;   /* reemplaza los actuales */
        Estudiante e;
        /* el nombre puede tener espacios: separamos por ';' */
        while (fscanf(f, "%d;%49[^;];%f\n", &e.id, e.nombre, &e.promedio) == 3) {
            agregar(arr, n, cap, e);
        }
        fclose(f);
        printf("Cargados %d estudiantes.\n", *n);
    }

    /* ---- programa principal ---- */

    int main() {
        Estudiante *arr = NULL;
        int n = 0, cap = 0, opcion;

        do {
            printf("\n=== Sistema de Estudiantes ===\n");
            printf("1.Alta 2.Listar 3.Buscar 4.Eliminar 5.Stats 6.Guardar 7.Cargar 8.Salir\n");
            printf("Opcion: ");
            if (scanf("%d", &opcion) != 1) break;

            if (opcion == 1) {
                Estudiante e;
                printf("ID: ");       scanf("%d", &e.id);
                printf("Nombre: ");   scanf(" %49[^\n]", e.nombre);
                printf("Promedio: "); scanf("%f", &e.promedio);
                agregar(&arr, &n, &cap, e);
            } else if (opcion == 2) {
                listar(arr, n);
            } else if (opcion == 3) {
                int id; printf("ID a buscar: "); scanf("%d", &id);
                int pos = buscarIndice(arr, n, id);
                if (pos == -1) printf("No encontrado.\n");
                else printf("%d - %s - %.2f\n",
                            arr[pos].id, arr[pos].nombre, arr[pos].promedio);
            } else if (opcion == 4) {
                int id; printf("ID a eliminar: "); scanf("%d", &id);
                printf(eliminar(arr, &n, id) ? "Eliminado.\n" : "No encontrado.\n");
            } else if (opcion == 5) {
                estadisticas(arr, n);
            } else if (opcion == 6) {
                guardar(arr, n);
            } else if (opcion == 7) {
                cargar(&arr, &n, &cap);
            } else if (opcion == 8) {
                printf("Hasta luego.\n");
            } else {
                printf("Opcion invalida.\n");
            }
        } while (opcion != 8);

        free(arr);   /* libera el arreglo dinámico antes de terminar */
        return 0;
    }
    ```

    **Decisiones de diseño destacables:**

    - El archivo usa `;` como separador, lo que permite **nombres con espacios** (`%49[^;]` lee hasta el siguiente `;`). Es el problema clásico de persistir cadenas con espacios.
    - `cargar` reutiliza `agregar`, así que también aprovecha el crecimiento dinámico con `realloc`.
    - Toda la memoria es un único bloque acumulado: un solo `free(arr)` al final libera todo, sin fugas.
    - Cada responsabilidad (alta, listar, estadísticas, persistencia) está aislada en su función: el `main` solo orquesta el menú.

---

## Extensiones opcionales (puntos extra)

Para quien termine y quiera ir más allá:

1. **Ordenar** la lista por promedio (descendente) antes de listar, reutilizando un ordenamiento sobre el arreglo de estructuras.
2. Permitir **editar** el promedio de un estudiante existente (buscar por id y modificar a través de un apuntador a la estructura).
3. Validar que no se repitan los `id` al dar de alta.
4. Reemplazar el arreglo dinámico por una **lista enlazada** de nodos con `malloc` (el siguiente paso natural hacia las estructuras de datos).
