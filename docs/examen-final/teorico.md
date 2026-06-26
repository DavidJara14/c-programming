# Examen Final — Teórico

!!! note "Instrucciones"
    Examen final teórico **integrador**: cubre las diez sesiones del curso. Resuélvelo **sin consultar** apuntes ni compilador. Tiempo sugerido: **90 minutos**. Puntaje total: **100 puntos**. Las respuestas están al final de cada sección; úsalas solo para calificarte.

!!! warning "Nivel desafiante"
    Este examen no premia la memoria, sino la comprensión. Varias preguntas combinan conceptos de distintas sesiones (apuntadores con estructuras, memoria dinámica con archivos). Tómate tu tiempo y razona cada caso.

---

## Parte A — Opción múltiple (30 pts, 2 c/u)

**1.** ¿Cuál es el resultado de `17 % 5 + 17 / 5`?

- a) 5
- b) 6
- c) 7
- d) 8

**2.** ¿Qué imprime `printf("%d", 'A')` sabiendo que `'A'` vale 65?

- a) `A`
- b) `65`
- c) `%d`
- d) Error

**3.** En `if (a || b)`, si `a` es verdadero, ¿qué pasa con `b`?

- a) Se evalúa siempre
- b) No se evalúa (cortocircuito)
- c) Provoca error
- d) Se asigna a `a`

**4.** ¿Cuántas veces se ejecuta el cuerpo de `for (int i = 10; i > 0; i -= 2)`?

- a) 4
- b) 5
- c) 6
- d) 10

**5.** En `int v[5];`, ¿cuál es la dirección equivalente a `v`?

- a) `&v[5]`
- b) `&v[0]`
- c) `v[0]`
- d) `*v`

**6.** ¿Qué vale `strlen("C\\n")` (la cadena contiene `C` y un salto de línea real)?

- a) 1
- b) 2
- c) 3
- d) 4

**7.** Dada `int *p = &x;`, ¿qué expresión modifica `x`?

- a) `p = 5;`
- b) `*p = 5;`
- c) `&p = 5;`
- d) `p == 5;`

**8.** Una función `void f(int v[], int n)` recibe un arreglo. Dentro, `sizeof(v)` da…

- a) el tamaño del arreglo completo
- b) el tamaño de un apuntador
- c) `n`
- d) un error

**9.** ¿Qué función reserva memoria e inicializa en cero?

- a) `malloc`
- b) `calloc`
- c) `realloc`
- d) `free`

**10.** Para acceder al campo `edad` mediante `Persona *p`, se escribe…

- a) `p.edad`
- b) `*p.edad`
- c) `p->edad`
- d) `p[edad]`

**11.** ¿Qué modo de `fopen` **borra** el contenido de un archivo existente?

- a) `"r"`
- b) `"a"`
- c) `"w"`
- d) `"r+"`

**12.** ¿Cuál es el caso base correcto de un factorial recursivo?

- a) `if (n == 100) return 1;`
- b) `if (n <= 1) return 1;`
- c) `if (n > 0) return n;`
- d) No necesita caso base

**13.** ¿Qué declara `char **p;`?

- a) Un carácter doble
- b) Un apuntador a apuntador a `char`
- c) Dos cadenas
- d) Una matriz fija

**14.** ¿Cuál de estas operaciones es **válida** entre dos estructuras del mismo tipo?

- a) `a == b`
- b) `a = b`
- c) `a + b`
- d) `a < b`

**15.** Tras `free(p);`, acceder a `p[0]` es…

- a) seguro
- b) comportamiento indefinido (*use after free*)
- c) un error de compilación
- d) equivalente a `NULL`

??? success "Respuestas Parte A"
    | # | Resp. | | # | Resp. | | # | Resp. |
    |---|-------|--|---|-------|--|---|-------|
    | 1 | **a** (2+3=5) | | 6 | **b** (`C`+`\n`=2) | | 11 | **c** |
    | 2 | **b** | | 7 | **b** | | 12 | **b** |
    | 3 | **b** | | 8 | **b** | | 13 | **b** |
    | 4 | **b** (10,8,6,4,2 = 5) | | 9 | **b** | | 14 | **b** |
    | 5 | **b** | | 10 | **c** | | 15 | **b** |

---

## Parte B — Verdadero o Falso (15 pts, 3 c/u)

1. `v[i]` y `*(v + i)` son equivalentes. `____`
2. Pasar una estructura por valor a una función permite modificar el original. `____`
3. Por cada `malloc` debe haber, eventualmente, un `free`. `____`
4. `fscanf` controla mejor el fin de archivo que `while (!feof(f))`. `____`
5. Comparar dos cadenas con `==` compara su contenido carácter por carácter. `____`

??? success "Respuestas Parte B"
    1. **V** — La notación de corchetes es azúcar de la aritmética de apuntadores.
    2. **F** — Por valor se copia la estructura; para modificar el original se pasa un apuntador.
    3. **V** — De lo contrario hay fuga de memoria.
    4. **V** — Controlar por el valor de retorno evita procesar la última línea dos veces.
    5. **F** — `==` compara direcciones; el contenido se compara con `strcmp`.

---

