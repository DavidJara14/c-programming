# Tarea — Sesión 10

!!! note "Instrucciones de entrega"
    Un archivo `.c` por ejercicio. **Verifica siempre** el resultado de `fopen` y **cierra** cada archivo con `fclose`. Entrega también los archivos `.txt` generados como evidencia.

!!! success "Soluciones disponibles"
    Cada ejercicio incluye su solución en un bloque desplegable. Intenta resolverlo por tu cuenta **antes** de abrirla.

---

## Ejercicio T1 — Sistema de calificaciones persistente

### Enunciado

Construye un programa con menú que permita: (1) **Agregar** un alumno (nombre y calificación) al archivo `notas.txt` sin borrar los anteriores, (2) **Listar** todos los alumnos del archivo, y (3) **Salir**. El programa debe recordar los datos entre ejecuciones.

### Salida esperada

```
1. Agregar  2. Listar  3. Salir
Opcion: 1
Nombre: Ana
Calificacion: 9.5
Guardado.
Opcion: 2
--- Alumnos ---
Ana: 9.5
```

### Pistas

- "Agregar" abre `notas.txt` en modo `"a"`.
- "Listar" lo abre en modo `"r"` y recorre con `fscanf` hasta el final.
- El menú se repite con `do-while`.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    void agregar(void) {
        char nombre[40];
        float cal;
        printf("Nombre: ");        scanf("%s", nombre);
        printf("Calificacion: ");  scanf("%f", &cal);

        FILE *f = fopen("notas.txt", "a");
        if (f == NULL) { printf("Error.\n"); return; }
        fprintf(f, "%s %.2f\n", nombre, cal);
        fclose(f);
        printf("Guardado.\n");
    }

    void listar(void) {
        FILE *f = fopen("notas.txt", "r");
        if (f == NULL) { printf("Aun no hay datos.\n"); return; }
        char nombre[40];
        float cal;
        printf("--- Alumnos ---\n");
        while (fscanf(f, "%s %f", nombre, &cal) == 2) {
            printf("%s: %.1f\n", nombre, cal);
        }
        fclose(f);
    }

    int main() {
        int opcion;
        do {
            printf("\n1. Agregar  2. Listar  3. Salir\nOpcion: ");
            scanf("%d", &opcion);
            switch (opcion) {
                case 1: agregar(); break;
                case 2: listar();  break;
                case 3: printf("Hasta luego.\n"); break;
                default: printf("Opcion invalida.\n");
            }
        } while (opcion != 3);
        return 0;
    }
    ```

---

## Ejercicio T2 — Promedio y aprobados desde archivo

### Enunciado

Suponiendo un archivo `notas.txt` con líneas `nombre calificacion`, lee todos los registros y reporta: cuántos alumnos hay, el promedio general, cuántos aprobaron (≥ 6.0) y el nombre del alumno con la calificación más alta.

### Salida esperada

```
Total de alumnos: 4
Promedio general: 7.88
Aprobados: 3
Mejor alumno: Maria (9.50)
```

### Casos de prueba

| Archivo | Total | Promedio | Aprobados | Mejor |
|---------|-------|----------|-----------|-------|
| Ana 9.5, Luis 5.0, Maria 9.5, Pep 7.5 | 4 | 7.88 | 3 | Ana o Maria |

### Pistas

- Lleva acumuladores: contador, suma, aprobados, y guarda nombre+nota del mejor.
- Inicializa "mejor nota" con un valor muy bajo o con el primer registro leído.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        FILE *f = fopen("notas.txt", "r");
        if (f == NULL) { printf("No hay archivo.\n"); return 1; }

        char nombre[40], mejorNombre[40] = "";
        float cal, suma = 0, mejorCal = -1;
        int total = 0, aprobados = 0;

        while (fscanf(f, "%s %f", nombre, &cal) == 2) {
            total++;
            suma += cal;
            if (cal >= 6.0) aprobados++;
            if (cal > mejorCal) {
                mejorCal = cal;
                // copiar el nombre del mejor
                int i = 0;
                while (nombre[i] != '\0') { mejorNombre[i] = nombre[i]; i++; }
                mejorNombre[i] = '\0';
            }
        }
        fclose(f);

        if (total == 0) { printf("Archivo vacio.\n"); return 0; }

        printf("Total de alumnos: %d\n", total);
        printf("Promedio general: %.2f\n", suma / total);
        printf("Aprobados: %d\n", aprobados);
        printf("Mejor alumno: %s (%.2f)\n", mejorNombre, mejorCal);
        return 0;
    }
    ```

    **Nota:** se copia el nombre a mano para practicar; en un programa real usarías `strcpy` de `string.h`.

