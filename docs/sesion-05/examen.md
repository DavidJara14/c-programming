# Examen — Sesión 5: Cadenas

!!! note "Instrucciones"
    Examen de autoevaluación teórica. Resuélvelo **sin consultar** apuntes ni compilador; contrasta después con las respuestas desplegables. Tiempo sugerido: **45 minutos**. Puntaje total: **100 puntos**.

---

## Parte A — Opción múltiple (40 pts, 5 c/u)

**1.** ¿Cuántos bytes ocupa la cadena `"C es genial"`?

- a) 10
- b) 11
- c) 12
- d) 9

**2.** ¿Qué carácter marca el final de toda cadena en C?

- a) `'\n'`
- b) `' '`
- c) `'\0'`
- d) `'0'`

**3.** ¿Cuál es la forma **segura** de leer una línea con espacios?

- a) `scanf("%s", s)`
- b) `gets(s)`
- c) `fgets(s, sizeof(s), stdin)`
- d) `scanf("%c", s)`

**4.** ¿Qué devuelve `strcmp("casa", "casa")`?

- a) 1
- b) 0
- c) −1
- d) La longitud de la cadena

**5.** ¿Cuál es el valor de `'9' - '0'`?

- a) 9
- b) 57
- c) 48
- d) `'9'`

**6.** ¿Por qué `if (s1 == s2)` es incorrecto para comparar cadenas?

- a) Porque `==` no existe en C
- b) Porque compara direcciones de memoria, no el texto
- c) Porque hay que usar `=`
- d) No es incorrecto

**7.** ¿Qué hace `strcat(a, b)`?

- a) Copia `b` sobre `a`
- b) Concatena `b` al final de `a`
- c) Compara `a` con `b`
- d) Devuelve la longitud de `a`

**8.** Tras `char s[] = "Hola";`, ¿cuánto vale `strlen(s)`?

- a) 4
- b) 5
- c) 3
- d) Indefinido

??? success "Respuestas Parte A"
    | # | Resp. | Justificación |
    |---|-------|---------------|
    | 1 | **c** | 11 caracteres visibles + el `'\0'` = 12 bytes |
    | 2 | **c** | El carácter nulo `'\0'` (valor 0) |
    | 3 | **c** | `fgets` limita el tamaño y acepta espacios |
    | 4 | **b** | 0 significa "cadenas iguales" |
    | 5 | **a** | Resta de códigos ASCII: 57 − 48 = 9 |
    | 6 | **b** | Compara punteros, no contenido; usar `strcmp` |
    | 7 | **b** | Une `b` al final de `a` |
    | 8 | **a** | `strlen` no cuenta el `'\0'` |

---

## Parte B — Verdadero o Falso (20 pts, 4 c/u)

1. `char c = 'A';` y `char s[] = "A";` ocupan el mismo número de bytes. `____`
2. `scanf("%s", nombre)` lee la frase completa incluyendo los espacios. `____`
3. Un `char` puede usarse en operaciones aritméticas porque guarda un código ASCII. `____`
4. Para copiar una cadena en otra se usa el operador `=`. `____`
5. `gets()` fue eliminada del estándar de C por ser insegura. `____`

??? success "Respuestas Parte B"
    1. **F** — `'A'` ocupa 1 byte; `"A"` ocupa 2 (la letra y el `'\0'`).
    2. **F** — `scanf("%s")` corta en el primer espacio; lee solo una palabra.
    3. **V** — Internamente es un entero; `'a'+1` da `'b'`.
    4. **F** — Se usa `strcpy`; no se puede asignar a un arreglo con `=`.
    5. **V** — Desde C11, por su riesgo de desbordamiento de búfer.

---

## Parte C — ¿Qué imprime? (20 pts, 10 c/u)

**Código 1**

```c
char s[] = "abcdef";
printf("%c%c\n", s[0], s[strlen(s) - 1]);
```

**Código 2**

```c
char s[10] = "Hola";
strcat(s, "!");
for (int i = 0; s[i] != '\0'; i++) {
    if (s[i] == 'o') s[i] = '0';
}
printf("%s\n", s);
```

??? success "Respuestas Parte C"
    **Código 1 →** `af`. `s[0]` es `'a'`; `strlen` es 6, así que `s[5]` es `'f'`.

    **Código 2 →** `H0la!`. Tras `strcat`, `s` es `"Hola!"`; luego la `'o'` se reemplaza por `'0'`.

---

## Parte D — Detecta el error (10 pts)

Este programa pretende guardar un saludo y mostrarlo, pero falla. Encuentra **dos** problemas.

```c
#include <stdio.h>
int main() {
    char saludo[5];
    saludo = "Buenos dias";
    printf("%s\n", saludo);
    return 0;
}
```

??? success "Respuesta Parte D"
    1. **Asignación con `=`:** no se puede asignar una cadena a un arreglo. Hay que usar `strcpy(saludo, "...")` (con `#include <string.h>`).
    2. **Tamaño insuficiente:** `"Buenos dias"` necesita 12 bytes, pero `saludo` solo tiene 5. El arreglo debe ser, por ejemplo, `char saludo[20];`.

    ```c
    #include <stdio.h>
    #include <string.h>
    int main() {
        char saludo[20];
        strcpy(saludo, "Buenos dias");
        printf("%s\n", saludo);
        return 0;
    }
    ```

---

## Parte E — Desarrollo (10 pts)

Explica en 3–5 líneas qué es un *buffer overflow* en el contexto de cadenas y por qué `fgets` ayuda a prevenirlo frente a `scanf("%s")` o `gets`.

??? success "Respuesta orientativa Parte E"
    Un *buffer overflow* ocurre cuando se escriben más caracteres de los que caben en el arreglo destino, sobrescribiendo memoria contigua que pertenece a otras variables o al control del programa. `gets` y `scanf("%s")` no limitan cuántos caracteres leen, así que una entrada larga puede desbordar el búfer y provocar fallos o vulnerabilidades de seguridad. `fgets` recibe el **tamaño máximo** del destino y nunca escribe más allá de él, por lo que la entrada se trunca de forma segura en lugar de corromper la memoria.