## Parte C — Trazado de código (25 pts, 5 c/u)

Indica la salida exacta de cada fragmento.

**Código 1 — Arreglos y módulo**

```c
int v[6] = {3, 8, 5, 2, 9, 4};
int r = 0;
for (int i = 0; i < 6; i++)
    if (v[i] % 2 == 0) r += v[i];
printf("%d\n", r);
```

**Código 2 — Apuntadores**

```c
int a = 2, b = 5;
int *p = &a, *q = &b;
*p = *q;
*q = 10;
printf("%d %d\n", a, b);
```

**Código 3 — Cadenas**

```c
char s[] = "nivel";
int i = 0, j = strlen(s) - 1, pal = 1;
while (i < j) {
    if (s[i] != s[j]) pal = 0;
    i++; j--;
}
printf("%d\n", pal);
```

**Código 4 — Recursión**

```c
int f(int n) {
    if (n == 0) return 1;
    return 2 * f(n - 1);
}
printf("%d\n", f(5));
```

**Código 5 — Estructuras y apuntadores**

```c
typedef struct { int x, y; } P;
void mover(P *p) { p->x *= 2; p->y += 1; }
int main() {
    P a = {3, 4};
    mover(&a);
    printf("%d %d\n", a.x, a.y);
    return 0;
}
```

??? success "Respuestas Parte C"
    **Código 1 →** `14`. Pares: 8 + 2 + 4 = 14.

    **Código 2 →** `5 10`. `*p = *q` pone `a = 5`; luego `*q = 10` pone `b = 10`. (`a` ya había tomado el 5 anterior de `b`.)

    **Código 3 →** `1`. "nivel" es palíndromo, así que la bandera queda en 1.

    **Código 4 →** `32`. Calcula 2⁵ = 32 (multiplica por 2 cinco veces sobre el caso base 1).

    **Código 5 →** `6 5`. `mover` duplica `x` (3→6) y suma 1 a `y` (4→5) a través del apuntador.

---

## Parte D — Detecta y corrige (20 pts, 5 c/u)

Cada fragmento tiene **un** error principal. Identifícalo y corrígelo.

**D1**

```c
int v[3] = {1, 2, 3};
for (int i = 1; i <= 3; i++) printf("%d ", v[i]);
```

**D2**

```c
char nombre[10];
nombre = "Alejandro";
```

**D3**

```c
int *v = malloc(5);
for (int i = 0; i < 5; i++) v[i] = i;
```

**D4**

```c
FILE *f = fopen("datos.txt", "w");
int x;
fscanf(f, "%d", &x);
```

??? success "Respuestas Parte D"
    **D1 →** Índices fuera de rango: recorre de 1 a 3 accediendo a `v[3]` (no existe) y omite `v[0]`. Debe ser `for (int i = 0; i < 3; i++)`.

    **D2 →** No se puede asignar una cadena a un arreglo con `=`; además `"Alejandro"` (9 letras + `'\0'`) no cabe en 10... sí cabe (10 bytes justos), pero el problema central es la asignación. Usar `strcpy(nombre, "Alejandro");` con `char nombre[10]` (que alcanza exacto). Lo más seguro: `char nombre[20]; strcpy(nombre, "Alejandro");`.

    **D3 →** `malloc(5)` reserva 5 **bytes**, no 5 enteros. Debe ser `malloc(5 * sizeof(int))`. (Y conviene verificar `NULL` y liberar con `free`.)

    **D4 →** El archivo se abre en modo escritura (`"w"`) pero se intenta leer. Debe abrirse en `"r"` y verificarse contra `NULL`.

---

## Parte E — Desarrollo conceptual (10 pts, 5 c/u)

**E1.** Explica la diferencia entre **paso por valor** y **paso por referencia**. ¿Por qué los arreglos parecen comportarse "por referencia" aunque C siempre pase por valor?

**E2.** Un compañero afirma: *"La memoria dinámica es siempre mejor que los arreglos fijos porque puedo pedir el tamaño que quiera"*. Da dos argumentos que maticen esa afirmación.

??? success "Respuestas orientativas Parte E"
    **E1.** En el paso por **valor**, la función recibe una copia del argumento y no puede modificar el original. En el paso por **referencia**, recibe la dirección del original (un apuntador) y, al desreferenciarla, sí lo modifica. Los arreglos parecen comportarse por referencia porque, al pasar un arreglo, lo que en realidad se copia (por valor) es la **dirección de su primer elemento**: el nombre del arreglo decae a un apuntador. Así, la función trabaja sobre los mismos datos en memoria. No es una excepción a la regla, sino una consecuencia de qué es lo que se copia.

    **E2.** Primero, la memoria dinámica conlleva **responsabilidad y riesgo**: cada `malloc` exige un `free`, y olvidarlo causa fugas; usarla mal produce *use after free* o doble liberación. Segundo, tiene **costo**: reservar y liberar en el heap es más lento que usar la pila, y un arreglo fijo de tamaño conocido es más simple, rápido y seguro. La memoria dinámica es la herramienta correcta cuando el tamaño no se conoce hasta ejecutar o los datos deben sobrevivir a la función que los crea; fuera de esos casos, un arreglo fijo suele ser preferible.
