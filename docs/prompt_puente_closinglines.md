Before doing anything, read constants/data.ts in full.

TASK: Add or update the `closingLine` field for the `surface` and `fondo` layers of 16 authors in Block 0 and Block 1. Also make one correction to an existing `closingLine` in a `concept` layer (Thorndike). Do NOT touch any `concept` layer text except that one explicit exception. Do NOT touch any quiz, savableQuotes, or metadata fields.

This document is the complete, final, authoritative source for every edit. It was produced after an extensive calibration session, and every fragment quoted below (for extraction) was verified against a fresh, complete export of the actual current constants/data.ts on the same day this prompt was written — so the quoted text should match exactly what you find in the file. If any quoted fragment does NOT match exactly (even a small punctuation or wording difference), STOP and flag it to me before proceeding with that specific author — do not guess or approximate the cut.

There are four categories of changes below. Read all four categories fully before writing any code.

=== CATEGORY 1: SIMPLE ADD (closingLine is new, paragraph text stays exactly as-is) ===

For each of these, the layer's `text` field does NOT change. Only add or overwrite the `closingLine` field with the exact string given.

1. heraclito-democrito / fondo:
closingLine: "La historia de la psicología está llena de personas que vieron algo verdadero demasiado pronto. Alcmeón fue el primero — pero no el último."

2. platon / surface:
closingLine: "Esa pregunta — quién soy, y por qué a veces siento que hay varias versiones de mí discutiendo entre sí — Platón la va a responder con una de las imágenes más memorables que vas a encontrar en este recorrido."

3. hipocrates / surface:
closingLine: "Esa cadena de ideas tardó siglos en abrirse camino. Lo que viene ahora es parte de ese camino."

4. aristoteles / fondo:
[MOVED TO CATEGORY 3 BELOW — this was originally listed here as a simple ADD, but verification against a fresh data.ts export revealed the "Y mientras Aristóteles..." fragment was never actually extracted. See category 3, item 24b.]

5. avicena / surface:
closingLine: "Esa manera de mirar — el cuerpo y la mente como una sola conversación — es la que alguien, muy pronto, va a poner en duda."

6. spinoza / fondo:
[MOVED TO CATEGORY 3 BELOW — this was originally listed here as a simple ADD, but verification against a fresh data.ts export revealed the "Y mientras Spinoza..." fragment was never actually extracted. See category 3, item 24c.]

7. kant / surface:
closingLine: "La mayoría de los filósofos antes de él daban por hecho que sí se podía. Kant fue el primero en decir que no — y en explicar exactamente por qué."

8. schopenhauer / surface:
closingLine: "Pasó décadas siendo ignorado. Y en ese tiempo escribió una obra que anticipó, con décadas de adelanto, algunas de las ideas más importantes de la psicología moderna."

9. darwin / surface:
closingLine: "Lo que Darwin estaba a punto de proponer no era solo sobre animales. Era sobre nosotros — y sobre por qué somos exactamente como somos."

10. ebbinghaus / surface:
closingLine: "Lo que encontró cambió para siempre la forma de entender cómo funciona la memoria — y todo empezó con una pregunta que parece simple: ¿por qué olvidamos algunas cosas casi de inmediato, y otras se quedan para siempre?"

11. ebbinghaus / fondo:
closingLine: "Ebbinghaus demostró que la memoria tiene reglas propias. Lo que faltaba era encontrar reglas para todo lo demás que sentimos y percibimos."

12. james / surface:
closingLine: "Lo que James proponía no era una pieza más de la mente. Era la manera en que todas las piezas se sienten al mismo tiempo."

=== CATEGORY 2: EXTRACT (a sentence or sentences currently at the END of the paragraph text must be REMOVED from `text` and placed into `closingLine` instead — verbatim, no rewriting) ===

For each of these, find the exact sentence(s) at the end of the current `text` field matching what's quoted below, delete them from `text` (the paragraph should end right before that quoted part — trim trailing whitespace), and set `closingLine` to that same extracted text.

13. heraclito-democrito / surface:
Extract from the end of `text`: "No lo lograron del todo. Pero hicieron algo más importante que resolverlo: instalaron la duda. Y esa duda fue la chispa que encendió todo lo que verás en este recorrido."
closingLine: (same text, verbatim)

14. aristoteles / surface:
Extract from the end of `text`: "Esa diferencia parece pequeña. No lo es. Cambia completamente cómo te relacionas contigo mismo."
closingLine (note: apply this punctuation fix — merge the first two short sentences with a comma instead of a period): "Esa diferencia parece pequeña, pero no lo es. Cambia completamente cómo te relacionas contigo mismo."

