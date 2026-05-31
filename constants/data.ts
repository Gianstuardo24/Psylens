export const blocks = [
  {
    id: 'b0',
    name: 'Orígenes filosóficos',
    era: 'Antigüedad y Edad Media',
    symbol: 'eye',
    isFree: true,
    authors: ['heraclito-democrito', 'platon', 'aristoteles', 'hipocrates', 'descartes', 'kant', 'schopenhauer'],
  },
  {
    id: 'b1',
    name: 'Psicología científica',
    era: 'Siglo XIX',
    symbol: 'atom',
    isFree: false,
    authors: ['wundt', 'james'],
  },
  {
    id: 'b2',
    name: 'Psicoanálisis',
    era: 'Siglo XX temprano',
    symbol: 'spiral',
    isFree: false,
    authors: ['freud', 'jung', 'winnicott', 'kohut'],
  },
  {
    id: 'b3',
    name: 'Conductismo y Humanismo',
    era: 'Siglo XX medio',
    symbol: 'circles',
    isFree: false,
    authors: ['pavlov', 'watson', 'skinner', 'rogers', 'maslow', 'frankl'],
  },
  {
    id: 'b4',
    name: 'Psicología cognitiva',
    era: 'Siglo XX tardío',
    symbol: 'diamond',
    isFree: false,
    authors: ['beck', 'ellis', 'bateson'],
  },
  {
    id: 'b5',
    name: 'Neurociencia y mente',
    era: 'Siglo XXI',
    symbol: 'network',
    isFree: false,
    authors: ['damasio', 'kandel', 'varela'],
  },
];

