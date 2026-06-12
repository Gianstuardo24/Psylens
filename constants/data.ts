export const blocks = [
  {
    id: 'intro',
    name: 'Introducción',
    era: 'Antes de empezar',
    symbol: 'lens',
    isFree: true,
    authors: ['intro-1', 'intro-2', 'intro-3', 'intro-4'],
  },
  {
    id: 'b0',
    name: 'Orígenes filosóficos',
    era: 'Antigüedad y Edad Media',
    symbol: 'eye',
    isFree: true,
    authors: ['heraclito-democrito', 'platon', 'aristoteles', 'hipocrates', 'descartes', 'spinoza', 'kant', 'schopenhauer'],
  },
  {
    id: 'b1',
    name: 'Psicología científica',
    era: 'Siglo XIX',
    symbol: 'atom',
    isFree: false,
    authors: ['fechner', 'wundt', 'james'],
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
    id: 'intro-1',
    name: 'El origen de la pregunta',
    subtitle: 'Mesopotamia y Egipto',
    dates: '3000–500 a.C.',
    blockId: 'intro',
    layerType: 'two',
    surface: {
      question: '¿Sabías que el sufrimiento psicológico buscó nombre y cuidado miles de años antes de que existiera la psicología?',
      text: `Hace cinco mil años, en Mesopotamia, alguien que no podía dormir — que veía cosas que otros no veían, que sentía un peso que no tenía nombre — buscaba a alguien que lo escuchara. No un médico. No un psicólogo. Esos nombres no existían todavía. Solo alguien que supiera qué hacer con ese dolor.\n\nLo interesante no es que eso haya ocurrido. Lo interesante es que nunca dejó de ocurrir.\n\nEn esa misma época, en Egipto, los médicos ya describían algo que hoy reconoceríamos como tristeza profunda — el retiro del mundo, la incapacidad de actuar, la sensación de que nada tiene sentido. Y entre sus tratamientos incluían una práctica que llamaban "hablar al corazón". La primera referencia conocida a la palabra como herramienta terapéutica. Tres mil años antes de que alguien la llamara psicoterapia.\n\nEso es lo que encontrarás en este recorrido: que las preguntas que te haces hoy tienen historia. Que el sufrimiento humano siempre buscó nombre, explicación y cuidado. Y que entender ese camino — desde sus orígenes hasta hoy — cambia cómo te ves a ti mismo y cómo ves a los demás.`,
      closingLine: 'Lo interesante no es que eso haya ocurrido. Lo interesante es que nunca dejó de ocurrir.',
    },
    concept: {
      question: '¿Qué tienen en común las culturas curativas de todas las épocas?',
      text: `Lo que Mesopotamia y Egipto tenían — y que a veces la psicología moderna olvida — era una comprensión simple pero poderosa: el sufrimiento psicológico es real, merece atención, y no hay que enfrentarlo solo.\n\nEl especialista mesopotámico que atendía a alguien en crisis no le decía que estaba simulando ni que era débil. Identificaba lo que ocurría, le daba un nombre y proponía algo concreto. La estructura era: síntoma — especialista — procedimiento. Eso, en su forma más básica, es exactamente lo que sigue ocurriendo hoy en cualquier consulta de psicología o psiquiatría.\n\nSiglos después, el psiquiatra Jerome Frank estudió culturas curativas de todo el mundo y encontró algo sorprendente: todas, sin excepción, compartían cuatro elementos. Una relación con alguien percibido como sanador. Un espacio que la comunidad reconoce como lugar legítimo para sanar. Una explicación que da sentido al sufrimiento. Y un procedimiento que tanto el sanador como quien sufre creen que puede ayudar.\n\nMesopotamia tenía los cuatro. La psicoterapia contemporánea también los tiene. La forma cambió. La estructura, no.`,
      closingLine: '¿Hay algo sobre ti mismo o sobre los demás que siempre quisiste entender mejor? Ese es exactamente el tipo de pregunta que este recorrido existe para acompañar.',
    },
  },

  {
    id: 'intro-2',
    name: 'Qué es y qué no es la psicología',
    subtitle: 'Desmonta mitos, define el campo honestamente',
    dates: '',
    blockId: 'intro',
    layerType: 'two',
    surface: {
      question: '¿Qué imagen tienes de la psicología?',
      text: `La psicología no es lo que aparece en las películas.\n\nNo es un consultorio oscuro donde alguien te pide que hables de tu madre. No es leer la mente. No es tener respuestas para todo lo que te pasa. Y definitivamente no es dividir a las personas en tipos — los introvertidos por acá, los extrovertidos por allá.\n\nLo que la psicología sí es resulta más interesante y más útil que cualquiera de esas versiones. Es el estudio sistemático de la experiencia y el comportamiento humano — cómo percibimos, cómo pensamos, cómo sentimos, cómo actuamos, y por qué hacemos lo que hacemos aunque a veces no tenga ningún sentido.\n\nNo tiene una sola respuesta para esas preguntas. Tiene varias escuelas, varios métodos, varios marcos. Eso no es una debilidad — es la señal de que el objeto de estudio es genuinamente complejo.\n\nLo que encontrarás en este recorrido no es la verdad sobre la mente humana. Es algo mejor: las mejores preguntas que la humanidad ha sabido hacerse sobre ella, y los marcos más sólidos que ha construido para responderlas.`,
      closingLine: 'Lo que encontrarás aquí no es la verdad sobre la mente humana. Es algo mejor.',
    },
    concept: {
      question: '¿Qué ganas cuando aprendes a usar varios marcos en lugar de buscar el correcto?',
      text: `Hay una distinción que vale la pena tener clara desde el principio: la psicología no es una sola cosa.\n\nEs, al mismo tiempo, una ciencia básica que estudia procesos como la memoria, la percepción y la atención. Una ciencia aplicada que desarrolla intervenciones para el sufrimiento psicológico. Una disciplina con raíces filosóficas que se remontan dos mil quinientos años. Y un campo en conversación permanente con la neurociencia, la biología, la sociología y la cultura.\n\nA lo largo de este recorrido vas a encontrar pensadores que se contradicen entre sí. Freud y Skinner no estarían de acuerdo en casi nada. Rogers y Beck tampoco. Eso no significa que uno tenga razón y el otro esté equivocado — significa que cada uno ilumina algo que el otro no ve.\n\nLa forma más honesta de acercarse a la psicología no es buscar el marco correcto. Es aprender a usar varios marcos como lentes distintos sobre el mismo objeto. Algunos te van a servir más que otros. Pero cuantos más tengas, más clara se vuelve la imagen.`,
      closingLine: 'Eso es exactamente lo que Psylens intenta hacer: darte más lentes.',
    },
  },

  {
    id: 'intro-3',
    name: 'Por qué este camino tiene este orden',
    subtitle: 'Por qué Aristóteles viene antes que Beck',
    dates: '',
    blockId: 'intro',
    layerType: 'two',
    surface: {
      question: '¿Por qué empezar por los griegos y no directamente con Freud?',
      text: `Podrías preguntarte por qué este recorrido empieza con filósofos griegos y no directamente con Freud o con la psicoterapia moderna.\n\nLa respuesta corta es que las ideas no aparecen de la nada.\n\nEn los años sesenta, un psiquiatra llamado Aaron Beck propuso algo que en su momento sonó radical: que el sufrimiento psicológico no viene solo de lo que nos pasa, sino de cómo interpretamos lo que nos pasa. Que si alguien te ignora en la calle y concluyes automáticamente "me odia" o "soy invisible", esa conclusión — no el hecho — es lo que produce el malestar.\n\nLo que Beck probablemente no sabía es que Aristóteles había llegado a algo muy similar dos mil años antes. Para Aristóteles, las emociones no eran reacciones que simplemente te ocurrían — eran formas de leer la situación. El miedo aparece cuando percibes que algo te amenaza. La tristeza, cuando percibes que perdiste algo valioso. Cada emoción lleva dentro una interpretación del mundo. Y si la interpretación cambia, la emoción también cambia.\n\nLas ideas viajan a través del tiempo aunque no siempre sepamos de dónde vienen. Este recorrido sigue el orden cronológico porque ese orden tiene una lógica. Cada autor respondió a alguien que vino antes. Entender ese hilo hace que cada idea tenga más peso.`,
      closingLine: 'Cada autor respondió a alguien que vino antes. Entender ese hilo hace que cada idea tenga más peso.',
    },
    concept: {
      question: '¿Qué se pierde cuando aprendes solo los resultados y no el contexto?',
      text: `Hay otra razón para el orden cronológico que es más personal.\n\nCuando aprendes solo los resultados — las técnicas, los modelos, los nombres — tienes herramientas. Pero no sabes por qué esas herramientas tienen la forma que tienen. No sabes qué pregunta intentaban responder. Y eso importa, porque una herramienta sin contexto puede usarse mal.\n\nLos filósofos estoicos — Epicteto, Marco Aurelio, Séneca — enseñaban que el sufrimiento no viene de los hechos sino de cómo los juzgamos. Que entre lo que ocurre y lo que sentimos hay siempre una interpretación, y que esa interpretación es el único lugar donde tenemos algo de control. Esa idea, formulada hace dos mil años en el Mediterráneo, es el fundamento filosófico de buena parte de la psicoterapia contemporánea. Llegará más adelante en el recorrido con nombres y métodos distintos. Pero la raíz está aquí.\n\nEl orden cronológico también hace algo más sutil: te muestra que la psicología es un proyecto colectivo e inacabado. Que cada autor aportó algo y dejó preguntas abiertas. Que lo que hoy parece obvio fue, en su momento, una ruptura radical con todo lo anterior.\n\nY que las preguntas más importantes — qué somos, por qué sufrimos, cómo cambiamos — siguen siendo preguntas.`,
      closingLine: 'El recorrido no termina con una respuesta definitiva. Termina con una forma más clara de seguir preguntando.',
    },
  },

  {
    id: 'intro-4',
    name: 'Así funciona cada capa',
    subtitle: 'Superficie, Concepto y Fondo',
    dates: '',
    blockId: 'intro',
    layerType: 'three',
    surface: {
      question: '¿Cómo funciona este recorrido?',
      text: `A partir de ahora, cada autor que encuentres en el camino tiene tres capas.\n\nLa primera es esta — la Superficie. Siempre empieza cerca: una situación reconocible, una pregunta que no requiere ningún conocimiento previo. No necesitas haber estudiado psicología ni filosofía para seguirla. Solo necesitas estar dispuesto a mirar.`,
      closingLine: 'Es la puerta de entrada a cada idea. Y todas las puertas de este recorrido están abiertas.',
    },
    concept: {
      question: '¿Cuál es la diferencia entre reconocer una idea y poder usarla?',
      text: `La segunda capa es donde aparece el mecanismo.\n\nSi la Superficie te sitúa — te muestra el paisaje desde afuera — el Concepto te lleva adentro. Aquí es donde los términos técnicos entran al texto, siempre explicados, nunca como adorno. Donde se describe cómo funciona una idea, no solo qué es.\n\nNo es más difícil. Es más preciso. La diferencia entre saber que el miedo "tiene que ver con amenazas" y entender que para Aristóteles el miedo era una lectura de la situación — una interpretación de lo que está pasando — es la diferencia entre reconocer algo y poder usarlo.`,
      closingLine: 'El Concepto existe para darte ese segundo nivel. El que convierte la intuición en comprensión.',
    },
    fondo: {
      question: '¿Qué convierte la información en lente?',
      text: `La tercera capa es la más lenta — en el buen sentido.\n\nNo explica un mecanismo. Pregunta qué implica ese mecanismo. Qué cambió en la historia del pensamiento cuando alguien propuso esa idea. Cómo conecta con lo que vino antes y con lo que vendrá después.\n\nEs la capa donde las ideas dejan de ser información y se convierten en lentes. Donde Schopenhauer deja de ser un nombre en una línea de tiempo y se convierte en alguien que vio algo que nadie había visto antes — y que Freud vería de nuevo, décadas después, por otro camino.\n\nEs la capa que más se queda.`,
      closingLine: 'Ya sabes por qué estás aquí. Ahora comienza tu propio camino.',
    },
  },

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
    id: 'spinoza',
    name: 'Baruch Spinoza',
    subtitle: 'El error de Descartes, corregido',
    dates: '1632–1677',
    blockId: 'b0',
    surface: {
      question: '¿Alguna vez sentiste que tu cuerpo y tu mente no son dos cosas separadas sino una sola que se expresa de formas distintas?',
      text: `Descartes dejó un problema sin resolver. Si la mente y el cuerpo son sustancias completamente distintas — una sin extensión física, la otra pura materia — ¿cómo se comunican? ¿Cómo puede un pensamiento mover un brazo?\n\nSpinoza, un filósofo holandés del siglo XVII que pulía lentes para vivir, leyó a Descartes con cuidado. Y propuso algo radicalmente distinto: mente y cuerpo no son dos sustancias separadas. Son dos formas de ver la misma cosa.\n\nComo las dos caras de una moneda. No son la misma cara — pero tampoco son dos monedas distintas.`,
      closingLine: 'Lo que Descartes separó, Spinoza lo volvió a unir. Y tardamos trescientos años en entender por qué eso importaba.',
    },
    concept: {
      question: '¿Qué significa que mente y cuerpo sean lo mismo visto desde ángulos distintos?',
      text: `Spinoza llamó a esta idea el paralelismo — o más precisamente, el monismo de atributos. Solo existe una sustancia, que él llamó Dios o Naturaleza. Esa sustancia tiene infinitos atributos, pero los seres humanos solo podemos percibir dos: el pensamiento y la extensión.\n\nEl pensamiento es la mente. La extensión es el cuerpo. No interactúan — son el mismo proceso visto desde dos perspectivas distintas. Cuando sientes miedo, hay simultáneamente un estado mental y un estado corporal. No es que uno cause al otro. Son dos descripciones del mismo evento.\n\nEsto tiene una consecuencia importante: para Spinoza, no tiene sentido hablar de la mente sin el cuerpo, ni del cuerpo sin la mente. Son inseparables por definición.`,
      closingLine: 'Esa idea llegará tres siglos después al escritorio de Antonio Damasio, quien la confirmará estudiando pacientes con lesiones cerebrales.',
    },
    fondo: {
      question: '¿Por qué Spinoza es el filósofo que la neurociencia estaba esperando sin saberlo?',
      text: `Spinoza escribió en el siglo XVII, pero su pensamiento apunta directamente al siglo XXI.\n\nAntonio Damasio — el neurocientífico que aparecerá al final de este recorrido — tituló uno de sus libros más importantes En busca de Spinoza. No es una metáfora. Damasio encontró en Spinoza el marco filosófico que la neurociencia necesitaba: uno que no separa la razón de la emoción, ni la mente del cuerpo.\n\nSpinoza también propuso algo que resuena en la psicología contemporánea: que las emociones no son obstáculos para el pensamiento sino información sobre nuestra relación con el mundo. El miedo, la alegría, la tristeza — todas son formas en que el cuerpo registra cómo le va en su entorno. No hay que suprimirlas. Hay que entenderlas.\n\nAristóteles había dicho algo similar. Spinoza lo articuló con una precisión que el siglo XVII no supo reconocer.`,
      closingLine: 'A veces las ideas más importantes llegan demasiado pronto. Spinoza esperó trescientos años. Valió la pena.',
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

  // ── b1: Psicología científica ─────────────────────────────────────────────────
  {
    id: 'fechner',
    name: 'Gustav Fechner',
    subtitle: 'El hombre que intentó medir el alma',
    dates: '1801–1887',
    blockId: 'b1',
    surface: {
      question: '',
      text: `Hay una pregunta que parece imposible: ¿cuánto pesa una sensación? ¿Cuánto más brillante tiene que ser una luz para que la notes diferente? ¿Hay una relación matemática entre el mundo físico y lo que percibimos?\n\nGustav Fechner decidió que sí. Y en 1860 publicó los Elementos de Psicofísica — el primer intento sistemático de medir la experiencia subjetiva con métodos científicos. La [psicofísica] que fundó — el estudio de la relación entre estímulos físicos y percepciones mentales — es el puente entre la filosofía y la psicología experimental.\n\nFechner no era psicólogo. Era físico y filósofo. Pero su obsesión con medir lo que nadie había medido antes abrió una puerta que [Wilhelm Wundt] cruzará diecinueve años después para fundar el primer laboratorio de psicología del mundo.`,
      closingLine: 'La historia de la psicología científica empieza aquí: con alguien que se preguntó si lo que sentimos puede pesarse.',
    },
  },
  {
    id: 'wundt',
    name: 'Wilhelm Wundt',
    subtitle: 'El hombre que convirtió la psicología en ciencia',
    dates: '1832–1920',
    blockId: 'b1',
    surface: {
      question: '¿Alguna vez intentaste prestar atención a lo que ocurre dentro de tu mente mientras ocurre — y te diste cuenta de que el acto de observar cambia lo que observas?',
      text: `En 1879, en Leipzig, un médico y filósofo alemán abrió un laboratorio. No era el primero en pensar sobre la mente — filósofos llevaban siglos haciéndolo. Pero era el primero en proponer que la mente podía estudiarse con los mismos métodos que la física o la química: con experimentos controlados, mediciones precisas y resultados reproducibles.\n\nEse gesto — declarar que la psicología era una ciencia independiente, no una rama de la filosofía ni de la medicina — cambió todo lo que vino después. Antes de Wundt, la psicología no existía como disciplina. Después de él, ya no podía no existir.`,
      closingLine: '',
    },
    concept: {
      question: '¿Qué método propuso Wundt para estudiar la mente?',
      text: `Desde la perspectiva de Wundt, el objeto de estudio de la psicología era la [experiencia consciente inmediata] — lo que ocurre en la mente en el momento exacto en que algo ocurre. No los recuerdos, no las interpretaciones, no las teorías. La experiencia directa, tal como se presenta.\n\nPara estudiarla propuso la [introspección experimental] — un método en que sujetos entrenados describían sus experiencias mentales mientras se les presentaban estímulos controlados. No la introspección libre y subjetiva que los filósofos habían practicado durante siglos — sino una introspección rigurosa, sistematizada, con condiciones estándar y resultados que podían compararse.\n\nEl problema que Wundt encontró — y que sus críticos señalaron con razón — es que la introspección tiene un límite fundamental: el acto de observar la propia experiencia la modifica. No puedes estudiar tu mente desde afuera porque estás adentro. Esa paradoja, que [Kant] había anticipado filosóficamente, se volvió el problema central de toda la psicología experimental que siguió.\n\nWundt también propuso que la experiencia consciente podía descomponerse en elementos básicos — sensaciones simples que se combinaban para formar experiencias más complejas, como los átomos de [Demócrito] pero para la mente. A esa propuesta la llamamos [estructuralismo]. Fue la primera teoría formal de cómo funciona la conciencia, y también la primera en ser refutada — por el propio movimiento que provocó.`,
      closingLine: '',
    },
    fondo: {
      question: '¿Qué dejó Wundt que todavía importa?',
      text: `El legado de Wundt no está en sus teorías específicas — el estructuralismo no sobrevivió más allá de su generación — sino en el gesto fundacional: demostrar que la mente puede ser objeto de investigación sistemática.\n\nAntes de Wundt, hablar de psicología científica era casi una contradicción. Después de él, se convirtió en la única psicología legítima. Eso tiene consecuencias que todavía vivimos: la exigencia de que los tratamientos psicológicos tengan evidencia empírica, que los modelos de la mente sean falsificables, que las afirmaciones sobre el comportamiento humano puedan ponerse a prueba. Todo eso viene de Leipzig, 1879.\n\nPero Wundt también plantó la semilla de su propia superación. Al insistir en que la psicología estudiara solo la experiencia consciente, dejó fuera exactamente lo que [Sigmund Freud] — que era contemporáneo suyo — estaba empezando a explorar: todo lo que ocurre por debajo de la conciencia. Y al fragmentar la experiencia en elementos aislados, ignoró lo que [William James] — su gran rival intelectual — defendería apasionadamente: que la conciencia es un flujo continuo que no puede entenderse descomponiéndola en partes.\n\nLas limitaciones de Wundt fueron el mapa de lo que vendría después. Eso es exactamente lo que hacen los fundadores.`,
      closingLine: '',
    },
  },
  {
    id: 'james',
    name: 'William James',
    subtitle: 'La conciencia no es una cosa — es lo que haces mientras vives',
    dates: '1842–1910',
    blockId: 'b1',
    surface: {
      question: '¿Alguna vez intentaste no pensar en algo y descubriste que era imposible detener el flujo de pensamientos?',
      text: `William James sabía exactamente de qué estás hablando. En 1890 publicó los Principios de Psicología — dos volúmenes que tomaron doce años escribir y que muchos consideran el libro más importante en la historia de la disciplina. Y en esas páginas propuso algo que cambió completamente cómo entendemos la mente: la conciencia no es un estado estático que se puede examinar como un objeto. Es una [corriente] — algo que fluye sin pausas, que se mueve, que nunca se repite exactamente.\n\nIntentar estudiar la conciencia deteniéndola, como proponía [Wundt], era para James como intentar atrapar el agua del río con las manos.`,
      closingLine: '',
    },
    concept: {
      question: '¿Qué propuso William James sobre la mente y las emociones?',
      text: `Desde la perspectiva de James, la psicología no debía estudiar los elementos de la conciencia sino sus [funciones] — para qué sirven, cómo ayudan al organismo a adaptarse a su entorno. A esa posición la llamamos [funcionalismo], y es la respuesta americana al estructuralismo alemán de [Wundt].\n\nJames tenía una manera de ver las cosas que resultaba incómoda para su época: la mente no era algo separado del cuerpo sino algo que el cuerpo hace. Pensar, sentir, percibir — todo eso son actividades del organismo vivo en interacción con su entorno. Eso lo acercaba notablemente a [Aristóteles], aunque James llegó a esa conclusión por un camino completamente distinto.\n\nSu teoría de las emociones es uno de los ejemplos más contraintuitivos de la historia de la psicología. Lo que creemos que ocurre cuando tenemos miedo es esto: vemos algo amenazante, sentimos miedo, y por eso huimos. James propuso exactamente lo contrario: vemos algo amenazante, huimos, y la percepción de ese estado corporal — el corazón acelerado, los músculos tensos, la respiración entrecortada — es lo que llamamos miedo. La emoción no causa la respuesta corporal. La respuesta corporal es la emoción.\n\nEsa idea — que las emociones son fundamentalmente experiencias corporales — anticipó décadas de investigación en neurociencia. Y tiene consecuencias clínicas directas: si quieres cambiar cómo te sientes, a veces el camino más corto no es cambiar lo que piensas sino cambiar lo que hace tu cuerpo.\n\nJames también escribió algo sobre los hábitos que todavía resulta sorprendentemente contemporáneo: los hábitos son el equivalente mental de los surcos en el barro que el agua hace más profundos con cada paso. Cada vez que repites un pensamiento o una conducta, la vía neuronal que lo sustenta se vuelve más fácil de recorrer. La [neuroplasticidad] que la neurociencia confirmaría un siglo después ya estaba implícita en James.`,
      closingLine: '',
    },
    fondo: {
      question: '¿Por qué William James sigue siendo tan vigente?',
      text: `James es el psicólogo que más difícilmente envejece. Parte de eso se debe a que nunca intentó construir un sistema cerrado — fue siempre un pensador de ideas abiertas, de conexiones inesperadas, de preguntas que importan más que las respuestas definitivas.\n\nPero hay algo más profundo. James vivió con una depresión severa durante años — lo que él llamaba su "crisis filosófica" — y esa experiencia personal tiñó toda su obra con una urgencia práctica que la psicología académica de su época no tenía. No le interesaba la psicología como ejercicio intelectual. Le interesaba como herramienta para vivir mejor.\n\nEsa orientación práctica — que la psicología debe servir para algo concreto en la vida real — es lo que conecta a James con tradiciones muy distintas. Es el antecedente del [pragmatismo] filosófico americano. Es el precursor de la [psicología positiva] que florecerá un siglo después. Y es, en cierta forma, el espíritu que anima a toda la psicología aplicada: la convicción de que entender la mente tiene que traducirse en vivir mejor.\n\nHay una frase de James que resume su proyecto entero: "El mayor descubrimiento de mi generación es que los seres humanos pueden alterar sus vidas alterando sus actitudes mentales." Para alguien que vivió en la época en que [Wundt] medía tiempos de reacción en un laboratorio, eso era una declaración radical. Para nosotros, que vivimos después de todo lo que James anticipó, suena a algo que siempre supimos.`,
      closingLine: '',
    },
  },

  // ── b2: Psicoanálisis ─────────────────────────────────────────────────────────
  {
    id: 'freud',
    name: 'Sigmund Freud',
    subtitle: 'Lo que no sabes de ti mismo te gobierna',
    dates: '1856–1939',
    blockId: 'b2',
    surface: {
      question: '¿Alguna vez dijiste algo hiriente y luego no supiste bien por qué lo hiciste?',
      text: `Has dicho algo hiriente a alguien que quieres y no sabes bien por qué. Te has saboteado justo cuando algo iba bien. Has sentido una antipatía inmediata hacia alguien que acabas de conocer sin razón aparente. Freud observó que estos momentos no son accidentes ni fallas de carácter — son mensajes de una parte de tu mente que actúa por debajo de tu conciencia, con sus propias lógicas y sus propios objetivos.\n\nLa mayor parte de lo que te mueve ocurre sin que tú lo sepas. Eso no es solo una metáfora — es la propuesta más radical que un médico vienés hizo en 1890.`,
      closingLine: '',
    },
    concept: {
      question: '¿Cómo funciona el aparato psíquico según Freud?',
      text: `Imagina que tu mente es un iceberg. La punta visible — lo que sabes que piensas y sientes en este momento — es lo consciente. La parte sumergida pero accesible — lo que podrías recordar si lo intentaras — es lo preconsciente. Y debajo hay una zona más profunda e inaccesible: el [inconsciente] propiamente dicho, donde viven impulsos, deseos y memorias que generan demasiada angustia para estar en la superficie.\n\nLa [represión] es la fuerza que los mantiene ahí abajo. No es voluntaria — si lo fuera, ya serías consciente de lo que intentas reprimir. Ocurre automáticamente ante lo que genera angustia. Piensa en una niña que aprende que expresar rabia en su familia genera rechazo. Su mente aprende a reprimir esa rabia automáticamente. De adulta puede tener dificultad para reconocer su propia rabia, puede somatizarla en tensión muscular, o puede explotar de maneras desproporcionadas cuando algo la activa. La represión no eliminó la rabia: la desplazó.\n\nLo reprimido no desaparece — sigue activo y busca expresarse por vías indirectas. Los sueños, donde la censura baja, son para Freud la vía regia al inconsciente. Los [lapsus verbales] revelan lo que no se quiso decir. Y los patrones relacionales que se repiten — siempre eligiendo parejas con el mismo perfil, siempre teniendo el mismo tipo de conflicto — son el retorno más importante de lo reprimido: la [compulsión a repetir] lo no resuelto.\n\nFreud también describió los [mecanismos de defensa] — las estrategias que el yo desarrolla para manejar la angustia. La [proyección]: atribuir a otro lo que no puedo aceptar en mí mismo. La [racionalización]: construir una razón lógica para algo motivado por otro factor. La [formación reactiva]: sentir exactamente lo contrario de lo que siento realmente. Estos mecanismos no son patológicos en sí mismos — son parte de cómo funciona toda mente humana.`,
      closingLine: '',
    },
    fondo: {
      question: '¿Qué cambió para siempre con Freud?',
      text: `Antes de Freud, el sufrimiento psicológico sin causa física visible era considerado simulación, debilidad moral o degeneración. Freud propuso algo radicalmente diferente: ese sufrimiento tiene sentido, tiene historia, tiene lógica. Y esa lógica puede descifrarse.\n\nEn 1923 Freud revisó su modelo y propuso la [segunda tópica]: el ello, el yo y el superyó. El [ello] es el reservorio de los impulsos primitivos — no tiene tiempo, no conoce la negación, solo quiere satisfacción inmediata. El [yo] es el ejecutivo que intenta mediar entre el ello, la realidad externa y el superyó. El [superyó] es la ley internalizada — la voz de los padres y la cultura. Lo clínicamente crucial: el superyó puede ser mucho más brutal con el yo que cualquier persona externa. La autocrítica severa, la culpa crónica, el castigo que uno se aplica a sí mismo — todo eso es el superyó en acción.\n\nFreud también propuso que toda la vida psíquica está impulsada por dos fuerzas opuestas. [Eros] — la pulsión de vida — tiende hacia la unión, la complejidad creciente, la conexión: es lo que nos impulsa a amar, crear y construir vínculos. Durante años Freud pensó que Eros lo explicaba todo — buscamos placer y evitamos el dolor. Ese es el [principio del placer].\n\nPero observó algo que ese principio no podía explicar: muchos pacientes repetían activamente situaciones dolorosas. Personas que saboteaban sus logros justo cuando algo iba bien. Relaciones que se repetían con el mismo patrón dañino. Eso lo llevó a postular [Tánatos] — la pulsión de muerte — como una fuerza opuesta a Eros: la tendencia de toda materia viva hacia el estado de menor tensión, hacia lo inorgánico. No como deseo consciente de morir sino como la lógica silenciosa detrás de los patrones autodestructivos y la compulsión a repetir lo que duele.\n\nLas teorías específicas de Freud han sido ampliamente revisadas. Pero sus preguntas fundacionales siguen siendo las de todo el campo: ¿qué hay debajo de lo que se dice? ¿Por qué repetimos lo que nos hace daño? ¿Cómo la historia temprana organiza la vida adulta? Toda terapia que trabaja con esas preguntas le debe algo a Freud.`,
      closingLine: '',
    },
  },
  {
    id: 'jung',
    name: 'Carl Gustav Jung',
    subtitle: 'El inconsciente es más grande de lo que Freud imaginó',
    dates: '1875–1961',
    blockId: 'b2',
    surface: {
      question: '¿Alguna vez tuviste un sueño tan vívido que se sintió más real que la vigilia — con imágenes que no podías explicar de dónde venían?',
      text: `Carl Jung fue el discípulo más brillante de [Freud] y también su ruptura más dolorosa. Durante años trabajaron juntos, se escribieron cartas casi diarias, y Freud lo consideraba su sucesor. Luego discreparon sobre algo que parecía técnico pero era en realidad filosófico: ¿de qué está hecho el inconsciente?\n\nPara Freud, el inconsciente era personal — un depósito de experiencias reprimidas de la historia individual. Para Jung, eso era solo la superficie. Debajo había algo más antiguo, más amplio y más misterioso: un inconsciente que pertenece no a la persona sino a la especie.`,
      closingLine: '',
    },
    concept: {
      question: '¿Qué propuso Jung sobre la psique?',
      text: `Desde la perspectiva de Jung, la psique tiene tres niveles. La [conciencia] — lo que sabemos de nosotros mismos. El [inconsciente personal] — experiencias reprimidas u olvidadas de nuestra historia individual, similar al inconsciente de [Freud]. Y el [inconsciente colectivo] — una capa más profunda que no proviene de la experiencia personal sino de la herencia de la especie humana.\n\nEl inconsciente colectivo está compuesto de [arquetipos] — patrones universales de experiencia que se expresan en los mitos, los sueños, el arte y las religiones de todas las culturas. El [héroe], la [sombra], el [ánima] y el [ánimus], la [Gran Madre], el [anciano sabio] — estas figuras aparecen en los cuentos de hadas de culturas que nunca tuvieron contacto entre sí, en los sueños de personas de todo el mundo, en las mitologías de todos los tiempos.\n\nPara Jung, los sueños no eran principalmente deseos reprimidos disfrazados — como proponía [Freud] — sino mensajes del inconsciente que intentan compensar lo que la conciencia ignora. Si vives demasiado racionalmente, tus sueños te traerán imágenes caóticas. Si ignoras tu agresividad, aparecerá en tus sueños como una figura amenazante. El inconsciente busca el equilibrio que la conciencia ha perturbado.\n\nJung también propuso algo que se volvió enormemente influyente fuera de la psicología: el concepto de [individuación] — el proceso de llegar a ser quién realmente eres, integrando las distintas partes de la psique en lugar de reprimir las que resultan incómodas. La [sombra] — todo lo que hemos rechazado de nosotros mismos — no desaparece cuando la ignoramos. Crece. Y se proyecta en los demás: lo que más odias en otras personas frecuentemente es lo que más temes en ti mismo.`,
      closingLine: '',
    },
    fondo: {
      question: '¿Qué dejó Jung que todavía importa?',
      text: `El legado de Jung es paradójico: es al mismo tiempo el psicoanalista más influyente en la cultura popular y el menos respetado en la psicología académica contemporánea.\n\nLa razón del desprestigio académico es comprensible: el inconsciente colectivo y los arquetipos son conceptos difíciles de operacionalizar y medir. Jung se adentró en territorios — la alquimia, la astrología, los fenómenos paranormales — que la psicología científica no puede seguir. Y su ruptura con [Freud] tuvo un componente personal y político que enturbia la lectura de su obra.\n\nPero hay algo en Jung que la psicología académica no ha sabido cómo incorporar y que sin embargo parece verdadero: que los seres humanos no solo tienen historia personal — tienen historia de especie. Que los grandes mitos y narrativas que aparecen en todas las culturas no son casualidades sino expresiones de algo profundo en la psique humana. Que la búsqueda de significado — no solo de placer ni de adaptación — es una necesidad psicológica fundamental.\n\nEsa intuición la recogerá [Viktor Frankl] desde un camino completamente distinto. Y la investigación contemporánea sobre narrativa, identidad y bienestar le está dando, décadas después, una base empírica que Jung nunca tuvo.`,
      closingLine: '',
    },
  },
  {
    id: 'winnicott',
    name: 'Donald Winnicott',
    subtitle: 'No hay bebé sin madre — ni persona sin entorno',
    dates: '1896–1971',
    blockId: 'b2',
    surface: {
      question: '¿Recuerdas algo de tu infancia que te hacía sentir seguro — un objeto, un lugar, una rutina — que de alguna manera te representaba a ti?',
      text: `Donald Winnicott fue pediatra antes de ser psicoanalista. Eso marcó todo su pensamiento: no veía pacientes abstractos con estructuras psíquicas teóricas — veía bebés reales con madres reales en situaciones reales. Y lo que observó en miles de consultas lo llevó a proponer algo que parece simple pero tiene implicaciones profundas: el desarrollo psicológico sano no depende solo del bebé ni solo de la madre — depende de la calidad del espacio entre los dos.`,
      closingLine: '',
    },
    concept: {
      question: '¿Qué propuso Winnicott sobre el desarrollo y el ambiente?',
      text: `Desde la perspectiva de Winnicott, no existe el bebé sin la madre. Lo que existe es un sistema — un entorno de cuidado que, cuando funciona suficientemente bien, permite que el bebé desarrolle su [self] — su sentido de ser alguien real, vivo, continuo en el tiempo.\n\nLa frase que más define su pensamiento es la de la [madre suficientemente buena]. No la madre perfecta — que en realidad sería dañina — sino la que se adapta bien a las necesidades del bebé al principio y luego va fallando gradualmente, en dosis tolerables, permitiendo que el bebé aprenda a manejar la frustración y a desarrollar sus propias capacidades. La perfección impide el desarrollo. La falla tolerable lo promueve.\n\nWinnicott describió el [holding] — el sostenimiento físico y emocional que el cuidador provee — como el fundamento de toda salud psicológica. Un bebé que es sostenido de manera confiable desarrolla lo que Winnicott llamó [continuidad del ser] — la experiencia básica de existir de manera coherente en el tiempo. Cuando el sostenimiento falla de manera severa o impredecible, el bebé desarrolla lo que Winnicott llamó [angustias primitivas] — miedos arcaicos a desintegrarse, a caer para siempre, a no tener ningún vínculo con el cuerpo. Esas angustias, aunque primitivas, pueden estar en el fondo de muchos sufrimientos adultos.\n\nEl concepto más conocido de Winnicott es el de los [objetos transicionales] — el osito de peluche, la mantita, el objeto que el bebé convierte en algo que representa a la vez a la madre y a sí mismo. No es exactamente de afuera ni exactamente de adentro. Existe en un espacio intermedio que Winnicott llamó [espacio potencial] — el ámbito de la experiencia cultural, el juego, el arte, la creatividad. Ese espacio, que empieza con el osito de peluche, es para Winnicott la fuente de todo lo más rico de la experiencia humana.`,
      closingLine: '',
    },
    fondo: {
      question: '¿Qué dejó Winnicott para la clínica y para entenderse a uno mismo?',
      text: `Winnicott transformó la práctica clínica de una manera que pocos reconocen explícitamente pero todos los terapeutas sienten: introdujo la idea de que la terapia no es principalmente una técnica sino un entorno. Un lugar donde alguien puede ser sostenido — held — de manera suficientemente confiable como para atreverse a existir de manera más plena.\n\nEsa idea conecta directamente con lo que [Carl Rogers] estaba desarrollando en paralelo desde el humanismo: que lo que sana no es la interpretación correcta sino la calidad de la presencia del terapeuta. Y con lo que la investigación contemporánea sobre resultados en psicoterapia ha confirmado: que el factor más predictivo del éxito terapéutico no es la técnica sino la [alianza terapéutica] — la calidad del vínculo entre terapeuta y paciente.\n\nHay algo en Winnicott que resuena más allá de la clínica. Su idea de que el [self verdadero] — lo que somos cuando no estamos actuando para los demás — solo puede emerger en entornos que son suficientemente seguros y libres de demandas invasivas es una descripción de algo que todos reconocemos: hay personas y lugares con los que podemos ser quienes somos, y hay personas y lugares donde solo podemos ser quienes se espera que seamos. La diferencia entre esos dos tipos de entornos es, en el lenguaje de Winnicott, la diferencia entre el holding y su ausencia.`,
      closingLine: '',
    },
  },
  {
    id: 'kohut',
    name: 'Heinz Kohut',
    subtitle: 'Lo que más necesitamos no es amor — es ser vistos',
    dates: '1913–1981',
    blockId: 'b2',
    surface: {
      question: '¿Alguna vez sentiste que alguien estaba en la misma habitación que tú pero completamente ausente — como si no existieras para esa persona?',
      text: `Esa experiencia — de no ser visto, de no ser reflejado, de existir sin que nadie lo note — es para Heinz Kohut la herida psicológica más fundamental. No la sexualidad reprimida de [Freud], no la ansiedad existencial de [Yalom]. La ausencia de espejo.\n\nKohut desarrolló su teoría trabajando con pacientes que no encajaban bien en el modelo psicoanalítico clásico — personas que no mostraban los conflictos neuróticos típicos sino una fragilidad más profunda, una dificultad para mantener una sensación estable de quiénes eran. Los llamó pacientes con [patología del self], y para entenderlos propuso una nueva psicología.`,
      closingLine: '',
    },
    concept: {
      question: '¿Qué propuso Kohut sobre el desarrollo del self?',
      text: `Desde la perspectiva de Kohut, el [self] — la experiencia de ser alguien coherente, vivo y valioso — no surge espontáneamente. Necesita ser construido en relación con otros. Y los otros que lo construyen son lo que Kohut llamó [objetos del self] — personas que cumplen funciones psicológicas esenciales para el desarrollo del self.\n\nKohut describió tres necesidades fundamentales del self que deben ser satisfechas para que el desarrollo sea sano. La necesidad de [reflejo] — ser visto, admirado, confirmado en la propia grandiosidad por un otro que responde con entusiasmo. La necesidad de [idealización] — poder fusionarse con un otro poderoso y calmante, sentir que uno forma parte de algo más grande y más seguro que uno mismo. Y la necesidad de [gemelaridad] — sentir que hay alguien esencialmente similar a uno, que no estamos solos en nuestra experiencia.\n\nCuando estas necesidades no son satisfechas suficientemente en la infancia, el self no se desarrolla con cohesión. Emerge un self [fragmentado] — vulnerable a la vergüenza, a la grandiosidad defensiva, a la dependencia intensa de la aprobación ajena. Lo que la cultura popular llama [narcisismo] es, desde la perspectiva de Kohut, no un exceso de amor propio sino su ausencia — una compensación frágil por un self que nunca fue suficientemente visto ni confirmado.\n\nLa implicación terapéutica es radical: el terapeuta no es principalmente un intérprete de conflictos inconscientes. Es un [objeto del self] — alguien que provee las experiencias de reflejo, idealización y gemelaridad que el desarrollo temprano no pudo dar. La cura no viene de la interpretación correcta sino de la experiencia de ser finalmente visto.`,
      closingLine: '',
    },
    fondo: {
      question: '¿Qué dejó Kohut para entender el sufrimiento contemporáneo?',
      text: `La psicología del self de Kohut describe con precisión inquietante algo que se ha vuelto endémico en la cultura contemporánea: la fragilidad del self en una época que prometía exactamente lo contrario.\n\nVivimos en una cultura que ofrece más espejos que nunca — redes sociales, seguidores, likes, vistas. Y sin embargo los índices de soledad, depresión y vacío existencial no han parado de crecer. Kohut diría que eso no es paradójico: los espejos digitales no proveen lo que el self necesita, que es ser visto por alguien que realmente está presente, que no puede desconectarse, que nos conoce con el tiempo y a través de la complejidad.\n\nKohut también dejó algo para la práctica clínica que todavía se subestima: la idea de que la [empatía] — la capacidad de resonar con la experiencia subjetiva del otro — no es solo un instrumento terapéutico sino el entorno en que la cura ocurre. Eso conecta directamente con lo que [Rogers] estaba desarrollando en paralelo, y con lo que la investigación sobre [neuronas espejo] confirmaría décadas después: que la resonancia empática no es una metáfora sino un proceso neural real.`,
      closingLine: '',
    },
  },

  // ── b3: Conductismo y Humanismo ───────────────────────────────────────────────
  {
    id: 'pavlov',
    name: 'Iván Pávlov',
    subtitle: 'El cuerpo aprende antes de que la mente lo decida',
    dates: '1849–1936',
    blockId: 'b3',
    surface: {
      question: '¿Alguna vez notaste que ciertos lugares, olores o canciones te generan una sensación instantánea — antes de que puedas pensar en por qué?',
      text: `Eso no es nostalgia ni coincidencia. Es exactamente el mecanismo que Ivan Pavlov describió en sus experimentos con perros, que le valieron el Premio Nobel en 1904, y que resultaron ser uno de los principios más fundamentales de cómo aprendemos.\n\nPavlov no era psicólogo. Era fisiólogo, interesado en la digestión. Pero mientras estudiaba las glándulas salivales de los perros, observó algo que ningún fisiólogo antes había notado: los perros empezaban a salivar antes de que llegara la comida — cuando aparecía el asistente que normalmente la traía, o cuando escuchaban el sonido que habitualmente la precedía. El cuerpo había aprendido a anticipar.`,
      closingLine: '',
    },
    concept: {
      question: '¿Qué demostró Pavlov sobre el aprendizaje?',
      text: `Desde la perspectiva de Pavlov, lo que observó en sus perros era la expresión de un mecanismo de aprendizaje básico y universal: el [condicionamiento clásico]. El proceso es este: hay estímulos que producen respuestas automáticas e involuntarias — el sabor de la comida produce salivación, un ruido fuerte produce sobresalto. A esas respuestas Pavlov las llamó [reflejos incondicionados].\n\nLo que Pavlov demostró es que si un estímulo neutro — un sonido, una luz, el rostro de una persona — se presenta repetidamente junto al estímulo que produce la respuesta automática, el estímulo neutro empieza a producir esa respuesta solo. Se convierte en un [estímulo condicionado], y la respuesta que genera — el [reflejo condicionado] — es el aprendizaje.\n\nEso tiene implicaciones que van mucho más allá de los perros y la salivación. Los [miedos aprendidos] funcionan exactamente así: una experiencia dolorosa o aterradora se asocia con el lugar donde ocurrió, con las personas que estaban presentes, con los sonidos o los olores de ese momento. Después, esos estímulos producen miedo automáticamente — sin que la persona pueda controlarlo ni explicarlo racionalmente. El cuerpo recuerda lo que la mente no eligió.\n\nPavlov también describió la [extinción] — el proceso por el cual un reflejo condicionado desaparece gradualmente si el estímulo condicionado se presenta repetidamente sin el estímulo incondicionado. Eso es el fundamento de las [terapias de exposición]: exponer gradualmente a la persona al estímulo temido, sin que ocurra el daño, hasta que la respuesta de miedo se extingue. Es el tratamiento más efectivo que existe para las fobias.`,
      closingLine: '',
    },
    fondo: {
      question: '¿Qué heredó la psicología clínica de Pavlov?',
      text: `Pavlov es el científico menos citado y más utilizado de la psicología clínica. Sus principios están en el fondo de casi todos los tratamientos conductuales y cognitivo-conductuales — a veces explícitamente, a veces sin que quien los aplica lo sepa.\n\nLa [desensibilización sistemática] de Joseph Wolpe — uno de los primeros tratamientos efectivos para la ansiedad — es condicionamiento pavloviano: asociar gradualmente el estímulo temido con un estado de relajación hasta que el miedo se extingue. La [terapia de exposición con prevención de respuesta] para el trastorno obsesivo-compulsivo funciona por extinción. Y las técnicas de [reconsolidación de memoria] que la neurociencia contemporánea está desarrollando — la idea de que los recuerdos emocionales pueden reescribirse si se reactivan en condiciones de seguridad — son una extensión directa de lo que Pavlov observó en su laboratorio de San Petersburgo.\n\nHay algo filosóficamente inquietante en el legado de Pavlov que vale la pena nombrar: si las respuestas emocionales más básicas — el miedo, el deseo, el asco — son en gran parte aprendidas por mecanismos que no controlamos conscientemente, entonces la frontera entre lo que "somos" y lo que "nos hicieron" es mucho más borrosa de lo que creemos. Eso no elimina la responsabilidad personal. Pero cambia radicalmente el marco en que la evaluamos.`,
      closingLine: '',
    },
  },
  {
    id: 'watson',
    name: 'John B. Watson',
    subtitle: 'Si no puedes medirlo, no existe',
    dates: '1878–1958',
    blockId: 'b3',
    surface: {
      question: '¿Alguna vez alguien te dijo "eso es solo psicológico" como si eso lo hiciera menos real — o menos digno de atención?',
      text: `En 1913, John B. Watson publicó un artículo que cambió el rumbo de la psicología durante décadas. Se llamaba La psicología desde el punto de vista del conductista, y su tesis era simple y brutal: la conciencia, las emociones, los pensamientos, la mente — todo eso no puede estudiarse científicamente porque no puede observarse desde afuera. La única psicología legítima es la que estudia la conducta observable.\n\nLo que Watson estaba haciendo no era solo una propuesta metodológica. Era una declaración de guerra contra todo lo que [Wundt] y [William James] habían construido. Y tuvo consecuencias que todavía se sienten.`,
      closingLine: '',
    },
    concept: {
      question: '¿Qué propuso Watson sobre el comportamiento humano?',
      text: `Desde la perspectiva de Watson, el ser humano no es fundamentalmente distinto de cualquier otro animal. Es un organismo que responde a estímulos del entorno. Dale el estímulo correcto y obtendrás la respuesta que quieres. Cambia el entorno y cambiarás la conducta. Todo lo demás — la conciencia, las intenciones, los deseos — son especulaciones inobservables que no tienen lugar en una ciencia rigurosa.\n\nWatson tomó el trabajo de [Ivan Pavlov] — el fisiólogo ruso que había demostrado que los perros podían aprender a salivar ante el sonido de una campana si ese sonido se asociaba repetidamente con comida — y lo convirtió en el fundamento de una psicología entera. A ese proceso lo llamamos [condicionamiento clásico]: la asociación repetida entre un estímulo neutro y uno que produce una respuesta automática, hasta que el neutro produce la respuesta solo.\n\nPavlov lo había demostrado con perros. Watson quiso demostrarlo con humanos. En el experimento más famoso y éticamente problemático de la historia de la psicología — el caso del [Pequeño Albert] — condicionó a un bebé de nueve meses a temer a una rata blanca asociándola repetidamente con un ruido fuerte y aterrador. El bebé generalizó ese miedo a otros objetos similares: conejos, abrigos de piel, incluso la barba blanca de Papá Noel.\n\nWatson nunca desacondicionó al niño. El experimento terminó cuando la madre del bebé, que trabajaba en el hospital donde se realizaba la investigación, se enteró de lo que ocurría y retiró al niño. Es uno de los episodios más oscuros de la historia de la psicología, y uno de los más informativos sobre los límites éticos de la investigación con seres humanos.\n\nLo que Watson demostró — más allá de los problemas éticos — es que el miedo puede aprenderse. Y si puede aprenderse, también puede desaprenderse. Esa idea es el fundamento de las [terapias de exposición] que hoy se usan para tratar fobias, ansiedad y trastorno de estrés postraumático.`,
      closingLine: '',
    },
    fondo: {
      question: '¿Qué ganó y qué perdió la psicología con Watson?',
      text: `El conductismo de Watson fue, simultáneamente, el mayor avance metodológico y la mayor reducción conceptual que la psicología había experimentado hasta ese momento.\n\nLo que ganó: rigor. La psicología conductista produjo hallazgos replicables, medibles, aplicables. Las técnicas que emergieron del condicionamiento — la desensibilización sistemática, la economía de fichas, la modificación de conducta — funcionan. Tienen evidencia. Salvan vidas. Eso no es trivial.\n\nLo que perdió: la persona. En la psicología de Watson, no hay nadie adentro. Hay un organismo que responde a estímulos. No hay intenciones, no hay significados, no hay historia personal, no hay sufrimiento que busque sentido. Solo conducta observable y sus causas ambientales.\n\nEsa reducción tuvo consecuencias clínicas dolorosas. Décadas de psicología conductista pura trataron a personas como sistemas de condicionamiento que podían reprogramarse sin necesidad de entender su experiencia subjetiva. Funcionaba en algunos casos. En otros, dejaba intacto exactamente lo que causaba el sufrimiento.\n\nLa reacción no tardó en llegar. [Carl Rogers], en los años cincuenta, propondría que el corazón de la terapia no es la técnica sino la relación — que lo que sana a una persona no es el condicionamiento correcto sino ser visto, escuchado y comprendido por otro ser humano. Y [Aaron Beck], desde dentro de la tradición científica que Watson había fundado, demostraría que los pensamientos — exactamente lo que Watson había descartado como inobservable — son el factor más poderoso en la génesis y el tratamiento de la depresión.\n\nWatson tenía razón en que la conducta importa. Se equivocó en pensar que era lo único que importaba.`,
      closingLine: '',
    },
  },
  {
    id: 'skinner',
    name: 'B. F. Skinner',
    subtitle: 'El entorno lo hace todo — o casi todo',
    dates: '1904–1990',
    blockId: 'b3',
    surface: {
      question: '¿Alguna vez notaste que haces ciertas cosas más seguido cuando te traen buenos resultados, y las dejas de hacer cuando no?',
      text: `Eso que describes — tan obvio cuando lo ves escrito — fue el principio que Burrhus Frederic Skinner convirtió en el sistema psicológico más influyente del siglo XX. No la conciencia, no el inconsciente, no las emociones. Las consecuencias. Lo que ocurre después de lo que hacemos determina si lo volvemos a hacer.\n\nSkinner tomó el conductismo de [Watson] y lo llevó más lejos, más sistemáticamente, con más evidencia. Y construyó algo que sus seguidores aplicaron en escuelas, hospitales, prisiones, empresas y consultorios de todo el mundo.`,
      closingLine: '',
    },
    concept: {
      question: '¿Qué propuso Skinner sobre cómo aprendemos?',
      text: `Desde la perspectiva de Skinner, el [condicionamiento clásico] de [Pavlov] y [Watson] explicaba cómo aprendemos respuestas involuntarias — reflejos, miedos, reacciones automáticas. Pero no explicaba la mayor parte de lo que hacemos: conductas voluntarias, intencionales, dirigidas hacia un objetivo.\n\nPara eso propuso el [condicionamiento operante] — la idea de que las conductas se fortalecen o se debilitan según sus consecuencias. Una consecuencia que aumenta la probabilidad de que una conducta se repita es un [reforzador]. Una consecuencia que la disminuye es un [castigo]. Y la ausencia de consecuencias — ignorar completamente una conducta — tiende a extinguirla.\n\nSkinner demostró estos principios con una precisión notable. En la famosa [caja de Skinner] — una cámara experimental donde ratas o palomas podían presionar palancas para obtener comida — describió con exactitud matemática cómo distintos patrones de refuerzo producen distintos patrones de conducta.\n\nLo que encontró es contraintuitivo pero robusto: el refuerzo intermitente — dar la recompensa solo a veces, de manera impredecible — produce la conducta más persistente y más difícil de extinguir. Las máquinas tragamonedas funcionan exactamente así. Las redes sociales también — nunca sabes cuándo tu publicación recibirá likes, y esa incertidumbre es precisamente lo que te mantiene revisando.\n\nDesde la perspectiva de Skinner, el libre albedrío era una ilusión. Lo que llamamos decisiones libres son conductas determinadas por nuestra historia de refuerzos y castigos. Eso no era nihilismo — era, para él, una buena noticia: si el entorno determina la conducta, cambiar el entorno puede cambiar a las personas de manera más efectiva y más compasiva que culparlas por sus fallas.`,
      closingLine: '',
    },
    fondo: {
      question: '¿Qué hace bien el conductismo de Skinner — y dónde se queda corto?',
      text: `Las aplicaciones del condicionamiento operante son algunas de las más sólidas y útiles de toda la psicología. La [modificación de conducta] basada en principios skinnerianos funciona para enseñar habilidades a niños con autismo, para tratar adicciones, para estructurar programas de rehabilitación. Eso no es menor.\n\nPero el conductismo skinneriano tiene un problema filosófico que nunca resolvió: trata a los seres humanos como si fueran palomas con más neuronas. Y en el proceso deja fuera exactamente lo que hace que el sufrimiento humano sea humano — el significado, la historia personal, la manera en que cada persona interpreta lo que le ocurre.\n\nEse fue el punto de partida de [Aaron Beck]. Trabajando con pacientes deprimidos en los años sesenta, Beck notó que el condicionamiento no explicaba por qué dos personas con historias de refuerzos similares desarrollaban niveles de depresión completamente distintos. La diferencia estaba en cómo cada una interpretaba lo que le ocurría. En sus pensamientos. En exactamente lo que Watson y Skinner habían descartado como inobservable e irrelevante.\n\nHay también un legado de Skinner que raramente se nombra: su visión de la educación. Skinner creía que la enseñanza tradicional era fundamentalmente inhumana — castigaba los errores en lugar de reforzar los aciertos, avanzaba al ritmo del grupo en lugar del individuo, ignoraba los principios del aprendizaje que la investigación había establecido. Sus propuestas de [instrucción programada] — aprender en pasos pequeños con retroalimentación inmediata — son el antecedente directo de plataformas como Duolingo o Khan Academy.\n\nSkinner tenía razón en que las consecuencias moldean la conducta. Se equivocó en pensar que eso era suficiente para explicar al ser humano.`,
      closingLine: '',
    },
  },
  {
    id: 'rogers',
    name: 'Carl Rogers',
    subtitle: 'Lo que sana no es la técnica — es ser visto por otro ser humano',
    dates: '1902–1987',
    blockId: 'b3',
    surface: {
      question: '¿Alguna vez te sentiste completamente escuchado por alguien — y notaste que eso solo, sin que te dieran ningún consejo, ya te hizo sentir mejor?',
      text: `Carl Rogers observó ese fenómeno miles de veces en su consulta. Y llegó a una conclusión que fue radical en su época — y que sigue siendo incómoda para las psicologías que priorizan la técnica sobre la relación: lo que sana a las personas no es que el terapeuta tenga la interpretación correcta ni la técnica adecuada. Es la calidad de la presencia humana que el terapeuta provee.\n\nRogers no llegó a esa conclusión por filosofía. Llegó por observación clínica cuidadosa, y luego la sometió a investigación. Lo que encontró cambió para siempre cómo entendemos la psicoterapia.`,
      closingLine: '',
    },
    concept: {
      question: '¿Qué propuso Rogers sobre el cambio psicológico?',
      text: `Desde la perspectiva de Rogers, todo ser humano tiene una [tendencia actualizante] — una orientación innata hacia el crecimiento, la complejidad y la realización del propio potencial. No es un concepto místico: Rogers lo entendía como el equivalente psicológico de la tendencia de todo organismo vivo hacia el desarrollo. Una semilla tiende a convertirse en árbol si las condiciones son adecuadas. Una persona tiende hacia su realización si el entorno lo permite.\n\nEl problema es que ese crecimiento puede bloquearse. Cuando las personas significativas en la vida de un niño proveen amor y aceptación de manera condicional — "te quiero si te portas bien", "te acepto si eres como yo quiero que seas" — el niño aprende a distorsionar su experiencia para mantener ese amor. Empieza a sentir lo que se espera que sienta, a querer lo que se espera que quiera, a ser quien se espera que sea. Rogers llamó a ese proceso la emergencia del [self irreal] — una manera de ser que no corresponde a la experiencia genuina.\n\nLa cura, desde la perspectiva de Rogers, requiere un entorno con tres condiciones que el terapeuta debe proveer. La [congruencia] — ser auténtico, sin fachada, estar realmente presente como persona. La [aceptación incondicional] — aceptar al cliente sin juicio, sea cual sea lo que piensa, siente o hace. Y la [empatía] — comprender la experiencia subjetiva del cliente desde su propio marco de referencia, no desde el del terapeuta.\n\nCuando esas tres condiciones están presentes, algo ocurre que Rogers llamó [proceso terapéutico]: la persona empieza a confiar en su propia experiencia, a reconocer lo que realmente siente, a explorar partes de sí misma que había aprendido a rechazar. El terapeuta no interpreta, no dirige, no da consejo. Acompaña un proceso que el cliente lleva dentro.`,
      closingLine: '',
    },
    fondo: {
      question: '¿Qué dejó Rogers para la psicoterapia y para entender las relaciones humanas?',
      text: `Rogers hizo algo que nadie antes había hecho con ese rigor: grabó sesiones de terapia y las estudió sistemáticamente para entender qué ocurría cuando el proceso funcionaba y qué ocurría cuando no. Eso produjo la primera investigación empírica sobre el proceso terapéutico, y sus hallazgos siguen siendo los más replicados de toda la psicología clínica.\n\nLo más consistente que la investigación ha encontrado — en décadas de estudios, con distintos tratamientos y distintas poblaciones — es que el predictor más robusto del éxito terapéutico no es la orientación teórica ni la técnica específica. Es la [alianza terapéutica] — la calidad del vínculo entre terapeuta y cliente. Rogers lo había visto antes que nadie.\n\nHay algo en Rogers que va más allá de la terapia. Su convicción de que las personas cambian cuando se sienten genuinamente aceptadas — no cuando se les dice cómo deberían ser — tiene implicaciones para la educación, para el liderazgo, para la crianza, para cualquier relación en que una persona intenta ayudar a otra a desarrollarse. La pregunta que Rogers dejó no es solo "¿cómo hace un terapeuta para que su cliente mejore?" Es "¿qué condiciones necesita un ser humano para crecer?"`,
      closingLine: '',
    },
  },
  {
    id: 'maslow',
    name: 'Abraham Maslow',
    subtitle: 'Satisfacer las necesidades básicas no es suficiente — hay más',
    dates: '1908–1970',
    blockId: 'b3',
    surface: {
      question: '¿Alguna vez tuviste todo lo que "necesitabas" — seguridad, comodidad, relaciones — y aún así sentiste que algo faltaba?',
      text: `Abraham Maslow empezó su carrera estudiando primates, luego se interesó por las personas más sanas y más realizadas que conocía, y terminó proponiendo algo que cambió completamente el marco de la psicología: que el sufrimiento no es solo la ausencia de lo negativo. El bienestar tampoco es solo la ausencia del sufrimiento. Hay algo más — una dirección, una aspiración, una tendencia hacia algo que Maslow llamó [autorrealización].\n\nLa psicología hasta ese momento se había construido estudiando lo que sale mal. Maslow quiso estudiar lo que puede salir excepcionalmente bien.`,
      closingLine: '',
    },
    concept: {
      question: '¿Qué propuso Maslow sobre las necesidades humanas?',
      text: `Desde la perspectiva de Maslow, las necesidades humanas están organizadas en una jerarquía — no porque unas sean más importantes que otras en términos absolutos, sino porque unas deben satisfacerse suficientemente antes de que las siguientes emerjan como motivación predominante.\n\nEn la base están las [necesidades fisiológicas] — alimentación, descanso, temperatura. Encima, las [necesidades de seguridad] — estabilidad, protección, ausencia de miedo. Luego las [necesidades de pertenencia y amor] — relaciones significativas, sentido de comunidad. Después las [necesidades de estima] — reconocimiento, competencia, respeto propio. Y en la cima, la [autorrealización] — el desarrollo pleno del propio potencial, convertirse en lo que uno es capaz de ser.\n\nLo que Maslow añadió más tarde — y que frecuentemente se omite en las presentaciones de la pirámide — es una necesidad que va más allá de la autorrealización: las [necesidades de autotrascendencia] — la experiencia de algo mayor que uno mismo, la conexión con el misterio, lo que Maslow llamó [experiencias cumbre]. Esos momentos de absorción total, de pérdida de los límites del yo, de sensación de que todo tiene sentido y está en su lugar — son para Maslow no lujos espirituales sino necesidades psicológicas reales.\n\nMaslow también estudió sistemáticamente a personas que él consideraba autorrealizadas — entre ellas Abraham Lincoln, Albert Einstein, Eleanor Roosevelt — y describió sus características: aceptación de sí mismas y de los demás, espontaneidad, orientación hacia problemas más que hacia el ego, capacidad para la soledad, independencia de la cultura y el entorno, y una capacidad frecuente para las experiencias cumbre.`,
      closingLine: '',
    },
    fondo: {
      question: '¿Qué heredó la psicología del humanismo de Maslow?',
      text: `La pirámide de Maslow es probablemente la imagen más reconocida de toda la psicología. Y también una de las más malentendidas — se presenta frecuentemente como una descripción de cómo funciona la motivación humana cuando en realidad es una propuesta teórica con evidencia empírica mixta.\n\nLo que Maslow dejó que permanece es más importante que la pirámide: la convicción de que la psicología debe estudiar no solo lo patológico sino lo óptimo. Que hay una diferencia entre la ausencia de enfermedad y la presencia de salud. Que el ser humano tiene una dirección innata hacia algo — hacia la realización, la conexión, el significado — que no puede ignorarse si queremos entender la motivación humana.\n\nEsa convicción fundó la [psicología positiva] que [Martin Seligman] y [Mihaly Csikszentmihalyi] formalizarán décadas después. Y conecta directamente con [Aristóteles] y su concepto de [eudaimonia] — el florecimiento humano que va más allá del placer y la ausencia de dolor.\n\nHay algo que Maslow vio con claridad que la psicología contemporánea sigue debatiendo: que la búsqueda de trascendencia — de algo mayor que uno mismo — no es una neurosis ni una regresión sino una de las expresiones más maduras del desarrollo humano. Esa idea incomoda a una psicología que se formó en el contexto del individualismo occidental. Pero los datos sobre bienestar, sentido y salud mental siguen apuntando en la misma dirección que Maslow.`,
      closingLine: '',
    },
  },
  {
    id: 'frankl',
    name: 'Viktor Frankl',
    subtitle: "Puedes sobrevivir cualquier 'cómo' si tienes un 'para qué'",
    dates: '1905–1997',
    blockId: 'b3',
    surface: {
      question: '¿Alguna vez pasaste por algo muy difícil y lo que te ayudó a seguir no fue que la situación mejorara, sino que encontraste algún sentido en ella?',
      text: `Viktor Frankl sobrevivió Auschwitz. No una vez — cuatro campos de concentración, incluido Auschwitz. Y lo que observó en esa experiencia límite se convirtió en la base de una psicología entera: que el ser humano puede soportar casi cualquier condición externa si encuentra un significado en ella. Que la última de las libertades humanas — la que ningún campo puede quitarte — es la libertad de elegir cómo responder a lo que te ocurre.\n\nFrankl no descubrió eso en los campos. Lo había formulado teóricamente antes, en Viena, trabajando con pacientes suicidas. Los campos lo confirmaron de la manera más brutal posible.`,
      closingLine: '',
    },
    concept: {
      question: '¿Qué propuso Frankl sobre el sentido y el sufrimiento?',
      text: `Desde la perspectiva de Frankl, la motivación fundamental del ser humano no es el placer — como proponía [Freud] — ni el poder — como proponía Alfred Adler — sino el sentido. La [voluntad de sentido] — la necesidad de encontrar que la propia vida tiene significado y propósito — es la fuerza motivacional más profunda y más específicamente humana.\n\nCuando esa voluntad de sentido no puede satisfacerse, emerge lo que Frankl llamó [vacío existencial] — una sensación de vacío, aburrimiento y falta de dirección que no puede llenarse con placer ni con poder. El vacío existencial es, para Frankl, la fuente de gran parte del sufrimiento contemporáneo — la adicción, la depresión, la agresividad, la búsqueda compulsiva de estimulación.\n\nFrankl propuso que el sentido puede encontrarse de tres maneras. A través de lo que damos al mundo — el trabajo creativo, la contribución. A través de lo que recibimos del mundo — la experiencia de la belleza, el amor, la verdad. Y — esto es lo más radical — a través de la actitud que tomamos ante el sufrimiento inevitable. Cuando el sufrimiento no puede evitarse, la libertad que queda es decidir cómo relacionarse con él. Esa libertad no puede quitarla ninguna condición externa.\n\nLa [logoterapia] que Frankl desarrolló — del griego logos, sentido — no busca eliminar el sufrimiento sino ayudar a la persona a encontrar un sentido en él o a pesar de él. No es resignación — es la comprensión de que el sufrimiento sin sentido es devastador, y el sufrimiento con sentido es soportable y a veces transformador.`,
      closingLine: '',
    },
    fondo: {
      question: '¿Por qué Frankl sigue siendo necesario?',
      text: `Frankl escribió en 1946 desde la experiencia más extrema que el siglo XX produjo. Y sin embargo lo que escribió resuena con una urgencia creciente en el siglo XXI — precisamente porque la era del bienestar material sin precedentes ha producido también tasas récord de depresión, ansiedad, adicción y suicidio, especialmente en los países más ricos del mundo.\n\nLa propuesta de Frankl es incómoda porque va contra la corriente de la cultura terapéutica contemporánea, que tiende a enfocarse en el alivio del sufrimiento. Frankl no estaba en contra del alivio del sufrimiento — era psiquiatra, trataba pacientes en crisis. Pero sostenía que el sufrimiento por sí mismo no es el problema. El problema es el sufrimiento sin sentido. Y que en la búsqueda del sentido a veces hay que atravesar el sufrimiento en lugar de evitarlo.\n\nEsa idea conecta directamente con la [psicología del estoicismo] — con [Marco Aurelio] y [Epicteto], que Frankl leyó — y con la investigación contemporánea sobre resiliencia y [crecimiento postraumático]. Los estudios sobre personas que atravesaron experiencias traumáticas y salieron transformadas muestran consistentemente algo que Frankl ya había descrito: que el crecimiento no viene de la ausencia del sufrimiento sino de la manera en que se procesa.`,
      closingLine: '',
    },
  },

  // ── b4: Psicología cognitiva ──────────────────────────────────────────────────
  {
    id: 'beck',
    name: 'Aaron Beck',
    subtitle: 'No son los hechos los que te hacen sufrir — es lo que crees sobre ellos',
    dates: '1921–2021',
    blockId: 'b4',
    surface: {
      question: '¿Alguna vez cometiste un error y tu mente fue inmediatamente al peor escenario posible — "soy un fracasado", "todo va a salir mal", "nadie me quiere"?',
      text: `Aaron Beck era psicoanalista. Estaba entrenado en la tradición de [Freud], creía en el inconsciente, y trabajaba con pacientes deprimidos tratando de descubrir los conflictos reprimidos que causaban su sufrimiento. Pero en los años sesenta notó algo que no encajaba con la teoría: sus pacientes deprimidos no hablaban principalmente de sueños ni de deseos reprimidos. Hablaban, constantemente, de pensamientos. Pensamientos automáticos, rápidos, casi imperceptibles — pero devastadoramente negativos.\n\nEso cambió todo.`,
      closingLine: '',
    },
    concept: {
      question: '¿Qué propuso Beck sobre la depresión y el sufrimiento psicológico?',
      text: `Desde la perspectiva de Beck, el sufrimiento psicológico — especialmente la depresión y la ansiedad — no está causado principalmente por conflictos inconscientes ni por historias de refuerzos y castigos. Está causado por patrones de pensamiento distorsionados que la persona acepta como verdades sin cuestionarlos.\n\nBeck describió la [tríada cognitiva] de la depresión: visión negativa de uno mismo ("soy inadecuado"), visión negativa del mundo ("el mundo es hostil y no me da lo que necesito") y visión negativa del futuro ("las cosas nunca van a mejorar"). Esos tres patrones se retroalimentan y crean el estado depresivo.\n\nPor debajo de los pensamientos automáticos hay estructuras más profundas que Beck llamó [esquemas cognitivos] — creencias nucleares sobre uno mismo, los demás y el mundo que se forman en la infancia y organizan cómo interpretamos todo lo que nos ocurre. "Soy fundamentalmente defectuoso." "Las personas me van a abandonar." "Tengo que ser perfecto para ser valioso." Un esquema no es un pensamiento ocasional — es una lente que colorea toda la experiencia.\n\nBeck también describió las [distorsiones cognitivas] — errores sistemáticos en el procesamiento de la información que mantienen los esquemas. La [catastrofización]: asumir automáticamente el peor resultado posible. El [pensamiento todo-o-nada]: no hay términos medios, solo el éxito total o el fracaso absoluto. La [personalización]: asumir responsabilidad por todo lo negativo que ocurre. La [lectura de mente]: creer saber lo que los demás piensan sin evidencia.\n\nLa [terapia cognitiva] que Beck desarrolló trabaja con todos esos niveles: identificar los pensamientos automáticos, cuestionarlos con evidencia, descubrir los esquemas subyacentes y modificarlos gradualmente. No diciéndole al paciente que piense positivo — sino enseñándole a examinar sus propios pensamientos como si fueran hipótesis que pueden ponerse a prueba.`,
      closingLine: '',
    },
    fondo: {
      question: '¿Por qué la terapia cognitiva fue una revolución?',
      text: `Beck hizo algo que el psicoanálisis no había logrado y que el conductismo no había intentado: demostrar que un tratamiento psicológico funcionaba. Con estudios controlados, con grupos de comparación, con mediciones antes y después. La terapia cognitiva se convirtió en el primer tratamiento psicológico con evidencia empírica sólida para la depresión — y eventualmente para la ansiedad, el trastorno de pánico, el TOC, los trastornos de personalidad.\n\nEso parece técnico pero tiene consecuencias enormes: legitimó la psicoterapia en un contexto médico que solo confiaba en lo que podía medirse. Y abrió la puerta a décadas de investigación sobre qué funciona, para quién y por qué.\n\nHay algo más profundo en el legado de Beck que raramente se nombra: su propuesta conecta una cadena que va desde [Aristóteles] — las emociones son evaluaciones — hasta los estoicos — el sufrimiento viene de nuestros juicios sobre los hechos, no de los hechos mismos — hasta Beck — los esquemas cognitivos filtran la realidad y pueden cambiarse. Beck no inventó la terapia cognitiva de la nada. Es la destilación de dos mil años de pensamiento sobre la relación entre pensamiento y sufrimiento, con el rigor metodológico que la psicología científica exigía.\n\n[Jeffrey Young] llevará el trabajo de Beck más lejos al proponer que los esquemas más profundos — los que se forman antes de que haya lenguaje para nombrarlos — requieren no solo técnica cognitiva sino trabajo con la relación terapéutica y con las experiencias emocionales tempranas. La [terapia de esquemas] es, en cierta forma, Beck encontrándose con [Winnicott].`,
      closingLine: '',
    },
  },
  {
    id: 'ellis',
    name: 'Albert Ellis',
    subtitle: 'Eres tú quien te hace sufrir — y eso es una buena noticia',
    dates: '1913–2007',
    blockId: 'b4',
    surface: {
      question: '¿Alguna vez te has dicho "debería ser diferente", "no debería pasarme esto", "tengo que conseguirlo sí o sí" — y notaste que esa exigencia te generaba más sufrimiento que la situación misma?',
      text: `Albert Ellis llegó a la misma conclusión que [Beck] por un camino distinto y con un estilo completamente diferente. Mientras Beck era cuidadoso y sistemático, Ellis era directo hasta la provocación. Su terapia tenía un nombre que decía todo: [REBT] — Terapia Racional Emotiva Conductual. Y su mensaje central era tan simple como perturbador: la mayor parte de tu sufrimiento no lo crea la situación — lo crean tus creencias irracionales sobre cómo deberían ser las cosas.`,
      closingLine: '',
    },
    concept: {
      question: '¿Qué propuso Ellis sobre las creencias y el sufrimiento?',
      text: `Desde la perspectiva de Ellis, entre lo que ocurre y cómo te sientes hay siempre una creencia. Y esa creencia puede ser racional — basada en evidencia, flexible, funcional — o irracional — absolutista, dogmática, generadora de sufrimiento innecesario.\n\nEllis describió el [modelo ABC]: A es el acontecimiento activador — lo que ocurre. B son las creencias — lo que piensas sobre lo que ocurre. C son las consecuencias emocionales y conductuales. La psicología popular cree que A causa C directamente. Ellis demostró que es B lo que determina C. El mismo evento puede generar emociones completamente distintas dependiendo de las creencias que se interponen.\n\nLas creencias irracionales tienen una característica central: el musturbation — el término deliberadamente provocador que Ellis usó para referirse a la tendencia a convertir preferencias en exigencias absolutas. "Quiero que me aprueben" es una preferencia sana. "Tengo que recibir aprobación o soy un fracasado" es una exigencia irracional que genera ansiedad crónica. "Prefiero tener éxito" es funcional. "Debo tener éxito o mi vida no tiene valor" es la raíz del perfeccionismo destructivo.\n\nEllis identificó tres grandes [creencias irracionales nucleares]: "Debo actuar bien y obtener aprobación, o soy una persona sin valor." "Los demás deben tratarme bien y justamente, o son personas horribles que merecen ser condenadas." "Las condiciones de vida deben ser agradables y fáciles, o la vida es terrible e insoportable." Esas tres creencias — sobre uno mismo, sobre los demás y sobre el mundo — están, en distintas formas, detrás de casi todo el sufrimiento psicológico innecesario.\n\nLa terapia de Ellis no era suave. Él mismo debatía activamente las creencias irracionales del paciente, a veces con humor, a veces con confrontación directa. Su objetivo no era que el paciente se sintiera comprendido — era que el paciente viera la irracionalidad de sus creencias y las cambiara.`,
      closingLine: '',
    },
    fondo: {
      question: '¿Qué conecta a Ellis con la tradición filosófica y con la psicología contemporánea?',
      text: `Ellis fue uno de los pocos psicólogos que reconoció explícitamente sus deudas filosóficas. La REBT es, declaradamente, estoicismo aplicado. La distinción entre lo que depende de nosotros y lo que no — que [Epicteto] formuló en el siglo I — es el corazón del modelo ABC de Ellis. "Los hombres no son perturbados por las cosas sino por las opiniones que tienen de las cosas" — esa frase, de Epicteto, podría ser el epígrafe de la REBT.\n\nEllis también anticipó algo que las [terapias de tercera ola] desarrollarán más completamente: que el objetivo no es eliminar las emociones negativas sino cambiar la relación con ellas. La ansiedad no es el problema. El problema es creer que la ansiedad es intolerable y que no debe existir. Esa [intolerancia a la incomodidad] — lo que Ellis llamaba low frustration tolerance — es uno de los mantenedores más poderosos del sufrimiento psicológico.\n\nLa diferencia entre Ellis y [Beck] es de énfasis más que de contenido. Beck trabajaba colaborativamente con el paciente para examinar la evidencia de sus pensamientos. Ellis debatía directamente la irracionalidad de las creencias. Beck esperaba que el insight llevara al cambio. Ellis esperaba que el debate intelectual lo produjera más rápidamente. Los dos tenían razón en parte. Y la terapia de tercera generación integró lo mejor de ambos.`,
      closingLine: '',
    },
  },
  {
    id: 'bateson',
    name: 'Gregory Bateson',
    subtitle: 'La mente no está en el cerebro — está en el sistema',
    dates: '1904–1980',
    blockId: 'b4',
    surface: {
      question: '¿Alguna vez notaste que te comportas de manera diferente según con quién estés — como si distintas personas sacaran distintas versiones de ti?',
      text: `Gregory Bateson era antropólogo, biólogo, cibernético y filósofo. Estudió delfines, esquizofrenia, culturas indígenas y comunicación familiar. Y de esa amplitud extraordinaria extrajo una idea que cambió la psicología de maneras que todavía no hemos terminado de procesar: que la mente no está dentro de las personas — está en los patrones de relación entre ellas.\n\nBateson no propuso que los individuos no importen. Propuso que si estudias solo al individuo, inevitablemente pierdes lo más importante.`,
      closingLine: '',
    },
    concept: {
      question: '¿Qué propuso Bateson sobre la mente y los sistemas?',
      text: `Desde la perspectiva de Bateson, la realidad que importa para entender el comportamiento humano no es la realidad de los objetos aislados sino la realidad de los [patrones que conectan]. La mente, el aprendizaje, la patología — todo eso ocurre en las relaciones entre cosas, no en las cosas mismas.\n\nBateson introdujo en la psicología y la psiquiatría el concepto de [doble vínculo] — una situación comunicacional en que una persona recibe dos mensajes contradictorios simultáneamente y no puede salir del sistema. El ejemplo más dramático: una madre que con palabras dice "ven, dame un abrazo" y con el cuerpo comunica rechazo o incomodidad. El hijo no puede satisfacer ambos mensajes simultáneamente, no puede comentar la contradicción, y no puede salir de la relación. Bateson y su equipo propusieron que la exposición crónica al doble vínculo contribuía al desarrollo de la [esquizofrenia].\n\nEsa teoría específica generó mucha controversia y no sobrevivió a la investigación posterior. Pero el concepto de doble vínculo — la trampa comunicacional que paraliza — es clínicamente reconocible en muchos contextos, desde la dinámica familiar hasta las organizaciones.\n\nLo más importante de Bateson no es ninguna teoría específica sino el cambio de perspectiva que propuso: del individuo al sistema, de la causa lineal al patrón circular, del interior de la mente a los espacios entre las mentes. Ese cambio de perspectiva fundó la [terapia sistémica].`,
      closingLine: '',
    },
    fondo: {
      question: '¿Por qué Bateson sigue siendo relevante?',
      text: `El legado de Bateson no está en la psicología clínica académica — donde su nombre aparece raramente — sino en la práctica clínica sistémica, en la ecología, en la teoría de la comunicación y en el pensamiento sobre sistemas complejos.\n\nLo que Bateson aportó que sigue siendo necesario es una epistemología — una manera de conocer — que la psicología dominante todavía no ha incorporado completamente. La psicología científica tiende a estudiar variables aisladas, a buscar causas lineales, a localizar los problemas dentro de individuos. Bateson propuso que esa manera de mirar inevitablemente pierde exactamente lo que más importa: los patrones, los contextos, los sistemas.\n\nEso tiene implicaciones que van más allá de la terapia. Una persona deprimida no es solo alguien con una bioquímica alterada o con pensamientos distorsionados. Es alguien que existe en un sistema familiar, laboral, social y cultural que contribuye a mantener ese estado. Tratarla solo como individuo es, desde la perspectiva de Bateson, perder la mitad del cuadro.`,
      closingLine: '',
    },
  },

  // ── b5: Neurociencia y mente ──────────────────────────────────────────────────
  {
    id: 'damasio',
    name: 'Antonio Damasio',
    subtitle: 'Contenido próximamente',
    dates: '1944–',
    blockId: 'b5',
    surface: { question: '', text: 'Este contenido estará disponible pronto.', closingLine: '' },
    concept: { question: '', text: 'Este contenido estará disponible pronto.', closingLine: '' },
    fondo:   { question: '', text: 'Este contenido estará disponible pronto.', closingLine: '' },
  },
  {
    id: 'kandel',
    name: 'Eric Kandel',
    subtitle: 'Contenido próximamente',
    dates: '1929–',
    blockId: 'b5',
    surface: { question: '', text: 'Este contenido estará disponible pronto.', closingLine: '' },
    concept: { question: '', text: 'Este contenido estará disponible pronto.', closingLine: '' },
    fondo:   { question: '', text: 'Este contenido estará disponible pronto.', closingLine: '' },
  },
  {
    id: 'varela',
    name: 'Francisco Varela',
    subtitle: 'Contenido próximamente',
    dates: '1946–2001',
    blockId: 'b5',
    surface: { question: '', text: 'Este contenido estará disponible pronto.', closingLine: '' },
    concept: { question: '', text: 'Este contenido estará disponible pronto.', closingLine: '' },
    fondo:   { question: '', text: 'Este contenido estará disponible pronto.', closingLine: '' },
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
  { id: 'monismo',         term: 'Monismo de atributos', definition: 'La propuesta de Spinoza: solo existe una sustancia (Dios o Naturaleza) que puede verse desde dos perspectivas — como mente (pensamiento) o como cuerpo (extensión). No son dos cosas distintas sino dos descripciones del mismo evento.', authorId: 'spinoza' },
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
