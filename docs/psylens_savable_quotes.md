# Psylens — Banco de frases para "Guardar en mi diario"

Este banco se usa en dos lugares:
1. **Returning screen Tipo 3** (frase del día) — se elige 1 frase al azar de un autor ya completado
2. **Pantalla post-quiz** "¿Alguna de estas ideas se queda contigo?" — se muestran las 3 frases del autor recién completado

## Principio editorial
Las frases en el banco de datos están guardadas en su forma LIMPIA, sin repetir el nombre del autor — porque el nombre ya aparece como contexto visual (header de la pantalla, o separador de sección en el Diario).

**Renderizado según contexto (mismo banco, dos formas de mostrarlo):**
- **Returning screen Tipo 3** (la frase aparece sola): se antepone dinámicamente "Para [Nombre del autor], " antes de la frase al renderizarla. Ej: banco dice "Cada emoción lleva dentro una interpretación del mundo." → se muestra "Para Aristóteles, cada emoción lleva dentro una interpretación del mundo."
- **Pantalla post-quiz** (las 3 frases aparecen juntas) y **Diario** (frase guardada, agrupada bajo el nombre): se muestra la frase tal cual está en el banco, sin prefijo, porque el nombre ya es visible como header/separador.

Esto evita mantener dos versiones de cada frase — una sola fuente de contenido, el prefijo se agrega programáticamente solo donde hace falta.

La aclaración de que son paráfrasis (no citas textuales) aparece **una sola vez por contexto**, nunca repetida por frase:
- En la pantalla post-quiz: al final del bloque de 3 frases ("Inspiradas en el pensamiento de...")
- En el returning screen: debajo de la frase única ("inspirada en su pensamiento")
- En el Diario: como encabezado de toda la sección ("INSPIRADAS EN")

---

## ESTRUCTURA VISUAL

### Pantalla post-quiz (aparece después de las 3 preguntas, antes del modal de completado)

```
¿Alguna de estas ideas se queda contigo?

"[Frase 1]"
                                    [+ Guardar en mi diario]

"[Frase 2]"
                                    [+ Guardar en mi diario]

"[Frase 3]"
                                    [+ Guardar en mi diario]

Inspiradas en el pensamiento de [Nombre del autor]

[Ver mi diario]  ←  solo aparece si guardó al menos 1
[Continuar →]    ←  siempre presente
```

Comportamiento del botón por frase:
- No guardada: "+ Guardar en mi diario"
- Guardada: "♡ Guardada en mi diario" (con animación de pop + haptic al tocar)

### Returning screen Tipo 3 (una sola frase, elegida al azar)

```
[Portrait del autor — circular, pequeño]
[Nombre del autor]

"[Frase elegida al azar entre las 3 del autor]"

inspirada en su pensamiento

[♡ Guardar en mi diario]  o  [♡ Guardada en mi diario]

[Ver mi diario]  ←  solo si la guardó en este momento
[Continuar →]
```

### Diario (dentro de Glosario → tab Diario → sección Frases guardadas)

```
INSPIRADAS EN

─────────── Aristóteles ───────────
"Cada emoción lleva dentro una interpretación del mundo."
Guardada el 14 jun                    ← texto pequeño, gris suave, secundario

"El alma y el cuerpo no son dos cosas separadas, sino una sola."
Guardada el 16 jun

─────────── Spinoza ───────────
"La única forma de transformar una emoción es entenderla."
Guardada el 18 jun
```

Las secciones por autor aparecen ordenadas por el autor más recientemente guardado primero. Dentro de cada autor, las frases ordenadas de más reciente a más antigua.

---

## BANCO DE FRASES POR AUTOR

### BLOQUE 0

#### heraclito-democrito — Los presocráticos

1. "No hubo un día en que dejaste de ser esa persona y empezaste a ser esta — fue pasando solo, despacio, sin que nadie lo notara."
2. "Lo que llamamos estabilidad no es la ausencia de movimiento — es el momento en que las fuerzas opuestas se compensan."
3. "No hay nada sobrenatural en lo que somos — si quieres entender lo que sientes, tienes que mirar adentro del cuerpo."

