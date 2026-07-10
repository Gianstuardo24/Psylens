# Export literal — Intro entries + Revolution cards (B0 + B1)

Source: `constants/data.ts`. Values copied verbatim (including escape sequences
like `\n\n` exactly as they appear in the source string literals, typos, and
empty strings). Order preserved as in `data.ts`.

> Structural note before the entries: the four intro entries are objects inside
> the `authors` array (`constants/data.ts`), not a separate `intro` collection.
> They are identified by `blockId: 'intro'` and an `id` beginning with `intro-`.
> They do **not** carry a literal `type: 'intro'` field, and they use `name` /
> `subtitle` (there is no `title` field). The revolution cards are in the
> `revolutionCards` array and each does carry `type: 'revolution' as const`.

---

## 1. Intro entries (`blockId: 'intro'`)

### intro-1

```
id: 'intro-1'
name: 'El origen de la pregunta'
subtitle: 'Mesopotamia y Egipto'
dates: '3000–500 a.C.'
blockId: 'intro'
layerType: 'two'
```

**surface.question:**
```
¿Sabías que el sufrimiento psicológico buscó nombre y cuidado miles de años antes de que existiera la psicología?
```

**surface.text:**
```
Hace cinco mil años, en Mesopotamia, alguien que no podía dormir — que veía cosas que otros no veían, que sentía un peso que no tenía nombre — buscaba a alguien que lo escuchara. No un médico. No un psicólogo. Esos nombres no existían todavía. Solo alguien que supiera qué hacer con ese dolor.\n\nLo interesante no es que eso haya ocurrido. Lo interesante es que nunca dejó de ocurrir.\n\nEn esa misma época, en Egipto, los médicos ya describían algo que hoy reconoceríamos como tristeza profunda — el retiro del mundo, la incapacidad de actuar, la sensación de que nada tiene sentido. Y entre sus tratamientos incluían una práctica que llamaban "hablar al corazón". La primera referencia conocida a la palabra como herramienta terapéutica. Tres mil años antes de que alguien la llamara psicoterapia.\n\nEso es lo que encontrarás en este recorrido: que las preguntas que te haces hoy tienen historia. Que el sufrimiento humano siempre buscó nombre, explicación y cuidado. Y que entender ese camino — desde sus orígenes hasta hoy — cambia cómo te ves a ti mismo y cómo ves a los demás.
```

**surface.closingLine:**
```
Lo interesante no es que eso haya ocurrido. Lo interesante es que nunca dejó de ocurrir.
```

**concept.question:**
```
¿Qué tienen en común las culturas curativas de todas las épocas?
```

**concept.text:**
```
Lo que Mesopotamia y Egipto tenían — y que a veces la psicología moderna olvida — era una comprensión simple pero poderosa: el sufrimiento psicológico es real, merece atención, y no hay que enfrentarlo solo.\n\nEl especialista mesopotámico que atendía a alguien en crisis no le decía que estaba simulando ni que era débil. Identificaba lo que ocurría, le daba un nombre y proponía algo concreto. La estructura era: síntoma — especialista — procedimiento. Eso, en su forma más básica, es exactamente lo que sigue ocurriendo hoy en cualquier consulta de psicología o psiquiatría.\n\nSiglos después, el psiquiatra Jerome Frank estudió culturas curativas de todo el mundo y encontró algo sorprendente: todas, sin excepción, compartían cuatro elementos. Una relación con alguien percibido como sanador. Un espacio que la comunidad reconoce como lugar legítimo para sanar. Una explicación que da sentido al sufrimiento. Y un procedimiento que tanto el sanador como quien sufre creen que puede ayudar.\n\nMesopotamia tenía los cuatro. La psicoterapia contemporánea también los tiene. La forma cambió. La estructura, no.
```

**concept.closingLine:**
```
¿Hay algo sobre ti mismo o sobre los demás que siempre quisiste entender mejor? Ese es exactamente el tipo de pregunta que este recorrido existe para acompañar.
```

