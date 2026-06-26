# Ejercicios en Clase — Sesión 5

---

## Ejercicio 1 — Longitud sin `strlen`

**Objetivo:** Entender cómo el `'\0'` delimita una cadena.

### Enunciado

Pide una palabra al usuario y calcula su longitud **sin usar** `strlen`, recorriéndola hasta encontrar el `'\0'`. Luego compara tu resultado con `strlen` para verificar.

### Salida esperada

```
Escribe una palabra: programacion
Longitud manual: 12
Longitud strlen: 12
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <string.h>

    int main() {
        char palabra[50];
        int i = 0;

        printf("Escribe una palabra: ");
        scanf("%s", palabra);

        while (palabra[i] != '\0') {
            i++;
        }

        printf("Longitud manual: %d\n", i);
        printf("Longitud strlen: %zu\n", strlen(palabra));
        return 0;
    }
    ```

---

## Ejercicio 2 — Contar vocales, consonantes y dígitos

**Objetivo:** Clasificar caracteres con `ctype.h`.

### Enunciado

Lee una frase completa (con espacios) y cuenta cuántas vocales, consonantes y dígitos contiene.

### Salida esperada

```
Frase: Hola Mundo 2024
Vocales: 4
Consonantes: 5
Digitos: 4
```

### Pistas

- Usa `fgets` para leer la frase con espacios.
- Para distinguir vocal de consonante, primero verifica con `isalpha`, luego revisa si es vocal.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <ctype.h>

    int main() {
        char frase[100];
        int i, vocales = 0, consonantes = 0, digitos = 0;

        printf("Frase: ");
        fgets(frase, sizeof(frase), stdin);

        for (i = 0; frase[i] != '\0'; i++) {
            char c = tolower(frase[i]);
            if (isalpha(c)) {
                if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u') vocales++;
                else consonantes++;
            } else if (isdigit(c)) {
                digitos++;
            }
        }

        printf("Vocales: %d\n", vocales);
        printf("Consonantes: %d\n", consonantes);
        printf("Digitos: %d\n", digitos);
        return 0;
    }
    ```

---

## Ejercicio 3 — Convertir a mayúsculas

**Objetivo:** Transformar una cadena en su lugar.

### Enunciado

Lee una palabra y conviértela completamente a mayúsculas modificando el propio arreglo. Imprime el resultado.

### Salida esperada

```
Palabra: Hola
HOLA
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <ctype.h>

    int main() {
        char palabra[50];
        int i;

        printf("Palabra: ");
        scanf("%s", palabra);

        for (i = 0; palabra[i] != '\0'; i++) {
            palabra[i] = toupper(palabra[i]);
        }

        printf("%s\n", palabra);
        return 0;
    }
    ```

---

## Ejercicio 4 — ¿Es un palíndromo?

**Objetivo:** Recorrer una cadena desde ambos extremos.

### Enunciado

Determina si una palabra es un **palíndromo** (se lee igual al derecho y al revés, como "reconocer" o "anita"). Ignora mayúsculas/minúsculas.

### Salida esperada

```
Palabra: Anita
Es palindromo.
```

### Pistas

- Usa dos índices: uno al inicio (`i = 0`) y otro al final (`j = strlen - 1`).
- Compara `palabra[i]` con `palabra[j]` convertidos a la misma capitalización; avanza `i`, retrocede `j`.
- Si en algún momento difieren, no es palíndromo.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <string.h>
    #include <ctype.h>

    int main() {
        char palabra[50];
        int i, j, esPalindromo = 1;

        printf("Palabra: ");
        scanf("%s", palabra);

        i = 0;
        j = strlen(palabra) - 1;
        while (i < j) {
            if (tolower(palabra[i]) != tolower(palabra[j])) {
                esPalindromo = 0;
                break;
            }
            i++;
            j--;
        }

        if (esPalindromo) printf("Es palindromo.\n");
        else              printf("No es palindromo.\n");
        return 0;
    }
    ```

---

## Ejercicio 5 — Contar palabras

**Objetivo:** Detectar transiciones de espacio a no-espacio.

### Enunciado

Lee una frase y cuenta cuántas palabras tiene. Una palabra es una secuencia de caracteres separada por uno o más espacios.

### Salida esperada

```
Frase: el rapido zorro marron
Palabras: 4
```

### Pistas

- Una palabra **empieza** cuando el carácter actual no es espacio y el anterior sí lo era (o es el inicio).
- Usa una bandera `dentroDePalabra` para saber si vienes de un espacio.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <ctype.h>

    int main() {
        char frase[200];
        int i, palabras = 0, dentro = 0;

        printf("Frase: ");
        fgets(frase, sizeof(frase), stdin);

        for (i = 0; frase[i] != '\0'; i++) {
            if (!isspace(frase[i])) {
                if (!dentro) {        // inicia una nueva palabra
                    palabras++;
                    dentro = 1;
                }
            } else {
                dentro = 0;           // fin de palabra
            }
        }

        printf("Palabras: %d\n", palabras);
        return 0;
    }
    ```

---

## Ejercicio 6 — Buscar y reemplazar un carácter

**Objetivo:** Modificar una cadena según una condición.

### Enunciado

Lee una frase y reemplaza todos los espacios por guiones bajos (`_`). Cuenta cuántos reemplazos hiciste.

### Salida esperada

```
Frase: hola mundo cruel
Resultado: hola_mundo_cruel
Reemplazos: 2
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <string.h>

    int main() {
        char frase[200];
        int i, reemplazos = 0;

        printf("Frase: ");
        fgets(frase, sizeof(frase), stdin);
        frase[strcspn(frase, "\n")] = '\0';   // quita el salto de linea

        for (i = 0; frase[i] != '\0'; i++) {
            if (frase[i] == ' ') {
                frase[i] = '_';
                reemplazos++;
            }
        }

        printf("Resultado: %s\n", frase);
        printf("Reemplazos: %d\n", reemplazos);
        return 0;
    }
    ```

---

## Ejercicio 7 — Comparar y ordenar dos nombres

**Objetivo:** Usar `strcmp` para ordenar alfabéticamente.

### Enunciado

Lee dos nombres y muéstralos en orden alfabético.

### Salida esperada

```
Nombre 1: Carlos
Nombre 2: Ana
Orden alfabetico: Ana, Carlos
```

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <string.h>

    int main() {
        char n1[50], n2[50];

        printf("Nombre 1: ");
        scanf("%s", n1);
        printf("Nombre 2: ");
        scanf("%s", n2);

        if (strcmp(n1, n2) < 0) {
            printf("Orden alfabetico: %s, %s\n", n1, n2);
        } else {
            printf("Orden alfabetico: %s, %s\n", n2, n1);
        }
        return 0;
    }
    ```

    **Recuerda:** `strcmp` devuelve negativo si el primero va antes alfabéticamente, 0 si son iguales y positivo si va después.