15. helenisticas / surface:
Extract from the end of `text`: "Tres escuelas respondieron a esa necesidad de maneras muy distintas — y las tres dejaron una huella que llega, de formas sorprendentes, hasta la psicología de hoy."
closingLine (note: this extraction gets one added sentence at the end, not present in the original paragraph): "Tres escuelas respondieron a esa necesidad de maneras muy distintas — y las tres dejaron una huella que llega, de formas sorprendentes, hasta la psicología de hoy. La primera de ellas está a punto de contarte algo que quizás ya sabías sin saber de dónde venía."

16. avicena / fondo:
Extract from the end of `text`: "Sin ese puente, el recorrido que estás haciendo en esta app habría tenido un hueco enorme en el medio."
closingLine (note: rewritten with a stronger ending, not verbatim — use this exact new version instead of the extracted text): "Sin ese puente, el recorrido que estás haciendo ahora mismo habría tenido un hueco enorme en el medio — o, quizás, no habría sido posible en absoluto."

17. descartes / surface:
Extract from the end of `text`: "Esa frase parece simple. Pero lo que implicaba era enorme — y sus consecuencias para la psicología llegarían siglos después."
closingLine: (same text, verbatim)

18. descartes / fondo:
Extract from the end of `text`: "Y esa pregunta — si la mente puede estudiarse científicamente — la respondería, de maneras muy distintas, un filósofo holandés que vivió casi al mismo tiempo que Descartes, y que llegó a una conclusión completamente opuesta sobre la separación entre cuerpo y mente."
closingLine (note: rewritten to remove the filler phrase "de maneras muy distintas" — use this exact new version instead of the extracted text): "Y esa pregunta — si la mente puede estudiarse científicamente — la respondería un filósofo holandés que vivió casi al mismo tiempo que Descartes, pero que llegó a una conclusión completamente opuesta sobre la separación entre cuerpo y mente."

19. spinoza / surface:
Extract from the end of `text`: "Lo que propuso fue algo que en su época sonó escandaloso — y que hoy, con el conocimiento que tenemos sobre el cerebro, suena sorprendentemente moderno."
closingLine: (same text, verbatim)

20. schopenhauer / surface:
Extract from the end of `text`: "Pasó décadas siendo ignorado. Y en ese tiempo escribió una obra que anticipó, con décadas de adelanto, algunas de las ideas más importantes de la psicología moderna."
closingLine: (same text, verbatim — this is the SAME extracted sentence used for item 8 above; do not duplicate the field, just make sure surface ends up with this closingLine once)

21. wundt / surface:
Extract from the end of `text`: "Ese año marca, para muchos historiadores, el nacimiento oficial de la psicología como ciencia."
closingLine: (same text, verbatim)

22. hipocrates / fondo:
Extract the ENTIRE last paragraph from `text`: "Y mientras Hipócrates buscaba las respuestas en el cuerpo, otros pensadores de su misma época las buscaban en todo aquello que ocurre dentro de la mente: los pensamientos, las ideas, los sueños, las imágenes que imaginamos pero que nadie más puede ver ni tocar. Uno de ellos dejaría una huella tan profunda que todavía hoy, sin saberlo, usamos su vocabulario."
closingLine: (same text, verbatim — kept intact on purpose, this is one of only two authors keeping the full "Y mientras..." formula)

23. thorndike / fondo:
Extract the ENTIRE last paragraph from `text`: "Y mientras Thorndike estudiaba el aprendizaje en animales, otro científico americano estaba llegando a una conclusión todavía más radical: que para entender el comportamiento humano no hacía falta estudiar la mente en absoluto. Solo el comportamiento visible, es decir, lo que una persona hace y dice, lo que puede observarse desde afuera sin necesidad de preguntarle qué siente o qué piensa. Su nombre era Watson — y su propuesta dividiría la psicología en dos."
closingLine (note: slightly trimmed from the extracted text — use this shorter version): "Y mientras Thorndike estudiaba el aprendizaje en animales, otro científico americano estaba llegando a una conclusión todavía más radical: que para entender el comportamiento humano no hacía falta estudiar la mente en absoluto. Su nombre era Watson — y su propuesta dividiría la psicología en dos."

=== CATEGORY 3: EXTRACT + REWRITE (a fragment currently at the end of the paragraph — usually starting with "Y mientras [Author]...") must be REMOVED from `text` and REWRITTEN (not verbatim) as the closingLine, fused with a new reflective sentence ===

For each of these, find the exact fragment quoted below at the end of `text`, delete it (paragraph ends right before it, trim trailing whitespace), and set `closingLine` to the NEW rewritten text given (do NOT use the extracted text verbatim — the closingLine is a fused, rewritten version).