*(intro-1 has surface + concept only — `layerType: 'two'`, no `fondo`.)*

---

### intro-2

```
id: 'intro-2'
name: 'Qué es y qué no es la psicología'
subtitle: 'Desmonta mitos, define el campo honestamente'
dates: ''
blockId: 'intro'
layerType: 'two'
```

**surface.question:**
```
¿Qué imagen tienes de la psicología?
```

**surface.text:**
```
La psicología no es lo que aparece en las películas.\n\nNo es un consultorio oscuro donde alguien te pide que hables de tu madre. No es leer la mente. No es tener respuestas para todo lo que te pasa. Y definitivamente no es dividir a las personas en tipos — los introvertidos por acá, los extrovertidos por allá.\n\nLo que la psicología sí es resulta más interesante y más útil que cualquiera de esas versiones. Es el estudio sistemático de la experiencia y el comportamiento humano — cómo percibimos, cómo pensamos, cómo sentimos, cómo actuamos, y por qué hacemos lo que hacemos aunque a veces no tenga ningún sentido.\n\nNo tiene una sola respuesta para esas preguntas. Tiene varias escuelas, varios métodos, varios marcos. Eso no es una debilidad — es la señal de que el objeto de estudio es genuinamente complejo.\n\nLo que encontrarás en este recorrido no es la verdad sobre la mente humana. Es algo mejor: las mejores preguntas que la humanidad ha sabido hacerse sobre ella, y los marcos más sólidos que ha construido para responderlas.
```

**surface.closingLine:**
```
Lo que encontrarás aquí no es la verdad sobre la mente humana. Es algo mejor.
```

**concept.question:**
```
¿Qué ganas cuando aprendes a usar varios marcos en lugar de buscar el correcto?
```

**concept.text:**
```
Hay una distinción que vale la pena tener clara desde el principio: la psicología no es una sola cosa.\n\nEs, al mismo tiempo, una ciencia básica que estudia procesos como la memoria, la percepción y la atención. Una ciencia aplicada que desarrolla intervenciones para el sufrimiento psicológico. Una disciplina con raíces filosóficas que se remontan dos mil quinientos años. Y un campo en conversación permanente con la neurociencia, la biología, la sociología y la cultura.\n\nA lo largo de este recorrido vas a encontrar pensadores que se contradicen entre sí. Freud y Skinner no estarían de acuerdo en casi nada. Rogers y Beck tampoco. Eso no significa que uno tenga razón y el otro esté equivocado — significa que cada uno ilumina algo que el otro no ve.\n\nLa forma más honesta de acercarse a la psicología no es buscar el marco correcto. Es aprender a usar varios marcos como lentes distintos sobre el mismo objeto. Algunos te van a servir más que otros. Pero cuantos más tengas, más clara se vuelve la imagen.
```

**concept.closingLine:**
```
Eso es exactamente lo que Psylens intenta hacer: darte más lentes.
```

*(intro-2 has surface + concept only — `layerType: 'two'`, no `fondo`.)*

---

### intro-3

```
id: 'intro-3'
name: 'Por qué este camino tiene este orden'
subtitle: 'Por qué Aristóteles viene antes que Beck'
dates: ''
blockId: 'intro'
layerType: 'two'
```

**surface.question:**
```
¿Por qué empezar por los griegos y no directamente con Freud?
```