export const authors = [

  {
    id: 'heraclito-democrito',
    name: 'Los presocráticos',
    subtitle: 'Heráclito y Demócrito',
    dates: '535–370 a.C.',
    blockId: 'b0',
    surface: {
      question: '¿Alguna vez sentiste que no eras la misma persona que eras hace cinco años?',
      text: `Dos pensadores griegos del siglo V a.C. llegaron a conclusiones opuestas sobre la naturaleza de la realidad, y ambas siguen vivas en la psicología de hoy.\n\nHeráclito vivía en Éfeso y tenía una obsesión con el movimiento. Observó que el río parece el mismo, pero el agua cambia constantemente. De ahí su idea más radical: no puedes bañarte dos veces en el mismo río.\n\nDemócrito, en cambio, creía que la realidad está hecha de partículas indivisibles — los átomos — en movimiento perpetuo. Incluyendo la mente.`,
      closingLine: 'Dos preguntas distintas sobre lo mismo: ¿qué cambia, y de qué está hecho lo que cambia?',
    },
    concept: {
      question: '¿Puede el pensamiento explicarse como movimiento de materia?',
      text: `Heráclito propuso que el logos — una especie de razón ordenadora — gobierna el cambio constante. Todo fluye, panta rhei, pero no de forma caótica.\n\nDemócrito llevó la intuición materialista más lejos: si todo está hecho de átomos, incluyendo el alma, entonces la mente es materia organizada de cierta manera. Eso es exactamente lo que propone la neurociencia contemporánea.`,
      closingLine: 'El mecanismo propuesto por Demócrito era incorrecto. La dirección, no.',
    },
    fondo: {
      question: '¿Cuándo comenzó la idea de que la mente podría ser materia?',
      text: `Heráclito y Demócrito hicieron preguntas que la psicología no pudo ignorar. La pregunta de Heráclito — ¿qué persiste en medio del cambio? — es la pregunta de la identidad personal. La de Demócrito — ¿puede la mente explicarse en términos físicos? — es la pregunta que la neurociencia aún intenta responder.`,
      closingLine: 'Las mejores preguntas son las que siguen siendo preguntas dos mil quinientos años después.',
    },
  },

  {
    id: 'platon',
    name: 'Platón',
    subtitle: 'El dualismo que llega hasta hoy',
    dates: '428–348 a.C.',
    blockId: 'b0',
    surface: {
      question: '¿Alguna vez sentiste que tu razón quería una cosa y tu cuerpo quería otra?',
      text: `Platón nació en Atenas y creció escuchando a Sócrates. Su pregunta central era sobre el alma: qué es, de qué partes está hecha.\n\nSu respuesta fue radicalmente dualista: el alma y el cuerpo son cosas distintas. Y su mapa interno del alma tiene tres partes en conflicto permanente: la razón, el espíritu y el apetito.`,
      closingLine: '¿Te suena familiar? Debería — ese mapa sigue vivo en casi toda la psicología occidental.',
    },
    concept: {
      question: '¿Qué es el alma tripartita y por qué importa?',
      text: `El alma tripartita de Platón divide la psique en tres partes: logistikon (razón), thymoeides (espíritu) y epithymetikon (apetito).\n\nLa idea central es que el conflicto interno es inevitable. La salud psíquica es que la razón dirija sin anular a las otras dos.\n\nEsta estructura reaparece en Freud bajo otros nombres: el yo que intenta mediar entre el ello y el superyó.`,
      closingLine: 'La idea de que la mente tiene partes en conflicto no la inventó Freud. La heredó.',
    },
    fondo: {
      question: '¿Cuánto del dualismo de Platón sigue estructurando cómo pensamos sobre la mente?',
      text: `El legado más problemático de Platón es el dualismo cuerpo-alma. Al insistir en que son entidades separadas, dejó una herencia que la psicología todavía está tratando de superar.\n\nPero Platón también aportó algo que resiste: la idea de que la mente tiene estructura interna, que no es una unidad simple sino un sistema de fuerzas en tensión.`,
      closingLine: 'Lo que Platón propuso no fue una respuesta definitiva. Fue una manera diferente de hacer las preguntas.',
    },
  },

  {
    id: 'aristoteles',
    name: 'Aristóteles',
    subtitle: 'El alma inseparable del cuerpo',
    dates: '384–322 a.C.',
    blockId: 'b0',
    surface: {
      question: '¿Alguna vez notaste que una emoción te ayudó a pensar mejor, no peor?',
      text: `Aristóteles fue alumno de Platón durante veinte años. Y luego, en silencio, lo refutó.\n\nDonde Platón veía el cuerpo como obstáculo del alma, Aristóteles vio una unidad inseparable. Para Aristóteles, las emociones no son fuerzas que la razón debe controlar — son información.`,
      closingLine: 'Sentir no es perder el control. Es una forma de conocer.',
    },
    concept: {
      question: '¿Qué es la psyché aristotélica?',
      text: `Para Aristóteles la psyché es la forma del cuerpo: no una entidad separada sino el principio organizador que hace que un cuerpo funcione como cuerpo vivo.\n\nSobre las emociones, propone algo que la psicología cognitiva redescubrirá en el siglo XX: las emociones son evaluaciones cognitivas. El miedo es la percepción de que algo amenazante está cerca.`,
      closingLine: 'La cognición y la emoción no son opuestos. Son el mismo proceso visto desde ángulos distintos.',
    },
    fondo: {
      question: '¿Por qué la neurociencia le da más razón a Aristóteles que a Platón?',
      text: `Aristóteles escribió el primer tratado sistemático sobre la psique — De anima — y en él estableció algo que la ciencia moderna ha confirmado: mente y cuerpo son inseparables.\n\nAntonio Damasio pasó décadas estudiando pacientes con lesiones cerebrales para demostrar que sin cuerpo no hay razón funcional. Su libro El error de Descartes es, en el fondo, una vindicación de Aristóteles.`,
      closingLine: 'La historia de la ciencia está llena de personas que vieron algo verdadero demasiado pronto.',
    },
  },

  {
    id: 'hipocrates',
    name: 'Hipócrates',
    subtitle: 'La primera desacralización',
    dates: '460–370 a.C.',
    blockId: 'b0',
    surface: {
      question: '¿Cuándo fue la última vez que alguien te explicó por qué te sientes como te sientes en términos del cuerpo?',
      text: `Antes de Hipócrates, la enfermedad mental era cosa de los dioses. La epilepsia se llamaba "la enfermedad sagrada".\n\nHipócrates rompió con eso: la epilepsia no tiene nada de sagrada, escribió. Tiene causas en el cerebro como cualquier otra enfermedad. En el siglo V a.C. eso era una afirmación escandalosa.`,
      closingLine: 'El mecanismo estaba equivocado. La pregunta era la correcta.',
    },
    concept: {
      question: '¿Qué son los cuatro humores?',
      text: `La teoría humoral propone que cuatro fluidos — sangre, flema, bilis amarilla y bilis negra — deben estar en equilibrio para mantener la salud mental.\n\nEl exceso de bilis negra (melan kholé) producía lo que llamó melancolía — tristeza profunda, apatía, miedo sin causa. Es la primera descripción clínica de lo que hoy llamamos depresión.`,
      closingLine: 'Los humores no existen. El principio que los sustentaba, sí.',
    },
    fondo: {
      question: '¿Qué queda de Hipócrates en la psicología contemporánea?',
      text: `El aporte más duradero de Hipócrates fue el principio: el sufrimiento mental tiene causas naturales observables. Puede observarse, clasificarse y tratarse.\n\nEse principio parece obvio hoy. En el siglo V a.C. era una ruptura radical con todo lo anterior.`,
      closingLine: 'La respuesta a esa pregunta no llegará por siglos. Pero la pregunta ya estaba aquí.',
    },
  },

  {
    id: 'descartes',
    name: 'René Descartes',
    subtitle: 'El dualismo moderno',
    dates: '1596–1650',
    blockId: 'b0',
    surface: {
      question: '¿Alguna vez dudaste de todo lo que creías saber?',
      text: `Descartes vivió en el siglo XVII, en un período de ruptura científica total. Su respuesta fue radical: dudar de todo de forma sistemática, hasta encontrar algo indudable.\n\nY encontró el único punto de certeza absoluta: puedo dudar de todo, pero no puedo dudar de que estoy dudando. Cogito ergo sum — pienso, luego soy.`,
      closingLine: 'Antes de Descartes nadie había hecho de la duda un método. Después de él, nadie pudo ignorarla.',
    },
    concept: {
      question: '¿Qué es el dualismo cartesiano?',
      text: `El cogito llevó a Descartes a una conclusión que marcó la filosofía durante siglos: existen dos sustancias radicalmente distintas.\n\nRes cogitans — la mente, sin extensión física. Res extensa — el cuerpo, materia medible. El problema inmediato: si son completamente distintas, ¿cómo interactúan? Ese problema se llama el problema mente-cuerpo y sigue sin resolverse.`,
      closingLine: 'Descartes no resolvió el problema mente-cuerpo. Lo articuló con tanta precisión que todos los que vinieron después tuvieron que responderle.',
    },
    fondo: {
      question: '¿Cómo el dualismo de Descartes llegó hasta la psicología cognitiva?',
      text: `El cogito estableció la mente como punto de partida del conocimiento. Esa prioridad de lo mental tiene una línea directa hacia el cognitivismo del siglo XX.\n\nPero Descartes también heredó a la psicología su problema más persistente. El error de Descartes, como lo llamó Damasio, no fue pensar — fue creer que pensar podía existir separado de sentir.`,
      closingLine: 'Lo que Descartes construyó fue tan sólido que tardamos trescientos años en encontrarle la grieta.',
    },
  },

  {
    id: 'kant',
    name: 'Immanuel Kant',
    subtitle: 'La mente que organiza la realidad',
    dates: '1724–1804',
    blockId: 'b0',
    surface: {
      question: '¿Alguna vez pensaste que dos personas pueden ver exactamente lo mismo y llegar a conclusiones completamente distintas?',
      text: `Kant vivió en Königsberg y nunca la abandonó. Pero desde ahí reorganizó la filosofía occidental.\n\nSu propuesta: la mente no recibe la realidad pasivamente, como una cámara fotográfica. La organiza activamente, usando estructuras previas — el espacio, el tiempo, la causalidad — que no vienen del mundo sino de la mente misma.`,
      closingLine: 'No vemos el mundo tal como es. Vemos el mundo tal como nuestra mente lo organiza.',
    },
    concept: {
      question: '¿Qué son el fenómeno y el noúmeno?',
      text: `Kant introdujo una distinción central: fenómeno es la cosa tal como aparece ante nuestra mente. Noúmeno es la cosa en sí misma, completamente inaccesible.\n\nEsto tiene una consecuencia radical: nunca tenemos acceso directo a la realidad. Solo tenemos acceso a nuestra representación de ella. Esa idea es el fundamento del constructivismo en psicología.`,
      closingLine: 'El constructivismo que hoy usa la terapia narrativa tiene su raíz más profunda aquí.',
    },
    fondo: {
      question: '¿Cuánto de Kant hay en la psicología contemporánea sin que lo sepamos?',
      text: `La idea de que la mente organiza activamente la experiencia es el supuesto básico de toda la psicología cognitiva. Piaget la convirtió en teoría del desarrollo. Beck la convirtió en terapia cognitiva.\n\nSchopenhauer tomó el noúmeno kantiano y lo transformó en algo radicalmente distinto: lo inaccesible es la fuerza irracional que nos mueve desde adentro. Ese giro prepara el terreno para Freud.`,
      closingLine: 'Kant nunca escribió sobre psicología. Pero sin él, la psicología moderna no tiene fundamentos.',
    },
  },

  {
    id: 'schopenhauer',
    name: 'Arthur Schopenhauer',
    subtitle: 'El inconsciente antes de Freud',
    dates: '1788–1860',
    blockId: 'b0',
    surface: {
      question: '¿Alguna vez hiciste algo y después no supiste bien por qué lo hiciste?',
      text: `Schopenhauer era un pesimista convicto. Tenía una idea que resultó ser de las más influyentes del siglo XIX: la mayor parte de lo que nos mueve ocurre debajo de la conciencia.\n\nLo llamó la Voluntad — una fuerza ciega, irracional, sin propósito final. La conciencia es solo la superficie: la Voluntad es el motor que nadie ve.`,
      closingLine: 'Freud leyó a Schopenhauer. Y no fue solo coincidencia que llegaran a conclusiones similares.',
    },
    concept: {
      question: '¿Qué es la Voluntad y en qué se parece al inconsciente freudiano?',
      text: `Schopenhauer tomó el noúmeno de Kant y lo llenó de contenido: ese fondo inaccesible es la Voluntad — una fuerza irracional que se expresa a través de todo ser vivo.\n\nEn los seres humanos se manifiesta como deseo, impulso, pulsión. La conciencia cree que toma decisiones, pero en realidad racionaliza lo que la Voluntad ya decidió.\n\nFreud llegará décadas después a una estructura muy similar: el ello como reservorio de pulsiones que opera fuera del control consciente.`,
      closingLine: 'El inconsciente no lo inventó Freud. Freud le dio un método clínico.',
    },
    fondo: {
      question: '¿Por qué Schopenhauer es el puente entre la filosofía y el psicoanálisis?',
      text: `Schopenhauer ocupa un lugar singular: es el filósofo que puso el inconsciente en el centro mucho antes de que existiera la psicología como ciencia.\n\nSu influencia directa sobre Freud es documentada. Nietzsche, que leyó a Schopenhauer apasionadamente, tomó la Voluntad y la transformó en voluntad de poder.\n\nHay también un hilo hacia Oriente que Schopenhauer reconoció: el budismo y la idea del deseo como fuente de sufrimiento. Esa conexión llega hasta el mindfulness y las terapias de tercera generación.`,
      closingLine: 'Esa idea — que el motor está escondido — sigue siendo la más incómoda y la más productiva de la psicología.',
    },
  },
];

