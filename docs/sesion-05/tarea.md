# Tarea — Sesión 5

!!! note "Instrucciones de entrega"
    Un archivo `.c` por ejercicio. Usa siempre `fgets` para leer texto con espacios y dimensiona los arreglos con margen para el `'\0'`. Nunca uses `gets`.

!!! success "Soluciones disponibles"
    Cada ejercicio incluye su solución en un bloque desplegable. Intenta resolverlo por tu cuenta **antes** de abrirla.

---

## Ejercicio T1 — Cifrado César

### Enunciado

Implementa el **cifrado César**: desplaza cada letra del texto `k` posiciones en el alfabeto (con `k = 3`, `a` → `d`, `z` → `c`). Conserva los caracteres que no sean letras (espacios, signos) sin cambios y respeta mayúsculas/minúsculas.

### Salida esperada

```
Texto: Hola Mundo
Desplazamiento: 3
Cifrado: Krod Pxqgr
```

### Casos de prueba

| Texto | k | Resultado |
|-------|---|-----------|
| abc | 1 | bcd |
| xyz | 3 | abc |
| Hola Mundo | 3 | Krod Pxqgr |
| ABC | 2 | CDE |

### Pistas

- Trabaja por separado mayúsculas (`'A'`–`'Z'`) y minúsculas (`'a'`–`'z'`).
- La fórmula con "vuelta" usa módulo: para minúsculas, `nueva = 'a' + (c - 'a' + k) % 26`.
- Solo transforma si `isalpha(c)`; cualquier otro carácter se copia tal cual.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <string.h>
    #include <ctype.h>

    int main() {
        char texto[200];
        int i, k;

        printf("Texto: ");
        fgets(texto, sizeof(texto), stdin);
        texto[strcspn(texto, "\n")] = '\0';

        printf("Desplazamiento: ");
        scanf("%d", &k);
        k = k % 26;

        for (i = 0; texto[i] != '\0'; i++) {
            char c = texto[i];
            if (c >= 'a' && c <= 'z') {
                texto[i] = 'a' + (c - 'a' + k) % 26;
            } else if (c >= 'A' && c <= 'Z') {
                texto[i] = 'A' + (c - 'A' + k) % 26;
            }
        }

        printf("Cifrado: %s\n", texto);
        return 0;
    }
    ```

---

## Ejercicio T2 — Contar la frecuencia de cada letra

### Enunciado

Lee una frase y muestra cuántas veces aparece cada letra del alfabeto (sin distinguir mayúsculas/minúsculas). Muestra solo las letras que aparecen al menos una vez.

### Salida esperada

```
Frase: programacion en c
a: 2
c: 2
e: 1
g: 1
i: 1
m: 1
n: 2
o: 2
p: 1
r: 2
```

### Pistas

- Usa un arreglo `conteo[26]` inicializado en 0.
- Para cada letra, el índice es `tolower(c) - 'a'`.
- Al final, recorre `conteo` e imprime solo los que sean mayores que 0.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <ctype.h>

    int main() {
        char frase[200];
        int conteo[26] = {0};
        int i;

        printf("Frase: ");
        fgets(frase, sizeof(frase), stdin);

        for (i = 0; frase[i] != '\0'; i++) {
            if (isalpha(frase[i])) {
                conteo[tolower(frase[i]) - 'a']++;
            }
        }

        for (i = 0; i < 26; i++) {
            if (conteo[i] > 0) {
                printf("%c: %d\n", 'a' + i, conteo[i]);
            }
        }
        return 0;
    }
    ```

---

## Ejercicio T3 — Validar una contraseña

### Enunciado

Pide una contraseña y verifica que cumpla **todas** estas reglas. Indica cuáles cumple y cuáles no:

- Al menos 8 caracteres.
- Al menos una mayúscula.
- Al menos una minúscula.
- Al menos un dígito.

### Salida esperada

