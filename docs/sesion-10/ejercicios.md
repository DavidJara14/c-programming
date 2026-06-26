# Ejercicios en Clase — Sesión 10

!!! info "Sobre la ruta de los archivos"
    Si solo das el nombre (`"datos.txt"`), el archivo se crea junto al ejecutable. En CodeBlocks, eso suele ser la carpeta del proyecto. Revisa ahí para ver los archivos generados.

---

## Ejercicio 1 — Escribir y leer un archivo

**Objetivo:** Completar el ciclo abrir → escribir → cerrar → abrir → leer.

### Enunciado

Escribe en un archivo `saludo.txt` tres líneas de texto. Luego ábrelo en modo lectura y muéstralo en pantalla.

### Salida esperada

```
Contenido del archivo:
Hola
Mundo
en C
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        FILE *f = fopen("saludo.txt", "w");
        if (f == NULL) { printf("Error al crear.\n"); return 1; }
        fprintf(f, "Hola\n");
        fprintf(f, "Mundo\n");
        fprintf(f, "en C\n");
        fclose(f);

        f = fopen("saludo.txt", "r");
        if (f == NULL) { printf("Error al abrir.\n"); return 1; }
        char linea[100];
        printf("Contenido del archivo:\n");
        while (fgets(linea, sizeof(linea), f) != NULL) {
            printf("%s", linea);
        }
        fclose(f);
        return 0;
    }
    ```

---

## Ejercicio 2 — Guardar una lista de números

**Objetivo:** Escribir datos numéricos y recuperarlos sumándolos.

### Enunciado

Pide 5 números al usuario y guárdalos en `numeros.txt`, uno por línea. Después, lee el archivo, suma todos los números y muestra el total.

### Salida esperada

```
Numero 1: 10
...
Numero 5: 50
Suma de los numeros del archivo: 150
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        FILE *f = fopen("numeros.txt", "w");
        if (f == NULL) return 1;
        int x;
        for (int i = 1; i <= 5; i++) {
            printf("Numero %d: ", i);
            scanf("%d", &x);
            fprintf(f, "%d\n", x);
        }
        fclose(f);

        f = fopen("numeros.txt", "r");
        if (f == NULL) return 1;
        int suma = 0;
        while (fscanf(f, "%d", &x) == 1) {
            suma += x;
        }
        fclose(f);

        printf("Suma de los numeros del archivo: %d\n", suma);
        return 0;
    }
    ```

---

## Ejercicio 3 — `w` vs `a`

**Objetivo:** Comprender la diferencia entre sobrescribir y añadir.

### Enunciado

Escribe `"Linea A"` en un archivo con modo `"w"`. Vuelve a abrirlo, esta vez con `"a"`, y añade `"Linea B"`. Muestra el contenido final. Repite el experimento usando `"w"` la segunda vez y observa la diferencia.

### Salida esperada

```
Con "a" la segunda vez:
Linea A
Linea B
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        FILE *f = fopen("prueba.txt", "w");   // crea/borra
        fprintf(f, "Linea A\n");
        fclose(f);

        f = fopen("prueba.txt", "a");          // AÑADE al final
        fprintf(f, "Linea B\n");
        fclose(f);

        f = fopen("prueba.txt", "r");
        char linea[100];
        while (fgets(linea, sizeof(linea), f) != NULL) printf("%s", linea);
        fclose(f);
        return 0;
    }
    ```

    **Experimento:** si en la segunda apertura usas `"w"` en lugar de `"a"`, "Linea A" desaparece y solo queda "Linea B". El modo `"w"` borra; `"a"` conserva.

---

## Ejercicio 4 — Contar líneas, palabras y caracteres

**Objetivo:** Procesar un archivo de texto carácter por carácter.

### Enunciado

Crea un archivo de texto con un párrafo. Luego cuéntale las líneas, palabras y caracteres (una mini versión del comando `wc` de UNIX).

### Salida esperada

```
Lineas: 3
Palabras: 12
Caracteres: 65
```

### Pistas

