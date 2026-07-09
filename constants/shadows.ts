export const cardShadow = (isDark: boolean) => ({
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: isDark ? 0.5 : 0.1,
  shadowRadius: 8,
  elevation: 3,
});