**surface.text:**
```
Podrías preguntarte por qué este recorrido empieza con filósofos griegos y no directamente con Freud o con la psicoterapia moderna.\n\nLa respuesta corta es que las ideas no aparecen de la nada.\n\nEn los años sesenta, un psiquiatra llamado Aaron Beck propuso algo que en su momento sonó radical: que el sufrimiento psicológico no viene solo de lo que nos pasa, sino de cómo interpretamos lo que nos pasa. Que si alguien te ignora en la calle y concluyes automáticamente "me odia" o "soy invisible", esa conclusión — no el hecho — es lo que produce el malestar.\n\nLo que Beck probablemente no sabía es que Aristóteles había llegado a algo muy similar dos mil años antes. Para Aristóteles, las emociones no eran reacciones que simplemente te ocurrían — eran formas de leer la situación. El miedo aparece cuando percibes que algo te amenaza. La tristeza, cuando percibes que perdiste algo valioso. Cada emoción lleva dentro una interpretación del mundo. Y si la interpretación cambia, la emoción también cambia.\n\nLas ideas viajan a través del tiempo aunque no siempre sepamos de dónde vienen. Este recorrido sigue el orden cronológico porque ese orden tiene una lógica. Cada autor respondió a alguien que vino antes. Entender ese hilo hace que cada idea tenga más peso.
```

**surface.closingLine:**
```
Cada autor respondió a alguien que vino antes. Entender ese hilo hace que cada idea tenga más peso.
```

**concept.question:**
```
¿Qué se pierde cuando aprendes solo los resultados y no el contexto?
```

**concept.text:**
```
Hay otra razón para el orden cronológico que es más personal.\n\nCuando aprendes solo los resultados — las técnicas, los modelos, los nombres — tienes herramientas. Pero no sabes por qué esas herramientas tienen la forma que tienen. No sabes qué pregunta intentaban responder. Y eso importa, porque una herramienta sin contexto puede usarse mal.\n\nLos filósofos estoicos — Epicteto, Marco Aurelio, Séneca — enseñaban que el sufrimiento no viene de los hechos sino de cómo los juzgamos. Que entre lo que ocurre y lo que sentimos hay siempre una interpretación, y que esa interpretación es el único lugar donde tenemos algo de control. Esa idea, formulada hace dos mil años en el Mediterráneo, es el fundamento filosófico de buena parte de la psicoterapia contemporánea. Llegará más adelante en el recorrido con nombres y métodos distintos. Pero la raíz está aquí.\n\nEl orden cronológico también hace algo más sutil: te muestra que la psicología es un proyecto colectivo e inacabado. Que cada autor aportó algo y dejó preguntas abiertas. Que lo que hoy parece obvio fue, en su momento, una ruptura radical con todo lo anterior.\n\nY que las preguntas más importantes — qué somos, por qué sufrimos, cómo cambiamos — siguen siendo preguntas.
```

**concept.closingLine:**
```
El recorrido no termina con una respuesta definitiva. Termina con una forma más clara de seguir preguntando.
```

*(intro-3 has surface + concept only — `layerType: 'two'`, no `fondo`.)*

---

### intro-4

```
id: 'intro-4'
name: 'Así funciona cada capa'
subtitle: 'Superficie, Concepto y Fondo'
dates: ''
blockId: 'intro'
layerType: 'three'
```

**surface.question:**
```
¿Cómo funciona este recorrido?
```

**surface.text:**
```
Cada autor tiene tres capas.\n\nLa primera es esta — la Superficie. Es la puerta de entrada a cada idea. Abre con una pregunta personal. Algo que quizás ya sentiste sin saber que tenía nombre.
```

**surface.closingLine:**
```
No se necesita ningún conocimiento previo — solo curiosidad.
```

**concept.question:**
```
¿Y las siguientes?
```

**concept.text:**
```
La segunda es el Concepto. Aquí aparece la idea central del autor — qué propuso sobre la mente o el comportamiento humano, los términos que usó para describirlo, y por qué esa idea cambió algo en la historia del pensamiento.
```

**concept.closingLine:**
```
No hace falta entender todo a la primera. Si algo se te escapa, sigue — lo que importa es llevarte la idea central, no cada detalle.
```

**fondo.question:**
```
¿Y la tercera?
```

**fondo.text:**
```
La tercera es el Fondo. Aquí la idea se pone en perspectiva — cómo conecta con otros pensadores, qué dejó en la historia, y qué dice sobre nosotros hoy.
```

**fondo.closingLine:**
```
El camino es tuyo. Cada autor que encuentres a partir de ahora tiene algo que decir sobre cómo funcionamos — tómate el tiempo que necesites.
```

