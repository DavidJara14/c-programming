# Niveles de Lenguaje de Programación

> *"C hace que sea fácil dispararte en el pie; C++ lo hace más difícil, pero cuando lo haces, te vuela la pierna entera."*
> — **Bjarne Stroustrup**, creador de C++

---

## ¿Qué es el "nivel" de un lenguaje?

El **nivel** de un lenguaje de programación indica qué tan cerca o lejos está del hardware — del procesador, la memoria, los registros del CPU.

- **Más bajo** = más cercano al hardware = más control, más velocidad, más complejidad
- **Más alto** = más alejado del hardware = más legible, más sencillo, menos control

No existe un lenguaje "mejor". Cada nivel tiene su propósito. La elección depende del problema que quieres resolver.

---

## Lenguajes de bajo nivel

Son los más cercanos al hardware. El programador controla directamente los registros del procesador, las direcciones de memoria y cada instrucción que ejecuta la CPU.

### Lenguaje de máquina

El único lenguaje que el procesador **realmente entiende**. Son secuencias de bits — 0s y 1s — que representan instrucciones y datos directamente en binario.

```
01001000 10000011 11000101 00000001
```

Esa línea, en un procesador x86-64, significa: *"suma 1 al registro RBP"*. Es absolutamente ilegible para un humano y completamente dependiente del tipo de procesador.

**Nadie programa en lenguaje de máquina en la práctica.** Pero todo programa, sin excepción, termina siendo esto cuando se ejecuta.

### Lenguaje ensamblador (Assembly)

Es una representación simbólica del lenguaje de máquina. Cada instrucción del procesador tiene un nombre corto — un **mnemónico**.

```asm
section .text
    global _start
_start:
    mov eax, 1        ; número de syscall para "exit"
    xor ebx, ebx      ; código de salida = 0
    int 0x80          ; llamada al sistema operativo
```

Es más legible que el binario, pero sigue siendo extremadamente tedioso, requiere conocer el procesador específico y cada línea de C equivale a decenas de líneas en ensamblador.

**¿Dónde se usa hoy?**

- Desarrollo de drivers de hardware
- Sistemas embebidos con recursos mínimos (microcontroladores de 8 bits)
- Optimización de secciones críticas de rendimiento
- Análisis de malware y seguridad

---

## Lenguajes de nivel medio

El **nivel medio** es una categoría que se aplica casi exclusivamente a **C**, aunque a veces también se incluye C++.

¿Por qué "nivel medio"? Porque C tiene lo mejor de ambos mundos:

| Característica | Lenguaje de máquina | C | Python |
|---------------|---------------------|---|--------|
| Manejo manual de memoria | ✅ | ✅ | ❌ |
| Acceso directo a punteros | ✅ | ✅ | ❌ |
| Sintaxis legible | ❌ | ✅ | ✅ |
| Portabilidad entre hardware | ❌ | ✅ | ✅ |
| Velocidad de ejecución | ✅ máx. | ✅ alta | ⚠️ media |
| Abstracción del hardware | ❌ | ⚠️ parcial | ✅ |

### C como lenguaje de nivel medio

```c
// C te permite trabajar directamente con direcciones de memoria
int x = 42;
int *ptr = &x;          // ptr guarda la dirección de memoria de x
printf("%d\n", *ptr);   // imprime el valor en esa dirección: 42
```

Esa capacidad — manipular directamente la memoria — es lo que hace a C tan poderoso y al mismo tiempo tan peligroso. Un error de manejo de memoria puede corromper datos, colgar el sistema o crear vulnerabilidades de seguridad.

**¿Dónde se usa C hoy?**

- **Sistemas operativos:** Linux, Windows NT, macOS (partes del kernel)
- **Sistemas embebidos:** Arduino, microcontroladores, sistemas de control industrial
- **Compiladores e intérpretes:** GCC, Python (CPython), Ruby (MRI)
- **Bases de datos:** SQLite, PostgreSQL (partes críticas)
- **Videojuegos:** motores de render, física, audio a nivel bajo

---

## Lenguajes de alto nivel

Son los más alejados del hardware. El programador trabaja con abstracciones — objetos, funciones, colecciones — sin preocuparse por la memoria ni el procesador.

```python
# Python — alto nivel
numeros = [1, 2, 3, 4, 5]
print(sum(numeros))   # 15 — sin ciclos, sin índices, sin memoria manual
```

```java
// Java — alto nivel
List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5);
System.out.println(numeros.stream().mapToInt(Integer::intValue).sum());
```

**Ventajas:**

- Código más corto y legible
- Menos propenso a errores de memoria (el lenguaje los maneja por ti)
- Desarrollo más rápido
- Gran ecosistema de librerías

**Desventajas:**

- Menos control sobre el hardware
- Generalmente más lentos que C (aunque la diferencia se ha reducido)
- Dependen de una máquina virtual o intérprete

### Los lenguajes de alto nivel más usados hoy

| Lenguaje | Creado | Uso principal |
|----------|--------|---------------|
| **Python** | 1991 | IA, ciencia de datos, scripts, web |
| **JavaScript** | 1995 | Web frontend y backend (Node.js) |
| **Java** | 1995 | Aplicaciones empresariales, Android |
| **C#** | 2000 | Aplicaciones Windows, videojuegos (Unity) |
| **Swift** | 2014 | Aplicaciones iOS y macOS |
| **Kotlin** | 2011 | Android, backends modernos |
| **Rust** | 2010 | Sistemas de bajo nivel con seguridad de memoria |

---

## El mapa completo

```
BAJO NIVEL                                                  ALTO NIVEL
    |                                                              |
Lenguaje     Ensamblador       C / C++       Java / C#      Python / JS
de máquina                   (nivel medio)
    |              |               |              |               |
Control      Control casi     Balance entre    Abstracción    Máxima
total del    total del        control y        alta, GC       abstracción
hardware     hardware         abstracción      automático     y legibilidad
```

!!! tip "¿Qué aprendemos en este curso?"
    Aprendemos **C — nivel medio**. Eso significa que cuando termines este curso, entenderás conceptos que la mayoría de los programadores de Python o JavaScript nunca comprenden: cómo se almacena realmente una variable, qué es una dirección de memoria, por qué los arreglos empiezan en 0, cómo funciona la pila de llamadas.

    Ese conocimiento te hará mejor programadora en **cualquier lenguaje** que uses después.
