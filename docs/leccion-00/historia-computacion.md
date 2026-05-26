# Historia de la Computación y la Programación

> *"La ciencia de la computación no es más sobre computadoras que la astronomía sobre telescopios."*
> — **Edsger W. Dijkstra**, pionero de la informática teórica

---

## Los orígenes: antes de las computadoras

La programación no comenzó con las computadoras electrónicas. Comenzó con la necesidad humana de **automatizar el pensamiento lógico**.

### Charles Babbage y la Máquina Analítica (1837)

El matemático inglés **Charles Babbage** diseñó en 1837 la **Máquina Analítica** — un dispositivo mecánico capaz de realizar cualquier cálculo matemático usando tarjetas perforadas para ingresar instrucciones. Nunca fue construida en vida de Babbage por limitaciones de manufactura, pero el diseño era correcto: era, en papel, la primera computadora de propósito general de la historia.

### Ada Lovelace — La primera programadora (1843)

**Ada Lovelace**, matemática y condesa inglesa, colaboró con Babbage y tradujo un artículo italiano sobre la Máquina Analítica. En sus notas — más extensas que el artículo mismo — describió un algoritmo para calcular los **números de Bernoulli** usando la máquina. Ese algoritmo es considerado el **primer programa de computadora de la historia**.

Ada también fue la primera en comprender que la máquina podía hacer más que calcular números: podía manipular cualquier símbolo con una relación lógica definida — música, texto, gráficos. Tuvo esa visión **100 años antes de que existiera la tecnología** para realizarla.

!!! note "Legado"
    El lenguaje de programación **Ada**, desarrollado en 1980 por el Departamento de Defensa de los Estados Unidos para sistemas de misión crítica, lleva su nombre.

---

## El siglo XX: las computadoras llegan

### Alan Turing y la máquina universal (1936)

En 1936, el matemático británico **Alan Turing** publicó un paper teórico describiendo una "máquina universal" capaz de simular cualquier otro dispositivo computacional. No era una máquina real, sino un modelo matemático — pero estableció los fundamentos teóricos de toda la computación moderna.

Durante la Segunda Guerra Mundial, Turing lideró el equipo de **Bletchley Park** que descifró el código **Enigma** de la Alemania nazi, acortando la guerra varios años. Lo hizo construyendo una máquina electromecánica llamada **Bombe** — esencialmente, una computadora especializada.

!!! warning "Injusticia histórica"
    A pesar de sus contribuciones, Alan Turing fue perseguido por el gobierno británico por su homosexualidad. Murió en 1954 a los 41 años. En 2009, el gobierno del Reino Unido le ofreció una disculpa formal. Hoy su rostro aparece en el billete de **50 libras esterlinas**.

### ENIAC — La primera computadora electrónica (1945)

La **ENIAC** (*Electronic Numerical Integrator and Computer*) fue construida en la Universidad de Pennsylvania entre 1943 y 1945. Pesaba **30 toneladas**, ocupaba una habitación entera, usaba **18,000 tubos de vacío** y consumía tanta electricidad que se dice que cuando se encendía, las luces de la ciudad parpadeaban.

"Programarla" significaba literalmente **reorganizar cables y configurar interruptores físicamente** — un proceso que podía tomar días para un solo cálculo. Las primeras programadoras de la ENIAC fueron seis mujeres matemáticas: **Jean Jennings, Frances Bilas, Betty Holberton, Ruth Lichterman, Kathleen McNulty y Marlyn Wescoff**. Sus contribuciones fueron ignoradas durante décadas.

---

## El nacimiento de los lenguajes de programación

### Lenguaje de máquina y ensamblador (1940s–1950s)

Las primeras computadoras se programaban en **lenguaje de máquina**: secuencias de 0s y 1s que el procesador ejecutaba directamente.

```
10110000 01100001   ← Mover el valor 97 al registro AL (lenguaje de máquina)
MOV AL, 61h        ← Lo mismo en ensamblador (mucho más legible)
```

El **ensamblador** fue el primer paso hacia la legibilidad — cada instrucción del procesador tenía un nombre corto (un *mnemónico*). Pero seguía siendo extremadamente tedioso y dependiente del hardware.

### FORTRAN — El primer lenguaje de alto nivel (1957)

En 1957, **John Backus** y su equipo en IBM desarrollaron **FORTRAN** (*FORmula TRANslation*), el primer lenguaje de programación de alto nivel ampliamente usado. Por primera vez, un programador podía escribir algo como:

```fortran
Y = X**2 + 3*X - 7
```

Y el compilador lo traduciría automáticamente a instrucciones de máquina. Los ingenieros de IBM inicialmente dudaban de que fuera posible. FORTRAN los convenció de que sí.

### COBOL, LISP y ALGOL (1958–1960)

- **COBOL** (1959): diseñado por **Grace Hopper** para aplicaciones de negocios. Sigue corriendo en el 95% de las transacciones de cajeros automáticos del mundo.
- **LISP** (1958): creado por **John McCarthy** para inteligencia artificial. Es el segundo lenguaje más antiguo en uso activo.
- **ALGOL** (1958): influenció directamente a C, Pascal, Java y la mayoría de los lenguajes modernos.

### El nacimiento de C (1972)

En 1969, **Ken Thompson** en Bell Labs creó el lenguaje **B** para trabajar en el sistema operativo UNIX. B tenía limitaciones para manejar distintos tipos de datos. **Dennis Ritchie** extendió B y lo transformó en **C** entre 1971 y 1973.

En **1973, el kernel de UNIX fue reescrito en C** — un hecho sin precedente: un sistema operativo escrito en un lenguaje de alto nivel. Eso demostró que C era lo suficientemente poderoso y eficiente para las tareas más exigentes.

En **1978**, Kernighan y Ritchie publicaron ***"The C Programming Language"*** — conocido simplemente como **K&R**. Ese libro definió el lenguaje por más de una década y es considerado uno de los libros técnicos mejor escritos de la historia.

---

## La era moderna (1980s–hoy)

| Década | Eventos clave |
|--------|--------------|
| 1980s | C++, Objective-C, Perl. Las computadoras personales llegan a los hogares |
| 1991 | Linus Torvalds crea **Linux** en C. Python 0.9 es publicado |
| 1995 | Java, JavaScript, PHP — la web se vuelve programable |
| 2000s | C#, Swift en desarrollo. El smartphone cambia todo |
| 2009 | Go (Google), Node.js |
| 2010s | Rust, Kotlin, TypeScript. La nube y los contenedores |
| 2020s | IA generativa, programación cuántica, WebAssembly |

!!! note "El dato que lo resume todo"
    Más de **700 lenguajes de programación** han sido creados en la historia. La gran mayoría comparte su sintaxis, conceptos o implementación con **C**. Aprender C no es solo aprender un lenguaje — es aprender el idioma del que casi todos los demás descienden.
