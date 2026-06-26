# Sesión 9 — Estructuras

> *Un arreglo agrupa muchos datos del mismo tipo. Pero el mundo real no es así: un alumno tiene un nombre (texto), una edad (entero) y un promedio (real) al mismo tiempo. Antes de las estructuras, programar esto significaba mantener tres arreglos paralelos —`nombres[]`, `edades[]`, `promedios[]`— y rezar para no desincronizarlos. La estructura (`struct`) fue la respuesta de C: empaquetar datos de distintos tipos bajo un mismo nombre, tratándolos como una sola entidad. Es el puente entre las variables sueltas y la programación orientada a objetos que vendría después.*

---

## Palabras reservadas y conceptos de esta sesión

| Keyword / Operador | Uso | Significado |
|--------------------|-----|-------------|
| `struct` | `struct Punto { ... };` | Define un tipo compuesto de varios campos |
| `typedef` | `typedef struct {...} Punto;` | Crea un alias para un tipo |
| `.` | `p.x` | Accede a un campo de una estructura |
| `->` | `ptr->x` | Accede a un campo a través de un apuntador |
| Campo / miembro | `int x;` dentro del struct | Cada variable que compone la estructura |

---

## 1. ¿Qué es una estructura?

Una **estructura** (`struct`) es un tipo de dato definido por ti que agrupa varios **campos** (o miembros), posiblemente de distintos tipos, bajo un solo nombre.

```c
struct Alumno {
    char nombre[50];
    int edad;
    float promedio;
};
```

Esto **no** crea ninguna variable: define un nuevo *tipo* llamado `struct Alumno`. Ahora puedes declarar variables de ese tipo:

```c
struct Alumno a1;     // a1 es un alumno
```

```
        struct Alumno a1
      +------------------------+
      | nombre:  "Ana Lopez"   |
      | edad:    20            |
      | promedio: 9.4          |
      +------------------------+
```

---

## 2. Acceder a los campos con el operador `.`

El operador punto (`.`) accede a cada campo de la estructura.

```c
struct Alumno a1;

strcpy(a1.nombre, "Ana Lopez");   // los campos cadena se copian con strcpy
a1.edad = 20;
a1.promedio = 9.4;

printf("%s tiene %d anios y promedio %.1f\n",
       a1.nombre, a1.edad, a1.promedio);
```

### Inicialización directa

```c
struct Alumno a2 = {"Luis Perez", 22, 8.7};   // en el orden de los campos
```

---

## 3. `typedef`: un alias más cómodo

Escribir `struct Alumno` cada vez es tedioso. `typedef` crea un alias para usar solo `Alumno`:

```c
typedef struct {
    char nombre[50];
    int edad;
    float promedio;
} Alumno;

Alumno a1;     // ya no hace falta escribir 'struct'
```

!!! tip "Convención del curso"
    Usaremos `typedef` con nombre de tipo en **mayúscula inicial** (`Alumno`, `Punto`, `Fecha`). Es la forma más común en código C profesional y la que verás en bibliotecas reales.

---

## 4. Estructuras anidadas

Un campo de una estructura puede ser **otra estructura**. Esto permite modelar datos complejos de forma natural.

```c
typedef struct {
    int dia, mes, anio;
} Fecha;

typedef struct {
    char nombre[50];
    Fecha nacimiento;     // una estructura dentro de otra
} Persona;

Persona p;
p.nacimiento.dia = 15;    // se encadenan los puntos
p.nacimiento.mes = 8;
p.nacimiento.anio = 2003;
```

---

## 5. Arreglos de estructuras

Aquí brilla el verdadero poder: un arreglo donde cada elemento es una estructura completa. Esto reemplaza a los frágiles "arreglos paralelos".

```c
Alumno grupo[3];

for (int i = 0; i < 3; i++) {
    printf("Nombre del alumno %d: ", i + 1);
    scanf("%s", grupo[i].nombre);
    printf("Edad: ");
    scanf("%d", &grupo[i].edad);
    printf("Promedio: ");
    scanf("%f", &grupo[i].promedio);
}
```

