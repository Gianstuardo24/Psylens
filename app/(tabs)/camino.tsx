import { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Svg, { Circle, Ellipse, Line, Path } from 'react-native-svg';
import { router, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { typography, spacing, radius } from '../../constants/typography';
import { authors, blocks, subBlocks } from '../../constants/data';
import { PaywallSheet } from '../../components/PaywallSheet';
import { useTheme } from '../../hooks/useTheme';

type Theme = typeof colors.dark;

// ─── Types ────────────────────────────────────────────────────────────────────

type AuthorState    = 'active' | 'locked' | 'done';
type BlockStatus    = 'active' | 'locked';
type SubBlockStatus = 'active' | 'locked';
type LayerProgress  = { surface?: boolean; concept?: boolean; fondo?: boolean };
type ProgressMap    = Record<string, LayerProgress>;

const PROGRESS_KEY     = 'psylens_progress';
const UNLOCK_KEY       = 'psylens_unlocked';
const PREMIUM_KEY      = 'psylens_is_premium';
const INTRO_AUTHOR_IDS = ['intro-1', 'intro-2', 'intro-3', 'intro-4'];

// ─── Portrait images ──────────────────────────────────────────────────────────

const PORTRAIT_HERACLITO = require('../../assets/portraits/heraclito.png');
const PORTRAIT_DEMOCRITO = require('../../assets/portraits/democrito.png');

const PORTRAITS: Record<string, number | null> = {
  // b0
  'heraclito-democrito': null,
  'platon':         require('../../assets/portraits/platon.png'),
  'aristoteles':    require('../../assets/portraits/aristoteles.png'),
  'helenisticas':   null,
  'avicena':        require('../../assets/portraits/avicena.png'),
  'hipocrates':     require('../../assets/portraits/hipocrates.png'),
  'descartes':      require('../../assets/portraits/descartes.png'),
  'spinoza':        require('../../assets/portraits/spinoza.png'),
  'kant':           require('../../assets/portraits/kant.png'),
  'schopenhauer':   require('../../assets/portraits/schopenhauer.png'),
  'darwin':         null,
  // b1
  'ebbinghaus':     null,
  'fechner':        require('../../assets/portraits/fechner.png'),
  'wundt':          require('../../assets/portraits/wundt.png'),
  'james':          require('../../assets/portraits/james.png'),
  'thorndike':      null,
};

// ─── Sub-block revolution card content ────────────────────────────────────────

const SUB_BLOCK_CONTENT: Record<string, { entrada: string; profundidad: string }> = {
  'sb-0a': {
    entrada:
      'Durante miles de años, las preguntas más importantes sobre los seres humanos tenían una sola dirección: hacia afuera. Hacia los dioses, hacia lo sobrenatural. Lo que estás a punto de ver es el momento en que eso cambió — un grupo de pensadores decidió buscar las respuestas en el cuerpo, en la naturaleza, en el pensamiento mismo.',
    profundidad:
      'Este sub-bloque reúne a tres pensadores que, desde ángulos muy distintos, instalaron la misma pregunta: ¿puede entenderse la mente humana sin recurrir a lo sobrenatural?\n\nEl primero preguntó si somos los mismos a lo largo del tiempo. El segundo propuso que el sufrimiento mental no es castigo divino sino enfermedad. El tercero intentó mapear las distintas fuerzas que conviven dentro de cada persona.\n\nNinguno de los tres tenía las herramientas para probar lo que proponía. Pero cada uno dejó una pregunta que los siguientes dos mil años de pensamiento no han terminado de responder.',
  },
  'sb-0b': {
    entrada:
      'Los primeros pensadores abrieron la puerta. Los que vienen ahora entraron por ella — y fueron mucho más lejos. Si la mente puede entenderse sin recurrir a los dioses, la siguiente pregunta es: ¿cómo está organizada por dentro? ¿Tiene partes? ¿Se puede elegir cómo sentirse, o las emociones simplemente ocurren?',
    profundidad:
      'Los tres pensadores de este sub-bloque llegaron a respuestas muy distintas — y las tres siguen resonando hoy.\n\nEl primero propuso que las emociones no son interrupciones ni obstáculos: son información. El segundo dijo que cuerpo y mente no son dos cosas separadas sino una sola. El tercero llevó esa idea a la práctica médica, documentando que lo que sentimos emocionalmente tiene efectos físicos reales.\n\nLo que los tres construyeron juntos es algo que la psicología tardó siglos en recuperar: la idea de que para entender a una persona hay que mirarla completa.',
  },
  'sb-0c': {
    entrada:
      'Los pensadores anteriores confiaban en el pensamiento. Si razonabas bien, si observabas con cuidado, podías llegar a entender la mente humana. Esa confianza en la razón fue el motor de todo lo que viste antes. Lo que estás a punto de ver es el momento en que esa confianza empezó a fisurarse.',
    profundidad:
      'El primero decidió dudar de absolutamente todo — y lo que encontró fue una separación radical entre la mente y el cuerpo que todavía hoy estructura cómo pensamos sobre nosotros mismos.\n\nEl segundo miró esa separación y dijo que no. Que mente y cuerpo son lo mismo visto desde dos ángulos distintos. Que intentar suprimir una emoción con pura fuerza de voluntad es tan inútil como pedirle al cuerpo que deje de reaccionar.\n\nEl tercero fue más lejos todavía: propuso que hay un límite en lo que la razón puede conocer — incluido conocerse a uno mismo. Que la persona que crees ser hoy es una interpretación, no la verdad última sobre ti.',
  },
  'sb-0d': {
    entrada:
      'El sub-bloque anterior terminó con una pregunta incómoda: ¿qué hay debajo de la razón? ¿Hay algo que nos mueve antes de que pensemos, antes de que decidamos, antes de que lo notemos?\n\nLos dos pensadores que cierran este bloque respondieron que sí — desde lugares completamente distintos.',
    profundidad:
      'El primero propuso que debajo de todo lo que razonamos hay una fuerza que no elegimos ni controlamos: un impulso constante que nos mueve hacia el deseo y que nunca se satisface del todo. No lo llamó inconsciente. Pero Freud, décadas después, reconoció que había llegado exactamente ahí.\n\nEl segundo llegó desde un camino completamente distinto. Observando animales y fósiles durante años, propuso que nuestras emociones, nuestros instintos y nuestros comportamientos no son arbitrarios — son respuestas que funcionaron.\n\nJuntos construyen el puente más importante de todo el Bloque 0: el que va desde la filosofía hasta la ciencia.',
  },
  'sb-1a': {
    entrada:
      'Durante el Bloque 0 recorriste más de dos mil años de pensamiento filosófico. Nadie había medido cuánto tarda la mente en reaccionar ante algo. Nadie había registrado con precisión cuánto recuerda una persona después de un día o una semana. Nadie había intentado poner un número a la intensidad de lo que sentimos. Eso estaba a punto de cambiar.',
    profundidad:
      'Lo que hace especial este momento en la historia no es solo que aparecieron nuevas respuestas. Es que cambió la forma de buscarlas.\n\nHasta aquí, una idea valía por su coherencia y la autoridad de quien la propuso. A partir de aquí, una idea vale si puede ponerse a prueba. Si puede medirse, repetirse, verificarse.\n\nDarwin había propuesto que somos parte de la naturaleza. El Bloque 1 recoge esa idea y va un paso más lejos: si somos parte de la naturaleza, entonces la mente también puede estudiarse como cualquier otra cosa natural. Con observación. Con medición. Con evidencia.',
  },
  'sb-1b': {
    entrada:
      'El primer sub-bloque dejó algo sin resolver. Wundt había demostrado que la mente podía medirse — pero para hacerlo necesitaba pedirle a las personas que describieran lo que estaban experimentando por dentro. Y nadie podía verificar si lo que describían era lo que realmente ocurría.\n\nEsa pregunta — ¿para qué sirve la mente? — cambió todo lo que vino después.',
    profundidad:
      'Lo que este sub-bloque construye, a través de cuatro pensadores, es la lógica del conductismo — la propuesta de que la psicología debe estudiar únicamente lo que puede verse y medirse desde afuera: el comportamiento.\n\nEl primero demostró que el aprendizaje ocurre por consecuencias, no por comprensión. El segundo radicalizó esa idea: propuso que todo lo que no puede observarse — los pensamientos, las emociones, la conciencia — no debería estudiarse en absoluto. El tercero construyó el sistema más completo de todos.\n\nEl conductismo dominó la psicología durante décadas. Sus ideas siguen activas hoy — en cómo se diseñan apps y sistemas de aprendizaje.',
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const authorById: Record<string, typeof authors[0]> =
  Object.fromEntries(authors.map((a) => [a.id, a]));

function isAuthorDone(p: LayerProgress | undefined): boolean {
  return !!(p?.surface && p?.concept && p?.fondo);
}

function getBlockStatus(block: typeof blocks[0], isPremium: boolean, progress: ProgressMap): BlockStatus {
  if (block.id === 'intro') return 'active';
  if (block.id === 'b0') {
    const introDone = INTRO_AUTHOR_IDS.every(id => isAuthorDone(progress[id]));
    return introDone ? 'active' : 'locked';
  }
  if (block.isFree) return 'active';
  return isPremium ? 'active' : 'locked';
}

function getSubBlockStatus(
  subBlockId: string,
  block: typeof blocks[0],
  blockStatus: BlockStatus,
  progress: ProgressMap,
): SubBlockStatus {
  if (blockStatus === 'locked') return 'locked';
  const blockSubBlocks = subBlocks.filter(sb => sb.blockId === block.id);
  const idx = blockSubBlocks.findIndex(sb => sb.id === subBlockId);
  if (idx <= 0) return 'active';
  const prevSubBlock = blockSubBlocks[idx - 1];
  const blockAuthorSet = new Set(block.authors);
  const prevAuthorIds = prevSubBlock.authorIds.filter(id => blockAuthorSet.has(id));
  return prevAuthorIds.every(id => isAuthorDone(progress[id])) ? 'active' : 'locked';
}

function computeAuthorState(
  authorId: string,
  indexInGroup: number,
  groupAuthorIds: string[],
  groupStatus: 'active' | 'locked',
  sequential: boolean,
  progress: ProgressMap,
): AuthorState {
  if (isAuthorDone(progress[authorId])) return 'done';
  if (groupStatus === 'locked') return 'locked';
  if (!sequential) return 'active';
  if (indexInGroup === 0) return 'active';
  const prevId = groupAuthorIds[indexInGroup - 1];
  return isAuthorDone(progress[prevId]) ? 'active' : 'locked';
}

// ─── AuthorCard ───────────────────────────────────────────────────────────────

function AuthorCard({
  author,
  state,
}: {
  author: typeof authors[0];
  state: AuthorState;
}) {
  const { theme } = useTheme();
  const ac = useMemo(() => makeAcStyles(theme), [theme]);

  const portrait     = PORTRAITS[author.id] ?? null;
  const isDual       = author.id === 'heraclito-democrito';
  const isIntro      = author.id.startsWith('intro-');
  const isComingSoon = author.subtitle === 'Contenido próximamente';

  const inner = (
    <View
      style={[
        ac.card,
        state === 'active'  && ac.cardActive,
        state === 'done'    && ac.cardDone,
        state === 'locked'  && ac.cardLocked,
      ]}
    >
      {/* Left column: portrait */}
      <View style={[ac.leftCol, isDual && ac.leftColDual]}>
        {isDual ? (
          <View style={ac.dualWrap}>
            <View style={ac.dualCircle}>
              {PORTRAIT_HERACLITO ? (
                <Image source={PORTRAIT_HERACLITO} style={ac.dualImage} resizeMode="cover" />
              ) : (
                <Text style={ac.initial}>H</Text>
              )}
            </View>
            <View style={[ac.dualCircle, ac.dualCircleRight]}>
              {PORTRAIT_DEMOCRITO ? (
                <Image source={PORTRAIT_DEMOCRITO} style={ac.dualImage} resizeMode="cover" />
              ) : (
                <Text style={ac.initial}>D</Text>
              )}
            </View>
          </View>
        ) : isIntro ? (
          <View style={[ac.portrait, { borderWidth: 2, borderColor: '#0f6e56' }]}>
            {author.id === 'intro-1' && (
              <Svg width={38} height={38} viewBox="0 0 120 120">
                <Ellipse cx="60" cy="60" rx="50" ry="28" stroke="#0f6e56" strokeWidth="2" fill="none" />
                <Circle cx="60" cy="60" r="14" stroke="#0f6e56" strokeWidth="2" fill="none" />
              </Svg>
            )}
            {author.id === 'intro-2' && (
              <Svg width={38} height={38} viewBox="0 0 22 14">
                <Circle cx="5" cy="7" r="4" stroke="#0f6e56" strokeWidth="1.8" fill="none" />
                <Circle cx="17" cy="7" r="4" stroke="#0f6e56" strokeWidth="1.8" fill="none" />
                <Line x1="9" y1="7" x2="13" y2="7" stroke="#0f6e56" strokeWidth="1.8" />
              </Svg>
            )}
            {author.id === 'intro-3' && (
              <Svg width={38} height={38} viewBox="0 0 120 120">
                <Line x1="15" y1="60" x2="105" y2="60" stroke="#0f6e56" strokeWidth="2" />
                <Circle cx="22" cy="60" r="4" fill="#0f6e56" />
                <Circle cx="48" cy="60" r="6" fill="#0f6e56" />
                <Circle cx="74" cy="60" r="8" fill="#0f6e56" />
                <Circle cx="100" cy="60" r="10" fill="#0f6e56" />
              </Svg>
            )}
            {author.id === 'intro-4' && (
              <Svg width={38} height={38} viewBox="0 0 120 120">
                <Circle cx="60" cy="60" r="18" stroke="#0f6e56" strokeWidth="2" fill="none" />
                <Circle cx="60" cy="60" r="34" stroke="#0f6e56" strokeWidth="2" fill="none" />
                <Circle cx="60" cy="60" r="50" stroke="#0f6e56" strokeWidth="2" fill="none" />
              </Svg>
            )}
            {state === 'locked' && <View style={ac.portraitOverlay} />}
          </View>
        ) : (
          <View style={ac.portrait}>
            {portrait ? (
              <Image
                source={portrait}
                style={ac.portraitImage}
                resizeMode="cover"
              />
            ) : (
              <Text style={ac.initial}>{author.name[0]}</Text>
            )}
            {state === 'locked' && <View style={ac.portraitOverlay} />}
          </View>
        )}
      </View>

      {/* Info */}
      <View style={ac.info}>
        <Text style={[ac.name, state === 'locked' && ac.dimText]} numberOfLines={1}>
          {author.name}
        </Text>
        <Text style={[ac.subtitle, state === 'locked' && ac.dimText]} numberOfLines={1}>
          {author.subtitle}
        </Text>
        <Text style={ac.dates}>{author.dates}</Text>
      </View>

      {/* Trailing badge */}
      <View style={ac.trailing}>
        {isComingSoon ? (
          <View style={ac.badgeSoon}>
            <Text style={ac.badgeSoonText}>Próximo</Text>
          </View>
        ) : state === 'active' ? (
          <View style={ac.badgePurple}>
            <Text style={ac.badgePurpleText}>Activo</Text>
          </View>
        ) : state === 'done' ? (
          <View style={ac.badgeGreen}>
            <Text style={ac.badgeGreenText}>✓</Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  if (state === 'locked') return inner;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/autor/${author.id}`)}
      activeOpacity={0.8}
    >
      {inner}
    </TouchableOpacity>
  );
}

// ─── SubBlockHeader ───────────────────────────────────────────────────────────

function SubBlockHeader({
  subBlock,
  status,
}: {
  subBlock: typeof subBlocks[0];
  status: SubBlockStatus;
}) {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const sbh = useMemo(() => makeSbhStyles(theme), [theme]);

  const content  = SUB_BLOCK_CONTENT[subBlock.id];
  const isLocked = status === 'locked';

  return (
    <View style={[sbh.container, isLocked && sbh.containerLocked]}>
      <View style={sbh.headerRow}>
        <View style={sbh.iconWrap}>
          <Svg width={16} height={16} viewBox="0 0 16 16">
            <Path
              d="M8 1 L15 8 L8 15 L1 8 Z"
              stroke={isLocked ? theme.text3 : '#0f6e56'}
              strokeWidth="1.5"
              fill="none"
            />
          </Svg>
        </View>
        <Text style={[sbh.name, isLocked && sbh.nameLocked]} numberOfLines={2}>
          {subBlock.name}
        </Text>
        {!isLocked && content && (
          <TouchableOpacity
            onPress={() => setExpanded(e => !e)}
            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
            style={sbh.expandBtn}
          >
            <Text style={sbh.expandIcon}>{expanded ? '▾' : '▸'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {!isLocked && content && (
        <Text style={sbh.entrada}>{content.entrada}</Text>
      )}

      {expanded && !isLocked && content && (
        <View style={sbh.profundidadWrap}>
          <View style={sbh.divider} />
          <Text style={sbh.profundidadLabel}>Profundidad</Text>
          <Text style={sbh.profundidad}>{content.profundidad}</Text>
        </View>
      )}
    </View>
  );
}

// ─── BlockNode ────────────────────────────────────────────────────────────────

const SYMBOL: Record<string, string> = {
  eye:     '◎',
  atom:    '⊛',
  spiral:  '◉',
  circles: '○',
  diamond: '◆',
  network: '⊕',
};

function BlockNode({
  block,
  blockIndex,
  isExpanded,
  onToggle,
  onPaywall,
  progress,
  unlocked,
  isPremium,
}: {
  block: typeof blocks[0];
  blockIndex: number;
  isExpanded: boolean;
  onToggle: () => void;
  onPaywall: () => void;
  progress: ProgressMap;
  unlocked: string[];
  isPremium: boolean;
}) {
  const { theme } = useTheme();
  const bn = useMemo(() => makeBnStyles(theme), [theme]);

  const status   = getBlockStatus(block, isPremium, progress);
  const isActive = status === 'active';
  const isLocked = status === 'locked';

  const blockAuthors = block.authors
    .map((id) => authorById[id])
    .filter(Boolean) as (typeof authors[0])[];

  const completed = blockAuthors.filter(a => isAuthorDone(progress[a.id])).length;
  const total     = block.authors.length;
  const pct       = Math.round((completed / total) * 100);

  const blockSubBlocks = subBlocks.filter(sb => sb.blockId === block.id);
  const blockAuthorSet = new Set(block.authors);

  return (
    <View style={[bn.wrapper, isLocked && bn.wrapperLocked]}>

      {/* ── Block header ──────────────────────────────────── */}
      <TouchableOpacity
        style={bn.header}
        onPress={isLocked
          ? (block.id === 'b0'
              ? () => Alert.alert('Introducción requerida', 'Completa la Introducción primero para desbloquear este bloque.')
              : onPaywall)
          : (isActive ? onToggle : undefined)}
        activeOpacity={0.7}
      >
        {/* Symbol icon */}
        <View style={[bn.icon, isLocked && bn.iconLocked]}>
          {block.symbol === 'lens' ? (
            <Svg width={28} height={28} viewBox="0 0 28 28">
              <Path d="M14 4 Q4 14 14 24" stroke="#0f6e56" strokeWidth="1.5" fill="none" />
              <Path d="M14 4 Q24 14 14 24" stroke="#0f6e56" strokeWidth="1.5" fill="none" />
            </Svg>
          ) : (
            <Text style={[bn.iconGlyph, isLocked && bn.iconGlyphLocked]}>
              {SYMBOL[block.symbol] ?? block.symbol[0].toUpperCase()}
            </Text>
          )}
        </View>

        {/* Name + era + progress */}
        <View style={bn.meta}>
          <View style={bn.titleRow}>
            <Text style={[bn.name, isLocked && bn.nameLocked]} numberOfLines={1}>
              {block.name}
            </Text>
            {block.isFree ? (
              <View style={bn.freeTag}>
                <Text style={bn.freeTagText}>Gratis</Text>
              </View>
            ) : (
              <View style={bn.premiumTag}>
                <Text style={bn.premiumTagText}>Premium</Text>
              </View>
            )}
          </View>

          <Text style={[bn.era, isLocked && bn.eraLocked]}>{block.era}</Text>

          {/* Progress bar */}
          <View style={bn.progressRow}>
            <View style={bn.progressTrack}>
              <View style={[bn.progressFill, { width: `${pct}%` }]} />
            </View>
            <Text style={bn.progressText}>{completed}/{total}</Text>
          </View>
        </View>

        {/* Expand / lock indicator */}
        <Text style={[bn.chevron, isLocked && bn.chevronLocked]}>
          {isLocked ? '⊘' : isExpanded ? '▾' : '▸'}
        </Text>
      </TouchableOpacity>

      {/* ── Authors list (expanded) ───────────────────────── */}
      {isActive && isExpanded && (
        <View style={bn.authorsList}>
          {blockSubBlocks.length > 0 ? (
            blockSubBlocks.map(sb => {
              const sbStatus    = getSubBlockStatus(sb.id, block, status, progress);
              const sbAuthorIds = sb.authorIds.filter(id => blockAuthorSet.has(id));
              const sbAuthors   = sbAuthorIds
                .map(id => authorById[id])
                .filter(Boolean) as (typeof authors[0])[];
              return (
                <View key={sb.id}>
                  <SubBlockHeader subBlock={sb} status={sbStatus} />
                  {sbAuthors.map((author, i) => (
                    <AuthorCard
                      key={author.id}
                      author={author}
                      state={computeAuthorState(author.id, i, sbAuthorIds, sbStatus, true, progress)}
                    />
                  ))}
                </View>
              );
            })
          ) : (
            blockAuthors.map((author, i) => (
              <AuthorCard
                key={author.id}
                author={author}
                state={computeAuthorState(
                  author.id, i, block.authors, status,
                  block.id === 'intro',
                  progress,
                )}
              />
            ))
          )}
        </View>
      )}

    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function CaminoScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const [expandedId,  setExpandedId]  = useState<string | null>('intro');
  const [progress,    setProgress]    = useState<ProgressMap>({});
  const [unlocked,    setUnlocked]    = useState<string[]>([]);
  const [isPremium,   setIsPremium]   = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  useFocusEffect(
    useCallback(() => {
      Promise.all([
        AsyncStorage.getItem(PROGRESS_KEY).catch(() => null),
        AsyncStorage.getItem(UNLOCK_KEY).catch(() => null),
        AsyncStorage.getItem(PREMIUM_KEY).catch(() => null),
      ]).then(([rawProg, rawUnlock, rawPremium]) => {
        if (rawProg)   setProgress(JSON.parse(rawProg));
        if (rawUnlock) setUnlocked(JSON.parse(rawUnlock));
        setIsPremium(rawPremium === 'true');
      });
    }, []),
  );

  function toggleBlock(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  const totalAuthors = blocks.reduce((sum, b) => sum + b.authors.length, 0);
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.root}>
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing.lg },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Camino</Text>
        <Text style={styles.subtitle}>
          {blocks.length} bloques · {totalAuthors} autores
        </Text>
      </View>

      {/* Block list */}
      {blocks.map((block, index) => (
        <BlockNode
          key={block.id}
          block={block}
          blockIndex={index}
          isExpanded={expandedId === block.id}
          onToggle={() => toggleBlock(block.id)}
          onPaywall={() => setShowPaywall(true)}
          progress={progress}
          unlocked={unlocked}
          isPremium={isPremium}
        />
      ))}

    </ScrollView>

    <PaywallSheet
      visible={showPaywall}
      onClose={() => setShowPaywall(false)}
      onUnlock={() => setIsPremium(true)}
    />
    </View>
  );
}

// ─── AuthorCard styles ────────────────────────────────────────────────────────

function makeAcStyles(theme: Theme) {
  return StyleSheet.create({
    card: {
      height: 110,
      borderRadius: radius.xl,
      backgroundColor: theme.bg,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'transparent',
      marginBottom: spacing.sm,
    },
    cardActive: {
      borderWidth: 1.5,
      borderColor: theme.purple,
      shadowColor: theme.purple,
      shadowOpacity: 0.15,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    cardDone: {
      borderWidth: 1,
      borderColor: theme.green,
    },
    cardLocked: {
      opacity: 0.45,
    },

    leftCol: {
      width: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    leftColDual: {
      width: 120,
    },
    dualWrap: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dualCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.bg3,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    dualCircleRight: {
      marginLeft: -16,
      borderWidth: 2,
      borderColor: theme.bg,
    },
    dualImage: {
      width: 64,
      height: 64,
    },
    portrait: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.bg3,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    portraitImage: {
      width: 64,
      height: 64,
    },
    portraitOverlay: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: theme.bg2,
      opacity: 0.6,
    },
    initial: {
      ...typography.h3,
      color: theme.text2,
    },

    info: {
      flex: 1,
      justifyContent: 'center',
      gap: spacing.xs,
    },
    name: {
      ...typography.bodyS,
      color: theme.text,
      fontWeight: '600',
    },
    subtitle: {
      ...typography.bodyXS,
      color: theme.text2,
    },
    dates: {
      ...typography.bodyXS,
      color: theme.text3,
    },
    dimText: {
      color: theme.text3,
    },

    trailing: {
      paddingRight: spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 56,
    },
    badgePurple: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: radius.full,
      backgroundColor: theme.purpleBg,
    },
    badgePurpleText: {
      ...typography.label,
      color: theme.purple,
    },
    badgeGreen: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.greenBg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeGreenText: {
      ...typography.bodyS,
      color: theme.green,
      fontWeight: '700',
    },
    badgeSoon: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: radius.full,
      backgroundColor: theme.bg3,
    },
    badgeSoonText: {
      ...typography.label,
      color: theme.text3,
    },
  });
}

// ─── BlockNode styles ─────────────────────────────────────────────────────────

function makeBnStyles(theme: Theme) {
  return StyleSheet.create({
    wrapper: {
      marginBottom: spacing.lg,
      borderRadius: radius.xl,
      backgroundColor: theme.bg2,
      overflow: 'hidden',
    },
    wrapperLocked: {
      opacity: 0.55,
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.lg,
      gap: spacing.md,
    },

    icon: {
      width: 44,
      height: 44,
      borderRadius: radius.md,
      backgroundColor: theme.bg3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconLocked: {
      backgroundColor: theme.bg,
    },
    iconGlyph: {
      fontSize: typography.h3.fontSize,
      color: theme.text2,
    },
    iconGlyphLocked: {
      color: theme.text3,
    },

    meta: {
      flex: 1,
      gap: spacing.xs,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    name: {
      ...typography.bodyS,
      color: theme.text,
      fontWeight: '600',
      flexShrink: 1,
    },
    nameLocked: {
      color: theme.text3,
    },
    era: {
      ...typography.bodyXS,
      color: theme.text3,
    },
    eraLocked: {
      color: theme.text3,
    },

    freeTag: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: radius.full,
      backgroundColor: theme.greenBg,
    },
    freeTagText: {
      ...typography.label,
      color: theme.green,
    },
    premiumTag: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: radius.full,
      backgroundColor: theme.purpleBg,
    },
    premiumTagText: {
      ...typography.label,
      color: theme.purple,
    },

    progressRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginTop: spacing.xs,
    },
    progressTrack: {
      flex: 1,
      height: 3,
      borderRadius: 2,
      backgroundColor: theme.bg3,
      overflow: 'hidden',
    },
    progressFill: {
      height: 3,
      borderRadius: 2,
      backgroundColor: theme.green,
    },
    progressText: {
      ...typography.label,
      color: theme.text3,
      minWidth: 28,
      textAlign: 'right',
    },

    chevron: {
      ...typography.body,
      color: theme.text2,
      paddingLeft: spacing.xs,
    },
    chevronLocked: {
      color: theme.text3,
      fontSize: typography.bodyS.fontSize,
    },

    authorsList: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
  });
}

// ─── SubBlockHeader styles ────────────────────────────────────────────────────

function makeSbhStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      borderLeftWidth: 2,
      borderLeftColor: '#0f6e56',
      paddingLeft: spacing.md,
      paddingTop: spacing.md,
      paddingBottom: spacing.sm,
      marginBottom: spacing.xs,
      marginTop: spacing.md,
    },
    containerLocked: {
      opacity: 0.4,
      borderLeftColor: theme.text3,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginBottom: spacing.sm,
    },
    iconWrap: {
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: {
      ...typography.bodyS,
      color: theme.text,
      fontWeight: '600',
      flex: 1,
    },
    nameLocked: {
      color: theme.text3,
    },
    expandBtn: {
      padding: spacing.xs,
    },
    expandIcon: {
      ...typography.bodyS,
      color: theme.text2,
    },
    entrada: {
      ...typography.bodyXS,
      color: theme.text2,
      lineHeight: 18,
    },
    profundidadWrap: {
      marginTop: spacing.md,
    },
    divider: {
      height: 1,
      backgroundColor: theme.bg3,
      marginBottom: spacing.sm,
    },
    profundidadLabel: {
      ...typography.label,
      color: '#0f6e56',
      marginBottom: spacing.xs,
    },
    profundidad: {
      ...typography.bodyXS,
      color: theme.text2,
      lineHeight: 18,
    },
  });
}

// ─── Screen styles ────────────────────────────────────────────────────────────

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    scroll: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    content: {
      paddingHorizontal: spacing.xl,
      paddingBottom: spacing.xxxl,
    },
    header: {
      marginBottom: spacing.xxl,
    },
    title: {
      ...typography.h2,
      color: theme.text,
    },
    subtitle: {
      ...typography.bodyS,
      color: theme.text3,
      marginTop: spacing.xs,
    },
  });
}
