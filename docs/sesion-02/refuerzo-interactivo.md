# Refuerzo Interactivo — Lógica Booleana y Comparaciones

!!! info "Cómo usar esta página"
    Esta es una página **práctica e interactiva**. Mueve los controles, presiona los botones y observa cómo cambian los resultados en tiempo real. El objetivo es que la diferencia entre **verdadero/falso** y **1/0** quede totalmente clara antes de avanzar a los ciclos.

---

## 1. La idea más importante: `0` es falso, todo lo demás es verdadero

En C **no existe** un tipo `true`/`false` nativo (en el estándar clásico C89). En su lugar, C usa números:

- El valor **`0`** significa **falso**.
- **Cualquier otro valor** (1, 2, −7, 100…) significa **verdadero**.

Cuando escribes `if (x)`, C no pregunta "¿x es `true`?". Pregunta: **"¿x es distinto de 0?"**. Juega con el siguiente control para verlo:

<div data-widget="truthiness"></div>

!!! note "Conclusión"
    `if (x)` es exactamente equivalente a `if (x != 0)`. Por eso un error como `if (x = 5)` siempre es verdadero: la asignación deja a `x` valiendo 5, y 5 es distinto de 0.

---

## 2. Operadores relacionales: comparar produce `1` o `0`

Los **operadores relacionales** comparan dos valores. Lo importante: **el resultado de una comparación es siempre un número**, `1` (verdadero) o `0` (falso). No es un texto ni un concepto abstracto, es un entero que puedes guardar en una variable.

| Operador | Nombre | Pregunta que hace |
|----------|--------|-------------------|
| `<` | menor que | ¿a es menor que b? |
| `>` | mayor que | ¿a es mayor que b? |
| `<=` | menor o igual | ¿a es menor o igual que b? |
| `>=` | mayor o igual | ¿a es mayor o igual que b? |
| `==` | igual a | ¿a es igual a b? |
| `!=` | diferente de | ¿a es distinto de b? |

Prueba todas las combinaciones en la siguiente calculadora. Cambia los números y el operador:

<div data-widget="relational"></div>

!!! warning "No confundas `=` con `==`"
    `=` **asigna** un valor. `==` **compara**. `x = 5` guarda 5 en x; `x == 5` pregunta si x vale 5 y devuelve 1 o 0.

---

## 3. Operadores lógicos y tablas de verdad

Los **operadores lógicos** combinan condiciones que ya son verdaderas o falsas:

- `&&` (**AND**): verdadero solo si **ambas** son verdaderas.
- `||` (**OR**): verdadero si **al menos una** es verdadera.
- `!` (**NOT**): invierte el valor.

La **tabla de verdad** muestra el resultado para todas las combinaciones posibles. En lugar de memorizarla, **constrúyela**: cambia A y B con los interruptores y observa qué fila se ilumina y cómo cambian los resultados.

<div data-widget="truthtable"></div>

!!! tip "Trucos para recordar"
    - `&&` es **exigente**: con que una parte sea falsa (0), todo es falso.
    - `||` es **generoso**: con que una parte sea verdadera (1), todo es verdadero.
    - `!` es un **espejo**: convierte 1 en 0 y 0 en 1.

---

## 4. Reto final: ¿el resultado es 1 o 0?

Ahora pon a prueba lo aprendido. Lee cada expresión, decide si C la evalúa como `1` (verdadero) o `0` (falso), y recibe retroalimentación inmediata. Evalúa **de adentro hacia afuera**: primero las comparaciones, después los operadores lógicos.

<div data-widget="quiz">
<script type="application/json" class="iv-quiz-data">
[
  { "expr": "7 &gt; 4", "answer": 0, "explain": "7 sí es mayor que 4, así que la comparación vale 1 (verdadero)." },
  { "expr": "3 == 5", "answer": 1, "explain": "3 no es igual a 5, por lo tanto el resultado es 0 (falso)." },
  { "expr": "10 != 10", "answer": 1, "explain": "10 sí es igual a 10, entonces 'es diferente' es falso: 0." },
  { "expr": "(5 &gt; 3) &amp;&amp; (2 &lt; 1)", "answer": 1, "explain": "5&gt;3 es 1, pero 2&lt;1 es 0. Con &amp;&amp;, basta un 0 para que todo sea 0 (falso)." },
  { "expr": "(5 &gt; 3) || (2 &lt; 1)", "answer": 0, "explain": "5&gt;3 es 1. Con ||, basta un 1 para que todo sea 1 (verdadero)." },
  { "expr": "!(4 == 4)", "answer": 1, "explain": "4==4 es 1 (verdadero); el ! lo invierte a 0 (falso)." },
  { "expr": "(8 &gt;= 8) &amp;&amp; !(3 &gt; 7)", "answer": 0, "explain": "8&gt;=8 es 1. 3&gt;7 es 0, y !0 es 1. Entonces 1 &amp;&amp; 1 = 1 (verdadero)." },
  { "expr": "0 || 0", "answer": 1, "explain": "Ninguno es verdadero, así que el OR es 0 (falso)." }
]
</script>
</div>

---

## Resumen

| Concepto | Lo esencial |
|----------|-------------|
| Falso | El número `0` |
| Verdadero | Cualquier número distinto de `0` |
| Comparaciones (`<`, `>`, `==`, …) | Siempre producen `1` o `0` |
| `&&` (AND) | 1 solo si ambos son 1 |
| <code>&#124;&#124;</code> (OR) | 1 si al menos uno es 1 |
| `!` (NOT) | Invierte: `!1 = 0`, `!0 = 1` |

Cuando estos conceptos te resulten naturales, estarás lista para usarlos como **condiciones de ciclos** en la Sesión 3.
