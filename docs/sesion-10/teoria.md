# Sesión 10 — Archivos

> *Todo lo que tus programas han hecho hasta ahora desaparece al cerrarse: las variables viven en memoria, y la memoria se borra. Los archivos rompen esa limitación. Son la forma en que un programa deja huella permanente en el disco: una calificación que se guarda, un documento que se reabre mañana, una partida que continúa donde quedó. En UNIX —el sistema para el que nació C— la idea fue tan central que se acuñó una frase: "todo es un archivo". Teclado, pantalla, red y disco se manejan con las mismas funciones que aprenderás hoy.*

---

## Funciones y conceptos de esta sesión

| Función / Concepto | Firma | Descripción |
|--------------------|-------|-------------|
| `FILE` | `FILE *f;` | Tipo que representa un archivo abierto |
| `fopen` | `FILE *fopen(const char *ruta, const char *modo)` | Abre un archivo; devuelve `NULL` si falla |
| `fclose` | `int fclose(FILE *f)` | Cierra el archivo y guarda los cambios |
| `fprintf` | `int fprintf(FILE *f, ...)` | Escribe con formato (como `printf`, pero a archivo) |
| `fscanf` | `int fscanf(FILE *f, ...)` | Lee con formato (como `scanf`, pero desde archivo) |
| `fgets` | `char *fgets(char *s, int n, FILE *f)` | Lee una línea del archivo |
| `fputs` | `int fputs(const char *s, FILE *f)` | Escribe una cadena |
| `fgetc` / `fputc` | — | Lee / escribe un carácter |
| `feof` | `int feof(FILE *f)` | Indica si se llegó al fin del archivo |

Todas viven en `<stdio.h>`.

---

## 1. El flujo de trabajo con archivos

Trabajar con un archivo siempre sigue tres pasos, en este orden:

1. **Abrir** el archivo con `fopen`, indicando qué quieres hacer (leer, escribir…).
2. **Operar**: leer o escribir datos.
3. **Cerrar** con `fclose` para asegurar que los datos se guarden en disco.

```c
FILE *f = fopen("datos.txt", "w");   // 1. abrir para escritura
if (f == NULL) {                     //    verificar que se abrió
    printf("No se pudo abrir el archivo.\n");
    return 1;
}
fprintf(f, "Hola archivo\n");        // 2. operar
fclose(f);                           // 3. cerrar
```

!!! danger "Verifica SIEMPRE que `fopen` no devolvió `NULL`"
    Un archivo puede no abrirse por muchas razones: no existe, no tienes permisos, la ruta es inválida. Si `fopen` falla devuelve `NULL`, y usar ese `NULL` con `fprintf`/`fscanf` provoca un fallo grave. Comprobar el resultado de `fopen` no es opcional.

!!! warning "Olvidar `fclose` puede perder datos"
    Al escribir, los datos pasan primero por un búfer en memoria y se vuelcan al disco al cerrar. Si no llamas `fclose`, parte de lo escrito puede no llegar nunca al archivo. Además, cada archivo abierto consume un recurso del sistema.

---

## 2. Modos de apertura

El segundo argumento de `fopen` indica qué se hará con el archivo:

| Modo | Nombre | Si el archivo existe | Si no existe |
|------|--------|----------------------|--------------|
| `"r"` | lectura | Lo abre para leer | **Falla** (`NULL`) |
| `"w"` | escritura | **Borra** su contenido | Lo crea |
| `"a"` | añadir (*append*) | Escribe al final | Lo crea |
| `"r+"` | lectura/escritura | Lo abre sin borrar | Falla |
| `"w+"` | lectura/escritura | Lo borra | Lo crea |
| `"a+"` | lectura/añadir | Añade al final | Lo crea |

!!! danger "`\"w\"` borra el archivo sin avisar"
    Abrir un archivo existente en modo `"w"` elimina **todo** su contenido de inmediato. Si lo que quieres es conservar lo anterior y agregar más, usa `"a"`. Este es un error que puede costar datos importantes.

!!! note "Modo texto y modo binario"
    Añadir una `b` al modo (`"rb"`, `"wb"`) abre el archivo en modo **binario**, sin traducir saltos de línea. Es necesario para datos no textuales (imágenes, estructuras crudas con `fread`/`fwrite`). En este curso trabajaremos sobre todo con archivos de **texto**.

---

## 3. Escribir en un archivo

### Con `fprintf` (texto con formato)

Idéntica a `printf`, pero el primer argumento es el archivo:

```c
FILE *f = fopen("notas.txt", "w");
if (f == NULL) return 1;

fprintf(f, "Ana 9.5\n");
fprintf(f, "Luis 8.0\n");

fclose(f);
```

### Con `fputs` (cadenas sin formato)

```c
fputs("Una linea de texto\n", f);
```

---

