import { View, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

interface LogoProps {
  color?: string;
  size?: number;
}

// Two circles connected by a horizontal bridge — pure React Native, no SVG.
// Proportions match the original SVG viewBox (22×14):
//   circle diameter = size * (8/22), bridge width = size * (4/22)
export function Logo({ color = colors.dark.text, size = 22 }: LogoProps) {
  const circleDiameter = Math.round(size * (8 / 22));
  const bridgeWidth    = Math.round(size * (4 / 22));
  const strokeWidth    = 2.2;

  const circleStyle = {
    width:        circleDiameter,
    height:       circleDiameter,
    borderRadius: 999,
    borderWidth:  strokeWidth,
    borderColor:  color,
    backgroundColor: 'transparent',
  } as const;

  const bridgeStyle = {
    width:           bridgeWidth,
    height:          strokeWidth,
    backgroundColor: color,
  } as const;

  return (
    <View style={styles.row}>
      <View style={circleStyle} />
      <View style={bridgeStyle} />
      <View style={circleStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
