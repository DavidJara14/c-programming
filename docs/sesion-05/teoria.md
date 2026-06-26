# Sesión 5 — Cadenas

> *El 2 de noviembre de 1988, el "gusano de Morris" infectó cerca del 10% de Internet. Una de las puertas que usó fue la función `gets()` de C, que lee texto sin verificar cuánto cabe en el destino. Ese ataque, un* buffer overflow *sobre una cadena, fue tan influyente que en 2011 el estándar C eliminó `gets()` del lenguaje. Las cadenas en C son poderosas, pero exigen disciplina: detrás de cada `char[]` hay una zona de memoria que tú debes respetar.*

---

## Palabras reservadas y conceptos de esta sesión

| Concepto | Sintaxis | Significado |
|----------|----------|-------------|
| `char` | `char c = 'A';` | Tipo para un solo carácter (un byte) |
| Cadena | `char s[20];` | Arreglo de `char` terminado en `'\0'` |
| `'\0'` | carácter nulo | Marca el **fin** de la cadena (valor 0) |
| `%c` | `printf("%c", c)` | Formato para un carácter |
| `%s` | `printf("%s", s)` | Formato para una cadena completa |
| `" "` | `"Hola"` | Literal de cadena (incluye `'\0'` automáticamente) |

---

## 1. Un carácter no es una cadena

En C conviven dos conceptos parecidos pero distintos:

```c
char letra = 'A';      // comillas SIMPLES: un solo carácter
char palabra[] = "A";  // comillas DOBLES: una cadena de 2 bytes ('A' y '\0')
```

Internamente, un `char` es un **entero pequeño** (un byte) que guarda el código ASCII del símbolo. `'A'` vale 65, `'a'` vale 97, `'0'` vale 48.

```c
char c = 'A';
printf("%c vale %d\n", c, c);   // imprime: A vale 65
printf("%c\n", c + 1);          // imprime: B  (66 -> 'B')
```

!!! note "Aritmética con caracteres"
    Como los caracteres son números, puedes operar con ellos. `'a' + 3` es `'d'`. Para convertir un dígito-carácter a su valor numérico: `'7' - '0'` da `7`. Este truco es la base de muchos algoritmos de texto.

---

## 2. Una cadena es un arreglo de `char` que termina en `'\0'`

Una **cadena** (*string*) es un arreglo de caracteres que termina con el **carácter nulo** `'\0'` (valor cero). Ese terminador es lo que permite a las funciones saber dónde acaba el texto, sin necesidad de conocer el tamaño del arreglo.

```c
char nombre[6] = "Hola";
```

```
Índice:   0    1    2    3    4    5
        +----+----+----+----+----+----+
        | H  | o  | l  | a  | \0 | ?  |
        +----+----+----+----+----+----+
                              ↑
                         fin de cadena
```

!!! danger "Reserva espacio para el `'\0'`"
    La palabra `"Hola"` tiene 4 letras pero ocupa **5 bytes** (las 4 letras más el terminador). Si declaras `char s[4] = "Hola";` no cabe el `'\0'` y tendrás una cadena sin terminar: cualquier función que la recorra seguirá leyendo memoria ajena hasta encontrar un cero por casualidad.

### Formas de inicializar

```c
char a[] = "Hola";                       // tamaño deducido: 5 (4 + '\0')
char b[10] = "Hola";                     // 10 bytes, los 5 primeros usados
char c[] = {'H', 'o', 'l', 'a', '\0'};   // equivalente, carácter por carácter
```

---

## 3. Leer e imprimir cadenas

### Imprimir con `%s`

```c
char ciudad[] = "Toluca";
printf("Ciudad: %s\n", ciudad);   // imprime hasta el '\0'
```

### Leer con `scanf("%s", ...)` — y su limitación

```c
char nombre[20];
scanf("%s", nombre);   // ¡SIN & ! el arreglo ya es una dirección
```

!!! warning "`scanf(\"%s\")` se detiene en el primer espacio"
    `scanf("%s", nombre)` solo lee **una palabra**: corta en el primer espacio, tabulador o salto de línea. Si el usuario escribe `Juan Pérez`, solo se guarda `Juan`. Además, no limita cuántos caracteres lee, así que puede desbordar el arreglo.

### La forma segura: `fgets`

Para leer una línea completa (con espacios) y de forma segura, se usa `fgets`, que **nunca** escribe más allá del tamaño indicado:

```c
char linea[50];
fgets(linea, sizeof(linea), stdin);
```

!!! note "`fgets` conserva el salto de línea"
    `fgets` incluye el `'\n'` que el usuario presionó con Enter. Para eliminarlo:

    ```c
    #include <string.h>
    linea[strcspn(linea, "\n")] = '\0';   // corta en el primer '\n'
    ```