## 4. Leer de un archivo

### Con `fscanf` (datos con formato)

Lee campo por campo, igual que `scanf`. Devuelve cuántos elementos leyó (o `EOF` al final).

```c
FILE *f = fopen("notas.txt", "r");
if (f == NULL) return 1;

char nombre[50];
float nota;

while (fscanf(f, "%s %f", nombre, &nota) == 2) {   // hasta que falle
    printf("%s saco %.1f\n", nombre, nota);
}

fclose(f);
```

!!! tip "El idioma para leer hasta el final"
    `fscanf` devuelve el número de campos leídos con éxito. Mientras coincida con lo esperado (`== 2` para dos campos), hay datos válidos. Cuando llega al final, devuelve algo distinto y el ciclo termina. Este patrón es más confiable que usar `feof` directamente.

### Con `fgets` (línea por línea)

Para leer líneas completas (con espacios), de forma segura:

```c
char linea[200];
while (fgets(linea, sizeof(linea), f) != NULL) {   // NULL marca el final
    printf("%s", linea);
}
```

---

## 5. `feof` y por qué no abusar de él

`feof(f)` devuelve verdadero **después** de intentar leer más allá del final. Un error muy común es usarlo como condición del ciclo:

```c
while (!feof(f)) {            // RIESGOSO: suele leer la última línea dos veces
    fscanf(f, "%s %f", nombre, &nota);
    printf("%s %.1f\n", nombre, nota);
}
```

El problema: `feof` solo se activa **tras** una lectura fallida, así que la última iteración procesa datos viejos. La forma correcta es controlar el ciclo con el **valor de retorno** de la función de lectura, como en los ejemplos anteriores.

---

## 6. Lectura y escritura carácter por carácter

```c
int c;                            // int, no char, para detectar EOF
FILE *f = fopen("texto.txt", "r");

while ((c = fgetc(f)) != EOF) {   // lee carácter a carácter
    putchar(c);                   // lo imprime en pantalla
}
fclose(f);
```

!!! note "¿Por qué `int` y no `char`?"
    `fgetc` devuelve un `int` porque necesita un valor extra (`EOF`, normalmente −1) que no cabe en el rango de los caracteres normales. Si guardaras el resultado en un `char`, podrías confundir un byte válido con el fin de archivo.

---

## 7. Archivos y estructuras: un mini sistema persistente

Combinando todo el curso, podemos **guardar** registros y **recuperarlos** después:

```c
#include <stdio.h>

typedef struct {
    char nombre[40];
    int edad;
    float promedio;
} Alumno;

int main() {
    Alumno grupo[2] = {{"Ana", 20, 9.5}, {"Luis", 22, 8.0}};

    // Guardar
    FILE *f = fopen("grupo.txt", "w");
    if (f == NULL) return 1;
    for (int i = 0; i < 2; i++) {
        fprintf(f, "%s %d %.2f\n",
                grupo[i].nombre, grupo[i].edad, grupo[i].promedio);
    }
    fclose(f);

    // Recuperar
    Alumno leido;
    f = fopen("grupo.txt", "r");
    if (f == NULL) return 1;
    while (fscanf(f, "%s %d %f",
           leido.nombre, &leido.edad, &leido.promedio) == 3) {
        printf("%s (%d): %.2f\n", leido.nombre, leido.edad, leido.promedio);
    }
    fclose(f);
    return 0;
}
```

Este patrón —guardar estructuras línea por línea y recuperarlas— es la base de cualquier programa que "recuerde" información entre ejecuciones: una agenda, un inventario, un sistema de calificaciones.

---

## 8. Errores comunes con archivos

### No verificar `fopen`

```c
FILE *f = fopen("datos.txt", "r");
fscanf(f, "%d", &x);   // INCORRECTO si el archivo no existe: f es NULL
```

### Usar `"w"` cuando se quería conservar el contenido

```c
fopen("importante.txt", "w");   // BORRA todo lo que había
fopen("importante.txt", "a");   // CORRECTO si querías añadir
```

### Olvidar `fclose`

```c
FILE *f = fopen("salida.txt", "w");
fprintf(f, "datos");
// falta fclose(f);  -> los datos pueden no guardarse
```

### Confundir el orden de argumentos de `fprintf`

```c
fprintf("%d", f, x);    // INCORRECTO
fprintf(f, "%d", x);    // CORRECTO: primero el archivo, luego el formato
```

### Usar `feof` como condición del ciclo

```c
while (!feof(f)) { ... }   // procesa la última línea dos veces
while (fscanf(f, "%d", &x) == 1) { ... }   // CORRECTO
```

### Leer un archivo abierto en modo escritura (o viceversa)

```c
FILE *f = fopen("datos.txt", "w");
fscanf(f, "%d", &x);    // INCORRECTO: "w" es solo escritura
```