*(intro-4 is the only intro entry with three layers — `layerType: 'three'`, includes `fondo`.)*

---

## 2. Revolution cards (`revolutionCards`, `type: 'revolution' as const`)

Every revolution card object literally contains the fields: `id`, `name`,
`subtitle`, `dates`, `blockId`, `subBlockId`, `type`, `surface`, `concept`.
Each of `surface`/`concept` is an object with `question`, `text`, `closingLine`.
For all six cards, `question` and `closingLine` are **empty strings** (`''`);
only `text` carries content.

### rev-0a (Block 0)

```
id: 'rev-0a'
name: '¿Qué somos si no somos dioses?'
subtitle: 'Introducción al sub-bloque'
dates: ''
blockId: 'b0'
subBlockId: 'sb-0a'
type: 'revolution' as const
```

**surface.question:** `''` (empty)

**surface.text:**
```
Durante miles de años, las preguntas más importantes sobre los seres humanos tenían una sola dirección: hacia afuera. Hacia los dioses, hacia lo sobrenatural. Lo que estás a punto de ver es el momento en que eso cambió — un grupo de pensadores decidió buscar las respuestas en el cuerpo, en la naturaleza, en el pensamiento mismo.
```

**surface.closingLine:** `''` (empty)

**concept.question:** `''` (empty)

**concept.text:**
```
Tres pensadores, desde ángulos muy distintos, instalaron la misma pregunta: ¿puede entenderse la mente humana sin recurrir a lo sobrenatural?\n\nEl primero preguntó si somos los mismos a lo largo del tiempo. El segundo propuso que el sufrimiento mental no es castigo divino sino enfermedad. El tercero intentó mapear las distintas fuerzas que conviven dentro de cada persona.\n\nNinguno de los tres tenía las herramientas para probar lo que proponía. Pero cada uno dejó una pregunta que los siguientes dos mil años de pensamiento no han terminado de responder.
```

**concept.closingLine:** `''` (empty)

---

### rev-0b (Block 0)

```
id: 'rev-0b'
name: 'La mente tiene partes — y no siempre se ponen de acuerdo'
subtitle: 'Introducción al sub-bloque'
dates: ''
blockId: 'b0'
subBlockId: 'sb-0b'
type: 'revolution' as const
```

**surface.question:** `''` (empty)

**surface.text:**
```
Hay preguntas que no se resuelven mirando afuera — sino mirando adentro. Si la mente puede entenderse sin recurrir a los dioses, la siguiente pregunta es: ¿cómo está organizada por dentro? ¿Tiene partes? ¿Se puede elegir cómo sentirse, o las emociones simplemente ocurren?
```

**surface.closingLine:** `''` (empty)

**concept.question:** `''` (empty)

**concept.text:**
```
Los tres pensadores que vienen a continuación llegaron a respuestas muy distintas — y las tres siguen resonando hoy.\n\nEl primero propuso que las emociones no son interrupciones ni obstáculos: son información. El segundo dijo que cuerpo y mente no son dos cosas separadas sino una sola. El tercero llevó esa idea a la práctica médica, documentando que lo que sentimos emocionalmente tiene efectos físicos reales.\n\nLo que los tres construyeron juntos es algo que la psicología tardó siglos en recuperar: la idea de que para entender a una persona hay que mirarla completa.
```

**concept.closingLine:** `''` (empty)

---

### rev-0c (Block 0)

```
id: 'rev-0c'
name: 'Pensar no es suficiente para entenderse'
subtitle: 'Introducción al sub-bloque'
dates: ''
blockId: 'b0'
subBlockId: 'sb-0c'
type: 'revolution' as const
```

**surface.question:** `''` (empty)

**surface.text:**
```
Durante siglos, la razón fue la herramienta más confiable para entender la mente humana. Si razonabas bien, si observabas con cuidado, podías llegar a entender la mente humana. Esa confianza en la razón fue el motor de todo lo que viste antes. Lo que estás a punto de ver es el momento en que esa confianza empezó a fisurarse.
```