- Lee carácter a carácter con `fgetc` hasta `EOF`.
- Una línea termina en `'\n'`. Una palabra comienza al pasar de espacio a no-espacio.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <ctype.h>

    int main() {
        FILE *f = fopen("texto.txt", "r");
        if (f == NULL) { printf("Crea texto.txt primero.\n"); return 1; }

        int lineas = 0, palabras = 0, caracteres = 0, dentro = 0;
        int c;
        while ((c = fgetc(f)) != EOF) {
            caracteres++;
            if (c == '\n') lineas++;
            if (isspace(c)) {
                dentro = 0;
            } else if (!dentro) {
                dentro = 1;
                palabras++;
            }
        }
        fclose(f);

        printf("Lineas: %d\n", lineas);
        printf("Palabras: %d\n", palabras);
        printf("Caracteres: %d\n", caracteres);
        return 0;
    }
    ```

---

## Ejercicio 5 — Copiar un archivo

**Objetivo:** Leer de un archivo y escribir en otro simultáneamente.

### Enunciado

Copia el contenido de `origen.txt` a `destino.txt`, carácter por carácter.

### Salida esperada

```
Archivo copiado con exito (65 caracteres).
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        FILE *in = fopen("origen.txt", "r");
        if (in == NULL) { printf("No existe origen.txt\n"); return 1; }

        FILE *out = fopen("destino.txt", "w");
        if (out == NULL) { fclose(in); return 1; }

        int c, total = 0;
        while ((c = fgetc(in)) != EOF) {
            fputc(c, out);
            total++;
        }

        fclose(in);
        fclose(out);
        printf("Archivo copiado con exito (%d caracteres).\n", total);
        return 0;
    }
    ```

    **Nota:** se mantienen **dos** archivos abiertos a la vez. Cada uno necesita su propio `fclose`.

---

## Ejercicio 6 — Registro de estructuras en archivo

**Objetivo:** Guardar y recuperar un arreglo de estructuras.

### Enunciado

Define `Alumno` (nombre y promedio). Captura 3 alumnos, guárdalos en `alumnos.txt`, y luego léelos del archivo mostrando el promedio general.

### Salida esperada

```
Alumnos guardados.
--- Desde el archivo ---
Ana: 9.5
Luis: 8.0
Maria: 7.5
Promedio general: 8.33
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #define N 3

    typedef struct {
        char nombre[40];
        float promedio;
    } Alumno;

    int main() {
        Alumno grupo[N];
        for (int i = 0; i < N; i++) {
            printf("Nombre: ");   scanf("%s", grupo[i].nombre);
            printf("Promedio: "); scanf("%f", &grupo[i].promedio);
        }

        FILE *f = fopen("alumnos.txt", "w");
        if (f == NULL) return 1;
        for (int i = 0; i < N; i++)
            fprintf(f, "%s %.2f\n", grupo[i].nombre, grupo[i].promedio);
        fclose(f);
        printf("Alumnos guardados.\n");

        f = fopen("alumnos.txt", "r");
        if (f == NULL) return 1;
        Alumno a;
        float suma = 0;
        int n = 0;
        printf("--- Desde el archivo ---\n");
        while (fscanf(f, "%s %f", a.nombre, &a.promedio) == 2) {
            printf("%s: %.1f\n", a.nombre, a.promedio);
            suma += a.promedio;
            n++;
        }
        fclose(f);
        printf("Promedio general: %.2f\n", suma / n);
        return 0;
    }
    ```

---

## Ejercicio 7 — Bitácora con `append`

**Objetivo:** Usar el modo `"a"` para un registro acumulativo.

### Enunciado

Escribe un programa que cada vez que se ejecute pida un mensaje al usuario y lo **agregue** (sin borrar lo anterior) a un archivo `bitacora.txt`, antecedido por el número de entrada. Luego muestra toda la bitácora.

### Salida esperada (tercera ejecución)

```
Mensaje: Tercer dia de practica
--- Bitacora ---
[1] Primer dia
[2] Segundo dia
[3] Tercer dia de practica
```

### Pistas

- Para numerar, primero cuenta cuántas líneas hay ya en el archivo (abrir en `"r"`), o simplemente usa `"a"` y muestra todo al final.
- El modo `"a"` crea el archivo si no existe, así que funciona desde la primera ejecución.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>

    int main() {
        // contar lineas existentes para numerar
        int n = 0;
        char linea[200];
        FILE *f = fopen("bitacora.txt", "r");
        if (f != NULL) {
            while (fgets(linea, sizeof(linea), f) != NULL) n++;
            fclose(f);
        }

        // añadir el nuevo mensaje
        char mensaje[200];
        printf("Mensaje: ");
        scanf(" %[^\n]", mensaje);

        f = fopen("bitacora.txt", "a");
        if (f == NULL) return 1;
        fprintf(f, "[%d] %s\n", n + 1, mensaje);
        fclose(f);

        // mostrar toda la bitacora
        f = fopen("bitacora.txt", "r");
        printf("--- Bitacora ---\n");
        while (fgets(linea, sizeof(linea), f) != NULL) printf("%s", linea);
        fclose(f);
        return 0;
    }
    ```

    **Idea:** el modo `"a"` convierte al archivo en una memoria persistente que crece con cada ejecución. Así funcionan los registros (*logs*) de los sistemas reales.
