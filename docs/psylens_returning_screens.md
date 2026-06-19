# Psylens — Contenido para pantallas Returning User

Este archivo contiene todo el contenido necesario para las 5 tipos de pantallas que aparecen al usuario al inicio de cada día.

## Lógica de aparición
- Se muestra UNA sola pantalla por día (primera apertura del día)
- El tipo se elige según el contexto del usuario
- Si el usuario no ha completado ningún autor aún → mostrar Tipo 4 (progreso)
- Si el usuario lleva racha → priorizar Tipo 1
- Si completó un autor ayer → priorizar Tipo 2 o 3
- Rotación entre tipos para evitar repetición

---

## TIPO 1 — Racha

Aparece cuando el usuario lleva 2 o más días consecutivos.
Ilustración: chips de racha con los días marcados (igual que en el Dashboard)

### Frases por hito de racha

| Días | Frase |
|------|-------|
| 2 | "Llevas 2 días seguidos. El hábito está empezando." |
| 3 | "Tres días consecutivos. Ya hay un patrón." |
| 5 | "Cinco días seguidos. Eso no es suerte — es intención." |
| 7 | "Una semana completa. El recorrido ya es parte de tu rutina." |
| 10 | "Diez días. Ya no es un intento — es un hábito." |
| 14 | "Dos semanas seguidas. Muy pocos llegan hasta aquí." |
| 21 | "Veintiún días. La ciencia dice que aquí es donde los hábitos se consolidan." |
| 30 | "Un mes completo. Eso dice algo sobre ti." |
| 50+ | "Llevas {n} días. Este recorrido ya es tuyo." |

---

## TIPO 2 — Último autor leído

Aparece cuando el usuario completó un autor el día anterior.
Muestra el portrait del autor y una frase personalizada.

**Fuente de la frase:** usa `savableQuotes[authorId]` definido en `psylens_savable_quotes.md`. Selecciona 1 índice aleatorio (0, 1 o 2) del array de ese autor. Al renderizar, antepone "Para [Nombre del autor], " a la frase (primera letra de la frase en minúscula tras la coma).

### Plantilla
```
[Portrait del autor — imagen circular]
"Ayer conociste a [Nombre]."

"Para [Nombre], [frase con primera letra en minúscula]"

[♡ Guardar en mi diario]  o  [♡ Guardada en mi diario]

[Ver mi diario]  ←  solo aparece si la guardó en este momento
[Botón: Continuar →]
```

---

## TIPO 3 — Frase del día

Aparece de forma general, como parte del banco aleatorio de autores ya completados por el usuario (ver lógica de selección diaria más abajo).

**Fuente de la frase:** misma fuente que el Tipo 2 — `savableQuotes[authorId]` de `psylens_savable_quotes.md`, con el mismo prefijo dinámico "Para [Nombre], ".

### Plantilla
```
[Portrait del autor — imagen circular]
[Nombre del autor]

"Para [Nombre], [frase con primera letra en minúscula]"

[♡ Guardar en mi diario]  o  [♡ Guardada en mi diario]

[Ver mi diario]  ←  solo aparece si la guardó en este momento
[Botón: Continuar →]
```

---

## TIPO 4 — Progreso del bloque

Aparece cuando el usuario está cerca de completar un sub-bloque o bloque.
Sin ilustración — solo texto y barra de progreso.

### Plantilla
```
[Barra de progreso del sub-bloque actual]
[Frase según autores restantes]
[Botón: Continuar →]
```

### Frases según autores restantes

| Autores restantes | Frase |
|-------------------|-------|
| 1 | "Te falta 1 autor para completar esta etapa." |
| 2 | "Te faltan 2 autores para completar esta etapa." |
| 3 | "Te faltan 3 autores. Estás cerca." |
| 4+ | "Llevas {n} de {total} en esta etapa. Sigue." |
| 0 (recién completó) | "Completaste una etapa. El camino continúa." |

---

## TIPO 5 — Reflexión

Aparece como parte del banco aleatorio (mismo mecanismo que Tipo 3), alternando con él.
Muestra el portrait del autor y una pregunta de reflexión, con espacio para responder directamente.

### Plantilla
```
[Portrait del autor — imagen circular]
"Sobre [Nombre]..."

[Pregunta de reflexión]

[Campo de texto — opcional, mínimo 0 caracteres, no bloquea avanzar]

[Botón: Guardar respuesta]  ←  solo si escribió algo
[Botón: Continuar →]        ←  siempre presente
```

La respuesta, si se guarda, va a "Mis reflexiones" en el Diario — como una entrada nueva con fecha (no sobreescribe respuestas anteriores a la misma pregunta, ya que el valor está en ver cómo cambia la perspectiva del usuario con el tiempo).