**surface.closingLine:** `''` (empty)

**concept.question:** `''` (empty)

**concept.text:**
```
El primero decidió dudar de absolutamente todo — y lo que encontró fue una separación radical entre la mente y el cuerpo que todavía hoy estructura cómo pensamos sobre nosotros mismos.\n\nEl segundo miró esa separación y dijo que no. Que mente y cuerpo son lo mismo visto desde dos ángulos distintos. Que intentar suprimir una emoción con pura fuerza de voluntad es tan inútil como pedirle al cuerpo que deje de reaccionar.\n\nEl tercero fue más lejos todavía: propuso que hay un límite en lo que la razón puede conocer — incluido conocerse a uno mismo. Que la persona que crees ser hoy es una interpretación, no la verdad última sobre ti.
```

**concept.closingLine:** `''` (empty)

---

### rev-0d (Block 0)

```
id: 'rev-0d'
name: 'Algo nos mueve antes de que lo decidamos'
subtitle: 'Introducción al sub-bloque'
dates: ''
blockId: 'b0'
subBlockId: 'sb-0d'
type: 'revolution' as const
```

**surface.question:** `''` (empty)

**surface.text:**
```
Hay algo en nosotros que actúa antes de que lo decidamos — antes de que lo pensemos, antes de que lo notemos. ¿Hay algo que nos mueve antes de que pensemos, antes de que decidamos, antes de que lo notemos?\n\nLos dos pensadores que cierran este recorrido filosófico respondieron que sí — desde lugares completamente distintos.
```

**surface.closingLine:** `''` (empty)

**concept.question:** `''` (empty)

**concept.text:**
```
El primero propuso que debajo de todo lo que razonamos hay una fuerza que no elegimos ni controlamos: un impulso constante que nos mueve hacia el deseo y que nunca se satisface del todo. No lo llamó inconsciente. Pero Freud, décadas después, reconoció que había llegado exactamente ahí.\n\nEl segundo llegó desde un camino completamente distinto. Observando animales y fósiles durante años, propuso que nuestras emociones, nuestros instintos y nuestros comportamientos no son arbitrarios — son respuestas que funcionaron.\n\nJuntos construyen el puente más importante de este recorrido: el que va desde la filosofía hasta la ciencia.
```

**concept.closingLine:** `''` (empty)

---

### rev-1a (Block 1)

```
id: 'rev-1a'
name: 'Por primera vez, la mente entra al laboratorio'
subtitle: 'Introducción al sub-bloque'
dates: ''
blockId: 'b1'
subBlockId: 'sb-1a'
type: 'revolution' as const
```

**surface.question:** `''` (empty)

**surface.text:**
```
Durante más de dos mil años, las preguntas sobre la mente humana vinieron de la filosofía. Nadie había medido cuánto tarda la mente en reaccionar ante algo. Nadie había registrado con precisión cuánto recuerda una persona después de un día o una semana. Nadie había intentado poner un número a la intensidad de lo que sentimos. Eso estaba a punto de cambiar.
```

**surface.closingLine:** `''` (empty)

**concept.question:** `''` (empty)

**concept.text:**
```
Lo que hace especial este momento en la historia no es solo que aparecieron nuevas respuestas. Es que cambió la forma de buscarlas.\n\nHasta aquí, una idea valía por su coherencia y la autoridad de quien la propuso. A partir de aquí, una idea vale si puede ponerse a prueba. Si puede medirse, repetirse, verificarse.\n\nDarwin había propuesto que somos parte de la naturaleza. Lo que viene a continuación recoge esa idea y va un paso más lejos: si somos parte de la naturaleza, entonces la mente también puede estudiarse como cualquier otra cosa natural. Con observación. Con medición. Con evidencia.
```

**concept.closingLine:** `''` (empty)

---

### rev-1b (Block 1)

