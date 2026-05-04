import { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Animated,       // ← new import
} from 'react-native';

type Quote = {
  text: string;
  author: string;
};

const quotes: Quote[] = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Whether you think you can or can't, you're right.", author: "Henry Ford" },
];

export default function App() {
  const [quote, setQuote] = useState<Quote>(quotes[0]);

  // ── Animation value (starts fully visible at 1) ──────────────
  const fadeAnim = useRef(new Animated.Value(1)).current;

  function getNewQuote(): void {
    // Step 1: Fade OUT
    Animated.timing(fadeAnim, {
      toValue: 0,           // fade to invisible
      duration: 300,        // takes 300ms
      useNativeDriver: true,
    }).start(() => {

      // Step 2: Swap the quote (while invisible)
      let random: Quote;
      do {
        random = quotes[Math.floor(Math.random() * quotes.length)];
      } while (random.text === quote.text);
      setQuote(random);

      // Step 3: Fade IN
      Animated.timing(fadeAnim, {
        toValue: 1,           // fade back to visible
        duration: 400,        // slightly slower fade in
        useNativeDriver: true,
      }).start();

    });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Animated.View wraps the card so the whole card fades */}
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Text style={styles.quoteMark}>"</Text>
        <Text style={styles.quoteText}>{quote.text}</Text>
        <Text style={styles.author}>— {quote.author}</Text>
      </Animated.View>

      <TouchableOpacity style={styles.button} onPress={getNewQuote}>
        <Text style={styles.buttonText}>New Quote</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 28,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    marginBottom: 24,
  },
  quoteMark: {
    fontSize: 48,
    color: '#cccccc',
    lineHeight: 48,
    marginBottom: 8,
    fontFamily: 'serif',
  },
  quoteText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#1a1a1a',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  author: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});