---

## 4. La librería `string.h`

Manipular cadenas a mano es tedioso; `string.h` ofrece funciones estándar.

| Función | Firma | Descripción |
|---------|-------|-------------|
| `strlen` | `size_t strlen(const char *s)` | Longitud (sin contar el `'\0'`) |
| `strcpy` | `char *strcpy(char *dest, const char *src)` | Copia `src` en `dest` |
| `strncpy` | `char *strncpy(char *dest, const char *src, size_t n)` | Copia a lo sumo `n` caracteres |
| `strcat` | `char *strcat(char *dest, const char *src)` | Concatena `src` al final de `dest` |
| `strcmp` | `int strcmp(const char *a, const char *b)` | Compara: 0 si son iguales |
| `strchr` | `char *strchr(const char *s, int c)` | Busca un carácter |
| `strstr` | `char *strstr(const char *s, const char *sub)` | Busca una subcadena |

```c
#include <string.h>

char saludo[20] = "Hola";
printf("%zu\n", strlen(saludo));   // 4

strcat(saludo, " mundo");          // saludo = "Hola mundo"

char copia[20];
strcpy(copia, saludo);             // copia = "Hola mundo"
```

!!! danger "Compara cadenas con `strcmp`, NUNCA con `==`"
    `if (s1 == s2)` compara **direcciones de memoria**, no contenido. Para comparar el texto:

    ```c
    if (strcmp(s1, s2) == 0) {   // 0 significa "son iguales"
        printf("Iguales\n");
    }
    ```

    `strcmp` devuelve 0 si son iguales, un valor negativo si `s1` va antes alfabéticamente y positivo si va después.

---

## 5. La librería `ctype.h`

Funciones para clasificar y transformar caracteres individuales. Todas reciben un `int` (el carácter) y devuelven un `int`.

| Función | Devuelve verdadero si… |
|---------|------------------------|
| `isalpha(c)` | es una letra |
| `isdigit(c)` | es un dígito (0–9) |
| `isspace(c)` | es espacio, tab o salto de línea |
| `isupper(c)` / `islower(c)` | es mayúscula / minúscula |
| `toupper(c)` / `tolower(c)` | convierte a mayúscula / minúscula |

```c
#include <ctype.h>

char c = 'a';
printf("%c\n", toupper(c));   // A

if (isdigit('7')) {
    printf("Es un digito\n");
}
```

---

## 6. Recorrer una cadena carácter por carácter

Como una cadena es un arreglo, puedes recorrerla con un ciclo. La condición de parada es llegar al `'\0'`.

```c
char texto[] = "Hola Mundo";
int i;

for (i = 0; texto[i] != '\0'; i++) {
    printf("%c-", texto[i]);   // H-o-l-a- -M-u-n-d-o-
}
```

### Ejemplo: contar vocales

```c
#include <stdio.h>
#include <ctype.h>

int main() {
    char texto[100];
    int i, vocales = 0;

    printf("Escribe una frase: ");
    fgets(texto, sizeof(texto), stdin);

    for (i = 0; texto[i] != '\0'; i++) {
        char c = tolower(texto[i]);
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            vocales++;
        }
    }

    printf("Vocales: %d\n", vocales);
    return 0;
}
```

---

## 7. Errores comunes con cadenas

### Olvidar el espacio del `'\0'`

```c
char s[5] = "Hola!";   // INCORRECTO: 5 letras + '\0' necesitan 6 bytes
```

### Comparar con `==`

```c
if (nombre == "admin")   // INCORRECTO: compara direcciones
if (strcmp(nombre, "admin") == 0)   // CORRECTO
```

### Asignar con `=` en lugar de `strcpy`

```c
char s[20];
s = "Hola";            // INCORRECTO: no se puede asignar a un arreglo
strcpy(s, "Hola");     // CORRECTO
```

### Usar `&` con `%s` en `scanf`

```c
scanf("%s", &nombre);   // INCORRECTO (aunque a veces "funciona"): sobra el &
scanf("%s", nombre);    // CORRECTO: el nombre del arreglo ya es la dirección
```

### Usar `gets`

```c
gets(nombre);           // PROHIBIDO: no limita el tamaño, vulnerabilidad clásica
fgets(nombre, sizeof(nombre), stdin);   // CORRECTO
```

### Concatenar sin espacio suficiente

```c
char s[6] = "Hola";
strcat(s, " mundo");    // INCORRECTO: el resultado no cabe en 6 bytes
```

`strcat` no verifica el tamaño del destino: es responsabilidad tuya que el resultado quepa.