export const glossaryTerms = [
  { id: 'logos',           term: 'Logos',           definition: 'Principio ordenador que gobierna el cambio constante del mundo, según Heráclito. No es un dios — es una lógica inmanente al movimiento.',                                   authorId: 'heraclito-democrito' },
  { id: 'atomismo',        term: 'Atomismo',         definition: 'Posición de Demócrito: todo lo que existe, incluida la mente, está compuesto de partículas indivisibles en movimiento. Antecedente directo del materialismo científico.',    authorId: 'heraclito-democrito' },
  { id: 'alma-tripartita', term: 'Alma tripartita',  definition: 'El mapa del alma de Platón: razón (logistikon), espíritu (thymoeides) y apetito (epithymetikon). La salud mental es que la razón gobierne a las otras dos.',                authorId: 'platon' },
  { id: 'psyche',          term: 'Psyché',           definition: 'Concepto aristotélico: el principio organizador del cuerpo vivo, inseparable de él. Sin cuerpo, no hay psyché.',                                                           authorId: 'aristoteles' },
  { id: 'humores',         term: 'Humores',          definition: 'Los cuatro fluidos de Hipócrates — sangre, flema, bilis amarilla, bilis negra — cuyo equilibrio determinaba el temperamento y la salud mental.',                            authorId: 'hipocrates' },
  { id: 'melancolia',      term: 'Melancolía',       definition: 'Primera descripción clínica de la depresión, por Hipócrates. Exceso de bilis negra (melan kholé). Primer intento de explicar el sufrimiento mental en términos físicos.',   authorId: 'hipocrates' },
  { id: 'cogito',          term: 'Cogito',           definition: '"Cogito ergo sum" — pienso, luego soy. El punto de certeza indudable de Descartes: todo puede dudarse excepto el hecho de que hay un sujeto que duda.',                     authorId: 'descartes' },
  { id: 'dualismo',        term: 'Dualismo',         definition: 'La posición de Descartes: mente (res cogitans) y cuerpo (res extensa) son dos sustancias radicalmente distintas e independientes.',                                         authorId: 'descartes' },
  { id: 'fenomeno',        term: 'Fenómeno',         definition: 'Para Kant: la cosa tal como aparece ante nuestra mente, organizada por estructuras cognitivas previas. Todo lo que podemos conocer son fenómenos.',                         authorId: 'kant' },
  { id: 'noumeno',         term: 'Noúmeno',          definition: 'Para Kant: la cosa en sí misma, tal como existe independientemente de cualquier observador. Completamente inaccesible a la experiencia.',                                   authorId: 'kant' },
  { id: 'la-voluntad',     term: 'La Voluntad',      definition: 'Fuerza ciega e irracional que impulsa toda vida según Schopenhauer. La conciencia la conoce solo superficialmente. Prefigura el inconsciente freudiano.',                   authorId: 'schopenhauer' },
];

export const conceptThreads = [
  { from: 'heraclito-democrito', to: 'platon',       text: 'Platón responde a los presocráticos: frente a la fluidez de Heráclito, propone que hay algo permanente — las Ideas eternas.' },
  { from: 'platon',              to: 'aristoteles',  text: 'El alma tripartita de Platón y la psyché de Aristóteles responden a la misma pregunta desde premisas opuestas.' },
  { from: 'platon',              to: 'descartes',    text: 'El dualismo de Descartes (mente vs. cuerpo) es la versión moderna del dualismo de Platón (alma vs. cuerpo).' },
  { from: 'descartes',           to: 'kant',         text: 'El cogito de Descartes es el punto de partida que Kant intentó superar con su giro copernicano.' },
  { from: 'kant',                to: 'schopenhauer', text: 'Schopenhauer tomó el noúmeno kantiano y lo convirtió en la Voluntad — una fuerza irracional que gobierna desde debajo de la conciencia.' },
];
