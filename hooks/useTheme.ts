import { colors } from '../constants/colors';
import { useThemeContext } from '../context/ThemeContext';

export function useTheme() {
  const { isDark, toggleTheme } = useThemeContext();
  return {
    theme: isDark ? colors.dark : colors.light,
    isDark,
    toggleTheme,
  };
}