#### hipocrates — Hipócrates

1. "No es lo mismo decirle a alguien 'esto te pasa porque eres así' que decirle 'esto te pasa y podemos intentar entender por qué.'"
2. "Las diferencias en cómo sentimos y reaccionamos no son caprichos ni debilidades — son patrones con una base en el cuerpo."
3. "El sufrimiento no es un castigo ni una señal de debilidad — es algo que ocurre, y que puede entenderse."

#### platon — Platón

1. "Si alguna vez sentiste que 'sabes lo que debes hacer' pero 'no puedes evitar' hacer otra cosa, ya conoces esa tensión interna."
2. "Vivir bien no es eliminar el deseo ni el impulso — es aprender a conducirlos sin que se desboquen."
3. "Cuando dices 'mi cabeza dice una cosa pero mis emociones dicen otra', estás describiendo algo que ya se pensaba hace veinticuatro siglos."

#### aristoteles — Aristóteles

1. "Cada emoción lleva dentro una interpretación del mundo — una lectura de lo que está pasando, no solo una reacción."
2. "El alma y el cuerpo no son dos cosas separadas, sino una sola que no funciona sin sus dos partes."
3. "Si quieres entender las emociones, observa cómo se comportan las personas reales — no basta con teorizar sobre ellas."

#### helenisticas — Filosofías Helenísticas

1. "El sufrimiento no viene directamente de los hechos sino de los juicios que hacemos sobre ellos."
2. "No se trata de 'no creer en nada' sino de no necesitar tener todas las respuestas para vivir tranquilo."
3. "La calidad de las relaciones cercanas es uno de los ingredientes más importantes de una vida que valga la pena."

#### avicena — Avicena

1. "El cuerpo a veces expresa lo que la mente no puede nombrar."
2. "No existe una línea clara entre tratar el cuerpo y tratar la mente — son, siempre, la misma conversación."
3. "El miedo sostenido en el tiempo debilita el cuerpo, y la alegría tiene efectos que hoy llamaríamos terapéuticos."

#### descartes — René Descartes

1. "¿Alguna vez descartaste algo que sentías con un 'es solo psicológico'? Esa idea tiene cuatrocientos años — y todavía no la hemos cuestionado del todo."
2. "Si el cuerpo es una máquina, puede estudiarse como tal — esa idea abrió la puerta a la medicina científica moderna."
3. "No aceptar nada por tradición ni por autoridad, y buscar la certeza desde la propia razón."

#### spinoza — Baruch Spinoza

1. "La única forma de transformar una emoción no es suprimirla, sino entenderla — ver de dónde viene, qué la produce."
2. "Intentar suprimir una emoción con pura fuerza de voluntad es tan inútil como pedirle al cuerpo que deje de reaccionar."
3. "La libertad no es no sentir — es entender lo que sientes sin ser arrastrado por ello."

#### kant — Immanuel Kant

1. "La persona que crees ser hoy es una interpretación, no la verdad última sobre ti."
2. "Siempre hay una capa más en lo que podemos conocer — incluido conocerse a uno mismo."
3. "Nunca conocemos la realidad tal como es — solo la forma en que nos aparece a través de nuestra propia mente."

#### schopenhauer — Arthur Schopenhauer

1. "Consigues lo que quieres y aparece un nuevo deseo. El alivio dura poco. Y luego vuelve el impulso."
2. "Debajo de todo lo que razonamos hay una fuerza que no elegimos ni controlamos del todo."
3. "La razón no decide tanto como cree — muchas veces solo racionaliza lo que el impulso ya decidió."

#### darwin — Charles Darwin

1. "No somos como somos por capricho ni por destino. Somos como somos porque eso funcionó."
2. "Nuestras emociones tienen raíces compartidas con otros animales — respuestas que sobrevivieron porque funcionaron."
3. "Nuestras reacciones automáticas no son arbitrarias — son el resultado de millones de años resolviendo el mismo problema: sobrevivir."

---

### BLOQUE 1

