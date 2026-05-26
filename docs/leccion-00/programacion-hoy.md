# La Programación Hoy

> *"El software se está comiendo al mundo."*
> — **Marc Andreessen**, cofundador de Netscape, 2011

---

## El software en todas partes

En 1970, una computadora era una máquina enorme que vivía en un cuarto especial, operada por especialistas con batas blancas. En 2025, llevas en el bolsillo un dispositivo con **un millón de veces más poder de cómputo** que toda la NASA tenía cuando llevó al hombre a la Luna en 1969.

Pero más importante que el hardware es lo que corre en él: **software**. Programas escritos por personas como tú.

---

## ¿Dónde está el software que no ves?

La mayoría del software crítico del mundo es invisible para el usuario final:

### Transporte

- El **control de vuelo** de un Airbus A380 ejecuta más de **80 millones de líneas de código** en tiempo real.
- Un automóvil moderno tiene entre **100 y 150 ECUs** (unidades de control electrónico), con más de **100 millones de líneas de código** — más que el sistema operativo Windows.
- El **Metro de Ciudad de México**, líneas automáticas, funciona completamente bajo control de software.

### Medicina

- Los **marcapasos** modernos corren software C embebido que monitorea y regula el corazón en tiempo real. Un bug en ese código puede ser fatal — por eso C sigue siendo el estándar para dispositivos médicos.
- Los **equipos de tomografía** y resonancia magnética usan algoritmos de reconstrucción de imagen escritos originalmente en C y C++.
- El **genoma humano** fue secuenciado por primera vez en el año 2000 gracias a software de análisis masivo de datos.

### Finanzas

- El **72% de las operaciones bursátiles** en Estados Unidos son ejecutadas por algoritmos de trading de alta frecuencia. Algunas operaciones se completan en **microsegundos**.
- Los sistemas de pagos como VISA procesan en promedio **24,000 transacciones por segundo** con una disponibilidad del 99.999%.
- El **SWIFT** (red de transferencias internacionales) conecta más de 11,000 instituciones financieras en 200 países — todo sobre software.

### Infraestructura crítica

- Las **plantas de energía nuclear**, hidroeléctricas y de generación eléctrica usan PLCs (Controladores Lógicos Programables) con software en C y lenguajes de bajo nivel.
- Los sistemas de **suministro de agua** en ciudades como Ciudad de México son monitoreados y controlados por software en tiempo real.
- El **internet mismo** — routers, switches, DNS, protocolos TCP/IP — corre sobre implementaciones escritas mayoritariamente en C.

---

## El impacto económico y laboral

### Mercado de software

- La industria del software global genera más de **\$650,000 millones de dólares** anuales.
- Se estima que para 2030 habrá un déficit global de **85 millones de desarrolladores** — más demanda que oferta.

### Salarios en México (referencia 2024)

| Nivel | Perfil | Salario mensual promedio |
|-------|--------|--------------------------|
| Junior | 0–2 años, lenguajes básicos | $12,000 – $22,000 MXN |
| Mid | 2–5 años, proyectos reales | $25,000 – $45,000 MXN |
| Senior | 5+ años, arquitectura | $50,000 – $90,000 MXN |
| Especialista embebidos/C | Sistemas críticos | $60,000 – $120,000 MXN |

!!! note "El perfil más escaso"
    Los desarrolladores de sistemas embebidos y software de bajo nivel en C son los perfiles más difíciles de encontrar y, por tanto, los mejor pagados en áreas como automoción, telecomunicaciones y defensa.

---

## Tendencias que están redefiniendo la programación

### Inteligencia Artificial y LLMs

Los modelos de lenguaje como **GPT-4, Gemini y Claude** están escritos en Python para la capa de entrenamiento, pero su inferencia — la parte que responde en milisegundos — está optimizada en **C++ y CUDA** (extensión de C para GPUs). Sin C, no hay IA rápida.

### Internet de las Cosas (IoT)

Hay más de **15,000 millones de dispositivos conectados** en el mundo — sensores, wearables, electrodomésticos inteligentes, cámaras. La gran mayoría corre firmware escrito en **C o C++** porque los microcontroladores tienen memoria en kilobytes, no gigabytes.

### Seguridad informática

El **ransomware**, los virus, los exploits — y también los antivirus, firewalls y sistemas de detección — están escritos en lenguajes de bajo nivel. Entender C significa entender cómo funcionan los ataques de **buffer overflow**, **desbordamiento de pila** e inyección de código — las vulnerabilidades más explotadas en la historia.

### Rust: el sucesor de C

**Rust** (2010, Mozilla) está siendo adoptado como alternativa a C en sistemas donde la seguridad de memoria es crítica. El kernel de Linux comenzó a aceptar código en Rust en 2022. La sintaxis de Rust es inconfundiblemente inspirada en C — si aprendes C, aprender Rust después será natural.

---

## La programación como habilidad transversal

Hoy, la programación no es solo para informáticos:

- **Biólogos** usan Python para analizar secuencias de ADN
- **Economistas** usan R para modelar mercados financieros
- **Arquitectos** usan scripts para generación procedural de diseños
- **Periodistas de datos** usan JavaScript para visualizaciones interactivas
- **Médicos** programan dispositivos de diagnóstico
- **Físicos** simulan colisiones de partículas en el CERN con C++

!!! tip "La conclusión"
    Aprender a programar — y en particular aprender C — no te limita a un área. Te abre acceso a entender cómo funciona el mundo tecnológico desde sus cimientos. Esa comprensión vale en cualquier carrera que elijas.

    Lo que aprendes en este curso no caduca. Los principios de C — memoria, variables, ciclos, funciones, apuntadores — son los mismos desde 1972. Han sobrevivido 50 años de revoluciones tecnológicas. Sobrevivirán 50 más.