```
id: 'rev-1b'
name: 'Si no puedes verlo, no puedes estudiarlo'
subtitle: 'Introducción al sub-bloque'
dates: ''
blockId: 'b1'
subBlockId: 'sb-1b'
type: 'revolution' as const
```

**surface.question:** `''` (empty)

**surface.text:**
```
Medir la mente era un avance enorme. Pero medirla requería pedirle a las personas que describieran lo que sentían por dentro — y nadie podía verificar si lo que describían era real.\n\nEsa pregunta — ¿para qué sirve la mente? — cambió todo lo que vino después.
```

**surface.closingLine:** `''` (empty)

**concept.question:** `''` (empty)

**concept.text:**
```
Lo que viene a continuación, a través de cuatro pensadores, es la lógica del conductismo — la propuesta de que la psicología debe estudiar únicamente lo que puede verse y medirse desde afuera: el comportamiento.\n\nEl primero demostró que el aprendizaje ocurre por consecuencias, no por comprensión. El segundo radicalizó esa idea: propuso que todo lo que no puede observarse — los pensamientos, las emociones, la conciencia — no debería estudiarse en absoluto. El tercero construyó el sistema más completo de todos.\n\nEl conductismo dominó la psicología durante décadas. Sus ideas siguen activas hoy — en cómo se diseñan apps y sistemas de aprendizaje.
```

**concept.closingLine:** `''` (empty)

---

## Technical note (facts only)

1. **`surface` field present in the revolution card objects?**
   Yes. All six revolution cards (`rev-0a`, `rev-0b`, `rev-0c`, `rev-0d`,
   `rev-1a`, `rev-1b`) contain a `surface` object with the shape
   `{ question, text, closingLine }`. Alongside it each card also has a
   `concept` object of the same shape. There is no `fondo` layer on any
   revolution card.

2. **Is `surface` referenced/rendered in `app/autor/[id].tsx`?**
   Yes — the premise that it may not be rendered does not hold. `revCard.surface`
   is used in the revolution render path:
   - `app/autor/[id].tsx:362` — `buildLayerCards(revTab === 'surface' ? revCard.surface : revCard.concept)`
   - `app/autor/[id].tsx:412` — `const layer = revTab === 'surface' ? revCard.surface : revCard.concept;`
   - `app/autor/[id].tsx:449` — same ternary inside the bottom-bar block.
   The two tabs are labelled "Entrada" (surface) and "Profundidad" (concept)
   at `app/autor/[id].tsx:395`. So `surface` is both present in the data and
   actively rendered.

3. **Missing / empty fields among the 10 entries:**
   - **All 6 revolution cards:** `surface.question`, `surface.closingLine`,
     `concept.question`, and `concept.closingLine` are all empty strings (`''`).
     Only the `text` field of each layer holds content. (`buildLayerCards` in
     `app/autor/[id].tsx:166-174` explicitly skips blank `question`/`closingLine`
     values, and its comment notes revolution cards "routinely have them blank".)
   - **Intro entries:** `intro-2`, `intro-3`, `intro-4` have `dates: ''`
     (empty). `intro-1` has `dates: '3000–500 a.C.'`.
   - **`type` field on intro entries:** none of the four intro entries have a
     literal `type` property; they are plain `authors`-array objects distinguished
     by `blockId: 'intro'` / `id` prefix `intro-`. (The prompt's label
     "type: 'intro'" is not a literal field in the data.)
   - **`subBlockId` on intro entries:** absent — intro entries have no
     `subBlockId` (they belong to `blockId: 'intro'`, which has no sub-blocks).
     Revolution cards do have `subBlockId`.
   - **`title` field:** does not exist on any of these entries; the human-readable
     label field is `name` (with `subtitle` as a secondary label).

4. **Quiz fields:**
   None of the 4 intro entries nor the 6 revolution cards contain a `quiz`
   field. This matches the current architecture (revolution cards and intro
   entries are not quizzed). No unexpected quiz data was found.