---

## Ejercicio T3 — Numerar las líneas de un archivo

### Enunciado

Lee un archivo `entrada.txt` y crea `salida.txt` con el mismo contenido pero numerando cada línea, como hace el comando `nl` de UNIX.

### Salida esperada (contenido de salida.txt)

```
1: primera linea
2: segunda linea
3: tercera linea
```

### Pistas

- Abre `entrada.txt` en `"r"` y `salida.txt` en `"w"` a la vez.
- Lee línea por línea con `fgets` llevando un contador.
- Escribe en el archivo de salida con `fprintf(out, "%d: %s", n, linea)`.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        FILE *in = fopen("entrada.txt", "r");
        if (in == NULL) { printf("No existe entrada.txt\n"); return 1; }

        FILE *out = fopen("salida.txt", "w");
        if (out == NULL) { fclose(in); return 1; }

        char linea[300];
        int n = 1;
        while (fgets(linea, sizeof(linea), in) != NULL) {
            fprintf(out, "%d: %s", n, linea);
            n++;
        }

        fclose(in);
        fclose(out);
        printf("Listo: %d lineas numeradas en salida.txt\n", n - 1);
        return 0;
    }
    ```

---

## Ejercicio T4 — Inventario con guardado y carga

### Enunciado

Define `Producto` (nombre, cantidad, precio). El programa permite capturar `n` productos, los **guarda** en `inventario.txt`, y en una función separada los **carga** desde el archivo a un arreglo, mostrando el valor total (Σ cantidad × precio). Demuestra que los datos sobreviven cerrando y reabriendo el archivo.

### Salida esperada

```
Guardando 2 productos...
Cargando desde inventario.txt...
Lapiz   x100  @5.00
Cuaderno x20  @30.00
Valor total: 1100.00
```

### Pistas

- Como el nombre puede no tener espacios, `%s` basta; si quieres permitir espacios, guarda los campos en un orden que `fscanf` pueda separar sin ambigüedad (por ejemplo, número primero).
- Para cargar, lee con `fscanf(f, "%s %d %f", ...) == 3` en un ciclo.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    typedef struct {
        char nombre[40];
        int cantidad;
        float precio;
    } Producto;

    void guardar(Producto v[], int n) {
        FILE *f = fopen("inventario.txt", "w");
        if (f == NULL) return;
        for (int i = 0; i < n; i++)
            fprintf(f, "%s %d %.2f\n", v[i].nombre, v[i].cantidad, v[i].precio);
        fclose(f);
    }

    void cargarYmostrar(void) {
        FILE *f = fopen("inventario.txt", "r");
        if (f == NULL) { printf("Sin archivo.\n"); return; }
        Producto p;
        float total = 0;
        while (fscanf(f, "%s %d %f", p.nombre, &p.cantidad, &p.precio) == 3) {
            printf("%-8s x%-4d @%.2f\n", p.nombre, p.cantidad, p.precio);
            total += p.cantidad * p.precio;
        }
        fclose(f);
        printf("Valor total: %.2f\n", total);
    }

    int main() {
        int n;
        printf("¿Cuantos productos? ");
        scanf("%d", &n);

        Producto v[100];
        for (int i = 0; i < n; i++) {
            printf("Nombre: ");   scanf("%s", v[i].nombre);
            printf("Cantidad: "); scanf("%d", &v[i].cantidad);
            printf("Precio: ");   scanf("%f", &v[i].precio);
        }

        guardar(v, n);
        printf("Guardando %d productos...\n", n);
        printf("Cargando desde inventario.txt...\n");
        cargarYmostrar();
        return 0;
    }
    ```

---

## Reto opcional — Buscar y reemplazar en un archivo

### Enunciado

Lee `entrada.txt`, reemplaza todas las apariciones de una palabra por otra (ambas dadas por el usuario) y escribe el resultado en `salida.txt`. Reporta cuántos reemplazos hiciste.

### Pistas

- Lee el archivo palabra por palabra con `fscanf(f, "%s", palabra)`.
- Compara cada palabra con la buscada usando `strcmp`; si coincide, escribe la nueva, si no, la original.
- Cuida los espacios entre palabras al escribir en la salida.
- Esta es una versión simplificada de la función "Buscar y reemplazar" de cualquier editor de texto.