```
Contraseña: Hola1234
[OK] Longitud minima (8)
[OK] Tiene mayuscula
[OK] Tiene minuscula
[OK] Tiene digito
Resultado: VALIDA
```

### Casos de prueba

| Contraseña | Resultado |
|------------|-----------|
| Hola1234 | Válida |
| hola1234 | Inválida (sin mayúscula) |
| Hola | Inválida (corta, sin dígito) |
| HOLA1234 | Inválida (sin minúscula) |

### Pistas

- Recorre la cadena una vez activando banderas (`tieneMayus`, `tieneMinus`, `tieneDigito`).
- La longitud se obtiene con `strlen`.
- La contraseña es válida solo si **todas** las banderas están activas.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <string.h>
    #include <ctype.h>

    int main() {
        char pass[50];
        int i, mayus = 0, minus = 0, digito = 0, largo;

        printf("Contrasena: ");
        scanf("%s", pass);
        largo = strlen(pass);

        for (i = 0; pass[i] != '\0'; i++) {
            if (isupper(pass[i])) mayus = 1;
            if (islower(pass[i])) minus = 1;
            if (isdigit(pass[i])) digito = 1;
        }

        printf("[%s] Longitud minima (8)\n", largo >= 8 ? "OK" : "  ");
        printf("[%s] Tiene mayuscula\n",     mayus    ? "OK" : "  ");
        printf("[%s] Tiene minuscula\n",     minus    ? "OK" : "  ");
        printf("[%s] Tiene digito\n",        digito   ? "OK" : "  ");

        if (largo >= 8 && mayus && minus && digito)
            printf("Resultado: VALIDA\n");
        else
            printf("Resultado: INVALIDA\n");
        return 0;
    }
    ```

---

## Ejercicio T4 — Invertir el orden de las palabras

### Enunciado

Lee una frase e imprime sus palabras en orden inverso (la última primero). Las letras de cada palabra conservan su orden.

### Salida esperada

```
Frase: el gato come pescado
Invertida: pescado come gato el
```

### Casos de prueba

| Entrada | Salida |
|---------|--------|
| hola mundo | mundo hola |
| uno dos tres | tres dos uno |
| sola | sola |

### Pistas

- Una estrategia sencilla: recorre la cadena de **derecha a izquierda**. Cuando detectes el inicio de una palabra, imprímela hacia adelante.
- Alternativa: usa `strtok` para separar por espacios y guarda las palabras en una matriz `char palabras[20][30]`, luego imprímelas al revés.

### Solución

??? example "Ver solución"
    ```c
    #include <stdio.h>
    #include <string.h>

    int main() {
        char frase[200];
        char palabras[30][50];
        int n = 0;
        char *token;

        printf("Frase: ");
        fgets(frase, sizeof(frase), stdin);
        frase[strcspn(frase, "\n")] = '\0';

        token = strtok(frase, " ");
        while (token != NULL) {
            strcpy(palabras[n], token);
            n++;
            token = strtok(NULL, " ");
        }

        printf("Invertida:");
        for (int i = n - 1; i >= 0; i--) {
            printf(" %s", palabras[i]);
        }
        printf("\n");
        return 0;
    }
    ```

    **Nota:** `strtok` parte la cadena en *tokens* usando los delimitadores indicados. La primera llamada recibe la cadena; las siguientes reciben `NULL` para continuar donde quedó.

---

## Reto opcional — Detectar anagramas

### Enunciado

Lee dos palabras y determina si son **anagramas** (contienen exactamente las mismas letras con las mismas frecuencias, como "roma" y "amor").

### Pistas

- Cuenta la frecuencia de cada letra en ambas palabras usando dos arreglos `conteo1[26]` y `conteo2[26]`.
- Son anagramas si y solo si ambos arreglos de frecuencias son idénticos.
- Alternativa elegante: usa **un solo** arreglo, súmale al contar la primera palabra y réstale al contar la segunda; si al final todo es 0, son anagramas.