24. platon / fondo:
Remove from the end of `text`: "Y mientras Platón construía su mapa del alma, su propio alumno — un joven que aprendió de él durante veinte años y luego se atrevió a contradecirlo — estaba llegando a conclusiones completamente distintas sobre qué somos y de dónde vienen nuestras emociones. Su nombre era Aristóteles. Y su respuesta cambiaría el rumbo de todo."
closingLine (new, rewritten): "Esa separación entre cuerpo y mente que Platón dejó abierta no tardaría en encontrar a su primer contradictor: su propio alumno, un joven llamado Aristóteles que llegaría a conclusiones completamente distintas sobre qué somos."

24b. aristoteles / fondo (verified against a fresh export on the day of this prompt — this fragment was still present in data.ts and had NOT been previously extracted, despite earlier working notes suggesting otherwise):
Remove from the end of `text`: "Y mientras Aristóteles observaba el mundo con los ojos abiertos, a miles de kilómetros de distancia y varios siglos después, otro pensador haría algo parecido desde una tradición completamente distinta — combinando la filosofía griega con la medicina árabe para producir una síntesis que Europa tardaría siglos en reconocer."
closingLine (new, rewritten): "Aristóteles había traído la filosofía de vuelta a lo tangible. Esa misma actitud — observar, no solo especular — cruzaría el Mediterráneo varios siglos después, en manos de un pensador que combinaría la filosofía griega con la medicina árabe."

24c. spinoza / fondo (verified against a fresh export on the day of this prompt — this fragment was still present in data.ts and had NOT been previously extracted, despite earlier working notes suggesting otherwise):
Remove from the end of `text`: "Y mientras Spinoza pulía lentes en Ámsterdam y construía su sistema filosófico en soledad, en otro rincón de Europa un filósofo alemán estaba haciendo una pregunta distinta — no sobre qué son las emociones, sino sobre hasta dónde puede llegar el conocimiento humano. Y su respuesta pondría límites a todo lo que la razón puede saber."
closingLine (new, rewritten): "Spinoza había disuelto la separación entre mente y cuerpo. Y mientras tanto, en otro rincón de Europa, un filósofo alemán se hacía una pregunta distinta: ¿qué tan lejos puede llegar la razón antes de toparse con sus propios límites?"

25. kant / fondo:
Remove from the end of `text`: "Y mientras Kant ponía límites a lo que la razón puede conocer, otro filósofo alemán que vivió poco después llegaría a una conclusión todavía más incómoda: que debajo de la razón hay algo más antiguo, más oscuro y más poderoso — algo que nos mueve sin que lo sepamos. Su nombre era Schopenhauer. Y su respuesta anticiparía, con décadas de adelanto, algunas de las ideas más radicales de Freud."
closingLine (new, rewritten): "Kant había mostrado que siempre miramos el mundo a través de un filtro que no podemos quitarnos. Schopenhauer, poco después, se preguntaría qué es exactamente lo que empuja desde atrás de ese filtro — y encontraría algo mucho más oscuro que la razón."

26. schopenhauer / fondo:
Remove from the end of `text`: "Y lo que Schopenhauer vio — esa fuerza que opera debajo de la razón, que nos mueve sin que lo decidamos — encontraría su confirmación más inesperada en un científico que no era filósofo ni médico, sino naturalista. Alguien que observó plantas, animales y fósiles durante décadas, y llegó a una conclusión que cambiaría para siempre cómo nos entendemos a nosotros mismos."
closingLine (new, rewritten): "Décadas después, un naturalista que jamás había leído filosofía llegaría, observando animales y fósiles, a una conclusión que confirmaría todo lo que Schopenhauer había intuido sobre la Voluntad."

27. fechner / fondo:
Remove from the end of `text`: "Y mientras Fechner construía sus leyes en el laboratorio, a pocos kilómetros de distancia otro alemán estaba dando el paso siguiente — no solo medir la experiencia, sino fundar el primer lugar del mundo dedicado exclusivamente a estudiar la mente de manera científica."
closingLine (new, rewritten): "Lo que Fechner sembró en el laboratorio de las mediciones, otro alemán, a pocos kilómetros de ahí, lo cosecharía a gran escala: no con un experimento más, sino con el primer laboratorio del mundo dedicado por completo a estudiar la mente."

28. wundt / fondo:
Remove from the end of `text`: "Y mientras Wundt construía su laboratorio en Leipzig, al otro lado del Atlántico un filósofo y médico americano estaba llegando a conclusiones muy distintas sobre la mente — no como una construcción de piezas, sino como algo vivo, en movimiento constante, imposible de detener para analizar."
closingLine (new, rewritten): "Wundt había encontrado la manera de medir la mente descomponiéndola en partes. Al otro lado del Atlántico, alguien ya se preparaba para decir que eso no se puede hacer — que la mente es un flujo imposible de separarse para analizarlo."

