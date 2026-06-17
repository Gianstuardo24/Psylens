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
    authors: ['heraclito-democrito', 'platon', 'aristoteles', 'helenisticas', 'avicena', 'hipocrates', 'descartes', 'spinoza', 'kant', 'schopenhauer', 'darwin'],
  },
  {
    id: 'b1',
    name: 'Psicología científica',
    era: 'Siglo XIX',
    symbol: 'atom',
    isFree: false,
    authors: ['ebbinghaus', 'fechner', 'wundt', 'james', 'thorndike'],
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

export type QuizQuestion =
  | { type: 'multiple_choice'; question: string; options: string[] }
  | { type: 'true_false'; question: string; correct: boolean; explanation: string }
  | { type: 'open'; question: string };

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
    subBlockId: 'sb-0a',
    surface: {
      question: '¿Alguna vez sentiste que eres una persona distinta a la que eras hace cinco años — pero no sabes exactamente cuándo cambiaste?',
      text: `Esa pregunta tiene más de dos mil quinientos años, y fue formulada por primera vez por uno de los primeros filósofos griegos: Heráclito. Él, observó algo que cualquiera puede ver si se detiene a mirar: el agua que corre en un río se va y no vuelve. La corriente de hoy no es la misma que había ayer, ni será la misma que habrá mañana. Y luego señaló algo que nos toca más de cerca: nosotros somos igual. La persona que eras hace cinco años tomaba decisiones distintas, se asustaba de cosas distintas y quería cosas distintas a las que quieres hoy. No hubo un día en que dejaste de ser esa persona y empezaste a ser esta — fue pasando solo, despacio, sin que nadie lo notara.\n\nY si eso es cierto, entonces surge algo incómodo: ¿qué somos, exactamente, si lo que somos no deja de cambiar?\n\nEsa fue la clase de pregunta que este grupo de filósofos se atrevió a hacer — y hacerla, en su época, no era cosa menor. Durante miles de años, todo lo que no se entendía sobre los seres humanos tenía una sola respuesta: los dioses. Si alguien enloquecía, era posesión divina. Si alguien sufría sin razón aparente, era castigo o destino. No porque la gente fuera ignorante, sino porque no había otra herramienta disponible para explicar lo que no se veía ni se podía tocar.\n\nPero en algún momento, en las costas de lo que hoy es Grecia y Turquía, algunos empezaron a sospechar que podía haber otra forma de buscar. Que las respuestas no tenían que venir de fuera — que podían encontrarse en el mundo mismo, a través del pensamiento y la observación. Que la mente humana no era territorio de los dioses, sino algo que podía entenderse.\n\nNo lo lograron del todo. Pero hicieron algo más importante que resolverlo: instalaron la duda. Y esa duda fue la chispa que encendió todo lo que verás en este recorrido.`,
      closingLine: '',
    },
    concept: {
      question: '¿Y qué encontraron cuando empezaron a buscar?',
      text: `Dos respuestas muy distintas — que, curiosamente, todavía conviven en la psicología de hoy.\n\nHeráclito, propuso que la característica más fundamental de la realidad es el cambio. Nada es fijo, todo pasa, todo se transforma. Y eso incluye a las personas. La identidad no es algo que se tiene, como un objeto guardado en un cajón. Es algo que ocurre, que se va haciendo con cada experiencia, cada pérdida, cada decisión. La persona que a los veinte años reaccionaba con pánico ante cualquier conflicto no es exactamente la misma que a los treinta empieza a encontrar las palabras para decir lo que necesita. No hubo un momento exacto en que eso cambió — fue gradual, casi invisible, como el agua que corre y va desgastando la piedra sin que lo notes hasta que un día la piedra ya no está.\n\nPara Heráclito, incluso las cosas que parecen más estables esconden movimiento debajo. La tensión entre opuestos — el frío y el calor, la vigilia y el sueño, la vida y la muerte — no era una contradicción sino el motor de todo lo que existe. Una llama, por ejemplo, parece quieta — pero en realidad está consumiendo y renovándose sin parar. En el momento en que deja de hacerlo, se apaga. O piénsalo en ti mismo: cuando estás más feliz, estás menos triste — y cuando estás más triste, la felicidad parece lejana. Es como una balanza, o mejor dicho, muchas balanzas calibrándose constantemente. Lo que llamamos estabilidad es eso: el momento en que los lados se compensan, no la ausencia de movimiento. Y lo mismo ocurre con lo que llamamos personalidad, carácter, identidad — no es una esencia fija que llevamos dentro desde siempre, sino un proceso vivo que se va sosteniendo mientras vivimos.\n\nEsa idea va a reaparecer dos mil años después en William James, quien propondrá que la conciencia funciona exactamente así — no como un estado fijo sino como un flujo continuo, como el agua de ese río. Y más tarde también, como en las terapias que se realizan hoy, donde los enfoques que trabajan con el sufrimiento psicológico proponen algo que suena liberador cuando lo entiendes de verdad: no tienes que resolver quién eres para poder actuar. Puedes moverte en la dirección que te importa aunque la respuesta todavía no esté clara.\n\nDemócrito, llegó desde un ángulo completamente distinto. Si Heráclito preguntaba cómo cambiamos, Demócrito preguntaba de qué estamos hechos. Su respuesta fue radical para su época: según él, todo lo que existe en el universo está compuesto de los mismos bloques fundamentales — partículas tan pequeñas que no pueden dividirse más, moviéndose constantemente. El universo entero, desde una montaña hasta un recuerdo, está hecho de lo mismo. Lo que cambia no son los bloques sino cómo están organizados. Los mismos bloques, ordenados de una forma, generan una roca. Ordenados de otra, generan una nube. Ordenados de otra forma distinta, generan la sensación de estar enamorado o estar triste. Para Demócrito, no hay nada sobrenatural en lo que somos — somos la misma materia del universo, organizada de cierta manera.\n\nA esa posición la llamamos materialismo — y aquí la palabra no tiene nada que ver con el dinero o las posesiones. En filosofía, materialismo es la idea de que todo lo que existe, incluyendo lo que sentimos y pensamos, está hecho de materia. Demócrito no tenía microscopios ni laboratorios para probarlo, pero la intuición apuntaba en la dirección correcta. Cuando hoy la neurociencia explica la ansiedad como actividad en ciertas zonas del cerebro, o cuando un médico receta algo para cambiar el estado de ánimo de alguien, está siguiendo la misma lógica que Demócrito formuló hace veinticinco siglos: que si quieres entender lo que sientes, tienes que mirar adentro del cuerpo.`,
      closingLine: 'Dos preguntas distintas sobre lo mismo. Dos caminos que la psicología ha recorrido desde entonces — a veces juntos, a veces en tensión.',
    },
    fondo: {
      question: '¿Por qué seguimos leyendo a personas que pensaron hace veinticinco siglos?',
      text: `No porque sean clásicos que hay que conocer, ni porque hayan tenido todas las respuestas — muchas de sus ideas, con el conocimiento que tenemos hoy, estaban equivocadas en los detalles. La razón es más interesante que eso: formularon las preguntas que todavía no hemos terminado de responder.\n\n¿Somos la misma persona a lo largo del tiempo, o cambiamos tanto que el hecho de creer que somos los mismos es solo una ilusión? ¿Se puede explicar lo que sentimos estudiando la biología del cerebro, o hay algo en lo que vivimos que no tiene una explicación tan lógica o racional? No son preguntas antiguas que la ciencia ya resolvió — son preguntas vivas, que generan debates entre investigadores hoy mismo, y que tienen consecuencias directas sobre cómo entendemos el sufrimiento, el cambio y la identidad. Heráclito y Demócrito no las respondieron, pero fueron los primeros en atreverse a hacerlas — y en su momento, atreverse a hacer esas preguntas en voz alta era un acto de valentía.\n\nHay algo más que vale mencionar, porque suele pasarse por alto. Para entender la mente, alguien tenía que estar dispuesto a mirar adentro del cuerpo — literalmente. Alcmeón de Crotona fue ese alguien. Era médico, contemporáneo de los presocráticos, y se hizo una pregunta que en su época casi nadie se hacía: ¿qué hay dentro, y cómo funciona? Abrió cuerpos, trazó el recorrido de los nervios desde los ojos hacia el interior — y descubrió que esos nervios no terminaban en el corazón. Terminaban en el cerebro. En una época en que el corazón era considerado la sede de todo lo humano — las emociones, el pensamiento, el alma misma — Alcmeón llegó a una conclusión que nadie quería escuchar: el lugar donde ocurre el pensamiento es el cerebro.\n\nNadie le hizo caso. Siglos después, Aristóteles — uno de los filósofos más influyentes de la historia — seguía defendiendo que el corazón era la sede del pensamiento y que el cerebro solo servía para enfriar la sangre. Alcmeón tenía razón y fue ignorado durante generaciones.\n\nLa historia de la psicología está llena de personas que vieron algo verdadero demasiado pronto. Alcmeón fue el primero.`,
      closingLine: '',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Con cuál de estas ideas te identificas más?',
        options: [
          'A) Todo cambia constantemente, incluyendo las personas',
          'B) Todo tiene una explicación física, incluso lo que sentimos',
          'C) Ambas me parecen interesantes',
          'D) Ninguna me convence todavía',
        ],
      },
      {
        type: 'true_false',
        question: 'Heráclito creía que la identidad de una persona es fija e inmutable.',
        correct: false,
        explanation: 'Para Heráclito todo fluye y cambia constantemente, incluyendo las personas.',
      },
      {
        type: 'open',
        question: '¿En qué has cambiado más en los últimos años?',
      },
    ],
  },

  {
    id: 'platon',
    name: 'Platón',
    subtitle: 'El dualismo que llega hasta hoy',
    dates: '428–348 a.C.',
    blockId: 'b0',
    subBlockId: 'sb-0a',
    surface: {
      question: '¿Alguna vez sentiste que una parte de ti quería algo y otra parte lo rechazaba — como si dentro hubiera más de una voz?',
      text: `Esa experiencia tan cotidiana — querer comer algo que sabes que no te conviene, evitar una conversación que sabes que necesitas tener, actuar de una manera mientras una parte de ti observa y no está del todo de acuerdo — Platón la describió hace más de dos mil años con una claridad que todavía sorprende.\n\nPlatón era ateniense y vivió en el siglo IV antes de Cristo. Su maestro fue Sócrates — un filósofo que se había vuelto famoso, y peligroso, por una sola costumbre: recorrer las calles de Atenas y hacerle preguntas incómodas a todo el que se cruzaba con él. Políticos, militares, comerciantes. Les preguntaba si realmente sabían lo que creían saber. La mayoría descubría que no. Eso le ganó admiradores apasionados y enemigos poderosos, y terminó siendo condenado a muerte por "corromper a la juventud." De él, Platón heredó la convicción de que la pregunta más importante que puede hacerse un ser humano es: ¿quién soy? Y pasó su vida entera intentando responderla.\n\nLo que propuso no fue una respuesta sencilla. Fue algo más interesante: que la pregunta misma es complicada porque nosotros somos complicados. Que dentro de cada persona no hay una sola voz sino varias — y que entender cómo se relacionan entre sí es la clave para entenderse a uno mismo.\n\nEsa idea, formulada en Atenas hace veinticuatro siglos, sigue siendo el punto de partida de buena parte de lo que hoy llamamos psicología — el estudio de cómo pensamos, sentimos y actuamos.`,
      closingLine: '',
    },
    concept: {
      question: '¿Y cómo describió Platón esa complejidad interna?',
      text: `Con una imagen que se ha quedado en el pensamiento occidental durante más de dos mil años: el jinete y los dos caballos.\n\nPara Platón, dentro de cada persona conviven tres fuerzas distintas. La primera es la razón — la parte que piensa, delibera y toma decisiones. La segunda es lo que él llamó el espíritu — el coraje, la indignación, el sentido del honor, la capacidad de esforzarse por algo que vale la pena aunque cueste. Y la tercera son los apetitos — el hambre, el deseo, el impulso inmediato, todo lo que quiere satisfacción ahora sin pensar en las consecuencias.\n\nPara explicar cómo se relacionan entre sí, Platón usó la imagen de un jinete con dos caballos. El jinete lleva las riendas y decide hacia dónde va. Uno de los caballos — noble, obediente, fácil de llevar — representa el espíritu y el otro — impetuoso, rebelde, difícil de controlar — representa los apetitos, el deseo. El jinete tiene que manejar a los dos al mismo tiempo para que el carro llegue a algún lugar. Si suelta las riendas, el caballo difícil se lleva todo.\n\nA esa división la llamamos el alma tripartita — la propuesta de que lo que somos está compuesto de tres partes con funciones distintas. Y para Platón, vivir bien — con calma, con dirección, sin que una parte de ti arrase con las demás — era que la razón, es decir el jinete, pudiera guiar a las otras dos sin que el carro se desbocara. No eliminarlas — los caballos también son necesarios. Sino aprender a conducirlos.\n\nLo interesante es que esa estructura que Platón propuso — una parte que piensa, una parte que siente con intensidad y una parte que desea — reaparecerá siglos después en Freud. Freud fue el médico que propuso que dentro de nuestra mente, es decir, en todo lo que pensamos, sentimos, recordamos e imaginamos, hay una parte que no vemos ni controlamos del todo — lo que hoy conocemos como el subconsciente, esa zona donde viven los recuerdos, los miedos y los deseos que no siempre somos capaces de reconocer conscientemente. Y también dividió esa mente en partes que se tensionan entre sí: una que desea, una que controla y una que juzga. Los nombres cambian. La intuición de fondo es la misma que Platón tuvo dos mil años antes.`,
      closingLine: 'Y si alguna vez has sentido que "sabes lo que debes hacer" pero "no puedes evitar" hacer otra cosa — acabas de experimentar exactamente lo que Platón estaba describiendo.',
    },
    fondo: {
      question: '¿Qué queda de Platón en la psicología de hoy?',
      text: `Más de lo que imaginas — y en lugares donde no lo esperarías.\n\nCuando alguien dice "mi cabeza dice una cosa pero mis emociones dicen otra", está usando el vocabulario de Platón sin saberlo. La idea de que hay una parte racional y una parte emocional dentro de nosotros, que a veces cooperan y a veces se contradicen, es tan cotidiana que parece obvia. Pero alguien tuvo que formularla por primera vez. Ese alguien fue Platón.\n\nSu huella llegó hasta hoy por caminos que quizás no imaginas. La estructura que Freud propuso siglos después — esa mente dividida en capas que no siempre se ven ni se controlan — es llamativamente parecida a la de Platón. Y hay algo más cercano todavía. Para Platón, recordemos, la razón era la parte más importante del alma — la que debía guiar a las demás. Esa idea de que el pensamiento tiene un papel central en cómo vivimos y cómo nos sentimos llegó, siglos después, hasta los consultorios de hoy. Hoy existen terapeutas que trabajan específicamente con los pensamientos de sus pacientes — parten de la idea de que si entiendes qué estás pensando en un momento difícil, puedes empezar a entender por qué te sientes como te sientes, y desde ahí, cambiar algo. La forma de trabajarlo es distinta. Pero la convicción de fondo — que la razón puede transformar la experiencia emocional — es la misma que Platón defendió hace veinticuatro siglos.\n\nPero Platón también dejó algo más difícil de resolver: la idea de que el cuerpo y la mente son cosas separadas. Para él, lo que somos de verdad — la razón, el pensamiento, el alma — existía de forma independiente al cuerpo. El cuerpo era casi un obstáculo, como si el alma estuviera atrapada dentro de él — algo que nos arrastra hacia los impulsos y nos aleja de pensar con claridad. Piénsalo así: para Platón, cuando sientes hambre o deseo o miedo, es el cuerpo hablando. Cuando reflexionas, evalúas y decides, es el alma. Y las dos cosas, según él, son fundamentalmente distintas.\n\nEsa separación entre lo físico y lo mental generó un debate que todavía hoy no está completamente cerrado — y que encontrarás de nuevo, con más fuerza, cuando llegues a Descartes.\n\nY mientras Platón construía su mapa del alma, su propio alumno — un joven que aprendió de él durante veinte años y luego se atrevió a contradecirlo — estaba llegando a conclusiones completamente distintas sobre qué somos y de dónde vienen nuestras emociones. Su nombre era Aristóteles. Y su respuesta cambiaría el rumbo de todo.`,
      closingLine: '',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Cuál de estas situaciones reconoces más en ti?',
        options: [
          'A) Saber que debo hacer algo pero no poder evitar hacer lo contrario',
          'B) Sentir que una parte de mí quiere algo y otra parte lo rechaza',
          'C) Actuar por impulso y arrepentirme después',
          'D) Todas me resultan familiares',
        ],
      },
      {
        type: 'true_false',
        question: 'Para Platón, el cuerpo y las emociones eran aliados naturales de la razón.',
        correct: false,
        explanation: 'Para Platón el cuerpo y los apetitos eran obstáculos que la razón debía controlar, no aliados.',
      },
      {
        type: 'open',
        question: '¿En qué área de tu vida sientes más tensión entre lo que quieres y lo que crees que deberías hacer?',
      },
    ],
  },

  {
    id: 'aristoteles',
    name: 'Aristóteles',
    subtitle: 'El alma inseparable del cuerpo',
    dates: '384–322 a.C.',
    blockId: 'b0',
    subBlockId: 'sb-0b',
    surface: {
      question: '¿Alguna vez te dijeron que no debías sentir lo que sentías — que eras demasiado sensible, demasiado intenso, demasiado emocional?',
      text: `Esa idea — que las emociones son un problema, algo que hay que controlar o suprimir — tiene una historia larga. Aristóteles fue uno de los primeros en cuestionarla. Y lo hizo con argumentos.\n\nFue alumno de Platón durante veinte años en la Academia de Atenas — la institución filosófica más influyente de su época. Aprendió de él, lo admiró, y luego hizo algo que requería una valentía particular: contradecirlo. No por rebeldía, sino porque miraba el mundo de una manera fundamentalmente distinta. Donde Platón veía el cuerpo como un obstáculo y las emociones como fuerzas que había que controlar, Aristóteles veía algo más interesante: que las emociones no son el enemigo de la razón. Son parte de lo que nos hace humanos — y usadas bien, son una forma de entender el mundo.\n\nEsa diferencia parece pequeña. No lo es. Cambia completamente cómo te relacionas contigo mismo.`,
      closingLine: '',
    },
    concept: {
      question: '¿Y cómo entendía Aristóteles las emociones?',
      text: `Para Aristóteles, las emociones no son reacciones que simplemente te ocurren, como si fueran interrupciones en el flujo normal de tu vida. Son formas de leer la situación. Cada emoción lleva dentro una interpretación del mundo — una evaluación de lo que está pasando y de lo que significa para ti.\n\nEl miedo, por ejemplo, no aparece al azar. Aparece cuando percibes que algo te amenaza. La tristeza aparece cuando percibes que perdiste algo que tenía valor. La indignación aparece cuando percibes que algo injusto está ocurriendo. En cada caso, la emoción no es solo un estado — es un juicio. Una lectura de la realidad.\n\nY si las emociones son lecturas, entonces pueden ser lecturas más o menos acertadas. El miedo ante un peligro real es información útil — te dice que prestes atención. El miedo ante algo que no representa ningún peligro real es una lectura equivocada — pero sigue siendo una lectura, no un fallo de carácter ni una señal de debilidad.\n\nA esa idea — que lo que sentimos está conectado con lo que pensamos e interpretamos — la llamamos hoy teoría cognitiva de las emociones. Aristóteles no la llamó así, pero fue el primero en formularla con claridad. Y la implicación es muy concreta: si cambias cómo interpretas una situación, puedes cambiar cómo te sientes ante ella.\n\nAristóteles también propuso algo que Platón nunca habría dicho: que el alma y el cuerpo no son dos cosas separadas — son una sola cosa que no funciona sin sus dos partes. Para él, el alma es lo que hace que un cuerpo vivo funcione como tal — igual que las ruedas son lo que hace que un auto sea un auto. Sin ruedas, el auto es solo una carcasa de metal que no va a ningún lado. Y unas ruedas solas tampoco son un auto — son solo ruedas. Los dos se necesitan mutuamente y no pueden entenderse por separado.`,
      closingLine: 'En ese gesto — unir cuerpo y mente en lugar de separarlos — está una de las intuiciones más importantes que la psicología tardó siglos en recuperar.',
    },
    fondo: {
      question: '¿Qué dejó Aristóteles que todavía usamos?',
      text: `Más de lo que cualquier otro filósofo de la Antigüedad. Y en lugares muy distintos.\n\nSu idea de que las emociones son evaluaciones — lecturas de la situación, no simples reacciones — llegó directo hasta el siglo XX. Aaron Beck, un psiquiatra que en los años sesenta desarrolló una de las formas de terapia más estudiadas y practicadas del mundo, partió exactamente de esa intuición: que el sufrimiento psicológico no viene solo de lo que nos pasa, sino de cómo interpretamos lo que nos pasa. Que si alguien te ignora en la calle y concluyes automáticamente "me odia" o "soy invisible", esa conclusión — no el hecho — es lo que produce el malestar. Y que si puedes examinar esa conclusión, cuestionarla, ver si realmente tiene sentido, puedes cambiar cómo te sientes.\n\nAristóteles no tenía ese vocabulario. Pero la lógica es la misma — y la cadena que va desde Atenas en el siglo IV antes de Cristo hasta un consultorio de terapia hoy es más directa de lo que parece.\n\nSu otra gran herencia es metodológica. Aristóteles fue el primero en proponer que para entender algo hay que observarlo sistemáticamente — clasificarlo, describirlo, buscar sus causas. Aplicó eso a los animales, a las plantas, a la política, a la poética. Y también a la mente humana. Esa actitud — que el conocimiento viene de la observación cuidadosa, no solo de la reflexión abstracta — es la que dos mil años después llevaría a Wundt a fundar el primer laboratorio de psicología y a medir, por primera vez, lo que ocurre dentro de la mente.\n\nPara Platón, el mundo que vemos y tocamos no era el mundo real. Las cosas concretas — una silla, un árbol, una persona — eran apenas copias imperfectas de formas perfectas que existían en otro plano, invisible y eterno. Todas las sillas que vemos son intentos de llegar a la silla perfecta. Todos los árboles que vemos son reflejos del árbol perfecto. Esa silla ideal, ese árbol ideal, nunca los vemos ni los tocamos — solo podemos imaginarlos o nombrarlos, porque existen en otro lugar que no es este. Lo ilustró con una imagen que se volvió famosa: el mito de la caverna, donde unos prisioneros confunden las sombras de la pared con la realidad, sin saber que afuera existe un mundo verdadero bajo el sol.\n\nAristóteles miró todo eso y dijo que no. Para él, el conocimiento no venía de contemplar ideas abstractas en un plano superior — venía de observar el mundo concreto con los propios sentidos. Ver, tocar, escuchar, experimentar. Si quieres entender un árbol, estudia árboles reales. Si quieres entender las emociones, observa cómo se comportan las personas reales. En ese gesto — traer la filosofía de vuelta a lo tangible — está el origen de lo que siglos después se convertiría en método científico.\n\nY mientras Aristóteles observaba el mundo con los ojos abiertos, a miles de kilómetros de distancia y varios siglos después, otro pensador haría algo parecido desde una tradición completamente distinta — combinando la filosofía griega con la medicina árabe para producir una síntesis que Europa tardaría siglos en reconocer.`,
      closingLine: '',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Cómo sueles relacionarte con tus emociones?',
        options: [
          'A) Las veo como información útil sobre lo que me pasa',
          'B) Intento controlarlas o ignorarlas',
          'C) Me dejo llevar por ellas sin cuestionarlas',
          'D) Depende mucho de la emoción y el momento',
        ],
      },
      {
        type: 'true_false',
        question: 'Para Aristóteles, las emociones contienen información sobre cómo interpretamos lo que nos pasa.',
        correct: true,
        explanation: 'Cada emoción lleva dentro una lectura de la situación — no son reacciones ciegas sino formas de percibir el mundo.',
      },
      {
        type: 'open',
        question: '¿Hubo alguna vez que una emoción te dio información importante que tu razón no había notado?',
      },
    ],
  },

  {
    id: 'helenisticas',
    name: 'Filosofías Helenísticas',
    subtitle: '¿Puedes elegir cómo te sientes?',
    dates: 'S. III a.C. – s. II d.C.',
    blockId: 'b0',
    subBlockId: 'sb-0b',
    surface: {
      question: '¿Alguna vez alguien te dijo "no dejes que eso te afecte" — y aunque querías, no sabías cómo?',
      text: `Hubo un grupo de filósofos que dedicaron su vida entera a responder exactamente esa pregunta. No desde la teoría — desde la práctica. Lo que les interesaba no era solo entender cómo funciona la mente, sino enseñar a vivir mejor con ella.\n\nLos llamamos filósofos helenísticos — "helenístico" viene de "Hellas", que era el nombre que los griegos le daban a su propio mundo — porque vivieron en el período que siguió a Aristóteles, cuando la cultura griega se había expandido por todo el Mediterráneo y el mundo conocido era mucho más grande y más incierto que antes. Alejandro Magno había conquistado desde Grecia hasta la India, los imperios caían y se levantaban, y las personas necesitaban algo más que teorías abstractas sobre el alma. Necesitaban herramientas para vivir.\n\nTres escuelas respondieron a esa necesidad de maneras muy distintas — y las tres dejaron una huella que llega, de formas sorprendentes, hasta la psicología de hoy.`,
      closingLine: '',
    },
    concept: {
      question: '¿Y qué proponían estas tres escuelas?',
      text: `La primera es el estoicismo. Sus pensadores más conocidos — Epicteto, Marco Aurelio y Séneca — partían de una idea que suena simple pero que tiene consecuencias profundas: hay cosas que dependen de ti y cosas que no. Lo que ocurre afuera — el clima, la opinión de los demás, la enfermedad, la muerte — no depende de ti. Lo que sí depende de ti es cómo lo interpretas y cómo respondes.\n\nPara los estoicos, el sufrimiento no viene directamente de los hechos sino de los juicios que hacemos sobre ellos. Si pierdes tu trabajo y concluyes "soy un fracaso", ese juicio — no el hecho — es lo que produce el malestar. Y ese juicio puede examinarse, cuestionarse, cambiarse. Epicteto, que había sido esclavo, lo decía con una claridad que venía de la experiencia: puedes quitarle a alguien la libertad, pero no puedes quitarle la forma en que elige responder a lo que le ocurre.\n\nEsa idea — que entre lo que pasa y lo que sientes hay siempre una interpretación, y que esa interpretación es donde tienes algo de control — es el fundamento filosófico de buena parte de lo que hoy llamamos psicoterapia. Una de esas formas de trabajo, la terapia cognitiva — que parte de la idea de que cambiar cómo pensamos puede cambiar cómo nos sentimos — la encontrarás más adelante en este recorrido. La cadena que va desde Epicteto hasta un consultorio de terapia hoy tiene más de dos mil años.\n\nLa segunda escuela es el epicureísmo. Epicuro propuso algo que en su época fue malinterpretado — y que todavía hoy se malinterpreta. No era una filosofía del placer desenfrenado, como a veces se cree. Era algo más preciso: que el objetivo de una buena vida es alcanzar un estado de calma y equilibrio, libre de dolor innecesario y de miedo. No la búsqueda de más y más placer, sino la eliminación del sufrimiento que no tiene razón de ser.\n\nEpicuro también fue uno de los primeros en hablar de los vínculos cercanos como fuente de bienestar. Para él, la amistad — las relaciones de confianza, sin interés — era uno de los ingredientes más importantes de una vida que valiera la pena. Esa intuición tiene respaldo en la investigación psicológica de hoy: los estudios más largos sobre bienestar humano coinciden en que la calidad de las relaciones es el predictor más consistente de una vida satisfactoria.\n\nLa tercera escuela es el escepticismo. Los escépticos — liderados por Pirrón de Elis — propusieron algo radicalmente distinto: que sobre la mayoría de las cosas no podemos saber con certeza, y que la paz mental viene de suspender el juicio — es decir, de no apresurarse a concluir nada, de quedarse con la pregunta abierta en lugar de forzar una respuesta que quizás no existe.\n\nVale la pena aclarar algo, porque la palabra "escéptico" hoy se usa de otra manera. Cuando alguien dice "soy escéptico" normalmente quiere decir que duda de todo, que no se cree nada fácilmente. El escepticismo de Pirrón era algo distinto — no era desconfianza activa sino una práctica de soltar la necesidad de tener certeza. No es "no me creo nada" sino "no necesito tener todas las respuestas para vivir tranquilo." Para Pirrón, la fuente de mucho sufrimiento humano era precisamente esa — el empeño en tener todo claro, en saber con seguridad cómo son las cosas, en resolver preguntas que quizás no tienen respuesta. Soltar ese empeño no era rendirse — era liberarse. Y eso, con otro nombre, es algo que las terapias de hoy trabajan activamente: la capacidad de vivir bien en medio de lo que no se sabe, sin que la incertidumbre te paralice.`,
      closingLine: 'Tres respuestas distintas a la misma pregunta: ¿cómo vivir bien en un mundo que no puedes controlar?',
    },
    fondo: {
      question: '¿Por qué estas filosofías siguen siendo relevantes hoy?',
      text: `Porque respondieron una pregunta que la psicología no empezó a estudiar sistemáticamente hasta el siglo XX — y que todavía no ha terminado de responder: ¿qué hace que una vida sea más llevadera?\n\nEl estoicismo es quizás la más visible de las tres en la psicología contemporánea. La terapia cognitivo-conductual — uno de los enfoques terapéuticos más estudiados del mundo, que combina el trabajo con los pensamientos y con los comportamientos para reducir el sufrimiento psicológico — parte de la misma premisa que Epicteto formuló hace dos mil años: que el sufrimiento psicológico está mediado por los pensamientos, y que cambiar los pensamientos puede cambiar cómo nos sentimos. No es una coincidencia — los fundadores de esa terapia citaban explícitamente a los estoicos como una de sus fuentes.\n\nEl epicureísmo anticipa algo que la psicología positiva — el estudio científico de qué hace que las personas sean felices y lleven vidas satisfactorias — confirmó siglos después con investigación: que el placer intenso y efímero contribuye mucho menos a la satisfacción con la vida que las relaciones estables, el sentido de propósito y la ausencia de sufrimiento innecesario. Epicuro lo sabía sin tener datos. Los investigadores de hoy lo tienen con números.\n\nY el escepticismo resuena en algo que las terapias contemporáneas proponen de distintas maneras: que no tienes que resolver todas las preguntas sobre ti mismo para vivir bien. Que sostener la incertidumbre — no saber quién eres del todo, no tener todo bajo control — es una habilidad, no un problema.`,
      closingLine: 'Tres escuelas, tres respuestas, dos mil años de distancia. Y sin embargo, cuando las lees, es difícil no reconocer algo propio en alguna de ellas.',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Cuál de estas ideas te resulta más útil para tu vida?',
        options: [
          'A) Distinguir lo que depende de mí de lo que no',
          'B) Buscar la calma y eliminar el sufrimiento innecesario',
          'C) Soltar la necesidad de tener todas las respuestas',
          'D) Las tres me parecen valiosas',
        ],
      },
      {
        type: 'true_false',
        question: 'Para los estoicos, el sufrimiento viene directamente de los hechos que nos ocurren.',
        correct: false,
        explanation: 'Para los estoicos el sufrimiento viene de cómo interpretamos los hechos, no de los hechos en sí.',
      },
      {
        type: 'open',
        question: '¿Hay algo en tu vida que te genere malestar y que en realidad no depende de ti?',
      },
    ],
  },

  {
    id: 'avicena',
    name: 'Avicena',
    subtitle: 'La mente y el cuerpo como un solo sistema',
    dates: '980–1037 d.C.',
    blockId: 'b0',
    subBlockId: 'sb-0b',
    surface: {
      question: '¿Alguna vez notaste que cuando estás muy estresado tu cuerpo lo acusa — un dolor de cabeza, el estómago apretado, el sueño que no llega? ¿O que cuando te sientes bien físicamente, todo lo demás parece más manejable?',
      text: `Esa conexión entre lo que sientes emocionalmente y lo que ocurre en tu cuerpo no es algo que la medicina moderna descubrió hace poco. Avicena la describió con detalle hace más de mil años.\n\nIbn Sina — conocido en Occidente como Avicena — nació en el año 980 en lo que hoy es la región de Irán y Asia Central. En esa época, esa parte del mundo era el centro intelectual más activo del planeta — una zona donde convivían distintas culturas, religiones y lenguas, y donde el conocimiento se traducía, se debatía y se expandía con una libertad que, en otras partes del mundo, no existía. Avicena creció leyendo a los filósofos y médicos que ya vimos en este recorrido — Aristóteles, Hipócrates, Platón. A los veintiún años ya era médico reconocido. A los treinta, había escrito obras que cambiarían la medicina para siempre.\n\nLo que lo hace relevante para este recorrido no es solo lo que sabía. Es cómo pensaba. Para Avicena, el cuerpo y la mente no eran dos cosas separadas que había que tratar por separado. Eran un sistema — y lo que ocurría en uno afectaba, inevitablemente, al otro.`,
      closingLine: '',
    },
    concept: {
      question: '¿Y cómo lo explicaba?',
      text: `Aristóteles había propuesto que el cuerpo y la mente no podían entenderse por separado. Avicena fue más lejos — tomó esa intuición y la llevó a la práctica médica, no como filosofía, sino como diagnóstico: si un paciente tiene síntomas físicos, pregúntate también qué está viviendo emocionalmente.\n\nAvicena fue uno de los primeros médicos en registrar, con detalle y orden — no como observaciones sueltas, sino como parte de un estudio médico serio — que las emociones tienen efectos físicos medibles. Observó que el miedo sostenido en el tiempo debilitaba el cuerpo, que la tristeza profunda afectaba la digestión y el sueño, y que la alegría, por el contrario, tenía efectos que hoy llamaríamos terapéuticos — es decir, que ayudaban al cuerpo a recuperarse. No lo decía como metáfora — lo decía como diagnóstico médico.\n\nPara ilustrar esa conexión, usó un experimento que se ha vuelto famoso: el pulso del enamorado. Cuenta que un joven llegó a su consulta con síntomas físicos inexplicables — debilidad, pérdida de apetito, insomnio. Avicena le tomó el pulso mientras iba mencionando distintos nombres de personas y lugares. Cuando mencionó el nombre de una mujer en particular, el pulso cambió. Avicena diagnosticó que el origen del malestar físico era emocional — el joven estaba enamorado y no podía decirlo. El cuerpo estaba expresando lo que la mente no podía nombrar.\n\nEse experimento, que hoy parece casi intuitivo, era revolucionario para su época. Estaba diciendo algo que la medicina tardaría siglos en formalizar: que hay síntomas físicos cuyo origen no está en el cuerpo, sino en la experiencia emocional. Lo que hoy llamamos psicosomático — una palabra que combina "psico", de mente, y "somático", de cuerpo, y que describe cómo uno puede afectar al otro — tiene en Avicena uno de sus primeros registros documentados.\n\nSu obra más influyente, el Canon de Medicina, fue el libro de texto médico más utilizado en Europa y otras partes del mundo durante más de seiscientos años. En él dedicó secciones enteras a lo que hoy llamaríamos salud mental — la melancolía, la manía, las perturbaciones del sueño — tratándolas con la misma seriedad que cualquier enfermedad física.`,
      closingLine: 'Para Avicena, no existía una línea clara entre tratar el cuerpo y tratar la mente. Eran, siempre, la misma conversación.',
    },
    fondo: {
      question: '¿Por qué importa alguien que vivió hace mil años en Persia?',
      text: `Porque hizo algo que la medicina tardó siglos en volver a hacer: tomarse en serio la conexión entre lo emocional y lo físico.\n\nDespués de Avicena, esa conexión fue ignorada durante mucho tiempo. La medicina se fue especializando, separando el cuerpo en partes, tratando síntomas físicos con herramientas físicas y dejando lo emocional en manos de la religión o la filosofía. La idea de que el estrés puede causar enfermedades físicas reales, o que trabajar con las emociones puede tener efectos sobre el cuerpo, tardó hasta el siglo XX en volver a tomar fuerza dentro de la medicina.\n\nHoy esa conexión tiene nombre — se llama medicina psicosomática, y es un campo de investigación activo que estudia cómo el estado emocional afecta al sistema inmune, al sistema digestivo, al corazón. Cuando un médico hoy le pregunta a un paciente por su nivel de estrés antes de hacer un diagnóstico, está siguiendo una intuición que Avicena documentó con precisión hace más de mil años.\n\nHay algo más que vale mencionar. Buena parte de las ideas que siglos después permitieron que Europa volviera a estudiar la mente y el cuerpo con rigor llegaron a través de pensadores como Avicena — que las había preservado, traducido y expandido cuando, en otras partes del mundo, simplemente no estaban disponibles. Sin ese puente, el recorrido que estás haciendo en esta app habría tenido un hueco enorme en el medio.`,
      closingLine: '',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Cómo describes mejor tu relación entre mente y cuerpo?',
        options: [
          'A) Cuando algo me preocupa, mi cuerpo lo siente',
          'B) Cuando me siento bien físicamente, todo lo demás mejora',
          'C) No suelo conectar lo que siento con lo que me pasa en el cuerpo',
          'D) Las dos primeras me describen bien',
        ],
      },
      {
        type: 'true_false',
        question: 'Avicena documentó que el estado emocional puede tener efectos físicos reales en el cuerpo.',
        correct: true,
        explanation: 'Fue uno de los primeros en hacerlo con rigor médico, como en el experimento del pulso del enamorado.',
      },
      {
        type: 'open',
        question: '¿Recuerdas algún momento en que tu cuerpo expresó algo que tu mente no había podido nombrar todavía?',
      },
    ],
  },

  {
    id: 'hipocrates',
    name: 'Hipócrates',
    subtitle: 'La primera desacralización',
    dates: '460–370 a.C.',
    blockId: 'b0',
    subBlockId: 'sb-0a',
    surface: {
      question: '¿Alguna vez te preguntaste por qué algunas personas parecen naturalmente ansiosas, otras naturalmente tranquilas — y si eso tiene algo que ver con su cuerpo?',
      text: `Hipócrates era médico en la isla de Cos, en el siglo V antes de Cristo. Y en una época en que la enfermedad — cualquier enfermedad, pero especialmente la mental — se explicaba como castigo divino o posesión sobrenatural, él fue el primero en proponer algo que cambiaría todo: que si alguien sufre, convulsiona, enloquece o cae en una tristeza profunda de la que no puede salir, hay algo en su cuerpo que lo explica. No en los dioses. En el cuerpo.\n\nLo más radical no fue la propuesta en sí — fue lo que implicaba. Si la enfermedad mental tiene causas físicas, entonces no es un castigo. No es una señal de debilidad moral. No es algo que el enfermo merece. Es algo que le ocurre, como le ocurre una fiebre o una fractura. Y si tiene causas, puede estudiarse. Y si puede estudiarse, puede tratarse.\n\nEsa cadena de ideas — que hoy parece obvia — tardó siglos en abrirse camino. Y en su momento, decirla en voz alta podía ser una decisión de vida o muerte.`,
      closingLine: '',
    },
    concept: {
      question: '¿Y cómo explicaba Hipócrates lo que ocurre en la mente?',
      text: `Su respuesta fue el sistema de los cuatro humores — y aunque hoy sabemos que estaba equivocado en los detalles, vale la pena entenderlo porque la lógica detrás era la correcta.\n\nHipócrates, propuso que el cuerpo humano contiene cuatro fluidos fundamentales: la sangre, la flema, la bilis amarilla y la bilis negra. Piénsalo como cuatro ingredientes que todos tenemos, pero en proporciones distintas — y esa proporción es lo que determina cómo somos. Demasiada sangre producía a alguien animado, sociable y optimista. Demasiada flema producía a alguien tranquilo, lento y poco emotivo. Demasiada bilis amarilla producía a alguien irritable e impulsivo, que se enfurecía con facilidad. Y demasiada bilis negra producía a alguien triste, retraído y pesimista.\n\nEs como si la personalidad fuera una receta — y dependiendo de cuánto tienes de cada ingrediente, el resultado es distinto. No era elección ni destino: era biología. Una biología rudimentaria y equivocada en sus mecanismos, pero biología al fin.\n\nLo que sí sobrevivió, y que encontrarás más adelante en este recorrido, es la intuición de fondo: que hay diferencias individuales en cómo las personas sienten y reaccionan, que esas diferencias tienen una base en el cuerpo, y que entenderlas es más útil que juzgarlas.`,
      closingLine: 'Hipócrates no tenía razón en los mecanismos. Pero apuntó en la dirección que la neurociencia tardaría dos mil años en confirmar.',
    },
    fondo: {
      question: '¿Qué queda hoy de alguien que pensó hace veinticinco siglos?',
      text: `Más de lo que parece. Los cuatro humores desaparecieron como teoría médica, pero dejaron algo que no desapareció: la idea de que las personas tienen formas distintas y relativamente estables de sentir y reaccionar, y que esas diferencias merecen ser estudiadas, no ignoradas. Piénsalo así: hay personas que ante una discusión se cierran y necesitan tiempo solas, y hay personas que necesitan hablar de inmediato. Hay personas que en situaciones de presión se activan, y hay personas que se bloquean. Esas diferencias no son caprichos ni debilidades — son patrones. Y la idea de que esos patrones tienen una base en el cuerpo, que no los elegimos del todo, viene directamente de Hipócrates.\n\nPero quizás el legado más importante de Hipócrates no tiene que ver con la medicina — tiene que ver con cómo miramos a las personas que sufren. Durante siglos, y en muchas culturas todavía hoy, la enfermedad mental se vivía como una vergüenza. Algo que esconder. Una señal de que algo estaba mal en esa persona — en su carácter, en su fe, en su voluntad. Hipócrates fue uno de los primeros en decir que no: que si alguien sufre de esa manera, no es porque sea débil ni porque merezca ese sufrimiento. Es porque algo en su cuerpo no está funcionando bien. Y eso cambia todo — porque no es lo mismo decirle a alguien "esto te pasa porque eres así" que decirle "esto te pasa y podemos intentar entender por qué." La primera cierra. La segunda abre.\n\nHay una frase que se le atribuye, sobre la epilepsia — una enfermedad que en su época se consideraba enviada por los dioses — que resume todo esto mejor que cualquier explicación: "De la epilepsia, llaman sagrada a esta enfermedad. Pero a mí no me parece más divina ni más sagrada que las demás." La negativa a aceptar que lo que no se entiende debe explicarse con lo sobrenatural. La insistencia en que hay una causa, aunque todavía no se sepa cuál.\n\nY mientras Hipócrates buscaba las respuestas en el cuerpo, otros pensadores de su misma época las buscaban en todo aquello que ocurre dentro de la mente: los pensamientos, las ideas, los sueños, las imágenes que imaginamos pero que nadie más puede ver ni tocar. Uno de ellos dejaría una huella tan profunda que todavía hoy, sin saberlo, usamos su vocabulario.`,
      closingLine: '',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Alguna vez notaste que lo que sientes emocionalmente afecta cómo te sientes físicamente?',
        options: [
          'A) Sí, cuando estoy estresado mi cuerpo lo acusa',
          'B) Sí, cuando estoy bien emocionalmente me siento más con energía',
          'C) No lo había relacionado hasta ahora',
          'D) Ambas A y B me resuenan',
        ],
      },
      {
        type: 'true_false',
        question: 'Hipócrates propuso que el sufrimiento mental tiene causas físicas observables.',
        correct: true,
        explanation: 'Fue el primero en decir que la enfermedad mental no es castigo divino sino algo que puede estudiarse y tratarse.',
      },
      {
        type: 'open',
        question: '¿Cuándo fue la última vez que tu cuerpo te dio una señal de que algo no estaba bien emocionalmente?',
      },
    ],
  },

  {
    id: 'descartes',
    name: 'René Descartes',
    subtitle: 'El dualismo moderno',
    dates: '1596–1650',
    blockId: 'b0',
    subBlockId: 'sb-0c',
    surface: {
      question: '¿Alguna vez te preguntaste si lo que percibes del mundo es realmente como es — o si podrías estar equivocado en algo tan obvio como que el mundo existe?',
      text: `René Descartes se hizo esa pregunta a un nivel que pocos se han atrevido a igualar. Y lo hizo de una manera muy particular: decidió dudar de absolutamente todo. De sus sentidos, de sus recuerdos, de la existencia del mundo físico. Si había algo de lo que no podía estar completamente seguro, lo ponía en duda. Quería encontrar algo — lo que fuera — de lo que no pudiera dudar.\n\nLo que encontró fue una sola cosa: que estaba dudando. Y si estaba dudando, estaba pensando. Y si estaba pensando, existía. De ahí viene una de las frases más conocidas de la historia del pensamiento: "Pienso, luego existo."\n\nEsa frase parece simple. Pero lo que implicaba era enorme — y sus consecuencias para la psicología llegarían siglos después.`,
      closingLine: '',
    },
    concept: {
      question: '¿Y qué construyó Descartes a partir de esa idea?',
      text: `Si lo único de lo que podía estar seguro era que pensaba, entonces, para Descartes, la mente — el pensamiento — era lo más fundamental que existía. Más seguro que el cuerpo, más seguro que el mundo físico. Podía dudar de que su mano existiera, pero no podía dudar de que estaba dudando.\n\nDe ahí llegó a una conclusión que, según él, tenía consecuencias profundas: la mente y el cuerpo son dos cosas completamente distintas. El cuerpo es materia — ocupa espacio, puede medirse, funciona como una máquina. La mente es pensamiento — no ocupa espacio, no puede medirse de la misma manera, y es de una naturaleza completamente diferente. A esa separación la llamamos dualismo mente-cuerpo — la idea de que somos dos cosas en una: una máquina física y una mente que la habita.\n\nEso generaba un problema que Descartes nunca pudo resolver del todo: si son tan distintas, ¿cómo se comunican? ¿Cómo hace la mente para mover el cuerpo? ¿Cómo hace el cuerpo para afectar a la mente? Descartes propuso que la conexión ocurría en una pequeña glándula en el cerebro — la glándula pineal. Hoy sabemos que eso no era correcto. Pero la pregunta que dejó abierta — cómo se relacionan lo físico y lo mental — sigue siendo uno de los problemas más difíciles de la neurociencia y la filosofía de la mente.\n\nLo que sí hizo su separación fue algo con consecuencias enormes para la medicina: si el cuerpo es una máquina, puede estudiarse como tal. Puede diseccionarse, medirse, repararse. Esa idea abrió la puerta a la medicina científica moderna — la cirugía, la farmacología, la biología. Pero al mismo tiempo, la conexión entre lo emocional y lo físico que Avicena había mantenido abierta quedó en segundo plano — no desapareció, pero durante mucho tiempo la medicina miró hacia otro lado. Y como veremos más adelante, recuperar esa conexión llevaría siglos.`,
      closingLine: 'Con Descartes, el cuerpo y la mente quedaron oficialmente separados. Y la psicología, siglos después, nacería en parte como un intento de volver a unirlos.',
    },
    fondo: {
      question: '¿Por qué importa una separación que hizo un filósofo francés hace cuatrocientos años?',
      text: `Porque esa separación todavía estructura cómo pensamos sobre nosotros mismos — aunque no lo sepamos.\n\nCuando alguien dice "es psicológico, no es real" está usando la lógica de Descartes. Está asumiendo que lo mental y lo físico son dos dominios separados, y que lo mental es de alguna manera menos real o menos importante. Esa idea — que el sufrimiento emocional no es tan serio como el físico, que si no hay un dolor o una enfermedad visible en el cuerpo no hay nada que tratar — viene directamente de la separación que Descartes formalizó.\n\nLa psicología nació, en parte, como respuesta a esa separación entre la mente y el cuerpo. Por ejemplo, más adelante veremos que Wundt, el primer psicólogo experimental, quería demostrar que la mente podía estudiarse con la misma precisión y exactitud que el cuerpo. Freud quería entender lo que ocurría en la mente cuando el cuerpo no encontraba explicación. Y la neurociencia actual trabaja desde hace décadas para mostrar que esa separación nunca fue real — que mente y cuerpo son el mismo sistema visto desde ángulos distintos, exactamente lo que Avicena había propuesto siglos antes.\n\nHay algo más que vale la pena mencionar sobre Descartes. Su método — dudar de todo hasta encontrar algo de lo que no puedas dudar — fue una revolución en la forma de pensar. No aceptar nada por tradición ni por autoridad. Buscar la certeza desde la propia razón. Esa actitud, aplicada no solo a la filosofía sino a la ciencia, cambió el mundo. Y fue uno de los motores que llevó, siglos después, a que alguien se preguntara si la mente podía estudiarse con el mismo rigor que cualquier otra cosa.\n\nY esa pregunta — si la mente puede estudiarse científicamente — la respondería, de maneras muy distintas, un filósofo holandés que vivió casi al mismo tiempo que Descartes, y que llegó a una conclusión completamente opuesta sobre la separación entre cuerpo y mente.`,
      closingLine: '',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Cuándo dudas de algo, qué sueles hacer?',
        options: [
          'A) Busco evidencia hasta estar seguro',
          'B) Confío en mi intuición',
          'C) Pregunto a alguien de confianza',
          'D) Me quedo con la incertidumbre si no hay respuesta clara',
        ],
      },
      {
        type: 'true_false',
        question: 'Para Descartes, el cuerpo y la mente son la misma sustancia vista desde distintos ángulos.',
        correct: false,
        explanation: 'Descartes propuso exactamente lo contrario — que son dos sustancias completamente distintas e independientes.',
      },
      {
        type: 'open',
        question: '¿Hay algo que dabas por cierto y que en algún momento cuestionaste? ¿Qué pasó después?',
      },
    ],
  },

  {
    id: 'spinoza',
    name: 'Baruch Spinoza',
    subtitle: 'El error de Descartes, corregido',
    dates: '1632–1677',
    blockId: 'b0',
    subBlockId: 'sb-0c',
    surface: {
      question: '¿Alguna vez intentaste ignorar lo que sentías — convencerte de que no era para tanto, que debías controlarte — y descubriste que no funcionaba?',
      text: `Spinoza entendía por qué no funcionaba. Y tenía una explicación que va mucho más profundo que "las emociones son difíciles de controlar."\n\nBaruch Spinoza nació en Ámsterdam en 1632, hijo de una familia judía que había huido de la persecución religiosa en Portugal. Creció en una comunidad que valoraba profundamente el estudio y el pensamiento — pero a los veinticuatro años fue expulsado de esa misma comunidad con una de las sanciones más severas que se tienen registro — una expulsión formal y pública que en esa época significaba quedarse sin comunidad, sin red de apoyo, sin pertenencia. Por sostener ideas que sus líderes consideraban inaceptables. Nunca se retractó. Pasó el resto de su vida trabajando solo, puliendo lentes para ganarse la vida, y escribiendo una de las obras filosóficas más ambiciosas de la historia.\n\nLo que propuso fue algo que en su época sonó escandaloso — y que hoy, con el conocimiento que tenemos sobre el cerebro, suena sorprendentemente moderno.`,
      closingLine: '',
    },
    concept: {
      question: '¿Y qué propuso exactamente?',
      text: `Descartes había dicho que la mente y el cuerpo son dos cosas distintas. Spinoza miró eso y dijo que no — que esa separación era una ilusión. Para él, la mente y el cuerpo no son dos sustancias diferentes, sino dos formas de ver lo mismo.\n\nPiénsalo así: cuando sientes vergüenza, tu cara se pone roja, el corazón se acelera, el estómago se aprieta. ¿Cuál es la vergüenza — lo que sientes en la mente o lo que ocurre en el cuerpo? Para Spinoza, no hay dos cosas ahí. Hay una sola cosa que puedes describir de dos maneras distintas — como experiencia mental o como reacción física. Como una canción que puedes escuchar o leer en partitura: es la misma música, vista desde dos ángulos.\n\nLo que eso significaba en la práctica era radical: cada estado mental tiene un reflejo en el cuerpo, y cada estado físico tiene un reflejo en la mente. Cuando sientes miedo, algo ocurre en tu cuerpo. Cuando algo ocurre en tu cuerpo, algo ocurre en tu mente. No son dos eventos separados que se influyen mutuamente — son el mismo evento descrito desde adentro y desde afuera al mismo tiempo.\n\nY eso tenía consecuencias directas sobre las emociones. Para Spinoza, intentar suprimir una emoción con pura fuerza de voluntad — decirte "no debo sentir esto" y esperar que desaparezca — era tan inútil como intentar que tu cuerpo dejara de reaccionar. Asimismo, las emociones no son interrupciones en el pensamiento racional, como si primero sintieras y luego pensaras — dos cosas separadas que se turnan. Son parte del mismo proceso. Y la única forma de transformarlas, según Spinoza, no era suprimirlas, sino entenderlas — ver de dónde vienen, qué las produce, qué interpretación del mundo llevan dentro.\n\nA esa capacidad de entender las propias emociones desde la razón — no para eliminarlas, sino para no ser arrastrado por ellas sin saberlo — Spinoza la llamó libertad. No la libertad de no sentir, sino la libertad de no ser esclavo de lo que sientes sin comprenderlo.`,
      closingLine: 'Y esa distinción — entre sentir y ser arrastrado por lo que sientes — es una de las ideas más útiles que verás en todo este recorrido.',
    },
    fondo: {
      question: '¿Qué dejó Spinoza que todavía importa?',
      text: `Algo que la neurociencia tardó tres siglos en confirmar con datos.\n\nAntonio Damasio — uno de los neurocientíficos más influyentes de las últimas décadas — dedicó buena parte de su carrera a estudiar pacientes con daños en zonas específicas del cerebro. Lo que encontró fue sorprendente: las personas que habían perdido la capacidad de sentir emociones no se volvían más racionales. Se volvían incapaces de tomar decisiones. No porque les faltara inteligencia, sino porque las emociones, según Damasio, son parte esencial del proceso de razonamiento — no un obstáculo para él. Sin emociones, la razón no funciona bien.\n\nEso es exactamente lo que Spinoza había propuesto tres siglos antes: que mente y cuerpo, razón y emoción, no son opuestos sino partes del mismo sistema. Damasio, de hecho, escribió un libro sobre eso — lo tituló El error de Descartes, en referencia directa a la separación que Descartes había establecido y que Spinoza había cuestionado.\n\nHay algo más en Spinoza que resuena con fuerza en la psicología de hoy. Su idea de que la libertad no es no sentir, sino entender lo que sientes, anticipa algo que distintos enfoques terapéuticos trabajan hoy de maneras muy distintas: que el objetivo no es eliminar las emociones difíciles, sino desarrollar una relación distinta con ellas. Verlas, entenderlas, no dejar que operen en la sombra sin que las conozcas.\n\nY mientras Spinoza pulía lentes en Ámsterdam y construía su sistema filosófico en soledad, en otro rincón de Europa un filósofo alemán estaba haciendo una pregunta distinta — no sobre qué son las emociones, sino sobre hasta dónde puede llegar el conocimiento humano. Y su respuesta pondría límites a todo lo que la razón puede saber.`,
      closingLine: '',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Cómo sueles manejar las emociones difíciles?',
        options: [
          'A) Intento entender de dónde vienen antes de reaccionar',
          'B) Las suprimo y sigo adelante',
          'C) Las expreso de inmediato',
          'D) Depende mucho de la situación',
        ],
      },
      {
        type: 'true_false',
        question: 'Para Spinoza, suprimir una emoción con fuerza de voluntad es la mejor forma de transformarla.',
        correct: false,
        explanation: 'Para Spinoza la única forma real de transformar una emoción es entenderla, no suprimirla.',
      },
      {
        type: 'open',
        question: '¿Hay alguna emoción que intentas ignorar pero que sigue apareciendo? ¿Qué crees que te está diciendo?',
      },
    ],
  },

  {
    id: 'kant',
    name: 'Immanuel Kant',
    subtitle: 'La mente que organiza la realidad',
    dates: '1724–1804',
    blockId: 'b0',
    subBlockId: 'sb-0c',
    surface: {
      question: '¿Alguna vez sentiste que por más que intentas entenderte, hay algo en ti que se te escapa — como si siempre hubiera una capa más que no puedes ver del todo?',
      text: `Esa sensación tiene nombre. Y Kant fue el primero en darle una explicación filosófica rigurosa.\n\nImmanuel Kant nació en 1724 en Königsberg, una ciudad en lo que hoy es el norte de Polonia, y vivió ahí casi toda su vida — nunca viajó más de cuarenta kilómetros de su ciudad natal. Pero su mente recorrió territorios que nadie había explorado antes. Era tan puntual en sus paseos diarios que, según cuenta la historia, los vecinos ajustaban sus relojes cuando lo veían pasar. Esa disciplina exterior escondía una de las mentes más radicales de la historia del pensamiento.\n\nLo que propuso no era sobre las emociones ni sobre el cuerpo — era algo más fundamental: una pregunta sobre los límites del conocimiento humano. ¿Hasta dónde puede llegar lo que podemos saber? ¿Y qué pasa con todo lo que queda más allá de esos límites?`,
      closingLine: '',
    },
    concept: {
      question: '¿Y cuáles eran esos límites, según Kant?',
      text: `Antes de Kant, la mayoría de los filósofos asumían que el conocimiento funcionaba de una manera bastante directa: el mundo existe, nosotros lo observamos, y si observamos bien, llegamos a entenderlo como realmente es. Kant miró eso y propuso algo que cambió todo: que eso nunca puede ocurrir.\n\nSu argumento era el siguiente. Todo lo que percibimos — cada color, cada sonido, cada experiencia — pasa primero por nuestra mente antes de que podamos procesarlo. Y nuestra mente no es un espejo pasivo que refleja el mundo tal como es. Es más bien como unas gafas que siempre llevamos puestas — gafas que tienen su propia forma, su propio color, sus propios filtros. Todo lo que vemos, lo vemos a través de ellas. Y nunca podemos quitárnoslas para ver cómo es el mundo sin ellas.\n\nLo que eso significa es profundo: nunca podemos conocer las cosas tal como son en sí mismas, independientemente de nuestra percepción. Solo podemos conocer las cosas tal como nos aparecen — filtradas, organizadas y estructuradas por nuestra propia mente. A la cosa tal como es en sí misma, Kant la llamó el nóumeno — es decir, la realidad que existe más allá de lo que podemos percibir, el mundo como realmente es sin ningún filtro. Piénsalo así: existe una manzana ahí afuera, con todas sus propiedades reales. Pero lo que tú experimentas — su color rojo, su olor dulce, su textura — es lo que tu mente construye a partir de esa manzana. Eso es el fenómeno — no la manzana en sí, sino la manzana tal como te aparece a ti. Y según Kant, nunca puedes ir más allá del fenómeno. La manzana real, el nóumeno, siempre queda fuera de tu alcance.\n\nEso tiene una consecuencia directa sobre el autoconocimiento. Si nunca puedes conocer nada tal como es en sí mismo, eso incluye conocerte a ti mismo. Puedes observar tus pensamientos, tus emociones, tus comportamientos — pero esa observación también pasa por las mismas gafas. Nunca puedes ver tu propia mente desde afuera. Siempre te estás mirando desde adentro.`,
      closingLine: 'Para Kant, conocerse a uno mismo no es un camino que termina en certeza — es un proceso que no tiene un punto final.',
    },
    fondo: {
      question: '¿Por qué importa saber que hay límites en lo que puedes conocer?',
      text: `Porque cambia lo que esperas de ti mismo — y de la psicología.\n\nDurante mucho tiempo, tanto la filosofía como la ciencia asumían que con suficiente esfuerzo y los métodos correctos, podría llegarse a una comprensión completa y objetiva de la mente humana. Kant fue el primero en decir que eso tiene un límite estructural — no por falta de herramientas, sino porque el observador siempre forma parte de lo que observa. No puedes salirte de tu propia mente para verla desde afuera.\n\nEsa idea resuena en la psicología de maneras muy distintas. Cuando un terapeuta hoy le señala a un paciente que su forma de interpretar una situación podría no ser la única posible — que lo que parece obvio e inevitable es en realidad una lectura entre muchas — está aplicando, sin saberlo, una intuición kantiana: que lo que vemos siempre está mediado por cómo estamos configurados para ver.\n\nY hay algo más personal en todo esto. Kant no estaba diciendo que el autoconocimiento es imposible — estaba diciendo que es un proyecto abierto, sin llegada definitiva. Que siempre hay una capa más. Que la persona que crees ser hoy es una interpretación, no la verdad última sobre ti. Y que eso, lejos de ser una limitación frustrante, puede ser algo liberador — porque significa que siempre hay más por descubrir.\n\nY mientras Kant ponía límites a lo que la razón puede conocer, otro filósofo alemán que vivió poco después llegaría a una conclusión todavía más incómoda: que debajo de la razón hay algo más antiguo, más oscuro y más poderoso — algo que nos mueve sin que lo sepamos. Su nombre era Schopenhauer. Y su respuesta anticiparía, con décadas de adelanto, algunas de las ideas más radicales de Freud.`,
      closingLine: '',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Cómo te relacionas con el autoconocimiento?',
        options: [
          'A) Creo que puedo llegar a conocerme completamente si me esfuerzo',
          'B) Siento que siempre hay algo de mí que se me escapa',
          'C) No suelo pensar mucho en eso',
          'D) Me parece un proceso sin fin, y eso me parece bien',
        ],
      },
      {
        type: 'true_false',
        question: 'Para Kant, siempre hay un límite en lo que podemos conocer de la realidad, incluyendo conocernos a nosotros mismos.',
        correct: true,
        explanation: 'Solo conocemos los fenómenos — las cosas tal como aparecen a nuestra mente — nunca la realidad en sí misma.',
      },
      {
        type: 'open',
        question: '¿Hay algo de ti mismo que sientes que todavía no terminas de entender?',
      },
    ],
  },

  {
    id: 'schopenhauer',
    name: 'Arthur Schopenhauer',
    subtitle: 'El inconsciente antes de Freud',
    dates: '1788–1860',
    blockId: 'b0',
    subBlockId: 'sb-0d',
    surface: {
      question: '¿Alguna vez hiciste algo y luego te preguntaste por qué lo hiciste — como si una parte de ti hubiera tomado la decisión antes de que tú lo notaras?',
      text: `Esa experiencia, que a veces incomoda y a veces simplemente desconcierta, fue el punto de partida de uno de los filósofos más influyentes — y más ignorados en vida — de la historia del pensamiento.\n\nArthur Schopenhauer nació en 1788 en Danzig, una ciudad que hoy pertenece a Polonia. Creció en una familia acomodada, viajó por Europa desde joven y tuvo acceso a las mejores universidades de su época. Pero su carácter era difícil — era conocido por su pesimismo, su irritabilidad y su tendencia a entrar en conflicto con casi todo el mundo. Llegó a programar sus clases en la Universidad de Berlín exactamente a la misma hora que Hegel — el filósofo más famoso de la época — con la esperanza de quitarle estudiantes. Sus aulas quedaron vacías. Hegel llenó las suyas.\n\nPasó décadas siendo ignorado. Y en ese tiempo escribió una obra que anticipó, con décadas de adelanto, algunas de las ideas más importantes de la psicología moderna.`,
      closingLine: '',
    },
    concept: {
      question: '¿Y qué propuso Schopenhauer?',
      text: `Kant había dicho que nunca podemos conocer las cosas tal como son en sí mismas — que siempre las vemos a través de los filtros de nuestra mente. Schopenhauer tomó esa idea y fue un paso más lejos. Pensó en algo que cualquiera puede verificar por sí mismo: cuando sientes hambre, no decides sentirla. Cuando te enamoras, no eliges que ocurra. Cuando algo te da miedo, el corazón se acelera antes de que hayas tenido tiempo de pensar. Hay algo que opera dentro de nosotros que no obedece a la razón, que no espera nuestro permiso, que simplemente ocurre. Schopenhauer llamó a esa fuerza la Voluntad — no en el sentido de "fuerza de voluntad" o de tomar decisiones con determinación, sino algo más profundo: un impulso que nos mueve desde adentro, constante e inevitable, sin que lo hayamos elegido.\n\nY ahí estaba el problema. Porque esa Voluntad nunca se satisface del todo. Consigues lo que quieres y aparece un nuevo deseo. El alivio dura poco. Y luego vuelve el impulso. Piénsalo en algo cotidiano: esperas con ansia las vacaciones, llegan, y a los pocos días ya estás pensando en lo que harás cuando vuelvas. La Voluntad no descansa — y eso, para Schopenhauer, era la fuente de buena parte del sufrimiento humano.`,
      closingLine: 'Lo que Schopenhauer estaba describiendo — una fuerza que opera debajo de la conciencia, que nos mueve sin que lo decidamos — era, en esencia, lo que Freud llamaría décadas después el inconsciente.',
    },
    fondo: {
      question: '¿Por qué importa un filósofo pesimista que murió siendo casi desconocido?',
      text: `Porque vio algo real — y lo vio antes que nadie.\n\nLa conexión con Freud no es casual. El propio Freud reconoció que Schopenhauer había llegado a ideas muy similares a las suyas por un camino completamente distinto — no desde la medicina ni desde la observación clínica, sino desde la filosofía pura. La idea de que hay fuerzas que operan debajo de la conciencia, que nos mueven sin que lo sepamos, que el sufrimiento tiene raíces profundas que no siempre podemos ver — todo eso está en Schopenhauer, décadas antes de que Freud lo formulara con vocabulario médico.\n\nPero hay algo más que vale mencionar. Schopenhauer fue uno de los primeros filósofos occidentales en tomar en serio las tradiciones de pensamiento de Asia — el budismo y el hinduismo, en particular. Y encontró en ellas algo que resonaba con su propia visión: la idea de que el sufrimiento viene del deseo, y que la única salida es aprender a soltar ese deseo, a no ser arrastrado por la Voluntad sin saberlo. Esa conexión entre filosofía occidental y tradiciones orientales llegaría, mucho después, hasta las terapias de hoy que trabajan con la aceptación y la atención plena — es decir, la práctica de observar lo que ocurre dentro de uno mismo sin dejarse arrastrar por ello.\n\nSchopenhauer murió en 1860, relativamente solo, después de décadas de ser ignorado. Pero en sus últimos años empezó a ser leído — primero por Freud, luego por Nietzsche, luego por muchos otros. La historia de la psicología está llena de personas que vieron algo verdadero demasiado pronto. Schopenhauer fue una de ellas.\n\nY lo que Schopenhauer vio — esa fuerza que opera debajo de la razón, que nos mueve sin que lo decidamos — encontraría su confirmación más inesperada en un científico que no era filósofo ni médico, sino naturalista. Alguien que observó plantas, animales y fósiles durante décadas, y llegó a una conclusión que cambiaría para siempre cómo nos entendemos a nosotros mismos.`,
      closingLine: '',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Reconoces en ti algún impulso que aparece sin que lo hayas decidido?',
        options: [
          'A) Sí, el deseo de compañía cuando estoy solo',
          'B) Sí, reacciones emocionales que llegan antes que el pensamiento',
          'C) Sí, hábitos que repito aunque quiera cambiarlos',
          'D) Varios de los anteriores me resuenan',
        ],
      },
      {
        type: 'true_false',
        question: 'Para Schopenhauer, la razón es la fuerza más poderosa que nos mueve.',
        correct: false,
        explanation: 'Para Schopenhauer la Voluntad — un impulso irracional e inconsciente — es lo que realmente nos mueve. La razón solo racionaliza después.',
      },
      {
        type: 'open',
        question: '¿Hay algo que repites en tu vida aunque una parte de ti sabe que no te conviene? ¿Qué crees que lo mueve?',
      },
    ],
  },

  {
    id: 'darwin',
    name: 'Charles Darwin',
    subtitle: 'No somos el centro — somos el resultado',
    dates: '1809–1882',
    blockId: 'b0',
    subBlockId: 'sb-0d',
    surface: {
      question: '¿Alguna vez te preguntaste por qué reaccionas de ciertas maneras sin poder evitarlo — por qué el miedo aparece solo, por qué buscas compañía cuando estás mal, por qué ciertas cosas te dan placer sin que hayas decidido que así fuera?',
      text: `Durante miles de años, la respuesta fue que así nos hicieron. Que esas características venían de fuera — de los dioses, de la naturaleza, de algún plan superior. Charles Darwin fue el primero en proponer una explicación completamente distinta: que somos el resultado de un proceso largo, lento y sin dirección — y que ese proceso explica no solo cómo somos físicamente, sino también cómo pensamos, sentimos y nos comportamos.\n\nDarwin nació en 1809 en Shrewsbury, Inglaterra, en el seno de una familia acomodada con tradición científica. De joven no destacaba especialmente — sus profesores lo consideraban un estudiante mediocre. Pero tenía una curiosidad insaciable por el mundo natural. A los veintidós años se embarcó en un viaje que duraría cinco años a bordo del HMS Beagle, recorriendo América del Sur, las islas Galápagos y Australia. Lo que observó en ese viaje — la variedad de especies, las diferencias entre animales de islas cercanas, los fósiles de criaturas extintas — lo llevaría a una conclusión que tardó décadas en atreverse a publicar.\n\nSabía que lo que había descubierto cambiaría todo. Y tenía razón.`,
      closingLine: '',
    },
    concept: {
      question: '¿Y qué propuso exactamente?',
      text: `Darwin propuso que las especies no fueron creadas de manera fija e inmutable. Cambian con el tiempo — y el mecanismo de ese cambio es lo que llamó selección natural.\n\nLa idea funciona así. Dentro de cualquier grupo de animales hay variación — algunos son más rápidos, otros más fuertes, otros tienen un color que los hace menos visibles para los depredadores. Esas diferencias no son elegidas — simplemente ocurren. Pero algunas de esas diferencias ayudan a sobrevivir y a tener descendencia, y otras no. El que corre más rápido escapa del depredador y vive para tener hijos. El que no corre lo suficientemente rápido, no. Con el tiempo — mucho tiempo, miles y millones de generaciones — ese proceso acumula cambios hasta producir algo completamente distinto de lo que había al principio.\n\nLo que eso significaba para los seres humanos era enorme. Si somos el resultado de ese proceso, entonces nuestro cuerpo, nuestro cerebro, nuestras emociones y nuestros comportamientos no son arbitrarios ni fueron diseñados desde fuera. Son soluciones que funcionaron — respuestas que ayudaron a nuestros antepasados a sobrevivir y reproducirse en entornos muy distintos al mundo en que vivimos hoy.\n\nEl miedo, por ejemplo, no es un defecto ni una debilidad. Es una respuesta que durante millones de años ayudó a los seres humanos a detectar peligros y reaccionar rápido. La búsqueda de compañía no es una dependencia — es una necesidad que tiene sentido evolutivo, porque los seres humanos que vivían en grupo sobrevivían mejor que los que vivían solos. El placer que sientes al comer, al conectar con alguien, al lograr algo — todo eso tiene una historia que va mucho más atrás de tu propia vida. Una historia que compartimos, en distintas formas, con el resto de los animales — porque venimos del mismo proceso.`,
      closingLine: 'Para Darwin, entendernos a nosotros mismos requería entender de dónde venimos. Y de dónde venimos es mucho más antiguo de lo que cualquiera había imaginado.',
    },
    fondo: {
      question: '¿Por qué Darwin cierra este bloque?',
      text: `Porque lo que propuso no fue solo una teoría sobre los animales — fue una nueva forma de hacer preguntas sobre la mente humana. Y esa nueva forma de preguntar es exactamente lo que abre el siguiente bloque.\n\nAntes de Darwin, la psicología — en la medida en que existía — preguntaba qué es la mente y cómo funciona. Después de Darwin, apareció una pregunta nueva: ¿para qué sirve? ¿Qué función cumple? ¿Por qué evolucionó de esta manera y no de otra? Esa pregunta transformó todo. William James, el primer gran psicólogo americano que verás al comenzar el Bloque 1, partió directamente de ahí — propuso que la conciencia existe porque es útil, porque ayuda a los organismos a adaptarse. Sin Darwin, esa pregunta no habría tenido sentido.\n\nPero la influencia de Darwin va más lejos todavía. La idea de que tenemos impulsos, emociones y comportamientos que no elegimos conscientemente — que vienen de una historia mucho más larga que nuestra propia vida — es el suelo sobre el que Freud construyó buena parte de su teoría. El inconsciente de Freud no es solo la Voluntad de Schopenhauer con otro nombre. Es también, en parte, la herencia evolutiva de Darwin: todo lo que llevamos dentro sin haberlo decidido.\n\nY hay algo más personal en todo esto. Darwin nos quitó el centro — dejamos de ser una creación especial, separada del resto de la naturaleza. Pero al hacerlo, nos dio algo que quizás vale más: una explicación. No somos como somos por capricho ni por destino. Somos como somos porque eso funcionó — porque hubo un proceso largo que nos fue dando forma. Y entender ese proceso, aunque no lo cambie, cambia cómo nos miramos.`,
      closingLine: 'El Bloque 0 empezó con una pregunta sin respuesta sobrenatural — la de los presocráticos, que se atrevieron a buscar en el mundo lo que antes solo se buscaba en los dioses. Termina con algo todavía más radical: la propuesta de Darwin de que somos naturaleza que se mira a sí misma y se pregunta por qué es como es.',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Cuál de estas ideas cambia algo en cómo te ves a ti mismo?',
        options: [
          'A) Que mis emociones tienen una historia evolutiva larga',
          'B) Que mis reacciones no son caprichosas sino que tuvieron una función',
          'C) Que comparto más con otros animales de lo que creía',
          'D) Todas me hacen pensar diferente',
        ],
      },
      {
        type: 'true_false',
        question: 'Darwin propuso que nuestras emociones tienen raíces compartidas con otros animales.',
        correct: true,
        explanation: 'Las emociones son respuestas evolutivas que compartimos con otras especies porque funcionaron para sobrevivir.',
      },
      {
        type: 'open',
        question: '¿Hay alguna reacción tuya que ahora entiendes mejor sabiendo que tiene una historia evolutiva?',
      },
    ],
  },

  // ── b1: Psicología científica ─────────────────────────────────────────────────
  {
    id: 'ebbinghaus',
    name: 'Hermann Ebbinghaus',
    subtitle: 'Lo que aprendes se olvida — pero no al azar',
    dates: '1850–1909',
    blockId: 'b1',
    subBlockId: 'sb-1a',
    surface: {
      question: '¿Alguna vez estudiaste algo, lo entendiste bien, y días después sentiste que casi no quedaba nada? ¿O notaste que algunas cosas se te quedan grabadas y otras simplemente se van?',
      text: `Eso no es un fallo tuyo. Es el funcionamiento normal de la memoria — y Hermann Ebbinghaus fue el primero en demostrarlo con datos.\n\nEbbinghaus nació en 1850 en Barmen, una ciudad industrial en lo que hoy es el oeste de Alemania. No tuvo un mentor famoso ni trabajó en el laboratorio más conocido de su época. Hizo algo más inusual: en lugar de estudiar a otras personas, se estudió a sí mismo. Durante años, memorizó listas de sílabas sin sentido — combinaciones de letras como "DAX", "BUP", "LOR", palabras inventadas que no significaban nada — y luego midió con precisión cuánto recordaba después de distintos períodos de tiempo. Un día después. Una semana después. Un mes después.\n\nLo que encontró cambió para siempre la forma de entender cómo funciona la memoria.`,
      closingLine: '',
    },
    concept: {
      question: '¿Y qué encontró exactamente?',
      text: `Ebbinghaus descubrió que el olvido no pasa de la misma manera siempre. Para entenderlo, piensa en algo que seguramente te ha pasado: estudias algo para un examen, lo repasas, sientes que lo tienes. Pero si no vuelves a verlo, al día siguiente quizás recuerdas la mayor parte. En tres días, bastante menos. En una semana, mucho menos. En un mes, casi nada. No porque seas malo memorizando — sino porque así le pasa a todo el mundo.\n\nLo que Ebbinghaus descubrió es que ese olvido no ocurre parejo. El primer día es cuando más se va — es ahí donde se pierde la mayor parte. Después, lo que queda se va mucho más lento. Es como cuando terminas de ver una película: justo al salir recuerdas casi todo. Al día siguiente ya hay escenas que no recuerdas bien. Y a la semana siguiente solo quedan las que más te impactaron.\n\nA esa forma en que los recuerdos se van con el tiempo la llamamos la curva del olvido.\n\nY aquí viene lo más útil que encontró: si vuelves a repasar algo después de un día — cuando ya olvidaste algo pero todavía recuerdas bastante — ese recuerdo se vuelve más resistente, es decir, dura más tiempo antes de irse. Como si ese repaso hiciera que la información fuese más duradera en tu memoria. Y si lo repasas de nuevo después de tres días, dura más todavía. Y después de una semana, más. Cada vez que repasas, el recuerdo aguanta más tiempo antes de desvanecerse.\n\nEntonces, en lugar de estudiar todo en una sola noche, lo más eficiente es repasar en momentos separados: hoy, mañana, en tres días, en una semana. No porque estudies más tiempo en total, sino porque cada repaso llega cuando el recuerdo todavía está ahí pero ya está empezando a irse — y ese es exactamente el momento en que repasar hace más efecto. El primer repaso podría ser al día siguiente. El segundo, tres días después. El tercero, una semana después. Cada vez, el intervalo puede ser más largo porque el recuerdo ya es más resistente.\n\nA ese principio lo llamamos repetición espaciada — repasar las cosas en momentos separados, no todas juntas de una vez. Piénsalo así: si tienes que regar una planta, no sirve echarle toda el agua de la semana en un solo día. Necesita agua en el momento justo, en la cantidad justa. La memoria funciona igual.\n\nEbbinghaus también descubrió algo que llamó el efecto de posición serial. Es algo que seguramente ya conoces sin saber que tiene nombre: cuando escuchas una lista de cosas, tiendes a recordar mejor las primeras y las últimas, y a olvidar más fácilmente las del medio. Si alguna vez has notado que recuerdas cómo empieza y cómo termina una canción, pero no tanto lo que hay en la mitad, estás experimentando exactamente eso.`,
      closingLine: 'Lo que Ebbinghaus hizo fue algo que antes nadie había intentado: tratar la memoria como algo que puede medirse — como si fuera una distancia que puede calcularse o un tiempo que puede cronometrarse. Y al medirla, descubrió que tiene patrones propios que se repiten en todas las personas.',
    },
    fondo: {
      question: '¿Por qué importa alguien que memorizó sílabas sin sentido hace más de cien años?',
      text: `Porque lo que encontró sigue siendo la base de casi todo lo que hoy sabemos sobre cómo aprender de manera eficiente.\n\nLa curva del olvido y la repetición espaciada no son solo curiosidades de la historia de la psicología. Son el fundamento de sistemas de estudio que millones de personas usan hoy — desde aplicaciones que te recuerdan repasar el vocabulario de un idioma justo cuando el recuerdo está empezando a irse, hasta métodos usados en escuelas de medicina o derecho, donde hay que aprender grandes cantidades de información. La próxima vez que una app te diga "es momento de repasar esto", está aplicando lo que Ebbinghaus descubrió hace más de cien años.\n\nHay algo más que vale mencionar. Ebbinghaus trabajó solo, sin financiación importante, en una época en que la psicología experimental era todavía un campo recién nacido. La psicología era tan nueva que no había un camino claro — había que construirlo mientras se caminaba. Lo que hoy parece obvio, como diseñar un experimento para medir la memoria, en ese entonces no tenía un modelo o una referencia para poder estudiarlo. Había que inventar la forma de preguntar al mismo tiempo que se buscaba la respuesta.`,
      closingLine: '',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Cómo sueles estudiar o aprender algo nuevo?',
        options: [
          'A) Todo de una vez y espero que se quede',
          'B) En sesiones cortas y distribuidas',
          'C) Repaso varias veces justo antes de necesitarlo',
          'D) Nunca había pensado en cómo lo hago',
        ],
      },
      {
        type: 'true_false',
        question: 'Ebbinghaus descubrió que olvidamos de forma constante y pareja con el tiempo.',
        correct: false,
        explanation: 'El olvido ocurre muy rápido al principio y luego se vuelve más lento — eso es la curva del olvido.',
      },
      {
        type: 'open',
        question: '¿Hay algo que aprendiste hace tiempo y que te sorprende haber olvidado? ¿O algo que recuerdas con mucha claridad sin saber por qué?',
      },
    ],
  },
  {
    id: 'fechner',
    name: 'Gustav Fechner',
    subtitle: 'El hombre que intentó medir el alma',
    dates: '1801–1887',
    blockId: 'b1',
    subBlockId: 'sb-1a',
    surface: {
      question: '¿Alguna vez notaste que no es lo mismo añadir una vela a una habitación completamente oscura que añadirla a una ya iluminada? En la oscuridad, esa vela lo cambia todo. En la luz, casi no se nota.',
      text: `Esa observación tan simple fue el punto de partida de uno de los experimentos más influyentes en la historia de la psicología.\n\nGustav Fechner nació en 1801 en una pequeña ciudad al este de Alemania. Era una persona de intereses muy amplios — físico, filósofo, poeta, y a veces casi un místico, alguien que creía que el mundo tenía una dimensión espiritual que la ciencia todavía no había explorado. Pasó años estudiando la relación entre el mundo físico — todo lo que existe fuera de nosotros y que podemos ver, tocar o medir: el peso de algo que cargas, el volumen de un sonido, la temperatura de algo que tocas — y lo que los seres humanos sienten a partir de ese mundo: qué tan pesado te parece ese objeto, qué tan fuerte ese sonido, qué tan caliente esa superficie.\n\nFechner estaba convencido de que esa relación podía expresarse con números, es decir, que podía decirse con precisión algo como "cuando el peso aumenta en esta cantidad, la persona empieza a notarlo." Imagina que estás cargando un bidón grande de agua — de esos de veinte litros — y alguien le añade un vaso más. Probablemente no notes la diferencia. Pero si tienes una botella pequeña casi vacía y alguien le echa ese mismo vaso, lo notas de inmediato. El vaso es el mismo. Lo que cambia es cuánto ya había. Fechner quería encontrar la fórmula que describiera exactamente cuándo y cuánto notamos esas diferencias — tal como ya existe una fórmula para saber cuánto tiempo tardarás en llegar a algún lugar si sabes la distancia y la velocidad, como lo hace un GPS.\n\nEsa pregunta tenía implicaciones enormes. Porque si lo que notamos y sentimos sigue patrones que pueden medirse, entonces — al menos una parte de lo que ocurre en la mente — también puede medirse.`,
      closingLine: '',
    },
    concept: {
      question: '¿Y cómo intentó medirlo?',
      text: `Fechner partió de algo que otro científico alemán, Ernst Weber, ya había observado: que lo que notamos no depende solo de cuánto cambia algo, sino de cuánto ya había. Weber lo había documentado con pesos y sonidos, pero no había ido más lejos. Fechner vio en esa observación algo más ambicioso: si lo que notamos sigue patrones que se repiten, entonces puede estudiarse con matemáticas. Puede medirse. Y si puede medirse, entonces lo que ocurre dentro de nosotros — lo que vemos, lo que escuchamos, lo que sentimos — no está completamente fuera del alcance de la ciencia.\n\nA ese campo de estudio lo llamó psicofísica — la investigación de cómo lo que ocurre en el mundo físico se convierte en lo que vivimos por dentro. Cómo una vibración en el aire — que es lo que es físicamente un sonido — se convierte en la música que escuchas. Cómo el peso de algo en tu mano se convierte en la sensación de que está pesado o liviano. Es como intentar encontrar la fórmula que conecta lo de afuera con lo de adentro.\n\nPara demostrarlo, diseñó experimentos en los que pedía a personas que compararan cosas — dos pesos, dos luces, dos sonidos — y dijeran cuándo notaban una diferencia. Con esos datos construyó sus leyes — reglas que describían con precisión cuándo y cómo las personas detectan cambios en el mundo que las rodea.`,
      closingLine: 'Lo que Fechner hizo fue abrir una puerta que muchos creían cerrada: la posibilidad de estudiar lo que vivimos y sentimos con los mismos métodos que se usan para estudiar cualquier otra cosa en la naturaleza.',
    },
    fondo: {
      question: '¿Por qué importa alguien que pasó años pidiendo a personas que compararan pesos y luces?',
      text: `Porque demostró que era posible hacer lo que muchos creían imposible: estudiar lo que ocurre dentro de una persona con métodos científicos.\n\nAntes de Fechner, lo que cada uno siente, ve o escucha — esa experiencia íntima y personal — se consideraba algo que no podía medirse. Era demasiado personal, demasiado distinto de persona a persona. Fechner demostró que no — que incluso algo tan personal como lo que notas o dejas de notar sigue patrones que pueden describirse con precisión. Y eso cambió lo que la psicología creía que podía hacer.\n\nSu influencia más directa fue sobre Wilhelm Wundt, quien usó los métodos de Fechner como base para construir el primer laboratorio de psicología experimental del mundo — el primer lugar dedicado exclusivamente a estudiar la mente con experimentos y mediciones, igual que un laboratorio de química estudia las reacciones entre sustancias. Pero su impacto llegó mucho más lejos: el campo que Fechner fundó sigue siendo activo hoy, con aplicaciones en el diseño de pantallas y aplicaciones digitales — cuánto tiene que cambiar algo en una pantalla para que lo notes —, en la audiología — el estudio de la audición y cómo se mide cuándo alguien empieza a perderla —, y en la neurociencia — el estudio de cómo el cerebro recibe y responde a los cambios en el entorno.\n\nHay algo más en Fechner que vale mencionar. Su motivación más profunda no era técnica — era casi filosófica. Quería demostrar que lo que ocurre afuera en el mundo físico y lo que vivimos adentro no son dos mundos separados sin conexión. Que hay un puente entre ellos, y que ese puente puede estudiarse. En ese sentido, Fechner estaba respondiendo, desde la ciencia, a la misma pregunta que Descartes había dejado abierta siglos antes: ¿cómo se relacionan el mundo físico y la experiencia humana?\n\nY mientras Fechner construía sus leyes en el laboratorio, a pocos kilómetros de distancia otro alemán estaba dando el paso siguiente — no solo medir la experiencia, sino fundar el primer lugar del mundo dedicado exclusivamente a estudiar la mente de manera científica.`,
      closingLine: '',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Cuándo prestas más atención a algo?',
        options: [
          'A) Cuando hay un cambio brusco en el ambiente',
          'B) Cuando algo contrasta con lo que esperaba',
          'C) Cuando algo me llama la atención sin saber por qué',
          'D) Me resulta difícil saberlo conscientemente',
        ],
      },
      {
        type: 'true_false',
        question: 'Fechner demostró que lo que notamos depende de cuánto ya había, no solo del cambio en sí.',
        correct: true,
        explanation: 'Un vaso de agua añadido a un bidón no se nota, pero el mismo vaso en una botella casi vacía cambia todo.',
      },
      {
        type: 'open',
        question: '¿Hay algo cotidiano que dejaste de notar con el tiempo porque te acostumbraste?',
      },
    ],
  },
  {
    id: 'wundt',
    name: 'Wilhelm Wundt',
    subtitle: 'El hombre que convirtió la psicología en ciencia',
    dates: '1832–1920',
    blockId: 'b1',
    subBlockId: 'sb-1a',
    surface: {
      question: '¿Alguna vez te preguntaste qué está pasando exactamente dentro de tu cabeza mientras lees esto — qué ocurre para que las palabras tengan sentido, para que algunas te llamen la atención y otras no, para que algunas te hagan sentir algo y otras pasen sin dejar rastro?',
      text: `Wilhelm Wundt fue el primero en decidir que esas preguntas podían responderse de manera sistemática, es decir, siguiendo un método ordenado y repetible, no solo pensando en ellas, sino estudiándolas en un laboratorio.\n\nWundt nació en 1832 en Neckarau, una pequeña localidad al suroeste de Alemania. Estudió medicina, luego filosofía, y pasó años trabajando como asistente de Hermann von Helmholtz — un científico que medía la velocidad a la que los nervios transmiten señales en el cuerpo, algo que en su época parecía tan imposible de medir como medir un pensamiento. De Helmholtz, Wundt aprendió algo que lo marcaría para siempre: que incluso los procesos más rápidos e invisibles del cuerpo podían medirse si se diseñaba el experimento correcto.\n\nEn 1879, en la ciudad de Leipzig, Wundt fundó el primer laboratorio de psicología experimental del mundo. No era un lugar de reflexión filosófica — era un lugar de medición. Un lugar donde se hacían preguntas concretas y se buscaban respuestas concretas. Ese año marca, para muchos historiadores, el nacimiento oficial de la psicología como ciencia.`,
      closingLine: '',
    },
    concept: {
      question: '¿Y qué estudiaba exactamente en ese laboratorio?',
      text: `Wundt quería entender de qué está hecha la experiencia consciente — es decir, todo lo que una persona nota, siente y piensa en un momento dado, es decir, todo lo que experimenta internamente. Para él, la conciencia era como una construcción: algo formado por elementos más simples que se combinan entre sí.\n\nPiénsalo como una canción — lo que escuchas es una sola cosa, pero está hecha de notas individuales, de silencios, de distintos instrumentos que suenan al mismo tiempo. O como un plato de comida: lo que comes es una sola experiencia, pero está hecha de ingredientes distintos — el sabor de la sal, el de la cebolla, el del aceite. Ninguno solo es el plato — pero juntos, combinados de cierta manera, forman exactamente lo que pruebas. Wundt creía que la experiencia humana funcionaba igual: había elementos básicos — sensaciones simples, como un color, un sonido, una temperatura — que se combinaban para formar todo lo que vivimos internamente, es decir, todo lo que sentimos, percibimos y pensamos en cada momento. Y si podía identificar esos elementos y entender cómo se combinan, podría entender cómo funciona la mente.\n\nPara estudiarlos, usó un método que llamó introspección experimental — una palabra que combina "intro", de adentro, y "spección", de mirar o examinar con atención. La idea era pedir a personas entrenadas que observaran y describieran con precisión lo que estaban experimentando en un momento dado. No "me siento bien" o "estoy concentrado" — sino algo mucho más detallado, como "cuando escucho esa melodía, primero me da una sensación de calma, y luego aparece una sensación de tristeza, aunque no sé bien por qué." No lo que ocurre afuera, sino lo que ocurre adentro — y con la mayor precisión posible.\n\nEl problema es que ese método tenía un límite importante: dependía completamente de lo que la persona podía notar y describir sobre sí misma. Y hay muchas cosas que ocurren dentro de nosotros que no notamos, o que notamos pero no podemos describir con palabras. Ese límite sería una de las razones por las que otros psicólogos, que vendrán después en este recorrido, buscarían formas completamente distintas de estudiar la mente.\n\nLo que sí logró Wundt fue demostrar que la mente podía estudiarse con el mismo rigor con que se estudia cualquier otra cosa — con experimentos, con mediciones, con resultados que podían repetirse. Ese gesto, que hoy parece obvio, en su momento fue una revolución.`,
      closingLine: 'Para Wundt, la psicología no era una rama de la filosofía ni de la medicina. Era una ciencia propia. Y ese laboratorio en Leipzig fue su prueba.',
    },
    fondo: {
      question: '¿Qué dejó Wundt que todavía importa?',
      text: `Algo más fundamental que cualquier teoría específica: la idea de que la mente puede y debe estudiarse de manera científica.\n\nAntes de Wundt, la psicología no existía como disciplina independiente. Era parte de la filosofía, o parte de la medicina, o parte de la fisiología — el estudio de cómo funciona el cuerpo. Wundt la separó. Dijo: esto es un campo propio, con sus propias preguntas, sus propios métodos y sus propios laboratorios. Y lo demostró construyendo uno.\n\nSu influencia se extendió rápidamente. Estudiantes de todo el mundo viajaron a Leipzig a aprender sus métodos — entre ellos varios que luego fundaron los primeros laboratorios de psicología en sus propios países. Uno de ellos fue William James, quien llevó esas ideas a Estados Unidos y las transformó en algo completamente distinto. Otro fue G. Stanley Hall, quien fundó la primera revista científica de psicología en América. El laboratorio de Leipzig fue, en ese sentido, algo parecido a una escuela que formó a toda una generación.\n\nPero Wundt también dejó algo sin resolver. Su método de introspección experimental — pedir a las personas que observaran y describieran su propia experiencia — tenía límites claros. No podía usarse con niños, con animales, ni con personas que no podían describir lo que sentían. Y había algo más incómodo todavía: ¿cómo sabes que lo que describes es lo que realmente está pasando dentro de ti? ¿No puede estar tu descripción influida por lo que crees que debería pasar?\n\nEsas preguntas sin respuesta abrieron la puerta a todo lo que vino después — desde el conductismo, que decidió ignorar completamente lo que ocurre dentro de la mente y estudiar solo el comportamiento visible, hasta el psicoanálisis, que propuso que lo más importante de la mente es precisamente lo que no podemos observar ni describir.\n\nY mientras Wundt construía su laboratorio en Leipzig, al otro lado del Atlántico un filósofo y médico americano estaba llegando a conclusiones muy distintas sobre la mente — no como una construcción de piezas, sino como algo vivo, en movimiento constante, imposible de detener para analizar.`,
      closingLine: '',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Qué tan consciente eres de lo que ocurre dentro de ti mientras lo vives?',
        options: [
          'A) Bastante — suelo notar mis emociones y pensamientos en el momento',
          'B) Poco — generalmente lo proceso después',
          'C) Depende mucho del momento y la situación',
          'D) Es algo que me gustaría desarrollar más',
        ],
      },
      {
        type: 'true_false',
        question: 'Wundt creía que la experiencia consciente podía descomponerse en elementos básicos.',
        correct: true,
        explanation: 'Esa era su propuesta central — que la conciencia está formada por elementos simples que se combinan, como los ingredientes de un plato.',
      },
      {
        type: 'open',
        question: '¿Hay alguna experiencia tuya que, al intentar describirla con palabras, sientes que las palabras no alcanzan?',
      },
    ],
  },
  {
    id: 'james',
    name: 'William James',
    subtitle: 'La conciencia no es una cosa — es lo que haces mientras vives',
    dates: '1842–1910',
    blockId: 'b1',
    subBlockId: 'sb-1b',
    surface: {
      question: '¿Alguna vez intentaste dejar de pensar — vaciarte la cabeza por completo — y descubriste que era imposible? Que en el momento en que creías haber llegado al silencio, ya había otro pensamiento entrando.',
      text: `Eso no es un fallo de concentración. Es la naturaleza misma de la mente — y William James fue el primero en describirla con esa claridad.\n\nJames nació en 1842 en Nueva York, en el seno de una familia extraordinaria. Su padre era un filósofo y teólogo conocido en su época, y su hermano Henry James se convertiría en uno de los novelistas más importantes de la literatura americana. William creció rodeado de conversaciones sobre arte, filosofía y ciencia, viajó por Europa desde joven, y estudió medicina en Harvard — aunque nunca ejerció como médico. Lo que le interesaba no era el cuerpo, sino la mente. Y tenía una manera de escribir sobre ella que nadie antes había tenido: con la claridad de un científico y la calidez de alguien que realmente quiere que lo entiendas.\n\nSu obra más importante, los Principios de Psicología, publicada en 1890, tardó doce años en escribirse y cambió para siempre la forma en que la psicología entendía la conciencia.`,
      closingLine: '',
    },
    concept: {
      question: '¿Y qué propuso James sobre cómo funciona la mente?',
      text: `Wundt había propuesto que la conciencia está hecha de piezas — elementos básicos que se combinan entre sí, como los ingredientes de un plato. James miró eso y dijo que no. Para él, intentar detener la conciencia para analizarla en piezas era como intentar agarrar el agua de un río con las manos: en el momento en que crees que la tienes, ya se fue.\n\nPara James, la conciencia no es una construcción de partes separadas. Es un flujo continuo — algo que se mueve sin parar, que nunca se repite exactamente igual, que no tiene principio ni fin claros. A esa idea la llamó la corriente de conciencia, y es una de las imágenes más poderosas que la psicología ha producido. Piénsalo así: ahora mismo, mientras lees esto, no solo estás procesando las palabras. Al mismo tiempo hay una música que quizás escuchas de fondo, una sensación en el cuerpo, un pensamiento que aparece sobre algo que tienes que hacer después, una emoción que no tiene nombre claro. Todo eso ocurre junto, mezclado, sin separaciones claras. Eso es la corriente de conciencia.\n\nJames también propuso algo que venía directamente de Darwin: que la conciencia existe porque es útil. No es un accidente ni un lujo — es una herramienta que los seres humanos desarrollaron porque ayuda a adaptarse, a tomar decisiones, a sobrevivir. Si la conciencia no sirviera para algo, no existiría. A esa forma de entender la mente — preguntando para qué sirve cada proceso mental, no solo qué es — la llamamos funcionalismo, porque se enfoca en la función, en el para qué.`,
      closingLine: 'Y esa pregunta — ¿para qué sirve esto? — cambió completamente la dirección de la psicología americana.',
    },
    fondo: {
      question: '¿Qué dejó James que todavía usamos?',
      text: `Más de lo que parece — y en lugares muy distintos.\n\nLa imagen de la corriente de conciencia llegó mucho más lejos que la psicología. Los novelistas del siglo XX — como Virginia Woolf o James Joyce — la usaron como técnica literaria para escribir desde adentro de la mente de sus personajes, mostrando ese flujo continuo de pensamientos, sensaciones y emociones mezcladas. Y en la psicología, la idea de que la conciencia no puede detenerse ni dividirse en piezas sin perder lo más importante de ella sigue siendo un debate activo.\n\nSu influencia más directa fue sobre cómo se estudia y aplica la mente en la práctica. El funcionalismo que James propuso — esa pregunta de para qué sirven los procesos mentales — se convirtió en el punto de partida de lo que hoy conocemos como la psicología americana, es decir, la tradición de estudio de la mente que se desarrolló en Estados Unidos y que se caracteriza por ser práctica y orientada a resultados concretos. De ahí nacieron campos muy distintos: la psicología educativa, que estudia cómo aprenden mejor las personas en la escuela; la psicología organizacional, que estudia cómo trabajan y toman decisiones los equipos; y la psicología clínica, que busca entender y aliviar el sufrimiento psicológico. Todas parten de la misma pregunta que James instaló: no solo qué es la mente, sino para qué sirve.\n\nHay algo más personal en James que vale mencionar. Sufrió depresiones profundas durante años — períodos en que le costaba levantarse, actuar, encontrar sentido a lo que hacía. Y fue precisamente esa experiencia lo que lo llevó a una de sus ideas más influyentes: que la voluntad — la capacidad de elegir en qué dirección moverse, aunque no tengas ganas — es una de las funciones más importantes de la mente. No porque resolver cómo te sientes sea fácil, sino porque a veces puedes actuar antes de sentirte listo. Esa idea reaparecerá décadas después en las terapias que proponen exactamente eso: que no tienes que resolver cómo te sientes para poder moverte en la dirección que te importa.\n\nY mientras James escribía sobre la mente como un río que no se detiene, en otro rincón del mundo científico alguien estaba llegando a una conclusión opuesta: que lo más importante de la mente no es lo que fluye a la superficie, sino lo que permanece escondido debajo. Su nombre era Freud. Y su respuesta lo cambiaría todo.`,
      closingLine: '',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Cómo describes mejor tu experiencia mental en un día normal?',
        options: [
          'A) Como un flujo continuo donde todo se mezcla',
          'B) Como momentos separados y distintos',
          'C) Como algo difícil de observar mientras ocurre',
          'D) No suelo pensarlo, pero la primera opción me resuena',
        ],
      },
      {
        type: 'true_false',
        question: 'Para William James, la conciencia es un estado fijo que puede analizarse en partes separadas.',
        correct: false,
        explanation: 'James propuso lo contrario — que la conciencia es un flujo continuo que no puede detenerse para analizarse sin perder lo más importante.',
      },
      {
        type: 'open',
        question: '¿Alguna vez intentaste "vaciarte la cabeza" completamente? ¿Qué pasó?',
      },
    ],
  },

  {
    id: 'thorndike',
    name: 'Edward Thorndike',
    subtitle: 'Aprendemos por consecuencias, no por intención',
    dates: '1874–1949',
    blockId: 'b1',
    subBlockId: 'sb-1b',
    surface: {
      question: '¿Alguna vez notaste que cuando algo te sale bien tiendes a repetirlo, y cuando algo te sale mal tiendes a evitarlo — casi sin pensarlo?',
      text: `Eso no es solo sentido común. Es uno de los principios más fundamentales de cómo aprenden todos los seres vivos — y Edward Thorndike fue el primero en demostrarlo con experimentos.\n\nThorndike nació en 1874 en Williamsburg, Massachusetts. Era hijo de un pastor protestante — es decir, un líder religioso de una comunidad cristiana — y creció en un ambiente disciplinado y ordenado. Estudió en Harvard, donde conoció a William James, quien lo animó a seguir investigando algo que en ese momento parecía poco serio como tema científico: cómo aprenden los animales. Thorndike no solo lo tomó en serio — lo convirtió en el centro de su carrera.\n\nLo que hizo fue simple en apariencia pero brillante en su lógica: puso gatos dentro de cajas cerradas con un mecanismo que, si se activaba, abría la puerta. El gato podía escapar y obtener comida. Al principio, el gato se movía al azar dentro de la caja hasta que, por accidente, activaba el mecanismo. Con el tiempo — y con repetición — el gato empezaba a activarlo cada vez más rápido. No porque "entendiera" cómo funcionaba la caja, sino porque la respuesta que había producido un resultado positivo tendía a repetirse.\n\nThorndike llamó a eso el aprendizaje por ensayo y error. Y lo que encontró cambiaría para siempre la forma de entender cómo aprendemos.`,
      closingLine: '',
    },
    concept: {
      question: '¿Y qué propuso exactamente?',
      text: `A partir de sus experimentos, Thorndike formuló algo que llamó la ley del efecto. La idea es directa: cuando una acción produce un resultado satisfactorio — algo bueno, algo que queremos — tendemos a repetirla. Cuando produce un resultado insatisfactorio — algo malo, algo que queremos evitar — tendemos a no repetirla. No hace falta pensarlo conscientemente. No hace falta entender por qué. Simplemente ocurre.\n\nPiénsalo en algo cotidiano: la primera vez que probaste un plato nuevo y te gustó, probablemente lo pediste de nuevo la próxima vez que pudiste. No tomaste una decisión elaborada — simplemente, el resultado positivo hizo que esa acción se quedara. Y si el plato no te gustó, probablemente no lo volviste a pedir. Eso es la ley del efecto en acción.\n\nLo que Thorndike estaba proponiendo era algo importante: que el aprendizaje no requiere comprensión. No necesitas entender por qué algo funciona para aprender a hacerlo. Lo que importa, según él, es la consecuencia — lo que viene después de la acción. Si la consecuencia es positiva, la acción tiende a fortalecerse. Si es negativa, tiende a debilitarse.\n\nEsa idea tenía implicaciones enormes. Si el aprendizaje depende de las consecuencias, entonces puede diseñarse. Puedes crear condiciones en las que ciertas conductas se refuercen y otras no. Puedes, en cierta medida, moldear el comportamiento — de un animal, de una persona, de un estudiante en un aula.`,
      closingLine: 'Lo que Thorndike hizo fue abrir una puerta que la psicología todavía no ha terminado de explorar: la idea de que el comportamiento puede entenderse y modificarse estudiando sus consecuencias.',
    },
    fondo: {
      question: '¿Por qué importa alguien que puso gatos en cajas?',
      text: `Porque lo que encontró en esas cajas sigue explicando una parte enorme de cómo nos comportamos hoy.\n\nLa ley del efecto de Thorndike es el antecedente directo de todo lo que vendría después en el estudio del aprendizaje. Unos años más tarde, un psicólogo llamado B.F. Skinner tomaría esa misma idea y la desarrollaría hasta convertirla en uno de los sistemas más influyentes de la psicología del siglo XX — el condicionamiento operante, es decir, la idea de que el comportamiento está moldeado por sus consecuencias. Sin Thorndike, no habría Skinner. Y sin Skinner, buena parte de lo que hoy sabemos sobre cómo cambiar hábitos, cómo diseñar sistemas de recompensa o cómo estructurar el aprendizaje no existiría de la misma manera.\n\nPero la influencia de Thorndike va más lejos todavía. Sus ideas sobre el aprendizaje llegaron directamente a las aulas — fue uno de los primeros en aplicar los principios del aprendizaje al diseño de la educación, y sus investigaciones influyeron en cómo se estructuran los exámenes, las recompensas en la escuela y la forma en que se enseña. La próxima vez que un profesor elogie un trabajo bien hecho para motivar a un estudiante a seguir esforzándose, está aplicando, sin saberlo, la ley del efecto de Thorndike.\n\nY hay algo más personal en todo esto. La ley del efecto no solo explica cómo aprendemos cosas nuevas — también explica por qué a veces repetimos comportamientos que no nos hacen bien. Si algo produjo un resultado satisfactorio en algún momento — aunque fuera hace mucho tiempo, aunque ya no funcione igual — la tendencia a repetirlo puede persistir. Entender eso no lo resuelve todo, pero cambia cómo te miras a ti mismo cuando te preguntas por qué haces lo que haces.\n\nY mientras Thorndike estudiaba el aprendizaje en animales, otro científico americano estaba llegando a una conclusión todavía más radical: que para entender el comportamiento humano no hacía falta estudiar la mente en absoluto. Solo el comportamiento visible, es decir, lo que una persona hace y dice, lo que puede observarse desde afuera sin necesidad de preguntarle qué siente o qué piensa. Su nombre era Watson — y su propuesta dividiría la psicología en dos.`,
      closingLine: '',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Reconoces en ti algún comportamiento que repites porque en algún momento te dio un buen resultado?',
        options: [
          'A) Sí, claramente',
          'B) Puede ser, aunque no siempre lo noto en el momento',
          'C) Probablemente, pero no lo había pensado así',
          'D) No estoy seguro',
        ],
      },
      {
        type: 'true_false',
        question: 'Según Thorndike, aprendemos principalmente por comprensión consciente de lo que hacemos.',
        correct: false,
        explanation: 'Thorndike mostró que el aprendizaje ocurre por consecuencias — lo que produce un buen resultado tiende a repetirse, sin necesitar comprensión consciente.',
      },
      {
        type: 'open',
        question: '¿Hay algún hábito tuyo que ahora entiendes mejor sabiendo que aprendiste por las consecuencias que tuvo?',
      },
    ],
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
      question: '¿Alguna vez te dijeron que lo que sentías no importaba — que lo que importaba era lo que hacías?',
      text: `John Watson habría estado de acuerdo. Y lo habría dicho con una radicalidad que todavía incomoda.\n\nWatson nació en 1878 en Travelers Rest, una pequeña ciudad de Carolina del Sur. Creció en condiciones difíciles — su padre abandonó a la familia cuando él era adolescente, y tuvo que abrirse camino por su cuenta. Estudió filosofía y psicología, y a los treinta y un años ya era el psicólogo más joven en convertirse en presidente de la Asociación Americana de Psicología — la organización más importante de su campo en Estados Unidos.\n\nEn 1913 publicó un artículo que cambiaría la dirección de la psicología para las siguientes décadas. Su argumento era directo: la psicología no debería estudiar la conciencia, los pensamientos ni las emociones. Esas cosas no pueden observarse desde afuera, no pueden medirse con precisión, y por lo tanto no pueden estudiarse científicamente. Lo único que puede estudiarse de manera rigurosa es el comportamiento visible — lo que una persona hace y dice, lo que puede verse y medirse sin necesidad de preguntarle qué siente o qué piensa.\n\nA esa posición la llamamos conductismo — la idea, según Watson, de que la psicología debe ser la ciencia del comportamiento, no de la mente.`,
      closingLine: '',
    },
    concept: {
      question: '¿Y qué proponía Watson exactamente?',
      text: `Para Watson, todo comportamiento — incluyendo los más complejos, como hablar, razonar o sentir miedo — podía explicarse como una respuesta a estímulos del entorno. Un estímulo es cualquier cosa del mundo exterior que afecta a una persona: un sonido, una imagen, una situación. Y una respuesta es lo que esa persona hace a continuación. Para Watson, la psicología debía estudiar esa relación — estímulo y respuesta — y nada más.\n\nEso lo llevó a uno de los experimentos más famosos y más discutidos de la historia de la psicología: el experimento del pequeño Albert. Watson tomó a un bebé de nueve meses llamado Albert y le mostró una rata blanca. Al principio, Albert no tenía ningún miedo a la rata — la tocaba con curiosidad. Luego, cada vez que Albert tocaba la rata, Watson producía un ruido fuerte y repentino detrás de él — el tipo de ruido que asusta a cualquier bebé. Después de repetir esto varias veces, Albert empezó a llorar con solo ver la rata, aunque no hubiera ningún ruido. Había aprendido a tener miedo de algo que antes no le generaba ninguna reacción.\n\nLo que Watson estaba demostrando, según él, era que las emociones — incluso el miedo — no son algo misterioso que viene de adentro. Son respuestas aprendidas. Y si pueden aprenderse, también pueden desaprenderse.\n\nEse experimento tiene una historia complicada. Hoy se considera éticamente inaceptable — no está bien generar miedo en un bebé para probar una teoría, y Watson nunca eliminó el miedo que había condicionado en Albert. Pero en su época fue influyente, y sus conclusiones — que el comportamiento puede moldearse a través de la experiencia — siguieron siendo relevantes mucho después.`,
      closingLine: 'Para Watson, entender a una persona no requería preguntarle qué sentía. Requería observar qué hacía.',
    },
    fondo: {
      question: '¿Por qué importa alguien que propuso ignorar completamente lo que ocurre dentro de la mente?',
      text: `Porque su propuesta, aunque extrema, tenía algo real en su base — y forzó a la psicología a hacerse preguntas que todavía no ha terminado de responder.\n\nWatson tenía razón en algo: la introspección de Wundt tenía límites serios. Pedirle a alguien que describiera lo que estaba experimentando dependía completamente de su capacidad y disposición para hacerlo — y eso no es siempre confiable. Watson propuso una alternativa radical: si no puedes observarlo desde afuera, no lo estudies. Eso hizo que la psicología se volviera más precisa en algunas áreas — más medible, más verificable, más parecida a lo que entendemos como ciencia.\n\nPero también dejó fuera cosas enormes. Si solo estudias lo que se puede ver desde afuera, ¿cómo explicas por qué dos personas en la misma situación reaccionan de manera completamente distinta? ¿Cómo explicas un sueño, un recuerdo, una decisión que alguien toma sin saber bien por qué? Watson no tenía respuesta para eso — y tampoco le interesaba buscarla.\n\nSu legado llegó principalmente a través de otro psicólogo que vendría muy poco después: B.F. Skinner, quien tomó las ideas de Watson y las desarrolló con una precisión y una amplitud que nadie antes había logrado. Pero el conductismo también generó una reacción — psicólogos que decían que estudiar solo el comportamiento visible era como intentar entender una ciudad mirando únicamente sus calles, sin saber nada de las personas que las recorren. Esa reacción abriría una de las transformaciones más importantes de la historia de la psicología.`,
      closingLine: '',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Crees que el comportamiento de las personas se puede entender sin conocer lo que sienten por dentro?',
        options: [
          'A) No, lo interno es fundamental para entender a alguien',
          'B) A veces sí — las acciones dicen mucho más que las palabras',
          'C) Depende de la situación',
          'D) Es una pregunta que me genera dudas',
        ],
      },
      {
        type: 'true_false',
        question: 'Watson demostró que los miedos pueden aprenderse a través de la experiencia.',
        correct: true,
        explanation: 'El experimento del pequeño Albert mostró que un miedo puede condicionarse — y por lo tanto también puede desaprenderse.',
      },
      {
        type: 'open',
        question: '¿Tienes algún miedo o reacción automática que crees que aprendiste en algún momento de tu vida?',
      },
    ],
  },
  {
    id: 'skinner',
    name: 'B. F. Skinner',
    subtitle: 'El entorno lo hace todo — o casi todo',
    dates: '1904–1990',
    blockId: 'b3',
    surface: {
      question: '¿Alguna vez intentaste cambiar un hábito — comer mejor, hacer ejercicio, dejar de procrastinar — y descubriste que saber que deberías hacerlo no era suficiente para hacerlo?',
      text: `B.F. Skinner tenía una explicación para eso. Y era más incómoda de lo que parece.\n\nBurrhus Frederic Skinner nació en 1904 en Susquehanna, una pequeña ciudad de Pensilvania. De joven quiso ser escritor — pasó un año intentándolo y llegó a la conclusión de que no tenía nada importante que decir. Entonces descubrió la psicología, y en particular las ideas de Watson y Thorndike, y encontró algo que le parecía mucho más interesante que escribir novelas: entender por qué las personas hacen lo que hacen.\n\nLo que construyó a partir de esa pregunta se convirtió en uno de los sistemas más completos y más influyentes de toda la historia de la psicología. Y también en uno de los más debatidos.`,
      closingLine: '',
    },
    concept: {
      question: '¿Y qué propuso Skinner?',
      text: `Skinner partió de donde Thorndike había llegado: que el comportamiento está moldeado por sus consecuencias. Pero fue mucho más lejos. Para Skinner, no solo los animales aprenden así — las personas también. Y no solo en situaciones de laboratorio — en absolutamente todo lo que hacen.\n\nPara estudiar eso, diseñó lo que hoy se conoce como la caja de Skinner — una caja donde un animal, generalmente una rata o una paloma, podía presionar una palanca o picar un botón. Dependiendo de lo que hiciera, recibía comida o recibía una pequeña descarga eléctrica. Con esos experimentos, Skinner estudió con una precisión que nadie había logrado antes cómo las consecuencias moldean el comportamiento.\n\nLo que encontró lo organizó en un sistema que llamó condicionamiento operante. Según él, hay cuatro maneras en que las consecuencias moldean el comportamiento. La primera es el refuerzo positivo — cuando una acción produce algo bueno, esa acción tiende a repetirse. Si cada vez que estudias una hora te sientes bien después, es más probable que lo vuelvas a hacer. La segunda es el refuerzo negativo — cuando una acción hace que algo malo desaparezca, también tiende a repetirse. Tomas un medicamento y el dolor de cabeza se va, y aprendes a tomarlo cada vez que te duela. La tercera es el castigo positivo — cuando una acción produce algo malo, tiende a no repetirse. Tocas una superficie muy caliente y te quemas, y aprendes a no tocarla. Y la cuarta es el castigo negativo — cuando una acción hace que algo bueno desaparezca, tampoco se repite. Llegas tarde a casa y te quitan el teléfono, y es menos probable que llegues tarde de nuevo.\n\nPara Skinner, eso no era solo una observación interesante. Era la explicación de prácticamente todo el comportamiento humano. Los hábitos que tienes, las cosas que evitas, la forma en que reaccionas en distintas situaciones — todo eso, según él, es el resultado de un historial de consecuencias que has experimentado a lo largo de tu vida. Muchas de ellas sin haberlas elegido conscientemente.`,
      closingLine: 'Lo que Skinner proponía era radical: que la sensación de elegir libremente lo que hacemos es, en gran medida, una ilusión. Lo que llamamos elección es, según él, el resultado de un largo historial de refuerzos y castigos que nos fue dando forma.',
    },
    fondo: {
      question: '¿Por qué importa alguien que estudió ratas en cajas?',
      text: `Porque lo que encontró en esas cajas sigue explicando una parte enorme de cómo funcionamos — y de cómo se intenta cambiar el comportamiento humano hoy.\n\nEl condicionamiento operante de Skinner tiene aplicaciones en lugares muy distintos. En educación, el sistema de recompensas que usan muchas escuelas — estrellas, puntos, elogios por trabajo bien hecho — viene directamente de sus ideas. En el diseño de aplicaciones y videojuegos, los sistemas de puntos, niveles y recompensas que te mantienen enganchado están construidos sobre los mismos principios que Skinner estudió en su laboratorio. En terapia, hay enfoques que usan el refuerzo positivo para ayudar a personas a cambiar comportamientos que les generan sufrimiento — desde fobias hasta adicciones.\n\nPero Skinner también dejó algo sin resolver — y fue una de las críticas más fuertes que recibió. Si el comportamiento es simplemente el resultado de consecuencias externas, ¿dónde queda lo que ocurre dentro de la persona? ¿Los pensamientos, las emociones, las creencias, los valores? Skinner decía que esas cosas también son comportamientos moldeados por consecuencias. Muchos psicólogos no estuvieron de acuerdo — y esa discusión abrió la puerta a todo lo que vino después.\n\nPorque justamente en el momento en que el conductismo — la tradición que Watson y Skinner representaban — parecía dominar completamente la psicología, algo estaba cambiando. Psicólogos que no podían ignorar lo que ocurre dentro de la mente empezaron a construir nuevas formas de estudiarla. No observando solo el comportamiento visible, sino preguntando qué piensa, qué recuerda, qué interpreta la persona que se comporta de cierta manera.\n\nEse giro — que se conoce como la revolución cognitiva, es decir, el momento en que la psicología volvió a poner la mente en el centro — es lo que abre el siguiente bloque.`,
      closingLine: '',
    },
    quiz: [
      {
        type: 'multiple_choice',
        question: '¿Qué te resulta más efectivo para cambiar un hábito?',
        options: [
          'A) Recompensarme cuando lo hago bien',
          'B) Castigarme o restringirme cuando fallo',
          'C) Entender por qué lo hago',
          'D) Una combinación de entender y recompensar',
        ],
      },
      {
        type: 'true_false',
        question: 'Para Skinner, la sensación de elegir libremente lo que hacemos refleja nuestra verdadera autonomía.',
        correct: false,
        explanation: 'Para Skinner lo que llamamos elección libre es en gran medida el resultado de un historial de refuerzos y castigos que nos fue dando forma.',
      },
      {
        type: 'open',
        question: '¿Hay algún comportamiento tuyo que ahora entiendes mejor como el resultado de consecuencias pasadas?',
      },
    ],
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

export const subBlocks = [
  { id: 'sb-0a', blockId: 'b0', name: '¿Qué somos si no somos dioses?',                         authorIds: ['heraclito-democrito', 'hipocrates', 'platon'] },
  { id: 'sb-0b', blockId: 'b0', name: 'La mente tiene partes — y no siempre se ponen de acuerdo', authorIds: ['aristoteles', 'helenisticas', 'avicena'] },
  { id: 'sb-0c', blockId: 'b0', name: 'Pensar no es suficiente para entenderse',                  authorIds: ['descartes', 'spinoza', 'kant'] },
  { id: 'sb-0d', blockId: 'b0', name: 'Algo nos mueve antes de que lo decidamos',                 authorIds: ['schopenhauer', 'darwin'] },
  { id: 'sb-1a', blockId: 'b1', name: 'Por primera vez, la mente entra al laboratorio',           authorIds: ['ebbinghaus', 'fechner', 'wundt'] },
  { id: 'sb-1b', blockId: 'b1', name: 'Si no puedes verlo, no puedes estudiarlo',                 authorIds: ['james', 'thorndike', 'watson', 'skinner'] },
];

export const revolutionCards = [
  {
    id: 'rev-0a',
    name: '¿Qué somos si no somos dioses?',
    subtitle: 'Introducción al sub-bloque',
    dates: '',
    blockId: 'b0',
    subBlockId: 'sb-0a',
    type: 'revolution' as const,
    surface: {
      question: '',
      text: 'Durante miles de años, las preguntas más importantes sobre los seres humanos tenían una sola dirección: hacia afuera. Hacia los dioses, hacia lo sobrenatural. Lo que estás a punto de ver es el momento en que eso cambió — un grupo de pensadores decidió buscar las respuestas en el cuerpo, en la naturaleza, en el pensamiento mismo.',
      closingLine: '',
    },
    concept: {
      question: '',
      text: 'Tres pensadores, desde ángulos muy distintos, instalaron la misma pregunta: ¿puede entenderse la mente humana sin recurrir a lo sobrenatural?\n\nEl primero preguntó si somos los mismos a lo largo del tiempo. El segundo propuso que el sufrimiento mental no es castigo divino sino enfermedad. El tercero intentó mapear las distintas fuerzas que conviven dentro de cada persona.\n\nNinguno de los tres tenía las herramientas para probar lo que proponía. Pero cada uno dejó una pregunta que los siguientes dos mil años de pensamiento no han terminado de responder.',
      closingLine: '',
    },
  },
  {
    id: 'rev-0b',
    name: 'La mente tiene partes — y no siempre se ponen de acuerdo',
    subtitle: 'Introducción al sub-bloque',
    dates: '',
    blockId: 'b0',
    subBlockId: 'sb-0b',
    type: 'revolution' as const,
    surface: {
      question: '',
      text: 'Hay preguntas que no se resuelven mirando afuera — sino mirando adentro. Si la mente puede entenderse sin recurrir a los dioses, la siguiente pregunta es: ¿cómo está organizada por dentro? ¿Tiene partes? ¿Se puede elegir cómo sentirse, o las emociones simplemente ocurren?',
      closingLine: '',
    },
    concept: {
      question: '',
      text: 'Los tres pensadores que vienen a continuación llegaron a respuestas muy distintas — y las tres siguen resonando hoy.\n\nEl primero propuso que las emociones no son interrupciones ni obstáculos: son información. El segundo dijo que cuerpo y mente no son dos cosas separadas sino una sola. El tercero llevó esa idea a la práctica médica, documentando que lo que sentimos emocionalmente tiene efectos físicos reales.\n\nLo que los tres construyeron juntos es algo que la psicología tardó siglos en recuperar: la idea de que para entender a una persona hay que mirarla completa.',
      closingLine: '',
    },
  },
  {
    id: 'rev-0c',
    name: 'Pensar no es suficiente para entenderse',
    subtitle: 'Introducción al sub-bloque',
    dates: '',
    blockId: 'b0',
    subBlockId: 'sb-0c',
    type: 'revolution' as const,
    surface: {
      question: '',
      text: 'Durante siglos, la razón fue la herramienta más confiable para entender la mente humana. Si razonabas bien, si observabas con cuidado, podías llegar a entender la mente humana. Esa confianza en la razón fue el motor de todo lo que viste antes. Lo que estás a punto de ver es el momento en que esa confianza empezó a fisurarse.',
      closingLine: '',
    },
    concept: {
      question: '',
      text: 'El primero decidió dudar de absolutamente todo — y lo que encontró fue una separación radical entre la mente y el cuerpo que todavía hoy estructura cómo pensamos sobre nosotros mismos.\n\nEl segundo miró esa separación y dijo que no. Que mente y cuerpo son lo mismo visto desde dos ángulos distintos. Que intentar suprimir una emoción con pura fuerza de voluntad es tan inútil como pedirle al cuerpo que deje de reaccionar.\n\nEl tercero fue más lejos todavía: propuso que hay un límite en lo que la razón puede conocer — incluido conocerse a uno mismo. Que la persona que crees ser hoy es una interpretación, no la verdad última sobre ti.',
      closingLine: '',
    },
  },
  {
    id: 'rev-0d',
    name: 'Algo nos mueve antes de que lo decidamos',
    subtitle: 'Introducción al sub-bloque',
    dates: '',
    blockId: 'b0',
    subBlockId: 'sb-0d',
    type: 'revolution' as const,
    surface: {
      question: '',
      text: 'Hay algo en nosotros que actúa antes de que lo decidamos — antes de que lo pensemos, antes de que lo notemos. ¿Hay algo que nos mueve antes de que pensemos, antes de que decidamos, antes de que lo notemos?\n\nLos dos pensadores que cierran este recorrido filosófico respondieron que sí — desde lugares completamente distintos.',
      closingLine: '',
    },
    concept: {
      question: '',
      text: 'El primero propuso que debajo de todo lo que razonamos hay una fuerza que no elegimos ni controlamos: un impulso constante que nos mueve hacia el deseo y que nunca se satisface del todo. No lo llamó inconsciente. Pero Freud, décadas después, reconoció que había llegado exactamente ahí.\n\nEl segundo llegó desde un camino completamente distinto. Observando animales y fósiles durante años, propuso que nuestras emociones, nuestros instintos y nuestros comportamientos no son arbitrarios — son respuestas que funcionaron.\n\nJuntos construyen el puente más importante de este recorrido: el que va desde la filosofía hasta la ciencia.',
      closingLine: '',
    },
  },
  {
    id: 'rev-1a',
    name: 'Por primera vez, la mente entra al laboratorio',
    subtitle: 'Introducción al sub-bloque',
    dates: '',
    blockId: 'b1',
    subBlockId: 'sb-1a',
    type: 'revolution' as const,
    surface: {
      question: '',
      text: 'Durante más de dos mil años, las preguntas sobre la mente humana vinieron de la filosofía. Nadie había medido cuánto tarda la mente en reaccionar ante algo. Nadie había registrado con precisión cuánto recuerda una persona después de un día o una semana. Nadie había intentado poner un número a la intensidad de lo que sentimos. Eso estaba a punto de cambiar.',
      closingLine: '',
    },
    concept: {
      question: '',
      text: 'Lo que hace especial este momento en la historia no es solo que aparecieron nuevas respuestas. Es que cambió la forma de buscarlas.\n\nHasta aquí, una idea valía por su coherencia y la autoridad de quien la propuso. A partir de aquí, una idea vale si puede ponerse a prueba. Si puede medirse, repetirse, verificarse.\n\nDarwin había propuesto que somos parte de la naturaleza. Lo que viene a continuación recoge esa idea y va un paso más lejos: si somos parte de la naturaleza, entonces la mente también puede estudiarse como cualquier otra cosa natural. Con observación. Con medición. Con evidencia.',
      closingLine: '',
    },
  },
  {
    id: 'rev-1b',
    name: 'Si no puedes verlo, no puedes estudiarlo',
    subtitle: 'Introducción al sub-bloque',
    dates: '',
    blockId: 'b1',
    subBlockId: 'sb-1b',
    type: 'revolution' as const,
    surface: {
      question: '',
      text: 'Medir la mente era un avance enorme. Pero medirla requería pedirle a las personas que describieran lo que sentían por dentro — y nadie podía verificar si lo que describían era real.\n\nEsa pregunta — ¿para qué sirve la mente? — cambió todo lo que vino después.',
      closingLine: '',
    },
    concept: {
      question: '',
      text: 'Lo que viene a continuación, a través de cuatro pensadores, es la lógica del conductismo — la propuesta de que la psicología debe estudiar únicamente lo que puede verse y medirse desde afuera: el comportamiento.\n\nEl primero demostró que el aprendizaje ocurre por consecuencias, no por comprensión. El segundo radicalizó esa idea: propuso que todo lo que no puede observarse — los pensamientos, las emociones, la conciencia — no debería estudiarse en absoluto. El tercero construyó el sistema más completo de todos.\n\nEl conductismo dominó la psicología durante décadas. Sus ideas siguen activas hoy — en cómo se diseñan apps y sistemas de aprendizaje.',
      closingLine: '',
    },
  },
];

export const glossaryTerms = [
  // ── INTRO ────────────────────────────────────────────────────────────────────
  // intro-1
  { id: 'mesopotamia',               term: 'Mesopotamia',                definition: 'Región histórica ubicada entre los ríos Tigris y Éufrates, en lo que hoy es Irak, donde surgieron algunas de las primeras civilizaciones del mundo. Del griego "mesos" (entre) y "potamos" (río) — "tierra entre ríos".',                                                                              authorId: 'intro-1' },
  { id: 'psicoterapia',              term: 'psicoterapia',               definition: 'Tratamiento del sufrimiento psicológico a través del diálogo con un profesional entrenado para ayudar a entender y transformar lo que ocurre en la mente. Del griego "psyché" (alma, mente) y "therapeia" (cuidado, tratamiento).',                                                                     authorId: 'intro-1' },
  { id: 'terapeutica',               term: 'terapéutica',                definition: 'Todo lo relacionado con el tratamiento o cuidado de una enfermedad o malestar. Del griego "therapeutikos", relativo al cuidado.',                                                                                                                                                                        authorId: 'intro-1' },
  // intro-2
  { id: 'psicologia',                term: 'psicología',                 definition: 'Estudio sistemático de la experiencia y el comportamiento humano — cómo percibimos, pensamos, sentimos y actuamos. Del griego "psyché" (alma, mente) y "logos" (estudio, discurso).',                                                                                                                    authorId: 'intro-2' },
  { id: 'psiquiatria',               term: 'psiquiatría',                definition: 'Rama de la medicina que se especializa en el diagnóstico y tratamiento de trastornos mentales, a menudo con medicamentos. Se diferencia de la psicología en que un psiquiatra es médico. Del griego "psyché" (alma, mente) e "iatreia" (curación).',                                                    authorId: 'intro-2' },
  { id: 'sistematico',               term: 'sistemático',                definition: 'Que sigue un método ordenado y organizado, no al azar ni de forma improvisada. Del griego "systema", conjunto organizado de partes.',                                                                                                                                                                    authorId: 'intro-2' },
  { id: 'neurociencia',              term: 'neurociencia',               definition: 'Campo que estudia el sistema nervioso, especialmente el cerebro, y cómo da lugar a los pensamientos, emociones y comportamientos. Del griego "neuron" (nervio) y el latín "scientia" (conocimiento).',                                                                                                   authorId: 'intro-2' },
  { id: 'marco-conceptual',          term: 'marco',                      definition: 'En este contexto, una forma organizada de entender algo — un conjunto de ideas que te ayuda a interpretar la realidad desde un ángulo particular.',                                                                                                                                                      authorId: 'intro-2' },
  // intro-3
  { id: 'psicoterapia-contemporanea', term: 'psicoterapia contemporánea', definition: 'Las formas actuales de tratamiento psicológico, desarrolladas principalmente durante el siglo XX y XXI, que suelen basarse en evidencia científica.',                                                                                                                                                   authorId: 'intro-3' },
  { id: 'estoicismo',                term: 'estoicos',                   definition: 'Escuela filosófica griega y romana que enseñaba que el sufrimiento no viene de los hechos sino de cómo los interpretamos, y que la única cosa que controlamos de verdad es nuestra propia reacción. Del griego "stoa" (pórtico), por el lugar donde sus fundadores enseñaban en Atenas.',              authorId: 'intro-3' },
  { id: 'cronologico',               term: 'cronológico',                definition: 'Que sigue el orden en que ocurrieron los hechos en el tiempo. Del griego "chronos" (tiempo) y "logos" (estudio).',                                                                                                                                                                                      authorId: 'intro-3' },
  { id: 'filosofico',                term: 'filosófico',                 definition: 'Relativo a la filosofía — el estudio reflexivo y racional de preguntas fundamentales sobre la existencia, el conocimiento y los valores. Del griego "philos" (amor) y "sophia" (sabiduría) — "amor a la sabiduría".',                                                                                   authorId: 'intro-3' },
  // intro-4
  { id: 'mecanismo',                 term: 'mecanismo',                  definition: 'La forma en que algo funciona internamente — el "cómo" detrás de un proceso o fenómeno. Del griego "mechané", máquina o artificio.',                                                                                                                                                                    authorId: 'intro-4' },
  { id: 'precision',                 term: 'precisión',                  definition: 'Exactitud y detalle en la forma de describir o entender algo. Del latín "praecisus", cortado con exactitud.',                                                                                                                                                                                           authorId: 'intro-4' },
  // ── BLOQUE 0 ─────────────────────────────────────────────────────────────────
  // rev-0a
  { id: 'sobrenatural',              term: 'sobrenatural',               definition: 'Que está por encima o más allá de las leyes de la naturaleza — relacionado con dioses, espíritus o fuerzas que no pueden explicarse con la razón o la ciencia. Del latín "super" (sobre) y "natura" (naturaleza).',                                                                                    authorId: 'rev-0a' },
  // heraclito-democrito
  { id: 'materialismo',              term: 'materialismo',               definition: 'En filosofía, la idea de que todo lo que existe — incluyendo lo que pensamos y sentimos — está hecho de materia física, sin necesidad de nada sobrenatural. Del latín "materia".',                                                                                                                       authorId: 'heraclito-democrito' },
  { id: 'intuicion',                 term: 'intuición',                  definition: 'Comprensión inmediata de algo, sin necesidad de razonamiento paso a paso. Del latín "intueri", mirar hacia adentro o contemplar.',                                                                                                                                                                      authorId: 'heraclito-democrito' },
  // hipocrates
  { id: 'humores',                   term: 'humores',                    definition: 'En la medicina antigua, los cuatro fluidos que se creía componían el cuerpo humano (sangre, flema, bilis amarilla y bilis negra) y que determinaban el carácter y la salud de una persona.',                                                                                                            authorId: 'hipocrates' },
  { id: 'bilis',                     term: 'bilis',                      definition: 'Fluido producido por el hígado; en la medicina antigua, dos de los cuatro humores corporales (amarilla y negra) llevaban este nombre. Del latín "bilis".',                                                                                                                                               authorId: 'hipocrates' },
  { id: 'rudimentaria',              term: 'rudimentaria',               definition: 'Básica, poco desarrollada o en una etapa inicial. Del latín "rudimentum", primer ensayo o comienzo.',                                                                                                                                                                                                   authorId: 'hipocrates' },
  // platon
  { id: 'alma-tripartita',           term: 'alma tripartita',            definition: 'La idea de Platón de que el alma humana está compuesta de tres partes distintas: la razón, el espíritu y los apetitos.',                                                                                                                                                                                authorId: 'platon' },
  { id: 'subconsciente',             term: 'subconsciente',              definition: 'La parte de la mente que opera sin que seamos plenamente conscientes de ella, pero que influye en lo que pensamos, sentimos y hacemos. Del latín "sub-" (debajo) y "conscius" (consciente).',                                                                                                           authorId: 'platon' },
  { id: 'apetitos',                  term: 'apetitos',                   definition: 'En el sentido filosófico que usa Platón, los deseos e impulsos básicos del cuerpo — hambre, sed, deseo sexual — no solo el apetito por comida.',                                                                                                                                                        authorId: 'platon' },
  // rev-0b
  { id: 'informacion-emocional',     term: 'información',                definition: 'En el sentido que le da este texto, las emociones funcionan como datos que nos dicen algo sobre lo que está ocurriendo, no como simples reacciones sin sentido.',                                                                                                                                        authorId: 'rev-0b' },
  // aristoteles
  { id: 'metodo-cientifico',         term: 'método científico',          definition: 'Forma sistemática de investigar basada en la observación directa de la realidad, en lugar de solo razonar de forma abstracta.',                                                                                                                                                                         authorId: 'aristoteles' },
  { id: 'tangible',                  term: 'tangible',                   definition: 'Que puede tocarse o percibirse claramente; lo opuesto a lo abstracto o puramente teórico. Del latín "tangere", tocar.',                                                                                                                                                                                 authorId: 'aristoteles' },
  { id: 'empirico',                  term: 'empírico',                   definition: 'Basado en la observación y la experiencia directa, no solo en el razonamiento o la teoría. Del griego "empeiria", experiencia.',                                                                                                                                                                        authorId: 'aristoteles' },
  // helenisticas
  { id: 'helenistico',               term: 'helenístico',                definition: 'Relativo al período histórico posterior a Alejandro Magno, cuando la cultura griega se expandió por todo el Mediterráneo. De "Hellas", nombre que los griegos daban a su propio territorio.',                                                                                                           authorId: 'helenisticas' },
  { id: 'epicureismo',               term: 'epicureísmo',                definition: 'Escuela filosófica fundada por Epicuro que proponía que una buena vida consiste en alcanzar calma y equilibrio, evitando el dolor innecesario, no en la búsqueda desenfrenada de placer.',                                                                                                              authorId: 'helenisticas' },
  { id: 'escepticismo',              term: 'escepticismo',               definition: 'Escuela filosófica que proponía que sobre la mayoría de las cosas no podemos tener certeza absoluta, y que la paz mental viene de no apresurarse a concluir nada. Del griego "skepsis", examen o duda cuidadosa.',                                                                                      authorId: 'helenisticas' },
  { id: 'terapia-cognitivo-conductual', term: 'terapia cognitivo-conductual', definition: 'Enfoque terapéutico que trabaja con los pensamientos y los comportamientos de una persona para reducir el sufrimiento psicológico. Uno de los métodos más estudiados y respaldados por evidencia.',                                                                                                  authorId: 'helenisticas' },
  { id: 'predictor',                 term: 'predictor',                  definition: 'Algo que permite anticipar o prever un resultado. Del latín "praedicere", decir de antemano.',                                                                                                                                                                                                          authorId: 'helenisticas' },
  // avicena
  { id: 'psicosomatico',             term: 'psicosomático',              definition: 'Que tiene origen emocional o mental pero se manifiesta con síntomas físicos en el cuerpo. Del griego "psyché" (mente) y "soma" (cuerpo).',                                                                                                                                                              authorId: 'avicena' },
  { id: 'melancolia',                term: 'melancolía',                 definition: 'Estado de tristeza profunda y persistente; término histórico relacionado con lo que hoy podríamos llamar depresión. Del griego "melas" (negro) y "chole" (bilis) — "bilis negra".',                                                                                                                     authorId: 'avicena' },
  { id: 'mania',                     term: 'manía',                      definition: 'Estado de actividad mental y física excesiva, con energía y euforia fuera de lo común. Del griego "mania", locura o frenesí.',                                                                                                                                                                          authorId: 'avicena' },
  { id: 'diagnostico',               term: 'diagnóstico',                definition: 'Identificación de una enfermedad o problema a partir de sus síntomas. Del griego "diagnosis", distinguir o discernir.',                                                                                                                                                                                 authorId: 'avicena' },
  // rev-0c
  { id: 'radical',                   term: 'radical',                    definition: 'Que va a la raíz o al fondo de algo; un cambio profundo y fundamental. Del latín "radix", raíz.',                                                                                                                                                                                                       authorId: 'rev-0c' },
  { id: 'fisurarse',                 term: 'fisurarse',                  definition: 'Agrietarse o debilitarse; en este contexto, empezar a perder solidez una idea o creencia. Del latín "fissura", grieta.',                                                                                                                                                                                authorId: 'rev-0c' },
  // descartes
  { id: 'dualismo-mente-cuerpo',     term: 'dualismo mente-cuerpo',      definition: 'La idea de que la mente y el cuerpo son dos sustancias completamente distintas — una física y otra pensante — propuesta por Descartes.',                                                                                                                                                                 authorId: 'descartes' },
  { id: 'glandula-pineal',           term: 'glándula pineal',            definition: 'Pequeña glándula en el cerebro; Descartes creía erróneamente que era el punto de conexión entre la mente y el cuerpo.',                                                                                                                                                                                 authorId: 'descartes' },
  { id: 'farmacologia',              term: 'farmacología',               definition: 'Estudio de los medicamentos y cómo afectan al cuerpo. Del griego "pharmakon" (medicina, droga) y "logos" (estudio).',                                                                                                                                                                                   authorId: 'descartes' },
  // spinoza
  { id: 'sustancia-filosofica',      term: 'sustancia',                  definition: 'En filosofía, lo que existe por sí mismo sin depender de otra cosa; Descartes proponía que la mente y el cuerpo eran dos sustancias distintas.',                                                                                                                                                        authorId: 'spinoza' },
  { id: 'libertad-spinoza',          term: 'libertad',                   definition: 'Para Spinoza, no significa no sentir emociones, sino entenderlas tan bien que dejas de ser arrastrado por ellas sin saberlo.',                                                                                                                                                                          authorId: 'spinoza' },
  // kant
  { id: 'noumeno',                   term: 'nóumeno',                    definition: 'Según Kant, la realidad tal como es en sí misma, independiente de cómo la percibimos — algo que nunca podemos conocer directamente. Del griego "noumenon", lo pensado.',                                                                                                                                authorId: 'kant' },
  { id: 'fenomeno',                  term: 'fenómeno',                   definition: 'Según Kant, la forma en que algo nos aparece a través de nuestra percepción, filtrada por nuestra mente — lo único que realmente podemos conocer. Del griego "phainomenon", lo que se muestra o aparece.',                                                                                               authorId: 'kant' },
  { id: 'autoconocimiento',          term: 'autoconocimiento',           definition: 'El proceso de entender quién eres, cómo piensas y por qué sientes lo que sientes.',                                                                                                                                                                                                                    authorId: 'kant' },
  // rev-0d
  { id: 'inconsciente',              term: 'inconsciente',               definition: 'Parte de la mente que opera fuera de nuestra conciencia, pero que influye en lo que pensamos, sentimos y hacemos. Del latín "in-" (no) y "conscius" (consciente).',                                                                                                                                     authorId: 'rev-0d' },
  { id: 'instinto',                  term: 'instinto',                   definition: 'Impulso o comportamiento natural que no requiere aprendizaje ni razonamiento consciente. Del latín "instinctus", impulso.',                                                                                                                                                                              authorId: 'rev-0d' },
  // schopenhauer
  { id: 'voluntad-schopenhauer',     term: 'Voluntad',                   definition: 'Para Schopenhauer, una fuerza interna que nos mueve constantemente hacia el deseo, sin que la elijamos ni podamos controlarla del todo.',                                                                                                                                                               authorId: 'schopenhauer' },
  // darwin
  { id: 'seleccion-natural',         term: 'selección natural',          definition: 'Mecanismo propuesto por Darwin por el cual las características que ayudan a sobrevivir y reproducirse tienden a mantenerse en una especie a lo largo del tiempo.',                                                                                                                                      authorId: 'darwin' },
  // ── BLOQUE 1 ─────────────────────────────────────────────────────────────────
  // rev-1a
  { id: 'ciencia-experimental',      term: 'ciencia experimental',       definition: 'Forma de hacer ciencia basada en experimentos controlados, mediciones y resultados que pueden repetirse y verificarse, no solo en el razonamiento.',                                                                                                                                                     authorId: 'rev-1a' },
  // ebbinghaus
  { id: 'curva-del-olvido',          term: 'curva del olvido',           definition: 'Patrón descubierto por Ebbinghaus que describe cómo olvidamos la mayor parte de lo aprendido rápidamente al principio, y luego de forma cada vez más lenta.',                                                                                                                                          authorId: 'ebbinghaus' },
  { id: 'repeticion-espaciada',      term: 'repetición espaciada',       definition: 'Técnica de estudio que consiste en repasar la información en intervalos de tiempo cada vez más largos, en lugar de estudiar todo de una sola vez.',                                                                                                                                                     authorId: 'ebbinghaus' },
  { id: 'efecto-posicion-serial',    term: 'efecto de posición serial',  definition: 'Tendencia a recordar mejor el principio y el final de una lista de elementos, y a olvidar más fácilmente los del medio.',                                                                                                                                                                              authorId: 'ebbinghaus' },
  // fechner
  { id: 'psicofisica',               term: 'psicofísica',                definition: 'Campo que estudia la relación matemática entre los estímulos físicos del mundo (como el peso o el sonido) y la forma en que los percibimos. Del griego "psyché" (mente) y "physis" (naturaleza, lo físico).',                                                                                           authorId: 'fechner' },
  { id: 'audiologia',                term: 'audiología',                 definition: 'Estudio de la audición y los problemas relacionados con la pérdida auditiva. Del latín "audire" (oír) y el griego "logos" (estudio).',                                                                                                                                                                  authorId: 'fechner' },
  { id: 'mistico',                   term: 'místico',                    definition: 'Que cree en una dimensión espiritual o trascendente de la realidad, más allá de lo que la ciencia puede explicar directamente. Del griego "mystikos", relativo a los misterios o lo oculto.',                                                                                                           authorId: 'fechner' },
  // wundt
  { id: 'introspeccion-experimental', term: 'introspección experimental', definition: 'Método propuesto por Wundt en el que personas entrenadas describían con precisión su propia experiencia mental mientras se les presentaban estímulos controlados. Del latín "intro" (adentro) y "spectare" (mirar, examinar).',                                                                        authorId: 'wundt' },
  { id: 'fisiologia',                term: 'fisiología',                 definition: 'Estudio de cómo funciona el cuerpo y sus órganos. Del griego "physis" (naturaleza) y "logos" (estudio).',                                                                                                                                                                                              authorId: 'wundt' },
  { id: 'psicoanalisis',             term: 'psicoanálisis',              definition: 'Enfoque desarrollado por Freud que propone que buena parte de lo que pensamos, sentimos y hacemos está influido por procesos inconscientes. Del griego "psyché" (mente) y "analysis" (descomposición, examen detallado).',                                                                               authorId: 'wundt' },
  // rev-1b
  { id: 'conductismo',               term: 'conductismo',                definition: 'Corriente de la psicología que propone que solo debe estudiarse el comportamiento visible y medible, no los pensamientos ni las emociones internas.',                                                                                                                                                    authorId: 'rev-1b' },
  // james
  { id: 'corriente-de-conciencia',   term: 'corriente de conciencia',    definition: 'Idea de William James de que la conciencia no está hecha de partes separadas, sino que es un flujo continuo que nunca se detiene ni se repite exactamente igual.',                                                                                                                                     authorId: 'james' },
  { id: 'funcionalismo',             term: 'funcionalismo',              definition: 'Enfoque que estudia los procesos mentales preguntando para qué sirven, en lugar de solo describir de qué están hechos. Del latín "functio", función o cumplimiento de un propósito.',                                                                                                                   authorId: 'james' },
  { id: 'psicologia-organizacional', term: 'psicología organizacional',  definition: 'Rama de la psicología que estudia cómo trabajan, se relacionan y toman decisiones las personas dentro de equipos y empresas.',                                                                                                                                                                         authorId: 'james' },
  { id: 'psicologia-clinica',        term: 'psicología clínica',         definition: 'Rama de la psicología dedicada a entender y aliviar el sufrimiento psicológico a través de la evaluación y el tratamiento.',                                                                                                                                                                           authorId: 'james' },
  { id: 'voluntad-james',            term: 'voluntad',                   definition: 'Para James, la capacidad de elegir en qué dirección actuar, incluso sin tener ganas o sin sentirte listo todavía.',                                                                                                                                                                                    authorId: 'james' },
  // thorndike
  { id: 'ley-del-efecto',            term: 'ley del efecto',             definition: 'Principio descubierto por Thorndike: las acciones que producen resultados satisfactorios tienden a repetirse, y las que producen resultados negativos tienden a desaparecer.',                                                                                                                          authorId: 'thorndike' },
  { id: 'ensayo-y-error',            term: 'ensayo y error',             definition: 'Método de aprendizaje en el que se intentan distintas acciones hasta encontrar una que funcione, sin un plan o comprensión previa.',                                                                                                                                                                    authorId: 'thorndike' },
  // watson
  { id: 'estimulo',                  term: 'estímulo',                   definition: 'Cualquier elemento del entorno que provoca una reacción o respuesta en una persona o animal. Del latín "stimulus", aguijón o impulso.',                                                                                                                                                                 authorId: 'watson' },
  { id: 'condicionamiento',          term: 'condicionamiento',           definition: 'Proceso de aprendizaje en el que una respuesta se asocia con un estímulo específico a través de la repetición. Del latín "condicio", condición o circunstancia.',                                                                                                                                       authorId: 'watson' },
  // skinner
  { id: 'condicionamiento-operante', term: 'condicionamiento operante',  definition: 'Sistema propuesto por Skinner según el cual el comportamiento se moldea a través de sus consecuencias — refuerzos y castigos.',                                                                                                                                                                         authorId: 'skinner' },
  { id: 'refuerzo-positivo',         term: 'refuerzo positivo',          definition: 'Cuando una acción produce algo bueno o agradable, lo que hace que esa acción tienda a repetirse.',                                                                                                                                                                                                     authorId: 'skinner' },
  { id: 'refuerzo-negativo',         term: 'refuerzo negativo',          definition: 'Cuando una acción hace que algo desagradable desaparezca, lo que también hace que esa acción tienda a repetirse.',                                                                                                                                                                                     authorId: 'skinner' },
  { id: 'castigo-positivo',          term: 'castigo positivo',           definition: 'Cuando una acción produce algo desagradable, lo que hace que esa acción tienda a no repetirse.',                                                                                                                                                                                                       authorId: 'skinner' },
  { id: 'castigo-negativo',          term: 'castigo negativo',           definition: 'Cuando una acción hace que algo agradable desaparezca, lo que también hace que esa acción tienda a no repetirse.',                                                                                                                                                                                     authorId: 'skinner' },
];

export const conceptThreads = [
  { from: 'heraclito-democrito', to: 'platon',       text: 'Platón responde a los presocráticos: frente a la fluidez de Heráclito, propone que hay algo permanente — las Ideas eternas.' },
  { from: 'platon',              to: 'aristoteles',  text: 'El alma tripartita de Platón y la psyché de Aristóteles responden a la misma pregunta desde premisas opuestas.' },
  { from: 'platon',              to: 'descartes',    text: 'El dualismo de Descartes (mente vs. cuerpo) es la versión moderna del dualismo de Platón (alma vs. cuerpo).' },
  { from: 'descartes',           to: 'kant',         text: 'El cogito de Descartes es el punto de partida que Kant intentó superar con su giro copernicano.' },
  { from: 'kant',                to: 'schopenhauer', text: 'Schopenhauer tomó el noúmeno kantiano y lo convirtió en la Voluntad — una fuerza irracional que gobierna desde debajo de la conciencia.' },
];
