import { View, Text, StyleSheet } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Psylens</Text>
      <Text style={styles.subtitle}>La lente que afina tu visión del ser humano.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0e', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#f0ece3', fontSize: 32, fontFamily: 'serif' },
  subtitle: { color: '#6e6b64', fontSize: 14, marginTop: 8 },
});