29. james / fondo:
Remove from the end of `text`: "Y mientras James escribía sobre la mente como un río que no se detiene, en otro rincón del mundo científico alguien estaba llegando a una conclusión opuesta: que lo más importante de la mente no es lo que fluye a la superficie, sino lo que permanece escondido debajo. Su nombre era Freud. Y su respuesta lo cambiaría todo."
closingLine (new, rewritten): "La corriente de conciencia que James describía tenía, según Freud, una parte que nunca sale a la superficie — y esa parte escondida sería el terreno que él decidiría explorar."

=== CATEGORY 4: ONE CONCEPT-LAYER CORRECTION (the only concept layer touched in this whole task) ===

30. thorndike / concept:
Find the current closingLine value: "Lo que Thorndike hizo fue abrir una puerta que la psicología todavía no ha terminado de explorar: la idea de que el comportamiento puede entenderse y modificarse estudiando sus consecuencias."
Replace it with: "Lo que Thorndike hizo fue trazar el primer mapa de algo que la psicología todavía no ha terminado de explorar: la idea de que el comportamiento puede entenderse y modificarse estudiando sus consecuencias."
(Do not touch the `text` field for this layer — only the closingLine string.)

=== NOT IN SCOPE — do not touch ===
- helenisticas / fondo — already has a closingLine, unchanged
- darwin / fondo — already has a closingLine, unchanged
- All `concept` layers except item 30 above
- All revolution entries (rev-0a, rev-0b, rev-0c, rev-0d, rev-1a, rev-1b) — confirmed to need no closingLine field at all
- Any quiz, savableQuotes, or metadata field on any entry

=== PROCESS ===

1. Show me your plan before writing any code: list the 16 authors and confirm you understand which of the 4 categories applies to each of their surface/fondo layers (and the one concept exception for Thorndike). As proof you actually read the full file (not just skimmed it), quote 2-3 short fragments verbatim from data.ts for different authors as part of your plan — this confirms you're working from the real current file, not assuming its contents. Wait for my approval.

2. Once approved, make the changes directly in constants/data.ts, ONE AUTHOR AT A TIME, not all 16 in a single pass. For each author, after editing:
   - Print the full, exact `text` field of the layer(s) you just changed (not a summary) — verbatim as it now exists in the file.
   - Print the exact `closingLine` field you just set — verbatim.
   - This lets me compare each result against the source spec above before you move to the next author. If something looks wrong, I can catch it early instead of after all 30 changes are made.

3. CRITICAL — for every EXTRACT case (categories 2 and 3), after editing, explicitly confirm three things in your output, per author/layer:
   a. The removed fragment is GONE from `text` — it does not appear twice (once in text, once in closingLine) unless the spec explicitly says "same text, verbatim" (category 2 only).
   b. The paragraph in `text` ends cleanly — no trailing whitespace, no dangling connector word ("y", "pero", "que") left hanging at the end after the cut, no double periods or missing periods at the new end of the paragraph.
   c. For category 3 (extract + rewrite) specifically: confirm the OLD fragment text does NOT appear anywhere in the new closingLine — the closingLine must be the NEW rewritten version given above, not the original extracted text.

4. After all 16 authors are done, run these verification checks and report the results before committing:
   a. `grep -n "Y mientras"` across the whole file — report every remaining occurrence with author/layer. Only hipocrates/fondo and thorndike/fondo should appear. In particular, confirm platon/fondo, aristoteles/fondo, kant/fondo, schopenhauer/fondo, fechner/fondo, wundt/fondo, james/fondo, and spinoza/fondo do NOT contain this phrase anymore — these 8 were all rewritten to remove it.
   b. `grep -n "estaba a punto de"` across the whole file — only darwin/surface should appear.
   c. `grep -n "abrir una puerta"` across the whole file — only fechner/concept should appear (thorndike/concept was changed away from this phrase).
   d. For EVERY author touched, print a short check: does the `text` field for surface and fondo still read as a complete, grammatically correct paragraph (starts and ends cleanly, no orphaned fragments)? Flag anything that looks cut off mid-sentence or awkward.
   e. Confirm no closingLine field is an empty string, null, or literally "MISSING" for any of the 16 authors' surface/fondo layers — all 30 should now have real content of length > 15 characters.

5. Show me a diff summary (git diff, not full file dump) before committing — I want to see exactly what changed, line by line, for constants/data.ts only.

6. Wait for my explicit confirmation that the diff looks correct before committing. Do not commit automatically after step 5.

7. Once I confirm, commit with message: "content: add/update closingLine for B0+B1 authors, remove embedded closing fragments from paragraph text"

8. After committing, as a final sanity check, export the full surface+fondo text and closingLine of all 16 authors again to docs/_export_closinglines_verify_raw.md (same format as the original export), so it can be uploaded back to Claude Chat for a final independent read-through against the approved versions.
