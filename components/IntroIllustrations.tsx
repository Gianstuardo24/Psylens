import Svg, { Circle, Ellipse, Line, Path } from 'react-native-svg';

const GREEN = '#0f6e56';
const DEFAULT_SIZE = 120;

function EyeIllustration({ size = DEFAULT_SIZE }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Ellipse
        cx="60" cy="60"
        rx="50" ry="28"
        stroke={GREEN} strokeWidth="2" fill="none"
      />
      <Circle
        cx="60" cy="60" r="14"
        stroke={GREEN} strokeWidth="2" fill="none"
      />
    </Svg>
  );
}

function LensIllustration({ size = DEFAULT_SIZE }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 14">
      <Circle cx="5" cy="7" r="4" stroke={GREEN} strokeWidth="1.8" fill="none" />
      <Circle cx="17" cy="7" r="4" stroke={GREEN} strokeWidth="1.8" fill="none" />
      <Line x1="9" y1="7" x2="13" y2="7" stroke={GREEN} strokeWidth="1.8" />
    </Svg>
  );
}

function TimelineIllustration({ size = DEFAULT_SIZE }: { size?: number }) {
  const dots: { x: number; r: number }[] = [
    { x: 22,  r: 4  },
    { x: 48,  r: 6  },
    { x: 74,  r: 8  },
    { x: 100, r: 10 },
  ];
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Line
        x1="15" y1="60" x2="105" y2="60"
        stroke={GREEN} strokeWidth="2"
      />
      {dots.map(({ x, r }) => (
        <Circle
          key={x}
          cx={x} cy="60" r={r}
          fill={GREEN}
        />
      ))}
    </Svg>
  );
}

function ConcentricIllustration({ size = DEFAULT_SIZE }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Circle cx="60" cy="60" r="18" stroke={GREEN} strokeWidth="2" fill="none" />
      <Circle cx="60" cy="60" r="34" stroke={GREEN} strokeWidth="2" fill="none" />
      <Circle cx="60" cy="60" r="50" stroke={GREEN} strokeWidth="2" fill="none" />
    </Svg>
  );
}

export function HelenisticasIllustration({ size = DEFAULT_SIZE, isDark }: { size?: number; isDark: boolean }) {
  const bg     = isDark ? '#0D1F1A' : '#F5F0E8';
  const border = isDark ? '#1a4a3a' : '#C9A84C';
  const accent = isDark ? '#3a9a7a' : '#C9A84C';
  return (
    <Svg width={size} height={size} viewBox="0 0 400 400">
      <Circle cx="200" cy="200" r="196" fill={bg} stroke={border} strokeWidth="4" />
      <Path d="M200 100 L300 260 L100 260 Z" stroke={accent} strokeWidth="9" fill="none" strokeLinejoin="round" />
      <Circle cx="200" cy="100" r="22" fill={accent} />
      <Circle cx="300" cy="260" r="22" fill={accent} />
      <Circle cx="100" cy="260" r="22" fill={accent} />
    </Svg>
  );
}

const ILLUSTRATIONS: Record<string, (props: { size?: number }) => JSX.Element> = {
  'intro-1': EyeIllustration,
  'intro-2': LensIllustration,
  'intro-3': TimelineIllustration,
  'intro-4': ConcentricIllustration,
};

export function IntroIllustration({ authorId, size }: { authorId: string; size?: number }) {
  const Component = ILLUSTRATIONS[authorId];
  return Component ? <Component size={size} /> : null;
}