#### ebbinghaus — Hermann Ebbinghaus

1. "Olvidar no es un fallo tuyo. Es el funcionamiento normal de la memoria."
2. "Olvidamos rápido al principio y cada vez más lento después — la curva del olvido."
3. "Repasar en momentos separados en el tiempo es mucho más efectivo que estudiar todo de una sola vez."

#### fechner — Gustav Fechner

1. "¿Hay algo que antes notabas con claridad y que ahora ya no percibes — porque te acostumbraste a que estuviera ahí?"
2. "Lo que notamos depende de cuánto ya había, no solo del cambio en sí mismo."
3. "Incluso algo tan personal como lo que sentimos sigue patrones que pueden describirse con precisión."

#### wundt — Wilhelm Wundt

1. "¿Qué está pasando dentro de ti mientras lees esto? Esa pregunta tiene respuesta."
2. "La experiencia consciente está hecha de elementos simples que se combinan — como los ingredientes de un plato."
3. "La mente puede estudiarse con el mismo rigor con que se estudia cualquier otra cosa — con experimentos y mediciones."

#### james — William James

1. "A veces puedes actuar antes de sentirte listo."
2. "La conciencia no es un estado fijo — es un flujo continuo que nunca se detiene ni se repite igual."
3. "La pregunta no es solo qué es la mente, sino para qué sirve."

#### thorndike — Edward Thorndike

1. "Entender por qué repetimos ciertos hábitos no resuelve todo, pero cambia cómo te miras a ti mismo."
2. "Lo que produce un resultado satisfactorio tiende a repetirse, sin necesitar comprensión consciente."
3. "Si algo produjo un resultado positivo alguna vez, la tendencia a repetirlo puede persistir aunque ya no funcione igual."

#### watson — John B. Watson

1. "Entender a una persona no siempre requiere preguntarle qué siente. A veces basta con observar qué hace."
2. "Los miedos pueden aprenderse a través de la experiencia — y por lo tanto, también pueden desaprenderse."
3. "Si no puedes verlo ni medirlo desde afuera, es difícil estudiarlo con rigor científico."

#### skinner — B.F. Skinner

1. "Tus hábitos, lo que evitas, cómo reaccionas — todo es el resultado de un historial de consecuencias que has vivido."
2. "Lo que llamamos elección libre es, en gran medida, el resultado de un historial de refuerzos y castigos que nos fue dando forma."
3. "El comportamiento puede moldearse de forma predecible a través de sus consecuencias — premiar lo que quieres que se repita."

---

## Notas de implementación

### Estructura de datos sugerida (constants/data.ts)
```typescript
export const savableQuotes: Record<string, string[]> = {
  'heraclito-democrito': [
    "No hubo un día en que dejaste de ser esa persona...",
    "Lo que llamamos estabilidad no es la ausencia de movimiento...",
    "No hay nada sobrenatural en lo que somos...",
  ],
  // ... resto de autores, mismo formato, 3 frases cada uno
};
```

### AsyncStorage para frases guardadas
Key: `psylens_saved_quotes`
Value: array de objetos:
```typescript
{ authorId: string, authorName: string, quote: string, dateAdded: string }
```

### Lógica de agrupación en el Diario
1. Leer todas las entradas de `psylens_saved_quotes`
2. Agrupar por `authorId`
3. Ordenar grupos por la fecha más reciente de cualquier frase de ese autor (descendente)
4. Dentro de cada grupo, ordenar frases por fecha (descendente)
5. Renderizar con separador "─── [Nombre del autor] ───" entre grupos

### Returning screen Tipo 3
Selecciona 1 índice aleatorio (0, 1 o 2) del array del autor elegido por la lógica de prioridad ya documentada en `psylens_returning_screens.md`. Al renderizar, antepone "Para [Nombre del autor], " a la frase (con la primera letra de la frase en minúscula tras la coma).

### Pantalla post-quiz
Muestra las 3 frases del array completo del autor que se acaba de completar, siempre en el mismo orden (índice 0, 1, 2), sin prefijo — tal como están en el banco.