### Preguntas de reflexión por autor

| authorId | Nombre | Pregunta |
|----------|--------|----------|
| heraclito-democrito | Los presocráticos | "¿En qué has cambiado más en los últimos años?" |
| hipocrates | Hipócrates | "¿Cuándo fue la última vez que tu cuerpo te dio una señal de que algo no estaba bien emocionalmente?" |
| platon | Platón | "¿En qué área de tu vida sientes más tensión entre lo que quieres y lo que crees que deberías hacer?" |
| aristoteles | Aristóteles | "¿Hubo alguna vez que una emoción te dio información importante que tu razón no había notado?" |
| helenisticas | Filosofías Helenísticas | "¿Hay algo en tu vida que te genere malestar y que en realidad no depende de ti?" |
| avicena | Avicena | "¿Recuerdas algún momento en que tu cuerpo expresó algo que tu mente no había podido nombrar todavía?" |
| descartes | René Descartes | "¿Hay algo que dabas por cierto y que en algún momento cuestionaste? ¿Qué pasó después?" |
| spinoza | Baruch Spinoza | "¿Hay alguna emoción que intentas ignorar pero que sigue apareciendo? ¿Qué crees que te está diciendo?" |
| kant | Immanuel Kant | "¿Hay algo de ti mismo que sientes que todavía no terminas de entender?" |
| schopenhauer | Arthur Schopenhauer | "¿Hay algo que repites en tu vida aunque una parte de ti sabe que no te conviene? ¿Qué crees que lo mueve?" |
| darwin | Charles Darwin | "¿Hay alguna reacción tuya que ahora entiendes mejor sabiendo que tiene una historia evolutiva?" |
| ebbinghaus | Hermann Ebbinghaus | "¿Hay algo que aprendiste hace tiempo y que te sorprende haber olvidado? ¿O algo que recuerdas con mucha claridad sin saber por qué?" |
| fechner | Gustav Fechner | "¿Hay algo cotidiano que dejaste de notar con el tiempo porque te acostumbraste?" |
| wundt | Wilhelm Wundt | "¿Hay alguna experiencia tuya que, al intentar describirla con palabras, sientes que las palabras no alcanzan?" |
| james | William James | "¿Alguna vez intentaste 'vaciarte la cabeza' completamente? ¿Qué pasó?" |
| thorndike | Edward Thorndike | "¿Hay algún hábito tuyo que ahora entiendes mejor sabiendo que aprendiste por las consecuencias que tuvo?" |
| watson | John B. Watson | "¿Tienes algún miedo o reacción automática que crees que aprendiste en algún momento de tu vida?" |
| skinner | B.F. Skinner | "¿Hay algún comportamiento tuyo que ahora entiendes mejor como el resultado de consecuencias pasadas?" |

---

### Notas de implementación

### Documento complementario
Este sistema depende de `psylens_savable_quotes.md` para el contenido de Tipo 2 y Tipo 3 (banco de frases por autor) y su lógica de guardado en el Diario. Ambos documentos deben implementarse juntos.

### Lógica de selección diaria

**Principio general:** los tipos que dependen del momento actual (racha, último autor, progreso) siempre tienen prioridad porque reflejan el estado real del usuario. Los tipos de contenido (frase del día, reflexión) se eligen al azar de un banco que crece a medida que el usuario avanza — nunca muestran un autor que el usuario no ha desbloqueado todavía.

```
PRIORIDAD (siempre reflejan el momento actual, en este orden):
1. Racha — si el usuario lleva 2+ días consecutivos Y no se mostró Tipo 1 ayer
2. Último autor leído — si completó al menos un autor el día anterior
3. Progreso del bloque — si quedan ≤3 autores en el sub-bloque actual

BANCO ALEATORIO (si ninguna prioridad aplica):
4. Tomar todos los authorId que el usuario ya completó (desde psylens_progress)
5. Filtrar solo los que tienen frase/reflexión disponible en este documento (B0 y B1 por ahora)
6. Elegir un autor al azar de ese conjunto, evitando repetir el mismo del día anterior (psylens_returning_last_author)
7. Elegir al azar entre Tipo 3 (frase) o Tipo 5 (reflexión) para ese autor
```

Esto garantiza que:
- Nunca se muestra contenido de un autor que el usuario aún no ha leído
- Las pantallas de racha/progreso siempre están sincronizadas con la actividad real
- El banco de frases y reflexiones crece naturalmente conforme el usuario avanza en el recorrido

### AsyncStorage keys necesarias
- `psylens_returning_last_shown` — fecha (YYYY-MM-DD) de la última vez que se mostró
- `psylens_returning_last_type` — tipo mostrado la última vez (1-5)
- `psylens_returning_last_author` — authorId del último autor mostrado en Tipo 2/3/5
