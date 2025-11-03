
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  background: '#0f1419',
  text: '#e3e3e3',
  textSecondary: '#8b8b8b',
  primary: '#343a40',
  secondary: '#495057',
  accent: '#6c757d',
  card: '#1a1f26',
  highlight: '#2d3339',
  border: '#2d3339',
  error: '#8b3a3a',
  success: '#4a6b4a',
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.highlight,
    alignSelf: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
    elevation: 3,
  },
  icon: {
    width: 60,
    height: 60,
  },
});