```c
// Buscar el alumno con mayor promedio
int mejor = 0;
for (int i = 1; i < 3; i++) {
    if (grupo[i].promedio > grupo[mejor].promedio) {
        mejor = i;
    }
}
printf("Mejor promedio: %s\n", grupo[mejor].nombre);
```

---

## 6. Estructuras y funciones

### Paso por valor (se copia toda la estructura)

```c
void imprimir(Alumno a) {        // recibe una COPIA completa
    printf("%s, %d, %.1f\n", a.nombre, a.edad, a.promedio);
}
```

A diferencia de los arreglos, las estructuras **sí** se copian al pasarlas por valor. La función trabaja sobre la copia y no modifica el original.

### Paso por referencia con apuntadores y el operador `->`

Para modificar la estructura original (o para evitar copiar una estructura grande), se pasa su dirección. Al acceder a un campo a través de un apuntador, se usa el operador flecha (`->`):

```c
void cumpleanios(Alumno *a) {
    a->edad++;            // equivale a (*a).edad++
}

int main() {
    Alumno a1 = {"Ana", 20, 9.4};
    cumpleanios(&a1);     // se pasa la dirección
    printf("%d\n", a1.edad);   // 21
    return 0;
}
```

!!! note "`->` es azúcar para `(*p).campo`"
    `a->edad` significa exactamente `(*a).edad`: "desreferencia `a` y toma el campo `edad`". El operador flecha existe solo porque esa operación es tan común que merecía una notación corta. Regla simple: **variable normal → `.`**, **apuntador → `->`**.

### Devolver una estructura

Una función puede devolver una estructura completa:

```c
Alumno crearAlumno(char nombre[], int edad, float prom) {
    Alumno a;
    strcpy(a.nombre, nombre);
    a.edad = edad;
    a.promedio = prom;
    return a;
}
```

---

## 7. Estructuras y memoria dinámica

Combinando lo de la Sesión 8, se reservan estructuras en el heap:

```c
Alumno *a = malloc(sizeof(Alumno));   // una estructura dinámica
if (a == NULL) return 1;

strcpy(a->nombre, "Ana");   // acceso con -> porque a es apuntador
a->edad = 20;

free(a);
```

```c
// Un arreglo dinámico de estructuras
int n = 5;
Alumno *grupo = malloc(n * sizeof(Alumno));
grupo[0].edad = 18;          // acceso con . porque grupo[0] no es apuntador
free(grupo);
```

!!! warning "`.` vs `->` con arreglos dinámicos"
    `grupo` es un apuntador, pero `grupo[i]` **ya es una estructura** (no un apuntador), así que se usa el punto: `grupo[i].edad`. La flecha se usa solo cuando tienes el apuntador directamente: `a->edad`.

---

## 8. Errores comunes con estructuras

### Olvidar el punto y coma tras la definición

```c
struct Punto {
    int x, y;
}          // INCORRECTO: falta el ; final
```

La definición de un `struct` termina con `;`. Es uno de los errores de sintaxis más comunes.

### Usar `.` con un apuntador (o `->` con una variable normal)

```c
Alumno *p = &a;
p.edad = 20;     // INCORRECTO: p es apuntador, debe ser p->edad
a->edad = 20;    // INCORRECTO: a es variable normal, debe ser a.edad
```

### Comparar estructuras con `==`

```c
if (a1 == a2)    // INCORRECTO: no compila. Hay que comparar campo por campo
```

### Asignar cadenas con `=`

```c
a.nombre = "Ana";        // INCORRECTO: nombre es un arreglo
strcpy(a.nombre, "Ana"); // CORRECTO
```

### Confundir la copia con la referencia

```c
void cumple(Alumno a) { a.edad++; }   // no cambia el original (copia)
void cumple(Alumno *a) { a->edad++; } // SÍ cambia el original (referencia)
```
